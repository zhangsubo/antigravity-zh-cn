/* TeacherXuAI Antigravity Chinese UI, MIT. No network or application API access. */
(function () {
  'use strict';
  const dictionary = /*__DICTIONARY__*/ {};
  const VERSION = '0.1.1';
  const KEY = '__teacherxu_antigravity_zh__';
  if (window[KEY]) return;
  // The native application serves its UI locally. Never translate sign-in sites.
  if (!['127.0.0.1', 'localhost', '[::1]'].includes(location.hostname)) return;
  const SKIP = 'script,style,pre,code,textarea,input,[contenteditable],iframe,webview,' +
    '[data-no-translate],[translate="no"],[data-antigravity-zh-control],.monaco-editor,' +
    '[data-sidebar-row-id],[data-tooltip-id$="-name"],[data-testid^="automation-card-"],' +
    '[data-testid="project-selector-item"],[data-model-base],[data-harness],[data-mention-menu],' +
    '[data-testid="ask-question-option-hover-card"],[data-testid="sidecar-iframe"],[data-testid="sidecar-iframe-slot"],' +
    '[data-testid="automation-name"],[data-testid="sidecar-project-link"],[data-testid="automation-instructions-markdown"],' +
    '[data-testid="automation-instructions-text"],[data-testid="automation-run"],[data-testid="sidecar-model-option"],' +
    '[data-testid="new-sidecar-project"],[data-testid="new-sidecar-model"],[data-testid="diff-view-mode-detail"],' +
    '[data-testid="diff-view-mode-option"] + span,[data-testid="terminal-tab-surface"],[data-testid="browser-url-display"],' +
    '[data-testid="voice-picker-name"],[data-testid="customization-card"] a,[data-testid="customization-card"] .font-medium > button,' +
    '[data-testid="featured-carousel-headline"],[data-testid^="bundle-card-"] h3';
  // These nodes contain model/user data, even when rendered inside a UI popup.
  const CONTENT = '[data-testid="ask-question-header-text"],[data-testid="ask-question-option-text"],' +
    '[data-testid="planner-response-text"],[data-testid="user-message-content"],' +
    '[data-testid="markdown-code-block-preview"],[data-testid="background-task-command"],' +
    '[data-testid="setup-script-output"],[data-testid="browser-subagent-thinking"]';
  const POPUPS = '.z-\\[6000\\],[role="menu"],[data-select-popup],[data-popover-popup],' +
    '[data-hover-card-popup],[role="tooltip"]';
  // Discover new UI roots, but do not schedule a full scan for unrelated prose changes.
  const UI_TARGETS = POPUPS + ',[aria-label="Sidebar"],[aria-label="Settings"],[role="dialog"],h1,' +
    '[data-testid="project-selector-trigger"],[data-testid="agent-input-box"],p.pointer-events-none,' +
    '.files-changed-header,[data-testid="cleared-step-notice"],.flex-wrap,.proceed-button,' +
    'button > span.whitespace-nowrap,button[aria-label],span.font-medium.text-sm,' +
    '[data-testid="interaction-skip-button"],[data-testid="interaction-continue-button"],' +
    '[data-testid="permission-details-toggle"],[data-testid="ask-question-writein"],' +
    '[data-testid="ask-question-progress"],[data-testid="thinking-collapsible-trigger"],' +
    '[data-testid="artifact-card-split-button"],[data-testid="open-in-new-window-action"],' +
    '[data-testid="overview-panel"],[data-testid="cloud-triggers-view"],' +
    '[data-testid="trigger-InlineCreator"],[data-testid="automation-detail-view"],' +
    '[data-testid="new-sidecar-modal"],[data-testid="sidecars-view"],' +
    '[data-testid="automation-detail-page"],[data-testid="sidecar-detail"],' +
    '[data-testid="bottom-terminal-panel"],[data-testid="bottom-terminal-panel-title"],' +
    '[data-testid="bottom-terminal-panel-starting"],[data-testid="bottom-terminal-panel-empty"],' +
    '[data-testid="terminal-tab-connecting"],[data-testid="terminal-password-warning"],' +
    '[data-testid="diff-view-mode-trigger"],[data-testid="diff-view-mode-option"],' +
    '[data-testid="builtin-browser-reload"],[data-testid="browser-url-input"],' +
    '[data-testid="webview-download-show-in-folder"],[data-testid="webview-download-cancel"],' +
    '[data-testid="webview-download-remove"],[data-testid="voice-picker"],[data-testid="customizations-search"],' +
    '[data-testid="customizations-marketplace"],[data-testid="customizations-installed"],[data-testid="plugins-tabs"],' +
    'input[placeholder="Search conversations..."]';
  const records = new Map();
  const placeholderRecords = new Map();
  const attrRecords = new Map();
  let enabled = true;
  let scheduled = false;
  let disposed = false;
  let control;
  let observer;
  let settingsRoot;
  const normalize = value => value.trim().replace(/\s+/g, ' ');
  const english = node => {
    const record = records.get(node);
    return record && node.nodeValue === record.translated ? record.original : node.nodeValue;
  };
  function originalText(element) {
    const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT);
    let result = '', node;
    while ((node = walker.nextNode())) result += english(node);
    return normalize(result);
  }
  function formatLimitName(raw) {
    const lower = raw.trim().toLowerCase();
    if (lower === 'weekly' || lower === 'weekly limit') return '本周额度';
    if (lower === '5-hour' || lower === '5 hour' || lower === 'five-hour' || lower === 'five hour') return ' 5 小时额度';
    if (lower === 'daily' || lower === 'daily limit') return '今日额度';
    if (lower === 'hourly' || lower === 'hourly limit') return '每小时额度';
    if (lower === 'monthly' || lower === 'monthly limit') return '本月额度';
    return `${raw.trim()}额度`;
  }
  function formatDuration(raw) {
    return raw.trim()
      .replace(/less than a minute|<1m/gi, '不到 1 分钟')
      .replace(/(\d+)\s*days?/gi, '$1 天')
      .replace(/(\d+)\s*hours?/gi, '$1 小时')
      .replace(/(\d+)\s*(?:minutes?|mins?)/gi, '$1 分钟')
      .replace(/(\d+)\s*(?:seconds?|secs?)/gi, '$1 秒')
      .replace(/(\d+)d\b/gi, '$1 天')
      .replace(/(\d+)h\b/gi, '$1 小时')
      .replace(/(\d+)m\b/gi, '$1 分钟')
      .replace(/,\s*and\s+|\s+and\s+|,\s*/gi, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }
  function translateDynamic(key) {
    // Dynamic quota refresh text in Models & Usage:
    // e.g. "You have used some of your weekly limit, it will fully refresh in 3 days, 20 hours."
    // e.g. "You have used some of your 5-hour limit, it will fully refresh in 1 hour, 47 minutes."
    let match = key.match(
      /^You(?:'ve| have) used (some|all|most|\d+%) of your ([^,]+?)(?: limit)?,\s*(?:and )?it will (?:fully )?refresh in (.+?)\.?$/i
    );
    if (match) {
      const amountMap = { some: '部分', all: '全部', most: '大部分' };
      const amount = amountMap[match[1].toLowerCase()] || ` ${match[1]} 的`;
      const limit = formatLimitName(match[2]);
      const duration = formatDuration(match[3]);
      return `你已使用${amount}${limit}，将于 ${duration}后完全恢复。`;
    }
    match = key.match(
      /^You(?:'ve| have) reached your ([^,]+?)(?: limit)?,\s*(?:and )?it will (?:fully )?refresh in (.+?)\.?$/i
    );
    if (match) {
      return `你已达到${formatLimitName(match[1])}上限，将于 ${formatDuration(match[2])}后完全恢复。`;
    }
    match = key.match(/^You (?:have not|haven't) used any of your ([^.]+?)(?: limit)?\.?$/i);
    if (match) {
      return `你尚未使用${formatLimitName(match[1])}。`;
    }
    match = key.match(/^Resets in (.+)$/i);
    if (match) {
      return `将于 ${formatDuration(match[1])}后重置`;
    }
    match = key.match(/^Available AI Credits:\s*(.+)$/i);
    if (match) {
      return `可用 AI 点数：${match[1]}`;
    }
    match = key.match(/^Shared with:\s*(.+)$/i);
    if (match) {
      return `共享配额模型：${match[1]}`;
    }
    match = key.match(/^Show more \((\d+)\)$/i);
    if (match) {
      return `显示更多 (${match[1]})`;
    }
    match = key.match(/^Send feedback as (.+)$/i);
    if (match) {
      return `以 ${match[1]} 的身份发送反馈`;
    }
    match = key.match(/^Show (\d+) breakdowns?$/i);
    if (match) {
      return `展开 ${match[1]} 项明细`;
    }
    match = key.match(/^(\d+) tools?$/i);
    if (match) {
      return `${match[1]} 个工具`;
    }
    match = key.match(/^(\d+) demoted$/i);
    if (match) {
      return `${match[1]} 项已降级`;
    }
    match = key.match(/^(\d+) excluded$/i);
    if (match) {
      return `${match[1]} 项已排除`;
    }
    match = key.match(/^(\d+) tools? excluded$/i);
    if (match) {
      return `已排除 ${match[1]} 个工具`;
    }
    match = key.match(/^(\d+) active conversations?(?: and (\d+) archived conversations?)?$/i);
    if (match) {
      return match[2]
        ? `${match[1]} 个进行中对话和 ${match[2]} 个已归档对话`
        : `${match[1]} 个进行中对话`;
    }
    match = key.match(/^(\d+) archived conversations?$/i);
    if (match) {
      return `${match[1]} 个已归档对话`;
    }
    match = key.match(/^(\d+) models? selected$/i);
    if (match) {
      return `已选择 ${match[1]} 个模型`;
    }
    match = key.match(/^(\d+) active modes?$/i);
    if (match) {
      return `已启用 ${match[1]} 个模式`;
    }
    match = key.match(/^(\d+) files? changed$/i);
    if (match) {
      return `${match[1]} 个文件已修改`;
    }
    match = key.match(/^See all \((\d+)\)$/i);
    if (match) {
      return `查看全部 (${match[1]})`;
    }
    match = key.match(/^Low contrast ratio \((.+)\)\. Text may be hard to read\.$/i);
    if (match) {
      return `对比度过低（${match[1]}），文字可能难以辨认。`;
    }
    match = key.match(/^(.+) \(Experimental\)$/);
    if (match && Object.hasOwn(dictionary, match[1])) {
      return `${dictionary[match[1]]}（实验性）`;
    }
    match = key.match(/^Thought for (\d+)s$/);
    if (match) {
      return `已思考 ${match[1]} 秒`;
    }
    match = key.match(/^All changes since (.+)$/);
    if (match) {
      return `自 ${match[1]} 以来的所有变更`;
    }
    match = key.match(/^Agent needs permission to act on (.+)$/);
    if (match) {
      return `智能体需要权限以操作 ${match[1]}`;
    }
    match = key.match(/^(Submit|Continue) \((.+)\)$/);
    if (match) {
      return `${match[1] === 'Submit' ? '提交' : '继续'} (${match[2]})`;
    }
    match = key.match(/^Skip \((.+)\), Skip All \((.+)\)$/);
    if (match) {
      return `跳过 (${match[1]})，全部跳过 (${match[2]})`;
    }
    match = key.match(/^Running for (.+)$/);
    if (match) {
      return `已运行 ${formatDuration(match[1])}`;
    }
    match = key.match(/^No (automations|scheduled tasks|sidecars) match [“"]([\s\S]+)[”"]\.$/);
    if (match) {
      const noun = { automations: '自动化任务', 'scheduled tasks': '计划任务', sidecars: '扩展服务' }[match[1]];
      return `没有匹配“${match[2]}”的${noun}。`;
    }
    match = key.match(/^Step (\d+) of (\d+)$/);
    if (match) {
      return `第 ${match[1]} 步，共 ${match[2]} 步`;
    }
    match = key.match(/^An? (automation|scheduled task) with (?:the )?ID [“"]?(.+?)[”"]? already exists\.$/);
    if (match) {
      return `ID 为“${match[2]}”的${match[1] === 'automation' ? '自动化任务' : '计划任务'}已存在。`;
    }
    match = key.match(/^Task "([\s\S]+)" not found\.$/);
    if (match) {
      return `未找到任务“${match[1]}”。`;
    }
    match = key.match(/^Use (Fola|Arlo|Cleo|Finn|Gero|Lora|Neno|Olin|Tari)$/);
    if (match) {
      return `使用 ${match[1]}`;
    }
    return null;
  }
  const settingsNavIds = new Set(['General', 'App', 'Appearance', 'Project 4K',
    'Shortcuts', 'Notifications', 'Models', 'Customizations', 'Developer',
    'Running', 'Provide Feedback', 'Give Feedback', 'Account', 'Conversations']);
  function protectedContent(element, allowPermissionOption = false) {
    for (let content = element.closest(CONTENT); content; content = content.parentElement?.closest(CONTENT)) {
      if (allowPermissionOption && content.matches('[data-testid="ask-question-option-text"]')) continue;
      // The permission header embeds one fixed UI control alongside dynamic request text.
      if (content.matches('[data-testid="ask-question-header-text"]') &&
        element.closest('[data-testid="permission-details-toggle"]')) continue;
      return true;
    }
    return false;
  }
  function protectedNode(node, allowPermissionOption = false) {
    const element = node.nodeType === 1 ? node : node.parentElement;
    if (!element || element.closest(SKIP) || protectedContent(element, allowPermissionOption)) return true;
    // Settings' account and workspace/project nav buttons contain user data, not UI copy.
    const button = element.closest('button');
    if (!button) return false;
    if (/[^\s]+@[^\s]+/.test(button.textContent)) return true;
    const testId = button.getAttribute('data-testid');
    return !!(testId?.startsWith('settings-nav-item-') && !settingsNavIds.has(testId.slice(18)));
  }
  const allowedFragments = new Set(['(ADC)', 'Allowed Domains', 'Organization MCP Allowlist (Read-Only)',
    'Powered by Gemini Live ·', 'Terms of Service', 'This will permanently delete', 'within it.',
    'including', 'Zipping', 'in the top left.', 'menu)', 'to be installed.',
    'to be installed. The browser subagent can be invoked by typing /browser in the conversation input box.',
    'to have the agent generate a plan.', 'when working in this project.']);
  function translateNode(node, allowPermissionOption = false) {
    if (protectedNode(node, allowPermissionOption)) return;
    const current = node.nodeValue;
    const previous = records.get(node);
    if (previous && current === previous.translated) return;
    records.delete(node); // React may reuse a text node for a new label.
    const key = normalize(current);
    // Guard against React inline variable concatenation (e.g. ["Open ", x, " panel"] or ["Delete ", <strong>x</strong>]).
    const prevText = node.previousSibling?.nodeType === 3 ? english(node.previousSibling) : '';
    const nextText = node.nextSibling?.nodeType === 3 ? english(node.nextSibling) : '';
    const inlineConcat = (/\s$/.test(current) && /\S/.test(nextText)) ||
      (/^\s/.test(current) && /\S/.test(prevText)) ||
      (/\S/.test(prevText) && /\s$/.test(prevText)) ||
      (/\S/.test(nextText) && /^\s/.test(nextText)) ||
      (/^[A-Z][a-z]+\s+$/.test(current) && node.nextSibling?.tagName === 'STRONG');
    if (inlineConcat && !key.endsWith(':') && !allowedFragments.has(key)) return;
    const target = Object.hasOwn(dictionary, key) ? dictionary[key] : translateDynamic(key);
    if (!target) return;
    const translated = current.replace(/\S[\s\S]*\S|\S/, target);
    records.set(node, { original: current, translated });
    node.nodeValue = translated;
  }
  function translateMultiTextElement(el, allowPermissionOption = false) {
    if (el.children.length > 0 || el.childNodes.length < 2 || protectedNode(el, allowPermissionOption)) return false;
    const textNodes = [...el.childNodes].filter(n => n.nodeType === 3);
    if (textNodes.length < 2) return false;
    const originals = textNodes.map(english);
    const raw = originals.join('');
    const key = normalize(raw);
    const target = Object.hasOwn(dictionary, key) ? dictionary[key] : translateDynamic(key);
    if (!target) {
      for (const n of textNodes) {
        const rec = records.get(n);
        if (rec?.multi && n.nodeValue === rec.translated) {
          n.nodeValue = rec.original;
          records.delete(n);
        }
      }
      return false;
    }
    const translated = raw.replace(/\S[\s\S]*\S|\S/, target);
    textNodes.forEach((n, i) => {
      const next = i === 0 ? translated : '';
      records.set(n, { original: originals[i], translated: next, multi: true });
      if (n.nodeValue !== next) n.nodeValue = next;
    });
    return true;
  }
  function translatePlaceholder(el) {
    if (!el || el.parentElement?.closest(SKIP) || protectedContent(el)) return;
    const current = el.getAttribute('placeholder');
    if (!current) return;
    const previous = placeholderRecords.get(el);
    if (previous && current === previous.translated) return;
    placeholderRecords.delete(el);
    const key = normalize(current);
    if (!Object.hasOwn(dictionary, key)) return;
    const translated = current.replace(/\S[\s\S]*\S|\S/, dictionary[key]);
    placeholderRecords.set(el, { original: current, translated });
    el.setAttribute('placeholder', translated);
  }
  function translateAttrs(el) {
    if (!el || protectedContent(el) ||
      (el.matches('input,textarea') ? el.parentElement?.closest(SKIP) : el.closest(SKIP))) return;
    let entry = attrRecords.get(el);
    for (const attr of ['title', 'aria-label']) {
      const current = el.getAttribute(attr);
      if (!current) continue;
      const prev = entry?.[attr];
      if (prev && current === prev.translated) continue;
      if (entry) delete entry[attr];
      const key = normalize(current);
      if (key === 'Actions' || (!Object.hasOwn(dictionary, key) && !translateDynamic(key))) continue;
      const target = Object.hasOwn(dictionary, key) ? dictionary[key] : translateDynamic(key);
      const translated = current.replace(/\S[\s\S]*\S|\S/, target);
      if (!entry) { entry = {}; attrRecords.set(el, entry); }
      entry[attr] = { original: current, translated };
      el.setAttribute(attr, translated);
    }
  }
  function translateTree(root, allowPermissionOption = false) {
    if (!root || (root.nodeType === 1 && (protectedContent(root, allowPermissionOption) ||
      (!root.matches('input,textarea') && root.closest(SKIP))))) return;
    if (root.nodeType === 1 && translateMultiTextElement(root, allowPermissionOption)) return;
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT, {
      acceptNode(node) {
        if (node.nodeType === 1) {
          if (node.matches(SKIP + ',' + CONTENT) || translateMultiTextElement(node, allowPermissionOption)) {
            return NodeFilter.FILTER_REJECT;
          }
          return NodeFilter.FILTER_SKIP;
        }
        return NodeFilter.FILTER_ACCEPT;
      }
    });
    let node;
    while ((node = walker.nextNode())) translateNode(node, allowPermissionOption);
    if (root.nodeType === 1) {
      if (root.matches('input[placeholder],textarea[placeholder]')) translatePlaceholder(root);
      for (const el of root.querySelectorAll('input[placeholder],textarea[placeholder]')) {
        translatePlaceholder(el);
      }
    }
  }
  function findSettings() {
    if (settingsRoot?.isConnected) return settingsRoot;
    // Require the distinctive navigation tabs AND a settings heading. Fail closed.
    const roots = [...document.querySelectorAll('[aria-label="Settings"], [role="dialog"]')];
    for (const heading of document.querySelectorAll('h1')) {
      if (originalText(heading) !== 'Settings') continue;
      let ancestor = heading.parentElement;
      for (let i = 0; ancestor && i < 6; i++, ancestor = ancestor.parentElement) {
        if (ancestor === document.body) break;
        roots.push(ancestor);
      }
    }
    settingsRoot = roots.find(root => {
      if (root.matches?.('[aria-label="Settings"].settings-modal-container')) return true;
      const names = [...root.querySelectorAll('button')].map(originalText);
      return ['General', 'Application', 'Appearance'].every(name => names.includes(name)) &&
        [...root.querySelectorAll('h1,h2')].some(h => originalText(h) === 'Settings');
    });
    return settingsRoot;
  }
  const navigation = new Set(['New Conversation', 'Conversation History', 'Automations',
    'Scheduled Tasks', 'Customizations', 'Settings', 'Provide Feedback', 'Give Feedback',
    'Chief of Staff']);
  const sidebarTestIds = new Set(['automations-button', 'settings-button',
    'new-conversation-button', 'history-button', 'customizations-button', 'concierge-button']);
  const sidebarPlaceholders = new Set(['No conversations yet', 'No pinned conversations',
    'Drop to add to group', 'See all']);
  const projectTriggerLabels = new Set(['No Project', 'Select Project', 'Select Workspace',
    'New Workspace', 'No Workspace']);
  const chatInputPlaceholders = new Set(['Ask anything, @ to mention, / for actions',
    'Ask anything, @ to mention', 'Ask anything',
    'Message subagent, @ to mention, / for actions', 'Message subagent, @ to mention',
    'Listening. Ask anything.']);
  const historySafeTexts = new Set(['Conversation History',
    'Manage and revisit your past agent sessions.', 'Active', 'Archived', 'Select', 'Done',
    'Select all', 'Deselect all', 'Archive', 'Unarchive', 'Delete', 'Show more',
    'No matching conversations.', 'No archived conversations.', 'No conversations yet.',
    'No conversations found', 'Display Options', 'This page is going away soon',
    'Search conversations with', 'in the top left.', 'View archived in the sidebar', 'menu)']);
  const overviewSafeTexts = new Set(['Overview', 'Review', 'Files', 'Terminal', 'Plugins',
    'Subagents', 'Background Tasks', 'Goals', 'Documents', 'Artifacts', 'Links',
    'Modified Files', 'Uploads', 'Extensions', 'No subagents', 'No links', 'No uploads',
    'No plugins available', 'Needs attention', 'Approve', 'Deny', 'Blocked, needs input',
    'Agents', 'Chief of Staff Dashboard', 'Customize Sections', 'Show less',
    'Open in Side Panel', 'Open in Built-in Browser', 'Open in New Tab', 'Open in External Browser']);
  const permissionOptionSafeTexts = new Set(['Yes, allow', 'Yes, allow this time',
    'Yes, save rule in this conversation', 'Yes, and always allow in this conversation',
    'Yes, save rule globally', 'Yes, and always allow']);
  const approvalButtonSafeTexts = new Set(['Allow Once', 'Always Allow', 'Deny', 'Confirm',
    'Accept', 'Reject', 'Configure', 'Try Again']);
  const automationSafeTexts = new Set(['Automations', 'Scheduled Tasks', 'Scheduled', 'Always on',
    'Paused', 'Next run', 'Last run', 'Instructions', 'Runs', 'All runs', 'No runs yet',
    'No instructions.', 'No upcoming run.', 'Schedule', 'Model', 'Events', 'Run Now', 'Edit',
    'Save', 'Saved', 'Reset', 'Cancel', 'Delete', 'See less', 'Show all', 'Show less',
    'Paused. Resume it to schedule the next run.', 'Sidecar feature is not available.',
    'Runs a command', 'Could not start.', 'Starting', 'Paused.',
    'No automations configured.', 'No scheduled tasks configured.',
    'No automations matching your search', 'No scheduled tasks matching your search',
    'Back to Automations', 'Back to Scheduled Tasks', 'Loading runs…',
    'This sidecar failed to start.']);
  function buttonLeadLabel(btn) {
    const first = btn.firstChild;
    if (first?.nodeType === 3) return normalize(english(first));
    const trunc = btn.querySelector('span.truncate');
    return trunc ? originalText(trunc) : originalText(btn);
  }
  function isPermissionCard(card) {
    if (!card || card.closest(SKIP) || protectedContent(card)) return false;
    const header = card.querySelector('[data-testid="ask-question-header-text"]');
    const details = card.querySelector('[data-testid="permission-details-toggle"]');
    const input = card.querySelector('[data-testid="ask-question-writein"]');
    if (![header, details, input].every(el => el?.closest('[tabindex="-1"]') === card)) return false;
    const placeholder = placeholderRecords.get(input)?.original ?? input.getAttribute('placeholder');
    return normalize(placeholder || '') === '(tell the agent what to do instead)';
  }
  function scan() {
    if (disposed || !enabled || !document.body) return;
    observer.disconnect();
    try {
      for (const node of records.keys()) if (!node.isConnected) records.delete(node);
      for (const el of placeholderRecords.keys()) if (!el.isConnected) placeholderRecords.delete(el);
      for (const el of attrRecords.keys()) if (!el.isConnected) attrRecords.delete(el);
      const root = findSettings();
      if (root) {
        const supported = ['General', 'Application', 'Appearance', 'Models & Usage',
          'Shortcuts', 'Account', 'Provide Feedback', 'Give Feedback', 'Customizations',
          'Notifications', 'Project 4K', 'Permissions', 'Global Permissions',
          'GitHub Permissions', 'Developer', 'Workspaces', 'Projects', 'Not in Project'];
        const headings = [...root.querySelectorAll('h2')].map(originalText);
        if (headings.some(name => supported.includes(name))) {
          translateTree(root);
          for (const el of root.querySelectorAll('button[aria-label],input[aria-label]')) translateAttrs(el);
        } else {
          // Other settings screens can contain user-authored skills and project names.
          for (const el of root.querySelectorAll('button,h1,h2,div')) {
            if ((el.tagName !== 'DIV' || el.children.length === 0) &&
              ['Settings', 'General', 'Application', 'Appearance', 'Models',
                'Conversations', 'Shortcuts', 'Provide Feedback', 'Give Feedback', 'Account',
                'Customizations', 'Notifications', 'Project 4K', 'Permissions',
                'Global Permissions', 'GitHub Permissions', 'Developer', 'Back',
                'Workspaces', 'Projects', 'Not in Project',
                'Settings for conversations outside of projects.',
                'Settings for conversations outside of workspaces.',
                'Agent settings and permissions for conversations outside of projects.',
                'Agent settings and permissions for conversations outside of workspaces.'
              ].includes(originalText(el))) translateTree(el);
          }
        }
      }
      for (const vp of document.querySelectorAll('[data-testid="voice-picker"]')) {
        translateTree(vp);
        for (const el of vp.querySelectorAll('[aria-label],[title]')) translateAttrs(el);
      }
      // Only explicitly named global navigation controls; never project names/history.
      const sidebar = document.querySelector('[aria-label="Sidebar"]');
      if (sidebar) {
        for (const el of sidebar.querySelectorAll('button,a')) {
          const label = el.getAttribute('aria-label');
          const href = el.getAttribute('href');
          const testId = el.getAttribute('data-testid');
          const text = originalText(el);
          const knownLink = el.tagName === 'A' && ['/', '/history', '/customizations'].includes(href);
          const rowChild = el.closest('[data-sidebar-row-id],[data-testid^="conversation-row-"]');
          if ((label && navigation.has(label)) || (knownLink && navigation.has(text)) ||
            (testId && sidebarTestIds.has(testId)) ||
            text === 'Provide Feedback' || text === 'Give Feedback' ||
            (!rowChild && (/^See all \(\d+\)$/.test(text) || text === 'See all' || text === 'See less' || text === 'Show less'))) {
            translateTree(el);
          }
        }
        for (const el of sidebar.querySelectorAll(
          '[data-testid="conversation-archive-button"],[data-testid="conversation-pin-button"],[data-testid="conversation-kebab"]'
        )) {
          translateAttrs(el);
        }
        for (const el of sidebar.querySelectorAll('[data-testid="section-header"] h2')) {
          translateTree(el);
        }
        for (const el of sidebar.querySelectorAll('span')) {
          const text = !el.closest('[data-sidebar-row-id],[data-testid^="conversation-row-"]') ? originalText(el) : '';
          if (text && (sidebarPlaceholders.has(text) || /^See all \(\d+\)$/.test(text))) {
            translateTree(el);
          }
        }
      }
      // Project selector trigger on home / chat view (only UI placeholder states, never project names).
      for (const el of document.querySelectorAll('[data-testid="project-selector-trigger"]')) {
        if (projectTriggerLabels.has(originalText(el))) translateTree(el);
      }
      // Chat input box (Lexical editor content is protected by [contenteditable] in SKIP).
      for (const el of document.querySelectorAll('[data-testid="agent-input-box"]')) {
        translateTree(el);
      }
      for (const el of document.querySelectorAll('p.pointer-events-none')) {
        if (chatInputPlaceholders.has(originalText(el))) translateTree(el);
      }
      // Changed files summary bar in conversation view (only the header bar, never expanded file paths).
      for (const el of document.querySelectorAll('.files-changed-header,[data-testid="cleared-step-notice"]')) {
        translateTree(el);
      }
      // P0: Conversation stream approval, AskQuestion, Plan/Artifact review, and Thinking chrome.
      for (const el of document.querySelectorAll(
        '[data-testid="interaction-skip-button"],[data-testid="interaction-continue-button"],' +
        '[data-testid="permission-details-toggle"],.proceed-button,' +
        '[data-testid="artifact-card-split-button"],[data-testid="open-in-new-window-action"]'
      )) {
        translateTree(el);
      }
      for (const span of document.querySelectorAll('button > span.whitespace-nowrap')) {
        if (span.firstChild?.nodeType === 3 && normalize(english(span.firstChild)) === 'Proceed') {
          translateNode(span.firstChild);
        }
      }
      for (const el of document.querySelectorAll(
        '[data-testid="ask-question-collapse-button"],[data-testid="ask-question-dismiss-button"]'
      )) {
        translateAttrs(el);
      }
      for (const el of document.querySelectorAll('[data-testid="ask-question-progress"]')) {
        for (const btn of el.parentElement?.querySelectorAll('button') ?? []) translateAttrs(btn);
      }
      for (const el of document.querySelectorAll('[data-testid="ask-question-header-text"]')) {
        const badge = el.nextElementSibling;
        if (badge && originalText(badge) === 'Multi-select') translateTree(badge);
      }
      for (const el of document.querySelectorAll('[data-testid="ask-question-writein"]')) {
        const rawPh = placeholderRecords.get(el)?.original ?? el.getAttribute('placeholder');
        translatePlaceholder(el);
        if (rawPh && normalize(rawPh) === '(tell the agent what to do instead)') {
          const card = el.closest('[tabindex="-1"]');
          if (isPermissionCard(card)) {
            const prev = el.previousElementSibling;
            if (prev?.firstChild?.nodeType === 3 && prev.childNodes.length === 1 &&
              !protectedNode(prev.firstChild) && originalText(prev) === 'No') {
              const n = prev.firstChild, cur = n.nodeValue;
              if (records.get(n)?.translated !== cur) {
                const tr = cur.replace(/\S+/, '否');
                records.set(n, { original: cur, translated: tr });
                n.nodeValue = tr;
              }
            }
            for (const opt of card.querySelectorAll('[data-testid="ask-question-option-text"]')) {
              if (opt.closest('[tabindex="-1"]') === card && permissionOptionSafeTexts.has(originalText(opt))) {
                translateTree(opt, true);
              }
            }
          }
        }
      }
      // 2.29.1 approval rows have a fixed prompt AND a specific set of controls.
      // A matching button label alone can also be user/model content.
      for (const bar of document.querySelectorAll('.flex-wrap')) {
        if (protectedNode(bar)) continue;
        const prompt = bar.querySelector(':scope > p,:scope > span > p');
        if (!prompt || protectedNode(prompt)) continue;
        const text = originalText(prompt);
        const buttons = [...bar.querySelectorAll('button')].filter(btn => !protectedNode(btn));
        const labels = new Set(buttons.map(buttonLeadLabel));
        const commandInput = text === 'Send command input?' && labels.has('Reject') && labels.has('Accept');
        const browserPermission = /^Agent needs permission to act on .+$/.test(text) &&
          ['Configure', 'Deny', 'Always Allow'].every(label => labels.has(label));
        if (!commandInput && !browserPermission) continue;
        translateTree(prompt);
        for (const button of buttons) {
          if (approvalButtonSafeTexts.has(buttonLeadLabel(button))) translateTree(button);
        }
      }
      for (const btn of document.querySelectorAll('button[aria-label]')) {
        const rawAria = attrRecords.get(btn)?.['aria-label']?.original ?? btn.getAttribute('aria-label');
        if (rawAria !== 'Confirm Browser Interaction' || protectedNode(btn)) continue;
        const bar = btn.parentElement?.parentElement;
        const prompt = bar?.querySelector(':scope > span > span');
        const deny = [...(btn.parentElement?.querySelectorAll('button') ?? [])]
          .find(button => buttonLeadLabel(button) === 'Deny');
        if (prompt && originalText(prompt) === 'Confirmation required to execute this step' && deny) {
          translateTree(prompt);
          translateTree(deny);
          translateTree(btn);
          translateAttrs(btn);
        }
      }
      for (const el of document.querySelectorAll('[data-testid="thinking-collapsible-trigger"]')) {
        if (originalText(el) !== 'Thinking') {
          translateTree(el);
          translateAttrs(el);
        }
      }
      // Portal dropdown menus, select popups, popovers, hover cards, and tooltips.
      for (const el of document.querySelectorAll(POPUPS)) {
        translateTree(el);
      }
      // Right-side Overview panel (only known UI labels, never file/artifact names).
      for (const panel of document.querySelectorAll('[data-testid="overview-panel"]')) {
        for (const el of panel.querySelectorAll('span,button,div')) {
          if (el.children.length === 0 && overviewSafeTexts.has(originalText(el))) {
            translateTree(el);
          }
        }
      }
      // P1a: Automations view in main pane (legacy + 2.29.1 main-document views, protecting task names & prompts).
      for (const el of document.querySelectorAll(
        '[data-testid="cloud-triggers-view"],[data-testid="trigger-InlineCreator"],[data-testid="automation-detail-view"],' +
        '[data-testid="new-sidecar-modal"]'
      )) {
        const rootEl = el.matches('[data-testid="new-sidecar-modal"]') ? (el.closest('[role="dialog"]') || el) : el;
        translateTree(rootEl);
        for (const b of rootEl.querySelectorAll('[aria-label],[title]')) translateAttrs(b);
      }
      for (const view of document.querySelectorAll(
        '[data-testid="sidecars-view"],[data-testid="automation-detail-page"],[data-testid="sidecar-detail"]'
      )) {
        for (const sub of view.querySelectorAll(
          '[data-testid="sidecar-list-empty"],[data-testid="automation-group"],' +
          '[data-testid="cloud-trigger-renew-all-credentials"],[data-testid="sidecar-create-with-prompt"],' +
          '[data-testid="sidecar-new-button"],[data-testid="sidecar-detail-run-now"],' +
          '[data-testid="cloud-trigger-detail-run-now"],[data-testid="automation-instructions-edit"],' +
          '[data-testid="automation-settings-edit"],[data-testid="automation-settings-save"],' +
          '[data-testid="automation-settings-cancel"],[data-testid="automation-runs-all"],' +
          '[data-testid="schedule-editor-panel"],[data-testid="cloud-trigger-editor-panel"]'
        )) {
          translateTree(sub);
        }
        for (const inp of view.querySelectorAll('input[placeholder],textarea[placeholder]')) {
          translatePlaceholder(inp);
        }
        for (const b of view.querySelectorAll(
          'button[aria-label],[data-testid="automation-untrusted-warning"],[data-testid="automation-error"],' +
          '[data-testid="automation-next-run"]'
        )) {
          translateAttrs(b);
        }
        for (const leaf of view.querySelectorAll('h1,h2,p,span,button,label,div')) {
          const text = leaf.children.length === 0 ? originalText(leaf) : '';
          if (text && (automationSafeTexts.has(text) || /^Task "[\s\S]+" not found\.$/.test(text))) {
            translateTree(leaf);
          }
        }
      }
      // P1b: Right & bottom panel host toolbars (Terminal, Review/Diff mode selector, Built-in Browser).
      for (const el of document.querySelectorAll(
        '[data-testid="bottom-terminal-panel-title"],[data-testid="bottom-terminal-panel-starting"],' +
        '[data-testid="bottom-terminal-panel-empty"],[data-testid="terminal-tab-connecting"],' +
        '[data-testid="terminal-password-warning"]'
      )) {
        translateTree(el);
        translateAttrs(el);
      }
      for (const el of document.querySelectorAll(
        '[data-testid="bottom-terminal-panel-new"],[data-testid="bottom-terminal-panel-close"],' +
        '[data-testid="terminal-add-button"],[data-testid^="bottom-terminal-panel-split-"],' +
        '[data-testid^="bottom-terminal-panel-kill-"]'
      )) {
        translateAttrs(el);
      }
      for (const span of document.querySelectorAll('span.font-medium.text-sm')) {
        if (originalText(span) === 'Terminals') {
          translateTree(span);
          const scopeBtn = span.parentElement?.querySelector('button');
          if (scopeBtn && ['Conversation', 'Project'].includes(originalText(scopeBtn))) translateTree(scopeBtn);
        }
      }
      for (const el of document.querySelectorAll(
        '[data-testid="diff-view-mode-trigger"],[data-testid="diff-view-mode-option"]'
      )) {
        translateTree(el);
        const header = el.closest('.flex.items-center.text-sm');
        if (header) {
          for (const s of header.querySelectorAll(':scope > span.font-medium')) {
            if (originalText(s) === 'Review') translateTree(s);
          }
        }
      }
      for (const btn of document.querySelectorAll('button')) {
        const rawAria = attrRecords.get(btn)?.['aria-label']?.original ?? btn.getAttribute('aria-label');
        if (rawAria === 'Clear filter') {
          translateAttrs(btn);
          const turnChip = btn.parentElement;
          const header = turnChip?.parentElement;
          if (turnChip?.firstElementChild && originalText(turnChip.firstElementChild) === 'For Turn') {
            translateTree(turnChip.firstElementChild);
          }
          if (header?.firstElementChild && originalText(header.firstElementChild) === 'Review') {
            translateTree(header.firstElementChild);
          }
        }
      }
      for (const reloadBtn of document.querySelectorAll('[data-testid="builtin-browser-reload"]')) {
        const bar = reloadBtn.parentElement;
        for (const btn of bar ? bar.querySelectorAll('button') : [reloadBtn]) translateAttrs(btn);
      }
      for (const inp of document.querySelectorAll('[data-testid="browser-url-input"]')) {
        translatePlaceholder(inp);
        translateAttrs(inp);
      }
      for (const btn of document.querySelectorAll(
        '[data-testid="webview-download-show-in-folder"],[data-testid="webview-download-cancel"],' +
        '[data-testid="webview-download-remove"]'
      )) {
        translateAttrs(btn);
      }
      // Standalone Customizations view in main pane (2.29.1 Marketplace/Installed + legacy /customizations).
      for (const search of document.querySelectorAll('[data-testid="customizations-search"]')) {
        const panel = search.closest('.overflow-y-auto') || search.closest('.max-w-4xl')?.parentElement?.parentElement || search.parentElement;
        if (panel) {
          translateTree(panel);
          for (const el of panel.querySelectorAll('[aria-label],[title]')) {
            if (!el.matches('[data-testid="featured-carousel-member-tile"],[data-testid="featured-carousel-description"]')) {
              translateAttrs(el);
            }
          }
        }
      }
      if (location.pathname === '/customizations') {
        for (const h2 of document.querySelectorAll('h2')) {
          if (originalText(h2) === 'Customizations') {
            const panel = h2.closest('.max-w-2xl')?.parentElement || h2.parentElement;
            if (panel) translateTree(panel);
          }
        }
      }
      // Conversation History view (/history and home history section), excluding conversation rows.
      for (const input of document.querySelectorAll('input[placeholder]')) {
        const record = placeholderRecords.get(input);
        const rawPlaceholder = record ? record.original : input.getAttribute('placeholder');
        if (rawPlaceholder && normalize(rawPlaceholder) === 'Search conversations...') {
          translatePlaceholder(input);
          const container = input.closest('.max-w-3xl,.max-w-2xl') || input.parentElement?.parentElement?.parentElement;
          if (container) {
            for (const el of container.querySelectorAll('h1,p,button,span')) {
              if (!el.closest('[role="button"]') && historySafeTexts.has(originalText(el))) {
                translateTree(el);
              }
            }
          }
        }
      }
    } finally {
      observe();
    }
  }
  function observe() {
    if (!disposed && enabled && document.body) observer.observe(document.body, {
      childList: true, subtree: true, characterData: true,
      attributes: true, attributeFilter: ['aria-label', 'title', 'placeholder']
    });
  }
  function schedule() {
    if (scheduled || disposed || !enabled) return;
    scheduled = true;
    window.requestAnimationFrame(() => { scheduled = false; scan(); });
  }
  function onMutations(mutations) {
    if (mutations.some(m => {
      const el = m.target.nodeType === 1 ? m.target : m.target.parentElement;
      if (!el) return false;
      const protectedElement = m.type === 'attributes' && el.matches('input,textarea') ? el.parentElement : el;
      if (protectedElement?.closest(SKIP)) return false;
      if (protectedContent(el)) {
        // Only verified permission options can contain translatable text here.
        return !!el.closest('[data-testid="ask-question-option-text"]') &&
          isPermissionCard(el.closest('[tabindex="-1"]'));
      }
      if (el.closest(UI_TARGETS) || isPermissionCard(el.closest('[tabindex="-1"]'))) return true;
      if (m.type !== 'childList') return false;
      return [...m.addedNodes, ...m.removedNodes].some(node => {
        if (node.nodeType !== 1 || node.matches(SKIP) || protectedContent(node)) return false;
        if (node.matches(UI_TARGETS)) return true;
        return [...node.querySelectorAll(UI_TARGETS)].some(candidate =>
          !candidate.closest(SKIP) && !protectedContent(candidate));
      });
    })) schedule();
  }
  function restore() {
    observer?.disconnect();
    for (const [node, record] of records) {
      // Do not revert text updated by the application after our last scan.
      if (node.isConnected && node.nodeValue === record.translated) node.nodeValue = record.original;
    }
    records.clear();
    for (const [el, record] of placeholderRecords) {
      if (el.isConnected && el.getAttribute('placeholder') === record.translated) {
        el.setAttribute('placeholder', record.original);
      }
    }
    placeholderRecords.clear();
    for (const [el, entry] of attrRecords) {
      if (!el.isConnected) continue;
      for (const [attr, record] of Object.entries(entry)) {
        if (el.getAttribute(attr) === record.translated) el.setAttribute(attr, record.original);
      }
    }
    attrRecords.clear();
  }
  function setEnabled(value) {
    enabled = !!value;
    if (enabled) { scan(); observe(); } else restore();
    if (control) {
      control.textContent = enabled ? '中文 · 开' : '中文 · 关';
      control.setAttribute('aria-pressed', String(enabled));
    }
  }
  function init() {
    if (disposed || !document.body) return;
    observer = new MutationObserver(onMutations);
    control = document.createElement('button');
    control.type = 'button';
    control.dataset.antigravityZhControl = VERSION;
    control.title = '徐老师AI 汉化：点击切换中英文；重启默认开启';
    control.setAttribute('aria-label', '切换界面汉化');
    control.style.cssText = 'position:fixed;right:12px;bottom:12px;z-index:2147483647;' +
      'font:12px system-ui;padding:6px 10px;border:1px solid #aaa;border-radius:20px;' +
      'background:#fff;color:#222;cursor:pointer;box-shadow:0 2px 8px #0002';
    control.addEventListener('click', () => setEnabled(!enabled));
    document.body.appendChild(control);
    setEnabled(true);
  }
  function translateMenu(items, parentId = '') {
    if (!enabled || !Array.isArray(items)) return items;
    return items.map(item => {
      if (!item || typeof item !== 'object') return item;
      const skipLabel = parentId === 'fork' || (parentId === 'move-to-group' && item.type === 'checkbox');
      const key = !skipLabel && typeof item.label === 'string' ? normalize(item.label) : '';
      const target = key ? (Object.hasOwn(dictionary, key) ? dictionary[key] : translateDynamic(key)) : null;
      const label = target ? item.label.replace(/\S[\s\S]*\S|\S/, target) : item.label;
      const submenu = Array.isArray(item.submenu) ? translateMenu(item.submenu, item.id || '') : item.submenu;
      return label === item.label && submenu === item.submenu ? item : { ...item, label, submenu };
    });
  }
  window[KEY] = Object.freeze({
    version: VERSION,
    setEnabled,
    refresh: scan,
    translateMenu,
    dispose() {
      disposed = true;
      restore();
      control?.remove();
      document.removeEventListener('DOMContentLoaded', init);
      delete window[KEY];
    }
  });
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true });
  else init();
})();

const {test} = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const {JSDOM} = require('jsdom');
const dictionary = JSON.parse(fs.readFileSync('locales/zh-CN.json','utf8'));
const source = fs.readFileSync('src/runtime.js','utf8').replace('/*__DICTIONARY__*/ {}',JSON.stringify(dictionary));
const html = `<aside aria-label="Sidebar"><a href="/">New Conversation</a><button aria-label="Settings">Settings</button><button>General</button></aside>
<main><div id="chat">Settings</div><pre>General</pre><textarea>Appearance</textarea></main>
<section aria-label="Settings"><h1>Settings</h1><nav><button>General</button><button>Application</button><button>Appearance</button></nav><article><h2>General</h2><p id="copy">Global Permissions</p><button id="account"><span>General</span><span>person@example.invalid</span></button><pre>Settings</pre><code>Default</code><input value="General"><div contenteditable="true">Settings</div><div translate="no">General</div><div data-no-translate>Settings</div></article></section>`;
function create(body=html,url='http://127.0.0.1:12345/') {
 const dom=new JSDOM(body,{url,runScripts:'outside-only',pretendToBeVisual:true});
 dom.window.eval(source);
 dom.window.document.dispatchEvent(new dom.window.Event('DOMContentLoaded'));
 const close = dom.window.close.bind(dom.window);
 dom.window.close = () => { dom.window.__teacherxu_antigravity_zh__?.dispose(); close(); };
 return dom;
}
const wait = () => new Promise(r=>setTimeout(r,60));
test('translates settings and named navigation but leaves chat, code, account and input untouched',()=>{
 const dom=create(), d=dom.window.document;
 assert.equal(d.querySelector('h1').textContent,'设置');
 assert.equal(d.querySelector('#copy').textContent,'全局权限');
 assert.equal(d.querySelector('aside a').textContent,'新建对话');
 assert.equal(d.querySelector('aside button:last-child').textContent,'General');
 assert.equal(d.querySelector('#chat').textContent,'Settings');
 assert.equal(d.querySelector('#account span').textContent,'General');
 assert.equal(d.querySelector('article pre').textContent,'Settings');
 assert.equal(d.querySelector('article code').textContent,'Default');
 assert.equal(d.querySelector('input').value,'General');
 assert.equal(d.querySelector('[contenteditable]').textContent,'Settings');
 assert.equal(d.querySelector('[translate="no"]').textContent,'General');
 dom.window.close();
});
test('toggle and dispose restore exact whitespace and all original text',()=>{
 const dom=create(html.replace('id="copy">Global Permissions','id="copy">  Global Permissions  ')), w=dom.window,d=w.document;
 assert.equal(d.querySelector('#copy').textContent,'  全局权限  ');
 w.__teacherxu_antigravity_zh__.setEnabled(false);
 assert.equal(d.querySelector('#copy').textContent,'  Global Permissions  ');
 w.__teacherxu_antigravity_zh__.setEnabled(true);
 assert.equal(d.querySelector('#copy').textContent,'  全局权限  ');
 w.__teacherxu_antigravity_zh__.dispose();
 assert.equal(d.querySelector('h1').textContent,'Settings');
 assert.equal(d.querySelector('[data-antigravity-zh-control]'),null);
 dom.window.close();
});
test('handles React text updates, new nodes, and removed settings panels', async()=>{
 const dom=create(), w=dom.window,d=w.document;
 d.querySelector('#copy').firstChild.nodeValue='Remote Control';
 await wait();
 assert.equal(d.querySelector('#copy').textContent,'远程控制');
 const p=d.createElement('p');p.textContent='Prevent Sleep';d.querySelector('article').append(p);
 await wait();assert.equal(p.textContent,'防止休眠');
 d.querySelector('section').remove();
 d.querySelector('#chat').textContent='Global Permissions';
 await wait();assert.equal(d.querySelector('#chat').textContent,'Global Permissions');
 dom.window.close();
});
test('does not restore stale data when the app updates text before toggle',()=>{
 const dom=create(),w=dom.window,d=w.document;
 d.querySelector('#copy').textContent='New server value';
 w.__teacherxu_antigravity_zh__.setEnabled(false);
 assert.equal(d.querySelector('#copy').textContent,'New server value');dom.window.close();
});
test('does not translate unrelated dialogs or sign-in websites',()=>{
 const dom=create('<div role="dialog"><h1>Settings</h1><p>General</p></div>');
 assert.equal(dom.window.document.querySelector('p').textContent,'General');dom.window.close();
 const auth=create(html,'https://accounts.google.com/');
 assert.equal(auth.window.document.querySelector('h1').textContent,'Settings');
 assert.equal(auth.window.__teacherxu_antigravity_zh__,undefined);auth.window.close();
});
test('does not translate custom skill names on Conversations settings screen',()=>{
 const dom=create(html.replace('<h2>General</h2>','<h2>Conversations</h2>').replace('id="copy">Global Permissions','id="copy">Default'));
 assert.equal(dom.window.document.querySelector('#copy').textContent,'Default');dom.window.close();
});
test('installing payload twice creates only one switch',()=>{
 const dom=create();dom.window.eval(source);
 assert.equal(dom.window.document.querySelectorAll('[data-antigravity-zh-control]').length,1);dom.window.close();
});
test('translation dictionary is plain exact-match strings with no markup',()=>{
 for (const [en,zh] of Object.entries(dictionary)) {
  assert.equal(en.trim(),en);assert.equal(typeof zh,'string');assert.ok(zh.length);assert.ok(!/[<>]/.test(zh));
 }
});
test('translates 2.23.0 sidebar sections, testid buttons, project selector, and placeholders while protecting user names',()=>{
 const dom=create(`<aside aria-label="Sidebar">
  <button data-testid="automations-button"><span>Automations</span></button>
  <button data-testid="settings-button"><span>Settings</span></button>
  <div data-testid="section-header"><h2>Projects</h2></div>
  <div data-testid="section-header"><h2>Conversations</h2></div>
  <span>No conversations yet</span>
  <div data-sidebar-row-id="conv-1"><span>No conversations yet</span></div>
 </aside>
 <main>
  <button data-testid="project-selector-trigger"><span>No Project</span></button>
  <button data-testid="project-selector-trigger"><span>General</span></button>
  <p class="pointer-events-none">Ask anything, @ to mention, / for actions</p>
  <div class="max-w-2xl">
   <h1>Conversation History</h1>
   <input placeholder="Search conversations...">
   <div role="button"><span>Conversation History</span></div>
  </div>
 </main>`);
 const w=dom.window,d=w.document;
 assert.equal(d.querySelector('[data-testid="automations-button"]').textContent,'自动化');
 assert.equal(d.querySelector('[data-testid="settings-button"]').textContent,'设置');
 assert.deepEqual([...d.querySelectorAll('[data-testid="section-header"] h2')].map(e=>e.textContent),['项目','对话']);
 assert.equal(d.querySelector('aside > span').textContent,'暂无对话');
 assert.equal(d.querySelector('[data-sidebar-row-id] span').textContent,'No conversations yet');
 const triggers=d.querySelectorAll('[data-testid="project-selector-trigger"]');
 assert.equal(triggers[0].textContent,'未选择项目');
 assert.equal(triggers[1].textContent,'General');
 assert.equal(d.querySelector('p.pointer-events-none').textContent,'尽管提问，输入 @ 引用内容，输入 / 执行操作');
 assert.equal(d.querySelector('main h1').textContent,'对话历史');
 assert.equal(d.querySelector('main input').getAttribute('placeholder'),'搜索对话...');
 assert.equal(d.querySelector('main [role="button"] span').textContent,'Conversation History');
 w.__teacherxu_antigravity_zh__.setEnabled(false);
 assert.equal(d.querySelector('main input').getAttribute('placeholder'),'Search conversations...');
 dom.window.close();
});
test('translates dynamic quota refresh strings, plan description, chat toolbar, and overview panel',()=>{
 const dom=create(`<section aria-label="Settings"><h1>Settings</h1><nav><button>General</button><button>Application</button><button>Appearance</button></nav><article><h2>Models &amp; Usage</h2>
  <p id="plan-desc">You are subscribed to the best Google AI plan.</p>
  <p id="q1">You have used some of your weekly limit, it will fully refresh in 3 days, 20 hours.</p>
  <p id="q2">You have used some of your 5-hour limit, it will fully refresh in 1 hour, 47 minutes.</p>
 </article></section>
 <div data-testid="agent-input-box">
  <div contenteditable="true">Medium</div>
  <button data-testid="model-selector-trigger"><span>Gemini 4 Argon<span class="opacity-70"> Medium</span></span></button>
  <button><span id="mode-turbo">Turbo</span></button>
 </div>
 <div data-testid="overview-panel"><span id="ov-title">Overview</span><span id="ov-file">main.js</span></div>`);
 const w=dom.window,d=w.document;
 assert.equal(d.querySelector('#plan-desc').textContent,'你已订阅最高等级的 Google AI 套餐。');
 assert.equal(d.querySelector('#q1').textContent,'你已使用部分本周额度，将于 3 天 20 小时后完全恢复。');
 assert.equal(d.querySelector('#q2').textContent,'你已使用部分 5 小时额度，将于 1 小时 47 分钟后完全恢复。');
 assert.equal(d.querySelector('[contenteditable]').textContent,'Medium');
 assert.equal(d.querySelector('[data-testid="model-selector-trigger"]').textContent,'Gemini 4 Argon 中');
 assert.equal(d.querySelector('#mode-turbo').textContent,'极速模式（Turbo）');
 assert.equal(d.querySelector('#ov-title').textContent,'概览');
 assert.equal(d.querySelector('#ov-file').textContent,'main.js');
 w.__teacherxu_antigravity_zh__.setEnabled(false);
 assert.equal(d.querySelector('#q1').textContent,'You have used some of your weekly limit, it will fully refresh in 3 days, 20 hours.');
 dom.window.close();
});
test('translates portal dropdown menus and changed files bar while protecting project and model names',()=>{
 const dom=create(`<div class="files-changed-header"><span id="fc-count">1 file changed</span><button class="review-button"><span>Review</span></button></div>
  <div class="z-[6000]">
   <div role="menu">
    <div data-testid="permissions-project-options"><span>Request Review</span><span>Every command requires approval.</span></div>
    <div data-testid="project-selector-item" data-project-name="General"><span>General</span></div>
    <span data-model-base="Default">Default</span>
   </div>
  </div>`);
 const w=dom.window,d=w.document;
 assert.equal(d.querySelector('#fc-count').textContent,'1 个文件已修改');
 assert.equal(d.querySelector('.review-button').textContent,'审查变更');
 assert.equal(d.querySelector('[data-testid="permissions-project-options"]').textContent,'请求审核每条命令都需要你的批准。');
 assert.equal(d.querySelector('[data-testid="project-selector-item"]').textContent,'General');
 assert.equal(d.querySelector('[data-model-base]').textContent,'Default');
 w.__teacherxu_antigravity_zh__.setEnabled(false);
 assert.equal(d.querySelector('#fc-count').textContent,'1 file changed');
 dom.window.close();
});
test('translates 2.29.1 narrow settings, experimental labs, hover cards, concierge, and subagent placeholders while protecting workspace nav and toasts',()=>{
 const dom=create(`<aside aria-label="Sidebar">
  <button data-testid="concierge-button"><span>Chief of Staff</span></button>
  <button><span>Give Feedback</span></button>
 </aside>
 <div aria-label="Settings" class="agy-dialog settings-modal-container">
  <button data-testid="settings-nav-item-Provide Feedback"><span>Give Feedback</span></button>
  <button data-testid="settings-nav-item-Files"><span>Files</span></button>
  <h2>General</h2>
  <span id="lab">Inline Actions (Experimental)</span>
  <span id="voice">Voice volume</span>
 </div>
 <p class="pointer-events-none">Message subagent, @ to mention, / for actions</p>
 <div class="z-[7000]"><div data-hover-card-popup=""><span>Context and Quota Indicator</span></div></div>
 <div class="z-[7000] toast-viewport"><span id="toast-msg">Files</span></div>
 <div data-testid="overview-panel"><span id="ov-cos">Chief of Staff Dashboard</span></div>`);
 const w=dom.window,d=w.document;
 assert.equal(d.querySelector('[data-testid="concierge-button"]').textContent,'幕僚长（Chief of Staff）');
 assert.equal(d.querySelector('aside button:last-child').textContent,'提交反馈');
 assert.equal(d.querySelector('[data-testid="settings-nav-item-Provide Feedback"]').textContent,'提交反馈');
 assert.equal(d.querySelector('[data-testid="settings-nav-item-Files"]').textContent,'Files');
 assert.equal(d.querySelector('#lab').textContent,'内联快捷操作（实验性）');
 assert.equal(d.querySelector('#voice').textContent,'语音音量');
 assert.equal(d.querySelector('p.pointer-events-none').textContent,'向子智能体发送消息，输入 @ 引用内容，输入 / 执行操作');
 assert.equal(d.querySelector('[data-hover-card-popup]').textContent,'上下文与配额指示器');
 assert.equal(d.querySelector('#toast-msg').textContent,'Files');
 assert.equal(d.querySelector('#ov-cos').textContent,'幕僚长面板');
 w.__teacherxu_antigravity_zh__.setEnabled(false);
 assert.equal(d.querySelector('#lab').textContent,'Inline Actions (Experimental)');
 dom.window.close();
});
test('P0: translates approval cards, AskQuestion chrome, Plan Proceed, and Thought header while protecting AskQuestion options and hover previews', async()=>{
 const dom=create(`<main>
  <div class="flex-wrap">
   <p id="perm-msg">Agent needs permission to act on example.com</p>
   <button id="perm-cfg">Configure</button>
   <button id="perm-deny">Deny</button>
   <button id="perm-once">Allow Once</button>
   <button id="perm-always">Always Allow<span class="opacity-40">⌘⏎</span></button>
  </div>
  <div><div class="text-sm flex w-full items-center justify-between flex-wrap"><p id="cmd-msg">Send command input?</p><div><button id="cmd-rej">Reject</button><button id="cmd-acc">Accept</button></div></div></div>
  <div id="ask-card" tabindex="-1">
   <div data-testid="ask-question-header-text"><p>Settings</p></div><span>Multi-select</span>
   <div><button id="q-prev" aria-label="Previous question"></button><span data-testid="ask-question-progress">1/2</span><button id="q-next" aria-label="Next question"></button></div>
   <button data-testid="ask-question-collapse-button" aria-label="Collapse questionnaire"></button>
   <button data-testid="ask-question-dismiss-button" aria-label="Cancel questionnaire"></button>
   <label data-testid="ask-question-option"><div data-testid="ask-question-option-text">Yes, allow</div></label>
   <textarea data-testid="ask-question-writein" placeholder="Other (write your answer)"></textarea>
   <button data-testid="interaction-skip-button">Skip</button>
   <button data-testid="interaction-continue-button">Submit<span>↵</span></button>
  </div>
  <div id="perm-card" tabindex="-1">
   <div data-testid="ask-question-header-text">Permission request</div>
   <button data-testid="permission-details-toggle"><span>Show details</span></button>
   <label data-testid="ask-question-option"><div data-testid="ask-question-option-text" id="po-once">Yes, allow this time</div></label>
   <label data-testid="ask-question-option"><div data-testid="ask-question-option-text" id="po-all">Yes, and always allow</div></label>
   <label data-testid="ask-question-option"><div data-testid="ask-question-option-text" id="po-dyn">Yes, and always allow 'npm test'</div></label>
   <div><span id="po-no">No</span><textarea data-testid="ask-question-writein" placeholder="(tell the agent what to do instead)"></textarea></div>
  </div>
  <button class="proceed-button">Proceed<span>⌘⏎</span></button>
  <button><span class="whitespace-nowrap" id="hdr-proceed">Proceed<span> • 2</span></span></button>
  <button data-testid="thinking-collapsible-trigger" id="th-done" aria-label="Thought Process"><span>Thought for 8s</span></button>
  <button data-testid="thinking-collapsible-trigger" id="th-live"><span>Thinking</span></button>
  <div data-hover-card-popup=""><div data-testid="ask-question-option-hover-card" id="aq-hover">Settings</div></div>
  <div role="tooltip" id="aq-tip">Submit (↵)</div>
  <pre id="stream-code">General</pre>
 </main>`);
 const w=dom.window,d=w.document;
 assert.equal(d.querySelector('#perm-msg').textContent,'智能体需要权限以操作 example.com');
 assert.equal(d.querySelector('#perm-cfg').textContent,'配置');
 assert.equal(d.querySelector('#perm-deny').textContent,'禁止');
 assert.equal(d.querySelector('#perm-once').textContent,'仅允许本次');
 assert.equal(d.querySelector('#perm-always').textContent,'始终允许⌘⏎');
 assert.equal(d.querySelector('#cmd-msg').textContent,'是否向命令发送输入？');
 assert.equal(d.querySelector('#cmd-rej').textContent,'拒绝');
 assert.equal(d.querySelector('#cmd-acc').textContent,'接受');
 assert.equal(d.querySelector('#ask-card [data-testid="ask-question-header-text"]').textContent,'Settings');
 assert.equal(d.querySelector('#ask-card [data-testid="ask-question-header-text"] + span').textContent,'多选');
 assert.equal(d.querySelector('#q-prev').getAttribute('aria-label'),'上一题');
 assert.equal(d.querySelector('#q-next').getAttribute('aria-label'),'下一题');
 assert.equal(d.querySelector('[data-testid="ask-question-collapse-button"]').getAttribute('aria-label'),'收起问卷');
 assert.equal(d.querySelector('[data-testid="ask-question-dismiss-button"]').getAttribute('aria-label'),'取消问卷');
 assert.equal(d.querySelector('#ask-card [data-testid="ask-question-option-text"]').textContent,'Yes, allow');
 assert.equal(d.querySelector('#ask-card [data-testid="ask-question-writein"]').getAttribute('placeholder'),'其他（请填写你的回答）');
 assert.equal(d.querySelector('[data-testid="interaction-skip-button"]').textContent,'跳过');
 assert.equal(d.querySelector('[data-testid="interaction-continue-button"]').textContent,'提交↵');
 assert.equal(d.querySelector('[data-testid="permission-details-toggle"]').textContent,'显示详情');
 assert.equal(d.querySelector('#po-once').textContent,'是，仅允许本次');
 assert.equal(d.querySelector('#po-all').textContent,'是，并在全局始终允许');
 assert.equal(d.querySelector('#po-dyn').textContent,"Yes, and always allow 'npm test'");
 assert.equal(d.querySelector('#po-no').textContent,'否');
 assert.equal(d.querySelector('#perm-card [data-testid="ask-question-writein"]').getAttribute('placeholder'),'（告诉智能体改用什么方式处理）');
 assert.equal(d.querySelector('.proceed-button').textContent,'继续执行⌘⏎');
 assert.equal(d.querySelector('#hdr-proceed').textContent,'继续执行 • 2');
 assert.equal(d.querySelector('#th-done').textContent,'已思考 8 秒');
 assert.equal(d.querySelector('#th-done').getAttribute('aria-label'),'思考过程');
 assert.equal(d.querySelector('#th-live').textContent,'Thinking');
 assert.equal(d.querySelector('#aq-hover').textContent,'Settings');
 assert.equal(d.querySelector('#aq-tip').textContent,'提交 (↵)');
 d.querySelector('#stream-code').firstChild.nodeValue='Settings';
 await wait();
 assert.equal(d.querySelector('#stream-code').textContent,'Settings');
 w.__teacherxu_antigravity_zh__.setEnabled(false);
 assert.equal(d.querySelector('#perm-once').textContent,'Allow Once');
 assert.equal(d.querySelector('[data-testid="ask-question-collapse-button"]').getAttribute('aria-label'),'Collapse questionnaire');
 dom.window.close();
});
test('P1: translates 2.29.1 Automations main-document views and right/bottom panel toolbars while protecting user titles, prompts, branches, URLs, and sidecar iframes',()=>{
 const dom=create(`<div data-testid="sidecars-view" data-sidecar-type="automation">
   <h1>Automations</h1>
   <button data-testid="sidecar-create-with-prompt">Create with Prompt</button>
   <button data-testid="sidecar-new-button">New</button>
   <input data-testid="sidecars-search-input" placeholder="Search">
   <h2 data-testid="automation-group"><span>Always on<span>1</span></span></h2>
   <div data-testid="sidecar-row"><span data-testid="automation-name">Settings</span></div>
   <div data-testid="sidecar-iframe"><span>General</span></div>
  </div>
  <div data-testid="automation-detail-page">
   <span id="user-task-title" class="text-2xl">General</span>
   <button id="edit-title" aria-label="Edit task title"></button>
   <button data-testid="cloud-trigger-detail-kebab" aria-label="Actions"></button>
   <button data-testid="sidecar-detail-run-now">Run Now</button>
   <button data-testid="sidecar-project-link"><span>Review</span></button>
   <h2>Instructions</h2>
   <div data-testid="automation-instructions-markdown">Settings</div>
   <h2>Runs</h2>
   <div data-testid="automation-run">Default</div>
  </div>
  <div data-testid="new-sidecar-modal" data-kind="local">
   <input data-testid="new-sidecar-name" placeholder="Untitled" aria-label="Name">
   <div data-testid="new-sidecar-model"><span>Flash</span></div>
   <div data-testid="new-sidecar-project"><span>General</span></div>
   <button data-testid="new-sidecar-add-trigger">Add schedule</button>
  </div>
  <div data-testid="bottom-terminal-panel">
   <span data-testid="bottom-terminal-panel-title">Terminal</span>
   <button data-testid="bottom-terminal-panel-new" aria-label="New Terminal"></button>
   <button data-testid="bottom-terminal-panel-close" aria-label="Close Panel"></button>
   <div data-testid="terminal-tab-surface">Settings</div>
   <div data-testid="bottom-terminal-panel-empty"><span>No active terminals</span><button>New Terminal</button></div>
  </div>
  <div class="flex items-center text-sm gap-2">
   <span class="font-medium" id="rev-lbl">Review</span>
   <button data-testid="diff-view-mode-trigger"><span>Branch</span><span data-testid="diff-view-mode-detail">Settings</span></button>
  </div>
  <div data-select-popup="">
   <div><span data-testid="diff-view-mode-option">Branch</span><span id="opt-branch">Default</span><span>All changes since main</span></div>
  </div>
  <div class="flex items-center text-sm gap-2">
   <span class="font-medium" id="rev-lbl2">Review</span>
   <div><div id="for-turn">For Turn</div><div id="turn-prompt" title="Settings">Settings</div><button id="clr-filter" aria-label="Clear filter"></button></div>
  </div>
  <div>
   <button id="br-back" aria-label="Back" title="Back"></button>
   <button data-testid="builtin-browser-reload" aria-label="Reload" title="Reload"></button>
   <form data-testid="browser-url-bar">
    <input data-testid="browser-url-input" value="http://localhost:3000/Settings" placeholder="Enter a URL (e.g. http://localhost:8080)" aria-label="Address bar">
    <span data-testid="browser-url-display"><span>Settings</span></span>
   </form>
   <button data-testid="webview-url-bar-open-external" aria-label="Open in external browser" title="Open in external browser"></button>
  </div>`);
 const w=dom.window,d=w.document;
 assert.equal(d.querySelector('[data-testid="sidecars-view"] h1').textContent,'自动化');
 assert.equal(d.querySelector('[data-testid="sidecar-create-with-prompt"]').textContent,'通过提示词创建');
 assert.equal(d.querySelector('[data-testid="sidecars-search-input"]').getAttribute('placeholder'),'搜索');
 assert.equal(d.querySelector('[data-testid="automation-group"]').textContent,'常驻运行1');
 assert.equal(d.querySelector('[data-testid="automation-name"]').textContent,'Settings');
 assert.equal(d.querySelector('[data-testid="sidecar-iframe"]').textContent,'General');
 assert.equal(d.querySelector('#user-task-title').textContent,'General');
 assert.equal(d.querySelector('#edit-title').getAttribute('aria-label'),'编辑任务标题');
 assert.equal(d.querySelector('[data-testid="cloud-trigger-detail-kebab"]').getAttribute('aria-label'),'Actions');
 assert.equal(d.querySelector('[data-testid="sidecar-detail-run-now"]').textContent,'立即运行');
 assert.equal(d.querySelector('[data-testid="sidecar-project-link"]').textContent,'Review');
 assert.equal(d.querySelector('[data-testid="automation-instructions-markdown"]').textContent,'Settings');
 assert.equal(d.querySelector('[data-testid="automation-run"]').textContent,'Default');
 assert.equal(d.querySelector('[data-testid="new-sidecar-name"]').getAttribute('placeholder'),'未命名');
 assert.equal(d.querySelector('[data-testid="new-sidecar-name"]').getAttribute('aria-label'),'名称');
 assert.equal(d.querySelector('[data-testid="new-sidecar-model"]').textContent,'Flash');
 assert.equal(d.querySelector('[data-testid="new-sidecar-project"]').textContent,'General');
 assert.equal(d.querySelector('[data-testid="new-sidecar-add-trigger"]').textContent,'添加定时规则');
 assert.equal(d.querySelector('[data-testid="bottom-terminal-panel-title"]').textContent,'终端');
 assert.equal(d.querySelector('[data-testid="bottom-terminal-panel-new"]').getAttribute('aria-label'),'新建终端');
 assert.equal(d.querySelector('[data-testid="bottom-terminal-panel-close"]').getAttribute('aria-label'),'关闭面板');
 assert.equal(d.querySelector('[data-testid="terminal-tab-surface"]').textContent,'Settings');
 assert.equal(d.querySelector('[data-testid="bottom-terminal-panel-empty"]').textContent,'暂无活动终端新建终端');
 assert.equal(d.querySelector('#rev-lbl').textContent,'审查变更');
 assert.equal(d.querySelector('[data-testid="diff-view-mode-trigger"]').textContent,'分支Settings');
 assert.equal(d.querySelector('[data-testid="diff-view-mode-option"]').textContent,'分支');
 assert.equal(d.querySelector('#opt-branch').textContent,'Default');
 assert.equal(d.querySelector('[data-select-popup]').textContent.trim(),'分支Default自 main 以来的所有变更');
 assert.equal(d.querySelector('#rev-lbl2').textContent,'审查变更');
 assert.equal(d.querySelector('#for-turn').textContent,'按轮次');
 assert.equal(d.querySelector('#turn-prompt').textContent,'Settings');
 assert.equal(d.querySelector('#clr-filter').getAttribute('aria-label'),'清除筛选');
 assert.equal(d.querySelector('#br-back').getAttribute('title'),'返回');
 assert.equal(d.querySelector('[data-testid="builtin-browser-reload"]').getAttribute('title'),'重新加载');
 assert.equal(d.querySelector('[data-testid="builtin-browser-reload"]').getAttribute('aria-label'),'重新加载');
 assert.equal(d.querySelector('[data-testid="browser-url-input"]').value,'http://localhost:3000/Settings');
 assert.equal(d.querySelector('[data-testid="browser-url-input"]').getAttribute('placeholder'),'输入网址（例如 http://localhost:8080）');
 assert.equal(d.querySelector('[data-testid="browser-url-input"]').getAttribute('aria-label'),'地址栏');
 assert.equal(d.querySelector('[data-testid="browser-url-display"]').textContent,'Settings');
 assert.equal(d.querySelector('[data-testid="webview-url-bar-open-external"]').getAttribute('title'),'在外部浏览器中打开');
 w.__teacherxu_antigravity_zh__.setEnabled(false);
 assert.equal(d.querySelector('[data-testid="builtin-browser-reload"]').getAttribute('title'),'Reload');
 assert.equal(d.querySelector('[data-testid="builtin-browser-reload"]').getAttribute('aria-label'),'Reload');
 assert.equal(d.querySelector('[data-testid="bottom-terminal-panel-new"]').getAttribute('aria-label'),'New Terminal');
 assert.equal(d.querySelector('[data-testid="browser-url-input"]').getAttribute('placeholder'),'Enter a URL (e.g. http://localhost:8080)');
 dom.window.close();
});

test('P0: popup scans protect generated content and require a complete approval signature',()=>{
 const dom=create(`<div data-popover-popup>
  <div data-testid="planner-response-text"><p>Send command input?</p><button>Reject</button><button>Accept</button></div>
  <div data-testid="user-message-content"><button>Always Allow</button></div>
  <div data-testid="ask-question-header-text">Settings</div>
  <div data-testid="ask-question-option-text">Yes, allow</div>
  <div data-testid="ask-question-option-hover-card">General</div>
  <div data-testid="background-task-command">Settings</div>
  <div data-testid="setup-script-output">General</div>
  <div data-testid="planner-response-text"><div tabindex="-1">
   <div data-testid="ask-question-header-text">Settings</div>
   <button data-testid="permission-details-toggle">Show details</button>
   <div data-testid="ask-question-option-text" id="nested-option">Yes, allow this time</div>
   <textarea data-testid="ask-question-writein" placeholder="(tell the agent what to do instead)"></textarea>
  </div></div>
 </div>
 <button id="unrelated">Always Allow</button>
 <div tabindex="-1"><div data-testid="ask-question-option-text" id="unverified">Yes, allow this time</div>
  <span id="unverified-no">No</span>
  <textarea data-testid="ask-question-writein" placeholder="(tell the agent what to do instead)"></textarea>
 </div>`);
 const d=dom.window.document;
 for(const [id,text] of [['planner-response-text','Send command input?RejectAccept'],['user-message-content','Always Allow'],
  ['ask-question-header-text','Settings'],['ask-question-option-text','Yes, allow'],['ask-question-option-hover-card','General'],
  ['background-task-command','Settings'],['setup-script-output','General']]) {
  assert.equal(d.querySelector(`[data-testid="${id}"]`).textContent,text);
 }
 assert.equal(d.querySelector('#unrelated').textContent,'Always Allow');
 assert.equal(d.querySelector('#unverified').textContent,'Yes, allow this time');
 assert.equal(d.querySelector('#unverified-no').textContent,'No');
 assert.equal(d.querySelector('#nested-option').textContent,'Yes, allow this time');
 dom.window.close();
});

test('P0: permission scopes keep handlers, dynamic targets, and exact restoration intact',async()=>{
 const dom=create(`<div tabindex="-1">
  <div data-testid="ask-question-header-text">Run npm test?<button data-testid="permission-details-toggle">Show details</button></div>
  <div data-testid="ask-question-option-text" id="once">Yes, allow this time</div>
  <div data-testid="ask-question-option-text" id="elevation">Yes, allow</div>
  <div data-testid="ask-question-option-text" id="conversation">Yes, and always allow in this conversation</div>
  <div data-testid="ask-question-option-text" id="global">Yes, and always allow</div>
  <div data-testid="ask-question-option-text" id="target">Yes, and always allow 'npm test'</div>
  <textarea data-testid="ask-question-writein" placeholder="(tell the agent what to do instead)"></textarea>
  <button data-testid="interaction-continue-button">Submit</button>
 </div>`);
 const w=dom.window,d=w.document,button=d.querySelector('[data-testid="interaction-continue-button"]');
 let calls=0;button.addEventListener('click',()=>calls++);
 assert.equal(d.querySelector('#once').textContent,'是，仅允许本次');
 assert.equal(d.querySelector('#elevation').textContent,'是，仅允许本次');
 assert.equal(d.querySelector('#conversation').textContent,'是，并在此对话中始终允许');
 assert.equal(d.querySelector('#global').textContent,'是，并在全局始终允许');
 assert.equal(d.querySelector('#target').textContent,"Yes, and always allow 'npm test'");
 assert.equal(d.querySelector('[data-testid="permission-details-toggle"]').textContent,'显示详情');
 button.click();assert.equal(calls,1);
 const lateOption=d.createElement('div');lateOption.dataset.testid='ask-question-option-text';lateOption.textContent='Yes, save rule globally';
 button.parentElement.append(lateOption);await wait();
 assert.equal(lateOption.textContent,'是，保存为全局规则');
 d.querySelector('#once').firstChild.nodeValue='Application supplied new content';
 w.__teacherxu_antigravity_zh__.setEnabled(false);
 assert.equal(d.querySelector('#once').textContent,'Application supplied new content');
 assert.equal(d.querySelector('#conversation').textContent,'Yes, and always allow in this conversation');
 assert.equal(d.querySelector('#global').textContent,'Yes, and always allow');
 assert.equal(lateOption.textContent,'Yes, save rule globally');
 assert.equal(button.textContent,'Submit');
 assert.equal(d.querySelector('textarea').value,'');
 dom.window.close();
});

test('P0: browser confirmation requires its prompt and paired deny control',()=>{
 const dom=create(`<div><span><span id="prompt">Confirmation required to execute this step</span></span>
  <div><button id="deny">Deny</button><button id="confirm" aria-label="Confirm Browser Interaction">Confirm</button></div>
 </div><div><button id="unverified-confirm" aria-label="Confirm Browser Interaction">Confirm</button></div>`);
 const w=dom.window,d=w.document,button=d.querySelector('#confirm');
 assert.equal(d.querySelector('#prompt').textContent,dictionary['Confirmation required to execute this step']);
 assert.equal(d.querySelector('#deny').textContent,'禁止');
 assert.equal(button.textContent,dictionary.Confirm);
 assert.equal(button.getAttribute('aria-label'),'确认浏览器操作');
 assert.equal(d.querySelector('#unverified-confirm').textContent,'Confirm');
 w.__teacherxu_antigravity_zh__.setEnabled(false);
 assert.equal(button.textContent,'Confirm');assert.equal(button.getAttribute('aria-label'),'Confirm Browser Interaction');
 dom.window.close();
});

test('P0: streaming content schedules no scans while late UI and label updates still translate',async()=>{
 const dom=create(html+`<div data-testid="planner-response-text">Hello</div><pre>code</pre><div id="unrelated-stream">text</div>`);
 const w=dom.window,d=w.document;
 await wait();
 let frames=0;const requestFrame=w.requestAnimationFrame.bind(w);
 w.requestAnimationFrame=callback=>{frames++;return requestFrame(callback);};
 for(const selector of ['[data-testid="planner-response-text"]','pre','#unrelated-stream']) {
  const el=d.querySelector(selector);
  el.firstChild.nodeValue='Settings';
  const span=d.createElement('span');span.textContent='General';el.append(span);
 }
 await wait();assert.equal(frames,0);
 const button=d.createElement('button');button.dataset.testid='interaction-continue-button';button.textContent='Submit';
 d.body.append(button);
 await wait();assert.equal(button.textContent,'提交');assert.equal(frames,1);
 d.querySelector('#copy').firstChild.nodeValue='Prevent Sleep';
 await wait();assert.equal(d.querySelector('#copy').textContent,'防止休眠');
 const collapse=d.createElement('button');collapse.dataset.testid='ask-question-collapse-button';collapse.setAttribute('aria-label','Collapse questionnaire');
 d.body.append(collapse);await wait();
 assert.equal(collapse.getAttribute('aria-label'),'收起问卷');
 collapse.setAttribute('aria-label','Expand questionnaire');await wait();
 assert.equal(collapse.getAttribute('aria-label'),'展开问卷');
 dom.window.close();
});

test('translates React split text nodes as complete phrases and guards against half-translated fragments',async()=>{
 const dom=create(html+`<div data-testid="sidecars-view"><div data-testid="sidecar-list-empty"><p id="empty-title"></p></div><p data-testid="sidecar-list-empty" id="empty-search"></p></div><div data-testid="sidecar-detail"><p id="missing-task"></p><button><span id="back-to"></span></button></div>`);
 const w=dom.window,d=w.document,addSplit=(el,...parts)=>{for(const p of parts)el.append(typeof p==='string'?d.createTextNode(p):p);return el;};
 const emptyTitle=addSplit(d.querySelector('#empty-title'),'No ','automations',' yet');
 const emptySearch=addSplit(d.querySelector('#empty-search'),'No ','automations',' match “','Settings','”.');
 const missingTask=addSplit(d.querySelector('#missing-task'),'Task "','Settings','" not found.');
 const backTo=addSplit(d.querySelector('#back-to'),'Back to ','Automations');
 const art=d.querySelector('article');
 const unknownNo=addSplit(d.createElement('div'),'No ','widgets',' found');
 const unknownOpen=addSplit(d.createElement('button'),'Open ','Custom',' panel');
 const bold=d.createElement('strong');bold.textContent='demo';
 const mixedDelete=addSplit(d.createElement('div'),'Delete ',bold,'?');
 const colonPrefix=addSplit(d.createElement('span'),'Location: ','General');
 art.append(unknownNo,unknownOpen,mixedDelete,colonPrefix);
 w.__teacherxu_antigravity_zh__.refresh();
 assert.equal(emptyTitle.textContent,'暂无自动化任务');
 assert.equal(emptyTitle.childNodes.length,3);
 assert.equal(emptySearch.textContent,'没有匹配“Settings”的自动化任务。');
 assert.equal(missingTask.textContent,'未找到任务“Settings”。');
 assert.equal(backTo.textContent,'返回自动化');
 assert.equal(unknownNo.textContent,'No widgets found');
 assert.equal(unknownOpen.textContent,'Open Custom panel');
 assert.equal(mixedDelete.textContent,'Delete demo?');
 assert.equal(colonPrefix.textContent,'区域： General');
 emptySearch.childNodes[3].nodeValue='bar';
 await wait();
 assert.equal(emptySearch.textContent,'没有匹配“bar”的自动化任务。');
 w.__teacherxu_antigravity_zh__.setEnabled(false);
 assert.equal(emptyTitle.textContent,'No automations yet');
 assert.equal(emptySearch.textContent,'No automations match “bar”.');
 assert.equal(backTo.textContent,'Back to Automations');
 assert.equal(colonPrefix.textContent,'Location: General');
 dom.window.close();
});

test('translates 2.29.1 Conversations subtitle, Voice mode settings & picker, This Computer, and Mute Voice Mic shortcut',()=>{
 const conv=create(html.replace('<h2>General</h2>','<h2>Conversations</h2><div id="conv-sub">Settings for conversations outside of projects.</div>').replace('id="copy">Global Permissions','id="copy">Default'));
 assert.equal(conv.window.document.querySelector('#conv-sub').textContent,'未归入项目的对话设置。');
 assert.equal(conv.window.document.querySelector('#copy').textContent,'Default');
 conv.window.close();
 const dom=create(`<div aria-label="Settings" class="agy-dialog settings-modal-container">
  <h2>General</h2>
  <span id="this-comp">This Computer</span>
  <h3 id="vm-title">Voice mode</h3>
  <span id="vm-desc">The voice used in Voice mode. Powered by Gemini Live.</span>
  <span id="vm-vol">How loud Antigravity's voice is.</span>
  <span id="sc-mute">Mute Voice Mic</span>
 </div>
 <div data-testid="voice-picker">
  <button data-testid="voice-picker-close" aria-label="Close"></button>
  <div id="vp-title">Choose Antigravity's Voice</div>
  <div data-testid="voice-picker-name">Fola</div>
  <div id="vp-tone">Clear and friendly</div>
  <button data-testid="voice-picker-use"></button>
 </div>`);
 const w=dom.window,d=w.document,useBtn=d.querySelector('[data-testid="voice-picker-use"]');
 useBtn.append(d.createTextNode('Use '),d.createTextNode('Fola'));
 w.__teacherxu_antigravity_zh__.refresh();
 assert.equal(d.querySelector('#this-comp').textContent,'此电脑');
 assert.equal(d.querySelector('#vm-title').textContent,'语音模式');
 assert.equal(d.querySelector('#vm-desc').textContent,'语音模式使用的音色，由 Gemini Live 提供支持。');
 assert.equal(d.querySelector('#vm-vol').textContent,'调节 Antigravity 语音的音量大小。');
 assert.equal(d.querySelector('#sc-mute').textContent,'静音语音麦克风');
 assert.equal(d.querySelector('#vp-title').textContent,'选择 Antigravity 的音色');
 assert.equal(d.querySelector('[data-testid="voice-picker-name"]').textContent,'Fola');
 assert.equal(d.querySelector('#vp-tone').textContent,'清晰友好');
 assert.equal(useBtn.textContent,'使用 Fola');
 dom.window.close();
});

test('translates native context menu items, Archive Conversation tooltip, 2.29.1 Customizations Marketplace, and JSX rich-text sentences',()=>{
 const dom=create(`<aside aria-label="Sidebar">
  <div data-testid="conversation-row-sidebar"><span>See all (18)</span><button data-testid="conversation-archive-button" aria-label="Archive conversation"></button></div>
  <button id="sb-see-all"><span>See all (18)</span></button>
 </aside>
 <div role="tooltip" id="arc-tip">Archive Conversation<span class="ml-1">⌘E</span></div>
 <div class="flex-1 overflow-y-auto">
  <div class="w-full max-w-4xl">
   <h1>Customizations</h1>
   <nav data-testid="plugins-tabs"><a data-testid="plugins-tab-browse">Marketplace</a><a data-testid="plugins-tab-installed">Installed</a></nav>
   <input data-testid="customizations-search" placeholder="Search customizations...">
  </div>
  <div data-testid="customizations-marketplace">
   <span id="eyebrow">Featured</span>
   <h3 data-testid="featured-carousel-headline">General</h3>
   <button id="feat-add">Add</button><a id="feat-details">Details</a>
   <div data-testid="customization-card"><div class="font-medium"><a id="card-name">Default</a></div><span id="card-badge">Skill</span><div id="card-desc">Read, draft, and edit docs.</div></div>
  </div>
 </div>
 <div aria-label="Settings" class="agy-dialog settings-modal-container">
  <h2>General</h2>
  <span id="perm-sub"></span>
  <span id="plan-fyi"></span>
  <span id="br-sub">Configure the browser subagent. It requires <a>Google Chrome</a> to be installed.</span>
 </div>`);
 const w=dom.window,d=w.document;
 const permSub=d.querySelector('#perm-sub'),lm=d.createElement('a');lm.textContent='Learn more';
 permSub.append(d.createTextNode('Configure what the agent can do in local and remote conversations.'),d.createTextNode(' '),lm,d.createTextNode('.'));
 const planFyi=d.querySelector('#plan-fyi'),c1=d.createElement('code'),c2=d.createElement('code');c1.textContent='/';c2.textContent='plan';
 planFyi.append(d.createTextNode('Type'),d.createTextNode(' '),c1,d.createTextNode(' '),d.createTextNode('and select'),d.createTextNode(' '),c2,d.createTextNode(' '),d.createTextNode('to have the agent generate a plan.'));
 w.__teacherxu_antigravity_zh__.refresh();
 assert.equal(d.querySelector('#arc-tip').textContent,'归档对话⌘E');
 assert.equal(d.querySelector('[data-testid="conversation-archive-button"]').getAttribute('aria-label'),'归档对话');
 assert.equal(d.querySelector('#sb-see-all').textContent,'查看全部 (18)');
 assert.equal(d.querySelector('[data-testid="conversation-row-sidebar"] span').textContent,'See all (18)');
 assert.equal(d.querySelector('.max-w-4xl h1').textContent,'自定义配置');
 assert.equal(d.querySelector('[data-testid="plugins-tab-browse"]').textContent,'插件市场');
 assert.equal(d.querySelector('[data-testid="plugins-tab-installed"]').textContent,'已安装');
 assert.equal(d.querySelector('[data-testid="customizations-search"]').getAttribute('placeholder'),'搜索自定义配置...');
 assert.equal(d.querySelector('#eyebrow').textContent,'精选推荐');
 assert.equal(d.querySelector('[data-testid="featured-carousel-headline"]').textContent,'General');
 assert.equal(d.querySelector('#feat-add').textContent,'添加');
 assert.equal(d.querySelector('#feat-details').textContent,'详情');
 assert.equal(d.querySelector('#card-name').textContent,'Default');
 assert.equal(d.querySelector('#card-badge').textContent,'技能');
 assert.equal(d.querySelector('#card-desc').textContent,'读取、起草和编辑文档。');
 assert.equal(permSub.textContent,'配置智能体在本地和远程对话中可执行的操作。 了解更多.');
 assert.equal(planFyi.textContent,'输入 / 并选择 plan 即可让智能体生成计划。');
 assert.equal(d.querySelector('#br-sub').textContent,'配置浏览器子智能体，需要安装 Google Chrome 。');
 const menu=[
  {id:'rename',label:'Rename'},
  {id:'pin',label:'Pin'},
  {id:'mark-read',label:'Mark Unread'},
  {id:'copy',type:'submenu',label:'Copy',submenu:[{id:'copy-0',label:'Conversation Name'},{id:'copy-2',label:'Workspace Name'}]},
  {id:'split',type:'submenu',label:'Split',submenu:[{id:'split-0',label:'Split Right'},{id:'split-2',label:'Replace with New'}]},
  {id:'move-to-group',type:'submenu',label:'Move to Group',submenu:[{id:'group-1',label:'General',type:'checkbox'},{id:'group-new',label:'New Group'}]},
  {id:'archive',label:'Archive'},
  {id:'delete',label:'Delete'}
 ];
 const zhMenu=w.__teacherxu_antigravity_zh__.translateMenu(menu);
 assert.deepEqual(zhMenu.map(i=>i.label),['重命名','置顶','标为未读','复制','分屏打开','移至分组','归档','删除']);
 assert.deepEqual(zhMenu[3].submenu.map(i=>i.label),['对话名称','工作区名称']);
 assert.deepEqual(zhMenu[4].submenu.map(i=>i.label),['向右分屏','替换为新对话']);
 assert.deepEqual(zhMenu[5].submenu.map(i=>i.label),['General','新建分组']);
 w.__teacherxu_antigravity_zh__.setEnabled(false);
 assert.equal(w.__teacherxu_antigravity_zh__.translateMenu(menu),menu);
 dom.window.close();
});

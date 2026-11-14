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
 const pkg=JSON.parse(fs.readFileSync('package.json','utf8')),lock=JSON.parse(fs.readFileSync('package-lock.json','utf8'));
 const compat=JSON.parse(fs.readFileSync('tools/compatibility.json','utf8'));
 assert.match(pkg.version,/^\d+\.\d+\.\d+\.[1-9]\d*$/);
 assert.ok(Object.hasOwn(compat.versions,pkg.version.split('.').slice(0,3).join('.')));
 assert.equal(lock.version,pkg.version);assert.equal(lock.packages[''].version,pkg.version);
 const dom=create();dom.window.eval(source);
 assert.equal(dom.window.__teacherxu_antigravity_zh__.version,pkg.version);
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

test('translates 2.31.2 PermissionCard, Browser settings, Coordinators, Side Questions, CSV/File filters, and (Default) menus while protecting user/device/code/bubble boundaries',async()=>{
 const dom=create(`<aside aria-label="Sidebar">
  <div data-testid="coordinator-section-header"><h2>Coordinators</h2><button data-testid="new-coordinator-button" aria-label="New coordinator"></button></div>
 </aside>
 <div aria-label="Settings" class="agy-dialog settings-modal-container">
  <button data-testid="settings-nav-item-Browser"><span>Browser</span></button>
  <button data-testid="settings-nav-item-Projects"><span>Projects</span></button>
  <button data-testid="settings-nav-item-Environments"><span>Environments</span></button>
  <h2>Browser</h2>
  <h3 id="bi-br">Built-in Browser</h3>
  <span data-testid="builtin-browser-download-dir-value">General</span>
  <span data-testid="builtin-browser-download-dir-error" id="citc-err">CitC workspace paths are world-readable and permanently snapshotted. Choose a local folder outside CitC.</span>
  <span id="br-act-req"></span>
  <input id="dl-site-inp" placeholder="e.g., example.com">
  <div role="radiogroup" aria-label="Interface Layout">
   <span role="radio" data-testid="mode-option-non-technical" aria-label="Knowledge Work"><span id="kw-title">Knowledge Work</span><div id="kw-desc">Simplified interface for research, writing, and everyday tasks.</div></span>
   <span role="radio" data-testid="mode-option-developer" aria-label="Software Engineering"><span id="se-title">Software Engineering</span><div id="se-desc">Full interface for coding, developer tools, and managing agents.</div></span>
  </div>
  <input id="sc-search" placeholder="Search shortcuts..." aria-label="Search shortcuts">
  <span id="sc-conflict">Conflicts with "Open File Search" (press Enter to replace)</span>
  <span id="acct-plan">Your Plan: Google AI Pro</span>
  <p id="fb-legal"></p>
  <div id="biz-doc"></div>
  <span id="perm-inherit"></span>
  <a data-testid="resource-link" id="proj-res">Settings</a>
  <h2 id="run-dev">Running (Dev only)</h2>
  <span id="sc-read">Mark This Conversation as Read</span>
  <span id="sc-cider">Open in Cider</span>
 </div>
 <div role="dialog">
  <h2>New Coordinator</h2>
  <button data-testid="coordinator-icon-picker" aria-label="Choose icon and color"></button>
  <button data-testid="coordinator-icon-option-settings" aria-label="Settings"></button>
  <input data-testid="coordinator-name-input" placeholder="e.g. Release helper" aria-label="Coordinator name">
  <textarea data-testid="coordinator-goal-input" placeholder="What should this coordinator accomplish?" aria-label="Coordinator goal"></textarea>
  <button data-testid="create-coordinator-submit">Create Coordinator</button>
 </div>
 <div role="dialog">
  <p>Delete this side question? Its messages will be discarded.</p>
  <button data-testid="confirm-delete-side-question">Delete</button>
 </div>
 <div data-testid="agent-response">
  <div data-bubble-side="agent" id="agent-bubble"><p>Settings</p><button>Always Allow</button></div>
  <div data-testid="progress-update-response-text" id="prog-resp">General</div>
  <div id="perm-2312" tabindex="-1">
   <span data-testid="ask-question-header-icon"></span>
   <div data-testid="ask-question-header-text">Download artifact?</div>
   <textarea data-testid="permission-target-editor" aria-label="Edit permission target">Settings</textarea>
   <dl data-testid="permission-download-details">
    <dt id="dt-file">File</dt><dd id="dd-file">Settings</dd>
    <dt id="dt-type">Type</dt><dd id="dd-type">Default</dd>
    <dt id="dt-save">Save to</dt><dd id="dd-save">General</dd>
   </dl>
   <span id="unsandbox-warn">Confirm the command is safe to run outside of the sandbox with full network and disk access.</span>
   <div data-testid="ask-question-option-text" id="dl-once">Yes, allow this download</div>
   <div><span id="dl-no">No</span><textarea data-testid="ask-question-writein" placeholder="(tell the agent what to do instead)"></textarea></div>
  </div>
  <div id="spoof-ask" tabindex="-1">
   <span data-testid="ask-question-header-icon"></span>
   <div data-testid="ask-question-header-text">Choose option</div>
   <button data-testid="ask-question-collapse-button" aria-label="Collapse questionnaire"></button>
   <div data-testid="ask-question-option-text" id="spoof-opt">Yes, allow this download</div>
   <textarea data-testid="ask-question-writein" placeholder="(tell the agent what to do instead)"></textarea>
  </div>
 </div>
 <div data-testid="coordinator-worker-card" id="worker-card"><span>Settings</span><div data-testid="coordinator-card-latest-line">General</div></div>
 <button id="stop-worker" title="Stop Subagent" aria-label="Stop Subagent"></button>
 <button data-testid="selection-quote-button"><span>Quote</span></button>
 <button data-testid="selection-btw-button"><span>Ask /btw</span></button>
 <div data-testid="side-question-panel">
  <div data-testid="side-question-followup-user" id="sq-user">Settings</div>
  <span data-testid="side-question-followup-thinking" id="sq-think">Thinking...</span>
  <input data-testid="side-question-reply-input" placeholder="Reply to /help... (Esc to minimize)" aria-label="Reply to /help">
  <button data-testid="side-question-reply-send" aria-label="Send reply"></button>
  <button data-testid="side-question-popout" aria-label="Open in full conversation"></button>
 </div>
 <input data-testid="file-tree-filter-input" placeholder="Filter files..." aria-label="Filter files">
 <span data-testid="file-tree-vcs-dot" title="Untracked"></span>
 <div data-testid="file-tree-filter-empty">No matching files</div>
 <div data-testid="csv-file-viewer">
  <input data-testid="csv-filter-input" placeholder="Filter rows..." aria-label="Filter rows">
  <button data-testid="csv-filter-clear" aria-label="Clear row filter">Clear</button>
  <span data-testid="csv-row-count">12 / 48 rows</span>
  <div data-testid="csv-scroll-viewport"><div id="csv-cell">Settings</div></div>
 </div>
 <div data-testid="browser-cert-interstitial"><h1>Your connection is not private</h1><button data-testid="browser-cert-back-button">Back to safety</button></div>
 <div class="z-[6000]">
  <div data-testid="gcp-project-combobox-list"><div id="gcp-proj">General</div></div>
  <button data-testid="webview-device-chooser-option" id="usb-dev">Settings</button>
  <p data-testid="webview-prompt-message" id="wv-prompt">Default</p>
  <span data-testid="webview-download-filename" id="wv-dl">Review</span>
 </div>
 <div data-popover-popup="">
  <span id="sec-title">Connection is secure</span><span data-testid="url-security-host" id="sec-host">Settings</span>
  <div data-testid="webview-download-drawer">
   <span id="dr-title">Downloads</span>
   <button data-testid="webview-downloads-close" aria-label="Close downloads"></button>
   <button data-testid="webview-download-open" title="Settings"><span data-testid="webview-download-filename" id="dr-file">Settings</span></button>
   <span data-testid="webview-download-agent-badge" id="dr-agent">Agent</span>
   <span data-testid="webview-download-status" id="dr-status">Completed</span>
  </div>
 </div>
 <button data-testid="conversation-telemetry-icon-button" aria-label="Telemetry will be enabled for this conversation; click to disable."></button>
 <span data-testid="conversation-telemetry-indicator" title="Telemetry is off for all conversations."></span>
 <div id="dyn-slot"></div>
 <div data-hover-card-popup=""><div data-testid="lsp-symbol-hover-card" id="lsp-hover">General</div></div>
 <span data-testid="voice-transcript-summary"><span data-testid="voice-transcript-summary-lead" id="vt-lead">Settings</span></span>`);
 const w=dom.window,d=w.document;
 const brActReq=d.querySelector('#br-act-req'),chLink=d.createElement('a');chLink.textContent='Google Chrome';
 brActReq.append(d.createTextNode('Configure allowed and denied URLs for the browser subagent (invoked with /browser). Requires'),d.createTextNode(' '),chLink,d.createTextNode(' to be installed.'));
 const fbLegal=d.querySelector('#fb-legal'),lh=d.createElement('a');lh.textContent='Legal Help';
 fbLegal.append(d.createTextNode('Visit'),d.createTextNode(' '),lh,d.createTextNode(' '),d.createTextNode('to ask for content changes for legal reasons.'));
 const bizDoc=d.querySelector('#biz-doc'),docLink=d.createElement('a');docLink.textContent='documentation';
 bizDoc.append(d.createTextNode('For Antigravity Business consumption options, see'),d.createTextNode(' '),docLink,d.createTextNode('.'));
 const permInherit=d.querySelector('#perm-inherit'),gpSpan=d.createElement('span');gpSpan.textContent='Global Permissions';
 permInherit.append(d.createTextNode('Also includes'),d.createTextNode(' '),gpSpan,d.createTextNode(' '),d.createTextNode('when working '),d.createTextNode('in these conversations'),d.createTextNode('.'));
 w.__teacherxu_antigravity_zh__.refresh();
 assert.equal(d.querySelector('[data-testid="coordinator-section-header"] h2').textContent,'协调器');
 assert.equal(d.querySelector('[data-testid="new-coordinator-button"]').getAttribute('aria-label'),'新建协调器');
 assert.equal(d.querySelector('[data-testid="settings-nav-item-Browser"]').textContent,'浏览器');
 assert.equal(d.querySelector('[data-testid="settings-nav-item-Projects"]').textContent,'项目');
 assert.equal(d.querySelector('[data-testid="settings-nav-item-Environments"]').textContent,'运行环境');
 assert.equal(d.querySelector('#bi-br').textContent,'内置浏览器');
 assert.equal(d.querySelector('[data-testid="builtin-browser-download-dir-value"]').textContent,'General');
 assert.equal(d.querySelector('#citc-err').textContent,'CitC 工作区路径对所有人可读且会永久生成快照，请选择 CitC 以外的本地文件夹。');
 assert.equal(brActReq.textContent,'配置浏览器子智能体允许和禁止访问的网址（输入 /browser 调用），需要安装 Google Chrome 。');
 assert.equal(d.querySelector('#dl-site-inp').getAttribute('placeholder'),'例如：example.com');
 assert.equal(d.querySelector('[data-testid="mode-option-non-technical"]').getAttribute('aria-label'),'知识工作');
 assert.equal(d.querySelector('#kw-title').textContent,'知识工作');
 assert.equal(d.querySelector('#kw-desc').textContent,'面向调研、写作与日常任务的精简界面。');
 assert.equal(d.querySelector('#se-title').textContent,'软件工程');
 assert.equal(d.querySelector('#se-desc').textContent,'面向编程、开发者工具与智能体管理的完整界面。');
 assert.equal(d.querySelector('#sc-search').getAttribute('placeholder'),'搜索快捷键...');
 assert.equal(d.querySelector('#sc-search').getAttribute('aria-label'),'搜索快捷键');
 assert.equal(d.querySelector('#sc-conflict').textContent,'与“Open File Search”冲突（按 Enter 替换）');
 assert.equal(d.querySelector('#acct-plan').textContent,'当前套餐：Google AI Pro');
 assert.equal(fbLegal.textContent,'前往 法律帮助 以出于法律原因申请内容变更。');
 assert.equal(bizDoc.textContent,'有关 Antigravity 企业版用量计费选项，请参阅 文档.');
 assert.equal(permInherit.textContent,'同时应用 全局权限 （作用于 这些对话）.');
 assert.equal(d.querySelector('#proj-res').textContent,'Settings');
 assert.equal(d.querySelector('#run-dev').textContent,'运行中（仅限开发者）');
 assert.equal(d.querySelector('#sc-read').textContent,'将此对话标为已读');
 assert.equal(d.querySelector('#sc-cider').textContent,'在 Cider 中打开');
 assert.equal(d.querySelector('[data-testid="coordinator-icon-picker"]').getAttribute('aria-label'),'选择图标与颜色');
 assert.equal(d.querySelector('[data-testid="coordinator-icon-option-settings"]').getAttribute('aria-label'),'Settings');
 assert.equal(d.querySelector('[data-testid="coordinator-name-input"]').getAttribute('placeholder'),'例如：发布助手');
 assert.equal(d.querySelector('[data-testid="create-coordinator-submit"]').textContent,'创建协调器');
 assert.equal(d.querySelector('[data-testid="confirm-delete-side-question"]').textContent,'删除');
 assert.equal(d.querySelector('#agent-bubble').textContent,'SettingsAlways Allow');
 assert.equal(d.querySelector('#prog-resp').textContent,'General');
 assert.equal(d.querySelector('[data-testid="permission-target-editor"]').getAttribute('aria-label'),'编辑授权目标');
 assert.equal(d.querySelector('#dt-file').textContent,'文件');
 assert.equal(d.querySelector('#dt-type').textContent,'类型');
 assert.equal(d.querySelector('#dt-save').textContent,'保存至');
 assert.equal(d.querySelector('#dd-file').textContent,'Settings');
 assert.equal(d.querySelector('#dd-type').textContent,'Default');
 assert.equal(d.querySelector('#dd-save').textContent,'General');
 assert.equal(d.querySelector('#unsandbox-warn').textContent,'请确认该命令可安全地在沙盒外运行（将拥有完整网络与磁盘访问权限）。');
 assert.equal(d.querySelector('#dl-once').textContent,'是，仅允许本次下载');
 assert.equal(d.querySelector('#dl-no').textContent,'否');
 assert.equal(d.querySelector('#spoof-opt').textContent,'Yes, allow this download');
 assert.equal(d.querySelector('#worker-card').textContent,'SettingsGeneral');
 assert.equal(d.querySelector('#stop-worker').getAttribute('title'),'停止子智能体');
 assert.equal(d.querySelector('[data-testid="selection-quote-button"]').textContent,'引用');
 assert.equal(d.querySelector('[data-testid="selection-btw-button"]').textContent,'顺便问 (/btw)');
 assert.equal(d.querySelector('#sq-user').textContent,'Settings');
 assert.equal(d.querySelector('#sq-think').textContent,'思考中...');
 assert.equal(d.querySelector('[data-testid="side-question-reply-input"]').getAttribute('placeholder'),'回复 /help...（按 Esc 最小化）');
 assert.equal(d.querySelector('[data-testid="side-question-popout"]').getAttribute('aria-label'),'在完整对话中打开');
 assert.equal(d.querySelector('[data-testid="file-tree-filter-input"]').getAttribute('placeholder'),'筛选文件...');
 assert.equal(d.querySelector('[data-testid="file-tree-vcs-dot"]').getAttribute('title'),'未跟踪');
 assert.equal(d.querySelector('[data-testid="file-tree-filter-empty"]').textContent,'无匹配文件');
 assert.equal(d.querySelector('[data-testid="csv-filter-input"]').getAttribute('placeholder'),'筛选行...');
 assert.equal(d.querySelector('[data-testid="csv-filter-clear"]').textContent,'清除');
 assert.equal(d.querySelector('[data-testid="csv-row-count"]').textContent,'12 / 48 行');
 assert.equal(d.querySelector('#csv-cell').textContent,'Settings');
 assert.equal(d.querySelector('[data-testid="browser-cert-interstitial"] h1').textContent,'你的连接不是私密连接');
 assert.equal(d.querySelector('[data-testid="browser-cert-back-button"]').textContent,'返回安全页面');
 assert.equal(d.querySelector('#gcp-proj').textContent,'General');
 assert.equal(d.querySelector('#usb-dev').textContent,'Settings');
 assert.equal(d.querySelector('#wv-prompt').textContent,'Default');
 assert.equal(d.querySelector('#wv-dl').textContent,'Review');
 assert.equal(d.querySelector('#sec-title').textContent,'连接安全');
 assert.equal(d.querySelector('#sec-host').textContent,'Settings');
 assert.equal(d.querySelector('#dr-title').textContent,'下载');
 assert.equal(d.querySelector('[data-testid="webview-downloads-close"]').getAttribute('aria-label'),'关闭下载列表');
 assert.equal(d.querySelector('#dr-file').textContent,'Settings');
 assert.equal(d.querySelector('[data-testid="webview-download-open"]').getAttribute('title'),'Settings');
 assert.equal(d.querySelector('#dr-agent').textContent,'智能体');
 assert.equal(d.querySelector('#dr-status').textContent,'已完成');
 assert.equal(d.querySelector('[data-testid="conversation-telemetry-icon-button"]').getAttribute('aria-label'),'当前对话已启用遥测，点击可关闭。');
 assert.equal(d.querySelector('[data-testid="conversation-telemetry-indicator"]').getAttribute('title'),'已关闭所有对话的遥测。');
 assert.equal(d.querySelector('#lsp-hover').textContent,'General');
 assert.equal(d.querySelector('#vt-lead').textContent,'Settings');
 const linkMenu=[{id:'open-side',label:'Side Panel (Default)'},{id:'open-ext',label:'External Browser'}];
 assert.deepEqual(w.__teacherxu_antigravity_zh__.translateMenu(linkMenu).map(i=>i.label),['侧边面板（默认）','外部浏览器']);
 await wait();
 const dynInput=d.createElement('input');
 dynInput.setAttribute('data-testid','file-tree-filter-input');
 dynInput.setAttribute('placeholder','Filter files...');
 dynInput.setAttribute('aria-label','Filter files');
 d.querySelector('#dyn-slot').appendChild(dynInput);
 await wait();
 assert.equal(dynInput.getAttribute('placeholder'),'筛选文件...');
 assert.equal(dynInput.getAttribute('aria-label'),'筛选文件');
 let frames=0;const rf=w.requestAnimationFrame.bind(w);
 w.requestAnimationFrame=cb=>{frames++;return rf(cb);};
 d.querySelector('#agent-bubble p').firstChild.nodeValue='General';
 d.querySelector('#prog-resp').firstChild.nodeValue='Settings';
 await wait();assert.equal(frames,0);
 w.__teacherxu_antigravity_zh__.setEnabled(false);
 assert.equal(d.querySelector('#dt-type').textContent,'Type');
 assert.equal(d.querySelector('[data-testid="csv-row-count"]').textContent,'12 / 48 rows');
 assert.equal(d.querySelector('[data-testid="conversation-telemetry-icon-button"]').getAttribute('aria-label'),'Telemetry will be enabled for this conversation; click to disable.');
 assert.equal(dynInput.getAttribute('placeholder'),'Filter files...');
 dom.window.close();
});

test('2.32.1 SSH remote, macOS permissions card, resource picker, setup script, multi-agent pane & draft capsule',async()=>{
 const dom=create(`
 <nav aria-label="Sidebar">
  <div data-testid="plugins-section">
   <div data-testid="plugins-section-header"><h2>Extensions</h2><button data-testid="plugins-visibility-trigger" aria-label="Show or Hide Extensions"></button></div>
   <div data-testid="plugin-sidebar-item" id="ext-item">Settings</div>
   <div data-testid="plugin-sidebar-mcp-app-item" id="mcp-item">General</div>
  </div>
 </nav>
 <div role="dialog">
  <div data-testid="ssh-connect-dialog">
   <h2 id="ssh-dlg-title">Connect to SSH Host</h2>
   <p id="ssh-dlg-desc"></p>
   <input data-testid="ssh-connect-host-input" placeholder="user@host:port" aria-label="SSH host">
   <button data-testid="ssh-connect-button">Connecting…</button>
   <p data-testid="ssh-connect-validation">A host can't contain spaces.</p>
   <div data-testid="ssh-config-file">
    <span id="ssh-cfg-lbl">SSH config:</span>
    <span data-testid="ssh-config-file-name" id="ssh-cfg-def" title="Default">~/.ssh/config (default)</span>
    <span data-testid="ssh-config-file-name" id="ssh-cfg-custom" title="Settings">Settings</span>
    <button data-testid="ssh-config-file-choose">Choose File…</button>
    <button data-testid="ssh-config-file-use-default">Use Default</button>
   </div>
   <div data-testid="ssh-connect-progress">Connecting to prod-host…</div>
   <div data-testid="ssh-connect-error"><p id="ssh-err-host"></p><p id="ssh-err-msg">Couldn't connect to the SSH host. See the app log.</p></div>
   <div data-testid="ssh-connect-host-group-label" id="ssh-grp-cfg">SSH Config (custom_config)</div>
   <button data-testid="ssh-connect-host-option" title="Default"><span><span id="ssh-opt-name">Settings</span><span id="ssh-opt-src">General</span></span><span id="ssh-opt-conn">Connected</span></button>
   <button data-testid="ssh-connect-host-action" title="Remove from Recent" aria-label="Remove devbox from Recent"></button>
   <button data-testid="ssh-connect-hidden-hosts-toggle" aria-label="Hidden hosts">2 hidden hosts</button>
   <p id="ssh-empty-split"></p>
  </div>
 </div>
 <button data-testid="ssh-machine-switcher" title="This Computer"><span>This Computer</span></button>
 <span data-testid="ssh-host-label" title="Default">On prod-host</span>
 <div data-select-popup="">
  <div data-testid="ssh-machine-switcher-status"><span>Connected to prod-host</span></div>
  <div role="presentation" id="sw-to">Switch To</div>
  <div data-testid="ssh-machine-switcher-this-computer">This Computer</div>
  <div data-testid="ssh-machine-switcher-local-windows">Local Windows environment</div>
  <div data-testid="ssh-machine-switcher-wsl-distro"><span class="truncate" id="wsl-name">Settings</span><span id="wsl-detail">Default · Connected</span></div>
  <div data-testid="ssh-host-project-item" id="proj-ssh-item">Settings</div>
  <div data-testid="project-selector-github-repo-item" id="proj-gh-item">General</div>
  <div data-testid="github-repo-option-1" id="gh-opt-item">Default</div>
  <span id="proj-ssh-btn">SSH Host…</span>
  <span id="proj-gh-btn">Connect GitHub</span>
  <span id="proj-gh-empty">No matching repositories</span>
  <span data-testid="plugins-visibility-option" id="vis-opt">Settings</span>
 </div>
 <button data-testid="permissions-selector-trigger" aria-label="Agent permissions preset selector, current: Auto"><span>Auto</span></button>
 <div data-popover-popup="" data-testid="permissions-menu">
  <span id="perm-scope">This Conversation</span>
  <span data-testid="permissions-override-info-icon" aria-label="Only this conversation uses this preset."></span>
  <div data-testid="permissions-use-global-settings">Use Global Settings</div>
  <div data-testid="permissions-sandbox-hint"><span>Default and Auto need the terminal sandbox, which isn't available on this host.</span></div>
 </div>
 <div role="dialog">
  <h2 id="res-dlg-title">Add Google Drive resources</h2>
  <input data-testid="provider-resource-filter" placeholder="Filter resources..." aria-label="Filter resources">
  <div data-testid="google-drive-connect-view"><p id="gd-conn-desc">Connect your account to browse Google Drive.</p></div>
  <p id="res-owner-warn">A project's private resources must all belong to one owner (alice@example.com).</p>
  <button id="res-add-btn">Add (3)</button>
 </div>
 <div data-testid="computer-permissions-card">
  <span id="cp-title">Enable macOS Permissions</span>
  <div data-testid="computer-permissions-row-accessibility"><span id="cp-acc">1. Accessibility</span><span data-testid="computer-permissions-badge-accessibility">Granted ✓</span><button data-testid="computer-permissions-open-accessibility" aria-label="Accessibility settings">Settings ↗</button></div>
  <div data-testid="computer-permissions-row-screenRecording"><span id="cp-scr">2. Screen Recording</span><span data-testid="computer-permissions-badge-screenRecording">Needs relaunch</span><button data-testid="computer-permissions-open-screenRecording" aria-label="Open Screen Recording settings">Open ↗</button></div>
  <p id="cp-hint"></p>
  <button data-testid="computer-permissions-relaunch">Relaunch ↻</button>
  <button data-testid="computer-permissions-continue">Continue Task →</button>
 </div>
 <button data-testid="setup-script-validate-button">Validate</button>
 <button data-testid="setup-script-save-button">Saving…</button>
 <span data-testid="setup-script-status">Validating setup script…</span>
 <button data-testid="setup-script-copy-button">Copy output</button>
 <pre data-testid="setup-script-output" id="setup-out">Settings</pre>
 <div data-agy-agents-pane="">
  <div data-agy-pane-bar="">
   <span data-agy-chip="c1" id="agy-chip">Settings · paused</span>
   <div data-agy-layout-bar=""><span>Layout</span><button data-agy-layout-option="stage">Stage</button><button data-agy-layout-option="desktop">Desktop</button><button data-agy-layout-option="grid">Grid</button></div>
   <button class="agy-pane-stop">Stop all agents</button>
  </div>
  <div data-agy-note=""><span>Note</span><button id="agy-dismiss">Dismiss</button></div>
  <div data-agy-agent-filter="" aria-label="Filter agents">
   <button data-agy-filter-item="" id="agy-f-all">All agents</button>
   <button data-agy-filter-item="" id="agy-f-win">Settings</button>
  </div>
  <div data-agy-tile="">
   <div data-agy-header="full">
    <button id="agy-tile-btn" title="Focus this tile">Settings</button>
    <span class="truncate" id="agy-agent-lbl">General</span>
    <span class="agy-tile-activity" id="agy-act-lbl">typing…</span>
    <button class="agy-tile-takeover" title="Pause this agent; it keeps its place and streams. Resume to continue." aria-label="Pause">Pause</button>
    <button class="agy-tile-handback" title="Resume this agent where it paused" aria-label="Resume">Resume</button>
    <button class="agy-tile-stop" title="Stop this agent" aria-label="Stop">Stop</button>
    <span id="agy-stopped">Stopped</span>
   </div>
   <div data-agy-badge="redacted" title="Hidden by policy (custom_rule)." id="agy-badge">Hidden by policy</div>
   <div data-agy-pill="right-down" id="agy-pill">Settings</div>
   <div data-agy-window-label="" id="agy-win-lbl">General</div>
  </div>
  <div data-agy-strip-row="k1"><span class="truncate" id="agy-strip-title">Settings</span><span class="truncate text-muted-foreground" id="agy-strip-agent">General</span></div>
  <div data-agy-empty="" id="agy-empty">No agent is working right now.</div>
 </div>
 <div data-testid="webview-url-bar-draft-capsule">
  <button data-testid="webview-url-bar-draft-reopen" aria-label="Resume 2 comment drafts" title="Resume comment draft"><span id="draft-cnt">2 Drafts</span></button>
  <button data-testid="webview-url-bar-draft-discard" aria-label="Discard comment draft" title="Discard comment draft"></button>
 </div>
 <div data-testid="file-tree-filter-error" id="ft-err">Couldn't search files</div>
 <div data-testid="model-selector-refresh"><span id="mdl-load">Loading models...</span><button id="mdl-ref">Refresh</button></div>
 <button data-testid="onboarding-switch-to-auth-code" id="onb-auth">Trouble signing in? Enter authorization code</button>`);
 const w=dom.window,d=w.document;
 const sshDesc=d.querySelector('#ssh-dlg-desc');
 sshDesc.append(d.createTextNode('Enter [user@]host[:port], or pick a host from your SSH config.'),d.createTextNode(' Then create the project in its window.'));
 const sshErrHost=d.querySelector('#ssh-err-host'),hostSpan=d.createElement('span');
 hostSpan.className='font-mono';hostSpan.textContent='Settings';
 sshErrHost.append(d.createTextNode("Couldn't connect to "),hostSpan);
 const sshEmpty=d.querySelector('#ssh-empty-split'),cfgSpan=d.createElement('span');
 cfgSpan.textContent='~/.ssh/custom';
 sshEmpty.append(d.createTextNode('No hosts in '),cfgSpan,d.createTextNode(' yet. Type one above.'));
 const cpHint=d.querySelector('#cp-hint'),openStrong=d.createElement('strong');
 openStrong.textContent='Open ↗';
 cpHint.append(d.createTextNode('Click '),openStrong,d.createTextNode(' to open macOS Privacy & Security.'));
 w.__teacherxu_antigravity_zh__.refresh();
 assert.equal(w.__teacherxu_antigravity_zh__.version,'2.32.1.1');
 assert.equal(d.querySelector('[data-testid="plugins-section-header"] h2').textContent,'扩展');
 assert.equal(d.querySelector('[data-testid="plugins-visibility-trigger"]').getAttribute('aria-label'),'显示或隐藏扩展');
 assert.equal(d.querySelector('#ext-item').textContent,'Settings');
 assert.equal(d.querySelector('#mcp-item').textContent,'General');
 assert.equal(d.querySelector('#vis-opt').textContent,'Settings');
 assert.equal(d.querySelector('#ssh-dlg-title').textContent,'连接 SSH 主机');
 assert.equal(sshDesc.textContent,'输入 [user@]host[:port]，或从 SSH 配置文件中选择主机，随后可在其窗口中创建项目。');
 assert.equal(d.querySelector('[data-testid="ssh-connect-host-input"]').getAttribute('aria-label'),'SSH 主机');
 assert.equal(d.querySelector('[data-testid="ssh-connect-button"]').textContent,'正在连接…');
 assert.equal(d.querySelector('[data-testid="ssh-connect-validation"]').textContent,'主机名不能包含空格。');
 assert.equal(d.querySelector('#ssh-cfg-lbl').textContent,'SSH 配置文件：');
 assert.equal(d.querySelector('#ssh-cfg-def').textContent,'~/.ssh/config（默认）');
 assert.equal(d.querySelector('#ssh-cfg-def').getAttribute('title'),'Default');
 assert.equal(d.querySelector('#ssh-cfg-custom').textContent,'Settings');
 assert.equal(d.querySelector('#ssh-cfg-custom').getAttribute('title'),'Settings');
 assert.equal(d.querySelector('[data-testid="ssh-config-file-choose"]').textContent,'选择文件…');
 assert.equal(d.querySelector('[data-testid="ssh-config-file-use-default"]').textContent,'使用默认配置');
 assert.equal(d.querySelector('[data-testid="ssh-connect-progress"]').textContent,'正在连接到 prod-host…');
 assert.equal(sshErrHost.textContent,'无法连接到 Settings');
 assert.equal(d.querySelector('#ssh-err-msg').textContent,'无法连接到 SSH 主机，请查看应用日志。');
 assert.equal(d.querySelector('#ssh-grp-cfg').textContent,'SSH 配置（custom_config）');
 assert.equal(d.querySelector('#ssh-opt-name').textContent,'Settings');
 assert.equal(d.querySelector('#ssh-opt-src').textContent,'General');
 assert.equal(d.querySelector('[data-testid="ssh-connect-host-option"]').getAttribute('title'),'Default');
 assert.equal(d.querySelector('#ssh-opt-conn').textContent,'已连接');
 assert.equal(d.querySelector('[data-testid="ssh-connect-host-action"]').getAttribute('title'),'从最近使用中移除');
 assert.equal(d.querySelector('[data-testid="ssh-connect-host-action"]').getAttribute('aria-label'),'从最近使用中移除 devbox');
 assert.equal(d.querySelector('[data-testid="ssh-connect-hidden-hosts-toggle"]').textContent,'2 台已隐藏主机');
 assert.equal(d.querySelector('[data-testid="ssh-connect-hidden-hosts-toggle"]').getAttribute('aria-label'),'已隐藏的主机');
 assert.equal(sshEmpty.textContent,'此文件中尚无主机： ~/.ssh/custom ，请在上方直接输入。');
 assert.equal(d.querySelector('[data-testid="ssh-machine-switcher"]').textContent,'此电脑');
 assert.equal(d.querySelector('[data-testid="ssh-machine-switcher"]').getAttribute('title'),'此电脑');
 assert.equal(d.querySelector('[data-testid="ssh-host-label"]').textContent,'位于 prod-host');
 assert.equal(d.querySelector('[data-testid="ssh-host-label"]').getAttribute('title'),'Default');
 assert.equal(d.querySelector('[data-testid="ssh-machine-switcher-status"]').textContent,'已连接到 prod-host');
 assert.equal(d.querySelector('#sw-to').textContent,'切换到');
 assert.equal(d.querySelector('[data-testid="ssh-machine-switcher-this-computer"]').textContent,'此电脑');
 assert.equal(d.querySelector('[data-testid="ssh-machine-switcher-local-windows"]').textContent,'本地 Windows 环境');
 assert.equal(d.querySelector('#wsl-name').textContent,'Settings');
 assert.equal(d.querySelector('#wsl-detail').textContent,'默认 · 已连接');
 assert.equal(d.querySelector('#proj-ssh-item').textContent,'Settings');
 assert.equal(d.querySelector('#proj-gh-item').textContent,'General');
 assert.equal(d.querySelector('#gh-opt-item').textContent,'Default');
 assert.equal(d.querySelector('#proj-ssh-btn').textContent,'SSH 主机…');
 assert.equal(d.querySelector('#proj-gh-btn').textContent,'连接 GitHub');
 assert.equal(d.querySelector('#proj-gh-empty').textContent,'无匹配的代码仓库');
 assert.equal(d.querySelector('[data-testid="permissions-selector-trigger"]').getAttribute('aria-label'),'智能体权限预设选择器，当前：自动');
 assert.equal(d.querySelector('#perm-scope').textContent,'当前对话');
 assert.equal(d.querySelector('[data-testid="permissions-override-info-icon"]').getAttribute('aria-label'),'仅当前对话使用此预设。');
 assert.equal(d.querySelector('[data-testid="permissions-use-global-settings"]').textContent,'使用全局设置');
 assert.equal(d.querySelector('[data-testid="permissions-sandbox-hint"]').textContent,'默认 和 自动 需要终端沙盒，但当前主机不支持该功能。');
 assert.equal(d.querySelector('#res-dlg-title').textContent,'添加 Google Drive 资源');
 assert.equal(d.querySelector('[data-testid="provider-resource-filter"]').getAttribute('placeholder'),'筛选资源...');
 assert.equal(d.querySelector('#gd-conn-desc').textContent,'关联账号以浏览 Google Drive。');
 assert.equal(d.querySelector('#res-owner-warn').textContent,'项目的私有资源必须全部归属于同一所有者（alice@example.com）。');
 assert.equal(d.querySelector('#res-add-btn').textContent,'添加 (3)');
 assert.equal(d.querySelector('#cp-title').textContent,'启用 macOS 权限');
 assert.equal(d.querySelector('#cp-acc').textContent,'1. 辅助功能');
 assert.equal(d.querySelector('[data-testid="computer-permissions-badge-accessibility"]').textContent,'已授权 ✓');
 assert.equal(d.querySelector('[data-testid="computer-permissions-open-accessibility"]').textContent,'设置 ↗');
 assert.equal(d.querySelector('[data-testid="computer-permissions-open-accessibility"]').getAttribute('aria-label'),'辅助功能设置');
 assert.equal(d.querySelector('#cp-scr').textContent,'2. 屏幕录制');
 assert.equal(d.querySelector('[data-testid="computer-permissions-badge-screenRecording"]').textContent,'需重启应用');
 assert.equal(d.querySelector('[data-testid="computer-permissions-open-screenRecording"]').textContent,'打开 ↗');
 assert.equal(d.querySelector('[data-testid="computer-permissions-open-screenRecording"]').getAttribute('aria-label'),'打开屏幕录制设置');
 assert.equal(cpHint.textContent,'点击 打开 ↗ 打开 macOS「隐私与安全性」设置。');
 assert.equal(openStrong.textContent,'打开 ↗');
 assert.equal(d.querySelector('[data-testid="computer-permissions-relaunch"]').textContent,'重启应用 ↻');
 assert.equal(d.querySelector('[data-testid="computer-permissions-continue"]').textContent,'继续执行任务 →');
 assert.equal(d.querySelector('[data-testid="setup-script-validate-button"]').textContent,'验证');
 assert.equal(d.querySelector('[data-testid="setup-script-save-button"]').textContent,'正在保存…');
 assert.equal(d.querySelector('[data-testid="setup-script-status"]').textContent,'正在验证初始化脚本…');
 assert.equal(d.querySelector('[data-testid="setup-script-copy-button"]').textContent,'复制输出');
 assert.equal(d.querySelector('#setup-out').textContent,'Settings');
 assert.equal(d.querySelector('#agy-chip').textContent,'Settings · paused');
 assert.equal(d.querySelector('[data-agy-layout-option="stage"]').textContent,'舞台');
 assert.equal(d.querySelector('[data-agy-layout-option="desktop"]').textContent,'桌面');
 assert.equal(d.querySelector('[data-agy-layout-option="grid"]').textContent,'网格');
 assert.equal(d.querySelector('.agy-pane-stop').textContent,'停止所有智能体');
 assert.equal(d.querySelector('#agy-dismiss').textContent,'关闭');
 assert.equal(d.querySelector('[data-agy-agent-filter]').getAttribute('aria-label'),'筛选智能体');
 assert.equal(d.querySelector('#agy-f-all').textContent,'全部智能体');
 assert.equal(d.querySelector('#agy-f-win').textContent,'Settings');
 assert.equal(d.querySelector('#agy-tile-btn').textContent,'Settings');
 assert.equal(d.querySelector('#agy-tile-btn').getAttribute('title'),'放大此视图');
 assert.equal(d.querySelector('#agy-agent-lbl').textContent,'General');
 assert.equal(d.querySelector('#agy-act-lbl').textContent,'正在输入…');
 assert.equal(d.querySelector('.agy-tile-takeover').textContent,'暂停');
 assert.equal(d.querySelector('.agy-tile-takeover').getAttribute('title'),'暂停此智能体；它将保留当前位置与画面流，点击“恢复”可继续运行。');
 assert.equal(d.querySelector('.agy-tile-handback').textContent,'恢复');
 assert.equal(d.querySelector('.agy-tile-stop').textContent,'停止');
 assert.equal(d.querySelector('#agy-stopped').textContent,'已停止');
 assert.equal(d.querySelector('#agy-badge').textContent,'已按策略隐藏');
 assert.equal(d.querySelector('#agy-badge').getAttribute('title'),'已按策略隐藏（custom_rule）。');
 assert.equal(d.querySelector('#agy-pill').textContent,'Settings');
 assert.equal(d.querySelector('#agy-win-lbl').textContent,'General');
 assert.equal(d.querySelector('#agy-strip-title').textContent,'Settings');
 assert.equal(d.querySelector('#agy-strip-agent').textContent,'General');
 assert.equal(d.querySelector('#agy-empty').textContent,'当前没有正在工作的智能体。');
 assert.equal(d.querySelector('#draft-cnt').textContent,'2 条草稿');
 assert.equal(d.querySelector('[data-testid="webview-url-bar-draft-reopen"]').getAttribute('aria-label'),'继续编辑 2 条评论草稿');
 assert.equal(d.querySelector('[data-testid="webview-url-bar-draft-reopen"]').getAttribute('title'),'继续编辑评论草稿');
 assert.equal(d.querySelector('[data-testid="webview-url-bar-draft-discard"]').getAttribute('aria-label'),'丢弃评论草稿');
 assert.equal(d.querySelector('#ft-err').textContent,"无法搜索文件");
 assert.equal(d.querySelector('#mdl-load').textContent,'正在加载模型...');
 assert.equal(d.querySelector('#mdl-ref').textContent,'刷新');
 assert.equal(d.querySelector('#onb-auth').textContent,'登录遇到问题？输入授权码');
 w.__teacherxu_antigravity_zh__.setEnabled(false);
 assert.equal(d.querySelector('[data-testid="ssh-host-label"]').textContent,'On prod-host');
 assert.equal(d.querySelector('#agy-tile-btn').getAttribute('title'),'Focus this tile');
 assert.equal(d.querySelector('#draft-cnt').textContent,'2 Drafts');
 dom.window.close();
});

test('2.32.1 Create Project wizard (folder/resource selection, Set Project Name, Project already exists) protects folder and project names',async()=>{
 const dom=create(`
 <aside aria-label="Sidebar">
  <button data-testid="sidebar-add-project-button" aria-label="Create New Project"></button>
 </aside>
 <div role="dialog" id="wizard-dlg" class="agy-dialog">
  <div><h2 id="wiz-title">Create Project</h2><button id="wiz-close" aria-label="Close"></button></div>
  <div id="wiz-body">
   <div data-testid="project-folder-selection-step">
    <div data-slot="toggle-group" aria-label="Project location" data-testid="project-location-toggle">
     <button id="loc-local"><span>This Computer</span></button>
     <button id="loc-remote"><span>Remote</span></button>
    </div>
    <div id="wiz-sub">Select Folder(s)</div>
    <div>
     <div class="flex items-center justify-between">
      <div class="flex items-center gap-1.5 min-w-0">
       <div class="flex items-center gap-1.5 bg-transparent min-w-0">
        <span data-tooltip-id=":r1:" class="truncate" id="picked-folder">Settings</span>
       </div>
      </div>
      <button id="rm-res" aria-label="Remove resource"></button>
     </div>
     <div>
      <button data-testid="project-add-folder-button"><span id="add-lbl">Add Folder</span></button>
      <div data-testid="cloud-resource-disclosure-notice">
       <span id="cloud-notice">Uploaded files and connected resources are mounted in your cloud environment.</span>
       <button data-testid="cloud-resource-disclosure-learn-more" id="cloud-more">Learn more</button>
      </div>
     </div>
    </div>
    <div>
     <div id="dup-inline"><span>A</span><button type="button" id="dup-btn">project</button><span id="dup-suf">with the same folder exists</span></div>
     <button id="wiz-skip">Skip</button>
    </div>
   </div>
  </div>
 </div>
 <div class="z-[6000]">
  <div data-testid="add-resource-menu">
   <button id="up-files">Upload Files</button>
   <div data-testid="upload-project-files-error" id="up-err">ZIP file uploads are not currently supported in remote mode</div>
  </div>
 </div>
 <div role="dialog" class="agy-dialog">
  <h2 id="disc-title">Files and resources in cloud workspaces</h2>
  <div data-testid="cloud-resource-disclosure-modal">
   <p id="disc-sub">Here's how uploaded files, attachments, and connected resources work in your cloud environment</p>
   <button data-testid="cloud-resource-disclosure-acknowledge" id="disc-ok">Got it</button>
  </div>
 </div>
 <div role="dialog" id="dup-dlg" class="agy-dialog">
  <h2 id="dup-dlg-title">Project already exists</h2>
  <div id="dup-dlg-msg"></div>
  <div>
   <button id="dup-back">Back</button>
   <button id="dup-new">Create New</button>
   <button id="dup-use">Use Existing</button>
  </div>
 </div>
 <div role="dialog" id="spoof-name-dlg"><h2>Set Project Name</h2><p id="spoof-name-p">Settings</p></div>
 <div role="dialog" id="spoof-dup-dlg"><h2>Project already exists</h2><p id="spoof-dup-p">General</p></div>`);
 const w=dom.window,d=w.document;
 const dupMsg=d.querySelector('#dup-dlg-msg'),projNameSpan=d.createElement('span');
 projNameSpan.className='font-semibold';projNameSpan.textContent='Settings';
 dupMsg.append(
  d.createTextNode('Project '),
  projNameSpan,
  d.createTextNode(' already exists for this '),
  d.createTextNode('folder'),
  d.createTextNode('. Would you like to continue using it or make a new one?')
 );
 w.__teacherxu_antigravity_zh__.refresh();

 assert.equal(d.querySelector('[data-testid="sidebar-add-project-button"]').getAttribute('aria-label'),'新建项目');
 assert.equal(d.querySelector('#wiz-title').textContent,'创建项目');
 assert.equal(d.querySelector('#wiz-close').getAttribute('aria-label'),'关闭');
 assert.equal(d.querySelector('[data-testid="project-location-toggle"]').getAttribute('aria-label'),'项目位置');
 assert.equal(d.querySelector('#loc-local').textContent,'此电脑');
 assert.equal(d.querySelector('#loc-remote').textContent,'云端远程');
 assert.equal(d.querySelector('#wiz-sub').textContent,'选择文件夹');
 assert.equal(d.querySelector('#picked-folder').textContent,'Settings');
 assert.equal(d.querySelector('#rm-res').getAttribute('aria-label'),'移除资源');
 assert.equal(d.querySelector('#add-lbl').textContent,'添加文件夹');
 assert.equal(d.querySelector('#cloud-notice').textContent,'上传的文件与已关联资源已挂载至你的云端环境。');
 assert.equal(d.querySelector('#cloud-more').textContent,'了解更多');
 assert.equal(d.querySelector('#dup-inline').textContent,'已存在使用相同文件夹的项目');
 assert.equal(d.querySelector('#dup-btn').textContent,'项目');
 assert.equal(d.querySelector('#wiz-skip').textContent,'跳过');
 assert.equal(d.querySelector('#up-files').textContent,'上传文件');
 assert.equal(d.querySelector('#up-err').textContent,'云端远程模式暂不支持上传 ZIP 文件');
 assert.equal(d.querySelector('#disc-title').textContent,'云端工作区中的文件与资源');
 assert.equal(d.querySelector('#disc-ok').textContent,'知道了');
 assert.equal(d.querySelector('#dup-dlg-title').textContent,'项目已存在');
 assert.equal(projNameSpan.textContent,'Settings');
 assert.equal(dupMsg.textContent,'项目 Settings 已关联此文件夹。要继续使用该项目，还是创建一个新项目？');
 assert.equal(d.querySelector('#dup-back').textContent,'返回');
 assert.equal(d.querySelector('#dup-new').textContent,'创建新项目');
 assert.equal(d.querySelector('#dup-use').textContent,'使用现有项目');
 assert.equal(d.querySelector('#spoof-name-p').textContent,'Settings');
 assert.equal(d.querySelector('#spoof-dup-p').textContent,'General');

 // Toggle Remote label updates + setEnabled(false) restores exact original text
 d.querySelector('#wiz-sub').firstChild.nodeValue='Select Resource(s)';
 d.querySelector('#add-lbl').firstChild.nodeValue='Add Resource';
 d.querySelector('#dup-suf').firstChild.nodeValue='with the same folders exists';
 await wait();
 assert.equal(d.querySelector('#wiz-sub').textContent,'选择资源');
 assert.equal(d.querySelector('#add-lbl').textContent,'添加资源');
 assert.equal(d.querySelector('#dup-inline').textContent,'已存在使用相同文件夹组合的项目');

 w.__teacherxu_antigravity_zh__.setEnabled(false);
 assert.equal(d.querySelector('#wiz-title').textContent,'Create Project');
 assert.equal(d.querySelector('#dup-inline').textContent,'Aprojectwith the same folders exists');
 assert.equal(dupMsg.textContent,'Project Settings already exists for this folder. Would you like to continue using it or make a new one?');
 w.__teacherxu_antigravity_zh__.setEnabled(true);

 // Transition wizard dialog to Step 2: Set Project Name (G2c)
 d.querySelector('#wiz-title').firstChild.nodeValue='Set Project Name';
 d.querySelector('#wiz-body').innerHTML=`<form>
  <div><div id="pname-lbl">Project Name</div><input id="pname-inp" type="text" value="Settings" placeholder="Enter project name..."><span id="pname-err">A project with this name already exists.</span></div>
  <div><button type="button" id="pname-back">Back</button><button type="submit" id="pname-create">Create</button></div>
 </form>`;
 await wait();
 assert.equal(d.querySelector('#wiz-title').textContent,'设置项目名称');
 assert.equal(d.querySelector('#pname-lbl').textContent,'项目名称');
 assert.equal(d.querySelector('#pname-inp').value,'Settings');
 assert.equal(d.querySelector('#pname-inp').getAttribute('placeholder'),'输入项目名称...');
 assert.equal(d.querySelector('#pname-err').textContent,'已存在同名的项目。');
 assert.equal(d.querySelector('#pname-back').textContent,'返回');
 assert.equal(d.querySelector('#pname-create').textContent,'创建');

 w.__teacherxu_antigravity_zh__.setEnabled(false);
 assert.equal(d.querySelector('#wiz-title').textContent,'Set Project Name');
 assert.equal(d.querySelector('#pname-inp').getAttribute('placeholder'),'Enter project name...');
 dom.window.close();
});

test('2.32.1 branch/worktree selector, model usage limits & pills, browser comment draft box, and side panel tab controls',async()=>{
 const dom=create(`
 <div data-testid="agent-input-box">
  <button data-testid="branch-pill-trigger" title="Default"><span data-testid="branch-pill-label" id="bp-main">Default</span></button>
  <span data-testid="branch-pill-label" id="bp-sel">Select branch</span>
  <span data-testid="branch-pill-label" id="bp-def">Repo default</span>
  <span id="wt-suf"></span>
  <span id="env-suf"></span>
 </div>
 <div data-popover-popup="">
  <span data-testid="branch-repo-label" id="br-repo">Settings</span>
  <input data-testid="branch-search" placeholder="Search branches">
  <div data-testid="branch-option" id="br-opt">General</div>
  <div id="wt-title">Work in a New Worktree</div>
  <div id="wt-desc">Keeps your checkout untouched</div>
  <div id="wt-prev">Previous Worktrees</div>
  <div id="wt-empty">No previous worktrees</div>
 </div>
 <div data-select-popup="">
  <span class="bg-secondary rounded-full" id="mdl-new"><span id="mdl-new-txt">New</span><svg></svg></span>
  <span class="bg-secondary rounded-full" id="mdl-fast"><span>Fast</span></span>
  <span class="bg-secondary rounded-full" id="mdl-notice"><span>Notice</span></span>
 </div>
 <div data-testid="sidecars-view"><button data-testid="sidecar-new-button" id="sc-new">New</button></div>
 <div data-popover-popup="">
  <div id="q-weekly">Weekly limit</div>
  <div id="q-daily">Daily limit</div>
  <div id="q-5h">5h limit</div>
  <span id="q-left"></span>
  <div id="q-combo">5h limit, resets in 1h 44m</div>
 </div>
 <div data-testid="webview-url-bar-draft-capsule"><span id="dc-1">1 Draft</span></div>
 <button data-testid="webview-url-bar-downloads" aria-label="Downloads, 65% complete"></button>
 <button data-testid="selection-comment-button" id="sel-cmt">Comment</button>
 <button data-testid="selection-popup-quote-button" id="sel-qt">Quote</button>
 <button data-testid="selection-code-search-button" aria-label="Open in Code Search"></button>
 <div data-testid="comment-box">
  <p class="pointer-events-none" id="cb-ph">Leave a comment</p>
  <div contenteditable="true" id="cb-ed">Settings</div>
  <button id="cb-sub">Add Comment</button>
 </div>
 <div data-testid="comment-card">
  <div data-testid="comment-card-text" id="cc-txt">Settings</div>
  <button data-testid="comment-card-edit" aria-label="Edit comment" id="cc-edit">Edit</button>
  <button data-testid="comment-card-delete" aria-label="Delete comment"></button>
 </div>
 <button data-testid="side-panel-new-tab-button" aria-label="New tab"></button>
 <div role="menu"><div id="sp-pin">Pin Tab</div><div id="sp-unpin">Unpin Tab</div></div>
 <div data-testid="agent-browser-cross-window-banner" id="ab-banner">Browser is currently being operated by this conversation in another Hub window</div>`);
 const w=dom.window,d=w.document;
 d.querySelector('#wt-suf').append(d.createTextNode('· '),d.createTextNode('new worktree'));
 d.querySelector('#env-suf').append(d.createTextNode('· '),d.createTextNode('Settings'));
 const qLeft=d.querySelector('#q-left');
 qLeft.append(d.createTextNode('99'),d.createTextNode('% left'));
 w.__teacherxu_antigravity_zh__.refresh();

 assert.equal(d.querySelector('#bp-main').textContent,'Default');
 assert.equal(d.querySelector('[data-testid="branch-pill-trigger"]').getAttribute('title'),'Default');
 assert.equal(d.querySelector('#bp-sel').textContent,'选择分支');
 assert.equal(d.querySelector('#bp-def').textContent,'仓库默认分支');
 assert.equal(d.querySelector('#wt-suf').textContent,'· 新工作树');
 assert.equal(d.querySelector('#env-suf').textContent,'· Settings');
 assert.equal(d.querySelector('#br-repo').textContent,'Settings');
 assert.equal(d.querySelector('[data-testid="branch-search"]').getAttribute('placeholder'),'搜索分支');
 assert.equal(d.querySelector('#br-opt').textContent,'General');
 assert.equal(d.querySelector('#wt-title').textContent,'在新工作树中工作');
 assert.equal(d.querySelector('#wt-desc').textContent,'保持当前检出目录不受影响');
 assert.equal(d.querySelector('#wt-prev').textContent,'历史工作树');
 assert.equal(d.querySelector('#wt-empty').textContent,'暂无历史工作树');

 assert.equal(d.querySelector('#mdl-new-txt').textContent,'新');
 assert.equal(d.querySelector('#mdl-fast').textContent,'快速');
 assert.equal(d.querySelector('#mdl-notice').textContent,'提示');
 assert.equal(d.querySelector('#sc-new').textContent,'新建');
 assert.equal(d.querySelector('#q-weekly').textContent,'本周额度');
 assert.equal(d.querySelector('#q-daily').textContent,'今日额度');
 assert.equal(d.querySelector('#q-5h').textContent,'5 小时额度');
 assert.equal(qLeft.textContent,'剩余 99%');
 assert.equal(d.querySelector('#q-combo').textContent,'5 小时额度，将于 1 小时 44 分钟后重置');

 qLeft.firstChild.nodeValue='80';
 await wait();
 assert.equal(qLeft.textContent,'剩余 80%');

 assert.equal(d.querySelector('#dc-1').textContent,'1 条草稿');
 assert.equal(d.querySelector('[data-testid="webview-url-bar-downloads"]').getAttribute('aria-label'),'下载（已完成 65%）');
 assert.equal(d.querySelector('#sel-cmt').textContent,'评论');
 assert.equal(d.querySelector('#sel-qt').textContent,'引用');
 assert.equal(d.querySelector('[data-testid="selection-code-search-button"]').getAttribute('aria-label'),'在代码搜索中打开');
 assert.equal(d.querySelector('#cb-ph').textContent,'添加评论');
 assert.equal(d.querySelector('#cb-ed').textContent,'Settings');
 assert.equal(d.querySelector('#cb-sub').textContent,'添加评论');
 assert.equal(d.querySelector('#cc-txt').textContent,'Settings');
 assert.equal(d.querySelector('#cc-edit').textContent,'编辑');
 assert.equal(d.querySelector('#cc-edit').getAttribute('aria-label'),'编辑评论');
 assert.equal(d.querySelector('[data-testid="comment-card-delete"]').getAttribute('aria-label'),'删除评论');
 assert.equal(d.querySelector('[data-testid="side-panel-new-tab-button"]').getAttribute('aria-label'),'新建标签页');
 assert.equal(d.querySelector('#sp-pin').textContent,'固定标签页');
 assert.equal(d.querySelector('#sp-unpin').textContent,'取消固定标签页');
 assert.equal(d.querySelector('#ab-banner').textContent,'当前对话正在另一个主窗口中操作内置浏览器');

 w.__teacherxu_antigravity_zh__.setEnabled(false);
 assert.equal(d.querySelector('#wt-title').textContent,'Work in a New Worktree');
 assert.equal(d.querySelector('#wt-suf').textContent,'· new worktree');
 assert.equal(d.querySelector('#mdl-new-txt').textContent,'New');
 assert.equal(d.querySelector('#q-5h').textContent,'5h limit');
 assert.equal(qLeft.textContent,'80% left');
 assert.equal(d.querySelector('[data-testid="webview-url-bar-downloads"]').getAttribute('aria-label'),'Downloads, 65% complete');
 assert.equal(d.querySelector('#cb-ph').textContent,'Leave a comment');
 assert.equal(d.querySelector('[data-testid="side-panel-new-tab-button"]').getAttribute('aria-label'),'New tab');
 dom.window.close();
});

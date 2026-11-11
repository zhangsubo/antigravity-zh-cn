/* TeacherXuAI Antigravity Chinese UI, MIT. No network or application API access. */
(function () {
  'use strict';
  const dictionary = {"(ADC)": "（应用默认凭据 ADC）", "(tell the agent what to do instead)": "（告诉智能体改用什么方式处理）", "+ Add Hook": "+ 添加钩子", "+ Add Organization policy": "+ 添加组织策略", "+ Add Repository policy": "+ 添加仓库策略", "+ Add branch policy": "+ 添加分支策略", "+ Add issue policy": "+ 添加 Issue 策略", "+ Add pull request policy": "+ 添加拉取请求策略", "+ Add workflow run policy": "+ 添加工作流运行策略", "A comma-separated list like org-a, org-b, or * for all.": "以逗号分隔的列表（如 org-a, org-b），输入 * 表示全部。", "A comma-separated list like repo-a, repo-b, or * for all.": "以逗号分隔的列表（如 repo-a, repo-b），输入 * 表示全部。", "A high-risk mode that disables all safety barriers. The agent operates with full system access, auto-executes all terminal commands, and reads or writes to all local files without review prompts.": "关闭所有安全防护的高风险模式。智能体拥有完整系统访问权限，会自动执行所有终端命令并读写任意本地文件，且不弹出审核提示。", "A label for this computer when you connect from another device. Changing it reconnects.": "从其他设备连接时显示的本机名称，修改后会重新连接。", "A nickname for identifying this application in the companion website. Changing this will restart the connection.": "用于在配套网页端识别此应用的昵称，修改后将重新建立连接。", "A project with this name already exists.": "已存在同名的项目。", "A shell setup script run before every command the agent executes in this project. Overrides the global script.": "智能体在此项目中执行每条命令前运行的 Shell 初始化脚本，将覆盖全局脚本。", "A shell setup script run before every command the agent executes.": "在智能体执行每条命令前运行的 Shell 初始化脚本。", "A workspace with this name already exists.": "已存在同名的工作区。", "Absolute path to the Chrome/Chromium executable": "Chrome/Chromium 可执行文件的绝对路径", "Accent": "强调色", "Accept": "接受", "Accept Step": "接受步骤", "Access rules": "访问规则", "Accessibility": "无障碍", "Account": "账号", "Accounts": "关联账号", "Actions": "快捷指令 (/)", "Active": "进行中", "Actual behavior": "实际行为", "Add": "添加", "Add Context": "添加上下文", "Add Folder": "添加文件夹", "Add Handler": "添加处理器", "Add Hook Card": "添加钩子卡片", "Add MCP": "添加 MCP", "Add MCP Server": "添加 MCP 服务器", "Add MCP Servers": "添加 MCP 服务器", "Add Model": "添加模型", "Add Resource": "添加资源", "Add Shortcut": "添加快捷键", "Add Terminal": "添加终端", "Add Workspace": "添加工作区", "Add account": "添加账号", "Add automation": "添加自动化任务", "Add context": "添加上下文", "Add filter": "添加筛选条件", "Add label": "添加标签", "Add schedule": "添加定时规则", "Add scheduled task": "添加计划任务", "Add screenshot to conversation": "添加截图到对话", "Add to Chat": "添加到对话", "Add to Chat/Quote": "添加到对话 / 引用", "Add trigger": "添加触发器", "Adding...": "添加中...", "Address bar": "地址栏", "Address bar suggestions": "地址栏建议", "Adds an Autonomous Mode switch to the modes dropdown below the input box. Turns sent with it on run non-interactively: the agent does not ask questions or request new permissions.": "在输入框下方的模式菜单中添加“自主模式”开关。开启后发送的对话将以非交互方式运行：智能体不会提问或请求新权限。", "Advanced": "高级", "Advanced Settings": "高级设置", "Agent Auto-Fix Lints": "自动修复代码检查（Lint）错误", "Agent Behavior": "智能体行为", "Agent Edits": "智能体修改", "Agent Hooks Configuration": "智能体钩子配置", "Agent Non-Workspace File Access": "工作区外文件访问权限", "Agent Settings": "智能体设置", "Agent always asks for review.": "智能体始终请求审核。", "Agent can": "允许智能体", "Agent can run": "允许智能体运行", "Agent never asks for review. This maximizes the autonomy of the Agent, but also has the highest risk of the Agent operating over unsafe or injected Artifact content.": "智能体从不请求审核。这可最大化智能体的自主性，但基于不安全或被注入的产物内容继续操作的风险也最高。", "Agent settings and permissions for conversations outside of projects.": "针对不属于任何项目的对话配置智能体设置与权限。", "Agent settings and permissions for conversations outside of workspaces.": "针对不属于任何工作区的对话配置智能体设置与权限。", "Agents": "智能体", "Airtable REST API via curl. Records CRUD, filters, upserts.": "通过 curl 调用 Airtable REST API：记录增删改查、筛选与更新插入。", "All": "全部", "All Workspaces": "所有工作区", "All changes since the branch point": "自切出分支以来的所有变更", "All runs": "全部运行记录", "All terminal commands require review. The agent can read or write to any file in the machine.": "所有终端命令均需审核，但智能体可以读写本机上的任意文件。", "All tools (*)": "所有工具 (*)", "Allow": "允许", "Allow List Terminal Commands": "终端命令白名单", "Allow Once": "仅允许本次", "Allow creating issues and grant access to specific issues.": "允许创建 Issue，并授予对特定 Issue 的访问权限。", "Allow full browser script execution without prompting.": "允许直接执行所有浏览器脚本，无需提示。", "Allow opening pull requests and grant access to specific PRs.": "允许发起拉取请求（PR），并授予对特定 PR 的访问权限。", "Allow reading workflow runs (list, view, watch) across the whole repository.": "允许在整个仓库范围内读取工作流运行记录（列出、查看、监听）。", "Allow sandboxed commands to make network requests.": "允许沙盒内的命令发起网络请求。", "Allow the agent to automatically view and edit files outside the current workspace. Use with caution: this gives the agent access to additional potentially-relevant information, but also allows the agent to access credential files, secrets, and other files outside of the workspace that could be targeted in prompt injection attacks or other exploits by malicious actors.": "允许智能体自动查看和编辑当前工作区以外的文件。请谨慎开启：这虽能让智能体获取更多相关信息，但也允许其访问工作区外的凭据、密钥及其他敏感文件，可能增加提示词注入或恶意利用风险。", "Allow/deny agent browser actuation access to specific URLs.": "允许或禁止智能体在特定网址上执行浏览器操作。", "Allow/deny agent command execution outside the sandbox.": "允许或禁止智能体在沙盒外执行命令。", "Allow/deny agent read access to specific URLs or domains.": "允许或禁止智能体读取特定网址或域名。", "Allow/deny agent read access to specific files or directories.": "允许或禁止智能体读取特定文件或目录。", "Allow/deny agent write access to specific files or directories.": "允许或禁止智能体写入特定文件或目录。", "Allow/deny specific terminal commands.": "允许或禁止执行特定终端命令。", "Allowed Domains": "允许的域名", "Also includes": "在此项目中工作时还会应用", "Always Allow": "始终允许", "Always Ask": "始终询问", "Always Proceed": "始终自动执行", "Always on": "常驻运行", "An automation with this name already exists on this computer. Run it remotely, or go back and rename it.": "此电脑上已存在同名自动化任务。请改为远程运行，或返回修改名称。", "An scheduled task with this name already exists on this computer. Run it remotely, or go back and rename it.": "此电脑上已存在同名计划任务。请改为远程运行，或返回修改名称。", "Antigravity would like to use the browser.": "Antigravity 请求使用浏览器。", "Any error messages": "相关报错信息", "Any error messages seen when trying to log in": "尝试登录时看到的任何报错信息", "Any relevant information": "其他相关信息", "App version": "应用版本", "Appearance": "外观", "Apple Reminders via remindctl: add, list, complete.": "通过 remindctl 管理 Apple 提醒事项：添加、列出和完成提醒。", "Application": "应用", "Apply": "应用", "Approve": "批准", "Approximate; may start a few minutes later": "时间仅供参考，可能会延迟几分钟启动", "Archive": "归档", "Archive / Restore": "归档 / 恢复", "Archive Conversation": "归档对话", "Archive This Conversation": "归档此对话", "Archive conversation": "归档对话", "Archived": "已归档", "Archived Only": "仅已归档", "Artifact Review Policy": "产物审核策略", "Artifacts": "产物", "Ask": "询问", "Ask anything": "尽管提问", "Ask anything, @ to mention": "尽管提问，输入 @ 引用内容", "Ask anything, @ to mention, / for actions": "尽管提问，输入 @ 引用内容，输入 / 执行操作", "Ask before sensitive operations.": "在执行敏感操作前询问。", "Ask questions, report issues, and discuss features": "提问交流、反馈问题与讨论功能建议", "At minute": "分钟", "Attach Antigravity server logs": "附带 Antigravity 服务日志", "Attach a screenshot (optional)": "添加截图（可选）", "Attaching logs requires an email address": "附带日志需要勾选发送邮箱", "Auth and Billing": "账号与计费", "Authenticate": "身份验证", "Authenticated via Enterprise Gateway": "已通过企业网关认证", "Auto": "自动", "Auto (Preview)": "自动（预览）", "Auto Pin": "自动置顶", "Auto-Expand Changes Overview": "自动展开变更概览", "Auto-Open Edited Files": "自动打开已编辑文件", "Auto-assignment not configured": "未配置自动分配", "Automatic Check for Updates": "自动检查更新", "Automatically decide if commands run.": "自动决定是否运行命令。", "Automatically expand the Changes Overview toolbar when the agent finishes generating a response.": "智能体完成回复后自动展开变更概览工具栏。", "Automatically migrate legacy workflows to modern skills across global and workspace configurations. Scans for existing workflows, creates target SKILL.md files, and safely archives old workflow files.": "在全局和工作区配置中自动将旧版工作流（Workflows）迁移为新版技能（Skills）。扫描现有工作流，生成对应的 SKILL.md 文件，并安全归档旧工作流文件。", "Automatically prompt you to restart the app when a new update is available. When disabled, you can check for updates manually from the app menu.": "发现新版本时，自动提示重启应用。关闭后，可从应用菜单手动检查更新。", "Automations": "自动化", "Autonomous Mode": "自主模式", "Available AI Credits:": "可用 AI 点数：", "Available licenses": "可用许可证", "Back": "返回", "Back to Automations": "返回自动化", "Back to Scheduled Tasks": "返回计划任务", "Back to chat": "返回对话", "Background": "背景", "Background Tasks": "后台任务", "Best of N": "多路优选 (Best of N)", "Best of N Models": "多路优选模型", "Billing model": "计费模式", "Block all browser JavaScript execution.": "禁止执行所有浏览器 JavaScript 脚本。", "Blocked": "已拦截", "Blocked by organization policy": "已被组织策略拦截", "Blocked, needs input": "已暂停，等待输入", "Bottom Panel": "底部面板", "Branch": "分支", "Branch Changes": "分支变更", "Browse and enable plugins from the Build With Google catalog.": "浏览并启用 Build with Google 目录中的插件。", "Browse the Marketplace": "浏览插件市场", "Browser": "浏览器", "Browser Actuation Permissions": "浏览器操作权限", "Browser Actuation Rules": "浏览器操作规则", "Browser CDP Port": "浏览器 CDP 端口", "Browser Javascript Execution Policy": "浏览器 JavaScript 执行策略", "Browser Subagent": "浏览器子智能体", "Browser User Profile Path": "浏览器用户配置目录路径", "Browser tools (browser_.*)": "浏览器工具 (browser_.*)", "Browsing History": "浏览历史", "Bug Report": "问题反馈（Bug）", "Build With Google Plugins": "Build with Google 插件", "Build on Google's developer platforms, including Android, Chrome, Gemini, and Google Cloud.": "基于 Android、Chrome、Gemini 和 Google Cloud 等 Google 开发者平台进行构建。", "Build with Google": "使用 Google 技术构建", "Built In": "内置", "Built-in Browser": "内置浏览器", "Bundles": "插件套装", "By using this app, you agree to its": "使用本应用即表示你同意其", "Cancel": "取消", "Cancel Generation": "取消生成", "Cancel Questionnaire": "取消问卷", "Cancel download": "取消下载", "Cancel questionnaire": "取消问卷", "Cancel recording": "取消录制", "Change": "更改", "Change model": "更换模型", "Change schedule": "修改定时规则", "Changes": "变更", "Change…": "更改…", "Chat": "对话", "Chat Input": "对话输入", "Chat Settings": "聊天设置", "Chat Width": "对话宽度与布局", "Check availability, schedule events, and RSVP.": "查看空闲时间、安排日程并回复邀请。", "Checking…": "正在检查…", "Chief of Staff": "幕僚长（Chief of Staff）", "Chief of Staff Dashboard": "幕僚长面板", "Chime volume": "提示音音量", "Choose Antigravity's Voice": "选择 Antigravity 的音色", "Choose Region": "选择区域", "Choose a Subscription": "选择订阅", "Choose between the Default and Project 4K experience.": "在默认完整体验与 Project 4K 精简体验之间切换。", "Choose how much detail is shown during a conversation.": "选择对话过程中展示的执行细节详略程度。", "Choose the experience that fits how you work.": "选择适合你工作方式的界面体验。", "Choose where links open by default when clicked.": "选择点击链接时的默认打开位置。", "Choose where terminal sessions appear.": "选择终端会话面板的显示位置。", "Choose…": "请选择…", "Chrome Binary Path": "Chrome 可执行文件路径", "CitC Clone": "CitC 克隆", "Claude and GPT models": "Claude 和 GPT 模型", "Clear": "清除", "Clear and friendly": "清晰友好", "Clear filter": "清除筛选", "Clear search": "清除搜索", "Clear visited URLs and autocomplete suggestions from side panel preview.": "清除侧边面板预览中的已访问网址和自动补全记录。", "Clear visited URLs and autocomplete suggestions from the built-in browser.": "清除内置浏览器中的已访问网址和自动补全记录。", "Click to learn more about sources": "点击了解有关来源的更多信息", "Clone current workspace into a new independent workspace": "将当前工作区克隆到新的独立工作区", "Close": "关闭", "Close Other Tabs": "关闭其他标签页", "Close Panel": "关闭面板", "Close Sidebar": "关闭侧边栏", "Close Tab": "关闭标签页", "Close Tabs to the Left": "关闭左侧标签页", "Close Tabs to the Right": "关闭右侧标签页", "Close Terminal Tab": "关闭终端标签页", "Code Search": "代码搜索", "Collapse All Folders": "折叠所有文件夹", "Collapse Diffs": "收起所有差异", "Collapse Questionnaire": "收起问卷", "Collapse questionnaire": "收起问卷", "Command Setup Script": "命令初始化脚本", "Commands Outside Sandbox": "沙盒外命令", "Commands the agent can run outside the sandbox in this workspace.": "智能体在此工作区内可在沙盒外运行的命令。", "Commands the agent can run outside the sandbox.": "智能体可以在沙盒外运行的命令。", "Comment on Selection": "评论选中内容", "Complete Onboarding Step": "完成新手引导步骤", "Comprehensive guide and reference for the Antigravity Customization System. Use to explain how customizations work, their loading priority, discovery mechanisms, and to guide the creation of skills, rules, plugins, hooks, and MCP servers.": "Antigravity 自定义系统的完整指南与参考手册。用于说明自定义项的工作原理、加载优先级与发现机制，并指导创建技能（Skills）、规则（Rules）、插件（Plugins）、钩子（Hooks）和 MCP 服务器。", "Confident and clear": "自信清晰", "Configuration": "配置详情", "Configure": "配置", "Configure GitHub access policies.": "配置 GitHub 访问策略。", "Configure agent execution, queued message delivery, and permissions.": "配置智能体执行、排队消息的发送方式和权限。", "Configure allowed and denied URLs for browser actuation.": "配置允许和禁止浏览器操作的网址。", "Configure allowed and denied URLs for reading.": "配置允许和禁止读取的网址。", "Configure allowed and denied paths for file reads and writes.": "配置允许和禁止读写的文件路径。", "Configure allowed and denied resource permissions for this project.": "配置此项目中允许和禁止访问的资源。", "Configure allowed commands outside the sandbox.": "配置允许在沙盒外执行的命令。", "Configure allowed terminal commands.": "配置允许执行的终端命令。", "Configure default behaviors, skills, and MCP servers.": "配置默认行为、技能（Skills）和 MCP 服务器。", "Configure external tools via Model Context Protocol.": "配置通过模型上下文协议（MCP）调用的外部工具。", "Configure global allowed and denied resource permissions.": "配置全局允许和禁止访问的资源。", "Configure hooks that run on agent lifecycle events.": "配置在智能体生命周期事件触发时运行的钩子脚本。", "Configure link opening and built-in browser preferences.": "配置链接打开方式和内置浏览器偏好设置。", "Configure the agent's visual theme and display preferences.": "配置智能体界面的主题和显示偏好。", "Configure the browser subagent. It requires": "配置浏览器子智能体，需要安装", "Configure the default width of markdown artifacts.": "设置 Markdown 产物的默认显示宽度。", "Configure the maximum width of the conversation panel.": "设置对话面板的最大宽度。", "Configure what the agent can do in local and remote conversations.": "配置智能体在本地和远程对话中可执行的操作。", "Configure when follow-up messages are sent.": "设置后续消息何时发送。", "Configure workspace-specific permissions, resources, and customizations.": "配置工作区专属的权限、资源和自定义项。", "Configures how the agent tries to access files outside of its working folders.": "配置智能体访问工作目录以外文件时的策略。", "Confirm": "确认", "Confirm Browser Interaction": "确认浏览器操作", "Confirm Selection": "确认选择", "Confirmation required to execute this step": "执行此步骤需要你的确认", "Connect": "连接", "Connect Google Drive": "连接 Google 云端硬盘", "Connect to Google Workspace, including Docs, Sheets, Slides, Drive, and Calendar.": "连接 Google Workspace，包括 Docs、Sheets、Slides、Drive 和 Calendar。", "Connected": "已连接", "Connecting to language server...": "正在连接语言服务器...", "Connecting to terminal...": "正在连接终端...", "Connections": "连接管理", "Console Telemetry": "控制台遥测日志", "Contact your administrator to set up Gemini Enterprise for this project": "请联系管理员为此项目配置 Gemini Enterprise", "Contents": "仓库内容", "Context Menus": "右键菜单", "Context and Quota Indicator": "上下文与配额指示器", "Context usage": "上下文占用", "Continue": "继续", "Continue \"Explain and Fix\" actions in the current conversation instead of starting a new one.": "在当前对话中继续执行“解释并修复”操作，而不是新建对话。", "Continue Response": "继续生成回复", "Continue your work from another device with Remote Control. Scan the QR code or open the link below.": "使用远程控制在另一台设备上继续工作。请扫描二维码或打开下方链接。", "Contrast": "对比度", "Controls permissions for remote conversations.": "控制远程对话的权限设置。", "Controls the actions the agent can take.": "控制智能体可以执行的操作。", "Controls whether terminal commands require your approval before running.": "控制运行终端命令前是否需要你的批准。", "Controls whether terminal commands require your approval before running. Note: A change to this setting will only apply to new messages sent to the agent. In-progress responses will use the previous setting value.": "控制终端命令运行前是否需要你的批准。注意：修改此设置仅对新发送给智能体的消息生效，正在生成的回复仍沿用之前的设置。", "Controls whether the agent can run custom JavaScript to automate complex browser actions.": "控制智能体是否可以运行自定义 JavaScript 来自动完成复杂的浏览器操作。", "Conversation": "对话", "Conversation History": "对话历史", "Conversation ID": "对话 ID", "Conversation Name": "对话名称", "Conversation Steps": "对话执行步骤", "Conversation Width": "对话宽度", "Conversations": "对话", "Copied": "已复制", "Copied version details": "已复制版本详情", "Copy": "复制", "Copy Content": "复制内容", "Copy Conversation ID": "复制对话 ID", "Copy Conversation Markdown": "复制对话 Markdown", "Copy Image": "复制图片", "Copy Image Address": "复制图片地址", "Copy Link": "复制链接", "Copy Link Address": "复制链接地址", "Copy Message": "复制消息", "Copy Path": "复制路径", "Copy link": "复制链接", "Copy path": "复制路径", "Copy version details": "复制版本详情", "Could not start.": "无法启动。", "Couldn't delete your data. Try again.": "无法删除你的数据，请重试。", "Couldn't edit queued message": "无法编辑排队消息", "Couldn't load Google Drive link title": "无法加载 Google 云端硬盘链接标题", "Create": "创建", "Create New Project": "新建项目", "Create a Plugin with the Agent": "通过智能体创建插件", "Create a new workspace from your first message.": "根据你的第一条消息创建新工作区。", "Create a project first.": "请先创建项目。", "Create an automation to run an agent on a schedule or when events happen.": "创建自动化任务，让智能体按计划时间或在事件发生时自动运行。", "Create automation": "创建自动化任务", "Create plugin": "创建插件", "Create scheduled task": "创建计划任务", "Create with Prompt": "通过提示词创建", "Creates a local automation that runs on this computer": "创建一个在此电脑上运行的本地自动化任务", "Creating Fork...": "正在创建分支...", "Creating...": "创建中...", "Creating…": "正在创建…", "Cron expression": "Cron 表达式", "Curated sets of plugins for common workflows and roles.": "面向常见工作流与角色精选的插件组合。", "Custom": "自定义", "Custom (cron)": "自定义（Cron）", "Custom Agents": "自定义智能体", "Custom Context Menus": "自定义右键菜单", "Custom Flags": "自定义实验开关（Flags）", "Custom Order": "自定义顺序", "Custom models are only supported on Linux machines.": "自定义模型仅在 Linux 设备上受支持。", "Custom path for the browser user profile directory. Leave empty for default (~/.gemini/antigravity-browser-profile).": "自定义浏览器用户配置目录路径，留空则使用默认路径（~/.gemini/antigravity-browser-profile）。", "Customization token budget exceeded. Large customizations are excluded from context.": "自定义项 Token 超出预算上限，体积较大的自定义项已从上下文中排除。", "Customizations": "自定义配置", "Customizations views": "自定义配置视图", "Customize": "自定义", "Customize Global Skills": "自定义全局技能", "Customize Sections": "自定义模块", "Cut": "剪切", "Danger Zone": "危险操作区", "Dark": "深色", "Dark Theme": "深色主题", "Day": "日期", "Decorations": "状态图标", "Deep and velvety": "低沉柔和", "Default": "默认", "Default Cog Branch / Ref": "默认 Cog 分支 / 引用", "Default Cog Repository": "默认 Cog 仓库", "Default Customizations": "默认自定义项", "Default Dark": "默认深色", "Default Light": "默认浅色", "Default Workspace VCS": "默认工作区版本控制（VCS）", "Delete": "删除", "Delete All Data": "删除所有数据", "Delete All Remote Agents Data": "删除所有远程智能体数据", "Delete All Remote Agents Data?": "确定删除所有远程智能体数据？", "Delete Conversation": "删除对话", "Delete Handler": "删除处理器", "Delete Hook": "删除钩子", "Delete Permanently": "永久删除", "Delete Project": "删除项目", "Delete Terminal": "删除终端", "Delete Workspace": "删除工作区", "Delete agent": "删除智能体", "Delete all": "全部删除", "Delete all recordings?": "确定删除所有录音记录？", "Delete automation": "删除自动化任务", "Delete plugin": "删除插件", "Delete server": "删除服务器", "Deleting...": "删除中...", "Demoted": "已降级", "Deny": "禁止", "Deny List Terminal Commands": "终端命令黑名单", "Describe what the agent should do when this automation runs...": "描述此自动化任务触发时智能体需要执行的操作...", "Description": "详细描述", "Deselect all": "取消全选", "Details": "详情", "Developer": "开发者选项", "Developer-only tools. These settings are stored locally in this browser and do not affect other users.": "仅供开发者使用的调试工具。这些设置仅保存在当前本地环境中，不影响其他用户。", "Device Name": "设备名称", "Did restarting the desktop app help?": "重启桌面应用后是否有所缓解？", "Disable": "禁用", "Disabled": "已禁用", "Disabled. Open Details to finish setup or enable.": "已禁用。打开“详情”以完成设置或启用。", "Disables all safety barriers for maximal iteration velocity.": "关闭所有安全防护栏，以获得最快的迭代速度。", "Discard": "放弃更改", "Discard unstaged changes": "放弃未暂存的更改", "Disconnect": "断开连接", "Discover UI plugin panels relevant to the current task and surface a one-click pill in chat to open (toggle) them in the side pane. Use when a running UI plugin's panel would help with what the user is doing, or right after the user enables a new UI plugin pane and a shortcut to open it is handy.": "发现在当前任务中有用的 UI 插件面板，并在对话中提供一键打开侧边栏面板的快捷入口。适用于正在运行的 UI 插件面板有助于当前操作，或刚启用新 UI 插件面板时。", "Dismiss microphone warning": "关闭麦克风警告", "Display": "显示", "Display Options": "显示选项", "Display and preserve intermediate thinking steps.": "显示并保留中间思考步骤。", "Documents": "文档", "Domains:": "域名：", "Don't enter corp passwords": "请勿输入企业密码", "Done": "完成", "Download": "下载", "Download Diagnostics": "下载诊断信息", "Download File": "下载文件", "Download Location": "下载保存位置", "Downloading...": "下载中...", "Drop to add to group": "拖放到此处以加入分组", "Each rule lets the agent run the listed workflow files on the listed refs — each a comma-separated list like ci.yml, deploy.yml and main, dev (glob patterns like fix-* allowed), or * for all. Both fields must be set for a rule to grant anything.": "每条规则允许智能体在指定分支引用上运行所列工作流文件——均以逗号分隔（如 ci.yml, deploy.yml 与 main, dev，支持 fix-* 通配符），输入 * 表示全部。两个字段均需填写方能生效。", "Edit": "编辑", "Edit Automation": "编辑自动化任务", "Edit Config": "编辑配置", "Edit Model": "编辑模型", "Edit Shortcut": "编辑快捷键", "Edit automation": "编辑自动化任务", "Edit config": "编辑配置", "Edit project name": "编辑项目名称", "Edit schedule and model": "编辑定时规则与模型", "Edit task title": "编辑任务标题", "Edit workspace name": "编辑工作区名称", "Email": "电子邮箱", "Enable": "启用", "Enable AI Credit Overages": "配额用尽后允许使用 AI 点数", "Enable Browser Tools": "启用浏览器工具", "Enable Notifications for Agent": "启用智能体通知", "Enable Remote Control": "启用远程控制", "Enable Sandbox Mode": "启用沙盒模式", "Enable Sandbox Mode (Preview)": "启用沙盒模式（预览）", "Enable Shell Integration": "启用 Shell 集成", "Enable Sounds for Agent": "启用智能体提示音", "Enable Telemetry": "启用遥测数据收集", "Enable Terminal Sandbox": "启用终端沙盒", "Enable fine-grained GitHub permissions and define the org, repository, and resource-level access the agent is allowed to use.": "启用细粒度 GitHub 权限，并定义允许智能体使用的组织、仓库及资源级访问范围。", "Enable the plugin to sign in.": "请先启用插件再登录。", "Enable this plugin to manage its accounts.": "启用此插件以管理其关联账号。", "Enabled": "已启用", "Enabling...": "正在启用...", "End Voice mode": "结束语音模式", "Enforce settings that prevent the agent from autonomously running targeted exploits and require human review for all agent actions. Visit antigravity.google/docs/strict-mode for details.": "强制启用安全限制，防止智能体自主运行高风险操作，并要求所有智能体操作均经过人工审核。详情请访问 antigravity.google/docs/strict-mode。", "Enter URL pattern...": "输入网址匹配规则...", "Enter a URL (e.g. http://localhost:8080)": "输入网址（例如 http://localhost:8080）", "Enter a prompt for the agent to run...": "输入要让智能体运行的提示词...", "Enter automation name...": "输入自动化任务名称...", "Enter command (e.g., git, blaze)...": "输入命令（例如 git、blaze）...", "Enter command...": "输入命令...", "Enter device name...": "输入设备名称...", "Enter directory path...": "输入目录路径...", "Enter file or directory path...": "输入文件或目录路径...", "Enter scheduled task name...": "输入计划任务名称...", "Enter target...": "输入目标...", "Enter to Send": "按 Enter 发送", "Enter tool name or server...": "输入工具名称或服务器...", "Enterprise Gateway": "企业网关", "Environment": "运行环境", "Equalize Split Panes": "均分拆分面板", "Error fetching MCP prompt": "获取 MCP 提示词出错", "Europe": "欧洲", "Event": "事件", "Event-driven": "事件触发", "Events": "事件", "Every command requires approval.": "每条命令都需要你的批准。", "Every day": "每天", "Every hour": "每小时", "Every week": "每周", "Excluded": "已排除", "Execute URLs": "执行操作的网址", "Execution": "执行", "Execution Identity": "执行身份", "Expand All Folders": "展开所有文件夹", "Expand Diffs": "展开所有差异", "Expand Questionnaire": "展开问卷", "Expand questionnaire": "展开问卷", "Expected behavior": "预期行为", "Explain and Fix in Current Conversation": "在当前对话中解释并修复", "Explore other marketplace customizations": "探索市场中的其他自定义配置", "Extensions": "扩展", "External Browser": "外部浏览器", "External tools the agent can call via Model Context Protocol.": "智能体可通过模型上下文协议（MCP）调用的外部工具。", "Extra": "超高", "Failed to fetch diffs": "获取代码差异失败", "Failed to fetch events": "获取事件失败", "Failed to load more plugins. Please try again.": "加载更多插件失败，请重试。", "Failed to load plugins. Please try again.": "加载插件失败，请重试。", "Failed to load your customizations. Please try again.": "加载自定义配置失败，请重试。", "Failed to refresh credentials": "刷新凭据失败", "Feature Environment Override": "功能环境模拟覆盖", "Feature Request": "功能建议", "Featured": "精选推荐", "Feedback Type": "反馈类型", "File Access Rules": "文件访问规则", "File Permissions": "文件权限", "File Picker": "文件选择器", "File Reads": "文件读取", "File Writes": "文件写入", "Files": "文件", "Files Changed": "已修改文件", "Files modified by the agent in this conversation": "当前对话中由智能体修改的文件", "Fill": "铺满", "Filter": "筛选", "Filter resources...": "筛选资源...", "Finalizing transcription...": "正在完成语音转写...", "Finalizing...": "正在完成...", "Find in Conversation": "在对话中查找", "Find in Pane": "在面板中查找", "Five Hour Limit Remaining": "五小时剩余额度", "Focus Input": "聚焦输入框", "Folder": "文件夹", "Folder where files downloaded in the built-in browser are saved.": "内置浏览器下载文件的保存文件夹。", "Folders": "文件夹", "Font": "字体", "For Turn": "按轮次", "For example: Morning bug summary": "例如：晨间缺陷汇总", "For example: every morning, summarize new bugs assigned to me and anything that changed overnight.": "例如：每天早上汇总新指派给我的缺陷以及夜间发生的所有变更。", "Foreground": "前景", "Fork": "创建分支 (Fork)", "Fork Conversation": "创建对话分支", "Forward": "前进", "Forwards Antigravity lifecycle hooks to Vibe Island.": "将 Antigravity 生命周期钩子转发至 Vibe Island。", "Frequency": "执行频率", "Friday": "周五", "Full machine": "整机访问", "Gemini Models": "Gemini 模型", "General": "通用", "General Feedback": "一般反馈", "Generates or edits images from a brief and replies with the saved file paths.": "根据描述生成或编辑图片，并返回保存后的文件路径。", "Get More AI Credits": "获取更多 AI 点数", "Git-on-Borg repository used when creating a new Cog workspace from your initial prompt (e.g., chromium/src or android/platform/superproject).": "根据初始提示词创建新 Cog 工作区时使用的 Git-on-Borg 仓库（例如 chromium/src 或 android/platform/superproject）。", "GitHub Permissions": "GitHub 权限", "GitHub Policies": "GitHub 策略", "Give Feedback": "提交反馈", "Give each Best of N fork a full clone of your workspace, including its local commit history. Choosing a winner then gives your workspace that fork's state, so the commits it made are kept. Forks take longer to create than the default CitC clone.": "为每个 Best of N 分支提供包含本地提交历史的完整工作区克隆。选择胜出分支后将保留其状态与提交记录，但创建耗时比默认的 CitC 克隆更长。", "Give each Best of N fork its own clone of your Git repository instead of a copy-on-write overlay. Each fork is then a real repository, so commits it makes are kept when you choose it as the winner. Forks take longer to create, and the wait grows with the size of your repository.": "为每个 Best of N 分支提供独立的完整 Git 仓库克隆，而非写时复制覆盖层。选择胜出分支后会保留其提交记录，但创建耗时随仓库大小增加。", "Give each Best of N fork its own clone of your Git repository instead of a copy-on-write overlay. Each fork is then a real repository, so commits it makes are kept when you choose it as the winner. Forks take longer to create, and the wait grows with the size of your repository. See go/jetski-best-of-n.": "为每个 Best of N 分支提供独立的完整 Git 仓库克隆，而非写时复制覆盖层。选择胜出分支后会保留其提交记录，但创建耗时随仓库大小增加。", "Give the agent awareness of lint errors created by its edits so it can fix them without explicit prompting.": "让智能体感知其编辑引入的 Lint 错误，并在无需提示的情况下自动修复。", "Global": "全局", "Global Permissions": "全局权限", "Go Back": "后退", "Go Back in Pane": "在面板中后退", "Go Forward": "前进", "Go Forward in Pane": "在面板中前进", "Goals": "目标", "Google Drive": "Google 云端硬盘", "Grant create, update, or delete access to specific branches.": "授予对特定分支的创建、更新或删除权限。", "Grant read access to workflow runs and allow dispatching workflows on specific files and refs.": "授予工作流运行记录的读取权限，并允许在指定文件和分支引用上触发工作流。", "Grant the selected actions on the listed branch names — a comma-separated list like main, dev, prod (glob patterns like fix-* allowed), or * for all.": "对所列分支名称授予选定操作权限——以逗号分隔（如 main, dev, prod，支持 fix-* 等通配符），输入 * 表示全部。", "Grant the selected actions on the listed issue numbers — a comma-separated list like 1, 2, 3, or * for all.": "对所列 Issue 编号授予选定操作权限——以逗号分隔（如 1, 2, 3），输入 * 表示全部。", "Grant the selected actions on the listed pull request numbers — a comma-separated list like 1, 2, 3, or * for all.": "对所列 PR 编号授予选定操作权限——以逗号分隔（如 1, 2, 3），输入 * 表示全部。", "Group By": "分组方式", "Guidelines for interacting with GitHub and request permissions from the user when commands fail due to restrictions in the agent environment.": "与 GitHub 交互的指南，当命令因智能体环境限制而失败时向用户请求权限。", "Hide breakdown": "收起明细", "Hide tools": "收起工具", "High": "高", "Hook will only trigger if the tool name matches run_command or view_file.": "仅当工具名称匹配 run_command 或 view_file 时触发钩子。", "Hook will only trigger if the tool name matches run_command.": "仅当工具名称匹配 run_command 时触发钩子。", "Hook will only trigger if the tool name starts with browser_.": "仅当工具名称以 browser_ 开头时触发钩子。", "Hook will trigger if any tool is executed.": "执行任意工具时均触发钩子。", "Hooks": "钩子（Hooks）", "Host": "主机", "Host Environment": "宿主环境", "How loud Antigravity's voice is.": "调节 Antigravity 语音的音量大小。", "How should it start?": "触发方式", "How this feature would help you and other users": "该功能将如何帮助你和其他用户", "How to manage and create plugins — namespaced bundles of skills, agents, rules, MCP servers and hooks that install, enable and disable as a single unit. Use this skill when the user wants to enable, disable, install or uninstall a plugin, when they want to create a new plugin, or when a new customization should be packaged into a plugin rather than left loose. Also triggered by the /plugin slash command. Don't use for the underlying customization system itself — discovery roots, loading priority, or authoring a standalone skill, agent, rule, hook or MCP server outside a plugin; see the customizations guide skill for those.": "管理和创建插件（Plugins）的指南——插件是将技能、智能体、规则、MCP 服务器和钩子打包为统一命名空间的扩展包，可整体安装、启用和禁用。当需要启用/禁用/安装/卸载插件或打包新插件时使用，也可通过 /plugin 命令触发。", "How to render rich interactive HTML widgets inline in the chat or as standalone artifacts. Use this skill when you want to show the user diagrams, data visualizations, interactive controls, educational walkthroughs, or any rich visual content beyond plain text and markdown.": "在对话内嵌或作为独立产物渲染丰富交互式 HTML 组件的指南。适用于展示图表、数据可视化、交互控件、交互式演示以及超出纯文本与 Markdown 的可视化内容。", "How to write and run a dynamic workflow script with the `run_workflow` tool: a Python script that orchestrates many agents with `agent`, `parallel`, `pipeline`, and `phase`. Use when a task splits into many independent or staged pieces of agent work (fan out over files, modules, bugs, or review angles, then aggregate), or when the user asks for a workflow. Don't use for a single delegated task (use a subagent) or for legacy workflow files (see migrate-workflows).": "如何使用 `run_workflow` 工具编写并运行动态工作流脚本：通过 Python 脚本使用 `agent`、`parallel`、`pipeline` 和 `phase` 编排多个智能体。适用于将任务拆分为多个独立或分阶段的子任务并发执行后汇总的场景。", "If you add multiple accounts, MCP servers use the one marked Default.": "如果添加了多个账号，MCP 服务器将使用标记为“默认”的账号。", "Include Jetski Default Customizations": "包含默认自定义项", "Include default customizations, such as default skills.": "包含默认自定义配置（例如内置技能）。", "Inherit Editor": "跟随编辑器", "Inherit Global": "继承全局设置", "Inherits your Global Permissions when working in this project.": "在此项目中工作时继承全局权限设置。", "Initializing...": "正在初始化...", "Inline Actions": "内联快捷操作", "Input device for voice mode and dictation.": "用于语音模式和语音听写的输入设备。", "Install": "安装", "Installed": "已安装", "Installed MCP Servers": "已安装的 MCP 服务器", "Installing": "正在安装", "Installing...": "正在安装...", "Instructions": "执行指令", "Interactive guide to design and create a scheduled background automation. Use this skill when the user wants to create an automated or recurring scheduled task (e.g. \"summarize my emails every morning\", \"every Monday send me a to-do list\"). Also triggered by the /automation slash command.": "设计和创建后台定时自动化任务的交互式指南。当你需要创建自动运行或周期性计划任务（例如“每天早上汇总邮件”、“每周一发送待办列表”）时使用，也可通过 /automation 命令触发。", "Interrupt": "立即中断", "Interrupt the agent and send immediately.": "中断智能体当前操作并立即发送。", "Invalid Media": "无效的媒体文件", "Issue creation": "创建 Issue", "Issues": "议题（Issues）", "It was already sent or couldn't be removed from the queue.": "该消息已发送或无法从队列中移除。", "Join the Google Chat space": "加入 Google Chat 交流空间", "Keep In Menu Bar": "保留在菜单栏", "Keep the app accessible from the menu bar and running in the background when all windows are closed.": "关闭所有窗口后，应用仍在后台运行，可从菜单栏访问。", "Keyboard shortcuts": "键盘快捷键", "Keyboard shortcuts for quick navigation and control.": "用于快速导航和控制的键盘快捷键。", "Kill Terminal": "终止终端", "Labs": "实验室功能", "Last Prompt": "最近提问", "Last Updated": "最近更新", "Last Workspace": "上次使用的工作区", "Last run": "上次运行", "Launching the browser...": "正在启动浏览器...", "Layout Controls": "布局控制", "Learn more": "了解更多", "Learn more about": "进一步了解", "Learn more.": "了解更多。", "Legacy Dark": "经典深色", "Legacy Light": "经典浅色", "Let the agent access past conversations to inform its responses.": "允许智能体参考过往对话记录以提供更准确的回复。", "Let the agent use browser tools to open URLs, read web pages, and interact with browser content. This gives the agent access to important (and often critical) knowledge and methods of validation, but any browser integration does increase exposure to external malicious parties for security exploits.": "允许智能体使用浏览器工具打开网址、读取网页并与页面内容交互。这能让智能体获取关键信息并验证结果，但浏览器集成也会增加潜在的外部安全风险。", "License Required": "需要许可证", "Light": "浅色", "Light Theme": "浅色主题", "Light and precise": "轻快精准", "Links": "链接", "Listening. Ask anything.": "正在聆听，尽管提问。", "Loading MCP servers...": "正在加载 MCP 服务器...", "Loading apps...": "正在加载应用...", "Loading available plugins...": "正在加载可用插件...", "Loading custom agents...": "正在加载自定义智能体...", "Loading customizations...": "正在加载自定义配置...", "Loading events...": "正在加载事件...", "Loading hooks...": "正在加载钩子...", "Loading installed plugins...": "正在加载已安装插件...", "Loading licenses...": "正在加载许可证...", "Loading models...": "正在加载模型...", "Loading plugins...": "正在加载插件...", "Loading resources...": "正在加载资源...", "Loading runs…": "正在加载运行记录…", "Loading token usage...": "正在加载 Token 占用...", "Loading workspace customizations...": "正在加载工作区自定义配置...", "Loading...": "正在加载...", "Local": "本地", "Local Permissions": "本地权限", "Location:": "区域：", "Logs each telemetry event to the browser's DevTools console as it fires, with the click or key that caused it. Stays on across reloads until you turn it off.": "在每个遥测事件触发时将其连同触发点击或按键打印到 DevTools 控制台，重新加载后依然保持开启。", "Low": "低", "MCP Servers": "MCP 服务器", "MCP Servers Disabled": "MCP 服务器已禁用", "MCP Tools": "MCP 工具", "Machine": "运行机器", "Make default": "设为默认", "Manage": "管理", "Manage Antigravity app settings.": "管理 Antigravity 应用设置。", "Manage Hooks": "管理钩子（Hooks）", "Manage License": "管理许可证", "Manage Skills": "管理技能", "Manage and revisit your past agent sessions.": "管理和回顾过往的智能体对话记录。", "Manage fine-grained permissions for GitHub.": "管理 GitHub 的细粒度访问权限。", "Manage project folders and settings.": "管理项目文件夹与设置。", "Manage project folders, agent settings, and permissions.": "管理项目文件夹、智能体设置与权限。", "Manage project resources and settings.": "管理项目资源与设置。", "Manage project resources, agent settings, and permissions.": "管理项目资源、智能体设置与权限。", "Manage workspace folders and settings.": "管理工作区文件夹与设置。", "Manage workspace folders, agent settings, and permissions.": "管理工作区文件夹、智能体设置与权限。", "Manage workspace resources and settings.": "管理工作区资源与设置。", "Manage workspace resources, agent settings, and permissions.": "管理工作区资源、智能体设置与权限。", "Manage your conversations from the companion website.": "从配套网页端管理你的对话。", "Manage your model quota and credits.": "管理模型配额和点数。", "Manage your notification preferences.": "管理你的通知偏好设置。", "Manage your plan, credentials, and general preferences.": "管理你的套餐、凭据和通用偏好设置。", "Managed by Enterprise Gateway": "由企业网关管理", "Manifest Changes": "清单变更", "Manually customize individual settings.": "手动自定义各项设置。", "Mark All as Read": "全部标为已读", "Mark Read": "标为已读", "Mark Unread": "标为未读", "Mark as Read": "标为已读", "Mark as Unread": "标为未读", "Markdown Artifact Width": "Markdown 产物宽度", "Marketing Emails": "营销邮件", "Marketplace": "插件市场", "Max": "最高", "Mcp Tools": "MCP 工具", "Media": "媒体文件", "Medium": "中", "Mentions": "提及 (@)", "Merge Conflict": "合并冲突", "Message subagent, @ to mention": "向子智能体发送消息，输入 @ 引用内容", "Message subagent, @ to mention, / for actions": "向子智能体发送消息，输入 @ 引用内容，输入 / 执行操作", "Microphone": "麦克风", "Model": "模型", "Model Credits": "模型点数", "Model Quota": "模型配额", "Models": "模型", "Models & Usage": "模型与用量", "Modes": "模式", "Modified Files": "已修改文件", "Modify permissions for file and terminal tools.": "修改文件和终端工具的权限。", "Modify permissions for file, terminal, and MCP tools.": "修改文件、终端和 MCP 工具的权限。", "Monday": "周一", "More Actions": "更多操作", "More Plugins": "更多插件", "More actions": "更多操作", "More options": "更多选项", "Move Conversation Down": "下移对话", "Move Conversation Up": "上移对话", "Move to Group": "移至分组", "Move to New Group": "移至新分组", "Multi-select": "多选", "Mute Voice Mic": "静音语音麦克风", "Mute Voice Speaker": "静音语音扬声器", "Mute mic": "静音麦克风", "Name": "名称", "Narrow": "窄", "Navigation": "导航", "Needs attention": "需要处理", "Needs re-auth": "需要重新授权", "Network Access Rules": "网络访问规则", "Network Permissions": "网络权限", "New": "新建", "New Automation": "新建自动化任务", "New Conversation": "新建对话", "New Conversation Button": "新建对话按钮行为", "New Conversation in Project": "在项目中新建对话", "New Conversation in Workspace": "在工作区中新建对话", "New Editor Window": "新建编辑器窗口", "New Group": "新建分组", "New Tab": "新建标签页", "New Terminal": "新建终端", "New Terminal Tab": "新建终端标签页", "New Window": "新建窗口", "New Workspace": "新建工作区", "New automation": "新建自动化任务", "New hook name": "新钩子名称", "New scheduled task": "新建计划任务", "Next": "下一步", "Next Aux Pane Tab": "下一个辅助面板标签页", "Next Pane Tab": "下一个面板标签页", "Next Side Panel Tab": "下一个侧边面板标签页", "Next question": "下一题", "Next run": "下次运行", "Next voice": "下一个音色", "Nickname": "设备昵称", "No Custom Agents or Plugins": "暂无自定义智能体或插件", "No MCP servers installed": "暂未安装 MCP 服务器", "No MCP servers yet. Use Add to browse the store.": "暂无 MCP 服务器。点击“添加”浏览商店。", "No Model Selected": "未选择模型", "No Plugins Available": "暂无可用插件", "No Project": "未选择项目", "No Workspace": "无工作区", "No active terminals": "暂无活动终端", "No archived conversations.": "暂无已归档对话。", "No automations configured.": "尚未配置自动化任务。", "No automations matching your search": "没有匹配搜索条件的自动化任务", "No automations yet": "暂无自动化任务", "No conversations found": "未找到对话", "No conversations yet": "暂无对话", "No conversations yet.": "暂无对话。", "No custom agents yet.": "暂无自定义智能体。", "No customizations match your search.": "没有匹配搜索条件的自定义配置。", "No description available.": "暂无描述。", "No disabled automations": "暂无已禁用的自动化任务", "No enabled automations": "暂无已启用的自动化任务", "No event-driven automations": "暂无事件触发自动化任务", "No events recorded.": "暂无事件记录。", "No file changes": "暂无文件变更", "No folders added yet.": "暂未添加任何文件夹。", "No instructions.": "暂无执行指令。", "No keyboard shortcuts found matching your filter.": "未找到匹配筛选条件的键盘快捷键。", "No license available for this project and location": "该项目和区域下没有可用的许可证", "No links": "暂无链接", "No matching conversations.": "没有匹配的对话。", "No matching flags": "没有匹配的实验开关", "No matching plugins found.": "未找到匹配的插件。", "No matching resources found.": "未找到匹配的资源。", "No matching results": "没有匹配的结果", "No models available": "暂无可用模型", "No pinned conversations": "暂无置顶对话", "No plugins available": "暂无可用插件", "No plugins available in the marketplace.": "插件市场中暂无可用插件。", "No plugins available.": "暂无可用插件。", "No plugins match your search.": "没有匹配搜索条件的插件。", "No project selected or project management not available.": "未选择项目，或项目管理功能不可用。", "No quota information available.": "暂无配额信息。", "No resources added yet.": "暂未添加任何资源。", "No runs yet": "暂无运行记录", "No scheduled automations": "暂无定时自动化任务", "No scheduled tasks configured.": "尚未配置计划任务。", "No scheduled tasks matching your search": "没有匹配搜索条件的计划任务", "No scheduled tasks yet": "暂无计划任务", "No sidecars yet": "暂无扩展服务", "No sign-in needed": "无需登录", "No skills or rules match this filter.": "没有符合筛选条件的技能或规则。", "No skills or rules yet.": "暂无技能或规则。", "No subagents": "暂无子智能体", "No token data available.": "暂无 Token 占用数据。", "No upcoming run.": "暂无即将执行的运行计划。", "No uploads": "暂无上传文件", "Not Signed In": "未登录", "Not configured": "未配置", "Not connected": "未连接", "Not in Project": "未归入项目", "Not set": "未设置", "Notification Settings": "通知设置", "Notifications": "通知", "Number of responses": "生成回复数量", "Off": "关闭", "On a schedule": "定时执行", "One or more, comma-separated": "一个或多个，用逗号分隔", "Only Unread": "仅未读", "Only for": "仅适用于", "Only stored on your machine.": "仅保存在你的本机上。", "Open": "打开", "Open Agent on Reload": "重新加载时打开智能体", "Open Command Palette": "打开命令面板", "Open Commit Graph": "打开提交历史图", "Open Conversation": "打开对话", "Open Conversation History": "打开对话历史", "Open Conversation Picker": "打开对话选择器", "Open Conversation in New Tab": "在新标签页中打开对话", "Open File": "打开文件", "Open File Search": "打开文件搜索", "Open Folder": "打开文件夹", "Open Image in New Tab": "在新标签页中打开图片", "Open Keyboard Shortcuts": "打开键盘快捷键", "Open Link in External Browser": "在外部浏览器中打开链接", "Open Link in New Tab": "在新标签页中打开链接", "Open Links In": "链接默认打开位置", "Open MCP Config": "打开 MCP 配置文件", "Open Settings": "打开设置", "Open System Preferences": "打开系统设置", "Open Workspace": "打开工作区", "Open Workspace Selector": "打开工作区选择器", "Open files in the background if the agent creates or edits them": "当智能体创建或编辑文件时在后台打开它们", "Open in Built-in Browser": "在内置浏览器中打开", "Open in Code Search": "在代码搜索中打开", "Open in External Browser": "在外部浏览器中打开", "Open in New Tab": "在新标签页中打开", "Open in New Window": "在新窗口中打开", "Open in Notebook View": "在 Notebook 视图中打开", "Open in Remote Control": "在远程控制中打开", "Open in Side Panel": "在侧边面板中打开", "Open in external browser": "在外部浏览器中打开", "Open project settings": "打开项目设置", "Open settings menu": "打开设置菜单", "Open the agent panel on window reload": "重新加载窗口时打开智能体面板", "Operating System": "操作系统", "Optimize the interface and terminal output for screen readers.": "针对屏幕阅读器优化界面与终端输出。", "Optional branch or ref used when creating a new Cog workspace (defaults to main if unset).": "创建新 Cog 工作区时使用的可选分支或引用（未设置时默认为 main）。", "Options": "选项", "Organization Allowed Domains (Read-Only)": "组织允许的域名（只读）", "Organization MCP Allowlist (Read-Only)": "组织 MCP 白名单（只读）", "Organizations": "组织", "Other (write your answer)": "其他（请填写你的回答）", "Other Customizations": "其他自定义项", "Other License": "其他许可证", "Outside of folders file access policy": "工作目录外文件访问策略", "Override feature environment": "覆盖功能运行环境", "Overview": "概览", "Paste": "粘贴", "Paste auth code": "粘贴授权码", "Paste code": "粘贴授权码", "Paste the code shown after you sign in.": "粘贴登录完成后显示的授权码。", "Path copied!": "路径已复制！", "Path to the Chrome/Chromium executable. Leave empty for auto-detection.": "Chrome/Chromium 可执行文件的路径，留空则自动检测。", "Paths the agent can modify inside this workspace.": "智能体在此工作区内可修改的路径。", "Paths the agent can modify.": "智能体可以修改的路径。", "Paths the agent can read inside this workspace.": "智能体在此工作区内可读取的路径。", "Paths the agent can read.": "智能体可以读取的路径。", "Pause": "暂停", "Pause automation": "暂停自动化任务", "Paused": "已暂停", "Paused.": "已暂停。", "Paused. Resume it to schedule the next run.": "已暂停。恢复后将安排下次运行。", "Pay As You Go": "按量计费", "Permanently delete": "永久删除", "Permanently delete your remote conversations, projects, scheduled tasks, connected plugins and settings. Data in the desktop app and your Google account are not affected.": "永久删除你的远程对话、项目、计划任务、已连接插件和设置。桌面应用中的数据和你的 Google 账号不受影响。", "Permission Details": "权限详情", "Permission Preset": "权限预设", "Permission Settings": "权限设置", "Permissions": "权限", "Pin": "置顶", "Pin This Conversation": "置顶此对话", "Pin conversation": "置顶对话", "Plan": "订阅套餐", "Plan Review Policy": "计划审核策略", "Play a sound when the agent finishes generating a response.": "当智能体完成回复生成时播放提示音。", "Play a sound when your action is needed or the agent finishes.": "当需要你操作或智能体完成任务时播放提示音。", "Playground": "演练场", "Please describe the feature you'd like to see. The more detailed the requirements, the easier it will be for our team to incorporate your ideas. Some helpful information includes:": "请描述你希望新增的功能。需求描述越详细，团队就越容易评估和采纳你的想法。建议包含以下信息：", "Please describe the issue in detail. The more actionable your feedback, the quicker our team can address your request. Some helpful information includes:": "请详细描述你遇到的问题。反馈越具体，团队就能越快定位并解决。建议包含以下信息：", "Please describe your auth or billing issue. More details will help our support team resolve your issue quicker. Some helpful information includes:": "请描述你的登录验证或计费问题。提供更多细节有助于支持团队更快解决你的问题。建议包含以下信息：", "Please list the steps to reproduce the issue": "请列出复现该问题的具体步骤", "Please provide a more detailed description (at least 10 characters).": "请提供更详细的描述（至少 10 个字符）。", "Please provide more detailed steps to reproduce (at least 5 characters).": "请提供更详细的复现步骤（至少 5 个字符）。", "Plugins": "插件（Plugins）", "Port number for Chrome DevTools Protocol remote debugging. Leave empty for default (9222).": "Chrome DevTools 协议远程调试端口号，留空则使用默认端口（9222）。", "Powered by Gemini Live ·": "由 Gemini Live 提供支持 ·", "Preset": "预设", "Press keys...": "请按下快捷键...", "Prevent Sleep": "防止休眠", "Prevent the computer from sleeping while the app is running.": "应用运行时，防止电脑进入休眠。", "Previous Aux Pane Tab": "上一个辅助面板标签页", "Previous Pane Tab": "上一个面板标签页", "Previous Side Panel Tab": "上一个侧边面板标签页", "Previous question": "上一题", "Previous voice": "上一个音色", "Print telemetry to the console": "在控制台输出遥测事件", "Proceed": "继续执行", "Proceed Decisively": "果断执行", "Proceed Within Sandbox": "在沙盒内自动执行", "Proceed in Sandbox": "在沙盒中自动执行", "Proceed with Plan": "按计划继续执行", "Project": "项目", "Project + Worktree": "项目 + 工作树", "Project 4K": "精简模式（Project 4K）", "Project 4K interface without developer tooling.": "不含开发者工具栏的精简界面。", "Project ID:": "项目 ID：", "Project Name": "项目名称", "Project Required": "需要选择项目", "Project options": "项目选项", "Projects": "项目", "Prompt": "提示词（Prompt）", "Prompt for approval before running browser scripts.": "运行浏览器脚本前提示并请求批准。", "Prompt to run when triggered...": "触发时要执行的提示词...", "Prototype, build & run modern apps that users love with Firebase's backend, AI, and operational infrastructure.": "借助 Firebase 的后端、AI 与运维基础设施，快速构建、运行并迭代深受用户喜爱的现代应用。", "Provide Feedback": "提交反馈", "Provide Google Cloud Project": "提供 Google Cloud 项目", "Provides a comprehensive guide, quick reference, and sitemap for Google Antigravity (AGY), including the Antigravity CLI (agy), Antigravity 2.0, Antigravity IDE, Python SDK, slash commands, keybindings, and customizations (skills, rules, MCP, sidecars). Activate this skill when the user asks questions about how to use, configure, or customize Antigravity, AGY, the agy CLI, the Antigravity IDE, or Antigravity 2.0.": "提供 Google Antigravity（AGY）的完整指南、速查表和文档地图，涵盖 Antigravity CLI（agy）、Antigravity 2.0、Antigravity IDE、Python SDK、斜杠命令、快捷键及自定义项配置。当询问如何使用、配置或定制 Antigravity 时启用此技能。", "Pull request creation": "创建拉取请求", "Pull requests": "拉取请求（PR）", "Queue": "排队等待", "Queue message": "加入发送队列", "Queue until after the current turn.": "排队等待当前轮次结束后发送。", "Queued Messages": "排队消息", "Queued message loaded into editor": "已将排队消息加载到输入框", "Quota": "配额", "Quote Selection": "引用选中内容", "Read Files": "读取文件", "Read URLs": "读取网址", "Read access": "读取权限", "Read access to code, refs, commits, and other repository contents.": "对代码、引用、提交记录及其他仓库内容的读取权限。", "Read, draft, and edit docs.": "读取、起草和编辑文档。", "Read, edit, and export presentations.": "读取、编辑和导出幻灯片演示文稿。", "Read, write, and format spreadsheets.": "读取、编写和设置电子表格格式。", "Receive product updates, tips, and promotions from Google Antigravity via email.": "通过电子邮件接收来自 Google Antigravity 的产品更新、使用技巧和优惠信息。", "Recommended": "推荐", "Reconnect": "重新连接", "Recordings": "录音记录", "Refresh": "刷新", "Refresh MCP servers": "刷新 MCP 服务器", "Refresh all credentials": "刷新全部凭据", "Refresh gcert Credentials": "刷新 gcert 凭据", "Refresh quota and credits data": "刷新配额与点数数据", "Refreshed credentials for all automations.": "已刷新所有自动化任务的凭据。", "Refreshing...": "正在刷新...", "Reject": "拒绝", "Reject Step": "拒绝步骤", "Reload": "重新加载", "Remote": "云端远程", "Remote Agents Data": "远程智能体数据", "Remote Control": "远程控制", "Remote Control Issue": "远程控制问题", "Remote branches": "远程分支", "Remove": "移除", "Remove From Split": "移出分屏", "Remove Shortcut": "移除快捷键", "Remove from Group": "移出分组", "Remove from Split": "移出分屏", "Remove from list": "从列表中移除", "Remove trigger": "移除触发器", "Removing...": "移除中...", "Rename": "重命名", "Rename Group": "重命名分组", "Rename This Conversation": "重命名此对话", "Reopen Closed Tab": "重新打开已关闭的标签页", "Reopen Locally": "在本地重新打开", "Replace With New": "替换为新对话", "Replace the default browser right-click menu with quick actions.": "使用快捷操作菜单替换默认的右键菜单。", "Replace with New": "替换为新对话", "Repositories": "仓库", "Request Review": "请求审核", "Require Review": "需要审核", "Requires manual review for all terminal commands and file accesses outside of the working folders.": "所有终端命令以及工作目录外的文件访问均需人工审核。", "Research subagent with read-only tools for exploring the codebase, searching the web, and reading files. Delegate to this agent when you need to run a task in a separate conversation context but with the same capabilities as the current agent, when a research task requires many search and file-reading steps that would clutter your context, or when you need a broad survey of the codebase or documentation. Prefer doing research yourself for quick, targeted lookups.": "配备只读工具的调研子智能体，用于探索代码库、搜索网页和读取文件。适用于需要大量搜索和读取步骤、避免占用主对话上下文的广泛调研任务。", "Research subagent with read-only tools for exploring the codebase, searching the web, and reading files. Delegate to this agent when you need to run a task in a separate conversation context, when a research task requires many search and file-reading steps that would clutter your context, or when you need a broad survey of the codebase or documentation. Prefer doing research yourself for quick, targeted lookups. This agent runs in a read-only sandbox with no network access.": "配备只读工具的调研子智能体，用于探索代码库、搜索网页和读取文件。适用于需要独立上下文、包含大量搜索和文件读取步骤以免占用主对话上下文，或需要广泛梳理代码库与文档的调研任务；简单定向查找建议直接自行完成。该智能体运行在无网络访问的只读沙盒中。", "Reset": "重置", "Reset All to Defaults": "全部恢复默认", "Reset Zoom": "重置缩放", "Reset all shortcuts to defaults": "将所有快捷键恢复为默认设置", "Reset overrides": "重置覆盖项", "Reset to Default": "恢复默认", "Reset to preset": "重置为预设", "Resources": "资源", "Restart Main Language Server": "重启主语言服务器", "Restart sign-in": "重新开始登录", "Restore": "恢复", "Restore Conversation": "恢复对话", "Restricts agent tools to a secure, isolated local sandbox.": "将智能体工具限制在安全隔离的本地沙盒中运行。", "Resume": "恢复", "Resume automation": "恢复自动化任务", "Retry": "重试", "Reuse your last workspace.": "继续使用上一次的工作区。", "Review": "审查变更", "Review Policy": "审核策略", "Rule": "规则", "Rules": "规则（Rules）", "Rules and customization token budgets exceeded. Large rules are demoted to path pointers and large customizations are excluded from context.": "规则和自定义项 Token 均超出预算上限，体积较大的规则已降级为路径引用，体积较大的自定义项已从上下文中排除。", "Rules token budget exceeded. Large rules are demoted to path pointers.": "规则 Token 超出预算上限，体积较大的规则已降级为路径引用。", "Run Now": "立即运行", "Run a prompt on a schedule, like a morning summary of yesterday's changes. Runs show up here.": "按计划定时运行提示词（例如每天早上汇总昨日变更），运行记录会显示在这里。", "Run all commands without restrictions.": "无限制地运行所有命令。", "Run an agent on a schedule or in response to events.": "按计划时间或响应特定事件运行智能体。", "Run history": "运行记录", "Run in a new git worktree": "在新的 Git 工作树中运行", "Run in a new jj workspace or Fig share": "在新的 jj 工作区或 Fig 共享中运行", "Run in a new worktree": "在新的工作树中运行", "Run in your current workspace": "在当前工作区中运行", "Run now": "立即运行", "Run terminal commands with sandbox restrictions.": "在沙盒限制下运行终端命令。", "Run the app against a Linux environment. Connecting relaunches the app into the selected WSL distro.": "在 Linux 环境中运行应用，连接后将重启并进入所选的 WSL 发行版。", "Run visibility": "运行记录可见性", "Running...": "运行中...", "Runs": "运行记录", "Runs a command": "运行命令", "Runs as": "运行身份", "Runs even when your computer is off. Schedules and events.": "即使电脑关机也能运行。支持定时和事件触发。", "Runs even when your computer is off. Schedules only.": "即使电脑关机也能运行。仅支持定时触发。", "Sandbox Allow Network": "允许沙盒访问网络", "Saturday": "周六", "Save": "保存", "Save Configuration": "保存配置", "Save audio recordings": "保存录音文件", "Saved": "已保存", "Saving...": "保存中...", "Scan the code to open this device in Remote Control, or": "扫码在远程控制中打开此设备，或", "Schedule": "定时规则", "Schedule type": "计划类型", "Scheduled": "定时触发", "Scheduled Tasks": "计划任务", "Scopes:": "权限范围：", "Screen Reader Mode": "屏幕阅读器模式", "Screen Recording": "屏幕录制", "Screenshot must be under 10 MB": "截图大小不能超过 10 MB", "Search": "搜索", "Search Conversations": "搜索对话", "Search MCP servers by name": "按名称搜索 MCP 服务器", "Search automations...": "搜索自动化任务...", "Search conversations with": "请使用左上角的", "Search conversations...": "搜索对话...", "Search customizations...": "搜索自定义配置...", "Search filters…": "搜索筛选条件…", "Search flags": "搜索实验开关", "Search for MCP servers to add to your configuration": "搜索要添加到配置中的 MCP 服务器", "Search shortcuts": "搜索快捷键", "Search tasks...": "搜索任务...", "Search triggers…": "搜索触发器…", "Search, upload, download, and share files.": "搜索、上传、下载和共享文件。", "Searching": "搜索中", "Searching…": "搜索中…", "Security Preset": "安全预设", "Security agent decides if commands run.": "由安全智能体决定是否运行命令。", "See Activity": "查看明细", "See all": "查看全部", "See less": "收起", "See less in Bundles": "收起部分套装", "See less in Plugins": "收起部分插件", "See more": "查看更多", "See more in Bundles": "在套装中查看更多", "See more in Plugins": "在插件中查看更多", "See more results": "查看更多结果", "Select": "选择", "Select All": "全选", "Select Billing Model": "选择计费模式", "Select Environment": "选择运行环境", "Select License": "选择许可证", "Select Model": "选择模型", "Select Next Conversation": "选择下一个对话", "Select Previous Conversation": "选择上一个对话", "Select Project": "选择项目", "Select Workspace": "选择工作区", "Select all": "全选", "Select your license": "选择许可证", "Select...": "请选择...", "Send Immediately": "立即发送", "Send command input?": "是否向命令发送输入？", "Send immediately": "立即发送", "Send message": "发送消息", "Send messages with the keyboard's Enter key instead of starting a new line.": "按键盘 Enter 键直接发送消息，而非换行。", "Sending transcribed message...": "正在发送转写消息...", "Sent!": "已发送！", "Services this plugin connects to on your behalf. Credentials stay on this machine and are only sent to the domains listed.": "此插件代表你连接的外部服务。凭据仅保存在本机，且只会发送至所列域名。", "Set the volume of agent sounds.": "设置智能体提示音的音量。", "Settings": "设置", "Settings for conversations outside of projects.": "未归入项目的对话设置。", "Settings for conversations outside of workspaces.": "未归入工作区的对话设置。", "Setup script failed.": "初始化脚本运行失败。", "Setup script ran successfully.": "初始化脚本运行成功。", "Share": "分享", "Shortcuts": "快捷键", "Show All": "显示全部", "Show Less": "收起", "Show Remote Control QR code": "显示远程控制二维码", "Show Whitespace Changes": "显示空白字符变更", "Show a floating notification card when background conversations need your input. Answer questions, approve commands, and grant permissions without leaving your current conversation. Share feedback at go/inline-actions-feedback.": "当后台对话需要你输入时显示浮动通知卡片，无需离开当前对话即可回答问题、批准命令和授予权限。", "Show all": "显示全部", "Show browser notifications when your action is needed or execution finishes.": "当需要你操作或执行完成时显示通知。", "Show details": "显示详情", "Show how full the context window is next to the send button. Click it for a breakdown and to see your model quota.": "在发送按钮旁显示上下文窗口占用比例，点击可查看占用明细与模型配额。", "Show in folder": "在文件夹中显示", "Show less": "收起", "Show more": "显示更多", "Show system notifications when your action is needed or the agent finishes.": "当需要你操作或智能体完成任务时显示系统通知。", "Side Panel": "侧边面板", "Side Panel Preview": "侧边面板预览", "Sidecar error": "扩展服务错误", "Sidecar feature is not available.": "自动化扩展功能当前不可用。", "Sign In": "登录", "Sign Out": "退出登录", "Sign in": "登录", "Sign in to use Antigravity!": "登录以使用 Antigravity！", "Sign out": "退出登录", "Signed-in accounts": "已登录账号", "Signing Out...": "正在退出...", "Skill": "技能", "Skill Custom Paths": "自定义技能路径", "Skills": "技能（Skills）", "Skills & Rules": "技能与规则", "Skip": "跳过", "Sort By": "排序方式", "Sort Conversations": "对话排序", "Sound": "声音", "Sources": "参考来源", "Specifies the agent's behavior when asking for review on artifacts, which are documents it creates to enable a richer conversation experience.": "设置智能体对其创建的产物（用于丰富对话体验的文档）请求审核的方式。", "Split": "分屏打开", "Split Conversation Horizontally": "水平拆分对话", "Split Conversation Vertically": "垂直拆分对话", "Split Down": "向下分屏", "Split Right": "向右分屏", "Split Terminal": "拆分终端", "Staged Changes": "已暂存的变更", "Staged index changes and working tree changes": "暂存区与工作区的所有变更", "Start Voice Recording": "开始语音输入", "Start Voice mode": "开启语音模式", "Start without a workspace, for general questions.": "在无工作区状态下开始，适合日常通用提问。", "Starting": "正在启动", "Starting terminal…": "正在启动终端…", "Steps": "步骤", "Steps to Reproduce": "复现步骤", "Steps to reproduce the issue": "问题的复现步骤", "Stop": "停止", "Stop Editing": "完成编辑", "Stop Execution": "停止执行", "Stop Voice Recording": "停止语音输入", "Stop execution": "停止执行", "Strict Mode": "严格模式", "Strong": "高对比度", "Subagent that inherits the parent agent's full configuration including tools, system prompt, and model. Use this when you need to run a task in a separate conversation context but with the same capabilities as the current agent.": "继承父智能体全部配置（包括工具、系统提示词和模型）的子智能体。适用于需要在独立对话上下文中执行任务且具备与当前智能体相同能力的场景。", "Subagents": "子智能体", "Submit": "提交", "Submitting...": "提交中...", "Subscription": "订阅制", "Subtitles": "副标题", "Sunday": "周日", "Switch mic": "切换麦克风", "Sync JJ Worktrees to Head": "将 JJ 工作树同步至最新提交（Head）", "Sync newly created JJ worktrees to head when starting a conversation.": "开始新对话时，将新创建的 JJ 工作树同步至最新提交（Head）。", "System": "跟随系统", "System default": "系统默认", "Task": "任务", "Telemetry": "遥测", "Terminal": "终端", "Terminal & Tooling Permissions": "终端与工具权限", "Terminal Command Auto Execution": "终端命令自动执行策略", "Terminal Commands": "终端命令", "Terminal Placement": "终端位置", "Terminal command automatically proceeds if the command runs inside the sandbox. Otherwise, it requests review.": "若终端命令在沙盒内运行则自动执行，否则将请求你审核。", "Terminal commands automatically proceed inside the sandbox. A command that needs to leave the sandbox proceeds only if an agent judges it reversible, and otherwise requests review.": "沙盒内的终端命令会自动执行；需要脱离沙盒的命令仅在智能体判断可逆时自动执行，否则将请求你审核。", "Terminal commands the agent can execute in this workspace.": "智能体在此工作区内可执行的终端命令。", "Terminal commands the agent can execute.": "智能体可以执行的终端命令。", "Terminal: Add to Chat": "终端：添加到对话", "Terminals": "终端", "Terms of Service": "服务条款", "The agent always asks for confirmation before executing terminal commands (except those in the Allow list).": "智能体在执行终端命令前始终请求确认（白名单中的命令除外）。", "The agent always asks for review.": "智能体始终请求审核。", "The agent never asks for confirmation before executing terminal commands (except those in the Deny list). This provides the agent with the maximum ability to operate over long periods without intervention, but also has the highest risk of the agent executing an unsafe terminal command.": "智能体在执行终端命令前从不请求确认（黑名单中的命令除外）。这能让智能体长时间自主运行而无需人工干预，但执行不安全终端命令的风险也最高。", "The agent never asks for review. This maximizes the autonomy of the agent, but also has the highest risk of the agent operating over unsafe or injected artifact content.": "智能体从不请求审核。这可最大化智能体的自主性，但基于不安全或被注入的产物内容继续操作的风险也最高。", "The agent will wait for you to install the browser extension.": "智能体将等待你安装浏览器扩展。", "The agent works with autonomy-enhancing features and does not ask questions or request new permissions.": "智能体将启用自主增强特性运行，期间不会向你提问或请求新权限。", "The breakdown below shows token usage from customizations like rules, skills, and MCP. If a budget is exceeded, large rules are demoted to path pointers and large customizations are excluded automatically.": "下方展示了规则、技能和 MCP 等自定义项的 Token 占用明细。超出预算上限时，体积较大的规则会自动降级为路径引用，体积较大的自定义项会自动从上下文中排除。", "The browser subagent can be invoked by typing /browser in the conversation input box.": "在对话输入框中输入 /browser 可调用浏览器子智能体。", "The browser subagent has been disabled by your administrator. Contact your administrator to enable browser use.": "管理员已禁用浏览器子智能体，请联系管理员以启用浏览器功能。", "The full developer experience.": "完整的开发者体验。", "The voice used in Voice mode. Powered by Gemini Live.": "语音模式使用的音色，由 Gemini Live 提供支持。", "Theme": "主题", "There are no customizations enabled.": "当前未启用任何自定义项。", "These MCP allowlist rules are enforced by your organization's administrator.": "这些 MCP 白名单规则由所在组织的管理员强制执行。", "These allowed domain rules are set by your organization's administrator and cannot be removed.": "这些允许的域名规则由组织管理员设置，无法移除。", "These settings can only be changed on the computer running the app, not from a remote session.": "这些设置只能在运行应用的本机上修改，无法在远程会话中修改。", "Thinking": "思考深度", "This Computer": "此电脑", "This computer": "此电脑", "This conversation grew too large, so the history before this point may be missing or incomplete.": "此对话内容过长，此位置之前的历史记录可能缺失或不完整。", "This page is going away soon": "此页面即将下线", "This permanently deletes all of your Remote Agents conversations, projects, scheduled tasks, connected plugins and settings, and stops any running remote agents. It can't be undone. Data in the desktop app and your Google account are not affected, and you can keep using Remote Agents afterwards.": "这将永久删除你所有的远程智能体对话、项目、计划任务、已连接插件及设置，并停止所有正在运行的远程智能体。此操作无法撤销。桌面应用中的数据和你的 Google 账号不受影响，之后仍可继续使用远程智能体。", "This project overrides your global permission settings.": "此项目已覆盖你的全局权限设置。", "This sidecar failed to start.": "此扩展服务启动失败。", "This will permanently delete": "这将永久删除其中的", "This workspace overrides your global permission settings.": "此工作区已覆盖你的全局权限设置。", "Thought Process": "思考过程", "Thursday": "周四", "Time": "时间", "Time Zone": "时区", "To modify notification settings, open your operating system's system preferences.": "要修改通知设置，请打开操作系统的系统设置。", "Toggle Auxiliary Pane": "切换辅助面板", "Toggle Between Light/Dark Themes": "切换浅色 / 深色主题", "Toggle Editor": "切换编辑器", "Toggle Environment Selector": "切换运行环境选择器", "Toggle File Viewer": "切换文件查看器", "Toggle Maximize Side Panel": "最大化 / 还原侧边面板", "Toggle Model Selector": "切换模型选择器", "Toggle Overview Panel": "切换概览面板", "Toggle Project Selector": "切换项目选择器", "Toggle Side Panel": "切换侧边面板", "Toggle Sidebar": "切换侧边栏", "Toggle Terminal": "切换终端", "Toggle Terminal Panel": "切换终端面板", "Toggle Voice Recording": "切换语音输入", "Toggle this on to allow creating new issues.": "开启后允许创建新的 Issue。", "Toggle this on to allow creating new pull requests.": "开启后允许创建新的拉取请求。", "Toggle this on to enable read access on contents.": "开启后允许读取仓库内容。", "Token Usage": "Token 占用", "Tool Permissions": "工具权限", "Trigger": "触发方式", "Trigger multiple response variants from the same prompt.": "基于同一提示词同时生成多个候选回复。", "Triggers that run an agent on a schedule or when events happen.": "按计划时间或特定事件触发智能体自动运行。", "True changes vs the parent workspace": "相对于父工作区的实际变更", "Try Again": "重试", "Try again": "重试", "Try out early-stage features before they ship. These may be changed or removed at any time. These features are experimental, and we make no guarantees about performance or functionality.": "抢先体验尚未正式发布的早期实验性功能。这些功能随时可能变更或移除，我们不对其性能或稳定性作保证。", "Tuesday": "周二", "Turbo": "极速模式（Turbo）", "Turbo mode": "极速模式（Turbo）", "Turn on a flag you don't have": "输入要开启的实验开关名称", "Type": "输入", "Typing your corp password here may trigger a Password Alert reset.": "在此输入企业密码可能会触发密码安全警报重置。", "URLs the agent can actuate on in this workspace.": "智能体在此工作区内可进行交互操作的网址。", "URLs the agent can actuate on using the browser.": "智能体可以使用浏览器执行操作的网址。", "URLs the agent can read or open in the browser.": "智能体可以在浏览器中读取或打开的网址。", "URLs the agent can read or open in this workspace.": "智能体在此工作区内可读取或打开的网址。", "Unarchive": "取消归档", "Uncommitted": "未提交的变更", "Undo to Here": "撤销到此处", "United States": "美国", "Unmute mic": "取消静音麦克风", "Unpin": "取消置顶", "Unpin This Conversation": "取消置顶此对话", "Unpin conversation": "取消置顶对话", "Untitled": "未命名", "Untitled Conversation": "未命名对话", "Untitled project": "未命名项目", "Untrusted sidecar": "未受信任的扩展服务", "Update": "更新", "Updater": "更新", "Upgrade": "升级", "Upload Debug Bundle": "上传调试包", "Upload Files": "上传文件", "Uploads": "上传文件", "Usage": "用量", "Use": "使用", "Use Add MCP to browse the store, or add a custom server via the MCP config.": "点击“添加 MCP”浏览商店，或通过 MCP 配置文件添加自定义服务器。", "Use Add MCP to browse the store.": "点击“添加 MCP”浏览商店。", "Use Global Settings": "使用全局设置", "Use full Git clones for Best of N": "为 Best of N 使用完整 Git 克隆", "Use full VCS clones for Best of N": "为 Best of N 使用完整 VCS 克隆", "Use the IDE's shell integration to detect and report terminal command execution. When disabled, the agent uses its own shell. Restart the application for this to take effect.": "使用 IDE 的 Shell 集成来检测和报告终端命令执行情况。禁用时，智能体将使用自带 Shell。重启应用后生效。", "Use this form if you cannot connect to Remote Control. If your instance is already connected and you are experiencing issues in the browser, report directly from the Remote Control web page so that relevant logs are included. Some helpful information includes:": "如果无法连接远程控制，请使用此表单反馈。若实例已连接但在浏览器中遇到问题，请直接从远程控制网页端提交反馈以自动附带相关日志。建议包含以下信息：", "Used for:": "用途：", "Useful for tasks that require file access across your full machine. The agent has full read and write access to all local files, but all proposed terminal commands require manual review and approval before running.": "适用于需要跨全盘访问文件的任务。智能体拥有本机所有文件的完整读写权限，但所有终端命令在运行前仍需人工审核批准。", "Useful for typical development with an emphasis on security. It prioritizes safety over speed by requiring manual approval for all terminal commands and files outside the project directory.": "适用于注重安全性的常规开发场景。所有终端命令和项目目录外的文件操作均需人工批准，安全性优先于速度。", "User Type": "用户类型", "Uses your local files and tools. Schedules only.": "使用本机文件与工具。仅支持定时触发。", "VCS used when creating a new workspace, including workspaces generated based off your initial prompt.": "创建新工作区（包括根据初始提示词自动生成的工作区）时使用的版本控制系统。", "Validate": "验证", "Validating setup script…": "正在验证初始化脚本…", "Verbose": "详细", "Verbose Agent Chat": "显示详细执行过程", "Verify that these licenses were provided by your administrator and that you trust the project ID before proceeding. Account activity and data may be logged by your organization.": "继续前请确认这些许可证由你的管理员提供，且你信任该项目 ID。账号活动和数据可能会被所在组织记录。", "Version": "版本", "Version Info": "版本信息", "Vetted (Preview)": "安全审查（预览）", "View Debug": "查看调试信息", "View Diff": "查看差异", "View File": "查看文件", "View Split Diff": "左右分栏对比视图", "View Stacked Diff": "上下对比视图", "View Usage": "查看用量", "View archived in the sidebar": "可在侧边栏的筛选菜单中查看已归档对话", "View plans": "查看订阅方案", "Voice": "语音", "Voice Mode": "语音模式", "Voice mode": "语音模式", "Voice mode in progress": "正在进行语音对话", "Voice transcript": "语音转写记录", "Voice volume": "语音音量", "Voices": "音色列表", "Volume": "音量", "Wait for Idle": "等待空闲", "Waiting for you to finish signing in…": "正在等待你完成登录…", "Warm and approachable": "温和平易", "Warm and engaging": "温暖亲切", "We recommend attaching logs. Attaching logs will help the Antigravity team act on and prioritize your feedback.": "建议附带日志，这有助于 Antigravity 团队更快定位并优先处理你的反馈。", "Wednesday": "周三", "Weekdays (Mon–Fri)": "工作日（周一至周五）", "Weekly Limit Remaining": "本周剩余额度", "What functionality you expect your account tier to have available that is missing": "你认为当前账号等级应当具备但缺失的功能", "What is missing in your workflow": "当前工作流中缺少什么功能", "What quota or feature is being incorrectly limited": "哪些配额或功能被错误限制", "What should it do?": "它应该执行什么任务？", "What should the agent do on each run?": "每次运行时智能体应执行什么操作？", "What should the agent do on each run? For example: summarize new bugs assigned to me and anything that changed overnight.": "每次运行时智能体应执行什么操作？例如：汇总新指派给我的缺陷以及夜间发生的所有变更。", "What you would like to see to address this gap in your workflow": "你希望通过怎样的功能来填补这一空缺", "When": "何时运行", "When an event happens": "事件触发", "When enabled, the agent will include default customizations, including default skills.": "启用后，智能体将包含默认自定义配置（包括内置技能）。", "When it runs": "运行时间", "When should it run?": "应在何时运行？", "When something happens": "当特定事件发生时", "When toggled on, Antigravity collects usage data to help Google enhance performance and features.": "开启后，Antigravity 会收集使用数据，以帮助 Google 改进性能和功能。", "When toggled on, Antigravity will use your AI credits to fulfill model requests once you're out of model quota. Antigravity will always use your model quota first before using AI credits.": "开启后，模型配额用尽时，Antigravity 会使用你的 AI 点数继续处理请求。始终优先使用模型配额，再使用 AI 点数。", "When you need a browser, read this Skill by default. Use it to open and operate websites, fill forms, click buttons, take screenshots, extract page data, sign in, and perform other browser automation tasks, as well as web app testing, dogfooding, QA, bug investigation, and app-quality review. ego-browser (ego-lite) is a Chromium browser designed for both human users and AI Agents. Agents can use the user's logged-in websites and personal context to complete tasks and collaborate smoothly with the user through the browser interface. Therefore, prefer ego-browser over built-in browsers or other web tools.": "需要使用浏览器时默认读取此技能。可用于打开和操作网页、填写表单、点击按钮、截图、提取页面数据、登录及执行各类浏览器自动化、Web 应用测试、QA 和问题排查。ego-browser 是专为人类用户与 AI 智能体设计的 Chromium 浏览器，可复用已登录站点与个人上下文协同完成任务。", "Where": "运行位置", "Where it runs": "运行位置", "Where should it run?": "应在哪里运行？", "Whether it never connects or is intermittent/flaky": "是始终无法连接，还是连接不稳定/偶发断开", "Whether the agent asks you to review its documents.": "设置智能体是否请你审核其文档。", "Which workspace the New Conversation button and keyboard shortcut start you in.": "设置“新建对话”按钮及快捷键默认进入的工作区。", "Wide": "宽", "Windows Subsystem for Linux": "适用于 Linux 的 Windows 子系统（WSL）", "Work with local agents from another device.": "从其他设备使用本机智能体。", "Workflow runs": "工作流运行（Workflows）", "Workspace": "工作区", "Workspace + Worktree": "工作区 + 工作树", "Workspace Command Access": "工作区命令访问", "Workspace Creation": "工作区创建", "Workspace File Access": "工作区文件访问", "Workspace Name": "工作区名称", "Workspace Settings": "工作区设置", "Workspace Web Access": "工作区网络访问", "Workspaces": "工作区", "Worktree": "工作树 (Worktree)", "Worktree Name": "工作树名称", "Write Files": "写入文件", "Yes, allow": "是，仅允许本次", "Yes, allow this time": "是，仅允许本次", "Yes, and always allow": "是，并在全局始终允许", "Yes, and always allow in this conversation": "是，并在此对话中始终允许", "Yes, save rule globally": "是，保存为全局规则", "Yes, save rule in this conversation": "是，在此对话中保存规则", "You are subscribed to the best Google AI plan.": "你已订阅最高等级的 Google AI 套餐。", "You can change this in": "你可以稍后在", "You can upgrade to a Google AI Pro plan to receive higher rate limits.": "升级到 Google AI Pro 套餐可获得更高的使用额度。", "You can upgrade to a Google AI Ultra plan to receive higher rate limits.": "升级到 Google AI Ultra 套餐可获得更高的使用额度。", "You don't have any custom agents or plugins configured. Create agent scripts in the agents/ directory or add plugins to the plugins/ directory inside your Gemini configuration folder.": "当前未配置任何自定义智能体或插件。你可以在 Gemini 配置目录下的 agents/ 目录中创建智能体脚本，或在 plugins/ 目录中添加插件。", "Your Antigravity use will be associated with provided project.": "你的 Antigravity 使用情况将关联至所提供的项目。", "Your Antigravity use will be associated with provided project. Make sure you trust the project ID before proceeding. Account activity and data may be logged by your organization.": "你的 Antigravity 使用情况将关联至所提供的项目。继续前请确认你信任该项目 ID，账号活动和数据可能会被所在组织记录。", "Your Plan:": "当前套餐：", "Your administrator has disabled MCP servers for this workspace.": "管理员已在此工作区禁用 MCP 服务器。", "Your agent’s ability to execute commands is also controlled by enterprise security policies.": "智能体执行命令的能力同时受企业安全策略管控。", "Your changes were not saved. Please try again.": "更改未保存，请重试。", "Your quota for this model is running low.": "该模型的剩余配额较低。", "Zipping": "正在打包压缩", "Zoom In": "放大", "Zoom Out": "缩小", "allow": "允许", "and select": "并选择", "ask": "询问", "at ref": "分支/引用：", "copy link": "复制链接", "deny": "禁止", "e.g., /path/to/file": "例如：/path/to/file", "e.g., curl": "例如：curl", "e.g., https://example.com": "例如：https://example.com", "e.g., npm test": "例如：npm test", "example: source ~/.jetski_shell_setup": "示例：source ~/.jetski_shell_setup", "in the top left.": "搜索对话。", "including": "，包含", "later.": "中更改。", "menu)": "菜单）", "to be installed.": "。", "to be installed. The browser subagent can be invoked by typing /browser in the conversation input box.": "。在对话输入框中输入 /browser 可调用浏览器子智能体。", "to have the agent generate a plan.": "即可让智能体生成计划。", "when working in this project.": "。", "within it.": "。", "⌥⏎ On empty prompt, sends next in queue": "⌥⏎ 输入框为空时，立即发送队列中的下一条", "⌥⏎ Queues after the turn": "⌥⏎ 当前轮次结束后排队发送", "⌥⏎ Sends immediately": "⌥⏎ 立即发送", "⏎ Queues after the turn": "⏎ 当前轮次结束后排队发送", "⏎ Sends immediately": "⏎ 立即发送", "⚠️ Warning: \"Always Proceed\" is enabled without sandbox protection. This is very dangerous and we do not recommend doing this.": "⚠️ 警告：当前已在未开启沙盒保护的情况下启用“始终自动执行”，这非常危险，不建议这样配置。"};
  const VERSION = '0.2.0';
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

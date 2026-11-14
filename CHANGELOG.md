# 更新日志

## [2.32.1.1] - 2026-11-14

### 新增与改进

- 新增 **Antigravity Desktop 2.32.1** 版本适配与 `dist/preload.js`、`dist/main.js`、`dist/tray.js` SHA-256 指纹校验，并在 Apple Silicon Mac 上完成安装、签名、`--replace-stale-backup` 升级、Electron 44.9.1 实机运行、中英文实时切换、重启及完整还原验证。
- 词库由 1,672 条扩充至 **1,848 条**简体中文词条。
- 适配 2.32.1 新版界面：创建项目向导弹窗全流程（`project-folder-selection-step` 本地/云端远程切换、文件夹/资源添加、云端资源挂载说明弹窗 `cloud-resource-disclosure-modal`、设置项目名称与同名/同目录重复项目提示）、分支与工作树选择器（`Work in a New Worktree` / 历史工作树 / 分支搜索与 `· 新工作树` 后缀）、模型选择器胶囊（`新` / `快速` / `提示`）与用量配额子菜单（`本周额度` / `今日额度` / `5 小时额度` / `剩余 %`）、SSH 远程连接弹窗（`ssh-connect-dialog`）、SSH 机器切换器（`ssh-machine-switcher`）与主机状态标签（`ssh-host-label`）、macOS 辅助功能与屏幕录制权限引导卡（`computer-permissions-card`）、对话级权限预设选择器与终端沙盒动态提示（`permissions-selector-trigger` / `permissions-menu` / `permissions-sandbox-hint`）、外部资源选择器（`provider-resource-filter` / `google-drive-connect-view`）、环境初始化脚本验证控件（`setup-script-*`）、侧边栏扩展分组与显示筛选（`plugins-section-header` / `plugins-visibility-trigger`）、多智能体实时画面面板（`[data-agy-agents-pane]`）、内置浏览器地址栏评论草稿胶囊（`webview-url-bar-draft-capsule`）与评论草稿编辑框/卡片（`comment-box` / `comment-card` / 下载进度提示）、侧边面板新建/固定标签页控件、文件树搜索失败提示、模型列表刷新状态及初始引导授权码切换入口。
- 边界保护加固：严格保护创建项目与项目设置中已选本地文件夹/上传文件名称、重复项目提示中的现有项目名、分支选择器中的仓库名与分支名（`branch-repo-label`、`branch-option`、`branch-pill-label`、`branch-pill-trigger`）、内置浏览器评论正文（`comment-card-text`）、SSH 主机名与自定义配置文件名（`ssh-host-project-item`、`ssh-connect-host-option` 首列、`ssh-connect-error` 主机名、`ssh-config-file-name` 自定义文件名）、WSL 发行版名称（`ssh-machine-switcher-wsl-distro`）、GitHub 仓库条目（`project-selector-github-repo-item`、`github-repo-option-*`）、侧边栏扩展项名称（`plugin-sidebar-item`、`plugin-sidebar-mcp-app-item`、`plugins-visibility-option`），以及多智能体实时面板中的窗口标题、智能体名称与光标标签（`[data-agy-chip]`、`[data-agy-pill]`、`[data-agy-window-label]` 等）。

## [2.31.2.1] - 2026-11-12

### 新增与改进

- 新增 **Antigravity Desktop 2.31.2** 版本适配与 `dist/preload.js`、`dist/main.js`、`dist/tray.js` SHA-256 指纹校验。
- 词库由 1,397 条扩充至 **1,672 条**简体中文词条。
- 适配 2.31.2 新版界面：设置中心「浏览器」独立页签与「界面布局 / 对话布局」、项目/运行环境设置导航、协调器（Coordinators）侧边栏与管理弹窗、无折叠按钮权限审批卡（可编辑权限目标、浏览器下载详情与沙盒外运行安全提示）、选中引用与追问（`/btw` / Side Question）控件、内置浏览器下载抽屉/证书拦截页/安全信息弹层、对话遥测状态按钮、文件树筛选与 VCS 状态点、CSV 查看器外围工具栏，以及原生右键菜单 `(Default)` 动态后缀。
- 边界保护与观测加固：保护对话气泡视图（`[data-bubble-side="agent"]`）、进度响应流、追问用户消息、语音转写摘要、下载目录路径与下载文件名按钮（`webview-download-open`）、GCP 项目列表、设备选择器选项、LSP 悬停卡片及 CSV 单元格；修复动态插入受控 `input` / `textarea` 时被 `SKIP` 自匹配拦截导致未触发首轮属性翻译的问题。
- 安装器增强：`doctor` 新增 `stale_backup_version` 检测，`install` 新增显式 `--replace-stale-backup` 参数，支持应用自动更新后安全替换旧版原版备份（失败自动事务回滚）。

## [0.2.0] - 2026-11-11

### 新增与扩展

- 新增 **Antigravity Desktop 2.23.0 / 2.29.1** 版本适配与多文件 SHA-256 校验支持。
- 词库由 92 条扩充至 **1,397 条**简体中文词条。
- 覆盖设置中心全部页面（通用/语音模式、应用、外观、快捷键、通知、模型与用量、对话）、主界面「自动化（Automations）」及「自定义配置（Customizations）」插件市场/已安装页。
- 覆盖对话流权限审批卡片（严格结构校验）、思考折叠头、计划审阅栏，以及右侧面板外围工具栏（终端、Diff、内置浏览器、文件树）。
- 支持 macOS 原生会话右键菜单（通过 `preload.js` 拦截转发，支持语言开关实时切换并保护用户自定义分组名）、原生退出确认弹窗及状态栏托盘菜单汉化。
- 修复多文本子节点拼接（`translateMultiTextElement`）与 JSX 行内元素两侧纯空格分隔节点（`inlineConcat`）的识别边界。
- 新增 21 项 JavaScript DOM 回归测试与 11 项 Python 安装器测试，并配置 GitHub Actions Release 自动打包发布工作流。

## [0.1.1] - 2026-10-11

### 文档修订

- 统一项目名称、章节标题及发布说明的文档格式。
- 整理兼容性、安全说明、下载、安装、验证、中英文切换及原版还原步骤。
- 补充项目结构、问题反馈要求和更新日志。
- 更新分发包中的文档与版本标识。

词库、翻译逻辑、安装和还原流程与 v0.1.0 保持一致。已安装 v0.1.0 的用户无需为本次文档修订重新安装补丁。

## [0.1.0] - 2026-10-11

### 首次发布

- 为 macOS 上的 Antigravity Desktop 2.22.0 提供 92 条简体中文译文。
- 支持主界面中英文切换，重启后默认开启中文。
- 提供版本与文件校验、完整原版备份及还原工具。
- 收录 6 张已遮挡账号的实机截图与 3 张中英文对比图。
- 完成 19 项自动化测试，以及 Apple Silicon Mac 上的安装、切换、重启和完整还原验证。

[2.32.1.1]: https://github.com/zhangsubo/antigravity-zh-cn/releases/tag/v2.32.1.1
[2.31.2.1]: https://github.com/zhangsubo/antigravity-zh-cn/releases/tag/v2.31.2.1
[0.2.0]: https://github.com/zhangsubo/antigravity-zh-cn/releases/tag/v0.2.0
[0.1.1]: https://github.com/zhangsubo/antigravity-zh-cn/releases/tag/v0.1.1
[0.1.0]: https://github.com/zhangsubo/antigravity-zh-cn/releases/tag/v0.1.0

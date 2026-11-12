# 更新日志

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

[2.31.2.1]: https://github.com/zhangsubo/antigravity-zh-cn/releases/tag/v2.31.2.1
[0.2.0]: https://github.com/zhangsubo/antigravity-zh-cn/releases/tag/v0.2.0
[0.1.1]: https://github.com/zhangsubo/antigravity-zh-cn/releases/tag/v0.1.1
[0.1.0]: https://github.com/zhangsubo/antigravity-zh-cn/releases/tag/v0.1.0

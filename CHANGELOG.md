# 更新日志

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

[0.2.0]: https://github.com/zhangsubo/antigravity-zh-cn/releases/tag/v0.2.0
[0.1.1]: https://github.com/zhangsubo/antigravity-zh-cn/releases/tag/v0.1.1
[0.1.0]: https://github.com/zhangsubo/antigravity-zh-cn/releases/tag/v0.1.0

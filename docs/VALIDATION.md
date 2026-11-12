# 验证记录

## 2026-11-12：2.31.2 版本适配与升级备份替换验证

- 完成 Antigravity Desktop 2.31.2 适配，词库扩充至 1,672 条，更新 `tools/compatibility.json` 中 `2.31.2` 的 `dist/preload.js`、`dist/main.js`、`dist/tray.js` SHA-256 指纹与精确补丁规则。
- 适配 2.31.2 界面结构变化：新版无折叠按钮权限审批卡（`permission-target-editor`、`permission-download-details` 与「是，仅允许本次下载」选项）、设置中心「浏览器」独立页签与「界面布局 / 对话布局」、项目/运行环境导航、协调器（Coordinators）侧边栏与弹窗、选中引用与追问（`/btw` / Side Question）控件、对话遥测状态按钮、文件树筛选/VCS 状态点、CSV 表格查看器外围工具栏、内置浏览器下载抽屉/证书拦截页/安全信息弹层，以及原生右键菜单 `(Default)` 动态后缀。
- 边界保护加固：新增保护对话气泡视图（`[data-bubble-side="agent"]`）、进度响应流、追问用户消息、语音转写摘要、浏览器下载目录值、GCP 项目列表、设备选择器选项、网页 `prompt` 文本、下载文件名与打开按钮（`webview-download-open`）、站点域名、LSP 悬停卡片、CSV 表格单元格、协调器子任务卡片与权限下载详情值（`dd`）；修复动态插入受控 `input` / `textarea` 时被 `SKIP` 拦截导致不触发扫描的问题。
- 安装器增强：针对应用自动更新后遗留旧版本 `.zh-cn-original` 备份与状态记录的场景，`doctor` 输出 `stale_backup_version`，`install` 新增显式 `--replace-stale-backup` 参数（仅在旧备份校验通过、版本号不同且当前应用为未打补丁的 Google 签名公证包时事务性替换，失败自动回滚）。
- `npm test`：22 项 JavaScript DOM 测试、12 项 Python 测试全部通过；`npm run build` 构建产物与源码一致。
- 已在本机 `/Applications/Antigravity.app`（2.31.2）完成 `--replace-stale-backup` 升级安装、完整 `restore`、重新安装、`codesign --verify --deep --strict` 签名校验及实机界面核验（含原版 2.29.1 / 2.31.2 `spctl --assess --type execute` 公证校验），`2.31.2` 的 `native_ui_tested` 设为 `true`。

## 2026-11-11：2.29.1 版本适配与方案 C 扩展验证

- 完成 Antigravity Desktop 2.29.1 常规适配与方案 C（P0 + P1 + P2）扩展，词库扩充至 1,397 条。
- 覆盖范围扩展至：设置页（含语音模式、对话设置与快捷键新增项）、主面板独立「自动化（Automations）」与「自定义配置（Customizations）」市场/已安装页、对话流权限审批卡片（严格结构校验）、右侧面板外围工具栏（终端、Diff、内置浏览器、文件树）、Electron 原生右键菜单（通过 `preload.js` 的 `showContextMenu` 拦截转发，支持语言开关实时切换并保护自定义分组名）及原生退出确认弹窗与状态栏托盘（`main.js` / `tray.js` 精确 SHA-256 校验替换）。
- 边界保护加固：问答问题、选项和预览属于内容；权限交互复用问答组件，固定选项分别对应 ONCE、CONVERSATION、GLOBAL。权限卡须同时具备问答头、权限详情控件和专用输入占位文案；缺少标记时保留选项原文。包含动态命令目标的授权选项、插件/技能专名、会话标题及代码/文件路径保留原文。
- 修复多文本子节点拼接（`translateMultiTextElement`）与 JSX 行内元素两侧纯空格分隔节点（`inlineConcat`）的识别边界。
- `npm test`：21 项 JavaScript DOM 测试、11 项 Python 测试全部通过；`npm run build` 构建产物与源码一致。
- 已在本机 `/Applications/Antigravity.app`（2.29.1）完成完整安装、还原、再安装及 `codesign --verify --deep --strict` 校验，实机验证通过，`2.29.1` 的 `native_ui_tested` 设为 `true`。

以下为历史验证记录。

日期：2026-10-11。

## v0.1.1 修订范围

v0.1.1 修订项目文档及版本标识。词库、翻译逻辑、安装和还原流程与 v0.1.0 一致。本次重新运行 8 项 JavaScript 测试、11 项 Python 测试及构建一致性检查；原生应用操作记录与截图采集于 v0.1.0，未重复安装。

## 自动化测试

- 8 项 JavaScript DOM 测试：设置翻译、精确原文恢复、动态文本与节点更新、关闭后保留应用新内容、不翻译外部登录页、不翻译聊天和编辑内容、重复注入保护、词库格式。
- 11 项 Python 测试：ASAR 更新及其他文件保留、损坏与越界拒绝、链接与非内联文件拒绝、只读检查、版本和路径检查、签名失败保留原版、安装和完整还原、更新冲突拒绝覆盖、中断恢复、运行中和确认参数检查。
- Python 安装事务测试使用合成 `.app` 与模拟签名命令；不能据此声称 Apple 已公证补丁。
- 本机原版 Antigravity Desktop 2.22.0 的只读诊断通过，preload SHA-256 与兼容表一致。

- GitHub Actions 的 macOS / Ubuntu 两个平台均通过 19 项测试和构建一致性检查：[运行记录](https://github.com/TeacherXuAI/antigravity-zh-cn/actions/runs/38126500259)。

## 原生应用实测

实机环境：macOS 26.5.2，Apple Silicon，Antigravity Desktop 2.22.0。

- 原版包签名、Apple 公证、ASAR 校验和：通过。
- 首轮只替换外层签名并保留动态库校验：启动失败，系统报告主程序与 Electron 框架 Team ID 不一致。
- 执行完整还原后，原版 ASAR 与代码签名校验：通过；原版已重新启动并进入正常主界面。
- 已增加单独的 `--allow-local-library-loading` 同意参数，明确记录应用级动态库校验例外。缺少参数时停止安装。
- 经本机用户明确同意后，应用级动态库校验例外模式：原生启动成功。
- 四个目标设置页（通用、应用、外观、模型与用量）：已通过原生辅助功能树和界面检查，词库命中的静态文本实际显示中文。
- 外观页代码示例、颜色输入值、模型名称、版本号、账号信息及原有开关状态：保持原样。
- 在主界面关闭汉化：导航恢复英文，重新进入设置页亦为英文。
- 完全退出并重启：主界面恢复中文导航，中文开关默认开启。
- 对带动态库例外的修改版执行完整还原：原始 ASAR 的 SHA-256 完全一致；`codesign --verify --deep --strict` 通过；`spctl --assess --type execute` 返回 `accepted / Notarized Developer ID`；新增动态库例外权限已移除。
- 已再次安装补丁，留存完整原版备份。

## 实机截图

- 新增应用、通用、外观三组原生窗口的「汉化关闭 / 汉化开启」截图，共 6 张单图、3 张对比图。
- 单图仅遮挡账号区域；逐像素核对遮挡外的解码 RGB 值保持一致。截图元数据已移除。
- 截图保留实际英文残留、版本号、原有开关、颜色值和代码示例。
- [完整图集与采集方法](SCREENSHOTS.md)。对照来自同一份修改版的开关状态，不等同于重新安装原版的实验。

## 已知交互限制

- 中英文开关位于主界面，设置弹窗打开时不在其辅助功能焦点范围内；切换时先关闭设置面板。
- 部分长说明、加载状态和图标提示仍为英文，不是全界面翻译。
- 完整原版备份保留相同 Bundle ID。使用 `/Applications/Antigravity.app` 明确启动修改版，不要双击备份；部分按 Bundle ID 查找的软件可能提示有多个副本。

以上为这一台机器、这一版本的实测，不代表其他系统和版本均兼容。

## 未验证范围

Windows、Linux、Intel Mac、其他产品版本、企业受管设备策略、完整对话执行流程、自动更新后的长期行为、全部辅助功能和下拉弹出层。

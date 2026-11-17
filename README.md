# Antigravity 简体中文汉化补丁

> [!IMPORTANT]
> **本项目已停止更新，并归档保存。**
>
> 后续版本、安装指南与问题反馈请前往新项目：**[antigravity-chinese-patch](https://github.com/zhangsubo/antigravity-chinese-patch)**。
>
> 本仓库仅保留历史代码与 Releases，以下内容为停止维护时的文档，不再更新。

[![Release](https://img.shields.io/github/v/release/zhangsubo/antigravity-zh-cn?color=blue)](https://github.com/zhangsubo/antigravity-zh-cn/releases/latest)
[![Tests](https://github.com/zhangsubo/antigravity-zh-cn/actions/workflows/test.yml/badge.svg)](https://github.com/zhangsubo/antigravity-zh-cn/actions/workflows/test.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

适用于 **Google Antigravity（反重力）Desktop** 的简体中文本地化补丁，提供全面界面汉化、中英文实时切换，以及原版应用的备份与还原。

本项目由 **[张小璋 / zhangsubo](https://github.com/zhangsubo)** 开发维护，采用 MIT 许可证开源，为非 Google 官方的社区项目。当前适配 **macOS、Linux 与 Windows 上的 Antigravity Desktop**（macOS 支持 2.22.0 / 2.23.0 / 2.29.1 / 2.31.2 / 2.32.1，Linux 与 Windows 支持 **2.32.1**），已在 Apple Silicon Mac、Linux x86_64 与 Windows 11 x64 设备上完成验证。

**[仓库主页](https://github.com/zhangsubo/antigravity-zh-cn) · [安装指南](#install) · [更新日志](CHANGELOG.md) · [问题反馈](https://github.com/zhangsubo/antigravity-chinese-patch/issues)**

## 功能特性

- **深度界面汉化**：内置 **1,873 条**简体中文词条，覆盖：
  - **设置中心**：账户、通用（含语音模式）、应用、外观、浏览器、界面布局、快捷键、通知、模型与用量、定制化（含插件云端连接与多账号说明）、意见反馈、项目与运行环境（含环境初始化脚本验证）等全部设置页与悬停说明；
  - **主界面与导航**：侧边栏（含协调器与扩展显示筛选）、Linux 顶部菜单栏（`title-menu-bar`：工作区 / 视图 / 窗口、检查更新、命令面板、最小化/最大化/关闭与动态版本号）、创建项目向导弹窗（本地/云端远程切换、文件夹与资源选择、项目命名与重复检测）、项目与分支/工作树选择器（含新建工作树、SSH 远程主机、连接弹窗、机器切换器与 GitHub 仓库入口）、模型选择器与配额浮层（含 `新`/`快速`/`提示` 胶囊及 `本周额度`/`5 小时额度`/`剩余 %`）、主面板「自动化（Automations）」及「自定义配置（Customizations）」插件市场与已安装视图；
  - **对话流与右侧面板**：权限审批卡片（含下载审批详情、可编辑权限目标与 macOS 辅助功能/屏幕录制权限引导卡）、对话级权限预设选择器与沙盒提示、外部资源选择器（Google Drive / GitHub）、选中引用/评论/追问（`/btw`）浮条、追问（Side Question）面板控件、多智能体实时画面面板（Multi-Agent Live Pane）、计划审阅栏、思考折叠头，以及侧边面板标签栏、终端、代码变更（Diff）、内置浏览器（含地址栏评论草稿胶囊、评论草稿编辑框与下载进度）、文件树与 CSV 查看器外围工具栏（含「在文件管理器中显示 / 在访达中显示 / 在文件资源管理器中显示」）；
  - **原生组件（macOS & Linux）**：会话右键菜单（含子菜单与 SSH 远程窗口复用）、原生退出确认弹窗与状态栏托盘菜单。
- **中英文实时切换**：通过主界面右下角的悬浮开关随时启用或关闭汉化，关闭后立即恢复英文原文。
- **严格边界保护**：仅作用于受控界面控件，不翻译聊天正文、代码与 Diff 内容、输入框、命令参数、项目/分支名称、插件/技能专名或账号信息。
- **安装校验与无损还原**：安装前核对应用版本、目标文件 SHA-256 指纹与签名完整性；完整保留原版应用备份与状态记录，随时一键还原。

## 汉化效果

以下为同一版本应用中关闭与开启汉化的实机对比。左侧为英文原文，右侧为中文显示，页面设置值保持一致。

[![应用设置中英文对比](docs/images/application-comparison.png)](docs/images/application-comparison.png)

<details>
<summary>查看中文界面及更多对比</summary>

### 应用设置

![中文应用设置完整窗口](docs/images/application-zh.png)

### 通用设置

![通用设置中英文对比](docs/images/general-comparison.png)

### 外观设置

![外观设置中英文对比](docs/images/appearance-comparison.png)

</details>

截图采集于 2026-10-11，环境为 macOS 26.5.2 / Apple Silicon / Antigravity Desktop 2.22.0。完整窗口仅遮挡账号区域，未重绘或修改界面文字。v0.1.1 沿用 v0.1.0 的翻译范围与界面效果。

[查看完整图集与采集说明](docs/SCREENSHOTS.md) · [查看测试记录](docs/VALIDATION.md)

## 兼容性

| 项目 | 支持情况 |
| --- | --- |
| 版本规则 | 四段式 `x.y.z.n`（如 `2.32.1.3`）：前三段与最新适配的 Antigravity 版本一致，第四段为针对该版本的提交序号 |
| 应用 | Google Antigravity Desktop **2.22.0 / 2.23.0 / 2.29.1 / 2.31.2 / 2.32.1**（Linux 与 Windows 支持 **2.32.1**） |
| 操作系统 | macOS、Linux、Windows |
| 处理器 | Apple Silicon Mac、Linux x86_64、Windows x64 已验证；Intel Mac / Linux arm64 / Windows arm64 尚未实测 |
| 安装环境 | Python **3.9+**，无需 Node.js 或 npm 依赖 |
| Antigravity IDE / VS Code | 不支持 |

安装器同时核对版本号与入口文件指纹。应用版本不受支持时，安装将停止，请勿通过修改版本号或指纹强行安装。

## 安全说明

**安装会修改应用文件，将修改版的外层签名替换为本地 ad-hoc 签名，并放宽这一份应用的动态库签名校验。** 这会降低该应用对所加载动态库的身份校验；修改版不等同于 Google 签名或 Apple 公证的软件，系统策略或后续更新可能阻止其运行。

安装命令中的 `--acknowledge-signature-change` 和 `--allow-local-library-loading` 分别用于确认上述两项变化。安装前请阅读并确认接受这些变化。

原版应用和恢复记录保存在应用旁边：

- `Antigravity.app.zh-cn-original`：完整原版备份。
- `Antigravity.app.zh-cn-state.json`：安装及恢复记录。

请保留这两个文件。若系统阻止修改版运行，应先还原原版。

<details>
<summary>签名与权限详情</summary>

本地签名不包含 Apple Team ID，因此修改版需要 `com.apple.security.cs.disable-library-validation` 权限，以加载原有 Google 框架。安装器不关闭系统 Gatekeeper 或 Hardened Runtime，不删除隔离属性，不修改 Electron 安全开关，也不启用远程调试端口。

安装前会检查原版 Google 签名、macOS 公证、ASAR 完整性及 preload 指纹；遇到已有备份或冲突状态时停止。完整还原会恢复备份中的原始文件和签名。

</details>

补丁不读取账号凭据、不上传对话、不收集遥测，翻译代码不发起网络请求。分发包仅包含本项目源码、词库、文档和截图，不包含 Google 应用或其解包源码。

<a id="install"></a>

## 安装指南

### 1. 获取补丁

请先从 [Google 官网](https://antigravity.google/download) 安装受支持版本的 Antigravity。

通过 Git 克隆本仓库并在终端进入目录：

```bash
git clone https://github.com/zhangsubo/antigravity-zh-cn.git
cd antigravity-zh-cn
```

也可在 [Releases 页面](https://github.com/zhangsubo/antigravity-zh-cn/releases) 下载对应版本的源码压缩包，解压后在终端进入该目录。

### 2. 检查应用状态

```bash
# macOS（默认检查 /Applications/Antigravity.app）或 Linux（自动探测常见安装目录）
python3 tools/patcher.py doctor

# Linux 自定义解压目录示例
python3 tools/patcher.py doctor --app /path/to/Antigravity-x64

# Windows（自动探测 %LOCALAPPDATA%\Programs\Antigravity 等常见安装目录）
python tools/patcher.py doctor

# Windows 自定义安装目录示例
python tools/patcher.py doctor --app "C:\path\to\Antigravity"
```

该命令为只读检查，将显示应用版本、平台类型、汉化状态、备份位置和文件校验值。请在检查通过后继续。

### 3. 安装汉化补丁

- **macOS**：在 Antigravity 中按 `⌘Q` 完全退出应用。确认接受[安全说明](#安全说明)中的签名与权限变化后执行：

  ```bash
  python3 tools/patcher.py install --acknowledge-signature-change --allow-local-library-loading
  ```

- **Linux**：完全退出 Antigravity（确保 `antigravity` 与 `language_server` 进程均已退出）后执行：

  ```bash
  # 自动探测 /opt/Antigravity、/usr/share/antigravity、~/.local/share/antigravity、~/Antigravity-x64 等目录
  python3 tools/patcher.py install

  # 或通过 --app 指定应用根目录（包含 antigravity 可执行文件与 resources/app.asar 的目录）
  python3 tools/patcher.py install --app /path/to/Antigravity-x64
  ```

- **Windows**：完全退出 Antigravity（确保托盘图标、`Antigravity.exe` 与 `language_server.exe` 进程均已退出）后，在 PowerShell 或命令提示符中执行：

  ```powershell
  # 自动探测 %LOCALAPPDATA%\Programs\Antigravity、%LOCALAPPDATA%\Antigravity、%ProgramFiles%\Antigravity 等目录
  python tools/patcher.py install

  # 或通过 --app 指定应用根目录（包含 Antigravity.exe 与 resources\app.asar 的目录）
  python tools/patcher.py install --app "C:\path\to\Antigravity"
  ```

macOS 默认应用路径为 `/Applications/Antigravity.app`；Linux 会按顺序探测 `/opt/Antigravity`、`/opt/antigravity`、`/usr/share/antigravity`、`/usr/lib/antigravity`、`~/.local/share/antigravity`、`~/Antigravity-x64` 及 `PATH` 中的真实应用目录；Windows 会按顺序探测 `%LOCALAPPDATA%\Programs\Antigravity`、`%LOCALAPPDATA%\Antigravity`、`%ProgramFiles%\Antigravity`、`%ProgramFiles(x86)%\Antigravity` 及 `PATH` 中的真实应用目录。若 Antigravity 更新覆盖了之前安装过补丁的应用、导致旧版本备份仍在，`doctor` 会显示 `stale_backup_version`；此时可在安装命令后追加 `--replace-stale-backup`，由安装器在核验旧备份完整后自动替换为新版备份。路径必须指向真实应用目录，不支持符号链接、目录联接（Junction）或越界软链；若目标目录无写入权限（如 Windows 下安装于 `Program Files`），安装器会提示权限不足（Windows 请以管理员身份运行终端）。

### 4. 验证安装结果

重新打开 Antigravity（macOS 为 `/Applications/Antigravity.app`，Windows/Linux 从原快捷方式或应用目录启动），进入设置，确认通用、应用、外观等页面的目标文字显示为中文。请勿双击应用旁边的 `.zh-cn-original` 原版备份。

## 使用说明

1. 关闭设置面板，返回主界面。
2. 点击右下角的 **「中文 · 开」** 关闭汉化，按钮变为 **「中文 · 关」**。
3. 再次点击可重新开启汉化。应用重启后默认开启中文。

模型名称、版本号、额度数值、颜色值及代码示例保留原样。

## 还原指南

完全退出 Antigravity 后，在补丁目录执行：

```bash
# macOS / Linux
python3 tools/patcher.py restore

# Windows
python tools/patcher.py restore
```

工具将校验备份并恢复完整原版应用及其签名。自定义路径的应用需使用与安装时相同的 `--app` 参数。

如果应用在安装补丁后已更新，还原操作会停止，以避免旧版备份覆盖新版。此时应保留备份，从官网重新安装，或通过 Issue 提供具体错误信息。

## 已知限制

- 顶部 macOS 原生菜单、部分长说明、下拉选项和工具提示尚未完整汉化。
- 应用更新可能覆盖补丁；新版本需要重新适配和验证。
- 账号登录、地区资格、模型可用性和额度由 Antigravity 本身决定，汉化补丁不改变这些条件。
- Intel Mac、企业受管设备策略及自动更新后的长期行为尚未完成实机验证。完整范围见[测试记录](docs/VALIDATION.md)。

## 开发与测试

开发环境要求 Node.js **20+**、npm 和 Python **3.9+**。

```bash
npm ci --ignore-scripts
npm test
npm run build
```

| 路径 | 用途 |
| --- | --- |
| `locales/zh-CN.json` | 中英文词库 |
| `src/runtime.js` | 界面定位、文本翻译与原文恢复 |
| `tools/patcher.py` | 应用检查、安装与还原 |
| `tools/compatibility.json` | 支持版本与入口文件指纹 |
| `dist/antigravity-zh-cn.js` | 构建后的运行时代码 |
| `tests/` | DOM、ASAR、安装及还原测试 |

运行时在指定区域使用完整词条匹配；关闭汉化时，仅恢复仍保持本项目译文的文本。安装器在应用副本中追加翻译代码、更新校验和并完成签名校验，然后保存恢复记录、备份原版并替换应用。

修改源码后需重新构建，同步更新 `package.json`、`package-lock.json` 与 `src/runtime.js` 中的四段式版本号（`<Antigravity 版本>.<提交序号>`），并一并提交生成文件。适配新版本时，须重新验证界面、安装、重启、语言切换、还原及原版签名。具体要求见[贡献指南](CONTRIBUTING.md)。

## 更新日志

版本变更记录见 [CHANGELOG.md](CHANGELOG.md) 与 [验证记录](docs/VALIDATION.md)。

## 问题反馈

请通过 [GitHub Issues](https://github.com/zhangsubo/antigravity-chinese-patch/issues) 提交安装问题、翻译修正或功能建议，并提供：

- 操作系统版本（macOS / Linux / Windows）、处理器类型及 Antigravity 版本。
- 补丁版本、操作步骤和完整错误信息。
- 已遮挡个人信息的相关截图。

请勿提交账号凭据、邮箱、登录二维码、私人对话、完整应用文件或个人目录。相同问题优先补充到已有 Issue，便于集中排查。

## 许可证

本项目代码采用 [MIT License](LICENSE)。Google Antigravity 的名称、图标、软件及相关权利归各自权利方所有。本项目为非官方社区维护项目，不代表 Google。

## 致谢

- 本项目基于原仓库 [TeacherXuAI/antigravity-zh-cn](https://github.com/TeacherXuAI/antigravity-zh-cn) 演进开发，感谢原作者提供的早期架构与基础词库支持。
- 感谢 [Linux.do](https://linux.do) 里的各位大佬的帖子，让我搞定 Antigravity 的登录和使用。

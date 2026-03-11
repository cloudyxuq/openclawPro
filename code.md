# OpenClaw 架构与目录结构梳理

OpenClaw 是一个多智能体/多渠道支持的自动化与 AI 助手平台，具备灵活的扩展能力，支持多种平台的接入与交互（如客户端环境、Web 环境、各类通讯软件等）。

下面是该项目核心目录与主要模块功能的梳理：

## 1. 根目录主要结构

- **`apps/`**
  包含了特定平台或端侧的应用程序：
  - `android/`：Android 客户端端应用
  - `ios/`：iOS 客户端端应用
  - `macos/`：macOS 桌面客户端应用（SwiftUI）以及可能相关的 Peekaboo 模块等
  - `web/`：Web 端前端应用

- **`src/`**
  核心的 TypeScript 源代码目录，包含了整个服务端、网关代理、CLI 以及各个通讯渠道的核心实现。

- **`extensions/`**
  第三方插件与扩展渠道的集合。作为独立的 workspace packages，包含各自专属的依赖：
  - 各类扩展渠道（如 `msteams`, `matrix`, `zalo`, `zalouser`, `voice-call`, `bluebubbles` 等）
  - 运行时插件均放在此处，通过提供独立的功能模块接入核心系统。

- **`packages/`**
  内部共享库或通用基础组件，包含一些可以被 `apps/` 或 `src/` 通用的模块，如 SDK 等。

- **`docs/`**
  项目的文档目录（基于 Mintlify），主要包含：
  - Mintlify 部署相关的 markdown 文件
  - 核心渠道说明 (`docs/channels/`)
  - 测试指引、平台相关发布文档等。
  - i18n 国际化翻译文件（如 `zh-CN/`）。

- **`scripts/`**
  各类构建、打包和开发辅助脚本。例如 `package-mac-app.sh` (Mac 打包), `bundle-a2ui.sh` 以及日志相关的工具等。

---

## 2. `src/` 核心代码目录详细说明

`src/` 目录是 OpenClaw 服务端与 CLI 的核心引擎，主要包含了以下模块：

### 2.1 基础设施与公共组件

- **`infra/`**：底层基础设施封装，可能包含数据库操作（如 SQLite）、网络层请求封装、缓存或队列系统等。
- **`core/`**：核心抽象和通用业务逻辑（接口、基类、基础类型定义等）。
- **`routing/`**：核心路由调度层。当接入多个渠道和多模态消息时，统筹和分发消息至正确的处理侧。
- **`terminal/`**：CLI 终端输出与样式控制。例如状态列表、颜色主题和命令行进度条（`src/terminal/palette.ts`, `src/terminal/table.ts`）。

### 2.2 CLI 与命令层

- **`cli/`**：命令行应用 (CLI) 的入口与基础设置（如参数解析框架等）。包含 `src/cli/progress.ts`。
- **`commands/`**：各类具体的命令行操作逻辑，如代理启停 (`openclaw gateway round`)，登录鉴权 (`openclaw login`)等。

### 2.3 Web 提供方与 API

- **`provider-web.ts`**：Web Provider 核心文件，负责管理诸如 Web 界面的渲染接入与状态。
- **`api/`**：提供给外部客户端（Web/iOS/Android/MacOS）或扩展请求调用的内部 API 接口与 HTTP 路由层（如 Express 或 Fastify 服务层）。

### 2.4 各大内置通讯渠道 (Channels)

OpenClaw 核心内置了多种消息和通讯渠道支持，分别存放在对应的目录中：

- **`telegram/`**：Telegram 机器人的接入与消息流处理。
- **`discord/`**：Discord 机器人的接入与处理。
- **`slack/`**：Slack 平台集成。
- **`signal/`**：Signal 安全通讯软件接入。
- **`imessage/`**：Apple iMessage 接入（部分整合在内置与 `extensions/bluebubbles` 中）。
- **`web/`**：WhatsApp Web 等 Web 端聊天通讯接入。
- **`channels/`**：上述渠道的通用抽象接口和基础管理器，负责集成所有的内置端和第三方 `extensions/` 接入。

### 2.5 媒介与端侧交互

- **`media/`**：媒体流水线 (Media Pipeline)，负责多媒体文件（图片、视频、音频）的抓取、转换和处理逻辑。
- **`canvas-host/`**：负责渲染、捕获和承载带有富 UI 的画布环境或者端云结合的渲染引擎支持（如 `a2ui` 渲染）。
- **`desktop/`**：某些特定的桌面端本地系统交互逻辑或者 IPC 通信层（与 MacOS Swift App 配合）。
- **`plugins/`**：存放于核心包内部的插件管理系统（和拓展位于 `extensions/` 中的体系互动）。

---

## 3. 架构理念与规范摘要

- **主副分离架构**：服务端逻辑通过 Node/Bun 执行（源于 `src`），而各大客户端分别独立打包发布（`apps/ios`, `apps/macos`）。两者通过网络/IPC 等方式通信。
- **插件化理念**：所有的第三方集成被鼓励放到 `extensions/` 目录下，并以独立的包 (`npm install --omit=dev`) 来保障相互的不受影响和稳定运行。
- **UI & 渲染边界分离**：桌面应用使用 SwiftUI, Web应用使用前端框架，并在 `src/canvas-host` 以 Host 提供支持。
- **TypeScript & 质量保障**：强制遵守严格类型推断，无 `any` 类型泛滥，配合 Oxlint + Oxfmt 保证代码风格，并且以 Vitest 作为测试框架，保障 `main` 的单测（>70% 覆盖）质量。
- **CLI 原生化体验**：提供 `openclaw` 全局指令和终端进度条（`@clack/prompts`等），以及丰富的后台服务运行方案 `openclaw gateway run`。

这套目录结构和架构允许 OpenClaw 在支持多种大语言模型与 Agent 的同时，具备接入移动端、桌面端应用，以及微信、Telegram、Slack 各种主流通讯渠道并进行一站式响应的能力。

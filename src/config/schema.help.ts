import {
  DISCORD_DEFAULT_INBOUND_WORKER_TIMEOUT_MS,
  DISCORD_DEFAULT_LISTENER_TIMEOUT_MS,
} from "../discord/monitor/timeouts.js";
import { MEDIA_AUDIO_FIELD_HELP } from "./media-audio-field-metadata.js";
import { IRC_FIELD_HELP } from "./schema.irc.js";
import { describeTalkSilenceTimeoutDefaults } from "./talk-defaults.js";

export const FIELD_HELP: Record<string, string> = {
  meta: "由 OpenClaw 自动维护的元数据字段，用于记录此配置文件的写入/版本历史。请保持这些值的系统管理状态，除非在调试迁移历史时，否则请避免手动编辑。",
  "meta.lastTouchedVersion": "当 OpenClaw 写入配置时自动设置。",
  "meta.lastTouchedAt": "上次配置写入的 ISO 时间戳（自动设置）。",
  env: "用于向网关进程提供运行时变量的环境导入和覆盖设置。使用此部分来控制 shell-env 加载和显式变量注入行为。",
  "env.shellEnv":
    "用于在启动期间从您的登录 shell 加载变量的 Shell 环境导入控件。当您依赖于配置文件定义的密钥或 PATH 自定义时，请保持此选项启用。",
  "env.shellEnv.enabled":
    "在启动初始化期间，启用从用户 shell 配置文件加载环境变量。在开发人员计算机上保持启用，或在具有显式环境管理的锁定服务环境中禁用。",
  "env.shellEnv.timeoutMs":
    "在应用回退行为之前，允许 shell 环境解析的最大时间（以毫秒为单位）。使用更严格的超时以加快启动速度，或在 shell 初始化繁重时增加超时。",
  "env.vars":
    "合并到 OpenClaw 运行时进程环境中的显式键/值环境变量覆盖。使用此选项进行确定性环境配置，而不是仅依赖于 shell 配置文件的副作用。",
  wizard:
    "设置向导状态跟踪字段，记录最近一次引导式入门运行的详细信息。保留这些字段以用于可观察性和跨升级的设置流程故障排除。",
  "wizard.lastRunAt":
    "此主机上最近一次完成设置向导的 ISO 时间戳。在支持和运营审核期间，使用此时间戳确认入门的近时性。",
  "wizard.lastRunVersion":
    "在此配置上最近一次向导运行时记录的 OpenClaw 版本。在诊断跨版本入门更改的行为差异时使用此版本。",
  "wizard.lastRunCommit":
    "为开发版本中最后一次向导执行记录的源代码提交标识符。在调试期间，使用此标识符将入门行为与确切的源代码状态相关联。",
  "wizard.lastRunCommand":
    "为最新向导运行记录的命令调用，以保留执行上下文。在验证设置回归时，使用此命令重现入门步骤。",
  "wizard.lastRunMode":
    "为最近一次入门流程记录的向导执行模式，为“local”或“remote”。使用此模式了解设置是针对直接本地运行时还是远程网关拓扑。",
  diagnostics:
    "用于在调试期间进行有针对性的跟踪、遥测导出和缓存检查的诊断控件。在生产中保持基线诊断最小化，仅在调查问题时启用更深入的信号。",
  "diagnostics.otel":
    "用于网关组件发出的跟踪、指标和日志的 OpenTelemetry 导出设置。在与集中式可观察性后端和分布式跟踪管道集成时使用此设置。",
  "diagnostics.cacheTrace":
    "用于在嵌入式运行中观察缓存决策和有效负载上下文的缓存跟踪日志记录设置。在调试期间临时启用此功能，之后禁用以减少敏感日志占用空间。",
  logging:
    "用于严重性、输出目标、格式化和敏感数据编辑的日志记录行为控件。保持级别和编辑足够严格以用于生产，同时保留有用的诊断信息。",
  "logging.level":
    "运行时记录器输出的主要日志级别阈值：“silent”、“fatal”、“error”、“warn”、“info”、“debug”或“trace”。为生产环境保留“info”或“warn”，仅在调查期间使用 debug/trace。",
  "logging.file":
    "除控制台日志记录之外或替代控制台日志记录的持久化日志输出的可选文件路径。使用托管的可写路径，并使保留/轮换与您的操作策略保持一致。",
  "logging.consoleLevel":
    "控制台特定的日志阈值：“silent”、“fatal”、“error”、“warn”、“info”、“debug”或“trace”，用于终端输出控制。如果需要，使用此选项可以使本地控制台更安静，同时保留更丰富的文件日志记录。",
  "logging.consoleStyle":
    "控制台输出格式样式：“pretty”、“compact”或“json”，具体取决于操作员和提取需求。将 json 用于机器解析管道，将 pretty/compact 用于人工优先的终端工作流。",
  "logging.redactSensitive":
    "敏感编辑模式：“off”禁用内置屏蔽，而“tools”编辑敏感的工具/配置有效负载字段。除非您有隔离的安全日志接收器，否则请在共享日志中保留“tools”。",
  "logging.redactPatterns":
    "在发出/存储之前应用于日志输出的其他自定义编辑正则表达式模式。使用此选项可以屏蔽内置编辑规则未涵盖的组织特定的令牌和标识符。",
  cli: "用于本地命令输出行为（例如横幅和标语样式）的 CLI 表示控件。使用此部分可以使启动输出与操作员偏好保持一致，而无需更改运行时行为。",
  "cli.banner":
    "用于标题/版本行和标语样式行为的 CLI 启动横幅控件。保持横幅启用以进行快速版本/上下文检查，然后根据您的首选噪音级别调整标语模式。",
  "cli.banner.taglineMode":
    "控制 CLI 启动横幅中的标语样式：“random”（默认）从轮换标语池中选择，“default”始终显示中性默认标语，“off”隐藏标语文本，同时保留横幅版本行。",
  update:
    "用于保持 OpenClaw 运行时版本最新的更新通道和启动检查行为。在生产中使用保守通道，仅在受控环境中使用更多实验性通道。",
  "update.channel": "用于 git + npm 安装的更新通道（“stable”、“beta”或“dev”）。",
  "update.checkOnStart": "网关启动时检查 npm 更新（默认值：true）。",
  "update.auto.enabled": "为软件包安装启用后台自动更新（默认值：false）。",
  "update.auto.stableDelayHours": "稳定通道自动应用开始前的最小延迟（默认值：6）。",
  "update.auto.stableJitterHours": "以小时为单位的额外稳定通道推出扩展窗口（默认值：12）。",
  "update.auto.betaCheckIntervalHours": "beta 通道检查的运行频率（以小时为单位）（默认值：1）。",
  gateway:
    "用于绑定模式、身份验证、控制 UI、远程传输和操作安全控制的网关运行时界面。除非您有意将网关暴露在受信任的本地接口之外，否则请保持保守的默认值。",
  "gateway.port":
    "网关侦听器用于 API、控制 UI 和面向通道的入口路径的 TCP 端口。使用专用端口，避免与反向代理或本地开发人员服务冲突。",
  "gateway.mode":
    "网关操作模式：“local”在此主机上运行通道和代理运行时，而“remote”通过远程传输连接。除非您有意运行拆分的远程网关拓扑，否则请保持“local”。",
  "gateway.bind":
    "网络绑定配置文件：“auto”、“lan”、“loopback”、“custom”或“tailnet”以控制接口暴露。除非外部客户端必须连接，否则请为最安全的本地操作保留“loopback”或“auto”。",
  "gateway.customBindHost":
    "当 gateway.bind 设置为 custom 以进行手动接口定位时使用的显式绑定主机/IP。使用精确地址，除非需要外部暴露，否则请避免使用通配符绑定。",
  "gateway.controlUi":
    "控制 UI 托管设置，包括启用、路径和浏览器源/身份验证强化行为。在面向 Internet 的部署之前，请将 UI 暴露保持在最低限度，并与强大的身份验证控件配对。",
  "gateway.controlUi.enabled":
    "当为 true 时，启用从网关 HTTP 进程提供网关控制 UI。为本地管理保持启用，当外部控制界面替换它时禁用。",
  "gateway.auth":
    "网关 HTTP/WebSocket 访问的身份验证策略，包括模式、凭据、受信任的代理行为和速率限制。为每个非环回部署保持身份验证启用。",
  "gateway.auth.mode":
    "网关身份验证模式：“none”、“token”、“password”或“trusted-proxy”，具体取决于您的边缘体系结构。将 token/password 用于直接暴露，仅在强化的身份感知代理后面使用 trusted-proxy。",
  "gateway.auth.allowTailscale":
    "配置后，允许受信任的 Tailscale 身份路径满足网关身份验证检查。仅当您的 tailnet 身份状态很强并且操作员工作流依赖于它时才使用此选项。",
  "gateway.auth.rateLimit":
    "登录/身份验证尝试限制控件，以降低网关边界的凭据暴力破解风险。在暴露的环境中保持启用，并根据您的流量基线调整阈值。",
  "gateway.auth.trustedProxy":
    "用于注入用户声明的上游身份提供程序的受信任代理身份验证标头映射。仅与已知的代理 CIDR 和严格的标头允许列表一起使用，以防止欺骗身份标头。",
  "gateway.trustedProxies":
    "允许提供转发的客户端身份标头的上游代理的 CIDR/IP 允许列表。保持此列表狭窄，以便不受信任的跃点无法模拟用户。",
  "gateway.allowRealIpFallback":
    "当代理方案中缺少 x-forwarded-for 时，启用 x-real-ip 回退。除非您的入口堆栈需要此兼容性行为，否则请保持禁用。",
  "gateway.tools":
    "网关级工具暴露允许/拒绝策略，可以独立于代理/工具配置文件限制运行时工具的可用性。将其用于粗略的紧急控制和生产强化。",
  "gateway.tools.allow":
    "当您希望在运行时使用一组狭窄的工具时，显式的网关级工具允许列表。将其用于必须严格控制工具范围的锁定环境。",
  "gateway.tools.deny":
    "显式的网关级工具拒绝列表，即使较低级别的策略允许它们，也会阻止列出的工具。将拒绝规则用于紧急响应和深度防御强化。",
  "gateway.channelHealthCheckMinutes":
    "自动通道健康探测和状态更新的间隔（以分钟为单位）。使用较低的间隔以加快检测速度，或使用较高的间隔以减少定期的探测噪音。",
  "gateway.tailscale":
    "用于在网关启动/退出时提供/漏斗暴露和生命周期处理的 Tailscale 集成设置。除非您的部署有意依赖于 Tailscale 入口，否则请关闭。",
  "gateway.tailscale.mode":
    "Tailscale 发布模式：“off”、“serve”或“funnel”，用于私有或公共暴露路径。将“serve”用于仅限 tailnet 的访问，仅当需要公共互联网可达性时才使用“funnel”。",
  "gateway.tailscale.resetOnExit":
    "在网关退出时重置 Tailscale Serve/Funnel 状态，以避免关闭后出现过时的已发布路由。除非另一个控制器在网关外部管理发布生命周期，否则请保持启用。",
  "gateway.remote":
    "当此实例代理到另一个运行时主机时，用于直接或 SSH 传输的远程网关连接设置。仅当有意配置拆分主机操作时才使用远程模式。",
  "gateway.remote.transport":
    "远程连接传输：“direct”使用配置的 URL 连接，而“ssh”通过 SSH 隧道。当您需要加密的隧道语义而无需暴露远程端口时，请使用 SSH。",
  "gateway.reload":
    "用于如何应用编辑以及何时触发完全重新启动的实时配置重载策略。为最安全的操作更新保留混合行为，除非调试重载内部。",
  "gateway.tls":
    "用于直接在网关进程中终止 HTTPS 的 TLS 证书和密钥设置。在生产中使用显式证书，并避免在不受信任的网络上暴露明文。",
  "gateway.tls.enabled":
    "在网关侦听器处启用 TLS 终止，以便客户端直接通过 HTTPS/WSS 连接。为直接的互联网暴露或任何不受信任的网络边界保持启用。",
  "gateway.tls.autoGenerate":
    "当未配置显式文件时，自动生成本地 TLS 证书/密钥对。仅用于本地/开发设置，并替换为用于生产流量的真实证书。",
  "gateway.tls.certPath":
    "启用 TLS 时网关使用的 TLS 证书文件的文件系统路径。使用托管的证书路径，并使续订自动化与此位置保持一致。",
  "gateway.tls.keyPath":
    "启用 TLS 时网关使用的 TLS 私钥文件的文件系统路径。保持此密钥文件权限受限，并根据您的安全策略进行轮换。",
  "gateway.tls.caPath":
    "用于在网关边缘进行客户端验证或自定义信任链要求的可选 CA 捆绑包路径。当私有 PKI 或自定义证书链是部署的一部分时使用此选项。",
  "gateway.http":
    "网关 HTTP API 配置分组端点切换和面向传输的 API 暴露控件。仅保持启用的所需端点以减少攻击面。",
  "gateway.http.endpoints":
    "用于兼容性路由和可选集成的网关 API 界面下的 HTTP 端点功能切换。有意启用端点，并在推出后监控访问模式。",
  "gateway.http.securityHeaders":
    "由网关进程本身应用的可选 HTTP 响应安全标头。当 TLS 在您的反向代理处终止时，首选在此处设置这些标头。",
  "gateway.http.securityHeaders.strictTransportSecurity":
    "Strict-Transport-Security 响应标头的值。仅在您完全控制的 HTTPS 源上设置；使用 false 显式禁用。",
  "gateway.remote.url": "远程网关 WebSocket URL（ws:// 或 wss://）。",
  "gateway.remote.token":
    "在令牌身份验证部署中，用于向远程网关验证此客户端的持有者令牌。通过密钥/环境替换进行存储，并与远程网关身份验证更改一起轮换。",
  "gateway.remote.password":
    "启用密码模式时用于远程网关身份验证的密码凭据。将此密钥在外部管理，并避免在提交的配置中使用明文值。",
  "gateway.remote.tlsFingerprint": "远程网关的预期 sha256 TLS 指纹（固定以避免中间人攻击）。",
  "gateway.remote.sshTarget":
    "通过 SSH 的远程网关（将网关端口隧道传输到 localhost）。格式：user@host 或 user@host:port。",
  "gateway.remote.sshIdentity": "可选的 SSH 身份文件路径（传递给 ssh -i）。",
  "talk.provider": "活动的 Talk 提供商 ID（例如“elevenlabs”）。",
  "talk.providers":
    "按提供商 ID 键入的特定于提供商的 Talk 设置。在迁移期间，首选此选项而不是旧版 talk.* 键。",
  "talk.providers.*.voiceId": "用于 Talk 模式的提供商默认语音 ID。",
  "talk.providers.*.voiceAliases": "用于 Talk 指令的可选提供商语音别名映射。",
  "talk.providers.*.modelId": "用于 Talk 模式的提供商默认模型 ID。",
  "talk.providers.*.outputFormat": "用于 Talk 模式的提供商默认输出格式。",
  "talk.providers.*.apiKey": "用于 Talk 模式的提供商 API 密钥。", // pragma: allowlist secret
  "talk.voiceId":
    "用于 Talk 模式的旧版 ElevenLabs 默认语音 ID。首选 talk.providers.elevenlabs.voiceId。",
  "talk.voiceAliases":
    "仅在迁移期间使用此旧版 ElevenLabs 语音别名映射（例如 {“Clawd”：“EXAVITQu4vr4xnSDxMaL”}）。首选 talk.providers.elevenlabs.voiceAliases。",
  "talk.modelId":
    "用于 Talk 模式的旧版 ElevenLabs 模型 ID（默认值：eleven_v3）。首选 talk.providers.elevenlabs.modelId。",
  "talk.outputFormat":
    "仅在迁移期间使用此旧版 ElevenLabs 输出格式（例如 pcm_44100 或 mp3_44100_128）。首选 talk.providers.elevenlabs.outputFormat。",
  "talk.apiKey":
    "仅在迁移期间使用此旧版 ElevenLabs API 密钥，并将密钥保留在 env 支持的存储中。首选 talk.providers.elevenlabs.apiKey（回退：ELEVENLABS_API_KEY）。",
  "talk.interruptOnSpeech":
    "如果为 true（默认值），则当用户在 Talk 模式下开始讲话时停止助手讲话。为会话轮流保持启用。",
  "talk.silenceTimeoutMs": `用户静默的毫秒数，然后 Talk 模式完成并发送当前转录。保留未设置以保留平台默认暂停窗口 (${describeTalkSilenceTimeoutDefaults()})。`,
  acp: "用于启用调度、选择后端、约束允许的代理目标以及调整流式回合投影行为的 ACP 运行时控件。",
  "acp.enabled": "全局 ACP 功能门。除非配置了 ACP 运行时 + 策略，否则请保持禁用。",
  "acp.dispatch.enabled":
    "用于 ACP 会话回合的独立调度门（默认值：true）。设置为 false 以在阻止 ACP 回合执行的同时保持 ACP 命令可用。",
  "acp.backend": "默认 ACP 运行时后端 ID（例如：acpx）。必须与注册的 ACP 运行时插件后端匹配。",
  "acp.defaultAgent": "当 ACP 生成未指定显式目标时使用的回退 ACP 目标代理 ID。",
  "acp.allowedAgents":
    "允许用于 ACP 运行时会话的 ACP 目标代理 ID 的允许列表。空表示没有其他允许列表限制。",
  "acp.maxConcurrentSessions": "此网关进程中的最大并发活动 ACP 会话数。",
  "acp.stream": "用于块大小、元数据可见性和重复数据删除交付行为的 ACP 流投影控件。",
  "acp.stream.coalesceIdleMs":
    "在发出块回复之前，用于 ACP 流文本的合并器空闲刷新窗口（以毫秒为单位）。",
  "acp.stream.maxChunkChars": "在拆分为多个块回复之前，用于 ACP 流块投影的最大块大小。",
  "acp.stream.repeatSuppression":
    "当为 true（默认值）时，在回合中抑制重复的 ACP 状态/工具投影行，同时保持原始 ACP 事件不变。",
  "acp.stream.deliveryMode":
    "ACP 交付样式：实时流式传输增量投影输出，final_only 缓冲所有投影的 ACP 输出，直到终端回合事件。",
  "acp.stream.hiddenBoundarySeparator":
    "当发生隐藏的 ACP 工具生命周期事件时，在下一个可见的助手文本之前插入的分隔符（none|space|newline|paragraph）。默认值：paragraph。",
  "acp.stream.maxOutputChars": "在发出截断通知之前，每个 ACP 回合投影的最大助手输出字符数。",
  "acp.stream.maxSessionUpdateChars": "用于投影的 ACP 会话/更新行（工具/状态更新）的最大字符数。",
  "acp.stream.tagVisibility":
    "用于 ACP 投影的每个会话更新的可见性覆盖（例如 usage_update、available_commands_update）。",
  "acp.runtime.ttlMinutes":
    "在符合条件的清理之前，ACP 会话工作程序的空闲运行时 TTL（以分钟为单位）。",
  "acp.runtime.installCommand":
    "当缺少 ACP 后端布线时，由 `/acp install` 和 `/acp doctor` 显示的可选操作员安装/设置命令。",
  "agents.list.*.skills": "此代理的可选技能允许列表（省略 = 所有技能；空 = 没有技能）。",
  "agents.list[].skills": "此代理的可选技能允许列表（省略 = 所有技能；空 = 没有技能）。",
  agents:
    "代理运行时配置根，涵盖用于路由和执行上下文的默认值和显式代理条目。保持此部分显式，以便在多代理工作流中模型/工具行为保持可预测。",
  "agents.defaults":
    "由代理继承的共享默认设置，除非在 agents.list 中的每个条目中被覆盖。使用默认值来强制执行一致的基线行为并减少重复的每个代理配置。",
  "agents.list":
    "具有 ID 和模型、工具、身份和工作区的可选覆盖的已配置代理的显式列表。随着时间的推移保持 ID 稳定，以便绑定、批准和会话路由保持确定性。",
  "agents.list[].runtime":
    "此代理的可选运行时描述符。将 embedded 用于默认 OpenClaw 执行或 acp 用于外部 ACP 工具默认值。",
  "agents.list[].runtime.type":
    "此代理的运行时类型：“embedded”（默认 OpenClaw 运行时）或“acp”（ACP 工具默认值）。",
  "agents.list[].runtime.acp":
    "当 runtime.type=acp 时，此代理的 ACP 运行时默认值。每个对话的绑定级 ACP 覆盖仍然优先。",
  "agents.list[].runtime.acp.agent":
    "用于此 OpenClaw 代理的可选 ACP 工具代理 ID（例如 codex、claude）。",
  "agents.list[].runtime.acp.backend":
    "此代理的 ACP 会话的可选 ACP 后端覆盖（回退到全局 acp.backend）。",
  "agents.list[].runtime.acp.mode": "此代理的可选 ACP 会话模式默认值（持久或一次性）。",
  "agents.list[].runtime.acp.cwd": "此代理的 ACP 会话的可选默认工作目录。",
  "agents.list[].identity.avatar": "头像图像路径（仅相对于代理工作区）或远程 URL/数据 URL。",
  "agents.defaults.heartbeat.suppressToolErrorWarnings": "在心跳运行期间抑制工具错误警告有效负载。",
  "agents.list[].heartbeat.suppressToolErrorWarnings": "在心跳运行期间抑制工具错误警告有效负载。",
  browser:
    "用于本地或远程 CDP 附加、配置文件路由和屏幕截图/快照行为的浏览器运行时控件。除非您的自动化工作流需要自定义浏览器传输设置，否则请保留默认值。",
  "browser.enabled":
    "在网关中启用浏览器功能布线，以便浏览器工具和 CDP 驱动的工作流可以运行。当不需要浏览器自动化时禁用，以减少表面积和启动工作。",
  "browser.cdpUrl":
    "用于附加到外部管理的浏览器实例的远程 CDP websocket URL。将其用于集中式浏览器主机，并将 URL 访问限制在受信任的网络路径。",
  "browser.color":
    "用于显示彩色身份提示的浏览器配置文件/UI 提示的默认强调色。使用一致的颜色可以帮助操作员快速识别活动的浏览器配置文件上下文。",
  "browser.executablePath":
    "当自动发现不足以满足您的主机环境时，显式的浏览器可执行文件路径。使用绝对稳定的路径，以便启动行为在重新启动后保持确定性。",
  "browser.headless":
    "当本地启动器启动浏览器实例时，强制浏览器以无头模式启动。为服务器环境保持无头启用，仅在需要可见的 UI 调试时禁用。",
  "browser.noSandbox":
    "为在运行时沙盒化失败的环境禁用 Chromium 沙盒隔离标志。尽可能保持此选项关闭，因为进程隔离保护会降低。",
  "browser.attachOnly":
    "将浏览器模式限制为仅附加行为，而不启动本地浏览器进程。当所有浏览器会话都由远程 CDP 提供商在外部管理时使用此选项。",
  "browser.cdpPortRangeStart":
    "用于自动分配的浏览器配置文件端口的起始本地 CDP 端口。当主机级端口默认值与其他本地服务冲突时增加此值。",
  "browser.defaultProfile":
    "当调用者未明确选择配置文件时选择的默认浏览器配置文件名称。使用稳定的低权限配置文件作为默认值，以减少意外的跨上下文状态使用。",
  "browser.relayBindHost":
    "Chrome 扩展中继侦听器的绑定 IP 地址。保留未设置为仅环回访问，或仅当中继必须在网络命名空间（例如 WSL2）之间可访问并且周围网络已受信任时，才设置显式的非环回 IP（例如 0.0.0.0）。",
  "browser.profiles":
    "用于通过可选元数据显式路由到 CDP 端口或 URL 的命名浏览器配置文件连接映射。保持配置文件名称一致，并避免重叠的端点定义。",
  "browser.profiles.*.cdpPort":
    "当通过端口而不是 URL 连接到浏览器实例时，每个配置文件的本地 CDP 端口。每个配置文件使用唯一的端口以避免连接冲突。",
  "browser.profiles.*.cdpUrl":
    "用于按配置文件名称进行显式远程浏览器路由的每个配置文件的 CDP websocket URL。当配置文件连接在远程主机或隧道上终止时使用此选项。",
  "browser.profiles.*.driver":
    "每个配置文件的浏览器驱动程序模式：“openclaw”（或旧版“clawd”）或“extension”，具体取决于连接/运行时策略。使用与您的浏览器控制堆栈匹配的驱动程序以避免协议不匹配。",
  "browser.profiles.*.attachOnly":
    "每个配置文件的仅附加覆盖，跳过本地浏览器启动，仅附加到现有的 CDP 端点。当一个配置文件由外部管理但其他配置文件在本地启动时很有用。",
  "browser.profiles.*.color":
    "用于在仪表板和与浏览器相关的 UI 提示中进行视觉区分的每个配置文件的强调色。使用不同的颜色可以帮助操作员高信号识别活动配置文件。",
  "browser.evaluateEnabled":
    "在支持的情况下，为运行时脚本评估功能启用浏览器端评估帮助程序。除非您的工作流需要快照/导航之外的评估语义，否则请保持禁用。",
  "browser.snapshotDefaults":
    "当调用者未提供显式快照选项时使用的默认快照捕获配置。调整此项以在通道和自动化路径之间实现一致的捕获行为。",
  "browser.snapshotDefaults.mode":
    "控制页面内容如何转换为代理使用的默认快照提取模式。选择能够平衡工作流的可读性、保真度和令牌占用空间的模式。",
  "browser.ssrfPolicy":
    "用于可能访问内部主机的浏览器/网络获取路径的服务器端请求伪造护栏设置。在生产中保持限制性默认值，仅打开明确批准的目标。",
  "browser.ssrfPolicy.allowPrivateNetwork":
    "browser.ssrfPolicy.dangerouslyAllowPrivateNetwork 的旧版别名。首选危险命名的密钥，以便风险意图明确。",
  "browser.ssrfPolicy.dangerouslyAllowPrivateNetwork":
    "允许从浏览器工具访问专用网络地址范围。默认情况下为受信任的网络操作员设置启用；禁用以强制执行严格的仅公共解析检查。",
  "browser.ssrfPolicy.allowedHostnames":
    "浏览器/网络请求的 SSRF 策略检查的显式主机名允许列表例外。保持此列表最小化，并定期审查条目以避免过时的广泛访问。",
  "browser.ssrfPolicy.hostnameAllowlist":
    "SSRF 策略使用者用于显式主机例外的旧版/备用主机名允许列表字段。使用稳定的确切主机名，并避免使用类似通配符的广泛模式。",
  "browser.remoteCdpTimeoutMs":
    "在浏览器附加尝试失败之前，连接到远程 CDP 端点的超时时间（以毫秒为单位）。对于高延迟隧道增加此值，或对于更快的故障检测降低此值。",
  "browser.remoteCdpHandshakeTimeoutMs":
    "针对远程浏览器目标的连接后 CDP 握手就绪性检查的超时时间（以毫秒为单位）。对于启动缓慢的远程浏览器提高此值，并在自动化循环中快速失败时降低此值。",
  "discovery.mdns.mode":
    "mDNS 广播模式（“minimal”默认，“full”包括 cliPath/sshPort，“off”禁用 mDNS）。",
  discovery:
    "用于本地 mDNS 广告和可选广域存在信令的服务发现设置。将发现范围限定在预期的网络，以避免泄漏服务元数据。",
  "discovery.wideArea":
    "用于将发现信号暴露到本地链接范围之外的广域发现配置组。仅在有意在站点之间聚合网关存在的部署中启用。",
  "discovery.wideArea.enabled":
    "当您的环境需要非本地网关发现时，启用广域发现信令。除非操作上需要跨网络发现，否则请保持禁用。",
  "discovery.mdns":
    "用于本地网络广告和发现行为调整的 mDNS 发现配置组。为常规 LAN 发现保持最小模式，除非需要额外的元数据。",
  tools:
    "跨 Web、执行、媒体、消息和提升的表面的全局工具访问策略和功能配置。在广泛推出之前，使用此部分来约束有风险的功能。",
  "tools.allow":
    "绝对工具允许列表，用于替换严格环境的配置文件派生默认值。仅当您有意运行一组严格策划的工具功能时才使用此选项。",
  "tools.deny":
    "全局工具拒绝列表，即使配置文件或提供商规则允许，也会阻止列出的工具。将拒绝规则用于紧急锁定和长期深度防御。",
  "tools.web":
    "用于搜索/获取提供商、限制和回退行为调整的 Web 工具策略分组。保持启用的设置与 API 密钥可用性和出站网络策略保持一致。",
  "tools.exec":
    "用于 shell 执行主机、安全模式、批准行为和运行时绑定的执行工具策略分组。在生产中保持保守的默认值，并收紧提升的执行路径。",
  "tools.exec.host":
    "选择 shell 命令的执行主机策略，通常控制本地与委托的执行环境。使用最安全的主机模式，同时仍满足您的自动化要求。",
  "tools.exec.security":
    "控制命令执行的沙盒/批准期望的执行安全状况选择器。为不受信任的提示保持严格的安全模式，仅为受信任的操作员工作流放宽。",
  "tools.exec.ask":
    "当执行命令在运行前需要人工确认时的批准策略。在共享通道中使用更严格的询问行为，在私有操作员上下文中使用较低摩擦的设置。",
  "tools.exec.node":
    "当命令执行通过连接的节点委托时，用于执行工具的节点绑定配置。仅当需要多节点路由时才使用显式节点绑定。",
  "tools.agentToAgent":
    "用于允许代理到代理的工具调用并约束可以访问哪些目标代理的策略。除非有意启用跨代理编排，否则请保持禁用或严格范围。",
  "tools.agentToAgent.enabled":
    "启用 agent_to_agent 工具界面，以便一个代理可以在运行时调用另一个代理。在简单部署中保持关闭，仅当编排价值超过复杂性时才启用。",
  "tools.agentToAgent.allow":
    "启用编排时，允许 agent_to_agent 调用的目标代理 ID 的允许列表。使用显式允许列表以避免不受控制的跨代理调用图。",
  "tools.elevated":
    "用于只能从受信任的发件人访问的特权命令界面的提升工具访问控制。除非操作员工作流明确需要提升的操作，否则请保持禁用。",
  "tools.elevated.enabled":
    "当发件人和策略检查通过时，启用提升的工具执行路径。在公共/共享通道中保持禁用，仅为受信任的所有者操作的上下文启用。",
  "tools.elevated.allowFrom":
    "提升工具的发件人允许规则，通常按通道/提供商身份格式键入。使用狭窄、显式的身份，以便意外用户无法触发提升的命令。",
  "tools.subagents":
    "用于生成的子代理的工具策略包装器，以限制或扩展与父默认值相比的工具可用性。使用此选项可以使委托的代理功能范围与任务意图保持一致。",
  "tools.subagents.tools":
    "应用于生成的子代理运行时的允许/拒绝工具策略，用于每个子代理的强化。当子代理运行半自治工作流时，保持此范围比父范围窄。",
  "tools.sandbox":
    "用于沙盒化代理执行的工具策略包装器，以便沙盒运行可以具有不同的功能边界。使用此选项可以在沙盒上下文中强制执行更强的安全性。",
  "tools.sandbox.tools":
    "当代理在沙盒化执行环境中运行时应用的允许/拒绝工具策略。保持策略最小化，以便沙盒任务无法升级为不必要的外部操作。",
  web: "用于在操作基于 Web 的聊天界面时进行心跳和重新连接行为的 Web 通道运行时设置。使用根据您的网络可靠性配置文件和预期的正常运行时间需求调整的重新连接值。",
  "web.enabled":
    "启用 Web 通道运行时和相关的 websocket 生命周期行为。当不使用 Web 聊天时保持禁用，以减少活动连接管理开销。",
  "web.heartbeatSeconds":
    "用于 Web 通道连接和活动性维护的心跳间隔（以秒为单位）。使用较短的间隔以加快检测速度，或使用较长的间隔以减少保持活动状态的聊天。",
  "web.reconnect":
    "传输失败后 Web 通道重新连接尝试的重新连接退避策略。保持有界的重试和抖动调整，以避免雷鸣般的重新连接行为。",
  "web.reconnect.initialMs":
    "断开连接后第一次重试之前的初始重新连接延迟（以毫秒为单位）。使用适度的延迟以快速恢复，而不会立即出现重试风暴。",
  "web.reconnect.maxMs":
    "以毫秒为单位的最大重新连接退避上限，以限制重复失败后重试延迟的增长。使用合理的上限，以便在长时间中断后恢复仍然及时。",
  "web.reconnect.factor":
    "在 Web 通道重试循环中的重新连接尝试之间使用的指数退避乘数。保持因子大于 1，并使用抖动进行调整，以实现稳定的大型机群重新连接行为。",
  "web.reconnect.jitter":
    "应用于重新连接延迟的随机化因子 (0-1)，以在中断事件后使客户端不同步。在多客户端部署中保持非零抖动，以减少同步峰值。",
  "web.reconnect.maxAttempts":
    "在放弃当前失败序列之前的最大重新连接尝试次数（0 表示不重试）。在对自动化敏感的环境中使用有限的上限进行受控的故障处理。",
  canvasHost:
    "用于提供画布资产和画布启用的工作流使用的本地实时重载行为的画布主机设置。除非主动使用画布托管的资产，否则请保持禁用。",
  "canvasHost.enabled":
    "启用画布主机服务器进程和用于提供画布文件的路由。当画布工作流处于非活动状态时保持禁用，以减少暴露的本地服务。",
  "canvasHost.root":
    "由画布主机为画布内容和静态资产提供的文件系统根目录。使用专用目录，并避免使用广泛的存储库根目录，以实现最低权限的文件暴露。",
  "canvasHost.port":
    "启用画布托管时，画布主机 HTTP 服务器使用的 TCP 端口。选择一个不冲突的端口，并相应地调整防火墙/代理策略。",
  "canvasHost.liveReload":
    "在开发工作流期间为画布资产启用自动实时重载行为。在首选确定性输出的类似生产的环境中保持禁用。",
  talk: "用于语音身份、模型选择、输出格式和中断行为的对话模式语音合成设置。使用此部分可以调整面向人类的语音用户体验，同时控制延迟和成本。",
  "gateway.auth.token":
    "默认情况下，网关访问需要此项（除非使用 Tailscale Serve 身份）；非环回绑定需要此项。",
  "gateway.auth.password": "Tailscale 漏斗需要此项。",
  "agents.defaults.sandbox.browser.network":
    "用于沙盒浏览器容器的 Docker 网络（默认值：openclaw-sandbox-browser）。如果需要更严格的隔离，请避免使用桥接。",
  "agents.list[].sandbox.browser.network": "每个代理的沙盒浏览器 Docker 网络覆盖。",
  "agents.defaults.sandbox.docker.dangerouslyAllowContainerNamespaceJoin":
    "危险的玻璃破碎覆盖，允许沙盒 Docker 网络模式 container:<id>。这将加入另一个容器命名空间并削弱沙盒隔离。",
  "agents.list[].sandbox.docker.dangerouslyAllowContainerNamespaceJoin":
    "沙盒 Docker 网络模式中容器命名空间连接的每个代理的危险覆盖。",
  "agents.defaults.sandbox.browser.cdpSourceRange":
    "用于容器边缘 CDP 入口的可选 CIDR 允许列表（例如 172.21.0.1/32）。",
  "agents.list[].sandbox.browser.cdpSourceRange": "CDP 源 CIDR 允许列表的每个代理覆盖。",
  "gateway.controlUi.basePath": "提供控制 UI 的可选 URL 前缀（例如 /openclaw）。",
  "gateway.controlUi.root": "控制 UI 资产的可选文件系统根目录（默认值为 dist/control-ui）。",
  "gateway.controlUi.allowedOrigins":
    "控制 UI/WebChat websocket 连接的允许浏览器源（仅限完整源，例如 https://control.example.com）。除非明确启用了危险的主机头回退，否则非环回控制 UI 部署需要此项。",
  "gateway.controlUi.dangerouslyAllowHostHeaderOriginFallback":
    "危险的切换，为控制 UI/WebChat websocket 检查启用基于主机头的源回退。当您的部署有意依赖于主机头源策略时，支持此模式；显式的 gateway.controlUi.allowedOrigins 仍然是推荐的强化默认值。",
  "gateway.controlUi.allowInsecureAuth":
    "当您必须运行非标准设置时，放宽对控制 UI 的严格浏览器身份验证检查。除非您信任您的网络和代理路径，否则请关闭此选项，因为模拟风险更高。",
  "gateway.controlUi.dangerouslyDisableDeviceAuth":
    "禁用控制 UI 设备身份检查，仅依赖于令牌/密码。仅在受信任的网络上用于短期调试，然后立即将其关闭。",
  "gateway.http.endpoints.chatCompletions.enabled":
    "启用与 OpenAI 兼容的 `POST /v1/chat/completions` 端点（默认值：false）。",
  "gateway.http.endpoints.chatCompletions.maxBodyBytes":
    "`/v1/chat/completions` 的最大请求正文大小（以字节为单位）（默认值：20MB）。",
  "gateway.http.endpoints.chatCompletions.maxImageParts":
    "从最新用户消息接受的最大 `image_url` 部分数（默认值：8）。",
  "gateway.http.endpoints.chatCompletions.maxTotalImageBytes":
    "一个请求中所有 `image_url` 部分的最大累积解码字节数（默认值：20MB）。",
  "gateway.http.endpoints.chatCompletions.images":
    "与 OpenAI 兼容的 `image_url` 部分的图像获取/验证控件。",
  "gateway.http.endpoints.chatCompletions.images.allowUrl":
    "允许 `image_url` 部分的服务器端 URL 获取（默认值：false；仍然支持数据 URI）。",
  "gateway.http.endpoints.chatCompletions.images.urlAllowlist":
    "`image_url` URL 获取的可选主机名允许列表；支持确切的主机和 `*.example.com` 通配符。",
  "gateway.http.endpoints.chatCompletions.images.allowedMimes":
    "`image_url` 部分的允许 MIME 类型（不区分大小写的列表）。",
  "gateway.http.endpoints.chatCompletions.images.maxBytes":
    "每个获取/解码的 `image_url` 图像的最大字节数（默认值：10MB）。",
  "gateway.http.endpoints.chatCompletions.images.maxRedirects":
    "获取 `image_url` URL 时允许的最大 HTTP 重定向数（默认值：3）。",
  "gateway.http.endpoints.chatCompletions.images.timeoutMs":
    "`image_url` URL 获取的超时时间（以毫秒为单位）（默认值：10000）。",
  "gateway.reload.mode":
    "控制如何应用配置编辑：“off”忽略实时编辑，“restart”总是重新启动，“hot”在进程中应用，“hybrid”尝试热应用，如果需要则重新启动。为最安全的常规更新保留“hybrid”。",
  "gateway.reload.debounceMs": "在应用配置更改之前的防抖窗口（毫秒）。",
  "gateway.nodes.browser.mode":
    "节点浏览器路由（“auto”= 选择单个连接的浏览器节点，“manual”= 需要节点参数，“off”= 禁用）。",
  "gateway.nodes.browser.node": "将浏览器路由固定到特定的节点 ID 或名称（可选）。",
  "gateway.nodes.allowCommands":
    "允许在网关默认值之外运行的额外 node.invoke 命令（命令字符串数组）。在此处启用危险命令是安全敏感的覆盖，并由 `openclaw security audit` 标记。",
  "gateway.nodes.denyCommands":
    "即使存在于节点声明或默认允许列表中，也要阻止的节点命令名称（仅限精确的命令名称匹配，例如 `system.run`；不检查该命令中的 shell 文本）。",
  nodeHost:
    "用于向其他节点或客户端暴露此网关节点功能的节点主机控件。除非您有意在节点网络中代理本地功能，否则请保留默认值。",
  "nodeHost.browserProxy":
    "用于通过节点路由暴露本地浏览器控制的浏览器代理设置分组。仅当远程节点工作流需要您的本地浏览器配置文件时才启用。",
  "nodeHost.browserProxy.enabled":
    "通过节点代理路由暴露本地浏览器控制服务器，以便远程客户端可以使用此主机的浏览器功能。除非远程自动化明确依赖于它，否则请保持禁用。",
  "nodeHost.browserProxy.allowProfiles":
    "通过节点代理路由暴露的浏览器配置文件名称的可选允许列表。留空以暴露所有已配置的配置文件，或使用严格的列表来强制执行最低权限的配置文件访问。",
  media:
    "跨处理入站文件的提供商和工具共享的顶级媒体行为。除非您需要用于外部处理管道的稳定文件名或更长的入站媒体保留期，否则请保留默认值。",
  "media.preserveFilenames":
    "启用后，上传的媒体将保留其原始文件名，而不是生成的临时安全名称。当您的下游自动化依赖于稳定名称时，请打开此选项，并关闭以减少意外的文件名泄漏。",
  "media.ttlHours":
    "在整个媒体树中持久化入站媒体清理的可选保留窗口（以小时为单位）。留空以保留旧版行为，或在需要自动清理时设置 24（1 天）或 168（7 天）等值。",
  audio:
    "在高级工具处理语音或媒体内容之前使用的全局音频摄取设置。当您需要语音笔记和剪辑的确定性转录行为时，请配置此项。",
  "audio.transcription":
    "用于在代理处理之前将音频文件转换为文本的基于命令的转录设置。在此处保留一个简单、确定性的命令路径，以便在日志中轻松诊断故障。",
  "audio.transcription.command":
    '用于转录音频的可执行文件 + 参数（第一个令牌必须是安全的二进制文件/路径），例如 `["whisper-cli", "--model", "small", "{input}"]`。首选固定命令，以便运行时环境行为一致。',
  "audio.transcription.timeoutSeconds":
    "在中止之前允许转录命令完成的最长时间。对于较长的录音增加此值，并在对延迟敏感的部署中保持较小的值。",
  bindings:
    "用于路由和持久 ACP 对话所有权的顶级绑定规则。将 type=route 用于正常路由，将 type=acp 用于持久 ACP 工具绑定。",
  "bindings[].type":
    "绑定类型。将“route”（或省略以用于旧版路由条目）用于正常路由，将“acp”用于持久 ACP 对话绑定。",
  "bindings[].agentId":
    "当满足相应的绑定匹配规则时接收流量的目标代理 ID。仅使用有效的已配置代理 ID，以便路由在运行时不会失败。",
  "bindings[].match":
    "用于决定何时应用绑定的匹配规则对象，包括通道和可选的帐户/对等点约束。保持规则狭窄，以避免跨上下文的意外代理接管。",
  "bindings[].match.channel":
    "此绑定适用的通道/提供商标识符，例如 `telegram`、`discord` 或插件通道 ID。精确使用已配置的通道密钥，以便绑定评估可靠地工作。",
  "bindings[].match.accountId":
    "用于多帐户通道设置的可选帐户选择器，以便绑定仅适用于一个身份。当路由需要帐户范围时使用此选项，否则留空。",
  "bindings[].match.peer":
    "用于特定对话的可选对等点匹配器，包括对等点类型和对等点 ID。当只有一个直接/群组/通道目标应固定到代理时使用此选项。",
  "bindings[].match.peer.kind":
    "对等点对话类型：“direct”、“group”、“channel”或旧版“dm”（直接的已弃用别名）。为新配置首选“direct”，并保持类型与通道语义一致。",
  "bindings[].match.peer.id":
    "与对等点匹配一起使用的对话标识符，例如来自提供商的聊天 ID、通道 ID 或群组 ID。保持此项精确，以避免静默的不匹配。",
  "bindings[].match.guildId":
    "用于在多服务器部署中进行绑定评估的可选 Discord 风格的服务器/服务器 ID 约束。当相同的对等点标识符可以出现在不同的服务器中时使用此选项。",
  "bindings[].match.teamId":
    "当聊天在团队下进行范围界定时，由提供商使用的可选团队/工作区 ID 约束。当您需要将绑定隔离到一个工作区上下文时添加此项。",
  "bindings[].match.roles":
    "由将角色附加到聊天上下文的提供商使用的可选的基于角色的筛选器列表。使用此选项将特权或操作角色流量路由到专门的代理。",
  "bindings[].acp":
    "用于 bindings[].type=acp 的可选的每个绑定的 ACP 覆盖。此层覆盖匹配对话的 agents.list[].runtime.acp 默认值。",
  "bindings[].acp.mode": "此绑定的 ACP 会话模式覆盖（持久或一次性）。",
  "bindings[].acp.label": "此绑定对话中 ACP 状态/诊断的人性化标签。",
  "bindings[].acp.cwd": "从此绑定创建的 ACP 会话的工作目录覆盖。",
  "bindings[].acp.backend":
    "此绑定的 ACP 后端覆盖（回退到代理运行时 ACP 后端，然后是全局 acp.backend）。",
  broadcast:
    "用于将同一出站消息发送到每个源对话的多个对等点 ID 的广播路由映射。保持此项最小化并经过审核，因为一个源可以扇出到许多目的地。",
  "broadcast.strategy":
    "广播扇出的传递顺序：“parallel”同时发送到所有目标，而“sequential”逐个发送。使用“parallel”以提高速度，使用“sequential”以实现更严格的排序/背压控制。",
  "broadcast.*":
    "每个源的广播目标列表，其中每个键是源对等点 ID，值是目标对等点 ID 的数组。保持列表有意，以避免意外的消息放大。",
  "diagnostics.flags":
    '按标志启用有针对性的诊断日志（例如 ["telegram.http"]）。支持通配符，如 "telegram.*" 或 "*"。',
  "diagnostics.enabled":
    "日志和遥测布线路径中诊断仪器输出的主切换。为正常的可观察性保持启用，仅在严格受限的环境中禁用。",
  "diagnostics.stuckSessionWarnMs":
    "当会话保持在处理状态时，发出卡住会话警告的年龄阈值（以毫秒为单位）。对于长的多工具回合增加此值以减少误报；对于更快的挂起检测降低此值。",
  "diagnostics.otel.enabled":
    "根据配置的端点/协议设置，为跟踪、指标和日志启用 OpenTelemetry 导出管道。除非您的收集器端点和身份验证已完全配置，否则请保持禁用。",
  "diagnostics.otel.endpoint":
    "用于 OpenTelemetry 导出传输的收集器端点 URL，包括方案和端口。使用可访问、受信任的收集器端点，并在推出后监控摄取错误。",
  "diagnostics.otel.protocol":
    "用于遥测导出的 OTel 传输协议：“http/protobuf”或“grpc”，具体取决于收集器支持。使用您的可观察性后端期望的协议，以避免丢失遥测有效负载。",
  "diagnostics.otel.headers":
    "与 OpenTelemetry 导出请求一起发送的其他 HTTP/gRPC 元数据标头，通常用于租户身份验证或路由。将密钥保留在 env 支持的值中，并避免不必要的标头扩散。",
  "diagnostics.otel.serviceName":
    "在遥测资源属性中报告的服务名称，用于在可观察性后端中识别此网关实例。使用稳定的名称，以便仪表板和警报在部署中保持一致。",
  "diagnostics.otel.traces":
    "启用跟踪信号导出到配置的 OpenTelemetry 收集器端点。当需要延迟/调试跟踪时保持启用，如果只需要指标/日志，则禁用。",
  "diagnostics.otel.metrics":
    "启用指标信号导出到配置的 OpenTelemetry 收集器端点。为运行时健康仪表板保持启用，仅当必须最小化指标量时才禁用。",
  "diagnostics.otel.logs":
    "除了本地日志记录接收器之外，还通过 OpenTelemetry 启用日志信号导出。当需要在服务和代理之间进行集中式日志关联时使用此选项。",
  "diagnostics.otel.sampleRate":
    "跟踪采样率 (0-1)，控制导出到可观察性后端的跟踪流量。较低的速率可降低开销/成本，而较高的速率可提高调试保真度。",
  "diagnostics.otel.flushIntervalMs":
    "从缓冲区到收集器的定期遥测刷新的间隔（以毫秒为单位）。增加以减少导出聊天，或降低以在活动事件响应期间更快地获得可见性。",
  "diagnostics.cacheTrace.enabled": "为嵌入式代理运行记录缓存跟踪快照（默认值：false）。",
  "diagnostics.cacheTrace.filePath":
    "缓存跟踪日志的 JSONL 输出路径（默认值：$OPENCLAW_STATE_DIR/logs/cache-trace.jsonl）。",
  "diagnostics.cacheTrace.includeMessages": "在跟踪输出中包含完整的消息有效负载（默认值：true）。",
  "diagnostics.cacheTrace.includePrompt": "在跟踪输出中包含提示文本（默认值：true）。",
  "diagnostics.cacheTrace.includeSystem": "在跟踪输出中包含系统提示（默认值：true）。",
  "tools.exec.applyPatch.enabled": "实验性。当工具策略允许时，为 OpenAI 模型启用 apply_patch。",
  "tools.exec.applyPatch.workspaceOnly":
    "将 apply_patch 路径限制在工作区目录（默认值：true）。设置为 false 以允许在工作区外写入（危险）。",
  "tools.exec.applyPatch.allowModels":
    "可选的模型 ID 允许列表（例如“gpt-5.2”或“openai/gpt-5.2”）。",
  "tools.loopDetection.enabled": "启用重复性工具调用循环检测和退避安全检查（默认值：false）。",
  "tools.loopDetection.historySize": "用于循环检测的工具历史记录窗口大小（默认值：30）。",
  "tools.loopDetection.warningThreshold": "启用检测器时重复模式的警告阈值（默认值：10）。",
  "tools.loopDetection.criticalThreshold": "启用检测器时重复模式的临界阈值（默认值：20）。",
  "tools.loopDetection.globalCircuitBreakerThreshold": "全局无进展断路器阈值（默认值：30）。",
  "tools.loopDetection.detectors.genericRepeat":
    "启用通用重复相同工具/相同参数循环检测（默认值：true）。",
  "tools.loopDetection.detectors.knownPollNoProgress":
    "启用已知轮询工具无进展循环检测（默认值：true）。",
  "tools.loopDetection.detectors.pingPong": "启用乒乓循环检测（默认值：true）。",
  "tools.exec.notifyOnExit":
    "当为 true（默认值）时，后台执行会话退出和节点执行生命周期事件会排队一个系统事件并请求一个心跳。",
  "tools.exec.notifyOnExitEmptySuccess":
    "当为 true 时，具有空输出的成功后台执行退出仍会排队一个完成系统事件（默认值：false）。",
  "tools.exec.pathPrepend": "要前置到执行运行的 PATH 的目录（网关/沙盒）。",
  "tools.exec.safeBins": "允许仅标准输入的安全二进制文件在没有显式允许列表条目的情况下运行。",
  "tools.exec.safeBinTrustedDirs":
    "受信任的用于安全二进制文件路径检查的其他显式目录（PATH 条目永远不会自动受信任）。",
  "tools.exec.safeBinProfiles":
    "可选的每个二进制文件的安全二进制文件配置文件（位置限制 + 允许/拒绝的标志）。",
  "tools.profile":
    "在应用允许/拒绝覆盖之前，用于选择预定义工具策略基线的全局工具配置文件名称。使用此选项可以在代理之间实现一致的环境状态，并保持配置文件名称稳定。",
  "tools.alsoAllow":
    "在所选工具配置文件和默认策略之上合并的额外工具允许列表条目。保持此列表小而明确，以便审核可以快速识别有意的策略例外。",
  "tools.byProvider":
    "按通道/提供商 ID 键入的每个提供商的工具允许/拒绝覆盖，以按表面定制功能。当一个提供商需要比全局工具策略更严格的控制时使用此选项。",
  "agents.list[].tools.profile":
    "当一个代理需要不同的功能基线时，用于工具配置文件选择的每个代理的覆盖。谨慎使用此选项，以便代理之间的策略差异保持有意和可审查。",
  "agents.list[].tools.alsoAllow":
    "在全局和配置文件策略之上，用于工具的每个代理的附加允许列表。保持狭窄以避免在专门代理上意外的权限扩展。",
  "agents.list[].tools.byProvider":
    "用于通道范围功能控制的每个代理的特定于提供商的工具策略覆盖。当单个代理在一个提供商上需要比其他提供商更严格的限制时使用此选项。",
  "tools.exec.approvalRunningNoticeMs":
    "在授予执行批准后显示进行中通知之前的延迟（以毫秒为单位）。增加以减少快速命令的闪烁，或降低以获得更快的操作员反馈。",
  "tools.links.enabled":
    "启用自动链接理解预处理，以便在代理推理之前可以总结 URL。为更丰富的上下文保持启用，当需要严格的最小处理时禁用。",
  "tools.links.maxLinks":
    "在链接理解期间每回合扩展的最大链接数。在聊天密集的线程中使用较低的值来控制延迟/成本，当多链接上下文至关重要时使用较高的值。",
  "tools.links.timeoutSeconds":
    "在跳过未解析的链接之前，每个链接理解的超时预算（以秒为单位）。保持此项有界，以避免在外部站点缓慢或无法访问时出现长时间的停顿。",
  "tools.links.models":
    "用于链接理解任务的首选模型列表，在支持时按顺序作为回退进行评估。首先使用轻量级模型进行常规摘要，仅在需要时使用较重的模型。",
  "tools.links.scope":
    "控制链接理解相对于对话上下文和消息类型何时运行。保持范围保守，以避免在链接不可操作的消息上进行不必要的获取。",
  "tools.media.models":
    "当未设置特定于模态的模型列表时，媒体理解工具使用的共享回退模型列表。保持此项与可用的多模态提供商保持一致，以避免运行时回退流失。",
  "tools.media.concurrency":
    "在图像、音频和视频任务中，每回合并发媒体理解操作的最大数量。在资源受限的部署中降低此值，以防止 CPU/网络饱和。",
  "tools.media.image.enabled":
    "启用图像理解，以便可以将附加或引用的图像解释为文本上下文。如果您需要纯文本操作或希望避免图像处理成本，请禁用此选项。",
  "tools.media.image.maxBytes":
    "在项目被策略跳过或截断之前，接受的最大图像有效负载大小（以字节为单位）。保持限制对您的提供商上限和基础架构带宽是现实的。",
  "tools.media.image.maxChars":
    "在模型响应规范化后，从图像理解输出返回的最大字符数。使用更严格的限制来减少提示膨胀，并为细节繁重的 OCR 任务使用更大的限制。",
  "tools.media.image.prompt":
    "用于图像理解请求的指令模板，以塑造提取样式和细节级别。保持提示确定性，以便输出在回合和通道之间保持一致。",
  "tools.media.image.timeoutSeconds":
    "在中止之前，每个图像理解请求的超时时间（以秒为单位）。为高分辨率分析增加此值，并为对延迟敏感的操作员工作流降低此值。",
  "tools.media.image.attachments":
    "图像输入的附件处理策略，包括哪些消息附件符合图像分析的条件。在不受信任的通道中使用限制性设置，以减少意外处理。",
  "tools.media.image.models":
    "当您想要覆盖共享媒体模型时，专门用于图像理解的有序模型首选项。将最可靠的多模态模型放在首位，以减少回退尝试。",
  "tools.media.image.scope":
    "尝试图像理解时的范围选择器（例如，仅显式请求与更广泛的自动检测）。在繁忙的通道中保持狭窄的范围，以控制令牌和 API 支出。",
  ...MEDIA_AUDIO_FIELD_HELP,
  "tools.media.video.enabled":
    "启用视频理解，以便可以将剪辑总结为文本，用于下游推理和响应。当处理视频超出策略或对于您的部署来说成本太高时，请禁用此选项。",
  "tools.media.video.maxBytes":
    "在策略拒绝或修剪发生之前，接受的最大视频有效负载大小（以字节为单位）。将其调整为提供商和基础架构限制，以避免重复的超时/失败循环。",
  "tools.media.video.maxChars":
    "从视频理解输出中保留的最大字符数，以控制提示增长。为密集的场景描述提高此值，当首选简洁的摘要时降低此值。",
  "tools.media.video.prompt":
    "用于视频理解的指令模板，描述所需的摘要粒度和重点领域。保持此项稳定，以便输出质量在模型/提供商回退中保持可预测。",
  "tools.media.video.timeoutSeconds":
    "在取消之前，每个视频理解请求的超时时间（以秒为单位）。在交互式通道中使用保守值，在离线或批处理繁重的处理中使用更长的值。",
  "tools.media.video.attachments":
    "视频分析的附件资格策略，定义哪些消息文件可以触发视频处理。在共享通道中保持此项明确，以防止意外的大型媒体工作负载。",
  "tools.media.video.models":
    "在应用共享媒体回退之前，专门用于视频理解的有序模型首选项。优先考虑具有强大的多模态视频支持的模型，以最大程度地减少降级的摘要。",
  "tools.media.video.scope":
    "控制在传入事件中何时尝试视频理解的范围选择器。在嘈杂的通道中缩小范围，仅在视频解释是工作流核心时才扩大范围。",
  "skills.load.watch":
    "为技能定义更改启用文件系统监视，以便可以在不完全重新启动进程的情况下应用更新。在开发工作流中保持启用，并在不可变的生产映像中禁用。",
  "skills.load.watchDebounceMs":
    "在重新加载逻辑运行之前，用于合并快速技能文件更改的防抖窗口（以毫秒为单位）。增加以减少频繁写入时的重新加载流失，或降低以获得更快的编辑反馈。",
  approvals:
    "用于将执行批准请求转发到原始会话之外的聊天目标的批准路由控件。除非操作员需要明确的带外批准可见性，否则请保持禁用。",
  "approvals.exec":
    "对执行批准转发行为进行分组，包括启用、路由模式、筛选器和显式目标。当批准提示必须到达操作通道而不仅仅是原始线程时，请在此处配置。",
  "approvals.exec.enabled":
    "启用将执行批准请求转发到配置的传递目标（默认值：false）。在低风险设置中保持禁用，仅当人工批准响应者需要通道可见的提示时才启用。",
  "approvals.exec.mode":
    "控制批准提示的发送位置：“session”使用原始聊天，“targets”使用配置的目标，“both”发送到两个路径。使用“session”作为基线，仅当操作工作流需要冗余时才扩展。",
  "approvals.exec.agentFilter":
    '符合转发批准条件的代理 ID 的可选允许列表，例如 `["primary", "ops-agent"]`。使用此选项可以限制转发的爆炸半径，并避免为不相关的代理通知通道。',
  "approvals.exec.sessionFilter":
    '作为子字符串或正则表达式样式模式匹配的可选会话密钥筛选器，例如 `["discord:", "^agent:ops:"]`。使用狭窄的模式，以便只有预期的批准上下文才会转发到共享目标。',
  "approvals.exec.targets":
    "当转发模式包括目标时使用的显式传递目标，每个目标都具有通道和目标详细信息。保持目标列表最低权限，并在启用广泛转发之前验证每个目标。",
  "approvals.exec.targets[].channel":
    "用于转发批准传递的通道/提供商 ID，例如 discord、slack 或插件通道 ID。仅使用有效的通道 ID，以便批准不会因未知路由而静默失败。",
  "approvals.exec.targets[].to":
    "目标通道内的目标标识符（通道 ID、用户 ID 或线程根，具体取决于提供商）。根据提供商验证语义，因为目标格式在通道集成之间有所不同。",
  "approacos.exec.targets[].accountId":
    "当批准必须通过特定的帐户上下文路由时，用于多帐户通道设置的可选帐户选择器。仅当目标通道具有多个已配置的身份时才使用此选项。",
  "approvals.exec.targets[].threadId":
    "支持转发批准的线程传递的通道的可选线程/主题目标。使用此选项可以将批准流量包含在操作线程中，而不是主通道中。",
  "tools.fs.workspaceOnly":
    "将文件系统工具（读/写/编辑/应用补丁）限制在工作区目录（默认值：false）。",
  "tools.sessions.visibility":
    "控制哪些会话可以被 sessions_list/sessions_history/sessions_send 作为目标。（“tree”默认值 = 当前会话 + 生成的子代理会话；“self”= 仅当前；“agent”= 当前代理 ID 中的任何会话；“all”= 任何会话；跨代理仍需要 tools.agentToAgent）。",
  "tools.message.allowCrossContextSend": "旧版覆盖：允许跨所有提供商进行跨上下文发送。",
  "tools.message.crossContext.allowWithinProvider":
    "允许在同一提供商内向其他频道发送（默认值：true）。",
  "tools.message.crossContext.allowAcrossProviders": "允许跨不同提供商发送（默认值：false）。",
  "tools.message.crossContext.marker.enabled":
    "在跨上下文发送时添加可见的来源标记（默认值：true）。",
  "tools.message.crossContext.marker.prefix": "跨上下文标记的文本前缀（支持“{channel}”）。",
  "tools.message.crossContext.marker.suffix": "跨上下文标记的文本后缀（支持“{channel}”）。",
  "tools.message.broadcast.enabled": "启用广播操作（默认值：true）。",
  "tools.web.search.enabled": "启用 web_search 工具（需要提供商 API 密钥）。",
  "tools.web.search.provider":
    "搜索提供商（“brave”、“gemini”、“grok”、“kimi”或“perplexity”）。如果省略，则从可用的 API 密钥中自动检测。",
  "tools.web.search.apiKey": "Brave Search API 密钥（回退：BRAVE_API_KEY 环境变量）。",
  "tools.web.search.maxResults": "返回的结果数（1-10）。",
  "tools.web.search.timeoutSeconds": "web_search 请求的超时秒数。",
  "tools.web.search.cacheTtlMinutes": "web_search 结果的缓存 TTL 分钟数。",
  "tools.web.search.brave.mode":
    "Brave 搜索模式：“web”（URL 结果）或“llm-context”（为 LLM 接地预先提取的页面内容）。",
  "tools.web.search.gemini.apiKey":
    "用于 Google 搜索接地的 Gemini API 密钥（回退：GEMINI_API_KEY 环境变量）。",
  "tools.web.search.gemini.model": "Gemini 模型覆盖（默认值：“gemini-2.5-flash”）。",
  "tools.web.search.grok.apiKey": "Grok (xAI) API 密钥（回退：XAI_API_KEY 环境变量）。", // pragma: allowlist secret
  "tools.web.search.grok.model": "Grok 模型覆盖（默认值：“grok-4-1-fast”）。",
  "tools.web.search.kimi.apiKey":
    "Moonshot/Kimi API 密钥（回退：KIMI_API_KEY 或 MOONSHOT_API_KEY 环境变量）。",
  "tools.web.search.kimi.baseUrl": "Kimi 基础 URL 覆盖（默认值：“https://api.moonshot.ai/v1”）。",
  "tools.web.search.kimi.model": "Kimi 模型覆盖（默认值：“moonshot-v1-128k”）。",
  "tools.web.search.perplexity.apiKey":
    "Perplexity 或 OpenRouter API 密钥（回退：PERPLEXITY_API_KEY 或 OPENROUTER_API_KEY 环境变量）。直接的 Perplexity 密钥默认为搜索 API；OpenRouter 密钥使用 Sonar 聊天补全。",
  "tools.web.search.perplexity.baseUrl":
    "可选的 Perplexity/OpenRouter 聊天补全基础 URL 覆盖。设置此项可选择 Perplexity 进入旧版 Sonar/OpenRouter 兼容性路径。",
  "tools.web.search.perplexity.model":
    "可选的 Sonar/OpenRouter 模型覆盖（默认值：“perplexity/sonar-pro”）。设置此项可选择 Perplexity 进入旧版聊天补全兼容性路径。",
  "tools.web.fetch.enabled": "启用 web_fetch 工具（轻量级 HTTP 获取）。",
  "tools.web.fetch.maxChars": "web_fetch 返回的最大字符数（截断）。",
  "tools.web.fetch.maxCharsCap": "web_fetch maxChars 的硬性上限（适用于配置和工具调用）。",
  "tools.web.fetch.timeoutSeconds": "web_fetch 请求的超时秒数。",
  "tools.web.fetch.cacheTtlMinutes": "web_fetch 结果的缓存 TTL 分钟数。",
  "tools.web.fetch.maxRedirects": "web_fetch 允许的最大重定向次数（默认值：3）。",
  "tools.web.fetch.userAgent": "覆盖 web_fetch 请求的 User-Agent 标头。",
  "tools.web.fetch.readability":
    "使用 Readability 从 HTML 中提取主要内容（回退到基本的 HTML 清理）。",
  "tools.web.fetch.firecrawl.enabled": "为 web_fetch 启用 Firecrawl 回退（如果已配置）。",
  "tools.web.fetch.firecrawl.apiKey": "Firecrawl API 密钥（回退：FIRECRAWL_API_KEY 环境变量）。",
  "tools.web.fetch.firecrawl.baseUrl":
    "Firecrawl 基础 URL（例如 https://api.firecrawl.dev 或自定义端点）。",
  "tools.web.fetch.firecrawl.onlyMainContent":
    "当为 true 时，Firecrawl 仅返回主要内容（默认值：true）。",
  "tools.web.fetch.firecrawl.maxAgeMs": "当 API 支持时，Firecrawl 缓存结果的 maxAge（毫秒）。",
  "tools.web.fetch.firecrawl.timeoutSeconds": "Firecrawl 请求的超时秒数。",
  models:
    "模型目录根，用于提供商定义、合并/替换行为以及可选的 Bedrock 发现集成。在依赖生产故障转移路径之前，请保持提供商定义明确并经过验证。",
  "models.mode":
    "控制提供商目录行为：“merge”保留内置插件并覆盖您的自定义提供商，而“replace”仅使用您配置的提供商。在“merge”中，匹配的提供商 ID 会保留非空的代理 models.json baseUrl 值，而仅当提供商在当前配置/身份验证配置文件上下文中不受 SecretRef 管理时，才会保留 apiKey 值；受 SecretRef 管理的提供商会从当前源标记刷新 apiKey，匹配的模型 contextWindow/maxTokens 会在显式和隐式条目之间使用较高的值。",
  "models.providers":
    "按提供商 ID 键入的提供商映射，包含连接/身份验证设置和具体的模型定义。使用稳定的提供商密钥，以便代理和工具的引用在不同环境中保持可移植性。",
  "models.providers.*.baseUrl":
    "用于为该提供商条目提供模型请求的提供商端点的基本 URL。在需要时，通过配置模板使用 HTTPS 端点并保持 URL 特定于环境。",
  "models.providers.*.apiKey":
    "当提供商需要直接密钥身份验证时，用于基于 API 密钥的身份验证的提供商凭据。使用秘密/环境变量替换，并避免在提交的配置文件中存储真实密钥。",
  "models.providers.*.auth":
    "选择提供商身份验证样式：“api-key”用于 API 密钥身份验证，“token”用于持有者令牌身份验证，“oauth”用于 OAuth 凭据，“aws-sdk”用于 AWS 凭据解析。将其与您的提供商要求相匹配。",
  "models.providers.*.api":
    "提供商 API 适配器选择，控制模型调用的请求/响应兼容性处理。使用与您的上游提供商协议匹配的适配器，以避免功能不匹配。",
  "models.providers.*.injectNumCtxForOpenAICompat":
    "控制 OpenClaw 是否为使用 OpenAI 兼容适配器（`openai-completions`）配置的 Ollama 提供商注入 `options.num_ctx`。默认为 true。仅当您的代理/上游拒绝未知的 `options` 有效负载字段时，才设置为 false。",
  "models.providers.*.headers":
    "合并到提供商请求中的静态 HTTP 标头，用于租户路由、代理身份验证或自定义网关要求。请谨慎使用，并将敏感的标头值保留在机密中。",
  "models.providers.*.authHeader":
    "当为 true 时，即使可能存在备用身份验证，凭据也会通过 HTTP Authorization 标头发送。仅当您的提供商或代理明确要求授权转发时才使用此选项。",
  "models.providers.*.models":
    "提供商的已声明模型列表，包括标识符、元数据和可选的兼容性/成本提示。保持 ID 与提供商目录值完全一致，以便选择和回退能够正确解析。",
  "models.bedrockDiscovery":
    "用于从账户可见性合成提供商模型条目的自动 AWS Bedrock 模型发现设置。保持发现范围限定，并保守刷新间隔以减少 API 流失。",
  "models.bedrockDiscovery.enabled":
    "为 Bedrock 支持的提供商启用定期 Bedrock 模型发现和目录刷新。除非 Bedrock 被积极使用且 IAM 权限已正确配置，否则请保持禁用。",
  "models.bedrockDiscovery.region":
    "在为您的部署启用发现时，用于 Bedrock 发现调用的 AWS 区域。使用您的 Bedrock 模型预配的区域，以避免空的发现结果。",
  "models.bedrockDiscovery.providerFilter":
    "可选的提供商允许列表筛选器，用于 Bedrock 发现，以便仅刷新选定的提供商。在多提供商环境中使用此选项以限制发现范围。",
  "models.bedrockDiscovery.refreshInterval":
    "Bedrock 发现轮询的刷新节奏（以秒为单位），以随时间检测新可用的模型。在生产中使用较长的间隔以降低 API 成本和控制平面噪音。",
  "models.bedrockDiscovery.defaultContextWindow":
    "当提供商元数据缺少显式限制时，应用于已发现模型的回退上下文窗口值。使用实际的默认值，以避免超出真实提供商约束的过大提示。",
  "models.bedrockDiscovery.defaultMaxTokens":
    "应用于没有显式输出令牌限制的已发现模型的回退最大令牌值。使用保守的默认值，以减少截断意外和意外的令牌支出。",
  auth: "用于多配置文件提供商凭据和基于冷却时间的故障转移排序的身份验证配置文件根。保持配置文件最小化和明确，以便自动故障转移行为保持可审计性。",
  "channels.slack.allowBots": "允许机器人创作的消息触发 Slack 回复（默认值：false）。",
  "channels.slack.thread.historyScope":
    "Slack 线程历史记录上下文的范围（“thread”隔离每个线程；“channel”重用频道历史记录）。",
  "channels.slack.thread.inheritParent":
    "如果为 true，Slack 线程会话将继承父频道转录本（默认值：false）。",
  "channels.slack.thread.initialHistoryLimit":
    "启动新线程会话时要获取的现有 Slack 线程消息的最大数量（默认值：20，设置为 0 以禁用）。",
  "channels.mattermost.botToken": "来自 Mattermost 系统控制台 -> 集成 -> 机器人帐户的机器人令牌。",
  "channels.mattermost.baseUrl":
    "您的 Mattermost 服务器的基本 URL（例如，https://chat.example.com）。",
  "channels.mattermost.chatmode":
    "在提及（“oncall”）、触发字符（“>”或“!”）（“onchar”）或每条消息（“onmessage”）时回复频道消息。",
  "channels.mattermost.oncharPrefixes": "onchar 模式的触发前缀（默认值：[“>”，“!”]）。",
  "channels.mattermost.requireMention": "在频道中响应前需要@提及（默认值：true）。",
  "auth.profiles": "命名的身份验证配置文件（提供商 + 模式 + 可选电子邮件）。",
  "auth.order": "每个提供商的有序身份验证配置文件 ID（用于自动故障转移）。",
  "auth.cooldowns":
    "用于在与计费相关的故障和重试窗口后临时抑制配置文件的冷却/退避控制。使用这些来防止快速重新选择仍被阻止的配置文件。",
  "auth.cooldowns.billingBackoffHours":
    "当配置文件因计费/信用不足而失败时的基本退避（小时）（默认值：5）。",
  "auth.cooldowns.billingBackoffHoursByProvider": "可选的每个提供商的计费退避覆盖（小时）。",
  "auth.cooldowns.billingMaxHours": "计费退避的上限（小时）（默认值：24）。",
  "auth.cooldowns.failureWindowHours": "退避计数器的故障窗口（小时）（默认值：24）。",
  "agents.defaults.workspace":
    "暴露给代理运行时工具的默认工作区路径，用于文件系统上下文和存储库感知行为。当从包装器运行时显式设置此项，以便路径解析保持确定性。",
  "agents.defaults.bootstrapMaxChars":
    "在截断之前注入到系统提示中的每个工作区引导文件的最大字符数（默认值：20000）。",
  "agents.defaults.bootstrapTotalMaxChars":
    "所有注入的工作区引导文件的最大总字符数（默认值：150000）。",
  "agents.defaults.bootstrapPromptTruncationWarning":
    "当引导文件被截断时，注入代理可见的警告文本：“off”、“once”（默认）或“always”。",
  "agents.defaults.repoRoot": "在系统提示运行时行中显示的可选存储库根目录（覆盖自动检测）。",
  "agents.defaults.envelopeTimezone":
    "消息信封的时区（“utc”、“local”、“user”或 IANA 时区字符串）。",
  "agents.defaults.envelopeTimestamp": "在消息信封中包含绝对时间戳（“on”或“off”）。",
  "agents.defaults.envelopeElapsed": "在消息信封中包含经过的时间（“on”或“off”）。",
  "agents.defaults.models": "已配置的模型目录（键是完整的提供商/模型 ID）。",
  "agents.defaults.memorySearch":
    "对 MEMORY.md 和 memory/*.md 进行向量搜索（支持每个代理的覆盖）。",
  "agents.defaults.memorySearch.enabled":
    "此代理配置文件的内存搜索索引和检索行为的主切换。为语义回忆保持启用，当您想要完全无状态的响应时禁用。",
  "agents.defaults.memorySearch.sources":
    "选择索引哪些源：“memory”读取 MEMORY.md + 内存文件，“sessions”包括转录历史记录。除非您需要从以前的聊天转录中回忆，否则请保留 [“memory”]。",
  "agents.defaults.memorySearch.extraPaths":
    "将额外的目录或 .md 文件添加到内存索引中，超出默认内存文件。当关键参考文档位于您的存储库中的其他位置时使用此选项；保持路径小而有意，以避免嘈杂的回忆。",
  "agents.defaults.memorySearch.experimental.sessionMemory":
    "将对话转录本索引到内存搜索中，以便响应可以引用之前的聊天回合。除非需要转录本回忆，否则请关闭此功能，因为索引成本和存储使用量都会增加。",
  "agents.defaults.memorySearch.provider":
    "选择用于构建/查询内存向量的嵌入后端：“openai”、“gemini”、“voyage”、“mistral”、“ollama”或“local”。在此处保留您最可靠的提供商，并为弹性配置回退。",
  "agents.defaults.memorySearch.model":
    "当需要非默认模型时，由选定的内存提供商使用的嵌入模型覆盖。仅当您需要明确的回忆质量/成本调整超出提供商默认值时才设置此项。",
  "agents.defaults.memorySearch.remote.baseUrl":
    "覆盖嵌入 API 端点，例如与 OpenAI 兼容的代理或自定义 Gemini 基本 URL。仅当通过您自己的网关或供应商端点路由时才使用此选项；否则保留提供商默认值。",
  "agents.defaults.memorySearch.remote.apiKey":
    "为内存索引和查询时嵌入使用的远程嵌入调用提供专用 API 密钥。当内存嵌入应使用与全局默认值或环境变量不同的凭据时使用此选项。",
  "agents.defaults.memorySearch.remote.headers":
    "将自定义 HTTP 标头添加到远程嵌入请求中，与提供商默认值合并。将其用于代理身份验证和租户路由标头，并保持值最小化以避免泄漏敏感元数据。",
  "agents.defaults.memorySearch.remote.batch.enabled":
    "在支持的情况下（OpenAI/Gemini），为嵌入作业启用提供商批处理 API，从而提高较大索引运行的吞吐量。除非调试提供商批处理故障或运行非常小的工作负载，否则请保持启用此功能。",
  "agents.defaults.memorySearch.remote.batch.wait":
    "等待批处理嵌入作业完全完成后，索引操作才会完成。为确定性索引状态保持启用此功能；仅当您接受延迟一致性时才禁用。",
  "agents.defaults.memorySearch.remote.batch.concurrency":
    "限制在索引期间同时运行的嵌入批处理作业的数量（默认值：2）。为更快的批量索引谨慎增加，但要注意提供商的速率限制和队列错误。",
  "agents.defaults.memorySearch.remote.batch.pollIntervalMs":
    "控制系统轮询提供商 API 以获取批处理作业状态的频率（以毫秒为单位）（默认值：2000）。使用较长的间隔以减少 API 抖动，或使用较短的间隔以更快地完成检测。",
  "agents.defaults.memorySearch.remote.batch.timeoutMinutes":
    "设置完整嵌入批处理操作的最大等待时间（以分钟为单位）（默认值：60）。对于非常大的语料库或较慢的提供商，请增加此值，并在自动化繁重的流程中降低此值以快速失败。",
  "agents.defaults.memorySearch.local.modelPath":
    "指定本地内存搜索的本地嵌入模型源，例如 GGUF 文件路径或 `hf:` URI。仅当提供商是 `local` 时才使用此选项，并在大型索引重建之前验证模型兼容性。",
  "agents.defaults.memorySearch.fallback":
    "主嵌入失败时使用的备份提供商：“openai”、“gemini”、“voyage”、“mistral”、“ollama”、“local”或“none”。为生产可靠性设置真正的回退；仅当您希望显式失败时才使用“none”。",
  "agents.defaults.memorySearch.store.path":
    "设置每个代理的 SQLite 内存索引在磁盘上的存储位置。除非您需要自定义存储位置或备份策略对齐，否则请保留默认值 `~/.openclaw/memory/{agentId}.sqlite`。",
  "agents.defaults.memorySearch.store.vector.enabled":
    "启用用于内存搜索中向量相似性查询的 sqlite-vec 扩展（默认值：true）。为正常的语义回忆保持启用此功能；仅在调试或仅回退操作时禁用。",
  "agents.defaults.memorySearch.store.vector.extensionPath":
    "覆盖自动发现的 sqlite-vec 扩展库路径（`.dylib`、`.so` 或 `.dll`）。当您的运行时无法自动找到 sqlite-vec 或您固定了已知良好的构建时使用此选项。",
  "agents.defaults.memorySearch.chunking.tokens":
    "在嵌入/索引之前拆分内存源时使用的块大小（以令牌为单位）。增加以获得每个块更广泛的上下文，或降低以提高精确查找的精度。",
  "agents.defaults.memorySearch.chunking.overlap":
    "相邻内存块之间的令牌重叠，以在拆分边界附近保持上下文连续性。使用适度的重叠以减少边界未命中，而不会过度增加索引大小。",
  "agents.defaults.memorySearch.query.maxResults":
    "在下游重新排序和提示注入之前从搜索返回的最大内存命中数。提高以获得更广泛的回忆，或降低以获得更紧凑的提示和更快的响应。",
  "agents.defaults.memorySearch.query.minScore":
    "在最终回忆输出中包含内存结果的最低相关性分数阈值。提高以减少弱/噪声匹配，或在需要更宽松的检索时降低。",
  "agents.defaults.memorySearch.query.hybrid.enabled":
    "将 BM25 关键字匹配与向量相似性相结合，以在混合的精确+语义查询上获得更好的回忆。除非您正在隔离排名行为以进行故障排除，否则请保持启用。",
  "agents.defaults.memorySearch.query.hybrid.vectorWeight":
    "控制语义相似性对混合排名的影响程度（0-1）。当释义匹配比精确术语更重要时增加；为更严格的关键字强调而减少。",
  "agents.defaults.memorySearch.query.hybrid.textWeight":
    "控制 BM25 关键字相关性对混合排名的影响程度（0-1）。为精确术语匹配增加；当语义匹配应排名更高时减少。",
  "agents.defaults.memorySearch.query.hybrid.candidateMultiplier":
    "在重新排序之前扩展候选池（默认值：4）。在嘈杂的语料库上提高此值以获得更好的回忆，但预计会有更多的计算和稍慢的搜索。",
  "agents.defaults.memorySearch.query.hybrid.mmr.enabled":
    "添加 MMR 重新排序以使结果多样化，并减少单个答案窗口中的近乎重复的片段。当回忆看起来重复时启用；为严格的分数排序保持关闭。",
  "agents.defaults.memorySearch.query.hybrid.mmr.lambda":
    "设置 MMR 相关性与多样性的平衡（0 = 最多样化，1 = 最相关，默认值：0.7）。较低的值减少重复；较高的值保持紧密相关但可能会重复。",
  "agents.defaults.memorySearch.query.hybrid.temporalDecay.enabled":
    "应用新近度衰减，以便当分数接近时，较新的内存可以超过较旧的内存。当及时性很重要时启用；对于永恒的参考知识保持关闭。",
  "agents.defaults.memorySearch.query.hybrid.temporalDecay.halfLifeDays":
    "控制当启用时间衰减时，较旧的内存失去排名的速度（以天为单位的半衰期，默认值：30）。较低的值更积极地优先考虑最近的上下文。",
  "agents.defaults.memorySearch.cache.enabled":
    "在 SQLite 中缓存计算的块嵌入，以便重新索引和增量更新运行得更快（默认值：true）。除非调查缓存正确性或最小化磁盘使用，否则请保持启用此功能。",
  memory: "内存后端配置（全局）。",
  "memory.backend":
    "选择全局内存引擎：“builtin”使用 OpenClaw 内存内部构件，而“qmd”使用 QMD sidecar 管道。除非您有意操作 QMD，否则请保留“builtin”。",
  "memory.citations":
    "控制回复中的引文可见性：“auto”在有用时显示引文，“on”始终显示它们，“off”隐藏它们。为平衡的信噪比默认值保留“auto”。",
  "memory.qmd.command":
    "设置 QMD 后端使用的 `qmd` 二进制文件的可执行路径（默认值：从 PATH 解析）。当存在多个 qmd 安装或不同环境中的 PATH 不同时，使用显式的绝对路径。",
  "memory.qmd.mcporter":
    "通过 mcporter (MCP 运行时)路由 QMD 工作，而不是为每个调用生成 `qmd`。当大型模型上的冷启动成本很高时使用此选项；为更简单的本地设置保留直接进程模式。",
  "memory.qmd.mcporter.enabled":
    "通过 mcporter 守护进程路由 QMD，而不是为每个请求生成 qmd，从而减少大型模型的冷启动开销。除非已安装并配置了 mcporter，否则请保持禁用。",
  "memory.qmd.mcporter.serverName":
    "命名用于 QMD 调用的 mcporter 服务器目标（默认值：qmd）。仅当您的 mcporter 设置为 qmd mcp keep-alive 使用自定义服务器名称时才更改。",
  "memory.qmd.mcporter.startDaemon":
    "当启用由 mcporter 支持的 QMD 模式时，自动启动 mcporter 守护进程（默认值：true）。除非进程生命周期由您的服务主管在外部管理，否则请保持启用。",
  "memory.qmd.searchMode":
    "选择 QMD 检索路径：“query”使用标准查询流，“search”使用面向搜索的检索，“vsearch”强调向量检索。除非调整相关性质量，否则请保留默认值。",
  "memory.qmd.includeDefaultMemory":
    "自动将默认内存文件（MEMORY.md 和 memory/**/*.md）索引到 QMD 集合中。除非您希望仅通过显式自定义路径控制索引，否则请保持启用。",
  "memory.qmd.paths":
    "添加要包含在 QMD 索引中的自定义目录或文件，每个目录或文件都有一个可选的名称和 glob 模式。将其用于位于默认内存路径之外的特定于项目的知识位置。",
  "memory.qmd.paths.path":
    "定义 QMD 应扫描的根位置，使用绝对路径或 `~` 相对路径。使用稳定的目录，以便集合标识在不同环境中不会漂移。",
  "memory.qmd.paths.pattern":
    "使用 glob 模式筛选每个索引根下的文件，默认为 `**/*.md`。当目录包含混合文件类型时，使用更窄的模式以减少噪音和索引成本。",
  "memory.qmd.paths.name":
    "为索引路径设置稳定的集合名称，而不是从文件系统位置派生它。当路径在不同机器上有所不同但您希望集合标识保持一致时使用此选项。",
  "memory.qmd.sessions.enabled":
    "将对话转录本索引到 QMD 中，以便回忆可以包括以前的对话内容（实验性，默认值：false）。仅当需要转录本内存并且您接受更大的索引流失时才启用。",
  "memory.qmd.sessions.exportDir":
    "覆盖在 QMD 索引之前写入已清理的会话导出的位置。当默认状态存储受限或导出必须位于托管卷上时使用此选项。",
  "memory.qmd.sessions.retentionDays":
    "定义在自动修剪之前保留导出的会话文件的时间（以天为单位）（默认值：无限制）。为存储卫生或合规性保留策略设置一个有限值。",
  "memory.qmd.update.interval":
    "设置 QMD 从源内容刷新索引的频率（持续时间字符串，默认值：5m）。较短的间隔可提高新鲜度，但会增加后台 CPU 和 I/O。",
  "memory.qmd.update.debounceMs":
    "设置连续 QMD 刷新尝试之间的最小延迟（以毫秒为单位）（默认值：15000）。如果频繁的文件更改导致更新抖动或不必要的后台负载，请增加此值。",
  "memory.qmd.update.onBoot":
    "在网关启动期间运行一次初始 QMD 更新（默认值：true）。保持启用，以便从新的基线开始回忆；仅当启动速度比立即的新鲜度更重要时才禁用。",
  "memory.qmd.update.waitForBootSync":
    "在初始启动时 QMD 同步完成之前，阻止启动完成（默认值：false）。当您需要在提供流量之前完全最新的回忆时启用，为更快的启动保持关闭。",
  "memory.qmd.update.embedInterval":
    "设置 QMD 重新计算嵌入的频率（持续时间字符串，默认值：60m；设置为 0 以禁用定期嵌入）。较低的间隔可提高新鲜度，但会增加嵌入工作负载和成本。",
  "memory.qmd.update.commandTimeoutMs":
    "设置 QMD 维护命令（例如集合列表/添加）的超时时间（以毫秒为单位）（默认值：30000）。在较慢的磁盘或延迟命令完成的远程文件系统上运行时增加。",
  "memory.qmd.update.updateTimeoutMs":
    "设置每个 `qmd update` 周期的最大运行时间（以毫秒为单位）（默认值：120000）。对于较大的集合，请提高此值；当您希望在自动化中更快地检测到故障时，请降低此值。",
  "memory.qmd.update.embedTimeoutMs":
    "设置每个 `qmd embed` 周期的最大运行时间（以毫秒为单位）（默认值：120000）。对于较重的嵌入工作负载或较慢的硬件，请增加此值，并在严格的 SLA 下快速失败时降低此值。",
  "memory.qmd.limits.maxResults":
    "限制每个回忆请求返回到代理循环中的 QMD 命中数（默认值：6）。增加以获得更广泛的回忆上下文，或减少以保持提示更紧凑和更快。",
  "memory.qmd.limits.maxSnippetChars":
    "限制从 QMD 命中中提取的每个结果片段的长度（以字符为单位）（默认值：700）。当提示迅速膨胀时降低此值，仅当答案始终缺少关键细节时才提高。",
  "memory.qmd.limits.maxInjectedChars":
    "限制在所有命中中可以注入到一回合中的 QMD 文本总量。使用较低的值来控制提示膨胀和延迟；仅当上下文始终被截断时才提高。",
  "memory.qmd.limits.timeoutMs":
    "设置每个查询的 QMD 搜索超时时间（以毫秒为单位）（默认值：4000）。对于较大的索引或较慢的环境，请增加此值，并降低以保持请求延迟有界。",
  "memory.qmd.scope":
    "使用 session.sendPolicy 样式的规则定义哪些会话/频道有资格进行 QMD 回忆。保留默认的仅直接范围，除非您有意希望跨聊天共享内存。",
  "agents.defaults.memorySearch.cache.maxEntries":
    "为 SQLite 中保留的缓存嵌入设置尽力而为的上限。当控制磁盘增长比峰值重新索引速度更重要时使用此选项。",
  "agents.defaults.memorySearch.sync.onSessionStart":
    "在会话开始时触发内存索引同步，以便早期回合可以看到新的内存内容。当启动新鲜度比初始回合延迟更重要时，请保持启用。",
  "agents.defaults.memorySearch.sync.onSearch":
    "通过在检测到内容更改后在搜索上安排重新索引来使用延迟同步。为降低空闲开销保持启用，或者如果您需要在任何查询之前预先同步索引，则禁用。",
  "agents.defaults.memorySearch.sync.watch":
    "监视内存文件并根据文件更改事件（chokidar）安排索引更新。为近乎实时的新鲜度启用；如果监视流失过于嘈杂，则在非常大的工作区上禁用。",
  "agents.defaults.memorySearch.sync.watchDebounceMs":
    "在重新索引运行之前，用于合并快速文件监视事件的去抖动窗口（以毫秒为单位）。增加以减少频繁写入文件的流失，或降低以获得更快的新鲜度。",
  "agents.defaults.memorySearch.sync.sessions.deltaBytes":
    "在会话转录本更改触发重新索引之前，需要至少这么多新附加的字节（默认值：100000）。增加以减少频繁的小型重新索引，或降低以获得更快的转录本新鲜度。",
  "agents.defaults.memorySearch.sync.sessions.deltaMessages":
    "在触发重新索引之前，需要至少这么多附加的转录本消息（默认值：50）。降低此值以获得近乎实时的转录本回忆，或提高它以减少索引流失。",
  ui: "用于在控制界面中显示的强调和助手身份的 UI 表示设置。将其用于品牌和可读性定制，而无需更改运行时行为。",
  "ui.seamColor":
    "UI 界面用于强调、徽章和视觉识别提示的主要强调/接缝颜色。使用在亮/暗主题中保持可读的高对比度值。",
  "ui.assistant":
    "用于在 UI 界面中显示的名称和头像的助手显示身份设置。将这些值与面向操作员的角色和支持期望保持一致。",
  "ui.assistant.name":
    "在 UI 视图、聊天 chrome 和状态上下文中显示的助手的显示名称。保持此名称稳定，以便操作员可以可靠地识别哪个助手角色处于活动状态。",
  "ui.assistant.avatar":
    "在 UI 界面中使用的助手头像图像源（URL、路径或数据 URI，具体取决于运行时支持）。使用受信任的资产和一致的品牌维度以实现清晰的渲染。",
  plugins:
    "用于启用扩展、限制加载范围、配置条目和跟踪安装的插件系统控件。在生产环境中保持插件策略明确且权限最少。",
  "plugins.enabled":
    "在启动和配置重新加载期间全局启用或禁用插件/扩展加载（默认值：true）。仅当您的部署需要扩展功能时才保持启用。",
  "plugins.allow":
    "可选的插件 ID 允许列表；设置后，只有列出的插件才有资格加载。在受控环境中使用此选项来强制执行已批准的扩展清单。",
  "plugins.deny":
    "可选的插件 ID 拒绝列表，即使允许列表或路径包含它们，也会被阻止。对有风险的插件使用拒绝规则进行紧急回滚和硬阻止。",
  "plugins.load":
    "用于指定发现插件的文件系统路径的插件加载器配置组。保持加载路径明确并经过审查，以避免意外加载不受信任的扩展。",
  "plugins.load.paths":
    "加载器扫描的除内置默认值之外的其他插件文件或目录。使用专用的扩展目录，并避免使用包含不相关可执行内容的广泛路径。",
  "plugins.slots":
    "选择哪些插件拥有独占的运行时插槽，例如内存，以便只有一个插件提供该功能。使用显式的插槽所有权以避免具有冲突行为的重叠提供商。",
  "plugins.slots.memory": "按 ID 选择活动的内存插件，或使用“none”禁用内存插件。",
  "plugins.slots.contextEngine": "按 ID 选择活动的上下文引擎插件，以便一个插件提供上下文编排行为。",
  "plugins.entries":
    "按插件 ID 键入的每个插件的设置，包括启用和插件特定的运行时配置有效负载。将其用于范围内的插件调整，而无需更改全局加载器策略。",
  "plugins.entries.*.enabled":
    "特定条目的每个插件启用覆盖，在全局插件策略之上应用（需要重新启动）。使用此选项可在不同环境中逐步推出插件。",
  "plugins.entries.*.hooks":
    "用于核心强制安全门控的每个插件类型的钩子策略控件。使用此选项可限制高影响的钩子类别，而无需禁用整个插件。",
  "plugins.entries.*.hooks.allowPromptInjection":
    "控制此插件是否可以通过类型化的钩子改变提示。设置为 false 以阻止 `before_prompt_build` 并忽略来自旧版 `before_agent_start` 的改变提示的字段，同时保留旧版 `modelOverride` 和 `providerOverride` 行为。",
  "plugins.entries.*.apiKey":
    "插件使用的可选 API 密钥字段，接受条目设置中的直接密钥配置。使用秘密/环境变量替换，并避免将真实凭据提交到配置文件中。",
  "plugins.entries.*.env":
    "仅为该插件运行时上下文注入的每个插件的环境变量映射。使用此选项将提供商凭据范围限定为一个插件，而不是共享全局进程环境。",
  "plugins.entries.*.config":
    "由该插件自己的模式和验证规则解释的插件定义的配置有效负载。仅使用插件中记录的字段，以防止被忽略或无效的设置。",
  "plugins.installs": "CLI 管理的安装元数据（由 `openclaw plugins update` 用于定位安装源）。",
  "plugins.installs.*.source": "安装源（“npm”、“archive”或“path”）。",
  "plugins.installs.*.spec": "用于安装的原始 npm 规范（如果源是 npm）。",
  "plugins.installs.*.sourcePath": "用于安装的原始存档/路径（如果有）。",
  "plugins.installs.*.installPath": "解析的安装目录（通常是 ~/.openclaw/extensions/<id>）。",
  "plugins.installs.*.version": "安装时记录的版本（如果可用）。",
  "plugins.installs.*.resolvedName": "从获取的工件中解析的 npm 包名称。",
  "plugins.installs.*.resolvedVersion": "从获取的工件中解析的 npm 包版本（对于非固定规范很有用）。",
  "plugins.installs.*.resolvedSpec": "从获取的工件中解析的精确 npm 规范（<name>@<version>）。",
  "plugins.installs.*.integrity": "获取的工件的解析的 npm dist 完整性哈希（如果由 npm 报告）。",
  "plugins.installs.*.shasum": "获取的工件的解析的 npm dist shasum（如果由 npm 报告）。",
  "plugins.installs.*.resolvedAt": "此安装记录的 npm 包元数据上次解析的 ISO 时间戳。",
  "plugins.installs.*.installedAt": "上次安装/更新的 ISO 时间戳。",
  "agents.list.*.identity.avatar": "智能体头像（工作区相对路径、http(s) URL 或 data URI）。",
  "agents.defaults.model.primary": "主模型（提供商/模型）。",
  "agents.defaults.model.fallbacks": "有序的备用模型列表（提供商/模型）。当主模型失败时使用。",
  "agents.defaults.imageModel.primary":
    "可选的图像模型（提供商/模型），当主模型缺少图像输入功能时使用。",
  "agents.defaults.imageModel.fallbacks": "有序的备用图像模型列表（提供商/模型）。",
  "agents.defaults.pdfModel.primary":
    "用于 PDF 分析工具的可选 PDF 模型（提供商/模型）。默认回退到图像模型，然后是会话模型。",
  "agents.defaults.pdfModel.fallbacks": "有序的备用 PDF 模型列表（提供商/模型）。",
  "agents.defaults.pdfMaxBytesMb": "PDF 工具的最大 PDF 文件大小（以兆字节为单位，默认值：10）。",
  "agents.defaults.pdfMaxPages": "PDF 工具处理的最大 PDF 页数（默认值：20）。",
  "agents.defaults.imageMaxDimensionPx":
    "清理转录/工具结果图像负载时的最大图像边长（以像素为单位，默认值：1200）。",
  "agents.defaults.cliBackends": "可选的纯文本回退 CLI 后端（claude-cli 等）。",
  "agents.defaults.compaction":
    "上下文接近令牌限制时的压缩调优，包括历史记录份额、预留空间和压缩前内存刷新行为。当长时间运行的会话需要在紧凑的上下文窗口下保持稳定的连续性时使用。",
  "agents.defaults.compaction.mode":
    '压缩策略模式："default"使用基线行为，"safeguard"应用更严格的护栏以保留最近的上下文。除非观察到接近限制边界时历史记录丢失严重，否则保持"default"。',
  "agents.defaults.compaction.reserveTokens":
    "压缩运行后为回复生成和工具输出预留的令牌空间。对于详细/工具密集型会话使用较高的预留值，当最大化保留历史记录更重要时使用较低的预留值。",
  "agents.defaults.compaction.keepRecentTokens":
    "压缩期间从最近的对话窗口中保留的最小令牌预算。使用较高的值保护即时上下文连续性，较低的值保留更多长尾历史记录。",
  "agents.defaults.compaction.reserveTokensFloor":
    "Pi 压缩路径中 reserveTokens 的最小下限（0 禁用下限保护）。使用非零下限以避免在波动的令牌估计下过度压缩。",
  "agents.defaults.compaction.maxHistoryShare":
    "压缩后保留历史记录允许占总上下文预算的最大比例（范围 0.1-0.9）。较低的份额提供更多生成空间，较高的份额提供更深的历史连续性。",
  "agents.defaults.compaction.identifierPolicy":
    '压缩摘要的标识符保留策略："strict"预置内置的不透明标识符保留指导（默认），"off"禁用此前缀，"custom"使用 identifierInstructions。除非有特定的兼容性需求，否则保持"strict"。',
  "agents.defaults.compaction.identifierInstructions":
    '当 identifierPolicy="custom" 时使用的自定义标识符保留指令文本。保持明确且注重安全性，以确保压缩摘要不会重写不透明 ID、URL、主机或端口。',
  "agents.defaults.compaction.recentTurnsPreserve":
    "在安全模式摘要之外逐字保留的最近用户/助手对话轮数（默认值：3）。提高此值以保留确切的最近对话上下文，降低以最大化压缩节省。",
  "agents.defaults.compaction.qualityGuard":
    "安全模式压缩摘要的可选质量审计重试设置。除非您明确需要摘要审计和失败检查时的一次性重新生成，否则请保持禁用。",
  "agents.defaults.compaction.qualityGuard.enabled":
    "启用安全模式压缩的摘要质量审计和重新生成重试。默认值：false，因此安全模式本身不会启用重试行为。",
  "agents.defaults.compaction.qualityGuard.maxRetries":
    "安全模式摘要质量审计失败后的最大重新生成重试次数。使用较小的值以限制额外的延迟和令牌成本。",
  "agents.defaults.compaction.postCompactionSections":
    '压缩后重新注入的 AGENTS.md H2/H3 章节名称，以便智能体重新运行关键的启动指导。留空则使用 "Session Startup"/"Red Lines"（兼容回退为 "Every Session"/"Safety"）；设置为 [] 以完全禁用重新注入。',
  "agents.defaults.compaction.model":
    "仅用于压缩摘要的可选提供商/模型覆盖。当您希望压缩在与会话默认模型不同的模型上运行时设置此项，留空则继续使用主智能体模型。",
  "agents.defaults.compaction.memoryFlush":
    "压缩前内存刷新设置，在大规模压缩之前运行代理式内存写入。对于长时间会话保持启用，以便在积极裁剪之前持久化重要的上下文。",
  "agents.defaults.compaction.memoryFlush.enabled":
    "在运行时接近令牌限制执行更强的历史记录缩减之前启用压缩前内存刷新。除非您有意在受限环境中禁用内存副作用，否则保持启用。",
  "agents.defaults.compaction.memoryFlush.softThresholdTokens":
    "触发压缩前内存刷新执行的到压缩的阈值距离（以令牌为单位）。使用较早的阈值以获得更安全的持久化，或使用较紧的阈值以降低刷新频率。",
  "agents.defaults.compaction.memoryFlush.forceFlushTranscriptBytes":
    '当转录文件大小达到此阈值时强制执行压缩前内存刷新（字节或如 "2mb" 的字符串）。使用此项防止长时间会话在令牌计数器过时时挂起；设置为 0 以禁用。',
  "agents.defaults.compaction.memoryFlush.prompt":
    "生成内存候选项时用于压缩前内存刷新轮次的用户提示模板。仅当您需要超出默认内存刷新行为的自定义提取指令时使用。",
  "agents.defaults.compaction.memoryFlush.systemPrompt":
    "压缩前内存刷新轮次的系统提示覆盖，用于控制提取样式和安全约束。请谨慎使用，以确保自定义指令不会降低内存质量或泄露敏感上下文。",
  "agents.defaults.embeddedPi":
    "嵌入式 Pi 运行器加固控制，用于决定在 OpenClaw 会话中如何信任和应用工作区本地 Pi 设置。",
  "agents.defaults.embeddedPi.projectSettingsPolicy":
    '嵌入式 Pi 如何处理工作区本地 `.pi/config/settings.json`："sanitize"（默认）剥离 shellPath/shellCommandPrefix，"ignore" 完全禁用项目设置，"trusted" 按原样应用项目设置。',
  "agents.defaults.humanDelay.mode": '块回复的延迟样式（"off"、"natural"、"custom"）。',
  "agents.defaults.humanDelay.minMs": "自定义 humanDelay 的最小延迟（毫秒，默认值：800）。",
  "agents.defaults.humanDelay.maxMs": "自定义 humanDelay 的最大延迟（毫秒，默认值：2500）。",
  commands:
    "控制所有提供商的聊天命令界面、所有者门控和提权命令访问行为。除非您需要更严格的操作员控制或更广泛的命令可用性，否则请保持默认值。",
  "commands.native":
    "在支持命令注册的频道（Discord、Slack、Telegram）中注册原生斜杠/菜单命令。除非您有意运行仅限文本的命令工作流，否则请保持启用以提高可发现性。",
  "commands.nativeSkills":
    "注册原生技能命令，以便用户可以在支持的提供商命令菜单中直接调用技能。请与您的技能策略保持一致，以便公开的命令符合操作员的预期。",
  "commands.text":
    "除了原生命令界面外，还在支持的聊天输入中启用文本命令解析。为了在不支持原生命令注册的频道中保持兼容性，请保持启用。",
  "commands.bash":
    "允许 bash 聊天命令（`!`；`/bash` 别名）运行主机 shell 命令（默认值：false；需要 tools.elevated）。",
  "commands.bashForegroundMs":
    "bash 在转入后台前的等待时间（毫秒，默认值：2000；0 立即转入后台）。",
  "commands.config": "允许 /config 聊天命令读取/写入磁盘上的配置（默认值：false）。",
  "commands.debug": "允许 /debug 聊天命令进行仅限运行时的覆盖（默认值：false）。",
  "commands.restart": "允许 /restart 和网关重启工具操作（默认值：true）。",
  "commands.useAccessGroups": "对命令实施访问组允许列表/策略。",
  "commands.ownerAllowFrom":
    "所有者专用工具/命令的显式所有者允许列表。使用频道原生 ID（可选前缀，如 \"whatsapp:+15551234567\"）。忽略 '*'。",
  "commands.ownerDisplay":
    "控制所有者 ID 在系统提示符中的渲染方式。允许值：raw、hash。默认值：raw。",
  "commands.ownerDisplaySecret":
    "当 ownerDisplay=hash 时用于 HMAC 哈希所有者 ID 的可选密钥。建议使用环境变量替换。",
  "commands.allowFrom":
    "为所有者级命令界面定义按频道和发送者的提权命令允许规则。使用精确的提供商特定身份，以免将特权命令暴露给广泛的聊天受众。",
  session:
    "对话历史行为的全局会话路由、重置、传送策略和维护控制。除非您需要更严格的隔离、保留或传送约束，否则请保持默认值。",
  "session.scope":
    '设置基础会话分组策略："per-sender" 按发送者隔离，"global" 每个频道上下文共享一个会话。为了更安全的多用户行为，请保持 "per-sender"，除非需要有意的共享上下文。',
  "session.dmScope":
    '私聊会话范围："main" 保持连续性，而 "per-peer"、"per-channel-peer" 和 "per-account-channel-peer" 增加隔离度。在共享收件箱或多账号部署中使用隔离模式。',
  "session.identityLinks":
    "将规范身份映射到带提供商前缀的同伴 ID，以便等效用户解析为同一个私聊线程（例如：telegram:123456）。当同一个自然人出现在多个频道或账号中时使用此项。",
  "session.resetTriggers":
    "列出在入站内容中匹配时强制重置会话的消息触发器。请谨慎使用显式重置短语，以免在正常对话中意外丢失上下文。",
  "session.idleMinutes":
    "应用传统的分钟级空闲重置窗口，用于跨非活动间隙的会话复用行为。仅为了兼容性而使用此项，建议优先使用 session.reset/session.resetByType 下的结构化重置策略。",
  "session.reset":
    "定义在不应用特定类型或特定频道覆盖时使用的默认重置策略对象。请先设置此项，然后仅在行为必须不同时叠加 resetByType 或 resetByChannel。",
  "session.reset.mode":
    '选择重置策略："daily" 在配置的小时重置，"idle" 在非活动窗口后重置。每个策略保持一个清晰的模式，以避免令人惊讶的上下文轮转。',
  "session.reset.atHour":
    "设置每日重置模式的本地小时边界（0-23），以便会话在可预测的时间滚动。与 mode=daily 配合使用，并符合操作员的时区预期。",
  "session.reset.idleMinutes":
    "设置重置前的非活动窗口（空闲模式），也可以作为每日模式的次要护栏。使用较大的值以保留连续性，或使用较小的值以获得更新鲜的短周期线程。",
  "session.resetByType":
    "当默认设置不足时，按聊天类型（私聊、群组、线程）覆盖重置行为。当群组/线程流量需要与私聊不同的重置节奏时使用此项。",
  "session.resetByType.direct":
    "定义私聊的重置策略，并取代该类型的基本 session.reset 配置。将其作为规范的私聊覆盖，而不是使用过时的 dm 别名。",
  "session.resetByType.dm":
    "已弃用的私聊重置行为别名，保留以兼容旧配置。请改用 session.resetByType.direct，以便未来的工具和验证保持一致。",
  "session.resetByType.group":
    "定义群聊会话的重置策略，群聊的连续性和噪声模式与私聊不同。如果上下文偏移成为问题，请为繁忙的群组使用较短的空闲窗口。",
  "session.resetByType.thread":
    "定义线程级会话（包括聚焦频道线程工作流）的重置策略。当线程会话应比其他聊天类型更快或更慢过期时使用。",
  "session.resetByChannel":
    "提供按提供商/频道 ID 分组的特定频道重置覆盖，用于精细的行为控制。仅当某个频道需要超出类型级策略的例外重置行为时才使用此项。",
  "session.store":
    "设置用于跨重启持久化会话记录的会话存储文件路径。仅当您需要自定义磁盘布局、备份路由或挂载卷存储时才使用显式路径。",
  "session.typingIntervalSeconds":
    "控制在支持正在输入状态的频道中准备回复时，重复发送正在输入指示器的间隔。增大间隔以减少频繁更新，或减小以获得更活跃的输入反馈。",
  "session.typingMode":
    '控制正在输入行为的时机：根据发送点选择 "never"、"instant"、"thinking" 或 "message"。在流量较大的频道中保持保守模式，以避免不必要的噪声。',
  "session.parentForkMaxTokens":
    "允许线程/会话继承分支的最大父会话令牌数。如果父会话超过此限制，OpenClaw 将启动新的线程会话而不是分支；设置为 0 以禁用此保护。",
  "session.mainKey":
    '当 dmScope 或路由逻辑指向 "main" 时，覆盖用于保持连续性的规范主会话密钥。仅在您有意需要自定义会话锚定时使用稳定值。',
  "session.sendPolicy":
    "使用针对频道、聊天类型和密钥前缀评估的允许/拒绝规则，控制跨会话发送权限。在复杂环境中，使用此项来界定会话工具可以投递消息的范围。",
  "session.sendPolicy.default":
    '当没有匹配的 sendPolicy 规则时的备用操作："allow" 或 "deny"。对于简单配置请保持 "allow"，当您要求每个目的地都有显式允许规则时请选择 "deny"。',
  "session.sendPolicy.rules":
    '在默认操作之前评估的有序允许/拒绝规则，例如 `{ action: "deny", match: { channel: "discord" } }`。将最具体的规则放在前面，以免宽泛的规则掩盖例外情况。',
  "session.sendPolicy.rules[].action":
    '当满足相应的匹配条件时，将规则决策定义为 "allow" 或 "deny"。在通过显式允许例外强制执行严格边界时，请使用拒绝优先的顺序。',
  "session.sendPolicy.rules[].match":
    "定义可以组合频道、聊天类型和密钥前缀约束的可选规则匹配条件。保持匹配范围狭窄，以确保策略意图清晰且调试简单。",
  "session.sendPolicy.rules[].match.channel":
    "将规则应用匹配到特定的频道/提供商 ID（例如 discord、telegram、slack）。当某个频道应独立于其他频道允许或拒绝投递时使用此项。",
  "session.sendPolicy.rules[].match.chatType":
    "将规则应用匹配到聊天类型（私聊、群组、线程），以便行为随对话形式而变化。当私聊和群组目的地需要不同的安全边界时使用此项。",
  "session.sendPolicy.rules[].match.keyPrefix":
    "匹配策略使用者内部密钥规范化步骤后的规范化会话密钥前缀。用于通用前缀控制，当需要精确的全密钥匹配时建议优先使用 rawKeyPrefix。",
  "session.sendPolicy.rules[].match.rawKeyPrefix":
    "匹配用于精确全密钥策略定位的原始、未规范化的会话密钥前缀。当规范化的 keyPrefix 太宽泛，且您需要智能体前缀或传输特定精度时使用。",
  "session.agentToAgent":
    "对智能体间会话交换的控制进行分组，包括对回复链的防环限制。除非您运行具有严格轮次上限的高级智能体间自动化，否则请保持默认值。",
  "session.agentToAgent.maxPingPongTurns":
    "智能体间交换期间请求者和目标智能体之间的最大双向回复轮数 (0-5)。使用较低的值来硬性限制对话循环并保持可预测的运行完成。",
  "session.threadBindings":
    "在支持线程聚焦工作流的提供商之间共享的线程绑定会话路由行为默认值。在此配置全局默认值，仅在行为不同时在每个频道进行覆盖。",
  "session.threadBindings.enabled":
    "线程绑定会话路由特性和聚焦线程投递行为的全局总开关。除非您需要全局禁用线程绑定，否则请为现代线程工作流保持启用。",
  "session.threadBindings.idleHours":
    "跨提供商/频道的线程绑定会话默认非活动窗口（小时，0 禁用自动取消聚焦）。默认值：24。",
  "session.threadBindings.maxAgeHours":
    "跨提供商/频道的线程绑定会话的可选硬性最大时长（小时，0 禁用硬性限制）。默认值：0。",
  "session.maintenance":
    "自动会话存储维护控制，用于清理时限、条目上限和文件轮转行为。先以警告模式启动以观察影响，然后在阈值调整好后强制执行。",
  "session.maintenance.mode":
    '决定维护策略是仅报告 ("warn") 还是主动应用 ("enforce")。在部署期间保持 "warn"，在验证安全阈值后切换到 "enforce"。',
  "session.maintenance.pruneAfter":
    "在维护期间删除超过此持续时间（例如 `30d` 或 `12h`）的条目。将其作为主要的保留时限控制，并与数据保留策略保持一致。",
  "session.maintenance.pruneDays":
    "已弃用的保留时限字段，保留以兼容使用天数的旧配置。请改用 session.maintenance.pruneAfter，以便持续时间语法和行为保持一致。",
  "session.maintenance.maxEntries":
    "限制存储中保留的总会话条目数，以防止随时间推移出现无限增长。在受限环境中使用较低的限制，在需要较长历史记录时使用较高的限制。",
  "session.maintenance.rotateBytes":
    "当文件大小超过阈值（如 `10mb` 或 `1gb`）时轮转会话存储。用于限制单文件增长并保持备份/恢复操作可管理。",
  "session.maintenance.resetArchiveRetention":
    "重置转录存档 (`*.reset.<timestamp>`) 的保留期。接受持续时间（如 `30d`），或 `false` 以禁用清理。默认与 pruneAfter 一致，以免重置产物无限增长。",
  "session.maintenance.maxDiskBytes":
    "每个智能体会话目录的可选磁盘预算（例如 `500mb`）。用于限制每个智能体的会话存储；超过时，警告模式会报告压力，强制模式会执行最早优先的清理。",
  "session.maintenance.highWaterBytes":
    "磁盘预算清理后的目标大小（高水位线）。默认为 maxDiskBytes 的 80%；在受限磁盘上可显式设置为更紧凑的清理行为。",
  cron: "存储的定时任务、运行并发性、传送回退和运行会话保留的全局调度器设置。除非您正在扩展任务量或集成外部 Webhook 接收器，否则请保持默认值。",
  "cron.enabled":
    "启用由网关管理的存储任务计划的正时任务执行。为正常的提醒/自动化流程保持启用点，仅在不删除任务的情况下暂停所有正时任务执行时才禁用。",
  "cron.store":
    "用于跨重启持久化计划任务的任务存储文件路径。仅当您需要自定义存储布局、备份或挂载卷时才设置显式路径。",
  "cron.maxConcurrentRuns":
    "限制当多个计划同时触发时可以同时执行多少个定时任务。在重型自动化负载下使用较低的值以保护 CPU/内存，或在需要更高吞吐量时谨慎提高。",
  "cron.retry":
    "覆盖单次任务在因瞬态错误（频率限制、过载、网络、服务器错误）失败时的默认重试策略。省略则使用默认值：最大尝试次数 3，退避时间 [30000, 60000, 300000]，重试所有瞬态类型。",
  "cron.retry.maxAttempts": "单次任务在发生永久禁用前的最大瞬态错误重试次数（默认值：3）。",
  "cron.retry.backoffMs":
    "每次重试尝试的退避延迟（毫秒，默认值：[30000, 60000, 300000]）。使用较短的值以加快重试速度。",
  "cron.retry.retryOn":
    "要重试的错误类型：rate_limit、overloaded、network、timeout、server_error。用于限制哪些错误触发重试；省略则重试所有瞬态类型。",
  "cron.webhook":
    '已弃用的旧版备用 Webhook URL，仅用于 `notify=true` 的旧任务。请通过 `delivery.mode="webhook"` 加 `delivery.to` 迁移到按任务传送，并避免依赖此全局字段。',
  "cron.webhookToken":
    "使用 Webhook 模式时附带在正时任务 Webhook POST 投递中的 Bearer 令牌。建议使用密钥/环境变量替换，并在 Webhook 端点可从互联网访问时定期轮换此令牌。",
  "cron.sessionRetention":
    "控制已完成的定时任务运行会话在清理前的保留时间（`24h`、`7d`、`1h30m` 或 `false` 禁用清理；默认值：`24h`）。在任务触发频率较高时使用较短的保留时间以减少存储增长。",
  "cron.runLog":
    "位于 `cron/runs/<jobId>.jsonl` 下的单个定时任务运行历史文件的清理控制，包括大小和行数保留。",
  "cron.runLog.maxBytes":
    "每个定时任务运行日志文件在重写为最后 keepLines 条记录前的最大字节数（例如 `2mb`，默认值 `2000000`）。",
  "cron.runLog.keepLines":
    "当文件超过 maxBytes 时保留的末尾日志条数（默认值 `2000`）。增大以获得更长的取证历史，或者为了减小磁盘压力而降低。",
  hooks:
    "入站 Webhook 自动化界面，用于将外部事件映射到 OpenClaw 会话中的唤醒或智能体操作。在将其暴露在信任网络之外之前，请使用显式的令牌/会话/智能体控制进行锁定。",
  "hooks.enabled":
    "启用入站 Webhook 请求的端点和映射执行管道。除非您正在主动将外部事件路由到网关，否则请保持禁用。",
  "hooks.path":
    "网关控制服务器上 Webhook 端点使用的 HTTP 路径（例如 `/hooks`）。使用不可猜测的路径并结合令牌验证进行深度防御。",
  "hooks.token":
    "入站 Webhook 在映射运行前检查的共享 Bearer 令牌。建议使用环境变量替换，并在 Webhook 端点可从互联网访问时定期轮换。",
  "hooks.defaultSessionKey":
    "当请求未通过允许渠道提供会话密钥时使用的备用会话密钥。使用稳定且有范围限制的密钥，以避免混合不相关的自动化对话。",
  "hooks.allowRequestSessionKey":
    "当为 true 时，允许调用者在 Webhook 请求中提供会话密钥，从而实现调用者控制的路由。除非受信任的集成商显式需要自定义会话线程，否则请保持为 false。",
  "hooks.allowedSessionKeyPrefixes":
    "当启用调用者提供密钥时，入站 Webhook 请求接受的会话密钥前缀允许列表。使用狭窄的前缀以防止任意会话密钥注入。",
  "hooks.allowedAgentIds":
    "在选择执行智能体时，Webhook 映射允许靶向的智能体 ID 允许列表。用于将自动化事件限制在专用的服务智能体内。",
  "hooks.maxBodyBytes":
    "请求被拒绝前接受的最大 Webhook 负载大小（字节）。保持限制以降低滥用风险并在突发集成下保护内存使用。",
  "hooks.presets":
    "加载时应用的命名 Webhook 预设包，用于生成标准映射和行为默认值。保持预设使用显式，以便操作员可以审计哪些自动化处于活动状态。",
  "hooks.transformsDir":
    "映射 transform.module 路径引用的 Webhook 转换模块的基础目录。使用受控的仓库目录，以确保动态导入可审计且可预测。",
  "hooks.mappings":
    "有序的映射规则，用于匹配入站 Webhook 请求并选择唤醒或智能体操作以及可选的投递路由。请先使用具体的映射，以避免宽泛的模式规则捕获所有内容。",
  "hooks.mappings[].id":
    "用于审计、故障排除和定向更新的 Webhook 映射条目的可选稳定标识符。使用唯一的 ID 以便日志和配置差异能清晰地引用映射。",
  "hooks.mappings[].match":
    "映射匹配条件的组合对象，如路径和来源，在应用操作路由前进行评估。保持匹配标准具体，以免不相关的 Webhook 流量触发自动化。",
  "hooks.mappings[].match.path":
    "Webhook 映射的路径匹配条件，通常与入站请求路径进行比较。用于按 Webhook 端点路径族拆分自动化行为。",
  "hooks.mappings[].match.source":
    "Webhook 映射的来源匹配条件，通常由受信任的上游元数据或适配器逻辑设置。使用稳定的来源标识符，以便路由在重试时保持确定性。",
  "hooks.mappings[].action":
    '映射操作类型："wake" 触发智能体唤醒流程，而 "agent" 直接发送到智能体处理。使用 "agent" 进行即时执行，在倾向于心跳驱动的处理时使用 "wake" Chicago。',
  "hooks.mappings[].wakeMode":
    '唤醒调度模式："now" 立即唤醒，而 "next-heartbeat" 推迟到下一个心跳周期。对可以忍受轻微延迟的低优先级自动化使用推迟模式。',
  "hooks.mappings[].name":
    "用于诊断和面向操作员配置 UI 的人性化映射显示名称。保持名称简洁且具有描述性，以便在事件审查期间路由意图显而易见。",
  "hooks.mappings[].agentId":
    "当操作路由不应使用默认值时，映射执行的目标智能体 ID。使用专用的自动化智能体来隔离 Webhook 行为与交互式操作员会话。",
  "hooks.mappings[].sessionKey":
    "用于控制线程连续性的映射消息显式会话密钥覆盖。使用稳定且有范围限制的密钥，以便重复事件相关联而不会泄露到不相关的对话中。",
  "hooks.mappings[].messageTemplate":
    "用于将结构化映射输入合成到发送给目标操作路径的最终消息内容的模板。保持模板确定性，以便下游解析和行为保持稳定。",
  "hooks.mappings[].textTemplate":
    "当不需要丰富负载渲染或不支持时使用的纯文本回退模板。用于为聊天投递界面提供简洁一致的摘要字符串。",
  "hooks.mappings[].deliver":
    "控制是将映射执行结果传送回频道目的地，还是静默处理。对于不应发布面向用户输出的后台自动化，请禁用传送。",
  "hooks.mappings[].allowUnsafeExternalContent":
    "为 true 时，映射内容可能在生成的请求中包含清理程度较低的外部负载数据。默认保持 false，仅对经过审查转换逻辑的受信任来源启用。",
  "hooks.mappings[].channel":
    '映射输出的投递频道覆盖（例如 "last"、"telegram"、"discord"、"slack"、"signal"、"imessage" 或 "msteams"）。保持频道覆盖显式，以避免意外的跨频道发送。',
  "hooks.mappings[].to":
    "当映射回复应路由到固定目标时，所选频道内的目的地标识符。在启用生产映射前，请验证提供商特定的目的地格式。",
  "hooks.mappings[].model":
    "映射触发运行的可选模型覆盖，用于自动化需要与智能体默认模型不同的模型时。请谨慎使用，以确保不同映射执行之间的行为可预测。",
  "hooks.mappings[].thinking":
    "映射触发运行的可选思维能力覆盖，用于调整延迟与推理深度。除非明确需要更深的推理，否则对于高流量 Webhook 请保持低或最简等级。",
  "hooks.mappings[].timeoutSeconds":
    "映射操作执行在应用超时处理前允许的最大运行时间。为高流量 Webhook 来源使用更紧凑的限制，以防止队列堆积。",
  "hooks.mappings[].transform":
    "定义映射操作处理前的模块/导出预处理功能转换块。仅在经过审查的代码路径中使用，并保持行为确定性以实现可重复的自动化。",
  "hooks.mappings[].transform.module":
    "从 hooks.transformsDir 加载的相对转换模块路径，用于在传送前重写传入负载。保持模块本地化、经过审查且无路径穿越模式。",
  "hooks.mappings[].transform.export":
    "从转换模块中调用的命名导出；省略时默认为模块的默认导出。当一个文件托管多个转换处理器时设置此项。",
  "hooks.gmail":
    "用于 Pub/Sub 通知和可选本地回调服务的 Gmail 推送集成设置。尽可能将此项限制在专用的 Gmail 自动化账号中。",
  "hooks.gmail.account":
    "在此 Webhook 集成中用于 Gmail watch/订阅操作的 Google 账号标识符。使用专用的自动化邮箱账号来隔离操作系统权限。",
  "hooks.gmail.label":
    "可选的 Gmail 标签过滤器，限制哪些带标签的消息触发 Webhook 事件。保持过滤器范围狭窄，以免在自动化中充斥不相关的收件箱流量。",
  "hooks.gmail.topic":
    "Gmail watch 用于向此账号发布更改通知的 Google Pub/Sub 主题名称。在启用 watch 前，请确保主题 IAM 授予了 Gmail 发布权限。",
  "hooks.gmail.subscription":
    "网关用于接收来自配置主题的 Gmail 更改通知的 Pub/Sub 订阅。保持订阅归属清晰，以免多个消费者出现意外竞争。",
  "hooks.gmail.hookUrl":
    "Gmail 或中间件调用的公共回调 URL，用于将通知投递到此 Webhook 管道。通过令牌验证和受限的网络暴露来保护此 URL。",
  "hooks.gmail.includeBody":
    "为 true 时，获取并包含电子邮件正文内容供下游映射/智能体处理。除非需要正文文本，否则请保持 false，因为这会增加负载大小和敏感性。",
  "hooks.gmail.allowUnsafeExternalContent":
    "启用时允许清理程度较低的外部 Gmail 内容进入处理流程。为了更安全的默认设置请保持禁用，仅对具有受控转换的受信任邮件流启用。",
  "hooks.gmail.serve":
    "本地回调服务器设置块，用于在无独立入口层的情况下直接接收 Gmail 通知。仅当此进程应自行终止 Webhook 流量时启用。",
  "hooks.gmail.pushToken":
    "处理通知前 Gmail 推送 Webhook 回调要求的共享机密令牌。建议使用环境变量替换，并在回调端点暴露在外部时进行轮换。",
  "hooks.gmail.maxBytes":
    "启用 includeBody 时，每个事件处理的最大 Gmail 负载字节数。保持保守限制以降低处理超大消息的成本和风险。",
  "hooks.gmail.renewEveryMinutes":
    "Gmail watch 订阅的更新频率（分钟），以防止过期。设置在提供商过期窗口以下，并在日志中监控更新失败。",
  "hooks.gmail.serve.bind":
    "在直接提供回调时，本地 Gmail 回调 HTTP 服务器的监听地址。除非有意需要外部进入，否则请保持仅监听回环地址。",
  "hooks.gmail.serve.port":
    "启用服务模式时本地 Gmail 回调 HTTP 服务器的端口。使用专用端口以避免与网关/控制界面冲突。",
  "hooks.gmail.serve.path":
    "接受推送通知的本地 Gmail 回调服务器上的 HTTP 路径。保持与订阅配置一致，以免丢失事件。",
  "hooks.gmail.tailscale.mode":
    'Gmail 回调的 Tailscale 暴露模式："off"、"serve" 或 "funnel"。对私有 tailnet 投递使用 "serve"，仅在需要公共互联网入口时使用 "funnel"。',
  "hooks.gmail.tailscale":
    "用于通过 Serve/Funnel 路由发布 Gmail 回调的 Tailscale 暴露配置块。在启用任何公共入口路径前，请先使用私有 tailnet 模式。",
  "hooks.gmail.tailscale.path":
    "启用时 Tailscale Serve/Funnel 发布的用于 Gmail 回调转发的路径。保持与 Gmail Webhook 配置一致，以便请求到达预期的处理器。",
  "hooks.gmail.tailscale.target":
    "Tailscale Serve/Funnel 转发的本地服务目标（例如 http://127.0.0.1:8787）。使用明确的回环目标以避免歧义路由。",
  "hooks.gmail.model":
    "当邮箱自动化应使用专用模型行为时，Gmail 触发运行的可选模型覆盖。保持未设置以继承智能体默认值，除非邮箱任务需要特殊化。",
  "hooks.gmail.thinking":
    'Gmail 驱动的智能体运行思维能力覆盖："off"、"minimal"、"low"、"medium" 或 "high"。对常规收件箱自动化保持适度的默认值，以控制成本和延迟。',
  "hooks.internal":
    "从模块路径加载的捆绑/自定义事件处理器的内部 Webhook 运行时设置。用于受信任的进程内自动化，并保持处理器加载范围受到严格限制。",
  "hooks.internal.enabled":
    "启用内部 Webhook 运行时中内部处理器和已配置条目的处理。除非有意配置了内部 Webhook 处理器，否则请保持禁用。",
  "hooks.internal.handlers":
    "将事件名称映射到模块及可选导出的内部事件处理器列表。保持处理器定义显式，以便事件到代码的路由可审计。",
  "hooks.internal.handlers[].event":
    "由运行时触发此处理器模块的内部事件名称。使用稳定的事件命名规范，以避免跨处理器意外重叠。",
  "hooks.internal.handlers[].module":
    "运行时加载的内部 Webhook 处理器实现的受控相对模块路径。保持模块文件在经过审查的目录中，并避免动态路径组合。",
  "hooks.internal.handlers[].export":
    "当不使用模块默认导出时，内部 Webhook 处理函数的命名导出。当一个模块提供多个处理器入口点时设置此项。",
  "hooks.internal.entries":
    "用于注册具体运行时处理器和元数据的已配置内部 Webhook 条目记录。保持条目显式且具有版本控制，以便生产行为可审计。",
  "hooks.internal.load":
    "内部 Webhook 加载器设置，控制启动时在何处发现处理器模块。使用受限的加载根目录，以减少意外的模块冲突或掩盖。",
  "hooks.internal.load.extraDirs":
    "除默认加载路径外，搜索内部 Webhook 模块的其他目录。保持最简且受控，以减少意外的模块掩盖。",
  "hooks.internal.installs":
    "内部 Webhook 模块的安装元数据，包括源和解析后的产物，用于可重复部署。将其作为操作来源证明，并避免手动偏移修改。",
  messages:
    "入站/出站聊天流的消息格式、确认、队列、去抖和状态反应行为。当频道响应性或消息体验需要调整时，请使用此部分。",
  "messages.messagePrefix":
    "入站用户消息在交给智能体运行时前预置的文本前缀。请谨慎在频道上下文标记中使用，并保持其在会话间的稳定性。",
  "messages.responsePrefix":
    "本助手回复在发送至频道前预置的文本前缀。用于轻量级的品牌/上下文标签，避免使用会导致内容密度降低的长前缀。",
  "messages.groupChat":
    "群组消息处理控制，包括提及触发器和历史窗口大小。保持提及模式狭窄，以免群组频道被每条消息触发。",
  "messages.groupChat.mentionPatterns":
    "用于检测群聊中显式提及/触发短语的正则表达式类模式。使用精确的模式以减少高流量频道中的误报。",
  "messages.groupChat.historyLimit":
    "每轮群组会话加载为上下文的前序群组消息最大数量。使用较高的值可以获得更丰富的连续性，使用较低的值可以获得更快、更廉价的响应。",
  "messages.queue":
    "入站消息队列策略，用于在处理轮次前缓冲突发消息。针对顺序处理或批处理行为很重要的繁忙频道调整此项。",
  "messages.queue.mode":
    '队列行为模式："steer"、"followup"、"collect"、"steer-backlog"、"steer+backlog"、"queue" 或 "interrupt"。除非有意需要激进的中断/积压语义，否则请保持保守模式。',
  "messages.queue.byChannel":
    "按提供商 ID（例如 telegram、discord、slack）分组的每个频道队列模式覆盖。当某个频道的流量模式需要与全局默认值不同的队列行为时使用此项。",
  "messages.queue.debounceMs":
    "处理缓冲的入站消息前的全局队列去抖窗口（毫秒）。使用较高的值来合并快速突发消息，或使用较低的值以降低响应延迟。",
  "messages.queue.debounceMsByChannel":
    "按提供商 ID 分组的每频道队列去抖覆盖。用于独立调整具有不同节奏的聊天界面的突发处理。",
  "messages.queue.cap":
    "在应用丢弃策略前保留的排队入站物品的最大数量。在嘈杂频道中保持上限有界，以确保内存使用可预测。",
  "messages.queue.drop":
    '超过队列上限时的丢弃策略："old"、"new" 或 "summarize"。当保留意图很重要时使用 summarize，或者在倾向于确定性丢弃时使用 old/new。',
  "messages.inbound":
    "在队列/轮次处理开始前使用的直接入站去抖设置。针对来自同一发送者的提供商特定快速消息突发进行配置。",
  "messages.inbound.byChannel":
    "按提供商 ID 分组的每频道入站去抖覆盖（毫秒）。用于某些提供商比其他提供商更频繁发送消息片段的情况。",
  "messages.removeAckAfterReply":
    "启用时在最终回复投递后移除确认反应。在持久的确认反应会导致杂乱的频道中保持启用以获得更整洁的体验。",
  "messages.tts":
    "在支持的语音或音频界面上朗读智能体回复的文本转语音策略。除非语音回放是您操作员/用户工作流的一部分，否则请保持禁用。",
  channels:
    "频道提供商配置以及控制访问策略、心跳可见性和每表面行为的共享默认值。保持默认值集中管理，仅在需要时覆盖具体提供商设置。",
  "channels.telegram":
    "Telegram 频道提供商配置，包括身份验证令牌、重试行为和消息渲染控制。使用此部分针对 Telegram 特定的 API 语义调整智能体行为。",
  "channels.slack":
    "Slack 频道提供商配置，用于机器人/应用令牌、流式传输行为和私聊策略控制。保持令牌处理和线程行为显式，以避免嘈杂的工作区自动化交互。",
  "channels.discord":
    "Discord 频道提供商配置，用于机器人身份验证、重试策略、流式传输、线程绑定和可选的语音功能。除非需要，否则请保持特权意图和高级功能禁用。",
  "channels.whatsapp":
    "WhatsApp 频道提供商配置，用于访问策略和消息批处理行为。使用此部分针对 WhatsApp 聊天调整响应性和私聊路由安全性。",
  "channels.signal":
    "Signal 频道提供商配置，包括账号身份和私聊策略行为。保持账号映射显式，以便路由在多设备设置中保持稳定。",
  "channels.imessage":
    "iMessage 频道提供商配置，用于 CLI 集成和私聊访问策略处理。当运行环境具有非标准二进制位置时，请使用显式的 CLI 路径。",
  "channels.bluebubbles":
    "用于 Apple 消息桥接集成的 BlueBubbles 频道提供商配置。在共享部署中保持私聊策略与您的受信任发送者模型一致。",
  "channels.msteams":
    "Microsoft Teams 频道提供商配置及特定提供商的策略开关。使用此部分将 Teams 行为与其他企业聊天提供商隔离。",
  "channels.mattermost":
    "Mattermost 频道提供商配置，用于机器人凭据、基础 URL 和消息触发模式。在流量较大的团队频道中保持提及/触发规则严格。",
  "channels.irc":
    "用于经典 IRC 传输工作流的 IRC 频道提供商配置和兼容性设置。在将传统聊天基础设施桥接到 OpenClaw 时使用此部分。",
  "channels.defaults":
    "在未设置具体提供商设置时应用于各提供商的默认频道行为。在进行具体提供商调整前，使用此项来执行一致的基准策略。",
  "channels.defaults.groupPolicy":
    '跨频道的默认群组策略："open"、"disabled" 或 "allowlist"。为了更安全的生产设置，请保持 "allowlist"，除非是有意进行广泛的群组参与。',
  "channels.defaults.heartbeat":
    "由提供商/频道发出的状态消息的默认心跳可见性设置。全局调整此项以减少正常状态下的干扰更新，同时保持警报可见。",
  "channels.defaults.heartbeat.showOk":
    "为 true 时，在频道状态输出中显示正常/OK 的心跳条目。在嘈杂环境中保持 false，仅在操作员需要明确的健康确认时启用。",
  "channels.defaults.heartbeat.showAlerts":
    "为 true 时，显示降级/错误的心跳警报，以便操作员频道能及时发现问题。在生产环境中保持启用，以便发现损坏的频道状态。",
  "channels.defaults.heartbeat.useIndicator":
    "在支持的情况下启用简练的指示器风格心跳渲染，而不是冗长的状态文本。在具有许多活动频道的密集仪表板中使用指示器模式。",
  "agents.defaults.heartbeat.directPolicy":
    '控制心跳投递是否可以靶向私聊/DM："allow"（默认）允许投递到私聊，"block" 抑制发送到私聊目的地。',
  "agents.list.*.heartbeat.directPolicy":
    '按智能体覆盖的心跳私聊/DM 投递策略；对不应向私聊目的地发送心跳警报的智能体使用 "block"。',
  "channels.telegram.configWrites": "允许 Telegram 根据频道事件/命令写入配置（默认值：true）。",
  "channels.telegram.botToken":
    "用于为此账号/提供商配置验证 Bot API 请求的 Telegram 机器人令牌。建议使用密钥/环境变量替换，并在怀疑泄露时轮换令牌。",
  "channels.telegram.capabilities.inlineButtons":
    "为支持的命令和交互界面启用 Telegram 内联按钮组件。如果您的部署需要纯文本兼容行为，请禁用。",
  "channels.slack.configWrites": "允许 Slack 根据频道事件/命令写入配置（默认值：true）。",
  "channels.slack.botToken":
    "在配置的工作区中用于标准聊天操作的 Slack 机器人令牌。保持此凭据受限并在工作区应用权限更改时轮换。",
  "channels.slack.appToken":
    "用于套接字模式（Socket Mode）连接和事件传输（启用时）的 Slack 应用级令牌。使用最小特权应用范围并将此令牌存储为密钥。",
  "channels.slack.userToken":
    "用于需要超出机器人权限的用户上下文 API 访问的可选 Slack 用户令牌。谨慎使用并审计范围，因为此令牌可能携带更广泛的权限。",
  "channels.slack.userTokenReadOnly":
    "为 true 时，尽可能将配置的 Slack 用户令牌视为只读辅助行为。如果您只需要补充性读取而不需要用户上下文写入，请保持启用。",
  "channels.mattermost.configWrites": "允许 Mattermost 根据频道事件/命令写入配置（默认值：true）。",
  "channels.discord.configWrites": "允许 Discord 根据频道事件/命令写入配置（默认值：true）。",
  "channels.discord.token":
    "用于此提供商账号的网关和 REST API 身份验证的 Discord 机器人令牌。保持此密钥不进入已提交的配置，并在发生任何泄露后立即轮换。",
  "channels.discord.allowBots":
    '允许机器人发表的消息触发 Discord 回复（默认值：false）。设置为 "mentions" 以仅接受提及了本机器人的机器人消息。',
  "channels.discord.proxy":
    "Discord 网关 + API 请求的代理 URL（用于应用 ID 查找和允许列表解析）。通过 channels.discord.accounts.<id>.proxy 按账号设置。",
  "channels.whatsapp.configWrites": "允许 WhatsApp 根据频道事件/命令写入配置（默认值：true）。",
  "channels.signal.configWrites": "允许 Signal 根据频道事件/命令写入配置（默认值：true）。",
  "channels.signal.account":
    "Signal 账号标识符（电话/号码处理），用于将此频道配置绑定到特定的 Signal 身份。保持与您链接的设备/会话状态一致。",
  "channels.imessage.configWrites": "允许 iMessage 根据频道事件/命令写入配置（默认值：true）。",
  "channels.imessage.cliPath":
    "用于发送/接收操作的 iMessage 桥接 CLI 二进制文件的文件系统路径。当服务运行环境的 PATH 中没有该二进制文件时请显式设置。",
  "channels.msteams.configWrites":
    "允许 Microsoft Teams 根据频道事件/命令写入配置（默认值：true）。",
  "channels.modelByChannel": "映射：提供商 -> 频道 ID -> 模型覆盖（值为提供商/模型名称或别名）。",
  ...IRC_FIELD_HELP,
  "channels.discord.commands.native": '覆盖 Discord 的原生命令设置（布尔值或 "auto"）。',
  "channels.discord.commands.nativeSkills": '覆盖 Discord 的原生技能命令设置（布尔值或 "auto"）。',
  "channels.telegram.commands.native": '覆盖 Telegram 的原生命令设置（布尔值或 "auto"）。',
  "channels.telegram.commands.nativeSkills":
    '覆盖 Telegram 的原生技能命令设置（布尔值或 "auto"）。',
  "channels.slack.commands.native": '覆盖 Slack 的原生命令设置（布尔值或 "auto"）。',
  "channels.slack.commands.nativeSkills": '覆盖 Slack 的原生技能命令设置（布尔值或 "auto"）。',
  "channels.slack.streaming":
    '统一的 Slack 流式预览模式："off" | "partial" | "block" | "progress"。旧的布尔值/streamMode 键会自动映射。',
  "channels.slack.nativeStreaming":
    "当 channels.slack.streaming 为 partial 时，启用原生 Slack 文本流式传输 (chat.startStream/chat.appendStream/chat.stopStream)（默认值：true）。",
  "channels.slack.streamMode":
    "旧的 Slack 预览模式别名 (replace | status_final | append)；已自动迁移到 channels.slack.streaming。",
  "channels.telegram.customCommands":
    "额外的 Telegram 机器人菜单命令（与原生命令合并；忽略冲突）。",
  "messages.suppressToolErrors":
    "为 true 时，抑制向用户显示 ⚠️ 工具错误警告。智能体已经在上下文中看到了处理错误并可以重试。默认值：false。",
  "messages.ackReaction": "用于确认入站消息的表情符号反应（为空则禁用）。",
  "messages.ackReactionScope":
    '何时发送确认反应（"group-mentions"、"group-all"、"direct"、"all"、"off"、"none"）。"off"/"none" 会完全禁用确认反应。',
  "messages.statusReactions":
    "生命周期状态反应，随着智能体的进展更新触发消息上的表情符号（排队中 → 思考中 → 工具执行中 → 完成/错误）。",
  "messages.statusReactions.enabled":
    "为 Telegram 启用生命周期状态反应。启用时，确认反应将变为初始的 '排队' 状态，并自动经过思考、工具执行、完成/错误等阶段。默认值：false。",
  "messages.statusReactions.emojis":
    "覆盖默认的状态反应表情符号。键：thinking, tool, coding, web, done, error, stallSoft, stallHard。必须是有效的 Telegram 反应表情符号。",
  "messages.statusReactions.timing":
    "覆盖默认定时。键：debounceMs (700), stallSoftMs (25000), stallHardMs (60000), doneHoldMs (1500), errorHoldMs (2500)。",
  "messages.inbound.debounceMs": "用于合并来自同一发送者的快速入站消息的去抖窗口（毫秒，0 禁用）。",
  "channels.telegram.dmPolicy":
    '私聊访问控制（建议使用 "pairing"）。"open" 要求 channels.telegram.allowFrom=["*"]。',
  "channels.telegram.streaming":
    '统一的 Telegram 流式预览模式："off" | "partial" | "block" | "progress"（默认值："partial"）。在 Telegram 上 "progress" 映射到 "partial"。旧的布尔值/streamMode 键会自动映射。',
  "channels.discord.streaming":
    '统一的 Discord 流式预览模式："off" | "partial" | "block" | "progress"。在 Discord 上 "progress" 映射到 "partial"。旧的布尔值/streamMode 键会自动映射。',
  "channels.discord.streamMode":
    "旧的 Discord 预览模式别名 (off | partial | block)；已自动迁移到 channels.discord.streaming。",
  "channels.discord.draftChunk.minChars":
    '当 channels.discord.streaming="block" 时，发出 Discord 流式预览更新前的最小字符数（默认值：200）。',
  "channels.discord.draftChunk.maxChars":
    '当 channels.discord.streaming="block" 时，Discord 流式预览分块的目标最大大小（默认值：800；受限于 channels.discord.textChunkLimit）。',
  "channels.discord.draftChunk.breakPreference":
    "Discord 草稿分块的首选换行点 (paragraph | newline | sentence)。默认值：paragraph。",
  "channels.telegram.retry.attempts": "出站 Telegram API 调用的最大重试尝试次数（默认值：3）。",
  "channels.telegram.retry.minDelayMs": "Telegram 出站调用的最小重试延迟（毫秒）。",
  "channels.telegram.retry.maxDelayMs": "Telegram 出站调用的最大重试延迟上限（毫秒）。",
  "channels.telegram.retry.jitter": "应用于 Telegram 重试延迟的抖动因子 (0-1)。",
  "channels.telegram.network.autoSelectFamily":
    "为 Telegram 覆盖 Node 的 autoSelectFamily（true=启用，false=禁用）。",
  "channels.telegram.timeoutSeconds":
    "Telegram API 请求中止前的最大秒数（默认根据 grammY 为 500）。",
  "channels.telegram.threadBindings.enabled":
    "启用 Telegram 对话绑定特性（/focus、/unfocus、/agents 以及 /session idle|max-age）。设置后会覆盖 session.threadBindings.enabled。",
  "channels.telegram.threadBindings.idleHours":
    "Telegram 绑定会话的非活动窗口（小时）。设置 0 以禁用空闲自动取消聚焦（默认值：24）。设置后会覆盖 session.threadBindings.idleHours。",
  "channels.telegram.threadBindings.maxAgeHours":
    "Telegram 绑定会话的可选硬性最大时长（小时）。设置 0 以禁用硬性限制（默认值：0）。设置后会覆盖 session.threadBindings.maxAgeHours。",
  "channels.telegram.threadBindings.spawnSubagentSessions":
    "在支持的情况下，允许带 thread=true 的智能体生成自动绑定 Telegram 当前对话。",
  "channels.telegram.threadBindings.spawnAcpSessions":
    "在支持的情况下，允许带 thread=true 的 ACP 生成自动绑定 Telegram 当前对话。",
  "channels.whatsapp.dmPolicy":
    '私聊访问控制（建议使用 "pairing"）。"open" 要求 channels.whatsapp.allowFrom=["*"]。',
  "channels.whatsapp.selfChatMode": "同机模式（机器人使用您的个人 WhatsApp 号码）。",
  "channels.whatsapp.debounceMs":
    "用于合并来自同一发送者的快速连续消息的去抖窗口（毫秒，0 禁用）。",
  "channels.signal.dmPolicy":
    '私聊访问控制（建议使用 "pairing"）。"open" 要求 channels.signal.allowFrom=["*"]。',
  "channels.imessage.dmPolicy":
    '私聊访问控制（建议使用 "pairing"）。"open" 要求 channels.imessage.allowFrom=["*"]。',
  "channels.bluebubbles.dmPolicy":
    '私聊访问控制（建议使用 "pairing"）。"open" 要求 channels.bluebubbles.allowFrom=["*"]。',
  "channels.discord.dmPolicy":
    '私聊访问控制（建议使用 "pairing"）。"open" 要求 channels.discord.allowFrom=["*"]。',
  "channels.discord.dm.policy":
    '私聊访问控制（建议使用 "pairing"）。"open" 要求 channels.discord.allowFrom=["*"]（旧版：channels.discord.dm.allowFrom）。',
  "channels.discord.retry.attempts": "出站 Discord API 调用的最大重试尝试次数（默认值：3）。",
  "channels.discord.retry.minDelayMs": "Discord 出站调用的最小重试延迟（毫秒）。",
  "channels.discord.retry.maxDelayMs": "Discord 出站调用的最大重试延迟上限（毫秒）。",
  "channels.discord.retry.jitter": "应用于 Discord 重试延迟的抖动因子 (0-1)。",
  "channels.discord.maxLinesPerMessage": "每条 Discord 消息的软性最大行数限制（默认值：17）。",
  "channels.discord.inboundWorker.runTimeoutMs": `可选的 Discord 入站排队工作器超时（毫秒）。这与 Carbon 监听器超时是分开的；默认值为 ${DISCORD_DEFAULT_INBOUND_WORKER_TIMEOUT_MS}，可以通过 0 禁用。可以通过 channels.discord.accounts.<id>.inboundWorker.runTimeoutMs 按账号进行设置。`,
  "channels.discord.eventQueue.listenerTimeout": `用于网关归一化/入队处理器的规范 Discord 监听器超时控制（毫秒）。OpenClaw 中的默认值为 ${DISCORD_DEFAULT_LISTENER_TIMEOUT_MS}；可以通过 channels.discord.accounts.<id>.eventQueue.listenerTimeout 按账号进行设置。`,
  "channels.discord.eventQueue.maxQueueSize":
    "可选的 Discord 事件队列容量覆盖（背压前的最大排队事件数）。可以通过 channels.discord.accounts.<id>.eventQueue.maxQueueSize 按账号进行设置。",
  "channels.discord.eventQueue.maxConcurrency":
    "可选的 Discord 事件队列并发覆盖（最大并发处理器执行数）。可以通过 channels.discord.accounts.<id>.eventQueue.maxConcurrency 按账号进行设置。",
  "channels.discord.threadBindings.enabled":
    "启用 Discord 线程绑定功能（/focus、绑定线程路由/投递以及线程绑定的智能体生成会话）。设置后会覆盖 session.threadBindings.enabled。",
  "channels.discord.threadBindings.idleHours":
    "Discord 线程绑定会话（/focus 和生成的线程会话）的非活动窗口（小时）。设置 0 以禁用空闲自动取消聚焦（默认值：24）。设置后会覆盖 session.threadBindings.idleHours。",
  "channels.discord.threadBindings.maxAgeHours":
    "Discord 线程绑定会话的可选硬性最大时长（小时）。设置 0 以禁用硬性限制（默认值：0）。设置后会覆盖 session.threadBindings.maxAgeHours。",
  "channels.discord.threadBindings.spawnSubagentSessions":
    "允许带 thread=true 的智能体生成自动创建并绑定 Discord 线程（默认值：false；需选择性开启）。为该账号/频道设置为 true 以启用线程绑定的智能体生成。",
  "channels.discord.threadBindings.spawnAcpSessions":
    "允许 /acp spawn 为 ACP 会话自动创建并绑定 Discord 线程（默认值：false；需选择性开启）。为该账号/频道设置为 true 以启用线程绑定的 ACP 生成。",
  "channels.discord.ui.components.accentColor":
    "Discord 组件容器的强调色（十六进制）。可以通过 channels.discord.accounts.<id>.ui.components.accentColor 按账号进行设置。",
  "channels.discord.voice.enabled":
    "启用 Discord 语音频道对话（默认值：true）。省略 channels.discord.voice 以保持该账号的语音支持禁用状态。",
  "channels.discord.voice.autoJoin": "启动时自动加入的语音频道（guildId/channelId 条目列表）。",
  "channels.discord.voice.daveEncryption":
    "切换 Discord 语音加入的 DAVE 端到端加密（@discordjs/voice 中默认值为 true；Discord 可能要求此项）。",
  "channels.discord.voice.decryptionFailureTolerance":
    "在 DAVE 尝试会话恢复前的连续解密失败次数（传递给 @discordjs/voice；默认值：24）。",
  "channels.discord.voice.tts": "用于 Discord 语音播放的可选 TTS 覆盖（与 messages.tts 合并）。",
  "channels.discord.intents.presence":
    "启用 Guild Presences 特权意图。必须在 Discord 开发者门户中同步启用。允许跟踪用户活动（例如 Spotify）。默认值：false。",
  "channels.discord.intents.guildMembers":
    "启用 Guild Members 特权意图。必须在 Discord 开发者门户中同步启用。默认值：false。",
  "channels.discord.pluralkit.enabled": "解析 PluralKit 代理消息，并将系统成员视为不同的发送者。",
  "channels.discord.pluralkit.token": "用于解析私有系统或成员的可选 PluralKit 令牌。",
  "channels.discord.activity": "Discord 状态活动文本（默认为自定义状态）。",
  "channels.discord.status": "Discord 在线状态（online, dnd, idle, invisible）。",
  "channels.discord.autoPresence.enabled":
    "根据运行环境/模型可用性信号启用自动 Discord 机器人状态更新。启用时：健康 => 在线，降级/未知 => 闲置，耗尽/不可用 => 请勿打扰。",
  "channels.discord.autoPresence.intervalMs":
    "评估 Discord 自动状态的时间间隔（毫秒，默认值：30000）。",
  "channels.discord.autoPresence.minUpdateIntervalMs":
    "实际 Discord 状态更新调用之间的最小时间间隔（毫秒，默认值：15000）。防止在状态频繁变化时产生状态刷屏。",
  "channels.discord.autoPresence.healthyText":
    "运行环境健康（在线）时的可选自定义状态文本。如果省略，将回退到已设置的静态 channels.discord.activity。",
  "channels.discord.autoPresence.degradedText":
    "运行环境/模型可用性降级或未知（闲置）时的可选自定义状态文本。",
  "channels.discord.autoPresence.exhaustedText":
    "运行环境检测到模型额度耗尽/不可用（请勿打扰）时的可选自定义状态文本。支持 {reason} 模板占位符。",
  "channels.discord.activityType":
    "Discord 状态活动类型（0=正在玩, 1=正在直播, 2=正在听, 3=正在看, 4=自定义, 5=正在参与）。",
  "channels.discord.activityUrl": "Discord 状态直播 URL（对于 activityType=1 是必需的）。",
  "channels.slack.dm.policy":
    '私聊访问控制（建议使用 "pairing"）。"open" 要求 channels.slack.allowFrom=["*"]（旧版：channels.slack.dm.allowFrom）。',
  "channels.slack.dmPolicy":
    '私聊访问控制（建议使用 "pairing"）。"open" 要求 channels.slack.allowFrom=["*"]。',
};

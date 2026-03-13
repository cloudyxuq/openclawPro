# 部署指南

## 单机部署（单GateWay基础部署）

### 1. 验证安装版本

openclaw --version

### 2. 运行交互式配置向导

openclaw config wizard

#### 交互配置步骤（新手直接按提示选择）

1. 接受风险提示：输入Yes
2. 选择模型提供商：暂时选择“Custom Provider”
3. 网关绑定：选择lan（监听所有网络接口）
4. 频道配置：输入Skip（后续配置路由规则）
5. 技能配置：输入Skip（后续按Agent角色安装）
6. 孵化方式：选择Open the Web UI

### 3. 启动网关服务

openclaw gateway start

### 4. 生成访问令牌（登录控制台需用，复制保存）

openclaw token generate --admin

## 源码开发

### 1. ui

pnpm ui:dev

### 2. gateway

pnpm openclaw gateway

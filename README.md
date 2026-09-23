# DeepSeek Harness Agent 工作流

`dsh-plugin-agent-workflow` 是一个可独立安装的 DeepSeek Harness Web UI 插件。它在原有“对话”和“轨迹”之外增加“工作流”标签页，以用户对话轮次为入口，把 Agent 的模型请求、模型响应和工具调用呈现为清晰的执行链路。

插件不会替换或修改 DeepSeek Harness 内置的“轨迹”功能。

> **来源与署名**：本项目基于 [xuanyuanzhifeng/dsh-plugin-agent-workflow](https://github.com/xuanyuanzhifeng/dsh-plugin-agent-workflow)（MIT）适配而来，
> 原项目版权归其作者所有，许可条款见 [LICENSE](LICENSE)。
> 本仓库相对上游的改动：适配 `dsh@0.1.7-alpha.2`，并改为以**预构建产物交付**，
> 使插件可以直接通过 DSH 官方的「添加插件」安装而无需构建审批。

## 界面预览

### 工作流总览

左侧按用户对话轮次组织任务，右侧按时间顺序显示本轮发生的模型调用和工具调用。页面顶部汇总用户对话数、模型调用数、工具调用数和总耗时。

![工作流总览](docs/images/workflow-overview.png)

### 请求详情

点击请求卡片后，可以检查该次模型请求真实记录的系统提示词、`messages[]` 消息体和工具定义。三个区域均使用可折叠 JSON 树展示，并支持复制和放大查看。

![模型请求详情](docs/images/workflow-request-details.png)

## 主要功能

- **按轮次浏览**：左侧固定显示当前 Session 的用户对话轮次，包括提示词摘要、开始时间、模型调用数、工具调用数和完成状态。
- **执行链路可视化**：每次模型调用依次展示请求、响应和工具调用卡片，一行内容超出可视区域时支持横向滚动。
- **完整请求检查**：请求详情分别展示真实记录的 `system`、提供方无关的 `messages[]` 和 `tools`，JSON 节点可以逐级展开或收起。
- **响应内容检查**：展示 reasoning、content、工具调用以及当次模型响应的原始记录。
- **工具执行状态**：区分运行中、完成和失败状态，并展示调用参数、执行结果、耗时和错误摘要。
- **Token 与缓存统计**：分别显示输入、未缓存输入、缓存读取、缓存写入和输出 Token，便于分析上下文复用情况。
- **大数据量浏览**：轮次列表和模型调用列表独立滚动，模型调用行使用虚拟化渲染，长链路不会挤压整个页面。

## 数据来源

工作流页面由 DeepSeek Harness Session 中真实记录的事件生成。系统提示词、工具定义、响应和工具结果来自内置 Trajectory 投影；`messages[]` 按 DSH 与模型请求相同的 Session surface 追加、替换规则，在每次请求边界重建。

插件只读取并展示已有记录，不会向模型请求中增加消息、提示词或工具。

## 兼容版本

| 插件版本 | DSH 版本 |
| --- | --- |
| `0.2.0+local-0.1.7` | `dsh@0.1.7-alpha.2` |
| `0.2.x` | `dsh@0.1.5-alpha.1` |
| `0.1.x` | `dsh@0.1.0-rc.8` |

DeepSeek Harness 仍处于预发布阶段，不同 RC 版本的客户端接口可能发生变化。升级 DSH 后，需要同时安装与新版本适配的插件版本。

> **本地适配说明（`0.2.0+local-0.1.7`）**：此构建为本地适配版，非上游发布。
> 为在 `dsh@0.1.7-alpha.2` 上运行做了两处改动：
> 1. `package.json` 中 `@deepseek-ai/dsh-*` 的 peer/dev 依赖由 `0.1.5-alpha.1` 提升为 `0.1.7-alpha.2`；
> 2. `src/client/WorkflowView.tsx` 的 `request?.provenance?.model` 改为 `request?.providerMetadata?.model`
>    —— `0.1.7` 的 `RequestView` 移除了 `provenance`，`providerMetadata`（`{ provider, model }`）是等价的请求身份字段。
>
> `SessionSnapshot` 在 `0.1.7` 已改为不含 Conversation target 数据（`chat` / `turnTimings` 移入 Chat 目标快照）；
> 本插件对它的依赖只有 `hasMore` 与 `loadingOlder`，两者仍在，故无需进一步改动。

## 安装

`lib/`（浏览器插件包、宿主入口与类型声明）是**已构建产物并随仓库提交**，安装过程不执行任何
构建脚本。因此可以直接用 DSH Web 的「设置 → 插件 → 添加插件」，不会出现
「有依赖的安装脚本需要你允许后才能继续」的拦截，也不需要往 profile 的 `allowBuilds` 里放行。

下面三种输入形式都可以直接填进「添加插件」对话框。

### 方式一：本地插件目录

在「添加插件」里填入本机插件的**绝对路径**：

```
D:\dshworkspace\dsh\dsh0922\dsh-plugin-agent-workflow
```

等价的命令行形式：

```sh
npx --yes @deepseek-ai/dsh@0.1.7-alpha.2 plugin \
  --profile web \
  add "D:\dshworkspace\dsh\dsh0922\dsh-plugin-agent-workflow" \
  --workspace-root
```

本地目录安装记录为 `link:`，插件与源码目录保持关联；移动或删除该目录后需要重新安装。

### 方式二：GitHub 仓库地址

`lib/` 已提交，因此可以直接从 Git 安装（pnpm 不会再尝试构建）：

```sh
npx --yes @deepseek-ai/dsh@0.1.7-alpha.2 plugin \
  --profile web \
  add github:xuanyuanzhifeng/dsh-plugin-agent-workflow \
  --workspace-root
```

固定 commit 或 tag 可避免安装内容随分支变化：

```sh
npx --yes @deepseek-ai/dsh@0.1.7-alpha.2 plugin \
  --profile web \
  add "github:xuanyuanzhifeng/dsh-plugin-agent-workflow#<commit-or-tag>" \
  --workspace-root
```

### 方式三：本地 `.tgz` 包

```sh
pnpm pack    # 产出 dsh-plugin-agent-workflow-0.2.1.tgz
npx --yes @deepseek-ai/dsh@0.1.7-alpha.2 plugin \
  --profile web \
  add ./dsh-plugin-agent-workflow-0.2.1.tgz \
  --workspace-root
```

### 方式四：npm 包名（需先发布到 npm）

包名即 `dsh-plugin-agent-workflow`。发布后可以直接填包名：

```sh
npx --yes @deepseek-ai/dsh@0.1.7-alpha.2 plugin \
  --profile web \
  add dsh-plugin-agent-workflow \
  --workspace-root
```

### 验证

```sh
npx --yes @deepseek-ai/dsh@0.1.7-alpha.2 plugin --profile web list --depth 0
```

列表中出现 `dsh-plugin-agent-workflow 0.2.1` 表示安装成功。刷新或重启 Web UI 后，会话顶部的
「对话 / 轨迹」旁边会出现「工作流」标签页。

## 卸载

```sh
npx --yes @deepseek-ai/dsh@0.1.7-alpha.2 plugin \
  --profile web \
  remove dsh-plugin-agent-workflow \
  --workspace-root
```

卸载后重启 DSH Web。该操作只移除独立的“工作流”插件，不会影响内置的“轨迹”标签页。

## 本地开发与打包

需要 Node.js `^22.19.0` 或 `>=24.0.0`，以及 pnpm 11。

```sh
pnpm install
pnpm run typecheck
pnpm test          # 先 build，再跑单测
pnpm run build     # 生成 lib/（浏览器包 + 宿主入口 + 类型声明）
pnpm run verify:dist   # build 后断言 lib/ 与提交内容一致
pnpm pack              # 生成 dsh-plugin-agent-workflow-<version>.tgz
```

> **改了 `src/` 必须重新 `pnpm run build` 并把 `lib/` 一起提交。**
> `lib/` 是仓库的一部分，安装端不再构建；`.github/workflows/verify-dist.yml`
> 会在 CI 中执行 `git diff --exit-code -- lib`，产物过期即失败。

## 已知限制

- 汇总数据只覆盖客户端能够加载的 Session 历史；无法取得的更早事件不会计入统计。
- JSON 展开状态和卡片选中状态保存在当前页面中，不提供可分享的深链接。
- 同一次响应中的多个工具调用以可横向滚动的线性序列展示，不绘制并行分支图。

## License

MIT

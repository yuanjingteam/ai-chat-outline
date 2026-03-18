# AI Chat Navigator 浏览器扩展下载页

这是一个基于 React 和 TailwindCSS 构建的单页宣传网站，用于介绍并引导用户安装 AI Chat Navigator 浏览器扩展，在多个 AI 聊天平台中快速搜索和管理历史对话。

## 在线预览

- Demo 地址：<你的部署链接>
- 仓库地址：<GitHub / Gitee 链接>

## 功能特性

- 🎨 响应式布局，适配桌面端和移动端
- 🌙 支持浅色 / 深色主题切换
- 🧩 项目卡片展示，支持分类与标签
- ⚡ 平滑滚动与基础的动效过渡
- 📬 下载链接入口

## 技术栈

- 框架：React 19.0.0
- 构建工具：<Vite 6.2.0>
- 语言：<TypeScript>
- 样式：<TailwindCSS >

## 快速开始

### 环境要求

- Node.js >= <18.18.0>
- npm / yarn / pnpm（任选其一）

### 安装依赖

```bash
npm install
# 或
yarn
# 或
pnpm install
```

### 本地开发

```bash
npm run dev
# 或
yarn dev
# 或
pnpm dev
```

启动后在浏览器访问提示的本地地址（通常是 http://localhost:3000）。

### 构建生产包

```bash
npm run build
# 或
yarn build
# 或
pnpm build
```

### 预览构建结果

```bash
npm run preview
# 或
yarn preview
# 或
pnpm preview
```

## 项目结构

下面是项目的主要目录结构：

```bash
starfall-portfolio/
├─ src/
│  ├─ components/        # 通用组件
│  ├─ assets/            # 静态资源与图片
│  ├─ styles/            # 全局样式或样式模块
│  ├─ App.tsx       # 应用入口组件
│  └─ main.tsx      # 渲染入口
├─ package.json
└─ README.md
```

## 配置与自定义

- 扩展名称与 Logo：在 `src/App.tsx` 中修改 `customPortfolioData.logo` 的 `name` 和图片地址
- 导航与按钮：在 `navLinks`、`resume`、`ctaButtons` 中调整导航文案、按钮文字以及点击后的跳转链接（如扩展商店地址）
- 功能展示卡片：在 `projects` 数组中编辑每一项的标题、描述、标签和配图，用于介绍扩展的核心功能
- 数据展示：在 `stats` 中配置活跃用户数、评分等展示数据，可根据实际情况随时更新
- 视觉与布局：通过修改 `src/components/ui` 下相关组件和 TailwindCSS 类名，定制页面配色、布局和动画效果

## 部署说明

项目构建后会生成静态文件，可以部署到任意支持静态站点托管的平台，这里以 **GitHub Pages** 为例：

1. 将项目推送到 GitHub 仓库（例如 `username/ai-chat-navigator-landing`）
2. 在本地运行 `npm run build`（或 `yarn build` / `pnpm build`）生成构建产物
3. 将构建输出目录（通常是 `dist`）的内容上传到用于 Pages 的分支（如 `gh-pages`），可以使用 GitHub Actions 或 `gh-pages` 等工具自动化
4. 打开 GitHub 仓库的 **Settings → Pages**，将 Source 设置为对应的分支和路径
5. 保存后等待 GitHub 完成部署，即可通过 Pages 提供的访问链接打开该下载页面

## License

本项目基于 <MIT / 其他> 协议开源，详情见 LICENSE 文件。

## 扩展程序简介

本项目的网页用于引导用户在浏览器中安装一个扩展程序，该扩展程序可以在多个 AI 聊天平台中帮助你快速查找历史聊天记录，避免在不同标签页和会话中反复翻找，提升日常使用效率。

核心目标：

- 在浏览器中提供一站式的聊天记录搜索入口
- 支持多个主流 AI 平台（如 ChatGPT、Claude、Gemini 等）
- 以尽量少的操作完成「打开平台 → 搜索历史对话 → 快速跳转」

## 支持平台

扩展程序目前计划支持或已支持的 AI 平台包括（根据实际情况增减或修改）：

- ChatGPT / OpenAI Chat
- Claude
- Gemini / Google AI Chat
- 国内主流大模型聊天产品（如通义千问、Kimi 等）

你可以在页面中查看最新支持的平台列表及更新说明。

## 安装与使用

具体安装方式取决于你使用的浏览器，可在网页中直接点击对应按钮进入扩展商店或安装页面。

典型流程如下：

1. 打开本项目提供的下载页面
2. 选择你的浏览器（如 Chrome、Edge、Firefox 等）
3. 点击「前往商店」或「安装扩展」按钮
4. 在浏览器扩展商店中确认安装
5. 安装完成后，按照页面提示进行首次配置（如授权访问对应网站、设置搜索快捷键等）

日常使用时，你可以通过以下方式快速打开扩展：

- 点击浏览器工具栏中的扩展图标
- 使用你在扩展设置中配置的快捷键

打开扩展面板后，可以输入关键词搜索在各个 AI 平台上的历史聊天记录，并一键跳转到对应会话。

## 隐私与数据安全

扩展程序在设计时会尽量遵循「最小权限原则」，只在必要的页面和范围内读取与搜索相关的内容，不会主动上传或分享你的聊天记录。

实际的数据读取与存储策略（包括是否本地索引、是否使用云端服务）请以扩展商店详情页和隐私政策为准，并在 README 中保持与实际实现一致。

## 常见问题

- 如果无法在某个 AI 平台上正常工作，请先确认该平台是否在支持列表中，并检查浏览器是否拦截了脚本注入
- 如果搜索不到最新会话，可以尝试在对应平台刷新页面后再试
- 如遇到报错或页面样式异常，建议截图错误信息并到仓库的 Issues 中反馈

## 反馈与贡献

如果你在使用扩展时遇到问题，或对支持更多平台、新增功能有建议，可以通过以下方式反馈：

- 在仓库中提交 Issue
- 提交 Pull Request 参与改进

欢迎一起完善这个跨平台 AI 聊天记录搜索工具。

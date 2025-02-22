<p align="center">
  <a href="https://github.com/if-nil/reapi" target="_blank" rel="noopener noreferrer">
    <img width="280" src="https://raw.githubusercontent.com/if-nil/ShareInLink/refs/heads/main/public/logo.svg" alt="ShareInLink logo">
  </a>
</p>

[English](README.md) | 中文

# ShareInLink

[![Netlify Status](https://api.netlify.com/api/v1/badges/beb2e1a6-117d-4e44-b705-f92b2b4f13eb/deploy-status)](https://app.netlify.com/sites/share-in-link/deploys)

一个安全的 Markdown 编辑器，支持本地分享。所有内容都存储在 URL hash 中，让分享变得简单的同时确保数据留在浏览器中。

## 功能特点

- 实时 Markdown 预览
- 代码语法高亮
- URL 分享功能
- 独立预览页面
- 自动保存到 URL hash
- 键盘快捷键（Ctrl+S / Cmd+S 保存）
- 响应式设计
- 深色模式编辑器

## 技术栈

- Vue 3
- Vite
- Monaco Editor
- Marked.js

## 快速开始

### 环境要求

- Node.js (v14+)
- pnpm

### 安装步骤

1. 克隆仓库

```bash
# 克隆仓库
git clone https://github.com/if-nil/sth-preview.git

# 安装依赖
pnpm install

# 启动开发服务器
pnpm dev

# 构建生产版本
pnpm build
```

### 使用说明

1. 在左侧编辑器中编写 Markdown 内容
2. 右侧实时查看预览效果
3. 点击"保存"或按 Ctrl+S/Cmd+S 保存到 URL
4. 点击"分享"获取可分享的链接
5. 点击"预览"以阅读模式查看

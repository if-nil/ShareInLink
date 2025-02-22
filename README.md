<p align="center">
  <a href="https://github.com/if-nil/reapi" target="_blank" rel="noopener noreferrer">
    <img width="350" src="https://raw.githubusercontent.com/if-nil/ShareInLink/refs/heads/main/public/logo.svg" alt="ShareInLink logo">
  </a>
</p>

English | [中文](README_ZH.md)

# ShareInLink

[![Netlify Status](https://api.netlify.com/api/v1/badges/beb2e1a6-117d-4e44-b705-f92b2b4f13eb/deploy-status)](https://app.netlify.com/sites/share-in-link/deploys)

A secure Markdown editor for local sharing. All content is stored in URL hash, making sharing simple while keeping your data in the browser.

## Features

- Real-time Markdown preview
- Code syntax highlighting
- Share via URL
- Preview in separate page
- Keyboard shortcuts (Ctrl+S / Cmd+S to save)
- Responsive design
- Dark mode editor

## Tech Stack

- Vue 3
- Vite
- Monaco Editor
- Marked.js

## Getting Started

### Prerequisites

- Node.js (v14+)
- pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/if-nil/sth-preview.git

# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build
```

### Usage

1. Write your Markdown content in the left editor
2. See real-time preview on the right
3. Click "Save" or press Ctrl+S/Cmd+S to save to URL
4. Click "Share" to get a shareable link
5. Click "Preview" to view in a clean reading mode

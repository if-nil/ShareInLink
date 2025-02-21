<script setup></script>

<template>
  <div class="app">
    <router-view></router-view>
  </div>
</template>

<style>
html,
body {
  margin: 0;
  padding: 0;
  height: 100%;
}

.app {
  min-height: 100vh;
  margin: 0;
}

/* 编辑器页面需要的样式 */
.app:has(.editor-container) {
  height: 100vh; /* 固定高度 */
  display: flex;
  flex-direction: column;
  padding: 20px;
  box-sizing: border-box;
  background-color: #1e1e1e;
  overflow: hidden; /* 防止编辑器页面滚动 */
}

/* 预览页面不需要 app 的 padding */
.app:has(.preview-page) {
  padding: 0;
  background-color: #f5f5f5;
  height: auto; /* 允许预览页面滚动 */
  min-height: 100vh;
  overflow-y: auto; /* 允许滚动 */
}
</style>

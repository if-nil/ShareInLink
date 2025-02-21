<script setup>
import CodeEditor from '../components/CodeEditor.vue'
import MarkdownPreview from '../components/MarkdownPreview.vue'
import Toast from '../components/Toast.vue'
import { ref, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import { compressToEncodedURIComponent, decompressFromEncodedURIComponent } from 'lz-string'

const route = useRoute()
const code = ref('# Welcome to Markdown Editor\n\nStart writing your document here...')
const markdownPreviewRef = ref(null)
const toast = ref(null)

const showToast = (message) => {
  toast.value = {
    id: Date.now(),
    message,
  }
}

const handleSave = (e) => {
  if (e) {
    e.preventDefault()
  }
  // 使用专门的 URL 压缩方法
  const compressedContent = compressToEncodedURIComponent(code.value)
  window.location.hash = compressedContent
  showToast('保存成功')
}

// 添加键盘快捷键监听
const handleKeyDown = (e) => {
  if ((e.ctrlKey || e.metaKey) && e.key === 's') {
    handleSave(e)
  }
}

onMounted(() => {
  const hash = route.hash.slice(1)
  if (hash) {
    try {
      const decompressed = decompressFromEncodedURIComponent(hash)
      code.value = decompressed || ''
    } catch (error) {
      console.error('解码失败:', error)
    }
  }

  // 添加事件监听
  window.addEventListener('keydown', handleKeyDown)
})

onUnmounted(() => {
  // 移除事件监听
  window.removeEventListener('keydown', handleKeyDown)
})

const handleCodeChange = (newCode) => {
  code.value = newCode
}

const handleShare = () => {
  markdownPreviewRef.value?.showShareModal()
}

const baseUrl = window.location.origin
</script>

<template>
  <div class="editor-container">
    <div class="panel code-panel">
      <div class="panel-header">
        <span>代码编辑器</span>
        <button class="save-button" @click="handleSave">保存</button>
      </div>
      <div class="content-container">
        <CodeEditor class="code-editor" @update:code="handleCodeChange" :model-value="code" />
      </div>
    </div>
    <div class="panel preview-panel">
      <div class="panel-header">
        <span>预览</span>
        <button class="share-button" @click="handleShare">分享</button>
      </div>
      <div class="content-container">
        <MarkdownPreview
          ref="markdownPreviewRef"
          class="preview"
          :content="code"
          :base-url="baseUrl"
        />
      </div>
    </div>
  </div>

  <!-- 提示组件 -->
  <Toast v-if="toast" :key="toast.id" :message="toast.message" @close="toast = null" />
</template>

<style scoped>
.editor-container {
  display: flex;
  gap: 20px;
  flex: 1;
  min-height: 0;
}

.panel {
  flex: 1;
  display: flex;
  flex-direction: column;
  background-color: #252525;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.panel-header {
  height: 48px;
  padding: 0 16px;
  background-color: #333;
  color: #fff;
  font-size: 14px;
  font-weight: 500;
  border-bottom: 1px solid #404040;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-shrink: 0;
}

.content-container {
  flex: 1;
  overflow: auto;
  padding: 16px;
}

.code-editor,
.preview {
  height: 100%;
}

.preview {
  background-color: #fff;
  color: #000;
}

.share-button {
  padding: 6px 12px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 13px;
  transition: background-color 0.2s;
  line-height: 1.4;
}

.share-button:hover {
  background-color: #45a049;
}

.save-button {
  padding: 6px 12px;
  background-color: #1a73e8;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 13px;
  transition: background-color 0.2s;
  line-height: 1.4;
}

.save-button:hover {
  background-color: #1557b0;
}

/* 调整按钮间距 */
.panel-header button {
  margin-left: 8px;
}
</style>

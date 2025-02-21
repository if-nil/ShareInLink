<script setup>
import CodeEditor from '../components/CodeEditor.vue'
import MarkdownPreview from '../components/MarkdownPreview.vue'
import Toast from '../components/Toast.vue'
import BaseButton from '../components/BaseButton.vue'
import { ref, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import { compressToEncodedURIComponent, decompressFromEncodedURIComponent } from 'lz-string'

const route = useRoute()
const code = ref('# Welcome to Local Share\n\nStart writing your document here...')
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
        <span>编辑器</span>
        <BaseButton type="primary" @click="handleSave">保存</BaseButton>
      </div>
      <div class="content-container">
        <CodeEditor class="code-editor" @update:code="handleCodeChange" :model-value="code" />
      </div>
    </div>
    <div class="panel preview-panel">
      <div class="panel-header">
        <span>预览</span>
        <BaseButton type="success" @click="handleShare">分享</BaseButton>
      </div>
      <div class="content-container">
        <MarkdownPreview
          ref="markdownPreviewRef"
          custom-class="preview"
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

/* 移动端样式 */
@media (max-width: 768px) {
  .editor-container {
    flex-direction: column;
    gap: 12px;
    padding: 12px;
    padding-bottom: 20px; /* 增加底部边距 */
  }

  .panel {
    min-height: 40vh; /* 调整为更合适的高度 */
    max-height: 50vh; /* 限制最大高度 */
  }

  .content-container {
    padding: 12px;
  }

  .panel-header {
    padding: 0 12px;
    height: 40px;
  }

  /* 最后一个面板添加底部边距 */
  .panel:last-child {
    margin-bottom: 12px;
  }
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

.panel-header button {
  margin-left: 8px;
}
</style>

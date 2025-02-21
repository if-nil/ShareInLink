<script setup>
import { marked } from 'marked'
import { computed, ref } from 'vue'
import Toast from './Toast.vue'
import { compressToEncodedURIComponent } from 'lz-string'

const props = defineProps({
  content: {
    type: String,
    default: '',
  },
  baseUrl: {
    type: String,
    required: true,
  },
})

const htmlContent = computed(() => {
  return marked(props.content)
})

const isShareModalVisible = ref(false)
const shareLink = computed(() => {
  const compressed = compressToEncodedURIComponent(props.content)
  return `${props.baseUrl}/preview#${compressed}`
})

// 使用 defineExpose 暴露方法给父组件
defineExpose({
  showShareModal: () => {
    isShareModalVisible.value = true
  },
})

const hideShareModal = () => {
  isShareModalVisible.value = false
}

const toast = ref(null)
const showToast = (message) => {
  toast.value = {
    id: Date.now(),
    message,
  }
}

const copyLink = async () => {
  try {
    await navigator.clipboard.writeText(shareLink.value)
    showToast('链接已复制到剪贴板')
  } catch {
    showToast('复制失败，请手动复制')
  }
}

const openPreview = () => {
  window.location.href = `/preview#${compressToEncodedURIComponent(props.content)}`
  hideShareModal()
}
</script>

<template>
  <div class="markdown-preview">
    <div v-html="htmlContent" class="markdown-content"></div>

    <!-- 分享对话框 -->
    <div v-if="isShareModalVisible" class="modal-overlay" @click="hideShareModal">
      <div class="modal-content" @click.stop>
        <div class="modal-header">
          <h3>分享文档</h3>
          <button class="close-button" @click="hideShareModal">×</button>
        </div>
        <div class="modal-body">
          <div class="share-link-container">
            <input type="text" :value="shareLink" readonly class="share-link-input" />
            <button class="copy-button" @click="copyLink">复制链接</button>
            <button class="preview-button" @click="openPreview">预览</button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- 提示组件 -->
  <Toast v-if="toast" :key="toast.id" :message="toast.message" @close="toast = null" />
</template>

<style scoped>
.markdown-preview {
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: #fff;
}

.markdown-content {
  flex: 1;
  overflow: auto;
  padding: 16px;
  line-height: 1.6;
}

/* Modal styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background-color: white;
  border-radius: 8px;
  width: 90%;
  max-width: 500px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.modal-header {
  padding: 16px;
  border-bottom: 1px solid #eee;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-header h3 {
  margin: 0;
  font-size: 18px;
  color: #333;
}

.close-button {
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #666;
}

.modal-body {
  padding: 16px;
}

.share-link-container {
  display: flex;
  gap: 8px;
}

.share-link-input {
  flex: 1;
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
}

.copy-button,
.preview-button {
  padding: 8px 16px;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  white-space: nowrap;
}

.copy-button {
  background-color: #1a73e8;
}

.copy-button:hover {
  background-color: #1557b0;
}

.preview-button {
  background-color: #34a853;
}

.preview-button:hover {
  background-color: #2d9147;
}

.markdown-content :deep(h1) {
  font-size: 2em;
  margin-bottom: 0.5em;
}

.markdown-content :deep(h2) {
  font-size: 1.5em;
  margin-bottom: 0.5em;
}

.markdown-content :deep(p) {
  margin-bottom: 1em;
}

.markdown-content :deep(ul),
.markdown-content :deep(ol) {
  padding-left: 2em;
  margin-bottom: 1em;
}

.markdown-content :deep(code) {
  background-color: #f0f0f0;
  padding: 0.2em 0.4em;
  border-radius: 3px;
  font-family: monospace;
}

.markdown-content :deep(pre code) {
  display: block;
  padding: 1em;
  overflow-x: auto;
}

.markdown-content :deep(blockquote) {
  border-left: 4px solid #ddd;
  padding-left: 1em;
  margin-left: 0;
  color: #666;
}
</style>

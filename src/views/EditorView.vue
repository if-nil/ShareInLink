<script setup>
import CodeEditor from '../components/CodeEditor.vue'
import MarkdownPreview from '../components/MarkdownPreview.vue'
import Toast from '../components/Toast.vue'
import BaseButton from '../components/BaseButton.vue'
import GithubIcon from '../components/icons/GithubIcon.vue'
import LanguageSelect from '../components/LanguageSelect.vue'
import { ref, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import { compressToEncodedURIComponent, decompressFromEncodedURIComponent } from 'lz-string'
import { defaultContent } from '../config/defaultContent'

const route = useRoute()
const userLang = navigator.language.toLowerCase().startsWith('zh') ? 'zh' : 'en'
const code = ref(defaultContent[userLang])
const markdownPreviewRef = ref(null)
const toast = ref(null)
const selectedLanguage = ref('markdown')

const GITHUB_URL = 'https://github.com/if-nil/ShareInLink'

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
        <div class="header-left">
          <span>编辑器</span>
          <LanguageSelect v-model="selectedLanguage" />
        </div>
        <div class="header-right">
          <a :href="GITHUB_URL" target="_blank" class="github-link" title="Star on GitHub">
            <GithubIcon />
            <span class="github-text">Star</span>
          </a>
          <BaseButton type="primary" @click="handleSave">保存</BaseButton>
        </div>
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

  .github-text {
    display: none; /* 在移动端隐藏文字 */
  }

  .header-right {
    gap: 8px;
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

.header-left {
  display: flex;
  align-items: center;
  gap: 12px;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 16px;
}

.github-link {
  display: flex;
  align-items: center;
  gap: 6px;
  color: #fff;
  opacity: 0.8;
  transition: opacity 0.2s;
  text-decoration: none;
  padding: 4px 8px;
  border-radius: 4px;
  background-color: rgba(255, 255, 255, 0.1);
}

.github-link:hover {
  opacity: 1;
  background-color: rgba(255, 255, 255, 0.15);
}

.github-text {
  font-size: 13px;
}
</style>

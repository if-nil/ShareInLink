<script setup>
import { ref, onMounted } from 'vue'
import { marked } from 'marked'
import { useRouter } from 'vue-router'
import { decompressFromEncodedURIComponent } from 'lz-string'
import BaseButton from '../components/BaseButton.vue'

const router = useRouter()
const content = ref('')
const decodedContent = ref('')

onMounted(() => {
  // 获取 URL hash（去掉开头的 # 号）
  const hash = window.location.hash.slice(1)
  if (hash) {
    try {
      const decompressed = decompressFromEncodedURIComponent(hash)
      if (decompressed) {
        decodedContent.value = marked(decompressed)
        content.value = decompressed
      } else {
        decodedContent.value = '内容解析失败'
      }
    } catch (error) {
      console.error('解码失败:', error)
      decodedContent.value = '内容解析失败'
    }
  }
})

const handleEdit = () => {
  // 保持原有的 hash
  router.push(`/${window.location.hash}`)
}
</script>

<template>
  <div class="preview-page">
    <div class="preview-content" v-html="decodedContent"></div>
    <div class="preview-footer">
      <BaseButton type="primary" @click="handleEdit">编辑此文档</BaseButton>
    </div>
  </div>
</template>

<style scoped>
.preview-page {
  max-width: 800px;
  margin: 0 auto;
  padding: 60px 20px;
  line-height: 1.6;
}

.preview-content {
  background-color: white;
  padding: 40px;
  border-radius: 8px 8px 0 0;
  word-wrap: break-word;
}

.preview-footer {
  background-color: white;
  padding: 20px;
  text-align: center;
  border-radius: 0 0 8px 8px;
  border-top: 1px solid #eee;
}

/* Markdown 内容样式 */
.preview-content :deep(h1) {
  font-size: 2em;
  margin-bottom: 0.5em;
}

.preview-content :deep(h2) {
  font-size: 1.5em;
  margin-bottom: 0.5em;
}

.preview-content :deep(p) {
  margin-bottom: 1em;
}

.preview-content :deep(ul),
.preview-content :deep(ol) {
  padding-left: 2em;
  margin-bottom: 1em;
}

.preview-content :deep(code) {
  background-color: #f5f5f5;
  padding: 0.2em 0.4em;
  border-radius: 3px;
  font-family: monospace;
}

.preview-content :deep(pre code) {
  display: block;
  padding: 1em;
  overflow-x: auto;
  background-color: #f8f9fa;
}

.preview-content :deep(blockquote) {
  border-left: 4px solid #ddd;
  padding-left: 1em;
  margin-left: 0;
  color: #666;
}
</style>

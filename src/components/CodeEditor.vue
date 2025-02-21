<script setup>
import { ref, onMounted, watch } from 'vue'
import * as monaco from 'monaco-editor'
import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker'

// 配置 worker
window.MonacoEnvironment = {
  getWorker() {
    return new editorWorker()
  },
}

const props = defineProps({
  modelValue: {
    type: String,
    default: '# Markdown Title\n\nWrite your content here...',
  },
})

const editorContainer = ref(null)
let editor = null

const emit = defineEmits(['update:code'])

onMounted(() => {
  editor = monaco.editor.create(editorContainer.value, {
    value: props.modelValue,
    language: 'markdown',
    theme: 'vs-dark',
    automaticLayout: true,
    minimap: {
      enabled: false,
    },
    scrollbar: {
      useShadows: false,
      verticalScrollbarSize: 10,
      horizontalScrollbarSize: 10,
      verticalSliderSize: 10,
      horizontalSliderSize: 10,
      verticalHasArrows: false,
      horizontalHasArrows: false,
      arrowSize: 0,
      vertical: 'visible',
      horizontal: 'visible',
    },
  })

  // 监听编辑器内容变化
  editor.onDidChangeModelContent(() => {
    const content = editor.getValue()
    emit('update:code', content)
  })
})

// 监听外部内容变化
watch(
  () => props.modelValue,
  (newValue) => {
    if (editor && newValue !== editor.getValue()) {
      editor.setValue(newValue)
    }
  },
)
</script>

<template>
  <div ref="editorContainer" class="code-editor"></div>
</template>

<style scoped>
.code-editor {
  /* width: 100%; */
  height: 100%;
  border-radius: 4px;
  overflow: hidden;
}

/* 自定义滚动条样式 */
:deep(.monaco-editor) ::-webkit-scrollbar {
  width: 12px;
  height: 12px;
}

:deep(.monaco-editor) ::-webkit-scrollbar-track {
  background: #1e1e1e;
}

:deep(.monaco-editor) ::-webkit-scrollbar-thumb {
  background-color: #4a4a4a;
  border-radius: 6px;
  border: 3px solid #1e1e1e;
}

:deep(.monaco-editor) ::-webkit-scrollbar-thumb:hover {
  background-color: #555;
}

:deep(.monaco-editor) ::-webkit-scrollbar-corner {
  background-color: #1e1e1e;
}
</style>

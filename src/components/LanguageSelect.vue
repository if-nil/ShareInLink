<script setup>
const props = defineProps({
  modelValue: {
    type: String,
    default: 'markdown',
  },
})

const emit = defineEmits(['update:modelValue'])

const languages = [
  { value: 'markdown', label: 'Markdown' },
  { value: 'javascript', label: 'JavaScript' },
  { value: 'typescript', label: 'TypeScript' },
  { value: 'html', label: 'HTML' },
  { value: 'css', label: 'CSS' },
  { value: 'json', label: 'JSON' },
]
</script>

<template>
  <select
    class="language-select"
    :value="modelValue"
    @change="(e) => emit('update:modelValue', e.target.value)"
  >
    <option v-for="lang in languages" :key="lang.value" :value="lang.value">
      {{ lang.label }}
    </option>
  </select>
</template>

<style scoped>
.language-select {
  background-color: rgba(255, 255, 255, 0.1);
  color: #fff;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 4px;
  padding: 4px 8px;
  font-size: 13px;
  cursor: pointer;
  outline: none;
  transition: all 0.2s;
}

.language-select:hover {
  background-color: rgba(255, 255, 255, 0.15);
  border-color: rgba(255, 255, 255, 0.3);
}

.language-select option {
  background-color: #333;
  color: #fff;
}
</style>

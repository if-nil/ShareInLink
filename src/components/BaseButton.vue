<script setup>
defineProps({
  type: {
    type: String,
    default: 'default', // default, primary, success
  },
  onClick: {
    type: Function,
    default: () => {},
  },
})
</script>

<template>
  <button :class="['base-button', `base-button--${type}`]" @click="onClick">
    <slot></slot>
  </button>
</template>

<style scoped>
.base-button {
  padding: 6px 12px;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 13px;
  transition: background-color 0.2s;
  line-height: 1.4;
}

.base-button--default {
  background-color: #666;
}

.base-button--default:hover {
  background-color: #555;
}

.base-button--primary {
  background-color: #1a73e8;
}

.base-button--primary:hover {
  background-color: #1557b0;
}

.base-button--success {
  background-color: #4caf50;
}

.base-button--success:hover {
  background-color: #45a049;
}
</style>

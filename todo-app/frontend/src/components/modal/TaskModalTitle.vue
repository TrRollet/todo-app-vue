<template>
  <div class="title-section">
    <h1 class="task-title">{{ task.title }}</h1>
  </div>
</template>

<script setup>
const props = defineProps({
  task: {
    type: Object,
    required: true
  }
})
</script>

<style scoped>
.title-section {
  margin-bottom: 32px;
  padding-bottom: 24px;
  border-bottom: 2px solid #f1f5f9;
}

.task-title {
  margin: 0;
  font-size: 28px;
  font-weight: 800;
  color: #1a202c;
  line-height: 1.3;
  word-break: break-word;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

@media (max-width: 768px) {
  .task-title {
    font-size: 24px;
  }
}
</style>
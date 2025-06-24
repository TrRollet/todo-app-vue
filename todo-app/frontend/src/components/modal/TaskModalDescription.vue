<template>
  <div class="description-section">
    <h3 class="section-title">
      <span class="section-icon">
        <FileText :size="20" />
      </span>
      Description
    </h3>
    <div class="description-content">
      <p v-if="task.description" class="description-text">{{ task.description }}</p>
      <p v-else class="no-description">Aucune description fournie</p>
    </div>
  </div>
</template>

<script setup>
import { FileText } from 'lucide-vue-next'

const props = defineProps({
  task: {
    type: Object,
    required: true
  }
})
</script>

<style scoped>
.description-section {
  margin-bottom: 32px;
}

.section-title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 18px;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 16px;
}

.section-icon {
  font-size: 20px;
}

.section-icon svg {
  vertical-align: middle;
}

.description-content {
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 20px;
}

.description-text {
  margin: 0;
  line-height: 1.6;
  color: #374151;
  font-size: 16px;
  white-space: pre-wrap;
  word-break: break-word;
}

.no-description {
  margin: 0;
  color: #9ca3af;
  font-style: italic;
}
</style>
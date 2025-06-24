<template>
  <div class="modal-header">
    <div class="header-info">
      <div class="task-icon">
        <ClipboardList :size="24" />
      </div>
      <div class="task-meta-header">
        <span class="task-id">#{{ task.id }}</span>
        <span class="task-status-mini" :class="getStatusClass()">{{ task.status }}</span>
      </div>
    </div>
    <button @click="$emit('close')" class="btn-close">
      <span class="close-icon">
        <X :size="18" />
      </span>
    </button>
  </div>
</template>

<script setup>
import { ClipboardList, X } from 'lucide-vue-next'

const props = defineProps({
  task: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['close'])

function getStatusClass() {
  const statusClasses = {
    'À faire': 'status-todo',
    'En cours': 'status-progress',
    'Terminé': 'status-done'
  }
  return statusClasses[props.task.status] || 'status-default'
}
</script>

<style scoped>
.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 32px;
  border-bottom: 1px solid #e5e7eb;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  flex-shrink: 0;
}

.header-info {
  display: flex;
  align-items: center;
  gap: 16px;
}

.task-icon {
  font-size: 24px;
}

.task-meta-header {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.task-id {
  font-size: 14px;
  font-weight: 600;
  opacity: 0.9;
}

.task-status-mini {
  font-size: 12px;
  padding: 2px 8px;
  border-radius: 8px;
  font-weight: 600;
  background: rgba(255, 255, 255, 0.2);
  width: fit-content;
}

.btn-close {
  background: rgba(255, 255, 255, 0.2);
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

.btn-close:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: scale(1.1);
}

.task-icon svg,
.close-icon svg {
  vertical-align: middle;
}

.close-icon svg {
  color: white;
}

@media (max-width: 768px) {
  .modal-header {
    padding: 16px 20px;
  }
}
</style>
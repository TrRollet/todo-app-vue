<template>
  <div class="modal-actions">
    <button @click="$emit('edit', task)" class="btn-primary">
      <span class="btn-icon">
        <Edit :size="16" />
      </span>
      Modifier
    </button>
    <button @click="$emit('delete', task.id)" class="btn-danger">
      <span class="btn-icon">
        <Trash2 :size="16" />
      </span>
      Supprimer
    </button>
  </div>
</template>

<script setup>
import { Edit, Trash2 } from 'lucide-vue-next'

const props = defineProps({
  task: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['edit', 'delete'])
</script>

<style scoped>
.modal-actions {
  display: flex;
  gap: 12px;
  padding: 24px 32px;
  border-top: 1px solid #e5e7eb;
  background: #f9fafb;
  flex-wrap: wrap;
  flex-shrink: 0;
}

.btn-primary, .btn-danger {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 20px;
  border-radius: 10px;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease;
  border: none;
  flex: 1;
  min-width: 120px;
  justify-content: center;
}

.btn-primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.6);
}

.btn-danger {
  background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
  color: white;
  box-shadow: 0 4px 15px rgba(239, 68, 68, 0.4);
}

.btn-danger:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(239, 68, 68, 0.6);
}

.btn-icon {
  font-size: 16px;
}

.btn-icon svg {
  vertical-align: middle;
}

@media (max-width: 768px) {
  .modal-actions {
    padding: 20px;
    flex-direction: column;
  }
  
  .btn-primary, .btn-danger {
    flex: none;
    width: 100%;
  }
}
</style>
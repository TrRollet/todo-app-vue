<template>
  <div class="form-actions">
    <button 
      type="button"
      @click="$emit('cancel')"
      class="btn-secondary"
    >
      Annuler
    </button>
    <button 
      type="submit"
      class="btn-primary"
      :disabled="!isValid"
    >
      <span class="btn-icon">
        <component :is="mode === 'create' ? Rocket : Save" :size="16" />
      </span>
      {{ mode === 'create' ? 'Créer la tâche' : 'Sauvegarder' }}
    </button>
  </div>
</template>

<script setup>
import { Rocket, Save } from 'lucide-vue-next'

defineProps({
  mode: {
    type: String,
    required: true
  },
  isValid: {
    type: Boolean,
    required: true
  }
})

defineEmits(['cancel'])
</script>

<style scoped>
.form-actions {
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  margin-top: 24px;
  padding-top: 20px;
  border-top: 1px solid #f1f3f4;
}

.btn-secondary,
.btn-primary {
  padding: 14px 20px;
  border-radius: 10px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 110px;
  justify-content: center;
}

.btn-secondary {
  background: #f9fafb;
  border: 2px solid #e5e7eb;
  color: #374151;
}

.btn-secondary:hover {
  background: #f3f4f6;
  border-color: #d1d5db;
}

.btn-primary {
  background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
  border: none;
  color: white;
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
}

.btn-primary:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(59, 130, 246, 0.4);
}

.btn-primary:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

.btn-icon {
  font-size: 16px;
}

.btn-icon svg {
  vertical-align: middle;
}

@media (max-width: 640px) {
  .form-actions {
    flex-direction: column;
  }
  
  .btn-secondary,
  .btn-primary {
    width: 100%;
  }
}
</style>
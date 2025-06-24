<template>
  <button 
    @click="$emit('click')"
    class="btn-add-floating"
    :disabled="disabled"
    :class="{ 'btn-disabled': disabled }"
    title="Créer une nouvelle tâche"
  >
    <span class="btn-add-icon">
      <Plus :size="24" />
    </span>
    <span class="btn-add-text">Nouvelle tâche</span>
  </button>
</template>

<script setup>
import { Plus } from 'lucide-vue-next'

defineProps({
  disabled: {
    type: Boolean,
    default: false
  }
})

defineEmits(['click'])
</script>

<style scoped>
.btn-add-floating {
  position: fixed;
  bottom: 32px;
  right: 32px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 56px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px 24px;
  transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  box-shadow: 0 8px 32px rgba(102, 126, 234, 0.4);
  z-index: 100;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  white-space: nowrap;
  min-height: 56px;
}

.btn-add-floating:hover:not(:disabled) {
  transform: translateY(-4px) scale(1.05);
  box-shadow: 0 12px 48px rgba(102, 126, 234, 0.6);
  background: linear-gradient(135deg, #7c3aed 0%, #8b5cf6 100%);
}

.btn-add-floating:active:not(:disabled) {
  transform: translateY(-2px) scale(1.02);
}

.btn-disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none !important;
  box-shadow: none !important;
}

.btn-add-floating .btn-add-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
}

.btn-add-floating .btn-add-text {
  font-weight: 600;
  letter-spacing: 0.025em;
}

.btn-add-floating::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  padding: 2px;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.1));
  mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  mask-composite: xor;
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.btn-add-floating:hover::before {
  opacity: 1;
}

.btn-add-icon {
  display: flex;
  align-items: center;
}

.btn-add-icon svg {
  vertical-align: middle;
}

@media (max-width: 768px) {
  .btn-add-floating {
    bottom: 24px;
    right: 24px;
    padding: 14px 20px;
    font-size: 15px;
    border-radius: 48px;
    min-height: 48px;
  }
  
  .btn-add-floating .btn-add-icon {
    width: 20px;
    height: 20px;
  }
}

@media (max-width: 480px) {
  .btn-add-floating {
    bottom: 20px;
    right: 20px;
    left: 20px;
    border-radius: 48px;
    justify-content: center;
  }
}
</style>
<template>
  <div class="form-header">
    <h2 class="form-title">
      <span class="form-icon">
        <component :is="mode === 'create' ? Sparkles : Edit" :size="24" />
      </span>
      {{ mode === 'create' ? 'Créer une nouvelle tâche' : 'Modifier la tâche' }}
    </h2>
    <button 
      type="button" 
      @click="$emit('cancel')" 
      class="close-btn"
      aria-label="Fermer"
    >
      <X :size="20" />
    </button>
  </div>
</template>

<script setup>
import { Sparkles, Edit, X } from 'lucide-vue-next'

defineProps({
  mode: {
    type: String,
    required: true
  }
})

defineEmits(['cancel'])
</script>

<style scoped>
.form-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 28px 32px 20px;
  border-bottom: 1px solid #f1f3f4;
  flex-shrink: 0;
}

.form-title {
  font-size: 22px;
  font-weight: 700;
  color: #1a1a1a;
  display: flex;
  align-items: center;
  gap: 12px;
  margin: 0;
}

.form-icon {
  font-size: 24px;
}

.form-icon svg,
.close-btn svg {
  vertical-align: middle;
}

.close-btn {
  background: none;
  border: none;
  color: #6b7280;
  cursor: pointer;
  padding: 8px;
  border-radius: 8px;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.close-btn:hover {
  background: #f3f4f6;
  color: #374151;
}

@media (max-width: 640px) {
  .form-header {
    padding: 24px 24px 16px;
  }
  
  .form-title {
    font-size: 18px;
  }
}
</style>
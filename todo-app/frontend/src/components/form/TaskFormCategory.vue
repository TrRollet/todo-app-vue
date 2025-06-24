<template>
  <div class="form-group">
    <label class="form-label">
      <span class="label-text">Catégorie</span>
      <span class="required">*</span>
    </label>
    <div class="select-wrapper">
      <select 
        :value="modelValue"
        @change="$emit('update:modelValue', $event.target.value)"
        required
        class="form-select"
      >
        <option value="">Choisir une catégorie</option>
        <option v-for="category in store.categories" :key="category" :value="category">
          {{ category }}
        </option>
      </select>
      <div class="select-icon">
        <ChevronDown :size="12" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { useTaskStore } from '@/stores/tasks'
import { ChevronDown } from 'lucide-vue-next'

const store = useTaskStore()

defineProps({
  modelValue: {
    type: String,
    default: ''
  }
})

defineEmits(['update:modelValue'])
</script>

<style scoped>
.form-group {
  margin-bottom: 20px;
}

.form-label {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 8px;
}

.label-text {
  font-size: 14px;
  font-weight: 600;
  color: #374151;
}

.required {
  color: #ef4444;
  font-weight: 600;
  font-size: 12px;
}

.select-wrapper {
  position: relative;
}

.form-select {
  width: 100%;
  padding: 14px 16px;
  border: 2px solid #e5e7eb;
  border-radius: 10px;
  font-size: 15px;
  background: #fafafa;
  cursor: pointer;
  appearance: none;
  transition: all 0.2s ease;
}

.form-select:focus {
  outline: none;
  border-color: #3b82f6;
  background: white;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.select-icon {
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  color: #6b7280;
  pointer-events: none;
  display: flex;
  align-items: center;
}

.select-icon svg {
  vertical-align: middle;
}
</style>
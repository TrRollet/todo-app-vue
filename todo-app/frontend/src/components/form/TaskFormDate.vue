<template>
  <div class="form-group">
    <label class="form-label">
      <span class="label-text">Date d'échéance</span>
      <span class="required">*</span>
    </label>
    <div class="date-wrapper">
      <input 
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        type="date"
        required
        class="form-date"
        :min="minDate"
      >
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

defineProps({
  modelValue: {
    type: String,
    default: ''
  }
})

defineEmits(['update:modelValue'])

const minDate = computed(() => {
  const today = new Date()
  return today.toISOString().split('T')[0]
})
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

.date-wrapper {
  position: relative;
}

.form-date {
  width: 100%;
  padding: 14px 16px;
  border: 2px solid #e5e7eb;
  border-radius: 10px;
  font-size: 15px;
  background: #fafafa;
  transition: all 0.2s ease;
}

.form-date:focus {
  outline: none;
  border-color: #3b82f6;
  background: white;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}
</style>
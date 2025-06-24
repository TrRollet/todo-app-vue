<template>
  <div class="form-group">
    <label class="form-label">
      <span class="label-text">Titre de la tâche</span>
      <span class="required">*</span>
    </label>
    <input 
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      type="text" 
      required
      minlength="3"
      class="form-input"
      placeholder="Ex: Finaliser le rapport mensuel"
      :class="{ 'input-error': error }"
    >
    <div v-if="error" class="error-message">
      Le titre doit contenir au moins 3 caractères
    </div>
  </div>
</template>

<script setup>
defineProps({
  modelValue: {
    type: String,
    required: true
  },
  error: {
    type: Boolean,
    default: false
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

.form-input {
  width: 100%;
  padding: 14px 16px;
  border: 2px solid #e5e7eb;
  border-radius: 10px;
  font-size: 15px;
  font-family: inherit;
  transition: all 0.2s ease;
  background: #fafafa;
}

.form-input:focus {
  outline: none;
  border-color: #3b82f6;
  background: white;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.form-input::placeholder {
  color: #9ca3af;
}

.input-error {
  border-color: #ef4444 !important;
  background: #fef2f2 !important;
}

.error-message {
  color: #ef4444;
  font-size: 12px;
  margin-top: 6px;
  display: flex;
  align-items: center;
  gap: 4px;
}
</style>
<template>
  <div class="form-group">
    <label class="form-label">
      <span class="label-text">Description</span>
      <span class="optional">(optionnel)</span>
    </label>
    <textarea 
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      class="form-textarea"
      rows="3"
      placeholder="Décrivez votre tâche en détail..."
    ></textarea>
  </div>
</template>

<script setup>
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

.optional {
  color: #6b7280;
  font-size: 12px;
  font-weight: 400;
}

.form-textarea {
  width: 100%;
  padding: 14px 16px;
  border: 2px solid #e5e7eb;
  border-radius: 10px;
  font-size: 15px;
  font-family: inherit;
  transition: all 0.2s ease;
  background: #fafafa;
  resize: none;
}

.form-textarea:focus {
  outline: none;
  border-color: #3b82f6;
  background: white;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.form-textarea::placeholder {
  color: #9ca3af;
}
</style>
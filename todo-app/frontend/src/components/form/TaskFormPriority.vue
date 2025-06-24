<template>
  <div class="form-group">
    <label class="form-label">
      <span class="label-text">Priorité</span>
      <span class="required">*</span>
    </label>
    <div class="priority-buttons">
      <button
        type="button"
        v-for="priority in priorities"
        :key="priority.value"
        @click="$emit('update:modelValue', priority.value)"
        class="priority-btn"
        :class="[
          `priority-${priority.value.toLowerCase()}`,
          { 'active': modelValue === priority.value }
        ]"
      >
        <span class="priority-dot" :class="`dot-${priority.value.toLowerCase()}`"></span>
        <span class="priority-text">{{ priority.label }}</span>
      </button>
    </div>
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

const priorities = [
  { value: 'Haute', label: 'Haute' },
  { value: 'Moyenne', label: 'Moyenne' },
  { value: 'Basse', label: 'Basse' }
]
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

.priority-buttons {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.priority-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 8px 10px;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  background: #fafafa;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 12px;
  font-weight: 500;
  color: #374151;
  flex: 1;
  min-width: 70px;
  white-space: nowrap;
}

.priority-text {
  white-space: nowrap;
  overflow: visible;
}

.priority-btn:hover {
  background: white;
  transform: translateY(-1px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.priority-btn.active {
  background: white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transform: translateY(-1px);
}

.priority-btn.priority-haute.active {
  border-color: #ef4444;
  color: #dc2626;
}

.priority-btn.priority-moyenne.active {
  border-color: #f59e0b;
  color: #d97706;
}

.priority-btn.priority-basse.active {
  border-color: #10b981;
  color: #059669;
}

.priority-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  flex-shrink: 0;
}

.dot-haute {
  background: #ef4444;
}

.dot-moyenne {
  background: #f59e0b;
}

.dot-basse {
  background: #10b981;
}

@media (max-width: 640px) {
  .priority-buttons {
    flex-direction: column;
  }
  
  .priority-btn {
    flex: none;
    justify-content: flex-start;
  }
}
</style>
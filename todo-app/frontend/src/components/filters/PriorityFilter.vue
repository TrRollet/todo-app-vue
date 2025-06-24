<template>
  <div class="filter-card priority-card">
    <div class="filter-header">
      <span class="filter-icon">
        <Zap :size="18" />
      </span>
      <h4 class="filter-title">Priorité</h4>
    </div>
    <div class="priority-options">
      <button 
        v-for="priority in priorityOptions"
        :key="priority.value"
        @click="selectPriority(priority.value)"
        class="priority-button"
        :class="[
          priority.class,
          { 'active': modelValue === priority.value }
        ]"
      >
        <span class="priority-dot" :class="priority.dotClass"></span>
        <span class="priority-label">{{ priority.label }}</span>
        <CheckCircle v-if="modelValue === priority.value" :size="14" class="check-icon" />
      </button>
    </div>
  </div>
</template>

<script setup>
import { Zap, CheckCircle } from 'lucide-vue-next'

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['update:modelValue'])

const priorityOptions = [
  { 
    value: '', 
    label: 'Toutes', 
    class: 'priority-all', 
    dotClass: 'dot-all' 
  },
  { 
    value: 'Haute', 
    label: 'Haute', 
    class: 'priority-high', 
    dotClass: 'dot-high' 
  },
  { 
    value: 'Moyenne', 
    label: 'Moyenne', 
    class: 'priority-medium', 
    dotClass: 'dot-medium' 
  },
  { 
    value: 'Basse', 
    label: 'Basse', 
    class: 'priority-low', 
    dotClass: 'dot-low' 
  }
]

function selectPriority(priority) {
  emit('update:modelValue', priority)
}
</script>

<style scoped>
.filter-card {
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(15px);
  border: 1px solid rgba(255, 255, 255, 0.8);
  border-radius: 16px;
  padding: 20px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.03);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.filter-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.08);
  border-color: rgba(102, 126, 234, 0.3);
}

.filter-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
}

.filter-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 12px;
  transition: all 0.3s ease;
}

.filter-title {
  margin: 0;
  font-size: 16px;
  font-weight: 700;
  color: #1e293b;
}

.priority-options {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 8px;
}

.priority-button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  padding: 10px 6px;
  border: 2px solid transparent;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.6);
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  font-weight: 500;
  position: relative;
  overflow: hidden;
  font-size: 13px;
  min-height: 44px;
  flex-direction: row;
}

.priority-label {
  font-size: 11px;
  white-space: nowrap;
  text-align: center;
  line-height: 1;
}

.priority-button::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
  transition: left 0.5s ease;
}

.priority-button:hover::before {
  left: 100%;
}

.priority-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
}

.priority-button.active {
  border-color: currentColor;
  background: rgba(255, 255, 255, 0.9);
  transform: scale(1.02);
}

.priority-all { color: #64748b; }
.priority-high { color: #ef4444; }
.priority-medium { color: #f59e0b; }
.priority-low { color: #10b981; }

.priority-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  flex-shrink: 0;
  margin-bottom: 0;
}

.dot-all { background: #94a3b8; }
.dot-high { background: #ef4444; }
.dot-medium { background: #f59e0b; }
.dot-low { background: #10b981; }

.check-icon {
  position: absolute;
  top: 4px;
  right: 4px;
  color: #10b981;
  animation: scale-in 0.2s ease;
}

@keyframes scale-in {
  from { transform: scale(0); }
  to { transform: scale(1); }
}

@media (max-width: 1024px) {
  .priority-options {
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
  }
  
  .priority-button {
    flex-direction: row;
    justify-content: flex-start;
    padding: 12px 14px;
    font-size: 14px;
  }
  
  .priority-label {
    font-size: 13px;
  }
  
  .priority-dot {
    margin-bottom: 0;
    margin-right: 6px;
  }
  
  .check-icon {
    position: static;
    margin-left: auto;
  }
}

@media (max-width: 768px) {
  .priority-options {
    grid-template-columns: 1fr;
    gap: 8px;
  }
  
  .priority-button {
    justify-content: flex-start;
  }
}
</style>
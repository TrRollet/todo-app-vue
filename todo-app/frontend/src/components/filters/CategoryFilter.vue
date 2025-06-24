<template>
  <div class="filter-card category-card">
    <div class="filter-header">
      <span class="filter-icon">
        <Tag :size="18" />
      </span>
      <h4 class="filter-title">Catégorie</h4>
    </div>
    <div class="category-select-wrapper">
      <select 
        :value="modelValue"
        @change="$emit('update:modelValue', $event.target.value)"
        class="modern-select category-select"
      >
        <option value="">Toutes les catégories</option>
        <option v-for="category in store.categories" :key="category" :value="category">
          {{ category }}
        </option>
      </select>
      <span class="select-icon">
        <ChevronDown :size="16" />
      </span>
    </div>
  </div>
</template>

<script setup>
import { Tag, ChevronDown } from 'lucide-vue-next'
import { useTaskStore } from '@/stores/tasks'

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

.category-select-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.modern-select {
  width: 100%;
  padding: 12px 16px;
  border: 2px solid rgba(203, 213, 225, 0.6);
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.8);
  color: #334155;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  appearance: none;
}

.modern-select:focus {
  outline: none;
  border-color: #667eea;
  background: rgba(255, 255, 255, 0.95);
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.select-icon {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: #64748b;
  pointer-events: none;
  transition: all 0.3s ease;
}

.modern-select:focus + .select-icon {
  color: #667eea;
  transform: translateY(-50%) rotate(180deg);
}
</style>
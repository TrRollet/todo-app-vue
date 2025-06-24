<template>
  <div class="filter-card sort-card">
    <div class="filter-header">
      <span class="filter-icon">
        <ArrowUpDown :size="18" />
      </span>
      <h4 class="filter-title">Tri</h4>
    </div>
    <div class="sort-options">
      <div class="sort-by-wrapper">
        <select 
          :value="sortBy"
          @change="$emit('update:sortBy', $event.target.value); $emit('update')"
          class="modern-select sort-select"
        >
          <option value="due_date">Date d'échéance</option>
          <option value="priority">Priorité</option>
        </select>
        <span class="select-icon">
          <Calendar v-if="sortBy === 'due_date'" :size="14" />
          <Zap v-else :size="14" />
        </span>
      </div>
      <button 
        @click="toggleSortOrder"
        class="sort-order-button"
        :class="{ 'desc': sortOrder === 'desc' }"
        :title="sortOrder === 'asc' ? 'Croissant' : 'Décroissant'"
      >
        <ArrowUp v-if="sortOrder === 'asc'" :size="16" />
        <ArrowDown v-else :size="16" />
      </button>
    </div>
  </div>
</template>

<script setup>
import { ArrowUpDown, Calendar, Zap, ArrowUp, ArrowDown } from 'lucide-vue-next'

const props = defineProps({
  sortBy: {
    type: String,
    required: true
  },
  sortOrder: {
    type: String,
    required: true
  }
})

const emit = defineEmits(['update:sortBy', 'update:sortOrder', 'update'])

function toggleSortOrder() {
  const newOrder = props.sortOrder === 'asc' ? 'desc' : 'asc'
  emit('update:sortOrder', newOrder)
  emit('update')
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

.sort-options {
  display: flex;
  gap: 12px;
  align-items: center;
}

.sort-by-wrapper {
  flex: 1;
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

.sort-order-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border: 2px solid rgba(203, 213, 225, 0.6);
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.8);
  color: #64748b;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.sort-order-button:hover {
  background: rgba(102, 126, 234, 0.1);
  border-color: #667eea;
  color: #667eea;
  transform: translateY(-2px);
}

.sort-order-button.desc {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-color: #667eea;
  color: white;
}

@media (max-width: 768px) {
  .sort-options {
    flex-direction: column;
    align-items: stretch;
  }
  
  .sort-order-button {
    width: 100%;
    height: 44px;
  }
}
</style>
<template>
  <Transition name="active-filters" appear>
    <div class="active-filters-card">
      <div class="filter-header">
        <span class="filter-icon active">
          <Filter :size="18" />
        </span>
        <h4 class="filter-title">Filtres actifs</h4>
      </div>
      <div class="active-filters-list">
        <span v-if="filters.priority" class="active-filter-tag priority-tag">
          <Zap :size="12" />
          {{ filters.priority }}
          <button @click="$emit('clearFilter', 'priority')" class="remove-filter">
            <X :size="10" />
          </button>
        </span>
        <span v-if="filters.category" class="active-filter-tag category-tag">
          <Tag :size="12" />
          {{ filters.category }}
          <button @click="$emit('clearFilter', 'category')" class="remove-filter">
            <X :size="10" />
          </button>
        </span>
        <span v-if="filters.search" class="active-filter-tag search-tag">
          <Search :size="12" />
          "{{ filters.search }}"
          <button @click="$emit('clearFilter', 'search')" class="remove-filter">
            <X :size="10" />
          </button>
        </span>
      </div>
      <button @click="$emit('clearAll')" class="clear-all-button">
        <RotateCcw :size="14" />
        Tout effacer
      </button>
    </div>
  </Transition>
</template>

<script setup>
import { Filter, Zap, Tag, Search, X, RotateCcw } from 'lucide-vue-next'

defineProps({
  filters: {
    type: Object,
    required: true
  }
})

defineEmits(['clearFilter', 'clearAll'])
</script>

<style scoped>
.active-filters-card {
  grid-column: 1 / -1;
  background: linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%);
  border: 2px solid #10b981;
  border-radius: 16px;
  padding: 16px;
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

.filter-icon.active {
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  animation: glow-green 2s infinite;
}

@keyframes glow-green {
  0%, 100% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.4); }
  50% { box-shadow: 0 0 20px rgba(16, 185, 129, 0.3); }
}

.filter-title {
  margin: 0;
  font-size: 16px;
  font-weight: 700;
  color: #1e293b;
}

.active-filters-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 12px;
}

.active-filter-tag {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  color: #374151;
  animation: slide-in 0.3s ease;
}

@keyframes slide-in {
  from { 
    opacity: 0; 
    transform: translateX(-20px); 
  }
  to { 
    opacity: 1; 
    transform: translateX(0); 
  }
}

.remove-filter {
  background: rgba(239, 68, 68, 0.1);
  border: none;
  color: #ef4444;
  cursor: pointer;
  padding: 2px;
  border-radius: 50%;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.remove-filter:hover {
  background: rgba(239, 68, 68, 0.2);
  transform: scale(1.1);
}

.clear-all-button {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 14px;
  background: rgba(239, 68, 68, 0.1);
  border: 2px solid rgba(239, 68, 68, 0.3);
  border-radius: 12px;
  color: #ef4444;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  align-self: flex-start;
  font-size: 13px;
}

.clear-all-button:hover {
  background: rgba(239, 68, 68, 0.2);
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(239, 68, 68, 0.2);
}

/* Transitions Vue pour les filtres actifs */
.active-filters-enter-active {
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.active-filters-leave-active {
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.active-filters-enter-from {
  opacity: 0;
  transform: translateY(-12px) scale(0.98);
  max-height: 0;
  padding-top: 0;
  padding-bottom: 0;
  margin-top: 0;
  margin-bottom: 0;
}

.active-filters-leave-to {
  opacity: 0;
  transform: translateY(-12px) scale(0.98);
  max-height: 0;
  padding-top: 0;
  padding-bottom: 0;
  margin-top: 0;
  margin-bottom: 0;
}

.active-filters-enter-to,
.active-filters-leave-from {
  opacity: 1;
  transform: translateY(0) scale(1);
  max-height: 200px;
  padding-top: 16px;
  padding-bottom: 16px;
}

@media (max-width: 768px) {
  .active-filters-card {
    padding: 14px;
  }

  .active-filters-list {
    margin-bottom: 10px;
  }
  
  .clear-all-button {
    padding: 6px 12px;
    font-size: 12px;
  }
}
</style>
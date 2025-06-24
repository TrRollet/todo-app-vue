<template>
  <button 
    @click="$emit('toggle')" 
    class="toggle-filters-btn"
    :class="{ 
      'active': showFilters,
      'has-active-filters': hasActiveFilters && !showFilters && activeFiltersCount > 0
    }"
    :title="showFilters ? 'Masquer les filtres' : 'Afficher les filtres'"
  >
    <Settings :size="18" />
    <span class="toggle-text">{{ showFilters ? 'Masquer' : 'Filtres' }}</span>
    
    <!-- Badge d'indication des filtres actifs -->
    <span 
      v-if="hasActiveFilters && !showFilters && activeFiltersCount > 0" 
      class="active-filters-badge"
    >
      {{ activeFiltersCount }}
    </span>
    
    <ChevronDown v-if="!showFilters" :size="16" class="chevron" />
    <ChevronUp v-else :size="16" class="chevron" />
  </button>
</template>

<script setup>
import { Settings, ChevronDown, ChevronUp } from 'lucide-vue-next'

defineProps({
  showFilters: {
    type: Boolean,
    required: true
  },
  hasActiveFilters: {
    type: Boolean,
    required: true
  },
  activeFiltersCount: {
    type: Number,
    required: true
  }
})

defineEmits(['toggle'])
</script>

<style scoped>
.toggle-filters-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
  white-space: nowrap;
  min-height: 48px;
  flex-shrink: 0;
}

.toggle-filters-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
  background: linear-gradient(135deg, #7c3aed 0%, #8b5cf6 100%);
}

.toggle-filters-btn.active {
  background: linear-gradient(135deg, #10b981 0%, #059669 100%) !important;
  box-shadow: 0 4px 15px rgba(16, 185, 129, 0.3) !important;
  animation: none !important;
}

.toggle-filters-btn.active:hover {
  box-shadow: 0 6px 20px rgba(16, 185, 129, 0.4) !important;
}

.toggle-filters-btn.has-active-filters {
  background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
  box-shadow: 0 4px 15px rgba(245, 158, 11, 0.4);
  animation: pulse-filters 2s infinite;
}

.toggle-filters-btn.has-active-filters:hover {
  background: linear-gradient(135deg, #d97706 0%, #b45309 100%);
  box-shadow: 0 6px 20px rgba(245, 158, 11, 0.5);
}

@keyframes pulse-filters {
  0%, 100% { 
    box-shadow: 0 4px 15px rgba(245, 158, 11, 0.4);
  }
  50% { 
    box-shadow: 0 4px 20px rgba(245, 158, 11, 0.6);
  }
}

.active-filters-badge {
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 20px;
  height: 20px;
  background: rgba(255, 255, 255, 0.9);
  color: #d97706;
  border-radius: 10px;
  font-size: 12px;
  font-weight: 700;
  padding: 0 6px;
  margin-left: 4px;
  animation: badge-appear 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

@keyframes badge-appear {
  from {
    opacity: 0;
    transform: scale(0.5);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.toggle-text {
  font-weight: 600;
}

.chevron {
  transition: transform 0.3s ease;
}

@media (max-width: 768px) {
  .toggle-filters-btn {
    justify-content: center;
    width: 100%;
  }
}
</style>
<template>
  <div class="filters-container">
    <!-- Header avec bouton toggle -->
    <div class="filters-header">
      <SearchBar 
        v-model="filters.search"
        @update:modelValue="onSearchInput"
        @clear="clearSearch"
      />

      <FilterToggleButton 
        :show-filters="showFilters"
        :has-active-filters="hasActiveFilters"
        :active-filters-count="activeFiltersCount"
        @toggle="toggleFilters"
      />
    </div>

    <!-- Filtres avec transition -->
    <Transition name="filters-collapse">
      <div v-if="showFilters" class="filters-content">
        <div class="filters-grid">
          <PriorityFilter 
            v-model="filters.priority"
            @update:modelValue="emitFilters"
          />

          <CategoryFilter 
            v-model="filters.category"
            @update:modelValue="emitFilters"
          />

          <SortFilter 
            v-model:sort-by="filters.sortBy"
            v-model:sort-order="filters.sortOrder"
            @update="emitFilters"
          />

          <ActiveFiltersCard
            v-if="hasActiveFilters"
            :filters="filters"
            @clear-filter="clearFilter"
            @clear-all="clearAllFilters"
          />
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { reactive, onMounted, watch, computed, ref } from 'vue'
import { useTaskStore } from '@/stores/tasks'
import SearchBar from './filters/SearchBar.vue'
import FilterToggleButton from './filters/FilterToggleButton.vue'
import PriorityFilter from './filters/PriorityFilter.vue'
import CategoryFilter from './filters/CategoryFilter.vue'
import SortFilter from './filters/SortFilter.vue'
import ActiveFiltersCard from './filters/ActiveFiltersCard.vue'

const store = useTaskStore()
const emit = defineEmits(['updateFilters'])

const showFilters = ref(false)

// Clé pour le localStorage
const STORAGE_KEY = 'todo-app-filters'

// Valeurs par défaut
const defaultFilters = {
  category: '',
  priority: '',
  sortBy: 'due_date',
  sortOrder: 'asc',
  search: ''
}

// Charger les filtres depuis le localStorage
function loadFiltersFromStorage() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      const parsed = JSON.parse(saved)
      return {
        category: parsed.category || '',
        priority: ['', 'Haute', 'Moyenne', 'Basse'].includes(parsed.priority) ? parsed.priority : defaultFilters.priority,
        sortBy: ['due_date', 'priority'].includes(parsed.sortBy) ? parsed.sortBy : defaultFilters.sortBy,
        sortOrder: ['asc', 'desc'].includes(parsed.sortOrder) ? parsed.sortOrder : defaultFilters.sortOrder,
        search: parsed.search || ''
      }
    }
  } catch (error) {
    console.warn('Erreur lors du chargement des filtres:', error)
  }
  return { ...defaultFilters }
}

// Initialiser les filtres
const filters = reactive(loadFiltersFromStorage())

// Computed pour savoir si des filtres sont actifs
const hasActiveFilters = computed(() => {
  return filters.priority || filters.category || filters.search
})

const activeFiltersCount = computed(() => {
  let count = 0
  if (filters.priority) count++
  if (filters.category) count++
  if (filters.search) count++
  return count
})

// Fonctions de gestion
function onSearchInput() {
  emitFilters()
}

function clearSearch() {
  filters.search = ''
  emitFilters()
}

function clearFilter(filterType) {
  filters[filterType] = ''
  emitFilters()
}

function clearAllFilters() {
  Object.assign(filters, defaultFilters)
  emitFilters()
}

function toggleFilters() {
  showFilters.value = !showFilters.value
}

function emitFilters() {
  emit('updateFilters', { ...filters })
}

// Sauvegarder automatiquement
function saveFiltersToStorage(filters) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filters))
  } catch (error) {
    console.warn('Erreur lors de la sauvegarde:', error)
  }
}

watch(filters, (newFilters) => {
  saveFiltersToStorage(newFilters)
}, { deep: true })

onMounted(() => {
  store.fetchCategories()
  emitFilters()
})
</script>

<style scoped>
.filters-container {
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 20px;
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
  border-radius: 20px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.8);
  min-width: 0;
  width: 100%;
}

.filters-header {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 0;
  width: 100%;
}

.filters-content {
  margin-top: 20px;
}

.filters-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

/* Transition pour le collapse/expand */
.filters-collapse-enter-active {
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.filters-collapse-leave-active {
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.filters-collapse-enter-from {
  opacity: 0;
  transform: translateY(-20px);
  max-height: 0;
}

.filters-collapse-leave-to {
  opacity: 0;
  transform: translateY(-20px);
  max-height: 0;
}

.filters-collapse-enter-to,
.filters-collapse-leave-from {
  opacity: 1;
  transform: translateY(0);
  max-height: 1000px;
}

/* Responsive */
@media (max-width: 1024px) {
  .filters-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
  }
}

@media (max-width: 768px) {
  .filters-header {
    flex-direction: column;
    gap: 12px;
    align-items: stretch;
  }

  .filters-container {
    padding: 16px;
    gap: 20px;
  }
  
  .filters-grid {
    grid-template-columns: 1fr;
    gap: 16px;
  }
}
</style>
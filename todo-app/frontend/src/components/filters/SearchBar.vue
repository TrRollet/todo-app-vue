<template>
  <div class="search-section">
    <div class="search-wrapper">
      <div class="search-input-container">
        <input 
          :value="modelValue"
          @input="$emit('update:modelValue', $event.target.value)"
          @focus="isSearchFocused = true"
          @blur="isSearchFocused = false"
          type="text"
          placeholder="Rechercher dans vos tâches..."
          class="search-input"
          :class="{ 
            'has-value': modelValue.length > 0,
            'focused': isSearchFocused 
          }"
        >
        <span class="search-icon">
          <Search :size="20" />
        </span>
        <Transition name="clear-button">
          <button 
            v-if="modelValue.length > 0"
            @click="$emit('clear')"
            class="clear-search"
            title="Effacer la recherche"
          >
            <X :size="16" />
          </button>
        </Transition>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Search, X } from 'lucide-vue-next'

defineProps({
  modelValue: {
    type: String,
    default: ''
  }
})

defineEmits(['update:modelValue', 'clear'])

const isSearchFocused = ref(false)
</script>

<style scoped>
.search-section {
  flex: 1;
  position: relative;
  min-width: 0; 
}

.search-wrapper {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.search-input-container {
  position: relative;
  display: flex;
  align-items: center;
}

.search-input {
  width: 100%;
  padding: 16px 20px 16px 55px;
  border: 2px solid rgba(203, 213, 225, 0.6);
  border-radius: 16px;
  font-size: 16px;
  font-weight: 500;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  color: #334155;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.03);
}

.search-input::placeholder {
  color: #94a3b8;
  font-weight: 400;
}

.search-input:focus,
.search-input.focused {
  outline: none;
  border-color: #667eea;
  background: rgba(255, 255, 255, 0.95);
  box-shadow: 
    0 0 0 4px rgba(102, 126, 234, 0.1),
    0 8px 30px rgba(102, 126, 234, 0.15);
  transform: translateY(-2px);
}

.search-input.has-value {
  padding-right: 55px;
  border-color: #10b981;
  background: rgba(236, 253, 245, 0.9);
}

.search-icon {
  position: absolute;
  left: 18px;
  top: 50%;
  transform: translateY(-50%);
  color: #64748b;
  display: flex;
  align-items: center;
  transition: all 0.3s ease;
  z-index: 1;
}

.search-input:focus ~ .search-icon,
.search-input.focused ~ .search-icon,
.search-input-container:focus-within .search-icon {
  color: #667eea;
  transform: translateY(calc(-50% - 2px)) scale(1.1);
}

.clear-search {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(239, 68, 68, 0.1);
  border: none;
  color: #ef4444;
  cursor: pointer;
  padding: 8px;
  border-radius: 10px;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.clear-search:hover {
  background: rgba(239, 68, 68, 0.2);
  transform: translateY(calc(-50% - 2px)) scale(1.1);
}

.search-input:focus ~ .clear-search,
.search-input.focused ~ .clear-search,
.search-input-container:focus-within .clear-search {
  transform: translateY(calc(-50% - 2px));
}

.clear-button-enter-active,
.clear-button-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.clear-button-enter-from {
  opacity: 0;
  transform: translateY(-50%) scale(0.5);
}

.clear-button-leave-to {
  opacity: 0;
  transform: translateY(-50%) scale(0.5);
}
</style>
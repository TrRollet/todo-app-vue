<template>
  <div class="home-header">
    <div class="header-content">
      <div class="title-section">
        <h1 class="home-title">
          <span class="title-icon">
            <ClipboardList :size="36" />
          </span>
          Mes Tâches
        </h1>
      </div>
      
      <div class="controls-section">
        <TaskFilters @updateFilters="$emit('update-filters', $event)" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ClipboardList } from 'lucide-vue-next'
import TaskFilters from '@/components/TaskFilters.vue'

defineEmits(['create-task', 'update-filters'])
</script>

<style scoped>
.home-header {
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  margin-bottom: 24px;
  padding: 24px 32px;
}

.header-content {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.home-title {
  font-size: 32px;
  font-weight: 800;
  color: #1a202c;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  margin: 0;
}

.controls-section {
  display: flex;
  justify-content: center;
  align-items: center;
}

.title-section {
  text-align: center;
}

.title-icon {
  color: #667eea;
  display: flex;
  align-items: center;
}

.title-icon svg {
  vertical-align: middle;
}

@media (max-width: 768px) {
  .home-header {
    padding: 20px;
  }
  
  .header-content {
    gap: 10px;
  }
  
  .home-title {
    font-size: 24px;
    text-align: center;
  }
  
  .controls-section {
    flex-direction: column;
    align-items: stretch;
    gap: 16px;
  }
}

@media (max-width: 480px) {
  .home-header {
    padding: 16px;
  }
  
  .header-content {
    gap: 16px;
  }
}
</style>
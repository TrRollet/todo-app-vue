<template>
  <div class="status-section">
    <div class="status-item">
      <div class="status-label">Statut</div>
      <div class="status-badge" :class="getStatusClass()">
        <span class="status-icon">
          <component :is="getStatusIcon()" :size="16" />
        </span>
        {{ task.status }}
      </div>
    </div>
    
    <div class="priority-item">
      <div class="priority-label">Priorité</div>
      <div class="priority-badge" :class="getPriorityClass()">
        <span class="priority-dot"></span>
        {{ task.priority }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ClipboardList, RotateCcw, CheckCircle } from 'lucide-vue-next'

const props = defineProps({
  task: {
    type: Object,
    required: true
  }
})

function getStatusClass() {
  const statusClasses = {
    'À faire': 'status-todo',
    'En cours': 'status-progress',
    'Terminé': 'status-done'
  }
  return statusClasses[props.task.status] || 'status-default'
}

function getPriorityClass() {
  const priorityClasses = {
    'Haute': 'priority-high',
    'Moyenne': 'priority-medium',
    'Basse': 'priority-low'
  }
  return priorityClasses[props.task.priority] || 'priority-medium'
}

function getStatusIcon() {
  const statusIcons = {
    'À faire': ClipboardList,
    'En cours': RotateCcw,
    'Terminé': CheckCircle
  }
  return statusIcons[props.task.status] || ClipboardList
}
</script>

<style scoped>
.status-section {
  display: flex;
  gap: 24px;
  margin-bottom: 32px;
  flex-wrap: wrap;
}

.status-item, .priority-item {
  flex: 1;
  min-width: 200px;
}

.status-label, .priority-label {
  font-size: 14px;
  font-weight: 600;
  color: #6b7280;
  margin-bottom: 8px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.status-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
  border-radius: 12px;
  font-weight: 600;
  font-size: 16px;
}

.status-badge.status-todo {
  background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
  color: white;
}

.status-badge.status-progress {
  background: linear-gradient(135deg, #f59e0b 0%, #f97316 100%);
  color: white;
}

.status-badge.status-done {
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  color: white;
}

.priority-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
  border-radius: 12px;
  font-weight: 600;
  font-size: 16px;
}

.priority-badge.priority-high {
  background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
  color: white;
}

.priority-badge.priority-medium {
  background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
  color: white;
}

.priority-badge.priority-low {
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  color: white;
}

.priority-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: currentColor;
}

.status-icon {
  display: flex;
  align-items: center;
}

.status-icon svg {
  vertical-align: middle;
}

@media (max-width: 768px) {
  .status-section {
    flex-direction: column;
    gap: 16px;
  }
  
  .status-item, .priority-item {
    min-width: auto;
  }
}
</style>
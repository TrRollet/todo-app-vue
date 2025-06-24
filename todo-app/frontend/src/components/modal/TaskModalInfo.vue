<template>
  <div class="info-section">
    <h3 class="section-title">
      <span class="section-icon">
        <Info :size="20" />
      </span>
      Informations
    </h3>
    
    <div class="info-grid">
      <div class="info-item">
        <div class="info-label">Catégorie</div>
        <div class="info-value">{{ task.category || 'Non définie' }}</div>
      </div>
      
      <div class="info-item">
        <div class="info-label">Date d'échéance</div>
        <div class="info-value" :class="{ 'overdue': isOverdue, 'urgent': isUrgent }">
          <span class="date-icon">
            <component :is="getDateIcon()" :size="16" />
          </span>
          {{ formattedDate }}
          <span v-if="isOverdue" class="overdue-badge">En retard</span>
          <span v-else-if="isUrgent" class="urgent-badge">Urgent</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { isTaskOverdue, isTaskUrgent, formatTaskDate } from '@/utils/dateUtils'
import { Info, AlertTriangle, Clock, Calendar } from 'lucide-vue-next'

const props = defineProps({
  task: {
    type: Object,
    required: true
  }
})

const isOverdue = computed(() => isTaskOverdue(props.task))
const isUrgent = computed(() => isTaskUrgent(props.task))
const formattedDate = computed(() => formatTaskDate(props.task))

function getDateIcon() {
  if (isOverdue.value) return AlertTriangle
  if (isUrgent.value) return Clock
  return Calendar
}
</script>

<style scoped>
.info-section {
  margin-bottom: 32px;
}

.section-title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 18px;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 16px;
}

.section-icon {
  font-size: 20px;
}

.section-icon svg {
  vertical-align: middle;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}

.info-item {
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 16px;
}

.info-label {
  font-size: 14px;
  font-weight: 600;
  color: #6b7280;
  margin-bottom: 8px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.info-value {
  font-size: 16px;
  font-weight: 500;
  color: #1f2937;
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}

.info-value.overdue {
  color: #dc2626;
}

.info-value.urgent {
  color: #f59e0b;
}

.date-icon {
  font-size: 16px;
}

.date-icon svg {
  vertical-align: middle;
}

.overdue-badge, .urgent-badge {
  background: #fee2e2;
  color: #dc2626;
  padding: 2px 8px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
}

.urgent-badge {
  background: #fef3c7;
  color: #d97706;
}

@media (max-width: 768px) {
  .info-grid {
    grid-template-columns: 1fr;
  }
}
</style>
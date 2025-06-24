<template>
  <div 
    class="task-card" 
    :class="[priorityClass, { 'urgent': isUrgent, 'overdue': isOverdue, 'completed': isCompleted }]"
    @click="$emit('view', task)"
  >
    <div class="card-header">
      <h3 class="task-title" :class="{ 'completed': isCompleted }">{{ task.title }}</h3>
      <div class="priority-indicator" :class="priorityClass">
        <span class="priority-dot"></span>
        <span class="priority-text">{{ task.priority }}</span>
      </div>
    </div>
    
    <p v-if="task.description" class="task-description" :class="{ 'completed': isCompleted }">
      {{ task.description }}
    </p>
    
    <div class="task-meta">
      <div class="category-tag" :class="{ 'completed': isCompleted }">
        <span class="category-icon">
          <Tag :size="12" />
        </span>
        {{ task.category }}
      </div>
      
      <div class="due-date" :class="{ 'urgent': isUrgent, 'overdue': isOverdue, 'completed': isCompleted }">
        <span class="date-icon">
          <component :is="getDateIcon()" :size="16" />
        </span>
        {{ formattedDate }}
        <span v-if="isOverdue" class="overdue-label">{{ getOverdueText() }}</span>
        <span v-if="isCompleted" class="completed-label">
          <Check :size="10" class="inline-icon" /> Terminé
        </span>
      </div>
    </div>
    
    <div class="card-actions" @click.stop>
      <button @click="$emit('edit', task)" class="btn-edit">
        <span class="btn-icon">
          <Edit :size="14" />
        </span>
        Modifier
      </button>
      <button @click="$emit('delete', task.id)" class="btn-delete">
        <span class="btn-icon">
          <Trash2 :size="14" />
        </span>
        Supprimer
      </button>
    </div>
    
    <!-- Overlay de tâche terminée -->
    <div v-if="isCompleted" class="completed-overlay">
      <div class="completed-checkmark">
        <Check :size="18" />
      </div>
    </div>
    
    <!-- Indicateur de click -->
    <div class="click-indicator">
      <span class="click-text">Cliquer pour voir les détails</span>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { isTaskOverdue, isTaskUrgent, formatTaskDate } from '@/utils/dateUtils'
import { 
  Tag, 
  Edit, 
  Trash2, 
  Check, 
  CheckCircle, 
  AlertTriangle, 
  Clock, 
  Calendar 
} from 'lucide-vue-next'

const props = defineProps({
  task: Object
})

const emit = defineEmits(['edit', 'delete', 'view'])

const priorityClass = computed(() => {
  return `priority-${props.task.priority.toLowerCase()}`
})

const daysDifference = computed(() => {
  if (!props.task.due_date) return null
  
  // Normaliser les dates à minuit pour une comparaison juste
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  
  const due = new Date(props.task.due_date)
  due.setHours(0, 0, 0, 0)
  
  return Math.ceil((due - today) / (1000 * 60 * 60 * 24))
})

const isOverdue = computed(() => isTaskOverdue(props.task))
const isUrgent = computed(() => isTaskUrgent(props.task))
const formattedDate = computed(() => formatTaskDate(props.task))

const isCompleted = computed(() => props.task.status === 'Terminé')

function getDateIcon() {
  if (isCompleted.value) return CheckCircle
  if (isOverdue.value) return AlertTriangle
  if (isUrgent.value) return Clock
  return Calendar
}

function getOverdueText() {
  if (!isOverdue.value) return ''
  const days = Math.abs(daysDifference.value)
  if (days === 1) return 'En retard de 1 jour'
  return `En retard de ${days} jours`
}
</script>

<style scoped>
.task-card {
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  border: 1px solid #e5e7eb;
  transition: all 0.2s ease;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.task-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
}

/* Tâches urgentes */
.task-card.urgent {
  border-left-color: #ef4444;
  border-left-width: 8px;
  background: linear-gradient(135deg, #fff 0%, #fee2e2 100%);
  box-shadow: 0 4px 20px rgba(239, 68, 68, 0.25);
}

.task-card.urgent .task-title {
  color: #db3434;
  font-weight: 700;
}

/* Tâches en retard - Style plus marqué */
.task-card.overdue {
  border-left-color: #7c2d12;
  border-left-width: 10px;
  background: linear-gradient(135deg, #fafafa 0%, #f5f5f4 100%);
  box-shadow: 0 4px 20px rgba(124, 45, 18, 0.3);
  opacity: 0.85;
  position: relative;
}

.task-card.overdue::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: repeating-linear-gradient(
    45deg,
    transparent,
    transparent 10px,
    rgba(124, 45, 18, 0.03) 10px,
    rgba(124, 45, 18, 0.03) 20px
  );
  pointer-events: none;
  border-radius: 12px;
}

.task-card.overdue .task-title {
  color: #7c2d12;
  font-weight: 700;
  text-decoration: none;
}

.task-card.overdue .task-description {
  color: #a8a29e;
}

/* Priorités normales */
.task-card.priority-haute {
  border-left-color: #ef4444;
  border-left-width: 4px;
}

.task-card.priority-moyenne {
  border-left-color: #f59e0b;
  border-left-width: 4px;
}

.task-card.priority-basse {
  border-left-color: #10b981;
  border-left-width: 4px;
}

.click-indicator {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.9) 0%, rgba(118, 75, 162, 0.9) 100%);
  color: white;
  padding: 8px;
  text-align: center;
  border-radius: 12px 12px 0 0;
  opacity: 0;
  transform: translateY(-100%);
  transition: all 0.3s ease;
  font-size: 12px;
  font-weight: 600;
  z-index: 5;
  margin-left: -1px;
  padding-left: 9px;
}

.task-card.priority-haute .click-indicator,
.task-card.priority-moyenne .click-indicator,
.task-card.priority-basse .click-indicator {
  margin-left: -4px;
  padding-left: 12px;
}

/* Ajustements pour les cartes urgentes */
.task-card.urgent .click-indicator {
  margin-left: -8px;
  padding-left: 16px;
}

/* Ajustements pour les cartes en retard */
.task-card.overdue .click-indicator {
  margin-left: -10px;
  padding-left: 18px;
}

/* Ajustements pour les cartes terminées */
.task-card.completed .click-indicator {
  margin-left: -6px;
  padding-left: 14px;
}

.task-card:hover .click-indicator {
  opacity: 1;
  transform: translateY(0);
}

.click-text {
  font-size: 12px;
}

.task-card.being-dragged .click-indicator {
  opacity: 0 !important;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 12px;
  margin-bottom: 12px;
}

.task-title {
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  color: #1a202c;
  line-height: 1.3;
  flex: 1;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  overflow: hidden;
  text-overflow: ellipsis;
  word-wrap: break-word;
  hyphens: auto;
}

.priority-indicator {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 4px 8px;
  border-radius: 8px;
  background: #f9fafb;
  border: 1px solid #e5e7eb;
}

.priority-indicator.priority-haute {
  background: #fef2f2;
  border-color: #fecaca;
  color: #dc2626;
}

.priority-indicator.priority-moyenne {
  background: #fffbeb;
  border-color: #fed7aa;
  color: #d97706;
}

.priority-indicator.priority-basse {
  background: #ecfdf5;
  border-color: #bbf7d0;
  color: #059669;
}

.priority-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: currentColor;
}

.priority-text {
  font-size: 12px;
  font-weight: 500;
}

.task-description {
  color: #6b7280;
  font-size: 14px;
  line-height: 1.5;
  margin: 0 0 16px 0;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  overflow: hidden;
  text-overflow: ellipsis;
  word-wrap: break-word;
  hyphens: auto;
  flex-shrink: 0;
}

.task-meta {
  margin-bottom: 16px;
  flex-shrink: 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
}

.category-tag {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  color: #4b5563;
  background: #f3f4f6;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  padding: 4px 8px;
  font-weight: 500;
  align-self: flex-start;
  max-width: fit-content;
}

.category-tag.completed {
  opacity: 0.6;
  text-decoration: line-through;
  color: #9ca3af;
}

.inline-icon {
  display: inline;
  margin-right: 4px;
}

/* Ajustements pour les icônes Lucide */
.category-icon svg,
.date-icon svg,
.btn-icon svg {
  vertical-align: middle
}

.completed-checkmark {
  color: white;
  font-size: 18px;
  font-weight: bold;
  animation: checkmarkPop 0.3s ease-out 0.2s both;
  display: flex;
  align-items: center;
  justify-content: center;
}

.completed-checkmark svg {
  color: white;
}

.due-date {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
  color: #6b7280;
  min-height: 24px;
  padding: 4px 8px;
  border-radius: 6px;
  font-weight: 500;
  background: transparent;
  border: 1px solid transparent;
  flex-wrap: nowrap;
  align-self: flex-start;
  max-width: fit-content;
  white-space: nowrap;
}

/* Date urgente */
.due-date.urgent {
  background: #dc2626;
  color: white;
  border-color: #dc2626;
  font-weight: 700;
  text-transform: uppercase;
  font-size: 12px;
  letter-spacing: 0.5px;
}

/* Date en retard */
.due-date.overdue {
  background: #7c2d12;
  color: white;
  border-color: #7c2d12;
  font-weight: 700;
  text-transform: uppercase;
  font-size: 12px;
  letter-spacing: 0.5px;
  animation: overdue-pulse 2s infinite;
}

@keyframes overdue-pulse {
  0%, 100% { 
    background: #7c2d12;
    box-shadow: 0 0 0 0 rgba(124, 45, 18, 0.7);
  }
  50% { 
    background: #92400e;
    box-shadow: 0 0 0 6px rgba(124, 45, 18, 0);
  }
}

.overdue-label {
  font-size: 10px;
  background: rgba(255, 255, 255, 0.9);
  color: #7c2d12;
  padding: 2px 6px;
  border-radius: 4px;
  font-weight: 600;
  text-transform: none;
  letter-spacing: normal;
  margin-left: 4px;
}

/* Tâches terminées - Style Trello */
.task-card.completed {
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
  border-left-color: #10b981;
  border-left-width: 6px;
  opacity: 0.8;
  position: relative;
  overflow: hidden;
}

.task-card.completed::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: repeating-linear-gradient(
    135deg,
    transparent,
    transparent 8px,
    rgba(16, 185, 129, 0.05) 8px,
    rgba(16, 185, 129, 0.05) 16px
  );
  pointer-events: none;
}

.task-title.completed {
  text-decoration: line-through;
  color: #6b7280 !important;
  opacity: 0.7;
}

.task-description.completed {
  text-decoration: line-through;
  color: #9ca3af !important;
  opacity: 0.6;
}

.due-date.completed {
  background: #10b981;
  color: white;
  border-color: #10b981;
  font-weight: 700;
  text-transform: uppercase;
  font-size: 12px;
  letter-spacing: 0.5px;
}

.completed-label {
  font-size: 10px;
  background: rgba(255, 255, 255, 0.9);
  color: #10b981;
  padding: 2px 6px;
  border-radius: 4px;
  font-weight: 600;
  text-transform: none;
  letter-spacing: normal;
  margin-left: 4px;
}

.completed-overlay {
  position: absolute;
  top: 10px;
  right: 10px;
  width: 32px;
  height: 32px;
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 8px rgba(16, 185, 129, 0.3);
  animation: completedBounce 0.5s ease-out;
  z-index: 2;
}

.completed-checkmark {
  color: white;
  font-size: 18px;
  font-weight: bold;
  animation: checkmarkPop 0.3s ease-out 0.2s both;
}

@keyframes completedBounce {
  0% {
    transform: scale(0) rotate(180deg);
    opacity: 0;
  }
  50% {
    transform: scale(1.2) rotate(90deg);
    opacity: 0.8;
  }
  100% {
    transform: scale(1) rotate(0deg);
    opacity: 1;
  }
}

@keyframes checkmarkPop {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.3);
  }
  100% {
    transform: scale(1);
  }
}

/* Désactiver les autres états si terminé */
.task-card.completed.urgent,
.task-card.completed.overdue {
  border-left-color: #10b981 !important;
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%) !important;
  opacity: 0.8 !important;
}

.task-card.completed .priority-indicator {
  opacity: 0.6;
}

.date-icon {
  display: flex;
  align-items: center;
  justify-content: center;
}

.card-actions {
  display: flex;
  gap: 8px;
}

.btn-edit,
.btn-delete {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 12px;
  border: none;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 550;
  cursor: pointer;
  transition: all 0.2s ease;
  flex: 1;
  justify-content: center;
}

.btn-edit {
  background: #eff6ff;
  color: #2563eb;
  border: 1px solid #dbeafe;
}

.btn-edit:hover {
  background: #dbeafe;
  transform: translateY(-1px);
}

.btn-delete {
  background: #fef2f2;
  color: #dc2626;
  border: 1px solid #fecaca;
}

.btn-delete:hover {
  background: #fecaca;
  transform: translateY(-1px);
}

.btn-icon {
  font-size: 14px;
}

@media (max-width: 640px) {
  .card-header {
    flex-direction: column;
    align-items: stretch;
    gap: 8px;
  }
  
  .priority-indicator {
    align-self: flex-start;
  }
  
  .card-actions {
    display: flex;
    gap: 8px;
    margin-top: auto;
  }
  
  .task-meta {
    flex-direction: column;
    align-items: flex-start;
    gap: 6px;
  }
  
  .due-date {
    flex-wrap: wrap;
    white-space: normal;
  }
  
  .overdue-label,
  .completed-label {
    margin-left: 0;
    margin-top: 2px;
  }
}
</style>
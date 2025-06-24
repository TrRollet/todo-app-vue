<template>
  <div 
    ref="columnRef"
    class="task-column" 
    :class="{ 'drop-zone-active': isDragOver }"
  >
    <div class="column-header" :class="[getStatusClass(), { 'drag-target': isDragOver }]">
      <div class="column-title">
        <span class="column-icon">
          <component :is="getStatusIcon()" :size="24" />
        </span>
        <h3>{{ title }}</h3>
      </div>
      <span class="task-count">{{ tasks.length }}</span>
      
      <!-- Indicateur de drop -->
      <div v-if="isDragOver" class="drop-indicator">
        <span class="drop-icon">
          <ArrowDown :size="16" />
        </span>
        <span class="drop-text">Déposer ici</span>
      </div>
    </div>
    
    <div 
      class="column-content"
      @drop="onDrop"
      @dragover="onDragOver"
      @dragenter="onDragEnter"
      @dragleave="onDragLeave"
      :class="{ 'drag-over': isDragOver }"
    >
      <!-- Message de zone de dépôt quand on drag -->
      <div v-if="isDragOver && tasks.length === 0" class="drop-zone-message">
        <div class="drop-zone-icon">
          <Inbox :size="48" />
        </div>
        <p class="drop-zone-text">Glissez votre tâche ici pour la déplacer vers <strong>{{ title }}</strong></p>
      </div>
      
      <!-- État vide normal -->
      <div v-else-if="tasks.length === 0 && !isDragOver" class="empty-state">
        <div class="empty-icon">
          <component :is="getStatusIcon()" :size="48" />
        </div>
        <p>Aucune tâche {{ title.toLowerCase() }}</p>
      </div>
      
      <!-- TransitionGroup pour animer les changements de position -->
      <TransitionGroup
        v-else
        name="task-list"
        tag="div"
        class="task-list-container"
        @enter="onTaskEnter"
        @leave="onTaskLeave"
      >
        <TaskCard
          v-for="task in tasks"
          :key="`task-${task.id}`"
          :task="task"
          draggable="true"
          @dragstart="onDragStart($event, task)"
          @dragend="onDragEnd"
          @edit="$emit('edit', task)"
          @delete="$emit('delete', task.id)"
          @view="$emit('view', task)"
          class="draggable-card"
          :class="{ 'being-dragged': draggedTaskId === task.id }"
        />
      </TransitionGroup>
      
      <!-- Indicateur de position de drop entre les tâches -->
      <div v-if="isDragOver && tasks.length > 0" class="drop-position-indicator">
        <div class="drop-line"></div>
        <span class="drop-label">Nouvelle position</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import TaskCard from './TaskCard.vue'
import { 
  ClipboardList, 
  RotateCcw, 
  CheckCircle, 
  ArrowDown, 
  Inbox 
} from 'lucide-vue-next'

const props = defineProps({
  title: String,
  tasks: Array
})

const emit = defineEmits(['drop', 'edit', 'delete', 'view'])

const isDragOver = ref(false)
const draggedTaskId = ref(null)
const draggedTaskOriginalStatus = ref(null)
const dragTimer = ref(null)
const columnRef = ref(null)

function getStatusClass() {
  const statusClasses = {
    'À faire': 'status-todo',
    'En cours': 'status-progress', 
    'Terminé': 'status-done'
  }
  return statusClasses[props.title] || 'status-default'
}

function getStatusIcon() {
  const statusIcons = {
    'À faire': ClipboardList,
    'En cours': RotateCcw,
    'Terminé': CheckCircle
  }
  return statusIcons[props.title] || ClipboardList
}

// Callbacks pour les animations de transition
function onTaskEnter(el, done) {
  // Animation d'entrée avec un léger délai pour créer un effet en cascade
  const delay = Array.from(el.parentNode.children).indexOf(el) * 50
  
  el.style.opacity = '0'
  el.style.transform = 'translateX(-20px) scale(0.95)'
  
  setTimeout(() => {
    el.style.transition = 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
    el.style.opacity = '1'
    el.style.transform = 'translateX(0) scale(1)'
    
    // Nettoyage après l'animation
    setTimeout(() => {
      el.style.transition = ''
      done()
    }, 400)
  }, delay)
}

function onTaskLeave(el, done) {
  // Animation de sortie
  el.style.transition = 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
  el.style.opacity = '0'
  el.style.transform = 'translateX(20px) scale(0.9)'
  
  setTimeout(done, 300)
}

function onDragStart(event, task) {
  event.dataTransfer.setData('text/plain', task.id.toString())
  event.dataTransfer.effectAllowed = 'move'
  draggedTaskId.value = task.id
  draggedTaskOriginalStatus.value = task.status
  
  // Reset tous les états de drag au début
  isDragOver.value = false
  
  document.body.classList.add('dragging')
}

function onDragEnd() {
  // Reset complet et immédiat de tous les états
  isDragOver.value = false
  draggedTaskId.value = null
  draggedTaskOriginalStatus.value = null
  
  if (dragTimer.value) {
    clearTimeout(dragTimer.value)
    dragTimer.value = null
  }
  
  document.body.classList.remove('dragging')
}

function onDragEnter(event) {
  event.preventDefault()
  
  // Ne pas activer l'effet sur la colonne d'origine
  if (draggedTaskOriginalStatus.value === props.title) {
    return
  }
  
  // Annuler tout timer de sortie existant
  if (dragTimer.value) {
    clearTimeout(dragTimer.value)
    dragTimer.value = null
  }
  
  isDragOver.value = true
}

function onDragLeave(event) {
  event.preventDefault()
  
  // Ne pas traiter dragLeave sur la colonne d'origine
  if (draggedTaskOriginalStatus.value === props.title) {
    return
  }
  
  // Annuler tout timer existant
  if (dragTimer.value) {
    clearTimeout(dragTimer.value)
  }
  
  // Léger délai avant de désactiver l'état de drag
  dragTimer.value = setTimeout(() => {
    isDragOver.value = false
    dragTimer.value = null
  }, 50)
}

function onDragOver(event) {
  event.preventDefault()
  
  // Empêcher le drop sur la colonne d'origine
  if (draggedTaskOriginalStatus.value === props.title) {
    event.dataTransfer.dropEffect = 'none'
    return
  }
  
  // Réactiver l'état si on est en train de survoler
  if (!isDragOver.value) {
    isDragOver.value = true
  }
  
  if (dragTimer.value) {
    clearTimeout(dragTimer.value)
    dragTimer.value = null
  }
  
  event.dataTransfer.dropEffect = 'move'
}

function onDrop(event) {
  event.preventDefault()
  
  // Annuler tout timer
  if (dragTimer.value) {
    clearTimeout(dragTimer.value)
    dragTimer.value = null
  }
  
  // Reset immédiat des états visuels
  isDragOver.value = false
  
  const taskId = parseInt(event.dataTransfer.getData('text/plain'))
  if (taskId) {
    // Vérifier que ce n'est pas la même colonne
    if (draggedTaskOriginalStatus.value !== props.title) {
      emit('drop', taskId, props.title)
    }
  }
  
  draggedTaskId.value = null
  draggedTaskOriginalStatus.value = null
  document.body.classList.remove('dragging')
}
</script>

<style scoped>
.task-column {
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  height: fit-content;
  min-height: 200px;
  transition: all 0.3s ease;
  position: relative;
}

.task-column.drop-zone-active {
  transform: scale(1.02);
  box-shadow: 0 8px 30px rgba(59, 130, 246, 0.3);
  border: 2px solid #3b82f6;
}

.column-header {
  color: white;
  padding: 20px 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  transition: all 0.3s ease;
}

/* Styles par statut */
.column-header.status-todo {
  background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
}

.column-header.status-progress {
  background: linear-gradient(135deg, #f59e0b 0%, #f97316 100%);
}

.column-header.status-done {
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
}

.column-header.status-default {
  background: linear-gradient(135deg, #6b7280 0%, #9ca3af 100%);
}

.column-header.drag-target {
  background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%) !important;
  animation: pulse-header 1s infinite;
}

@keyframes pulse-header {
  0%, 100% { 
    background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
  }
  50% { 
    background: linear-gradient(135deg, #1d4ed8 0%, #3b82f6 100%);
  }
}

.column-title {
  display: flex;
  align-items: center;
  gap: 12px;
}

.column-icon {
  font-size: 24px;
}

.column-title h3 {
  margin: 0;
  font-size: 20px;
  font-weight: 700;
}

.task-count {
  background: rgba(255, 255, 255, 0.2);
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 600;
}

.drop-indicator {
  position: absolute;
  right: 24px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  gap: 8px;
  background: rgba(255, 255, 255, 0.9);
  color: #1d4ed8;
  padding: 8px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  animation: bounce-drop 0.6s infinite;
}

@keyframes bounce-drop {
  0%, 100% { transform: translateY(-50%); }
  50% { transform: translateY(-40%); }
}

@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-4px); }
}

.column-content {
  padding: 20px;
  min-height: 150px;
  transition: all 0.3s ease;
  position: relative;
}

.column-content.drag-over {
  background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
  border: 2px dashed #3b82f6;
  border-top: none;
}

/* Container pour les animations de liste */
.task-list-container {
  position: relative;
}

/* Animations de transition pour les tâches */
.task-list-move {
  transition: all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.task-list-enter-active {
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.task-list-leave-active {
  transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  position: absolute;
  width: calc(100% - 40px); /* Compenser le padding du container */
}

.task-list-enter-from {
  opacity: 0;
  transform: translateX(-20px) scale(0.95);
}

.task-list-leave-to {
  opacity: 0;
  transform: translateX(20px) scale(0.9);
}

/* Styles de base pour les cartes avec espacement */
.draggable-card {
  margin-bottom: 16px;
  cursor: grab;
  transition: all 0.2s ease;
  position: relative;
}

.draggable-card:hover {
  transform: translateY(-2px);
}

.draggable-card:active {
  cursor: grabbing;
}

.draggable-card.being-dragged {
  opacity: 0.5;
  transform: scale(0.95);
  z-index: 1000;
}

.draggable-card:last-child {
  margin-bottom: 0;
}

/* Effet de réorganisation quand les cartes bougent */
.draggable-card:not(.being-dragged) {
  transition: all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.drop-zone-message {
  text-align: center;
  padding: 40px 20px;
  color: #1d4ed8;
  animation: fade-in-up 0.3s ease;
}

/* Ajustements pour les icônes Lucide */
.column-icon svg,
.drop-icon svg,
.drop-zone-icon svg,
.empty-icon svg {
  vertical-align: middle;
}

.drop-zone-icon {
  color: #1d4ed8;
  margin-bottom: 12px;
  animation: pulse 1s infinite;
}

@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.1); }
}

.drop-zone-text {
  margin: 0;
  font-size: 16px;
  font-weight: 600;
}

.drop-position-indicator {
  display: flex;
  align-items: center;
  gap: 12px;
  margin: 16px 0;
  animation: fade-in 0.3s ease;
}

.drop-line {
  flex: 1;
  height: 3px;
  background: linear-gradient(90deg, transparent 0%, #3b82f6 50%, transparent 100%);
  border-radius: 2px;
  animation: slide-line 2s ease-in-out infinite;
}

@keyframes slide-line {
  0%, 100% { opacity: 0.5; }
  50% { opacity: 1; }
}

.drop-label {
  color: #3b82f6;
  font-size: 12px;
  font-weight: 600;
  background: #f0f9ff;
  padding: 4px 8px;
  border-radius: 4px;
  border: 1px solid #bfdbfe;
}

.empty-state {
  text-align: center;
  padding: 40px 20px;
  color: #6b7280;
}

.empty-icon {
  color: #6b7280;
  margin-bottom: 12px;
}

.empty-state p {
  margin: 0;
  font-size: 16px;
}

@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}
</style>
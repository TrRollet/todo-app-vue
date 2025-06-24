<template>
  <div class="modal-overlay" @click="handleOverlayClick">
    <div class="modal-container" @click.stop>
      <TaskModalHeader 
        :task="task"
        @close="$emit('close')"
      />
      
      <div class="modal-content">
        <div class="modal-body">
          <TaskModalTitle :task="task" />
          <TaskModalStatus :task="task" />
          <TaskModalDescription :task="task" />
          <TaskModalInfo :task="task" />
        </div>
      </div>
      
      <TaskModalActions 
        :task="task"
        @edit="$emit('edit', $event)"
        @delete="$emit('delete', $event)"
      />
    </div>
  </div>
</template>

<script setup>
import TaskModalHeader from './modal/TaskModalHeader.vue'
import TaskModalTitle from './modal/TaskModalTitle.vue'
import TaskModalStatus from './modal/TaskModalStatus.vue'
import TaskModalDescription from './modal/TaskModalDescription.vue'
import TaskModalInfo from './modal/TaskModalInfo.vue'
import TaskModalActions from './modal/TaskModalActions.vue'

const props = defineProps({
  task: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['close', 'edit', 'delete'])

function handleOverlayClick() {
  emit('close')
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.75);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: 20px;
  box-sizing: border-box;
}

.modal-container {
  background: white;
  border-radius: 20px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  max-width: 700px;
  width: 100%;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  animation: modalAppear 0.3s ease-out;
  overflow: hidden;
}

@keyframes modalAppear {
  from {
    opacity: 0;
    transform: scale(0.9) translateY(-20px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

.modal-content {
  flex: 1;
  overflow-y: auto;
}

.modal-content::-webkit-scrollbar {
  width: 8px;
}

.modal-content::-webkit-scrollbar-track {
  background: #f1f5f9;
  border-radius: 4px;
}

.modal-content::-webkit-scrollbar-thumb {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 4px;
  transition: all 0.3s ease;
}

.modal-content::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(135deg, #5a67d8 0%, #6b46c1 100%);
}

.modal-content {
  scrollbar-width: thin;
  scrollbar-color: #667eea #f1f5f9;
}

.modal-body {
  padding: 32px;
}

@media (max-width: 768px) {
  .modal-overlay {
    padding: 10px;
  }
  
  .modal-body {
    padding: 24px 20px;
  }
}
</style>
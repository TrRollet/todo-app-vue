<template>
  <div class="task-form-container">
    <div class="task-form-card">
      <TaskFormHeader 
        :mode="mode"
        @cancel="$emit('cancel')"
      />

      <div class="form-body">
        <form @submit.prevent="submitForm" class="form-content">
          <TaskFormTitle 
            v-model="formData.title"
            :error="titleError"
          />

          <TaskFormDescription 
            v-model="formData.description"
          />

          <div class="form-row">
            <TaskFormCategory 
              v-model="formData.category"
            />

            <TaskFormStatus 
              v-model="formData.status"
            />
          </div>

          <TaskFormPriority 
            v-model="formData.priority"
          />

          <TaskFormDate 
            v-model="formData.due_date"
          />

          <TaskFormActions 
            :mode="mode"
            :is-valid="isFormValid"
            @cancel="$emit('cancel')"
          />
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, computed, watch, onMounted, ref } from 'vue'
import { useTaskStore } from '@/stores/tasks'
import TaskFormHeader from './form/TaskFormHeader.vue'
import TaskFormTitle from './form/TaskFormTitle.vue'
import TaskFormDescription from './form/TaskFormDescription.vue'
import TaskFormCategory from './form/TaskFormCategory.vue'
import TaskFormStatus from './form/TaskFormStatus.vue'
import TaskFormPriority from './form/TaskFormPriority.vue'
import TaskFormDate from './form/TaskFormDate.vue'
import TaskFormActions from './form/TaskFormActions.vue'

const props = defineProps({
  task: {
    default: () => ({
      title: '',
      description: '',
      category: '',
      priority: '',
      status: '',
      due_date: ''
    })
  },
  mode: {
    default: 'create',
    validator: value => ['create', 'edit'].includes(value)
  }
})

const emit = defineEmits(['submit', 'cancel'])
const store = useTaskStore()

const formData = reactive({ ...props.task })
const titleError = ref(false)

onMounted(() => {
  store.fetchCategories()
})

watch(() => props.task, (newVal) => {
  Object.assign(formData, newVal)
}, { deep: true })

watch(() => formData.title, (newVal) => {
  titleError.value = newVal.length > 0 && newVal.length < 3
})

const isFormValid = computed(() => {
  return formData.title.length >= 3 && 
         formData.category && 
         formData.priority && 
         formData.status &&
         formData.due_date
})

function submitForm() {
  if (!isFormValid.value) return
  
  const taskData = {
    ...formData,
    due_date: formData.due_date + 'T12:00:00.000Z'
  }
  
  emit('submit', taskData)
}
</script>

<!-- Le reste du style reste identique -->
<style scoped>
.task-form-container {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
  animation: fadeIn 0.3s ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.task-form-card {
  background: white;
  border-radius: 16px;
  box-shadow: 0 24px 48px rgba(0, 0, 0, 0.15);
  width: 100%;
  max-width: 580px;
  max-height: 85vh;
  display: flex;
  flex-direction: column;
  animation: slideUp 0.3s ease-out;
  overflow: hidden;
}

@keyframes slideUp {
  from { 
    opacity: 0;
    transform: translateY(30px);
  }
  to { 
    opacity: 1;
    transform: translateY(0);
  }
}

.form-body {
  flex: 1;
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: #e5e7eb transparent;
}

.form-body::-webkit-scrollbar {
  width: 6px;
}

.form-body::-webkit-scrollbar-track {
  background: transparent;
}

.form-body::-webkit-scrollbar-thumb {
  background: #e5e7eb;
  border-radius: 3px;
}

.form-body::-webkit-scrollbar-thumb:hover {
  background: #d1d5db;
}

.form-content {
  padding: 24px 32px 32px;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

@media (max-width: 640px) {
  .task-form-container {
    padding: 16px;
  }
  
  .task-form-card {
    max-height: 90vh;
  }
  
  .form-content {
    padding-left: 24px;
    padding-right: 24px;
  }
  
  .form-row {
    grid-template-columns: 1fr;
    gap: 16px;
  }
}
</style>
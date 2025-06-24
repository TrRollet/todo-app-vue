<template>
  <div class="home-container">
    <NotificationToast />
    <LoadingOverlay :visible="taskStore.loading" />
    
    <HomeHeader @update-filters="updateFilters" />
    
    <TaskBoard 
      :tasks="taskStore.tasks"
      :filters="filters"
      @drop="handleDrop"
      @edit="editTask"
      @delete="deleteTask"
      @view="viewTask"
    />

    <FloatingActionButton 
      @click="openCreateForm"
      :disabled="taskStore.loading"
    />

    <TaskForm 
      v-if="showTaskForm"
      :mode="taskMode"
      :task="selectedTask"
      @submit="handleTaskSubmit"
      @cancel="closeTaskForm"
    />

    <TaskDetailModal
      v-if="showTaskDetail"
      :task="selectedTaskForView"
      @close="closeTaskDetail"
      @edit="editTaskFromDetail"
      @delete="deleteTaskFromDetail"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useTaskStore } from '@/stores/tasks'
import NotificationToast from '@/components/shared/NotificationToast.vue'
import LoadingOverlay from '@/components/shared/LoadingOverlay.vue'
import HomeHeader from '@/components/home/HomeHeader.vue'
import TaskBoard from '@/components/home/TaskBoard.vue'
import FloatingActionButton from '@/components/shared/FloatingActionButton.vue'
import TaskForm from '@/components/TaskForm.vue'
import TaskDetailModal from '@/components/TaskDetailModal.vue'

const taskStore = useTaskStore()

const filters = ref({
  category: '',
  priority: '', 
  sortBy: 'due_date', 
  sortOrder: 'asc',
  search: ''
})

const showTaskForm = ref(false)
const showTaskDetail = ref(false)
const taskMode = ref('create')
const selectedTask = ref({
  title: '',
  description: '',
  category: '',
  priority: '',
  due_date: ''
})
const selectedTaskForView = ref(null)

onMounted(async () => {
  try {
    await taskStore.fetchTasks()
    await taskStore.fetchCategories()
  } catch (error) {
    // L'erreur est déjà gérée dans le store
  }
})

function updateFilters(newFilters) {
  filters.value = newFilters
}

async function handleDrop(taskId, newStatus) {
  try {
    const task = taskStore.tasks.find(t => t.id === taskId)
    if (task && task.status !== newStatus) {
      const updatedTask = {
        ...task,
        status: newStatus,
        due_date: task.due_date.includes('T') ? task.due_date : task.due_date + 'T12:00:00.000Z'
      }
      
      await taskStore.updateTask(updatedTask)
    }
  } catch (error) {
    // L'erreur est déjà gérée dans le store
  }
}

function openCreateForm() {
  taskMode.value = 'create'
  selectedTask.value = {
    title: '',
    description: '',
    category: '',
    priority: '',
    due_date: ''
  }
  showTaskForm.value = true
}

function editTask(task) {
  selectedTask.value = {
    ...task,
    due_date: task.due_date.split('T')[0]
  }
  taskMode.value = 'edit'
  showTaskForm.value = true
}

async function deleteTask(taskId) {
  if (confirm('Êtes-vous sûr de vouloir supprimer cette tâche ?')) {
    try {
      await taskStore.deleteTask(taskId)
    } catch (error) {
      // L'erreur est déjà gérée dans le store
    }
  }
}

async function handleTaskSubmit(taskData) {
  try {
    if (taskMode.value === 'create') {
      await taskStore.addTask(taskData)
    } else {
      await taskStore.updateTask({
        ...taskData,
        id: selectedTask.value.id
      })
    }
    closeTaskForm()
  } catch (error) {
    // L'erreur est déjà gérée dans le store
  }
}

function closeTaskForm() {
  showTaskForm.value = false
  taskMode.value = 'create'
  selectedTask.value = {
    title: '',
    description: '',
    category: '',
    priority: '',
    due_date: ''
  }
}

function viewTask(task) {
  selectedTaskForView.value = task
  showTaskDetail.value = true
}

function closeTaskDetail() {
  showTaskDetail.value = false
  selectedTaskForView.value = null
}

function editTaskFromDetail(task) {
  closeTaskDetail()
  editTask(task)
}

async function deleteTaskFromDetail(taskId) {
  closeTaskDetail()
  await deleteTask(taskId)
}
</script>

<style scoped>
.home-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  padding: 20px;
  width: 100%;
}

@media (max-width: 768px) {
  .home-container {
    padding: 16px;
  }
}

@media (max-width: 480px) {
  .home-container {
    padding: 12px;
  }
}
</style>
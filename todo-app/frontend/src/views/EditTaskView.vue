<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-6">Modifier la tâche</h1>
    
    <div v-if="loading" class="text-center">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
      <p class="mt-4">Chargement...</p>
    </div>
    
    <div v-else class="max-w-2xl mx-auto">
      <TaskForm 
        mode="edit"
        :task="task"
        @submit="updateTask"
        @cancel="$router.push('/')"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useTaskStore } from '@/stores/tasks'
import TaskForm from '@/components/TaskForm.vue'

const router = useRouter()
const route = useRoute()
const store = useTaskStore()
const loading = ref(true)
const task = reactive({
  title: '',
  description: '',
  category: '',
  priority: '',
  due_date: ''
})

async function loadTask() {
  try {
    const taskId = parseInt(route.params.id)
    const currentTask = store.tasks.find(t => t.id === taskId)
    if (currentTask) {
      Object.assign(task, {
        ...currentTask,
        due_date: currentTask.due_date.split('T')[0]
      })
    } else {
      router.push('/404')
    }
  } catch (error) {
    console.error('Erreur lors du chargement de la tâche:', error)
    router.push('/404')
  } finally {
    loading.value = false
  }
}

async function updateTask(taskData) {
  try {
    await store.updateTask({
      ...taskData,
      id: parseInt(route.params.id)
    })
    router.push('/')
  } catch (error) {
    console.error('Erreur lors de la mise à jour de la tâche:', error)
    // Erreur gérée dans le store
  }
}

loadTask()
</script>
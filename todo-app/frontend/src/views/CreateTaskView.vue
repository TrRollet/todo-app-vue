<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-6">Nouvelle tâche</h1>
    
    <div class="max-w-2xl mx-auto">
      <TaskForm 
        mode="create"
        @submit="createTask"
        @cancel="$router.push('/')"
      />
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useTaskStore } from '@/stores/tasks'
import TaskForm from '@/components/TaskForm.vue'

const router = useRouter()
const store = useTaskStore()

async function createTask(taskData) {
  try {
    await store.addTask(taskData)
    router.push('/')
  } catch (error) {
    console.error('Erreur lors de la création de la tâche:', error)
    alert('Une erreur est survenue lors de la création de la tâche. Veuillez réessayer.')
  }
}
</script>
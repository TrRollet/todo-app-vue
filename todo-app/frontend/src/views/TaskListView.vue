<template>
  <div>
    <h1>Liste des tâches</h1>

    <div class="filters">
      <select v-model="categoryFilter">
        <option value="">Toutes les catégories</option>
        <option v-for="category in store.categories" :key="category" :value="category">
          {{ category }}
        </option>
      </select>

      <select v-model="priorityFilter">
        <option value="">Toutes les priorités</option>
        <option value="Haute">Haute</option>
        <option value="Moyenne">Moyenne</option>
        <option value="Basse">Basse</option>
      </select>
    </div>

    <TaskForm 
      v-if="selectedTask" 
      :task="selectedTask"
      mode="edit"
      @submit="updateTask" 
      @cancel="selectedTask = null" 
    />
    
    <TaskList 
      :tasks="filteredTasks"
      :loading="store.loading"
      @edit="editTask"
      @delete="deleteTask"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useTaskStore } from '@/stores/tasks'
import TaskList from '@/components/TaskList.vue'
import TaskForm from '@/components/TaskForm.vue'

const store = useTaskStore()
const selectedTask = ref(null)
const categoryFilter = ref('')
const priorityFilter = ref('')

onMounted(() => {
  store.fetchTasks()
  store.fetchCategories()
})

const filteredTasks = computed(() => {
  return store.tasks.filter((task) => {
    return (
      (!categoryFilter.value || task.category === categoryFilter.value) &&
      (!priorityFilter.value || task.priority === priorityFilter.value)
    )
  })
})

function editTask(task) {
  selectedTask.value = {
    ...task,
    due_date: task.due_date.split('T')[0]
  }
}

async function deleteTask(id) {
  if (confirm('Êtes-vous sûr de vouloir supprimer cette tâche ?')) {
    try {
      await store.deleteTask(id)
    } catch (error) {
      // L'erreur est gérée dans le store
    }
  }
}

async function updateTask(taskData) {
  try {
    await store.updateTask({
      ...taskData,
      id: selectedTask.value.id
    })
    selectedTask.value = null
  } catch (error) {
    // L'erreur est gérée dans le store
  }
}
</script>
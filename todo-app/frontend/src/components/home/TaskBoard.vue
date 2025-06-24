<template>
  <div class="task-board">
    <TaskColumn 
      v-for="status in statuses" 
      :key="status"
      :title="status"
      :tasks="getTasksByStatus(status)"
      @drop="(taskId, newStatus) => $emit('drop', taskId, newStatus)"
      @edit="$emit('edit', $event)"
      @delete="$emit('delete', $event)"
      @view="$emit('view', $event)"
    />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import TaskColumn from '@/components/TaskColumn.vue'

const props = defineProps({
  tasks: {
    type: Array,
    required: true
  },
  filters: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['drop', 'edit', 'delete', 'view'])

const statuses = ['À faire', 'En cours', 'Terminé']

const getTasksByStatus = (status) => {
  let tasks = props.tasks.filter(task => {
    const matchStatus = task.status === status
    const matchPriority = !props.filters.priority || task.priority === props.filters.priority
    const matchCategory = !props.filters.category || task.category === props.filters.category
    
    const matchSearch = !props.filters.search || 
                       task.title.toLowerCase().includes(props.filters.search.toLowerCase()) ||
                       task.description.toLowerCase().includes(props.filters.search.toLowerCase()) ||
                       task.category.toLowerCase().includes(props.filters.search.toLowerCase())
    
    return matchStatus && matchPriority && matchCategory && matchSearch
  })

  return sortTasks(tasks, props.filters.sortBy, props.filters.sortOrder)
}

function sortTasks(tasks, sortBy, sortOrder) {
  const sortedTasks = [...tasks].sort((a, b) => {
    let comparison = 0

    switch (sortBy) {
      case 'due_date':
        comparison = new Date(a.due_date) - new Date(b.due_date)
        break
      case 'priority':
        const priorityOrder = { 'Haute': 3, 'Moyenne': 2, 'Basse': 1 }
        comparison = priorityOrder[a.priority] - priorityOrder[b.priority]
        break
      default:
        comparison = 0
    }

    return sortOrder === 'desc' ? -comparison : comparison
  })

  return sortedTasks
}
</script>

<style scoped>
.task-board {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 24px;
  align-items: start;
  width: 100%;
}

@media (max-width: 1024px) {
  .task-board {
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: 20px;
  }
}

@media (max-width: 768px) {
  .task-board {
    grid-template-columns: 1fr;
    gap: 16px;
  }
}
</style>
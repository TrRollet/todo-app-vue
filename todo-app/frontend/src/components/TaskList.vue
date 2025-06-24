<template>
  <div>
    <div v-if="tasks.length === 0">Aucune tâche trouvée</div>
    <div v-else class="task-list">
      <TaskCard
        v-for="task in tasks"
        :key="task.id"
        :task="task"
        @edit="$emit('edit', task)"
        @delete="$emit('delete', $event)"
        @view="$emit('view', task)"
      />
    </div>
  </div>
</template>

<script setup>
import TaskCard from './TaskCard.vue'

defineProps({
  tasks: {
    type: Array,
    default: () => []
  }
})

defineEmits(['edit', 'delete', 'view'])
</script>

<style scoped>
.task-list {
  display: grid;
  gap: 1rem;
  margin-top: 1rem;
}
</style>
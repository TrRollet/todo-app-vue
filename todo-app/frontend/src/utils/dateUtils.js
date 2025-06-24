export function isTaskOverdue(task) {
  if (!task.due_date || task.status === 'Terminé') return false
  
  const dueDate = new Date(task.due_date)
  
  // Si la date d'échéance est aujourd'hui, on considère qu'elle est en retard seulement après 23:59
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const dueDateOnly = new Date(dueDate)
  dueDateOnly.setHours(0, 0, 0, 0)
  
  // Si c'est aujourd'hui, pas encore en retard
  if (dueDateOnly.getTime() === today.getTime()) {
    return false
  }
  
  // Sinon, en retard si la date est dépassée
  return dueDateOnly < today
}

export function isTaskUrgent(task) {
  if (!task.due_date || task.status === 'Terminé') return false
  
  const dueDate = new Date(task.due_date)
  dueDate.setHours(0, 0, 0, 0)
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const diffTime = dueDate - today
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  return diffDays <= 2 && diffDays >= 0
}

export function formatTaskDate(task, options = { day: 'numeric', month: 'long', year: 'numeric' }) {
  if (!task.due_date) return 'Non définie'
  return new Date(task.due_date).toLocaleDateString('fr-FR', options)
}
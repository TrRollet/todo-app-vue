import { defineStore } from 'pinia'
import axios from 'axios'
import { useNotificationStore } from './notifications'

const baseURL = 'http://localhost:8000'
axios.defaults.baseURL = baseURL

export const useTaskStore = defineStore('tasks', {
  state: () => ({
    tasks: [],
    categories: [],
    statuses: ["À faire", "En cours", "Terminé"],
    loading: false,
    cache: {
      categoriesLoaded: false
    }
  }),
  actions: {
    // Helper pour créer des messages d'erreur détaillés
    getErrorMessage(error) {
      if (error.response) {
        // Erreur de réponse du serveur
        const status = error.response.status
        const data = error.response.data
        
        switch (status) {
          case 422:
            if (data.detail && Array.isArray(data.detail)) {
              const errors = data.detail.map(err => `${err.loc[1]}: ${err.msg}`).join(', ')
              return `Erreur de validation: ${errors}`
            }
            return `Erreur de validation: ${data.detail || 'Données invalides'}`
          case 400:
            return `Erreur de requête: ${data.detail || 'Requête malformée'}`
          case 404:
            return 'Ressource non trouvée'
          case 500:
            return 'Erreur serveur interne'
          default:
            return `Erreur ${status}: ${data.detail || error.message}`
        }
      } else if (error.request) {
        // Erreur de réseau
        return 'Erreur de connexion: Impossible de contacter le serveur'
      } else {
        // Autre erreur
        return `Erreur: ${error.message}`
      }
    },

    async fetchCategories(force = false) {
      if (this.cache.categoriesLoaded && !force) {
        return
      }

      try {
        const res = await axios.get('/categories')
        this.categories = res.data
        this.cache.categoriesLoaded = true
      } catch (err) {
        const notificationStore = useNotificationStore()
        const errorMessage = this.getErrorMessage(err)
        notificationStore.error(errorMessage)
        throw new Error(errorMessage)
      }
    },

    async fetchTasks() {
      this.loading = true
      try {
        const res = await axios.get('/tasks')
        this.tasks = res.data
      } catch (err) {
        const notificationStore = useNotificationStore()
        const errorMessage = this.getErrorMessage(err)
        notificationStore.error(errorMessage)
        throw new Error(errorMessage)
      } finally {
        this.loading = false
      }
    },

    async addTask(task) {
      this.loading = true 
      try {
        const res = await axios.post('/tasks', task)
        this.tasks.push(res.data)
        const truncatedTitle = task.title.length > 30 ? task.title.substring(0, 30) + '...' : task.title
        
        const notificationStore = useNotificationStore()
        notificationStore.success(`Tâche "${truncatedTitle}" créée avec succès !`, 'plus')
        
        return res.data
      } catch (err) {
        const notificationStore = useNotificationStore()
        const errorMessage = this.getErrorMessage(err)
        notificationStore.error(errorMessage)
        throw new Error(errorMessage)
      } finally {
        this.loading = false
      }
    },

    async updateTask(task) {
      this.loading = true
      try {
        const res = await axios.put(`/tasks/${task.id}`, task)
        const index = this.tasks.findIndex(t => t.id === task.id)
        if (index !== -1) {
          this.tasks[index] = res.data
        }
        const truncatedTitle = task.title.length > 30 ? task.title.substring(0, 30) + '...' : task.title
        
        const notificationStore = useNotificationStore()
        notificationStore.success(`Tâche "${truncatedTitle}" modifiée avec succès !`, 'edit')
        
        return res.data
      } catch (err) {
        const notificationStore = useNotificationStore()
        const errorMessage = this.getErrorMessage(err)
        notificationStore.error(errorMessage)
        throw new Error(errorMessage)
      } finally {
        this.loading = false
      }
    },

    async deleteTask(id) {
      try {
        const taskToDelete = this.tasks.find(t => t.id === id)
        const taskTitle = taskToDelete ? taskToDelete.title : 'la tâche'
        const truncatedTitle = taskTitle.length > 30 ? taskTitle.substring(0, 30) + '...' : taskTitle
        
        await axios.delete(`/tasks/${id}`)
        this.tasks = this.tasks.filter(t => t.id !== id)
        
        const notificationStore = useNotificationStore()
        notificationStore.success(`Tâche "${truncatedTitle}" supprimée avec succès !`, 'trash')
      } catch (err) {
        const notificationStore = useNotificationStore()
        const errorMessage = this.getErrorMessage(err)
        notificationStore.error(errorMessage)
        throw new Error(errorMessage)
      }
    }
  }
})
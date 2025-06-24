import { defineStore } from 'pinia'

export const useNotificationStore = defineStore('notifications', {
  state: () => ({
    notifications: []
  }),
  
  actions: {
    addNotification(message, type = 'success', icon = null, duration = null) {
      // Définir l'icône par défaut selon le type
      if (!icon) {
        icon = type === 'success' ? 'check' : 'alert'
      }

      // Définir la durée par défaut selon le type
      if (!duration) {
        duration = type === 'success' ? 3000 : 6000
      }

      // Créer un ID unique pour la notification
      const id = Date.now() + Math.random()

      const notification = {
        id,
        message,
        type,
        icon,
        timeout: setTimeout(() => {
          this.removeNotification(id)
        }, duration)
      }

      // Ajouter la nouvelle notification en haut de la liste
      this.notifications.unshift(notification)

      // Limiter à 5 notifications maximum
      if (this.notifications.length > 5) {
        const oldNotification = this.notifications.pop()
        if (oldNotification.timeout) {
          clearTimeout(oldNotification.timeout)
        }
      }
    },

    removeNotification(id) {
      const index = this.notifications.findIndex(n => n.id === id)
      if (index !== -1) {
        const notification = this.notifications[index]
        if (notification.timeout) {
          clearTimeout(notification.timeout)
        }
        this.notifications.splice(index, 1)
      }
    },

    clearAllNotifications() {
      this.notifications.forEach(notification => {
        if (notification.timeout) {
          clearTimeout(notification.timeout)
        }
      })
      this.notifications = []
    },

    // Méthodes helper
    success(message, icon = 'check') {
      this.addNotification(message, 'success', icon, 3000)
    },

    error(message, icon = 'alert') {
      this.addNotification(message, 'error', icon, 6000)
    },

    info(message, icon = 'info') {
      this.addNotification(message, 'info', icon, 4000)
    },

    warning(message, icon = 'warning') {
      this.addNotification(message, 'warning', icon, 5000)
    }
  }
})
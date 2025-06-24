<template>
  <div class="toast-container">
    <TransitionGroup name="toast" tag="div">
      <div 
        v-for="notification in notificationStore.notifications" 
        :key="notification.id"
        class="toast-notification" 
        :class="[notification.type + '-notification']"
      >
        <div class="notification-content">
          <span class="notification-icon">
            <Plus v-if="notification.icon === 'plus'" :size="20" />
            <Edit3 v-else-if="notification.icon === 'edit'" :size="20" />
            <Trash2 v-else-if="notification.icon === 'trash'" :size="20" />
            <CheckCircle v-else-if="notification.icon === 'check'" :size="20" />
            <AlertTriangle v-else-if="notification.icon === 'alert'" :size="20" />
            <CheckCircle v-else :size="20" />
          </span>
          <span class="notification-text">{{ notification.message }}</span>
          <button @click="notificationStore.removeNotification(notification.id)" class="notification-close">
            <X :size="18" />
          </button>
        </div>
      </div>
    </TransitionGroup>
  </div>
</template>

<script setup>
import { useNotificationStore } from '@/stores/notifications'
import { 
  AlertTriangle, 
  X, 
  CheckCircle,
  Plus,
  Edit3,
  Trash2
} from 'lucide-vue-next'

const notificationStore = useNotificationStore()
</script>

<style scoped>
.toast-container {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  gap: 12px;
  pointer-events: none;
}

.toast-notification {
  pointer-events: auto;
  color: white;
  border-radius: 12px;
  animation: slideInRight 0.3s ease-out;
  max-width: 400px;
  min-width: 300px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  margin-bottom: 6px;
}

.success-notification {
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  box-shadow: 0 8px 32px rgba(16, 185, 129, 0.3);
}

.error-notification {
  background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
  box-shadow: 0 8px 32px rgba(239, 68, 68, 0.3);
}

.notification-content {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px 20px;
}

.notification-icon {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
}

.notification-text {
  flex: 1;
  font-size: 14px;
  font-weight: 500;
  line-height: 1.4;
  color: white;
}

.notification-close {
  flex-shrink: 0;
  background: none;
  border: none;
  color: rgba(255, 255, 255, 0.8);
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.notification-close:hover {
  background: rgba(255, 255, 255, 0.1);
  color: white;
}

.toast-enter-active {
  transition: all 0.3s ease-out;
}

.toast-leave-active {
  transition: all 0.3s ease-in;
}

.toast-enter-from {
  transform: translateX(100%);
  opacity: 0;
}

.toast-leave-to {
  transform: translateX(100%);
  opacity: 0;
}

.toast-move {
  transition: transform 0.3s ease;
}

@keyframes slideInRight {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

@media (max-width: 640px) {
  .toast-container {
    left: 10px;
    right: 10px;
    top: 10px;
  }
  
  .toast-notification {
    max-width: none;
    min-width: auto;
  }
  
  .notification-content {
    padding: 14px 16px;
  }
  
  .notification-text {
    font-size: 13px;
  }
}

.notification-close svg {
  vertical-align: middle;
}
</style>
<template>
  <div class="not-found-container">
    <!-- Particules d'arrière-plan animées -->
    <div class="particles">
      <div v-for="i in 50" :key="i" class="particle" :style="getParticleStyle(i)"></div>
    </div>

    <!-- Contenu principal -->
    <div class="not-found-content">
      <!-- Animation du logo/icône -->
      <div class="error-icon-container">
        <div class="error-icon" @click="triggerBounce">
          <Search :size="120" class="search-icon" />
          <div class="question-marks">
            <span class="question-mark q1">?</span>
            <span class="question-mark q2">?</span>
            <span class="question-mark q3">?</span>
          </div>
        </div>
      </div>

      <!-- Titre 404 avec effet de gradient -->
      <h1 class="error-title" ref="titleRef">
        <span class="number">4</span>
        <span class="number zero">0</span>
        <span class="number">4</span>
      </h1>

      <!-- Message principal -->
      <div class="error-message">
        <h2 class="message-title">Oups ! Page introuvable</h2>
        <p class="message-subtitle">
          Il semblerait que cette page ait été <span class="highlight">supprimée</span> 
          ou n'ait jamais existé.
        </p>
      </div>

      <!-- Action avec animation -->
      <div class="action-buttons">
        <router-link to="/" class="btn-primary" @click="playClickAnimation">
          <span class="btn-icon">
            <Home :size="20" />
          </span>
          <span class="btn-text">Retour à l'accueil</span>
          <div class="btn-ripple"></div>
        </router-link>
      </div>
    </div>

    <!-- Animation de confettis au clic -->
    <div class="confetti-container" ref="confettiRef"></div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { Search, Home } from 'lucide-vue-next'

const titleRef = ref(null)
const confettiRef = ref(null)

onMounted(() => {
  // Animation d'entrée pour le titre
  if (titleRef.value) {
    titleRef.value.classList.add('animate-in')
  }
})

function getParticleStyle(index) {
  return {
    '--delay': `${Math.random() * 15}s`,
    '--duration': `${15 + Math.random() * 10}s`,
    '--x': `${Math.random() * 100}vw`,
    '--y': `${Math.random() * 100}vh`,
    '--size': `${2 + Math.random() * 4}px`,
    '--opacity': Math.random() * 0.5 + 0.1
  }
}

function triggerBounce() {
  const icon = document.querySelector('.error-icon')
  icon.classList.add('bounce-animation')
  setTimeout(() => icon.classList.remove('bounce-animation'), 600)
  
  // Confettis surprise !
  createConfetti()
}

function createConfetti() {
  const container = confettiRef.value
  const colors = ['#667eea', '#764ba2', '#10b981', '#f59e0b', '#ef4444']
  
  for (let i = 0; i < 30; i++) {
    const confetti = document.createElement('div')
    confetti.className = 'confetti-piece'
    confetti.style.cssText = `
      position: absolute;
      width: 6px;
      height: 6px;
      background: ${colors[Math.floor(Math.random() * colors.length)]};
      top: 50%;
      left: 50%;
      border-radius: 50%;
      animation: confettiFall 2s ease-out forwards;
      transform: translate(-50%, -50%) translateX(${(Math.random() - 0.5) * 300}px) translateY(${(Math.random() - 0.5) * 300}px) rotate(${Math.random() * 360}deg);
    `
    container.appendChild(confetti)
    
    setTimeout(() => confetti.remove(), 2000)
  }
}

function playClickAnimation(event) {
  const button = event.currentTarget
  const ripple = button.querySelector('.btn-ripple')
  
  ripple.style.left = `${event.offsetX}px`
  ripple.style.top = `${event.offsetY}px`
  ripple.classList.add('ripple-animation')
  
  setTimeout(() => ripple.classList.remove('ripple-animation'), 600)
}
</script>

<style scoped>
.not-found-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  position: relative;
  overflow: hidden;
}

/* Particules animées */
.particles {
  position: absolute;
  width: 100%;
  height: 100%;
  pointer-events: none;
  overflow: hidden;
}

.particle {
  position: absolute;
  width: var(--size);
  height: var(--size);
  background: linear-gradient(135deg, #667eea, #764ba2);
  border-radius: 50%;
  opacity: var(--opacity);
  animation: float var(--duration) var(--delay) infinite linear;
  left: var(--x);
  top: var(--y);
}

@keyframes float {
  0% {
    transform: translateY(0px) rotate(0deg);
    opacity: var(--opacity);
  }
  50% {
    opacity: calc(var(--opacity) * 0.5);
  }
  100% {
    transform: translateY(-100vh) rotate(360deg);
    opacity: 0;
  }
}

/* Contenu principal */
.not-found-content {
  text-align: center;
  max-width: 600px;
  position: relative;
  z-index: 10;
  animation: fadeInUp 0.8s ease-out;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Icône d'erreur avec animations */
.error-icon-container {
  margin-bottom: 40px;
}

.error-icon {
  position: relative;
  display: inline-block;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.error-icon:hover {
  transform: scale(1.05);
}

.search-icon {
  color: #667eea;
  filter: drop-shadow(0 10px 20px rgba(102, 126, 234, 0.3));
  animation: gentle-pulse 3s ease-in-out infinite;
}

@keyframes gentle-pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
}

.question-marks {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.question-mark {
  position: absolute;
  font-size: 24px;
  font-weight: bold;
  color: #f59e0b;
  animation: float-question 2s ease-in-out infinite;
}

.q1 {
  top: 10%;
  right: 20%;
  animation-delay: 0s;
}

.q2 {
  bottom: 20%;
  left: 15%;
  animation-delay: 0.7s;
}

.q3 {
  top: 30%;
  left: 80%;
  animation-delay: 1.4s;
}

@keyframes float-question {
  0%, 100% {
    transform: translateY(0px) rotate(0deg);
    opacity: 0.7;
  }
  50% {
    transform: translateY(-10px) rotate(5deg);
    opacity: 1;
  }
}

.bounce-animation {
  animation: bounce-fun 0.6s ease-in-out;
}

@keyframes bounce-fun {
  0%, 20%, 53%, 80%, 100% {
    transform: translate3d(0,0,0) scale(1);
  }
  40%, 43% {
    transform: translate3d(0, -20px, 0) scale(1.1);
  }
  70% {
    transform: translate3d(0, -10px, 0) scale(1.05);
  }
  90% {
    transform: translate3d(0, -2px, 0) scale(1.02);
  }
}

/* Titre 404 spectaculaire */
.error-title {
  font-size: 120px;
  font-weight: 900;
  margin: 0 0 30px 0;
  line-height: 1;
  opacity: 0;
  animation: slideInScale 1s 0.3s ease-out forwards;
}

.error-title.animate-in .number {
  animation: numberDance 0.6s ease-out forwards;
}

.error-title .number {
  display: inline-block;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f59e0b 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  filter: drop-shadow(0 5px 15px rgba(102, 126, 234, 0.3));
  transform: scale(0);
  animation-fill-mode: forwards;
}

.error-title .number:nth-child(1) { animation-delay: 0.1s; }
.error-title .number:nth-child(2) { animation-delay: 0.2s; }
.error-title .number:nth-child(3) { animation-delay: 0.3s; }

.error-title .zero {
  animation: zeroSpin 1s 0.2s ease-out forwards;
}

@keyframes slideInScale {
  to {
    opacity: 1;
  }
}

@keyframes numberDance {
  0% {
    transform: scale(0) rotate(180deg);
  }
  80% {
    transform: scale(1.1) rotate(-10deg);
  }
  100% {
    transform: scale(1) rotate(0deg);
  }
}

@keyframes zeroSpin {
  0% {
    transform: scale(0) rotate(0deg);
  }
  50% {
    transform: scale(1.2) rotate(180deg);
  }
  100% {
    transform: scale(1) rotate(360deg);
  }
}

/* Messages */
.error-message {
  margin-bottom: 50px;
  animation: fadeIn 1s 0.6s ease-out both;
}

.message-title {
  font-size: 32px;
  font-weight: 700;
  color: #1a202c;
  margin: 0 0 16px 0;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.message-subtitle {
  font-size: 18px;
  color: #6b7280;
  line-height: 1.6;
  margin: 0;
}

.highlight {
  color: #ef4444;
  font-weight: 600;
  position: relative;
}

.highlight::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background: linear-gradient(90deg, #ef4444, #f59e0b);
  animation: highlight-slide 2s ease-in-out infinite;
}

@keyframes highlight-slide {
  0%, 100% { transform: scaleX(0); }
  50% { transform: scaleX(1); }
}

/* Bouton d'action */
.action-buttons {
  display: flex;
  justify-content: center;
  animation: fadeIn 1s 0.8s ease-out both;
}

.btn-primary {
  position: relative;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px 24px;
  border-radius: 16px;
  font-size: 16px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
  cursor: pointer;
  border: none;
  min-width: 200px;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  box-shadow: 0 8px 32px rgba(102, 126, 234, 0.4);
}

.btn-primary:hover {
  transform: translateY(-4px) scale(1.02);
  box-shadow: 0 12px 40px rgba(102, 126, 234, 0.6);
}

.btn-icon {
  display: flex;
  align-items: center;
  justify-content: center;
}

.btn-text {
  display: flex;
  align-items: center;
  line-height: 1;
}

.btn-ripple {
  position: absolute;
  width: 0;
  height: 0;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.5);
  transform: scale(0);
  pointer-events: none;
}

.ripple-animation {
  animation: ripple 0.6s linear;
}

@keyframes ripple {
  to {
    width: 200px;
    height: 200px;
    transform: scale(1);
    opacity: 0;
  }
}

/* Confettis */
.confetti-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1000;
}

@keyframes confettiFall {
  to {
    transform: translate(-50%, -50%) translateY(100vh) rotate(720deg);
    opacity: 0;
  }
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

/* Responsive */
@media (max-width: 768px) {
  .not-found-container {
    padding: 20px 16px;
  }

  .error-title {
    font-size: 80px;
  }

  .message-title {
    font-size: 24px;
  }

  .message-subtitle {
    font-size: 16px;
  }

  .btn-primary {
    width: 100%;
    max-width: 280px;
  }
}

@media (max-width: 480px) {
  .error-title {
    font-size: 60px;
  }

  .search-icon {
    width: 80px;
    height: 80px;
  }

  .question-mark {
    font-size: 18px;
  }
}
</style>
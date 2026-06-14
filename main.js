document.addEventListener('DOMContentLoaded', () => {
  // Menu mobile
  const menuBtn = document.getElementById('menuBtn');
  const mobileMenu = document.getElementById('mobileMenu');

  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('open');
    });
  }

  // ===========================
  // AURA LEVEL 67 - SOBRECARGA
  // ===========================
  const auraBtn = document.getElementById('auraBtn');
  window.auraActive = false; // Tornar global para outras funções

  if (auraBtn) {
    auraBtn.addEventListener('click', () => {
      window.auraActive = !window.auraActive;
      
      if (window.auraActive) {
        document.body.classList.add('aura-level-67');
        auraBtn.classList.add('aura-active');
        
        // Efeito visual de ativação
        createAuraExplosion();
        
        // Fogos de artifício
        createFireworks();
        
        // Mensagem de vitória
        showAuraMessage();
        
        // Vibração do dispositivo (se suportado)
        if (navigator.vibrate) {
          navigator.vibrate([100, 50, 100, 50, 200, 50, 100]);
        }
      } else {
        document.body.classList.remove('aura-level-67');
        auraBtn.classList.remove('aura-active');
      }
    });
  }
});

function closeMenu() {
  const mobileMenu = document.getElementById('mobileMenu');
  if (mobileMenu) mobileMenu.classList.remove('open');
}

// Função para criar explosão de aura
function createAuraExplosion() {
  const explosion = document.createElement('div');
  explosion.className = 'aura-explosion';
  document.body.appendChild(explosion);
  
  setTimeout(() => {
    explosion.remove();
  }, 1000);
}

// Função para criar fogos de artifício
function createFireworks() {
  const colors = ['#00d9ff', '#7f39fb', '#ec4899', '#ff006e', '#00ff88'];
  
  // Criar múltiplos fogos em diferentes posições
  for (let i = 0; i < 50; i++) {
    setTimeout(() => {
      const firework = document.createElement('div');
      firework.className = 'firework';
      
      // Posição aleatória na tela
      const x = Math.random() * window.innerWidth;
      const y = Math.random() * window.innerHeight * 0.6; // Mais no topo
      
      firework.style.left = x + 'px';
      firework.style.top = y + 'px';
      firework.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      
      document.body.appendChild(firework);
      
      // Remover após animação
      setTimeout(() => {
        firework.remove();
      }, 1500);
    }, i * 50);
  }
  
  // Criar explosões centrais
  for (let i = 0; i < 3; i++) {
    setTimeout(() => {
      createCentralFirework();
    }, i * 300);
  }
}

// Função para criar explosão central de fogos
function createCentralFirework() {
  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 3;
  const colors = ['#00d9ff', '#7f39fb', '#ec4899', '#ff006e'];
  
  for (let i = 0; i < 30; i++) {
    const firework = document.createElement('div');
    firework.className = 'firework-burst';
    
    const angle = (i / 30) * Math.PI * 2;
    const distance = 200;
    const x = centerX + Math.cos(angle) * distance;
    const y = centerY + Math.sin(angle) * distance;
    
    firework.style.left = centerX + 'px';
    firework.style.top = centerY + 'px';
    firework.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    firework.style.setProperty('--tx', (x - centerX) + 'px');
    firework.style.setProperty('--ty', (y - centerY) + 'px');
    
    document.body.appendChild(firework);
    
    setTimeout(() => {
      firework.remove();
    }, 1500);
  }
}

// Função para mostrar mensagem "GANHOU AURA"
function showAuraMessage() {
  const messageContainer = document.createElement('div');
  messageContainer.className = 'aura-message-container';
  
  const message = document.createElement('div');
  message.className = 'aura-message';
  message.textContent = '🎆 GANHOU AURA 🎆';
  
  messageContainer.appendChild(message);
  document.body.appendChild(messageContainer);
  
  // Remover mensagem após animação
  setTimeout(() => {
    messageContainer.remove();
  }, 3000);
}

// Criar partículas de aura flutuando
function createAuraParticles() {
  if (!window.auraActive) return;
  
  const particle = document.createElement('div');
  particle.className = 'aura-particle';
  particle.style.left = Math.random() * 100 + '%';
  particle.style.top = Math.random() * 100 + '%';
  document.body.appendChild(particle);
  
  setTimeout(() => {
    particle.remove();
  }, 3000);
}

// Gerar partículas continuamente quando aura está ativa
setInterval(() => {
  if (window.auraActive && Math.random() > 0.7) {
    createAuraParticles();
  }
}, 300);

// Contador animado nas stats
function animateCount(el, target, duration = 1200) {
  let start = 0;
  const step = target / (duration / 16);
  const timer = setInterval(() => {
    start += step;
    if (start >= target) {
      el.textContent = target;
      clearInterval(timer);
    } else {
      el.textContent = Math.floor(start);
    }
  }, 16);
}

// Dispara o contador quando a seção entra na tela
const statsSection = document.querySelector('.stats');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCount(document.getElementById('countProjetos'), 3);
      animateCount(document.getElementById('countTechs'), 7);
      observer.disconnect();
    }
  });
}, { threshold: 0.5 });

if (statsSection) observer.observe(statsSection);

// Botão adicionar projeto
const addProject = document.getElementById('addProject');
if (addProject) {
  addProject.addEventListener('click', () => {
    alert('Para adicionar um projeto, edite o arquivo index.html e copie o bloco .proj-card existente!');
  });
}

// Fechar menu ao clicar fora
document.addEventListener('click', (e) => {
  if (!menuBtn.contains(e.target) && !mobileMenu.contains(e.target)) {
    mobileMenu.classList.remove('open');
  }
});

// Efeito de glow ao mover o mouse (quando aura está ativa)
document.addEventListener('mousemove', (e) => {
  if (window.auraActive) {
    const glow = document.createElement('div');
    glow.className = 'mouse-glow';
    glow.style.left = e.clientX + 'px';
    glow.style.top = e.clientY + 'px';
    document.body.appendChild(glow);
    
    setTimeout(() => {
      glow.remove();
    }, 500);
  }
});

// Detectar scroll e adicionar efeito de energia
let scrollCount = 0;
window.addEventListener('scroll', () => {
  scrollCount++;
  if (window.auraActive && scrollCount % 5 === 0) {
    createAuraParticles();
  }
});

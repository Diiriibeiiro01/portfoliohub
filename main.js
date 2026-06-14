// Menu mobile
const menuBtn = document.getElementById('menuBtn');
const mobileMenu = document.getElementById('mobileMenu');

menuBtn.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
});

function closeMenu() {
  mobileMenu.classList.remove('open');
}

// ===========================
// AURA LEVEL 67 - SOBRECARGA
// ===========================
const auraBtn = document.getElementById('auraBtn');
let auraActive = false;

auraBtn.addEventListener('click', () => {
  auraActive = !auraActive;
  
  if (auraActive) {
    document.body.classList.add('aura-level-67');
    auraBtn.classList.add('aura-active');
    
    // Efeito visual de ativação
    createAuraExplosion();
    
    // Vibração do dispositivo (se suportado)
    if (navigator.vibrate) {
      navigator.vibrate([100, 50, 100, 50, 200]);
    }
  } else {
    document.body.classList.remove('aura-level-67');
    auraBtn.classList.remove('aura-active');
  }
});

// Função para criar explosão de aura
function createAuraExplosion() {
  const explosion = document.createElement('div');
  explosion.className = 'aura-explosion';
  document.body.appendChild(explosion);
  
  setTimeout(() => {
    explosion.remove();
  }, 1000);
}

// Criar partículas de aura flutuando
function createAuraParticles() {
  if (!auraActive) return;
  
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
  if (auraActive && Math.random() > 0.7) {
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
  if (auraActive) {
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
  if (auraActive && scrollCount % 5 === 0) {
    createAuraParticles();
  }
});

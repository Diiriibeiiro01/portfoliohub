// Menu mobile
const menuBtn = document.getElementById('menuBtn');
const mobileMenu = document.getElementById('mobileMenu');

menuBtn.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
});

function closeMenu() {
  mobileMenu.classList.remove('open');
}

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

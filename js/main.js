// Menu mobile
document.addEventListener('DOMContentLoaded', function() {
  const mobileMenu = document.querySelector('.mobile-menu');
  const nav = document.querySelector('nav ul');
  
  if (mobileMenu) {
    mobileMenu.addEventListener('click', function() {
      nav.classList.toggle('show');
    });
  }
  
  // Animación de números en estadísticas
  const statNumbers = document.querySelectorAll('.stat-number');
  if (statNumbers.length > 0) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateValue(entry.target, 0, entry.target.getAttribute('data-count'), 1500);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    
    statNumbers.forEach(stat => {
      observer.observe(stat);
    });
  }
  
  // FAQ acordeón
  const faqQuestions = document.querySelectorAll('.faq-question');
  faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
      const item = question.parentElement;
      item.classList.toggle('active');
    });
  });
  
  // Filtro de productos
  const filterButtons = document.querySelectorAll('.filter-btn');
  const productCards = document.querySelectorAll('.card[data-category]');
  
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Remover clase active de todos los botones
      filterButtons.forEach(btn => btn.classList.remove('active'));
      // Agregar clase active al botón clickeado
      button.classList.add('active');
      
      const filter = button.getAttribute('data-filter');
      
      productCards.forEach(card => {
        if (filter === 'all' || card.getAttribute('data-category') === filter) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
});

// Función para animar contadores
function animateValue(obj, start, end, duration) {
  let startTimestamp = null;
  const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    const value = Math.floor(progress * (end - start) + start);
    
    // Formatear números grandes con separador de miles
    obj.textContent = value.toLocaleString();
    
    if (progress < 1) {
      window.requestAnimationFrame(step);
    }
  };
  window.requestAnimationFrame(step);
}

// Validación de formulario de contacto
if (document.getElementById('formContacto')) {
  document.getElementById('formContacto').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const nombre = document.getElementById('nombre').value;
    const email = document.getElementById('email').value;
    const telefono = document.getElementById('telefono').value;
    const asunto = document.getElementById('asunto').value;
    const mensaje = document.getElementById('mensaje').value;
    
    let valid = true;
    
    // Validar nombre
    if (nombre.trim() === '') {
      alert('Por favor, ingresa tu nombre');
      valid = false;
      return;
    }
    
    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('Por favor, ingresa un email válido');
      valid = false;
      return;
    }
    
    // Validar asunto
    if (asunto.trim() === '') {
      alert('Por favor, ingresa un asunto');
      valid = false;
      return;
    }
    
    // Validar mensaje
    if (mensaje.trim() === '') {
      alert('Por favor, ingresa tu mensaje');
      valid = false;
      return;
    }
    
    if (valid) {
  const modal = document.getElementById('modalConfirmacion');
  const spanClose = modal.querySelector('.close');
  
  modal.style.display = 'block';

  // Cerrar con la X → redirige al inicio
  spanClose.onclick = function() {
    window.location.href = "index.html";
  };

  // Cerrar haciendo clic fuera → redirige al inicio
  window.onclick = function(event) {
    if (event.target === modal) {
      window.location.href = "index.html";
    }
  };

  // Resetear formulario
  this.reset();
}

  });
}
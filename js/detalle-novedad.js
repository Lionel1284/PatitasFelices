document.addEventListener('DOMContentLoaded', function() {
  // Obtener el parámetro de artículo de la URL
  const urlParams = new URLSearchParams(window.location.search);
  const articuloParam = urlParams.get('articulo');
  
  // Si hay un parámetro de artículo, cargar la información correspondiente
  if (articuloParam) {
    cargarArticulo(articuloParam);
  }
  
  // Compartir en redes sociales
  const shareButtons = document.querySelectorAll('.share-btn');
  
  shareButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      e.preventDefault();
      
      const articleTitle = document.querySelector('.article-detail h1').textContent;
      const articleUrl = window.location.href;
      const shareType = this.classList.contains('facebook') ? 'facebook' : 
                       this.classList.contains('twitter') ? 'twitter' : 'whatsapp';
      
      let shareUrl = '';
      
      switch(shareType) {
        case 'facebook':
          shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(articleUrl)}`;
          break;
        case 'twitter':
          shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(articleTitle)}&url=${encodeURIComponent(articleUrl)}`;
          break;
        case 'whatsapp':
          shareUrl = `https://wa.me/?text=${encodeURIComponent(articleTitle + ' ' + articleUrl)}`;
          break;
      }
      
      window.open(shareUrl, '_blank', 'width=600,height=400');
    });
  });
  
  // Smooth scroll para anclas internas
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
  
  // Resaltar elementos al hacer scroll
  const highlightElements = () => {
    const elements = document.querySelectorAll('.promo-card, .highlight-box');
    
    elements.forEach(element => {
      const position = element.getBoundingClientRect();
      
      // Si el elemento está visible en la pantalla
      if (position.top < window.innerHeight - 100 && position.bottom >= 0) {
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
      }
    });
  };
  
  // Inicializar estilos para animación
  document.querySelectorAll('.promo-card, .highlight-box').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  });
  
  // Ejecutar al cargar y al hacer scroll
  highlightElements();
  window.addEventListener('scroll', highlightElements);
  
  // Función para cargar información del artículo según el parámetro
  function cargarArticulo(articulo) {
    // Definir la información para cada artículo
    const articulos = {
      'campana-vacunacion-2025': {
        titulo: 'Campaña de vacunación 2025',
        fecha: '15 Marzo, 2025',
        autor: 'Por Dra. Laura Martínez',
        categoria: 'Campañas',
        imagen: 'img/vacunacion-campaña.jpg',
        contenido: `
          <p>En la Clínica Veterinaria Patitas Felices nos preocupa la salud de tus mascotas, por eso lanzamos nuestra <strong>Campaña de Vacunación 2025</strong> con precios especiales y servicios adicionales para garantizar su bienestar durante todo el año.</p>

          <h2>¿Por qué vacunar a tu mascota?</h2>
          <p>Las vacunas son esenciales para prevenir enfermedades graves que pueden afectar a perros y gatos. Muchas de estas enfermedades son altamente contagiosas y pueden ser mortales, pero son prevenibles mediante un calendario de vacunación adecuado.</p>

          <div class="highlight-box">
            <h3><i class="fas fa-calendar-check"></i> Fechas de la campaña</h3>
            <p>Del <strong>1 al 30 de Abril de 2025</strong></p>
            <p>Horario extendido: Lunes a Sábado de 8:00 a 20:00</p>
          </div>

          <h2>Vacunas incluidas en la campaña</h2>
          
          <div class="vaccine-table">
            <div class="vaccine-type">
              <h3>Para perros</h3>
              <ul>
                <li>Moquillo canino</li>
                <li>Parvovirus</li>
                <li>Hepatitis infecciosa</li>
                <li>Leptospirosis</li>
                <li>Rabia</li>
                <li>Traqueobronquitis infecciosa (tos de las perreras)</li>
              </ul>
            </div>
            <div class="vaccine-type">
              <h3>Para gatos</h3>
              <ul>
                <li>Panleucopenia felina</li>
                <li>Rinotraqueitis viral</li>
                <li>Calicivirus</li>
                <li>Leucemia felina</li>
                <li>Rabia</li>
                <li>Peritonitis infecciosa felina</li>
              </ul>
            </div>
          </div>

          <h2>Promociones especiales</h2>
          <p>Aprovecha nuestros descuentos especiales durante la campaña:</p>
          
          <div class="promo-cards">
            <div class="promo-card">
              <div class="promo-icon">
                <i class="fas fa-percentage"></i>
              </div>
              <h3>20% de descuento</h3>
              <p>En el plan completo de vacunación para cachorros y gatitos</p>
            </div>
            <div class="promo-card">
              <div class="promo-icon">
                <i class="fas fa-gift"></i>
              </div>
              <h3>Consulta gratuita</h3>
              <p>Revisión general incluida con cada vacunación</p>
            </div>
            <div class="promo-card">
              <div class="promo-icon">
                <i class="fas fa-tags"></i>
              </div>
              <h3>Desparasitación</h3>
              <p>15% de descuento en tratamientos de desparasitación</p>
            </div>
          </div>

          <div class="cta-box">
            <h2>¡Reserva tu cita ahora!</h2>
            <p>Espacios limitados. Agenda tu cita llamándonos o a través de nuestro formulario en línea.</p>
            <div class="cta-buttons">
              <a href="contacto.html" class="btn btn-primary">Solicitar cita</a>
              <a href="tel:+56975459443" class="btn btn-secondary">Llamar ahora</a>
            </div>
          </div>
        `
      },
      'consejo-cuidado-pelo': {
        titulo: 'Consejo de cuidado para el pelo de tu mascota',
        fecha: '10 Marzo, 2025',
        autor: 'Por Dr. Carlos Rodríguez',
        categoria: 'Cuidados',
        imagen: 'img/cuidado-pelo.jpg',
        contenido: `
          <p>El cuidado del pelaje de tu mascota es fundamental para su salud y bienestar general. Un pelo sano no solo es cuestión de estética, sino también un indicador de buena salud.</p>

          <h2>¿Por qué es importante el cepillado regular?</h2>
          <p>Cepillar el pelo de tu mascota regularmente ayuda a:</p>
          <ul>
            <li>Eliminar pelo muerto y evitar la formación de nudos</li>
            <li>Estimular la circulación sanguínea en la piel</li>
            <li>Distribuir los aceites naturales del pelo</li>
            <li>Prevenir problemas dermatológicos</li>
            <li>Detectar tempranamente parásitos o anomalías en la piel</li>
          </ul>

          <div class="highlight-box">
            <h3><i class="fas fa-lightbulb"></i> Recomendación profesional</h3>
            <p>Cepilla a tu mascota <strong>al menos 3 veces por semana</strong> para mantener su pelaje sano y brillante.</p>
          </div>

          <h2>Tips para un cepillado efectivo</h2>
          <div class="promo-cards">
            <div class="promo-card">
              <div class="promo-icon">
                <i class="fas fa-check-circle"></i>
              </div>
              <h3>Elección del cepillo</h3>
              <p>Utiliza un cepillo adecuado para el tipo de pelo de tu mascota (corto, largo, rizado, etc.)</p>
            </div>
            <div class="promo-card">
              <div class="promo-icon">
                <i class="fas fa-clock"></i>
              </div>
              <h3>Momento ideal</h3>
              <p>El mejor momento es cuando tu mascota está tranquila y relajada, después de paseo o ejercicio</p>
            </div>
            <div class="promo-card">
              <div class="promo-icon">
                <i class="fas fa-shield-alt"></i>
              </div>
              <h3>Protección adicional</h3>
              <p>Considera el uso de acondicionadores o protectores especiales para pelo</p>
            </div>
          </div>

          <h2>¿Cuándo buscar ayuda profesional?</h2>
          <p>Si notas alguno de estos signos, consulta con nuestro equipo de veterinarios:</p>
          <ul>
            <li>Caída excesiva de pelo</li>
            <li>Enredos severos que no puedes deshacer</li>
            <li>Irritación, enrojecimiento o heridas en la piel</li>
            <li>Presencia de parásitos externos</li>
            <li>Cambios en la textura o color del pelaje</li>
          </ul>

          <div class="cta-box">
            <h2>¿Necesitas asesoramiento?</h2>
            <p>Nuestros especialistas en dermatología canina y felina pueden ayudarte a establecer una rutina de cuidado adecuada para tu mascota.</p>
            <div class="cta-buttons">
              <a href="contacto.html" class="btn btn-primary">Solicitar consulta</a>
            </div>
          </div>
        `
      },
      'alimentacion-saludable': {
        titulo: 'Alimentación saludable para mascotas',
        fecha: '5 Marzo, 2025',
        autor: 'Por Dra. Ana Gómez',
        categoria: 'Nutrición',
        imagen: 'img/alimentacion-saludable.jpg',
        contenido: `
          <p>Una alimentación balanceada es fundamental para la salud y bienestar de tu mascota. Descubre cómo proporcionar la nutrición adecuada según sus necesidades específicas.</p>

          <h2>Beneficios de una alimentación adecuada</h2>
          <p>Una dieta equilibrada contribuye a:</p>
          <ul>
            <li>Mantener un peso saludable</li>
            <li>Fortalecer el sistema inmunológico</li>
            <li>Promover un pelaje brillante y sano</li>
            <li>Mejorar la digestión y salud intestinal</li>
            <li>Prevenir enfermedades relacionadas con la nutrición</li>
          </ul>

          <div class="highlight-box">
            <h3><i class="fas fa-exclamation-triangle"></i> ¡Atención!</h3>
            <p>La obesidad es uno de los problemas más comunes en mascotas. Controla las porciones y evita dar alimentos humanos.</p>
          </div>

          <h2>Tipos de alimentación</h2>
          <div class="promo-cards">
            <div class="promo-card">
              <div class="promo-icon">
                <i class="fas fa-bone"></i>
              </div>
              <h3>Alimento seco</h3>
              <p>Ayuda a mantener la salud dental y es práctico para servir y almacenar</p>
            </div>
            <div class="promo-card">
              <div class="promo-icon">
                <i class="fas fa-utensils"></i>
              </div>
              <h3>Alimento húmedo</h3>
              <p>Mayor palatabilidad y contenido de humedad, ideal para mascotas con problemas de hidratación</p>
            </div>
            <div class="promo-card">
              <div class="promo-icon">
                <i class="fas fa-apple-alt"></i>
              </div>
              <h3>Dietas especiales</h3>
              <p>Formuladas para necesidades específicas: control de peso, alergias, problemas renales, etc.</p>
            </div>
          </div>

          <h2>Recomendaciones por etapa de vida</h2>
          <div class="vaccine-table">
            <div class="vaccine-type">
              <h3>Cachorros/Gatitos</h3>
              <ul>
                <li>Alimento rico en proteínas y calorías</li>
                <li>Porciones pequeñas y frecuentes</li>
                <li>Nutrientes para desarrollo óseo y muscular</li>
              </ul>
            </div>
            <div class="vaccine-type">
              <h3>Adultos</h3>
              <ul>
                <li>Dieta balanceada de mantenimiento</li>
                <li>Control de porciones según actividad física</li>
                <li>Suplementos según necesidades específicas</li>
              </ul>
            </div>
            <div class="vaccine-type">
              <h3>Senior</h3>
              <ul>
                <li>Alimento bajo en calorías y fósforo</li>
                <li>Nutrientes para articulaciones</li>
                <li>Fácil masticación y digestión</li>
              </ul>
            </div>
          </div>

          <div class="cta-box">
            <h2>¿Necesitas asesoramiento nutricional?</h2>
            <p>Nuestros especialistas en nutrición animal pueden diseñar un plan alimenticio personalizado para tu mascota.</p>
            <div class="cta-buttons">
              <a href="contacto.html" class="btn btn-primary">Consultar con especialista</a>
            </div>
          </div>
        `
      },
      // Puedes agregar más artículos aquí siguiendo el mismo formato
      'importancia-ejercicio': {
        titulo: 'La importancia del ejercicio en mascotas',
        fecha: '28 Febrero, 2025',
        autor: 'Por Dr. Roberto Sánchez',
        categoria: 'Ejercicio',
        imagen: 'img/ejercicio-mascotas.jpg',
        contenido: `Contenido del artículo sobre ejercicio...`
      },
      'tips-entrenamiento': {
        titulo: 'Tips de entrenamiento canino efectivo',
        fecha: '20 Febrero, 2025',
        autor: 'Por Dra. Laura Martínez',
        categoria: 'Entrenamiento',
        imagen: 'img/entrenamiento.jpg',
        contenido: `Contenido del artículo sobre entrenamiento...`
      },
      'cuidados-verano': {
        titulo: 'Cuidados esenciales para mascotas en verano',
        fecha: '15 Febrero, 2025',
        autor: 'Por Dr. Carlos Rodríguez',
        categoria: 'Cuidados',
        imagen: 'img/verano-mascotas.jpg',
        contenido: `Contenido del artículo sobre cuidados en verano...`
      }
    };
    
    // Actualizar la página con la información del artículo
    const infoArticulo = articulos[articulo];
    if (infoArticulo) {
      document.querySelector('.article-detail h1').textContent = infoArticulo.titulo;
      document.querySelector('.article-date').innerHTML = '<i class="far fa-calendar"></i> ' + infoArticulo.fecha;
      document.querySelector('.article-author').innerHTML = '<i class="far fa-user"></i> ' + infoArticulo.autor;
      document.querySelector('.article-category').innerHTML = '<i class="far fa-folder"></i> ' + infoArticulo.categoria;
      document.querySelector('.article-image img').src = infoArticulo.imagen;
      document.querySelector('.article-content').innerHTML = infoArticulo.contenido;
      
      // Actualizar el título de la página
      document.title = infoArticulo.titulo + ' | Patitas Felices';
    }
  }
});
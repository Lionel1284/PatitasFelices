document.addEventListener('DOMContentLoaded', function() {
  // Obtener el parámetro de producto de la URL
  const urlParams = new URLSearchParams(window.location.search);
  const productoParam = urlParams.get('producto');
  
  // Si hay un parámetro de producto, cargar la información correspondiente
  if (productoParam) {
    cargarProducto(productoParam);
  }
  
  // Cambio de imágenes en la galería
  const mainImage = document.getElementById('mainProductImage');
  const thumbnails = document.querySelectorAll('.thumbnail');
  
  // Resto del código existente...
  
  // Función para cargar información del producto según el parámetro
  function cargarProducto(producto) {
    // Aquí puedes definir la información para cada producto
    const productos = {
      'alimento-premium': {
        titulo: 'Alimento Premium para Perros',
        precio: '$15.000',
        precioAnterior: '$20.000',
        descripcion: 'Nutrición balanceada de alta calidad para perros adultos de todas las razas. Formulado con ingredientes naturales, vitaminas y minerales esenciales para mantener a tu mascota saludable y llena de energía.',
        imagenes: ['img/producto1.jpg', 'img/producto1-2.jpg', 'img/producto1-3.jpg']
      },
      'collares-correas': {
        titulo: 'Collares y Correas',
        precio: '$4.000 - $9.000',
        descripcion: 'Variedad de estilos y tamaños de collares y correas de la más alta calidad para tu mascota.',
        imagenes: ['img/producto2.jpg', 'img/producto2-2.jpg', 'img/producto2-3.jpg']
      },
      // Agregar más productos según sea necesario
    };
    
    // Obtener la información del producto
    const infoProducto = productos[producto];
    
    if (infoProducto) {
      // Actualizar la página con la información del producto
      document.querySelector('.product-info h1').textContent = infoProducto.titulo;
      document.querySelector('.current-price').textContent = infoProducto.precio;
      
      if (infoProducto.precioAnterior) {
        document.querySelector('.old-price').textContent = infoProducto.precioAnterior;
      } else {
        document.querySelector('.old-price').style.display = 'none';
        document.querySelector('.discount').style.display = 'none';
      }
      
      document.querySelector('.product-description p').textContent = infoProducto.descripcion;
      
      // Actualizar imágenes
      if (infoProducto.imagenes && infoProducto.imagenes.length > 0) {
        document.getElementById('mainProductImage').src = infoProducto.imagenes[0];
        
        // Actualizar miniaturas
        const thumbnails = document.querySelectorAll('.thumbnail');
        infoProducto.imagenes.forEach((imagen, index) => {
          if (thumbnails[index]) {
            thumbnails[index].querySelector('img').src = imagen;
            thumbnails[index].setAttribute('data-image', imagen);
          }
        });
      }
    }
  }
});
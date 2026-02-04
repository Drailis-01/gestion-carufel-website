// ===================================
// CARRUSEL SIMPLE PARA PROYECTOS 2025
// ===================================

function changeSlide(button, direction) {
    const carousel = button.closest('.project-carousel');
    const slides = carousel.querySelectorAll('.slide');
    const dots = carousel.querySelectorAll('.dot');
    
    let currentIndex = 0;
    
    // Encontrar el slide activo actual
    slides.forEach((slide, index) => {
        if (slide.classList.contains('active')) {
            currentIndex = index;
        }
    });
    
    // Calcular el nuevo índice
    let newIndex = currentIndex + direction;
    
    // Circular: si llegamos al final, volver al inicio (y viceversa)
    if (newIndex >= slides.length) {
        newIndex = 0;
    } else if (newIndex < 0) {
        newIndex = slides.length - 1;
    }
    
    // Actualizar slides
    slides[currentIndex].classList.remove('active');
    slides[newIndex].classList.add('active');
    
    // Actualizar indicadores
    dots[currentIndex].classList.remove('active');
    dots[newIndex].classList.add('active');
}

function goToSlide(dot, index) {
    const carousel = dot.closest('.project-carousel');
    const slides = carousel.querySelectorAll('.slide');
    const dots = carousel.querySelectorAll('.dot');
    
    // Remover active de todos
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(d => d.classList.remove('active'));
    
    // Activar el seleccionado
    slides[index].classList.add('active');
    dots[index].classList.add('active');
}

// Soporte para navegación táctil en móviles
document.addEventListener('DOMContentLoaded', function() {
    const carousels = document.querySelectorAll('.project-carousel');
    
    carousels.forEach(carousel => {
        let touchStartX = 0;
        let touchEndX = 0;
        
        const slides = carousel.querySelector('.carousel-slides');
        
        slides.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        });
        
        slides.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe(carousel);
        });
        
        function handleSwipe(carousel) {
            const threshold = 50;
            const diff = touchStartX - touchEndX;
            
            if (Math.abs(diff) > threshold) {
                const nextBtn = carousel.querySelector('.next-btn');
                const prevBtn = carousel.querySelector('.prev-btn');
                
                if (diff > 0) {
                    // Swipe left - siguiente
                    changeSlide(nextBtn, 1);
                } else {
                    // Swipe right - anterior
                    changeSlide(prevBtn, -1);
                }
            }
        }
    });
});

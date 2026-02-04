// ===================================
// NAVEGACIÓN MÓVIL
// ===================================
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const dropdowns = document.querySelectorAll('.dropdown');
    
    // Toggle menú móvil
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            
            // Animación del icono hamburguesa
            const spans = this.querySelectorAll('span');
            if (navLinks.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translateY(10px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translateY(-10px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    }
    
    // Dropdown móvil
    dropdowns.forEach(dropdown => {
        const toggle = dropdown.querySelector('.dropdown-toggle');
        if (toggle) {
            toggle.addEventListener('click', function(e) {
                if (window.innerWidth <= 768) {
                    e.preventDefault();
                    dropdown.classList.toggle('active');
                }
            });
        }
    });
    
    // Cerrar menú al hacer clic en un enlace
    const navLinksItems = document.querySelectorAll('.nav-links a:not(.dropdown-toggle)');
    navLinksItems.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                navLinks.classList.remove('active');
                if (menuToggle) {
                    const spans = menuToggle.querySelectorAll('span');
                    spans[0].style.transform = 'none';
                    spans[1].style.opacity = '1';
                    spans[2].style.transform = 'none';
                }
            }
        });
    });
    
    // Marcar enlace activo
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    navLinksItems.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage || (currentPage === '' && linkPage === 'index.html')) {
            link.classList.add('active');
        }
    });
    
    // ===================================
    // CONTADOR AUTOMÁTICO DE ESTADÍSTICAS
    // ===================================
    const statsSection = document.querySelector('.stats-section');
    const statNumbers = document.querySelectorAll('.stat-number');
    let hasAnimated = false;

    function animateCounter(element) {
        const target = parseInt(element.getAttribute('data-target'));
        const duration = 2000; // 2 segundos
        const increment = target / (duration / 16); // 60 FPS
        let current = 0;

        const updateCounter = () => {
            current += increment;
            if (current < target) {
                element.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target;
            }
        };

        updateCounter();
    }

    // Intersection Observer para activar cuando sea visible
    if (statsSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !hasAnimated) {
                    hasAnimated = true;
                    statNumbers.forEach((stat, index) => {
                        setTimeout(() => {
                            animateCounter(stat);
                        }, index * 100); // Retraso escalonado
                    });
                }
            });
        }, {
            threshold: 0.5 // Activar cuando el 50% sea visible
        });

        observer.observe(statsSection);
    }
    
    // ===================================
    // BOTÓN BACK TO TOP
    // ===================================
    const backToTopButton = document.getElementById('backToTop');
    
    if (backToTopButton) {
        // Mostrar/ocultar botón según scroll
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTopButton.classList.add('show');
            } else {
                backToTopButton.classList.remove('show');
            }
        });
        
        // Scroll suave al hacer clic
        backToTopButton.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
});

// ===================================
// SCROLL SUAVE
// ===================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===================================
// VALIDACIÓN Y MEJORAS DEL FORMULARIO
// ===================================
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    // Añadir clase 'focused' a los form-group cuando el input tiene focus
    const formGroups = contactForm.querySelectorAll('.form-group');
    formGroups.forEach(group => {
        const input = group.querySelector('input, textarea, select');
        if (input) {
            input.addEventListener('focus', function() {
                group.classList.add('focused');
            });
            
            input.addEventListener('blur', function() {
                if (!this.value) {
                    group.classList.remove('focused');
                }
            });
            
            // Si ya tiene valor, mantener la clase focused
            if (input.value) {
                group.classList.add('focused');
            }
        }
    });

    // Validación del formulario
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        let isValid = true;
        const formMessage = document.getElementById('formMessage');
        const submitButton = contactForm.querySelector('button[type="submit"]');
        
        // Validar campos requeridos
        const name = document.getElementById('name');
        const email = document.getElementById('email');
        const phone = document.getElementById('phone');
        const service = document.getElementById('service');
        const message = document.getElementById('message');
        const privacy = document.getElementById('privacy');
        
        // Limpiar mensajes previos
        formMessage.style.display = 'none';
        formMessage.className = '';
        
        // Validar nombre
        if (!name.value.trim()) {
            isValid = false;
            name.style.borderColor = '#dc3545';
        } else {
            name.style.borderColor = '';
        }
        
        // Validar email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email.value.trim() || !emailRegex.test(email.value)) {
            isValid = false;
            email.style.borderColor = '#dc3545';
        } else {
            email.style.borderColor = '';
        }
        
        // Validar teléfono
        const phoneRegex = /^[0-9\s\-\+\(\)]+$/;
        if (!phone.value.trim() || !phoneRegex.test(phone.value)) {
            isValid = false;
            phone.style.borderColor = '#dc3545';
        } else {
            phone.style.borderColor = '';
        }
        
        // Validar servicio
        if (!service.value) {
            isValid = false;
            service.style.borderColor = '#dc3545';
        } else {
            service.style.borderColor = '';
        }
        
        // Validar mensaje
        if (!message.value.trim() || message.value.trim().length < 10) {
            isValid = false;
            message.style.borderColor = '#dc3545';
        } else {
            message.style.borderColor = '';
        }
        
        // Validar checkbox de privacidad
        if (!privacy.checked) {
            isValid = false;
            const checkboxWrapper = privacy.closest('.form-checkbox-wrapper');
            if (checkboxWrapper) {
                checkboxWrapper.style.color = '#dc3545';
            }
        } else {
            const checkboxWrapper = privacy.closest('.form-checkbox-wrapper');
            if (checkboxWrapper) {
                checkboxWrapper.style.color = '';
            }
        }
        
        if (isValid) {
            // Deshabilitar el botón de envío
            submitButton.disabled = true;
            submitButton.textContent = 'Enviando...';
            
            // Preparar los datos del formulario
            const formData = new FormData(contactForm);
            
            try {
                // Enviar los datos al servidor
                const response = await fetch('enviar-formulario.php', {
                    method: 'POST',
                    body: formData
                });
                
                const result = await response.json();
                
                if (result.success) {
                    // Mostrar mensaje de éxito
                    formMessage.innerHTML = `<div>${result.message}</div>`;
                    formMessage.className = 'success';
                    formMessage.style.display = 'flex';
                    
                    // Resetear formulario después de 2 segundos
                    setTimeout(() => {
                        contactForm.reset();
                        formGroups.forEach(group => {
                            group.classList.remove('focused');
                        });
                        formMessage.style.display = 'none';
                    }, 3000);
                } else {
                    // Mostrar mensaje de error
                    formMessage.innerHTML = `<div>${result.message}</div>`;
                    formMessage.className = 'error';
                    formMessage.style.display = 'flex';
                }
            } catch (error) {
                // Mostrar mensaje de error en caso de fallo
                formMessage.innerHTML = '<div>Hubo un error al enviar tu solicitud. Por favor, intenta de nuevo.</div>';
                formMessage.className = 'error';
                formMessage.style.display = 'flex';
            } finally {
                // Re-habilitar el botón
                submitButton.disabled = false;
                submitButton.innerHTML = '<span data-i18n="contact.form.submit">Enviar Solicitud</span><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>';
            }
            
            // Scroll al mensaje
            formMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        } else {
            // Mostrar mensaje de error
            formMessage.innerHTML = '<div>Por favor, completa todos los campos obligatorios correctamente.</div>';
            formMessage.className = 'error';
            formMessage.style.display = 'flex';
            
            // Scroll al mensaje
            formMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    });
    
    // Limpiar errores al escribir
    const inputs = contactForm.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
        input.addEventListener('input', function() {
            this.style.borderColor = '';
            const checkboxWrapper = this.closest('.form-checkbox-wrapper');
            if (checkboxWrapper) {
                checkboxWrapper.style.color = '';
            }
        });
        
        input.addEventListener('change', function() {
            this.style.borderColor = '';
        });
    });
}

// ===================================
// MANEJO DE ARCHIVOS ADJUNTOS
// ===================================
const fileInput = document.getElementById('archivos');
const fileUploadArea = document.getElementById('fileUploadArea');
const fileSelectBtn = document.getElementById('fileSelectBtn');
const fileList = document.getElementById('fileList');

if (fileInput && fileUploadArea && fileSelectBtn && fileList) {
    let selectedFiles = [];
    const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB en bytes
    const MAX_FILES = 5;
    const ALLOWED_TYPES = {
        'image/jpeg': 'JPG',
        'image/jpg': 'JPG',
        'image/png': 'PNG',
        'image/gif': 'GIF',
        'image/webp': 'WEBP',
        'application/pdf': 'PDF',
        'application/msword': 'DOC',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'DOCX',
        'application/acad': 'DWG',
        'application/x-acad': 'DWG',
        'application/autocad_dwg': 'DWG',
        'image/vnd.dwg': 'DWG',
        'image/x-dwg': 'DWG'
    };

    // Click en el botón para abrir selector de archivos
    fileSelectBtn.addEventListener('click', (e) => {
        e.preventDefault();
        fileInput.click();
    });

    // Click en toda el área para abrir selector
    fileUploadArea.addEventListener('click', (e) => {
        if (e.target !== fileSelectBtn) {
            fileInput.click();
        }
    });

    // Prevenir comportamiento por defecto en drag & drop
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        fileUploadArea.addEventListener(eventName, preventDefaults, false);
        document.body.addEventListener(eventName, preventDefaults, false);
    });

    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    // Resaltar área cuando se arrastra un archivo sobre ella
    ['dragenter', 'dragover'].forEach(eventName => {
        fileUploadArea.addEventListener(eventName, () => {
            fileUploadArea.classList.add('drag-over');
        }, false);
    });

    ['dragleave', 'drop'].forEach(eventName => {
        fileUploadArea.addEventListener(eventName, () => {
            fileUploadArea.classList.remove('drag-over');
        }, false);
    });

    // Manejar archivos soltados
    fileUploadArea.addEventListener('drop', (e) => {
        const dt = e.dataTransfer;
        const files = dt.files;
        handleFiles(files);
    }, false);

    // Manejar archivos seleccionados
    fileInput.addEventListener('change', (e) => {
        handleFiles(e.target.files);
    });

    function handleFiles(files) {
        const filesArray = Array.from(files);
        
        // Verificar número máximo de archivos
        if (selectedFiles.length + filesArray.length > MAX_FILES) {
            showFileError(`Máximo ${MAX_FILES} archivos permitidos`);
            return;
        }

        filesArray.forEach(file => {
            // Validar tipo de archivo
            if (!ALLOWED_TYPES[file.type] && !file.name.toLowerCase().endsWith('.dwg')) {
                showFileError(`Formato no permitido: ${file.name}`);
                return;
            }

            // Validar tamaño de archivo
            if (file.size > MAX_FILE_SIZE) {
                showFileError(`${file.name} es demasiado grande (máx. 10MB)`);
                return;
            }

            // Agregar archivo si no existe ya
            if (!selectedFiles.some(f => f.name === file.name && f.size === file.size)) {
                selectedFiles.push(file);
                addFileToList(file);
            }
        });

        // Limpiar input para permitir seleccionar el mismo archivo nuevamente
        fileInput.value = '';
    }

    function addFileToList(file) {
        const fileItem = document.createElement('div');
        fileItem.className = 'file-item';
        fileItem.dataset.fileName = file.name;

        const fileType = getFileType(file);
        const fileIcon = getFileIcon(fileType);
        
        fileItem.innerHTML = `
            <div class="file-item-info">
                <div class="file-item-icon">
                    ${fileIcon}
                </div>
                <div class="file-item-details">
                    <div class="file-item-name">${file.name}</div>
                    <div class="file-item-size">${formatFileSize(file.size)} - ${fileType}</div>
                </div>
            </div>
            <button type="button" class="file-item-remove" aria-label="Eliminar archivo">
                <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                </svg>
            </button>
        `;

        // Añadir evento para eliminar archivo
        const removeBtn = fileItem.querySelector('.file-item-remove');
        removeBtn.addEventListener('click', () => {
            removeFile(file.name, fileItem);
        });

        fileList.appendChild(fileItem);
    }

    function removeFile(fileName, fileItem) {
        selectedFiles = selectedFiles.filter(f => f.name !== fileName);
        fileItem.remove();
    }

    function getFileType(file) {
        if (file.type.startsWith('image/')) return 'Imagen';
        if (file.type === 'application/pdf') return 'PDF';
        if (file.type.includes('word')) return 'Documento';
        if (file.name.toLowerCase().endsWith('.dwg')) return 'Plano DWG';
        return ALLOWED_TYPES[file.type] || 'Archivo';
    }

    function getFileIcon(fileType) {
        if (fileType === 'Imagen') {
            return `<svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>
            </svg>`;
        } else if (fileType === 'PDF') {
            return `<svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M20 2H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-8.5 7.5c0 .83-.67 1.5-1.5 1.5H9v2H7.5V7H10c.83 0 1.5.67 1.5 1.5v1zm5 2c0 .83-.67 1.5-1.5 1.5h-2.5V7H15c.83 0 1.5.67 1.5 1.5v3zm4-3H19v1h1.5V11H19v2h-1.5V7h3v1.5zM9 9.5h1v-1H9v1zM4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm10 5.5h1v-3h-1v3z"/>
            </svg>`;
        } else if (fileType === 'Plano DWG') {
            return `<svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h4l3 3 3-3h4c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-7 3.5c1.84 0 3.48.96 4.34 2.5h-8.68c.86-1.54 2.5-2.5 4.34-2.5zm0 13c-1.84 0-3.48-.96-4.34-2.5h8.68c-.86 1.54-2.5 2.5-4.34 2.5z"/>
            </svg>`;
        } else {
            return `<svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/>
            </svg>`;
        }
    }

    function formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
    }

    function showFileError(message) {
        const formMessage = document.getElementById('formMessage');
        if (formMessage) {
            formMessage.textContent = message;
            formMessage.className = 'error';
            formMessage.style.display = 'block';
            
            setTimeout(() => {
                formMessage.style.display = 'none';
            }, 5000);
        }
    }

    // Limpiar archivos al resetear el formulario
    const originalReset = contactForm.reset.bind(contactForm);
    contactForm.reset = function() {
        originalReset();
        selectedFiles = [];
        fileList.innerHTML = '';
        fileInput.value = '';
    };
}

// ===================================
// ANIMACIÓN AL HACER SCROLL
// ===================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observar elementos para animación
window.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('.service-card, .feature-item, .gallery-item, .stat-item');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });
});

// ===================================
// HEADER STICKY CON SOMBRA AL SCROLL
// ===================================
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
    } else {
        header.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
    }
});

// ===================================
// FAQ ACCORDION (PREGUNTAS FRECUENTES)
// ===================================
document.addEventListener('DOMContentLoaded', function() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', function() {
            // Cerrar todos los demás items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle el item actual
            item.classList.toggle('active');
        });
    });
});

// ===================================
// GALERÍAS DE PROYECTOS 2025 CON CARRUSEL
// ===================================
document.addEventListener('DOMContentLoaded', function() {
    const galleryButtons = document.querySelectorAll('.toggle-gallery-btn');
    
    galleryButtons.forEach(button => {
        button.addEventListener('click', function() {
            const card = this.closest('.project-2025-card');
            const gallery = card.querySelector('.project-gallery');
            
            if (gallery.style.display === 'none' || gallery.style.display === '') {
                // Mostrar galería
                gallery.style.display = 'block';
                this.textContent = 'Ocultar Galería ▲';
                this.style.background = '#6b7280';
                
                // Inicializar carrusel si no está inicializado
                if (!gallery.dataset.carouselInit) {
                    initCarousel(gallery);
                    gallery.dataset.carouselInit = 'true';
                }
            } else {
                // Ocultar galería
                gallery.style.display = 'none';
                const photoCount = gallery.querySelectorAll('.carousel-slide').length;
                this.textContent = `Ver Galería de Fotos (${photoCount})`;
                // Restaurar color original del botón
                const originalColor = this.style.background;
                this.style.background = this.getAttribute('data-original-color') || 'var(--primary-color)';
            }
        });
        
        // Guardar el color original del botón
        button.setAttribute('data-original-color', button.style.background);
    });
});

function initCarousel(gallery) {
    const container = gallery.querySelector('.carousel-container');
    if (!container) return;
    
    const slides = container.querySelectorAll('.carousel-slide');
    const indicators = container.querySelectorAll('.indicator');
    const prevBtn = container.querySelector('.carousel-prev');
    const nextBtn = container.querySelector('.carousel-next');
    
    let currentIndex = 0;
    
    function showSlide(index) {
        // Asegurar que el índice esté en rango
        if (index >= slides.length) {
            currentIndex = 0;
        } else if (index < 0) {
            currentIndex = slides.length - 1;
        } else {
            currentIndex = index;
        }
        
        // Actualizar slides
        slides.forEach((slide, i) => {
            if (i === currentIndex) {
                slide.classList.add('active');
            } else {
                slide.classList.remove('active');
            }
        });
        
        // Actualizar indicadores
        indicators.forEach((indicator, i) => {
            if (i === currentIndex) {
                indicator.classList.add('active');
            } else {
                indicator.classList.remove('active');
            }
        });
    }
    
    // Navegación con botones
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            showSlide(currentIndex - 1);
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            showSlide(currentIndex + 1);
        });
    }
    
    // Navegación con indicadores
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            showSlide(index);
        });
    });
    
    // Navegación con teclado
    container.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            showSlide(currentIndex - 1);
        } else if (e.key === 'ArrowRight') {
            showSlide(currentIndex + 1);
        }
    });
    
    // Soporte para deslizar en móviles
    let touchStartX = 0;
    let touchEndX = 0;
    
    const track = container.querySelector('.carousel-track');
    if (track) {
        track.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        });
        
        track.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        });
    }
    
    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                // Deslizar a la izquierda - siguiente
                showSlide(currentIndex + 1);
            } else {
                // Deslizar a la derecha - anterior
                showSlide(currentIndex - 1);
            }
        }
    }
}

// ===================================
// SISTEMA DE TRADUCCIÓN
// ===================================
function setLanguage(lang) {
  localStorage.setItem("lang", lang);

  // Traducir elementos con data-i18n
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    if (translations[lang] && translations[lang][key]) {
      el.innerHTML = translations[lang][key];
    }
  });

  // Traducir placeholders
  document.querySelectorAll("[data-i18n-placeholder]").forEach(el => {
    const key = el.getAttribute("data-i18n-placeholder");
    if (translations[lang] && translations[lang][key]) {
      el.placeholder = translations[lang][key];
    }
  });
  
  // Actualizar selector de idioma visual
  const currentLang = document.querySelector(".current-lang");
  const currentFlag = document.querySelector(".current-flag");
  const activeBtn = document.querySelector(`.language-option[data-lang="${lang}"]`);
  
  if (currentLang) currentLang.textContent = lang.toUpperCase();
  if (currentFlag && activeBtn) currentFlag.textContent = activeBtn.dataset.flag;
  
  // Actualizar clase active en los botones
  document.querySelectorAll(".language-option").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.lang === lang);
  });
}

// Función para inicializar el sistema de traducción
function initTranslation() {
  const lang = localStorage.getItem("lang") || "es";
  setLanguage(lang);
  
  // Agregar event listeners a los botones de idioma
  document.querySelectorAll(".language-option").forEach(btn => {
    btn.addEventListener("click", () => {
      setLanguage(btn.dataset.lang);
    });
  });
}

// Ejecutar cuando el DOM esté listo
document.addEventListener("DOMContentLoaded", () => {
  // Esperar un poco para que components.js cargue el header
  setTimeout(initTranslation, 100);
});

// También ejecutar cuando se carguen los componentes
document.addEventListener("componentsLoaded", initTranslation);

// ===================================
// CARRUSEL HERO SIMPLE
// ===================================
if (document.querySelector('.hero-carousel-simple')) {
    const images = document.querySelectorAll('.hero-carousel-simple img');
    let currentIndex = 0;

    function showNextImage() {
        images[currentIndex].classList.remove('active');
        currentIndex = (currentIndex + 1) % images.length;
        images[currentIndex].classList.add('active');
    }

    setInterval(showNextImage, 4000);
}


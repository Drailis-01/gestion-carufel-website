// ===================================
// COMPONENTE HEADER COMPARTIDO
// ===================================
function loadHeader() {
    const headerHTML = `
    <header>
        <nav class="container">
            <a href="index.html" class="logo">
                <img src="color1_icon_transparent_background.png" alt="Gestion Carufel Inc.">
                <span>Gestion Carufel Inc.</span>
            </a>
            
            <ul class="nav-links">
                <li><a href="index.html" data-i18n="nav.inicio">Inicio</a></li>
                <li><a href="sobre-nosotros.html" data-i18n="nav.sobre">Sobre Nosotros</a></li>
                <li class="dropdown">
                    <a href="#" class="dropdown-toggle" data-i18n="nav.servicios">Servicios</a>
                    <div class="dropdown-menu">
                        <a href="construccion.html" data-i18n="nav.construccion">Construcción</a>
                        <a href="excavacion.html" data-i18n="nav.excavacion">Excavación</a>
                        <a href="terrassement.html" data-i18n="nav.terrassement">Terrassement</a>
                        <a href="gestion-proyectos.html" data-i18n="nav.gestion">Gestión de Proyectos</a>
                    </div>
                </li>
                <li><a href="realizaciones.html" data-i18n="nav.realizaciones">Realizaciones</a></li>
                <li><a href="contacto.html" class="btn btn-primary" data-i18n="nav.contacto">Contacto</a></li>
            </ul>
            
            <!-- Selector de Idiomas Dropdown -->
            <div class="language-selector dropdown">
                <button class="language-dropdown-btn">
                    <span class="current-flag">🇪🇸</span>
                    <span class="current-lang">ES</span>
                    <span class="dropdown-arrow">▼</span>
                </button>
                <div class="language-dropdown-menu">
                    <button class="language-option active" data-lang="es" data-flag="🇪🇸">
                        <span class="flag">🇪🇸</span>
                        <span class="lang-name">Español</span>
                    </button>
                    <button class="language-option" data-lang="fr" data-flag="🇫🇷">
                        <span class="flag">🇫🇷</span>
                        <span class="lang-name">Français</span>
                    </button>
                    <button class="language-option" data-lang="en" data-flag="🇬🇧">
                        <span class="flag">🇬🇧</span>
                        <span class="lang-name">English</span>
                    </button>
                </div>
            </div>

            <!-- Contenedor oculto para Google Translate -->
            <div id="google_translate_element" style="display: none;"></div>
            
            <button class="menu-toggle">
                <span></span>
                <span></span>
                <span></span>
            </button>
        </nav>
    </header>
    `;
    
    // Insertar el header al inicio del body
    document.body.insertAdjacentHTML('afterbegin', headerHTML);
}

// ===================================
// COMPONENTE FOOTER COMPARTIDO
// ===================================
function loadFooter() {
    const footerHTML = `
    <footer>
        <div class="container">
            <div class="footer-content">
                <div class="footer-section footer-brand">
                    <img src="white_icon_transparent_background.png" alt="Gestion Carufel Inc." class="footer-logo">
                    <h3>Gestion Carufel Inc.</h3>
                    <p data-i18n="footer.brand.tagline">Transformando ideas en estructuras sólidas desde hace más de 20 años.</p>
                    <div class="social-links">
                        <a href="https://www.facebook.com/GestionCaurfel" target="_blank" rel="noopener noreferrer" title="Facebook" aria-label="Facebook">
                            <svg viewBox="0 0 24 24" fill="currentColor">
                                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                            </svg>
                        </a>
                        <a href="#" title="Instagram" aria-label="Instagram">
                            <svg viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                            </svg>
                        </a>
                    </div>
                </div>
                
                <div class="footer-section">
                    <h3 data-i18n="footer.services.title">Servicios</h3>
                    <ul>
                        <li>
                            <a href="construccion.html">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                                    <polyline points="9 22 9 12 15 12 15 22"/>
                                </svg>
                                <span data-i18n="nav.construccion">Construcción</span>
                            </a>
                        </li>
                        <li>
                            <a href="excavacion.html">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
                                </svg>
                                <span data-i18n="nav.excavacion">Excavación</span>
                            </a>
                        </li>
                        <li>
                            <a href="terrassement.html">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
                                </svg>
                                <span data-i18n="nav.terrassement">Terrassement</span>
                            </a>
                        </li>
                        <li>
                            <a href="gestion-proyectos.html">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M9 11l3 3L22 4"/>
                                    <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
                                </svg>
                                <span data-i18n="nav.gestion">Gestión de Proyectos</span>
                            </a>
                        </li>
                    </ul>
                </div>
                
                <div class="footer-section">
                    <h3 data-i18n="footer.quicklinks">Enlaces Rápidos</h3>
                    <ul>
                        <li>
                            <a href="index.html">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                                </svg>
                                <span data-i18n="nav.inicio">Inicio</span>
                            </a>
                        </li>
                        <li>
                            <a href="sobre-nosotros.html">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                                    <circle cx="12" cy="7" r="4"/>
                                </svg>
                                <span data-i18n="nav.sobre">Sobre Nosotros</span>
                            </a>
                        </li>
                        <li>
                            <a href="realizaciones.html">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                                    <circle cx="8.5" cy="8.5" r="1.5"/>
                                    <polyline points="21 15 16 10 5 21"/>
                                </svg>
                                <span data-i18n="nav.realizaciones">Realizaciones</span>
                            </a>
                        </li>
                        <li>
                            <a href="contacto.html">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                                </svg>
                                <span data-i18n="nav.contacto">Contacto</span>
                            </a>
                        </li>
                    </ul>
                </div>
                
                <div class="footer-section">
                    <h3 data-i18n="footer.contact.title">Contacto</h3>
                    <ul class="contact-list">
                        <li>
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                                <circle cx="12" cy="10" r="3"/>
                            </svg>
                            <span data-i18n="footer.address">Dirección del Proyecto</span>
                        </li>
                        <li>
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                            </svg>
                            <a href="tel:+14509323608" data-i18n="footer.phone">450-932-3608</a>
                        </li>
                        <li>
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                                <polyline points="22,6 12,13 2,6"/>
                            </svg>
                            <span>info@gestioncarufel.com</span>
                        </li>
                        <li>
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <circle cx="12" cy="12" r="10"/>
                                <polyline points="12 6 12 12 16 14"/>
                            </svg>
                            <span data-i18n="footer.schedule">Lun - Vie: 8:00 - 18:00</span>
                        </li>
                    </ul>
                </div>
            </div>
            
            <div class="footer-bottom">
                <p>&copy; 2024 Gestion Carufel Inc. <span data-i18n="footer.rights">Todos los derechos reservados.</span></p>
            </div>
        </div>
    </footer>
    `;
    
    document.body.insertAdjacentHTML('beforeend', footerHTML);
}

// ===================================
// CARGAR COMPONENTES AL INICIO
// ===================================
document.addEventListener('DOMContentLoaded', function() {
    // Cargar header y footer
    loadHeader();
    loadFooter();
    
    // Disparar evento personalizado cuando los componentes estén cargados
    setTimeout(() => {
        const event = new Event('componentsLoaded');
        document.dispatchEvent(event);
        console.log('✅ Components loaded event dispatched');
    }, 50);
});

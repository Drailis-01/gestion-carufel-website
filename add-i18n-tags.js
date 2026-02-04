#!/usr/bin/env node

/**
 * Script automatizado para agregar etiquetas data-i18n a las páginas de servicios
 * Gestion Carufel Inc. - Sistema de traducción multilingüe
 */

const fs = require('fs');
const path = require('path');

// Configuración de archivos a procesar
const files = [
    'construccion.html',
    'excavacion.html',
    'terrassement.html',
    'gestion-proyectos.html'
];

// Patrones de reemplazo para construccion.html
const construccionPatterns = [
    // Materiales
    { search: /<h3 style="margin-bottom: 1rem; color: var\(--gray-dark\);">Concreto de Alta Resistencia<\/h3>/g, 
      replace: '<h3 style="margin-bottom: 1rem; color: var(--gray-dark);" data-i18n="construction.materials.concrete.title">Concreto de Alta Resistencia</h3>' },
    
    { search: /<p style="color: var\(--gray-medium\); line-height: 1\.8;">[\s\n]*Utilizamos mezclas especializadas de concreto con aditivos de última generación para garantizar durabilidad y resistencia superior en todas las estructuras\./g,
      replace: '<p style="color: var(--gray-medium); line-height: 1.8;" data-i18n="construction.materials.concrete.desc">Utilizamos mezclas especializadas de concreto con aditivos de última generación para garantizar durabilidad y resistencia superior en todas las estructuras.' },
    
    { search: /<h3 style="margin-bottom: 1rem; color: var\(--gray-dark\);">Acero Estructural Certificado<\/h3>/g,
      replace: '<h3 style="margin-bottom: 1rem; color: var(--gray-dark);" data-i18n="construction.materials.steel.title">Acero Estructural Certificado</h3>' },
    
    { search: /<p style="color: var\(--gray-medium\); line-height: 1\.8;">[\s\n]*Refuerzos de acero grado 60 y vigas estructurales certificadas que cumplen con las normativas más estrictas de seguridad y construcción\./g,
      replace: '<p style="color: var(--gray-medium); line-height: 1.8;" data-i18n="construction.materials.steel.desc">Refuerzos de acero grado 60 y vigas estructurales certificadas que cumplen con las normativas más estrictas de seguridad y construcción.' },
    
    { search: /<h3 style="margin-bottom: 1rem; color: var\(--gray-dark\);">Aislamiento Térmico Avanzado<\/h3>/g,
      replace: '<h3 style="margin-bottom: 1rem; color: var(--gray-dark);" data-i18n="construction.materials.insulation.title">Aislamiento Térmico Avanzado</h3>' },
    
    { search: /<h3 style="margin-bottom: 1rem; color: var\(--gray-dark\);">Impermeabilización Premium<\/h3>/g,
      replace: '<h3 style="margin-bottom: 1rem; color: var(--gray-dark);" data-i18n="construction.materials.waterproof.title">Impermeabilización Premium</h3>' },
    
    { search: /<h3 style="margin-bottom: 1rem; color: var\(--gray-dark\);">Acabados de Diseño<\/h3>/g,
      replace: '<h3 style="margin-bottom: 1rem; color: var(--gray-dark);" data-i18n="construction.materials.finishes.title">Acabados de Diseño</h3>' },
    
    { search: /<h3 style="margin-bottom: 1rem; color: var\(--gray-dark\);">Ventanas y Puertas Eficientes<\/h3>/g,
      replace: '<h3 style="margin-bottom: 1rem; color: var(--gray-dark);" data-i18n="construction.materials.windows.title">Ventanas y Puertas Eficientes</h3>' },
    
    // Sección de materiales
    { search: /<p class="subtitle">Materiales Premium<\/p>/g,
      replace: '<p class="subtitle" data-i18n="construction.materials.subtitle">Materiales Premium</p>' },
    
    { search: /<h2>Trabajamos con los Mejores Materiales del Mercado<\/h2>/g,
      replace: '<h2 data-i18n="construction.materials.title">Trabajamos con los Mejores Materiales del Mercado</h2>' },
    
    // Certificaciones
    { search: /<p class="subtitle">Cumplimiento y Certificaciones<\/p>/g,
      replace: '<p class="subtitle" data-i18n="construction.certifications.subtitle">Cumplimiento y Certificaciones</p>' },
    
    { search: /<h2>Construimos Según los Más Altos Estándares<\/h2>/g,
      replace: '<h2 data-i18n="construction.certifications.title">Construimos Según los Más Altos Estándares</h2>' },
    
    { search: /<h4 style="margin-bottom: 0\.5rem;">CCQ - RBQ<\/h4>/g,
      replace: '<h4 style="margin-bottom: 0.5rem;" data-i18n="construction.certifications.ccq">CCQ - RBQ</h4>' },
    
    { search: /<p style="color: var\(--gray-medium\); font-size: 0\.95rem;">Licencia de Constructor válida en Quebec<\/p>/g,
      replace: '<p style="color: var(--gray-medium); font-size: 0.95rem;" data-i18n="construction.certifications.ccq.desc">Licencia de Constructor válida en Quebec</p>' },
    
    { search: /<h4 style="margin-bottom: 0\.5rem;">LEED<\/h4>/g,
      replace: '<h4 style="margin-bottom: 0.5rem;" data-i18n="construction.certifications.leed">LEED</h4>' },
    
    { search: /<p style="color: var\(--gray-medium\); font-size: 0\.95rem;">Construcción sustentable certificada<\/p>/g,
      replace: '<p style="color: var(--gray-medium); font-size: 0.95rem;" data-i18n="construction.certifications.leed.desc">Construcción sustentable certificada</p>' },
    
    { search: /<h4 style="margin-bottom: 0\.5rem;">APCHQ<\/h4>/g,
      replace: '<h4 style="margin-bottom: 0.5rem;" data-i18n="construction.certifications.apchq">APCHQ</h4>' },
    
    { search: /<p style="color: var\(--gray-medium\); font-size: 0\.95rem;">Asociación de Constructores de Quebec<\/p>/g,
      replace: '<p style="color: var(--gray-medium); font-size: 0.95rem;" data-i18n="construction.certifications.apchq.desc">Asociación de Constructores de Quebec</p>' },
    
    { search: /<h4 style="margin-bottom: 0\.5rem;">Code du bâtiment<\/h4>/g,
      replace: '<h4 style="margin-bottom: 0.5rem;" data-i18n="construction.certifications.code">Code du bâtiment</h4>' },
    
    { search: /<p style="color: var\(--gray-medium\); font-size: 0\.95rem;">100% conforme al Código Nacional<\/p>/g,
      replace: '<p style="color: var(--gray-medium); font-size: 0.95rem;" data-i18n="construction.certifications.code.desc">100% conforme al Código Nacional</p>' },
    
    { search: /<h3 style="color: var\(--white\); margin-bottom: 1rem; font-size: 1\.8rem;">Seguros y Responsabilidad<\/h3>/g,
      replace: '<h3 style="color: var(--white); margin-bottom: 1rem; font-size: 1.8rem;" data-i18n="construction.certifications.insurance.title">Seguros y Responsabilidad</h3>' },
    
    // Ventajas
    { search: /<p class="subtitle">Ventajas Competitivas<\/p>/g,
      replace: '<p class="subtitle" data-i18n="construction.advantages.subtitle">Ventajas Competitivas</p>' },
    
    { search: /<h2>¿Por Qué Elegir Nuestros Servicios de Construcción\?<\/h2>/g,
      replace: '<h2 data-i18n="construction.advantages.title">¿Por Qué Elegir Nuestros Servicios de Construcción?</h2>' },
    
    { search: /<h4>Entrega a Tiempo<\/h4>/g,
      replace: '<h4 data-i18n="construction.advantages.ontime">Entrega a Tiempo</h4>' },
    
    { search: /<p>97% de nuestros proyectos se entregan en el plazo acordado o antes<\/p>/g,
      replace: '<p data-i18n="construction.advantages.ontime.desc">97% de nuestros proyectos se entregan en el plazo acordado o antes</p>' },
    
    { search: /<h4>Presupuesto Transparente<\/h4>/g,
      replace: '<h4 data-i18n="construction.advantages.budget">Presupuesto Transparente</h4>' },
    
    { search: /<p>Cotizaciones detalladas sin costos ocultos ni sorpresas<\/p>/g,
      replace: '<p data-i18n="construction.advantages.budget.desc">Cotizaciones detalladas sin costos ocultos ni sorpresas</p>' },
    
    { search: /<h4>Calidad Certificada<\/h4>/g,
      replace: '<h4 data-i18n="construction.advantages.certquality">Calidad Certificada</h4>' },
    
    { search: /<p>Materiales premium y técnicas de construcción de vanguardia<\/p>/g,
      replace: '<p data-i18n="construction.advantages.certquality.desc">Materiales premium y técnicas de construcción de vanguardia</p>' },
    
    { search: /<h4>Comunicación Constante<\/h4>/g,
      replace: '<h4 data-i18n="construction.advantages.communication">Comunicación Constante</h4>' },
    
    { search: /<p>Actualizaciones regulares sobre el progreso de tu proyecto<\/p>/g,
      replace: '<p data-i18n="construction.advantages.communication.desc">Actualizaciones regulares sobre el progreso de tu proyecto</p>' },
    
    { search: /<h4>Diseño Personalizado<\/h4>/g,
      replace: '<h4 data-i18n="construction.advantages.custom">Diseño Personalizado</h4>' },
    
    { search: /<p>Adaptamos cada proyecto a tus necesidades específicas<\/p>/g,
      replace: '<p data-i18n="construction.advantages.custom.desc">Adaptamos cada proyecto a tus necesidades específicas</p>' },
    
    { search: /<h4>Garantía Post-Construcción<\/h4>/g,
      replace: '<h4 data-i18n="construction.advantages.postwarranty">Garantía Post-Construcción</h4>' },
    
    { search: /<p>Respaldo continuo después de la entrega del proyecto<\/p>/g,
      replace: '<p data-i18n="construction.advantages.postwarranty.desc">Respaldo continuo después de la entrega del proyecto</p>' },
    
    // FAQ
    { search: /<p class="subtitle">FAQ<\/p>/g,
      replace: '<p class="subtitle" data-i18n="construction.faq.subtitle">FAQ</p>' },
    
    { search: /<h2>Preguntas Frecuentes sobre Construcción<\/h2>/g,
      replace: '<h2 data-i18n="construction.faq.title">Preguntas Frecuentes sobre Construcción</h2>' },
    
    { search: /<h3 style="font-size: 1\.1rem; color: var\(--gray-dark\); margin: 0;">¿Cuánto tiempo toma construir una casa\?<\/h3>/g,
      replace: '<h3 style="font-size: 1.1rem; color: var(--gray-dark); margin: 0;" data-i18n="construction.faq.q1">¿Cuánto tiempo toma construir una casa?</h3>' },
    
    { search: /<h3 style="font-size: 1\.1rem; color: var\(--gray-dark\); margin: 0;">¿Ofrecen financiamiento o planes de pago\?<\/h3>/g,
      replace: '<h3 style="font-size: 1.1rem; color: var(--gray-dark); margin: 0;" data-i18n="construction.faq.q2">¿Ofrecen financiamiento o planes de pago?</h3>' },
    
    { search: /<h3 style="font-size: 1\.1rem; color: var\(--gray-dark\); margin: 0;">¿Puedo hacer cambios durante la construcción\?<\/h3>/g,
      replace: '<h3 style="font-size: 1.1rem; color: var(--gray-dark); margin: 0;" data-i18n="construction.faq.q3">¿Puedo hacer cambios durante la construcción?</h3>' },
    
    { search: /<h3 style="font-size: 1\.1rem; color: var\(--gray-dark\); margin: 0;">¿Qué garantías ofrecen en sus construcciones\?<\/h3>/g,
      replace: '<h3 style="font-size: 1.1rem; color: var(--gray-dark); margin: 0;" data-i18n="construction.faq.q4">¿Qué garantías ofrecen en sus construcciones?</h3>' },
    
    { search: /<h3 style="font-size: 1\.1rem; color: var\(--gray-dark\); margin: 0;">¿Se encargan de obtener los permisos de construcción\?<\/h3>/g,
      replace: '<h3 style="font-size: 1.1rem; color: var(--gray-dark); margin: 0;" data-i18n="construction.faq.q5">¿Se encargan de obtener los permisos de construcción?</h3>' },
    
    { search: /<h3 style="font-size: 1\.1rem; color: var\(--gray-dark\); margin: 0;">¿Cómo manejan los imprevistos durante la construcción\?<\/h3>/g,
      replace: '<h3 style="font-size: 1.1rem; color: var(--gray-dark); margin: 0;" data-i18n="construction.faq.q6">¿Cómo manejan los imprevistos durante la construcción?</h3>' },
    
    { search: /<h3 style="font-size: 1\.1rem; color: var\(--gray-dark\); margin: 0;">¿Construyen proyectos ecológicos o sustentables\?<\/h3>/g,
      replace: '<h3 style="font-size: 1.1rem; color: var(--gray-dark); margin: 0;" data-i18n="construction.faq.q7">¿Construyen proyectos ecológicos o sustentables?</h3>' },
    
    { search: /<h3 style="font-size: 1\.1rem; color: var\(--gray-dark\); margin: 0;">¿Puedo visitar la obra durante la construcción\?<\/h3>/g,
      replace: '<h3 style="font-size: 1.1rem; color: var(--gray-dark); margin: 0;" data-i18n="construction.faq.q8">¿Puedo visitar la obra durante la construcción?</h3>' },
    
    // CTA Final
    { search: /<h2 style="margin-bottom: 1rem;">¿Listo para Comenzar tu Proyecto de Construcción\?<\/h2>/g,
      replace: '<h2 style="margin-bottom: 1rem;" data-i18n="construction.cta.title">¿Listo para Comenzar tu Proyecto de Construcción?</h2>' },
    
    { search: /<p style="font-size: 1\.2rem; color: var\(--gray-medium\); margin-bottom: 2rem;">[\s\n]*Solicita una cotización gratuita y sin compromiso/g,
      replace: '<p style="font-size: 1.2rem; color: var(--gray-medium); margin-bottom: 2rem;" data-i18n="construction.cta.subtitle">Solicita una cotización gratuita y sin compromiso' },
    
    { search: /<a href="contacto\.html" class="btn btn-primary" style="font-size: 1\.1rem; padding: 1rem 3rem;">[\s\n]*Solicitar Cotización/g,
      replace: '<a href="contacto.html" class="btn btn-primary" style="font-size: 1.1rem; padding: 1rem 3rem;" data-i18n="common.cta.quote">Solicitar Cotización' },
    
    { search: /<a href="realizaciones\.html" class="btn btn-outline" style="font-size: 1\.1rem; padding: 1rem 3rem;">[\s\n]*Ver Proyectos/g,
      replace: '<a href="realizaciones.html" class="btn btn-outline" style="font-size: 1.1rem; padding: 1rem 3rem;" data-i18n="common.cta.projects">Ver Proyectos' },
    
    // Garantía extendida en servicios incluidos
    { search: /<h4>Garantía Extendida<\/h4>/g,
      replace: '<h4 data-i18n="construction.included.warranty">Garantía Extendida</h4>' },
    
    { search: /<p>Respaldo y garantía en todos nuestros trabajos<\/p>/g,
      replace: '<p data-i18n="construction.included.warranty.desc">Respaldo y garantía en todos nuestros trabajos</p>' }
];

console.log('🚀 Iniciando proceso de etiquetado automático...\n');

let totalChanges = 0;

// Procesar construccion.html
console.log('📄 Procesando construccion.html...');
try {
    const filePath = path.join(__dirname, 'construccion.html');
    let content = fs.readFileSync(filePath, 'utf8');
    let changesInFile = 0;
    
    construccionPatterns.forEach((pattern, index) => {
        const beforeLength = content.length;
        content = content.replace(pattern.search, pattern.replace);
        if (content.length !== beforeLength) {
            changesInFile++;
            totalChanges++;
        }
    });
    
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`   ✅ ${changesInFile} cambios aplicados`);
} catch (error) {
    console.error(`   ❌ Error: ${error.message}`);
}

console.log(`\n✨ Proceso completado!`);
console.log(`📊 Total de cambios realizados: ${totalChanges}`);
console.log(`\n💡 Nota: Este es un proceso por etapas. Ejecuta el script múltiples veces si es necesario.`);
console.log(`\nPróximos pasos:`);
console.log(`1. Verificar los cambios en construccion.html`);
console.log(`2. Probar el sitio con el selector de idiomas`);
console.log(`3. Continuar con las otras páginas si todo funciona correctamente`);

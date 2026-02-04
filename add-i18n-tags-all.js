#!/usr/bin/env node

/**
 * Script automatizado COMPLETO para agregar etiquetas data-i18n a TODAS las páginas de servicios
 * Gestion Carufel Inc. - Sistema de traducción multilingüe
 * Versión: 2.0 - Procesamiento múltiple con reportes detallados
 */

const fs = require('fs');
const path = require('path');

// Configuración de archivos a procesar
const filesToProcess = [
    'construccion.html',
    'excavacion.html',
    'terrassement.html',
    'gestion-proyectos.html'
];

// Reporte global
const globalReport = {
    totalChanges: 0,
    totalFiles: 0,
    successFiles: 0,
    errorFiles: 0,
    fileDetails: {}
};

console.log('🚀 INICIANDO PROCESAMIENTO MASIVO DE PÁGINAS DE SERVICIOS');
console.log('=' .repeat(80));

// Patrones universales (aplicables a todas las páginas)
const universalPatterns = [
    // Botones CTA comunes
    { search: /<a href="#contacto" class="cta-button">Solicitar Cotización Gratuita<\/a>/g,
      replace: '<a href="#contacto" class="cta-button" data-i18n="cta.quote">Solicitar Cotización Gratuita</a>',
      description: 'CTA - Solicitar Cotización' },
    
    { search: /<a href="#contacto" class="cta-button-secondary">Hablar con un Experto<\/a>/g,
      replace: '<a href="#contacto" class="cta-button-secondary" data-i18n="cta.expert">Hablar con un Experto</a>',
      description: 'CTA - Hablar con Experto' },
    
    { search: /<a href="#contacto" class="cta-button">Contáctanos Hoy<\/a>/g,
      replace: '<a href="#contacto" class="cta-button" data-i18n="cta.contact">Contáctanos Hoy</a>',
      description: 'CTA - Contáctanos' },
    
    // FAQ común
    { search: /<p class="subtitle">Preguntas Frecuentes<\/p>/g,
      replace: '<p class="subtitle" data-i18n="faq.subtitle">Preguntas Frecuentes</p>',
      description: 'FAQ - Subtítulo' },
    
    { search: /<h2>Respuestas a tus Dudas<\/h2>/g,
      replace: '<h2 data-i18n="faq.title">Respuestas a tus Dudas</h2>',
      description: 'FAQ - Título' },
];

// Patrones específicos para construccion.html
const construccionPatterns = [
    // Hero section
    { search: /<h1>Construcción de Estructuras de Alta Calidad<\/h1>/g,
      replace: '<h1 data-i18n="construction.hero.title">Construcción de Estructuras de Alta Calidad</h1>',
      description: 'Hero - Título principal' },
    
    { search: /<p class="hero-subtitle">Edificación profesional de cimientos, muros, losas y estructuras completas con acabados de primer nivel\.<\/p>/g,
      replace: '<p class="hero-subtitle" data-i18n="construction.hero.subtitle">Edificación profesional de cimientos, muros, losas y estructuras completas con acabados de primer nivel.</p>',
      description: 'Hero - Subtítulo' },
    
    // Intro
    { search: /<p class="subtitle">Construcción Profesional<\/p>/g,
      replace: '<p class="subtitle" data-i18n="construction.intro.subtitle">Construcción Profesional</p>',
      description: 'Intro - Subtítulo' },
    
    { search: /<h2>Edificamos tu Proyecto con Excelencia<\/h2>/g,
      replace: '<h2 data-i18n="construction.intro.title">Edificamos tu Proyecto con Excelencia</h2>',
      description: 'Intro - Título' },
    
    // Materiales
    { search: /<p class="subtitle">Materiales Premium<\/p>/g,
      replace: '<p class="subtitle" data-i18n="construction.materials.subtitle">Materiales Premium</p>',
      description: 'Materiales - Subtítulo' },
    
    { search: /<h2>Trabajamos con los Mejores Materiales del Mercado<\/h2>/g,
      replace: '<h2 data-i18n="construction.materials.title">Trabajamos con los Mejores Materiales del Mercado</h2>',
      description: 'Materiales - Título' },
    
    // Materiales individuales
    { search: /<h3 style="margin-bottom: 1rem; color: var\(--gray-dark\);">Concreto de Alta Resistencia<\/h3>/g,
      replace: '<h3 style="margin-bottom: 1rem; color: var(--gray-dark);" data-i18n="construction.materials.concrete.title">Concreto de Alta Resistencia</h3>',
      description: 'Material - Concreto título' },
    
    { search: /<h3 style="margin-bottom: 1rem; color: var\(--gray-dark\);">Acero Estructural Certificado<\/h3>/g,
      replace: '<h3 style="margin-bottom: 1rem; color: var(--gray-dark);" data-i18n="construction.materials.steel.title">Acero Estructural Certificado</h3>',
      description: 'Material - Acero título' },
    
    { search: /<h3 style="margin-bottom: 1rem; color: var\(--gray-dark\);">Aislamiento Térmico Avanzado<\/h3>/g,
      replace: '<h3 style="margin-bottom: 1rem; color: var(--gray-dark);" data-i18n="construction.materials.insulation.title">Aislamiento Térmico Avanzado</h3>',
      description: 'Material - Aislamiento título' },
    
    { search: /<h3 style="margin-bottom: 1rem; color: var\(--gray-dark\);">Impermeabilización Premium<\/h3>/g,
      replace: '<h3 style="margin-bottom: 1rem; color: var(--gray-dark);" data-i18n="construction.materials.waterproof.title">Impermeabilización Premium</h3>',
      description: 'Material - Impermeabilización título' },
    
    { search: /<h3 style="margin-bottom: 1rem; color: var\(--gray-dark\);">Acabados de Diseño<\/h3>/g,
      replace: '<h3 style="margin-bottom: 1rem; color: var(--gray-dark);" data-i18n="construction.materials.finishes.title">Acabados de Diseño</h3>',
      description: 'Material - Acabados título' },
    
    { search: /<h3 style="margin-bottom: 1rem; color: var\(--gray-dark\);">Ventanas y Puertas Eficientes<\/h3>/g,
      replace: '<h3 style="margin-bottom: 1rem; color: var(--gray-dark);" data-i18n="construction.materials.windows.title">Ventanas y Puertas Eficientes</h3>',
      description: 'Material - Ventanas título' },
    
    // Certificaciones
    { search: /<p class="subtitle">Certificaciones y Garantías<\/p>/g,
      replace: '<p class="subtitle" data-i18n="construction.certifications.subtitle">Certificaciones y Garantías</p>',
      description: 'Certificaciones - Subtítulo' },
    
    { search: /<h2>Respaldo Profesional para tu Tranquilidad<\/h2>/g,
      replace: '<h2 data-i18n="construction.certifications.title">Respaldo Profesional para tu Tranquilidad</h2>',
      description: 'Certificaciones - Título' },
    
    // Ventajas
    { search: /<p class="subtitle">Nuestras Ventajas<\/p>/g,
      replace: '<p class="subtitle" data-i18n="construction.advantages.subtitle">Nuestras Ventajas</p>',
      description: 'Ventajas - Subtítulo' },
    
    { search: /<h2>Por Qué Elegirnos para tu Proyecto<\/h2>/g,
      replace: '<h2 data-i18n="construction.advantages.title">Por Qué Elegirnos para tu Proyecto</h2>',
      description: 'Ventajas - Título' },
];

// Patrones específicos para excavacion.html
const excavacionPatterns = [
    { search: /<h1>Excavación y Movimiento de Tierra Profesional<\/h1>/g,
      replace: '<h1 data-i18n="excavation.hero.title">Excavación y Movimiento de Tierra Profesional</h1>',
      description: 'Hero - Título principal' },
    
    { search: /<p class="hero-subtitle">Preparación experta del terreno para cimientos sólidos y proyectos exitosos\.<\/p>/g,
      replace: '<p class="hero-subtitle" data-i18n="excavation.hero.subtitle">Preparación experta del terreno para cimientos sólidos y proyectos exitosos.</p>',
      description: 'Hero - Subtítulo' },
    
    { search: /<p class="subtitle">Excavación Especializada<\/p>/g,
      replace: '<p class="subtitle" data-i18n="excavation.intro.subtitle">Excavación Especializada</p>',
      description: 'Intro - Subtítulo' },
    
    { search: /<h2>Preparamos el Terreno para tu Éxito<\/h2>/g,
      replace: '<h2 data-i18n="excavation.intro.title">Preparamos el Terreno para tu Éxito</h2>',
      description: 'Intro - Título' },
    
    { search: /<p class="subtitle">Equipo Especializado<\/p>/g,
      replace: '<p class="subtitle" data-i18n="excavation.equipment.subtitle">Equipo Especializado</p>',
      description: 'Equipo - Subtítulo' },
    
    { search: /<h2>Maquinaria de Última Generación<\/h2>/g,
      replace: '<h2 data-i18n="excavation.equipment.title">Maquinaria de Última Generación</h2>',
      description: 'Equipo - Título' },
    
    { search: /<p class="subtitle">Nuestros Beneficios<\/p>/g,
      replace: '<p class="subtitle" data-i18n="excavation.benefits.subtitle">Nuestros Beneficios</p>',
      description: 'Beneficios - Subtítulo' },
    
    { search: /<h2>Ventajas de Trabajar con Nosotros<\/h2>/g,
      replace: '<h2 data-i18n="excavation.benefits.title">Ventajas de Trabajar con Nosotros</h2>',
      description: 'Beneficios - Título' },
];

// Patrones específicos para terrassement.html
const terrassementPatterns = [
    { search: /<h1>Terrassement et Nivellement de Terrain<\/h1>/g,
      replace: '<h1 data-i18n="terrassement.hero.title">Terrassement et Nivellement de Terrain</h1>',
      description: 'Hero - Título principal' },
    
    { search: /<p class="hero-subtitle">Préparation professionnelle de terrain pour fondations solides et drainage optimal\.<\/p>/g,
      replace: '<p class="hero-subtitle" data-i18n="terrassement.hero.subtitle">Préparation professionnelle de terrain pour fondations solides et drainage optimal.</p>',
      description: 'Hero - Subtítulo' },
    
    { search: /<p class="subtitle">Terrassement Professionnel<\/p>/g,
      replace: '<p class="subtitle" data-i18n="terrassement.intro.subtitle">Terrassement Professionnel</p>',
      description: 'Intro - Subtítulo' },
    
    { search: /<h2>Expertise en Préparation de Terrain<\/h2>/g,
      replace: '<h2 data-i18n="terrassement.intro.title">Expertise en Préparation de Terrain</h2>',
      description: 'Intro - Título' },
    
    { search: /<p class="subtitle">Nos Services<\/p>/g,
      replace: '<p class="subtitle" data-i18n="terrassement.services.subtitle">Nos Services</p>',
      description: 'Servicios - Subtítulo' },
    
    { search: /<h2>Solutions Complètes de Terrassement<\/h2>/g,
      replace: '<h2 data-i18n="terrassement.services.title">Solutions Complètes de Terrassement</h2>',
      description: 'Servicios - Título' },
    
    { search: /<p class="subtitle">Équipement Moderne<\/p>/g,
      replace: '<p class="subtitle" data-i18n="terrassement.equipment.subtitle">Équipement Moderne</p>',
      description: 'Equipo - Subtítulo' },
    
    { search: /<h2>Machinerie de Pointe<\/h2>/g,
      replace: '<h2 data-i18n="terrassement.equipment.title">Machinerie de Pointe</h2>',
      description: 'Equipo - Título' },
];

// Patrones específicos para gestion-proyectos.html
const gestionPatterns = [
    { search: /<h1>Gestión Integral de Proyectos de Construcción<\/h1>/g,
      replace: '<h1 data-i18n="management.hero.title">Gestión Integral de Proyectos de Construcción</h1>',
      description: 'Hero - Título principal' },
    
    { search: /<p class="hero-subtitle">Coordinación experta de todas las fases de tu proyecto desde el diseño hasta la entrega final\.<\/p>/g,
      replace: '<p class="hero-subtitle" data-i18n="management.hero.subtitle">Coordinación experta de todas las fases de tu proyecto desde el diseño hasta la entrega final.</p>',
      description: 'Hero - Subtítulo' },
    
    { search: /<p class="subtitle">Gestión Profesional<\/p>/g,
      replace: '<p class="subtitle" data-i18n="management.intro.subtitle">Gestión Profesional</p>',
      description: 'Intro - Subtítulo' },
    
    { search: /<h2>Lideramos tu Proyecto hacia el Éxito<\/h2>/g,
      replace: '<h2 data-i18n="management.intro.title">Lideramos tu Proyecto hacia el Éxito</h2>',
      description: 'Intro - Título' },
    
    { search: /<p class="subtitle">Nuestro Proceso<\/p>/g,
      replace: '<p class="subtitle" data-i18n="management.process.subtitle">Nuestro Proceso</p>',
      description: 'Proceso - Subtítulo' },
    
    { search: /<h2>Metodología Probada de Gestión<\/h2>/g,
      replace: '<h2 data-i18n="management.process.title">Metodología Probada de Gestión</h2>',
      description: 'Proceso - Título' },
    
    { search: /<p class="subtitle">Servicios Incluidos<\/p>/g,
      replace: '<p class="subtitle" data-i18n="management.included.subtitle">Servicios Incluidos</p>',
      description: 'Incluidos - Subtítulo' },
    
    { search: /<h2>Todo lo que Necesitas en un Solo Lugar<\/h2>/g,
      replace: '<h2 data-i18n="management.included.title">Todo lo que Necesitas en un Solo Lugar</h2>',
      description: 'Incluidos - Título' },
];

// Función para aplicar patrones a un archivo
function processFile(fileName, specificPatterns) {
    const filePath = path.join(__dirname, fileName);
    
    console.log(`\n📄 Procesando: ${fileName}`);
    console.log('-'.repeat(80));
    
    const fileReport = {
        fileName: fileName,
        changes: [],
        totalChanges: 0,
        success: false,
        error: null
    };
    
    try {
        // Leer contenido
        if (!fs.existsSync(filePath)) {
            throw new Error(`Archivo no encontrado: ${fileName}`);
        }
        
        let content = fs.readFileSync(filePath, 'utf8');
        const originalContent = content;
        
        // Combinar patrones universales con específicos
        const allPatterns = [...universalPatterns, ...specificPatterns];
        
        // Aplicar cada patrón
        allPatterns.forEach((pattern, index) => {
            const matches = content.match(pattern.search);
            if (matches) {
                content = content.replace(pattern.search, pattern.replace);
                const changeInfo = {
                    pattern: pattern.description || `Patrón ${index + 1}`,
                    occurrences: matches.length
                };
                fileReport.changes.push(changeInfo);
                fileReport.totalChanges += matches.length;
                console.log(`   ✓ ${pattern.description}: ${matches.length} cambio(s)`);
            }
        });
        
        // Guardar si hubo cambios
        if (content !== originalContent) {
            fs.writeFileSync(filePath, content, 'utf8');
            fileReport.success = true;
            console.log(`\n   ✅ Archivo actualizado: ${fileReport.totalChanges} cambios totales`);
        } else {
            fileReport.success = true;
            console.log(`\n   ℹ️  No se encontraron coincidencias para actualizar`);
        }
        
        globalReport.successFiles++;
        
    } catch (error) {
        fileReport.error = error.message;
        globalReport.errorFiles++;
        console.error(`\n   ❌ Error: ${error.message}`);
    }
    
    globalReport.fileDetails[fileName] = fileReport;
    globalReport.totalChanges += fileReport.totalChanges;
    
    return fileReport;
}

// Procesar todos los archivos
console.log(`\n📋 Archivos a procesar: ${filesToProcess.length}`);
console.log('='.repeat(80));

filesToProcess.forEach(fileName => {
    globalReport.totalFiles++;
    
    // Seleccionar patrones específicos según el archivo
    let specificPatterns = [];
    if (fileName === 'construccion.html') {
        specificPatterns = construccionPatterns;
    } else if (fileName === 'excavacion.html') {
        specificPatterns = excavacionPatterns;
    } else if (fileName === 'terrassement.html') {
        specificPatterns = terrassementPatterns;
    } else if (fileName === 'gestion-proyectos.html') {
        specificPatterns = gestionPatterns;
    }
    
    processFile(fileName, specificPatterns);
});

// Generar reporte final
console.log('\n');
console.log('='.repeat(80));
console.log('📊 REPORTE FINAL DE PROCESAMIENTO');
console.log('='.repeat(80));
console.log(`\n📈 Estadísticas Globales:`);
console.log(`   • Total de archivos procesados: ${globalReport.totalFiles}`);
console.log(`   • Archivos exitosos: ${globalReport.successFiles}`);
console.log(`   • Archivos con errores: ${globalReport.errorFiles}`);
console.log(`   • Total de cambios realizados: ${globalReport.totalChanges}`);

console.log(`\n📝 Detalle por archivo:`);
Object.keys(globalReport.fileDetails).forEach(fileName => {
    const details = globalReport.fileDetails[fileName];
    console.log(`\n   ${fileName}:`);
    console.log(`   └─ Cambios: ${details.totalChanges}`);
    console.log(`   └─ Estado: ${details.success ? '✅ Exitoso' : '❌ Error'}`);
    if (details.error) {
        console.log(`   └─ Error: ${details.error}`);
    }
    if (details.changes.length > 0) {
        console.log(`   └─ Tipos de cambios:`);
        details.changes.forEach(change => {
            console.log(`      • ${change.pattern}: ${change.occurrences} ocurrencia(s)`);
        });
    }
});

// Guardar reporte en JSON
const reportPath = path.join(__dirname, 'i18n-processing-report.json');
fs.writeFileSync(reportPath, JSON.stringify(globalReport, null, 2), 'utf8');
console.log(`\n💾 Reporte detallado guardado en: i18n-processing-report.json`);

// Sugerencias finales
console.log(`\n✨ PROCESO COMPLETADO!`);
console.log(`\n🎯 Próximos pasos recomendados:`);
console.log(`   1. Revisar los archivos modificados en tu editor`);
console.log(`   2. Abrir cada página en el navegador y probar el selector de idiomas`);
console.log(`   3. Verificar que todas las traducciones se aplican correctamente`);
console.log(`   4. Revisar el archivo i18n-processing-report.json para detalles`);
console.log(`   5. Si todo funciona bien, hacer commit de los cambios`);

console.log(`\n💡 Notas importantes:`);
console.log(`   • Algunas secciones pueden requerir etiquetas adicionales manualmente`);
console.log(`   • Verifica los elementos dinámicos y textos en JavaScript`);
console.log(`   • Asegúrate de que todas las claves existen en js/translations.js`);
console.log('\n' + '='.repeat(80));

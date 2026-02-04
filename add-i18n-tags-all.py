#!/usr/bin/env python3
# -*- coding: utf-8 -*-

"""
Script automatizado COMPLETO para agregar etiquetas data-i18n a TODAS las páginas de servicios
Gestion Carufel Inc. - Sistema de traducción multilingüe
Versión: 2.0 - Procesamiento múltiple con reportes detallados
"""

import os
import re
import json
from typing import List, Dict, Tuple

# Configuración de archivos a procesar
FILES_TO_PROCESS = [
    'construccion.html',
    'excavacion.html',
    'terrassement.html',
    'gestion-proyectos.html'
]

# Reporte global
global_report = {
    'totalChanges': 0,
    'totalFiles': 0,
    'successFiles': 0,
    'errorFiles': 0,
    'fileDetails': {}
}

print('🚀 INICIANDO PROCESAMIENTO MASIVO DE PÁGINAS DE SERVICIOS')
print('=' * 80)

# Patrones universales (aplicables a todas las páginas)
universal_patterns = [
    # Botones CTA comunes
    {
        'search': r'<a href="#contacto" class="cta-button">Solicitar Cotización Gratuita</a>',
        'replace': '<a href="#contacto" class="cta-button" data-i18n="cta.quote">Solicitar Cotización Gratuita</a>',
        'description': 'CTA - Solicitar Cotización'
    },
    {
        'search': r'<a href="#contacto" class="cta-button-secondary">Hablar con un Experto</a>',
        'replace': '<a href="#contacto" class="cta-button-secondary" data-i18n="cta.expert">Hablar con un Experto</a>',
        'description': 'CTA - Hablar con Experto'
    },
    {
        'search': r'<a href="#contacto" class="cta-button">Contáctanos Hoy</a>',
        'replace': '<a href="#contacto" class="cta-button" data-i18n="cta.contact">Contáctanos Hoy</a>',
        'description': 'CTA - Contáctanos'
    },
    # FAQ común
    {
        'search': r'<p class="subtitle">Preguntas Frecuentes</p>',
        'replace': '<p class="subtitle" data-i18n="faq.subtitle">Preguntas Frecuentes</p>',
        'description': 'FAQ - Subtítulo'
    },
    {
        'search': r'<h2>Respuestas a tus Dudas</h2>',
        'replace': '<h2 data-i18n="faq.title">Respuestas a tus Dudas</h2>',
        'description': 'FAQ - Título'
    },
]

# Patrones específicos para construccion.html
construccion_patterns = [
    # Hero section
    {
        'search': r'<h1>Construcción de Estructuras de Alta Calidad</h1>',
        'replace': '<h1 data-i18n="construction.hero.title">Construcción de Estructuras de Alta Calidad</h1>',
        'description': 'Hero - Título principal'
    },
    {
        'search': r'<p class="hero-subtitle">Edificación profesional de cimientos, muros, losas y estructuras completas con acabados de primer nivel\.</p>',
        'replace': '<p class="hero-subtitle" data-i18n="construction.hero.subtitle">Edificación profesional de cimientos, muros, losas y estructuras completas con acabados de primer nivel.</p>',
        'description': 'Hero - Subtítulo'
    },
    # Intro
    {
        'search': r'<p class="subtitle">Construcción Profesional</p>',
        'replace': '<p class="subtitle" data-i18n="construction.intro.subtitle">Construcción Profesional</p>',
        'description': 'Intro - Subtítulo'
    },
    {
        'search': r'<h2>Edificamos tu Proyecto con Excelencia</h2>',
        'replace': '<h2 data-i18n="construction.intro.title">Edificamos tu Proyecto con Excelencia</h2>',
        'description': 'Intro - Título'
    },
    # Materiales
    {
        'search': r'<p class="subtitle">Materiales Premium</p>',
        'replace': '<p class="subtitle" data-i18n="construction.materials.subtitle">Materiales Premium</p>',
        'description': 'Materiales - Subtítulo'
    },
    {
        'search': r'<h2>Trabajamos con los Mejores Materiales del Mercado</h2>',
        'replace': '<h2 data-i18n="construction.materials.title">Trabajamos con los Mejores Materiales del Mercado</h2>',
        'description': 'Materiales - Título'
    },
    # Materiales individuales
    {
        'search': r'<h3 style="margin-bottom: 1rem; color: var\(--gray-dark\);">Concreto de Alta Resistencia</h3>',
        'replace': '<h3 style="margin-bottom: 1rem; color: var(--gray-dark);" data-i18n="construction.materials.concrete.title">Concreto de Alta Resistencia</h3>',
        'description': 'Material - Concreto título'
    },
    {
        'search': r'<h3 style="margin-bottom: 1rem; color: var\(--gray-dark\);">Acero Estructural Certificado</h3>',
        'replace': '<h3 style="margin-bottom: 1rem; color: var(--gray-dark);" data-i18n="construction.materials.steel.title">Acero Estructural Certificado</h3>',
        'description': 'Material - Acero título'
    },
    {
        'search': r'<h3 style="margin-bottom: 1rem; color: var\(--gray-dark\);">Aislamiento Térmico Avanzado</h3>',
        'replace': '<h3 style="margin-bottom: 1rem; color: var(--gray-dark);" data-i18n="construction.materials.insulation.title">Aislamiento Térmico Avanzado</h3>',
        'description': 'Material - Aislamiento título'
    },
    {
        'search': r'<h3 style="margin-bottom: 1rem; color: var\(--gray-dark\);">Impermeabilización Premium</h3>',
        'replace': '<h3 style="margin-bottom: 1rem; color: var(--gray-dark);" data-i18n="construction.materials.waterproof.title">Impermeabilización Premium</h3>',
        'description': 'Material - Impermeabilización título'
    },
    {
        'search': r'<h3 style="margin-bottom: 1rem; color: var\(--gray-dark\);">Acabados de Diseño</h3>',
        'replace': '<h3 style="margin-bottom: 1rem; color: var(--gray-dark);" data-i18n="construction.materials.finishes.title">Acabados de Diseño</h3>',
        'description': 'Material - Acabados título'
    },
    {
        'search': r'<h3 style="margin-bottom: 1rem; color: var\(--gray-dark\);">Ventanas y Puertas Eficientes</h3>',
        'replace': '<h3 style="margin-bottom: 1rem; color: var(--gray-dark);" data-i18n="construction.materials.windows.title">Ventanas y Puertas Eficientes</h3>',
        'description': 'Material - Ventanas título'
    },
    # Certificaciones
    {
        'search': r'<p class="subtitle">Certificaciones y Garantías</p>',
        'replace': '<p class="subtitle" data-i18n="construction.certifications.subtitle">Certificaciones y Garantías</p>',
        'description': 'Certificaciones - Subtítulo'
    },
    {
        'search': r'<h2>Respaldo Profesional para tu Tranquilidad</h2>',
        'replace': '<h2 data-i18n="construction.certifications.title">Respaldo Profesional para tu Tranquilidad</h2>',
        'description': 'Certificaciones - Título'
    },
    # Ventajas
    {
        'search': r'<p class="subtitle">Nuestras Ventajas</p>',
        'replace': '<p class="subtitle" data-i18n="construction.advantages.subtitle">Nuestras Ventajas</p>',
        'description': 'Ventajas - Subtítulo'
    },
    {
        'search': r'<h2>Por Qué Elegirnos para tu Proyecto</h2>',
        'replace': '<h2 data-i18n="construction.advantages.title">Por Qué Elegirnos para tu Proyecto</h2>',
        'description': 'Ventajas - Título'
    },
]

# Patrones específicos para excavacion.html
excavacion_patterns = [
    {
        'search': r'<h1>Excavación y Movimiento de Tierra Profesional</h1>',
        'replace': '<h1 data-i18n="excavation.hero.title">Excavación y Movimiento de Tierra Profesional</h1>',
        'description': 'Hero - Título principal'
    },
    {
        'search': r'<p class="hero-subtitle">Preparación experta del terreno para cimientos sólidos y proyectos exitosos\.</p>',
        'replace': '<p class="hero-subtitle" data-i18n="excavation.hero.subtitle">Preparación experta del terreno para cimientos sólidos y proyectos exitosos.</p>',
        'description': 'Hero - Subtítulo'
    },
    {
        'search': r'<p class="subtitle">Excavación Especializada</p>',
        'replace': '<p class="subtitle" data-i18n="excavation.intro.subtitle">Excavación Especializada</p>',
        'description': 'Intro - Subtítulo'
    },
    {
        'search': r'<h2>Preparamos el Terreno para tu Éxito</h2>',
        'replace': '<h2 data-i18n="excavation.intro.title">Preparamos el Terreno para tu Éxito</h2>',
        'description': 'Intro - Título'
    },
    {
        'search': r'<p class="subtitle">Equipo Especializado</p>',
        'replace': '<p class="subtitle" data-i18n="excavation.equipment.subtitle">Equipo Especializado</p>',
        'description': 'Equipo - Subtítulo'
    },
    {
        'search': r'<h2>Maquinaria de Última Generación</h2>',
        'replace': '<h2 data-i18n="excavation.equipment.title">Maquinaria de Última Generación</h2>',
        'description': 'Equipo - Título'
    },
    {
        'search': r'<p class="subtitle">Nuestros Beneficios</p>',
        'replace': '<p class="subtitle" data-i18n="excavation.benefits.subtitle">Nuestros Beneficios</p>',
        'description': 'Beneficios - Subtítulo'
    },
    {
        'search': r'<h2>Ventajas de Trabajar con Nosotros</h2>',
        'replace': '<h2 data-i18n="excavation.benefits.title">Ventajas de Trabajar con Nosotros</h2>',
        'description': 'Beneficios - Título'
    },
]

# Patrones específicos para terrassement.html
terrassement_patterns = [
    # Metodología
    {
        'search': r'<p class="subtitle">Metodología</p>',
        'replace': '<p class="subtitle" data-i18n="terrassement.process.subtitle">Metodología</p>',
        'description': 'Proceso - Subtítulo'
    },
    {
        'search': r'<h2>Proceso de Terrassement</h2>',
        'replace': '<h2 data-i18n="terrassement.process.title">Proceso de Terrassement</h2>',
        'description': 'Proceso - Título'
    },
    # Beneficios
    {
        'search': r'<p class="subtitle">Beneficios</p>',
        'replace': '<p class="subtitle" data-i18n="terrassement.benefits.subtitle">Beneficios</p>',
        'description': 'Beneficios - Subtítulo'
    },
    {
        'search': r'<h2>Importancia del Terrassement Profesional</h2>',
        'replace': '<h2 data-i18n="terrassement.benefits.title">Importancia del Terrassement Profesional</h2>',
        'description': 'Beneficios - Título'
    },
    # Equipos
    {
        'search': r'<p class="subtitle">Equipos Especializados</p>',
        'replace': '<p class="subtitle" data-i18n="terrassement.equipment.subtitle">Equipos Especializados</p>',
        'description': 'Equipo - Subtítulo'
    },
    {
        'search': r'<h2>Tecnología de Punta para Terrassement</h2>',
        'replace': '<h2 data-i18n="terrassement.equipment.title">Tecnología de Punta para Terrassement</h2>',
        'description': 'Equipo - Título'
    },
    # Aplicaciones
    {
        'search': r'<p class="subtitle">Aplicaciones</p>',
        'replace': '<p class="subtitle" data-i18n="terrassement.applications.subtitle">Aplicaciones</p>',
        'description': 'Aplicaciones - Subtítulo'
    },
    {
        'search': r'<h2>Terrassement para Diferentes Proyectos</h2>',
        'replace': '<h2 data-i18n="terrassement.applications.title">Terrassement para Diferentes Proyectos</h2>',
        'description': 'Aplicaciones - Título'
    },
    # FAQ
    {
        'search': r'<p class="subtitle">FAQ</p>',
        'replace': '<p class="subtitle" data-i18n="terrassement.faq.subtitle">FAQ</p>',
        'description': 'FAQ - Subtítulo'
    },
    {
        'search': r'<h2>Preguntas Frecuentes sobre Terrassement</h2>',
        'replace': '<h2 data-i18n="terrassement.faq.title">Preguntas Frecuentes sobre Terrassement</h2>',
        'description': 'FAQ - Título'
    },
]

# Patrones específicos para gestion-proyectos.html
gestion_patterns = [
    # Metodología
    {
        'search': r'<p class="subtitle">Metodología</p>',
        'replace': '<p class="subtitle" data-i18n="projectmgmt.process.subtitle">Metodología</p>',
        'description': 'Proceso - Subtítulo'
    },
    {
        'search': r'<h2>Proceso de Gestión de Proyectos</h2>',
        'replace': '<h2 data-i18n="projectmgmt.process.title">Proceso de Gestión de Proyectos</h2>',
        'description': 'Proceso - Título'
    },
    # Servicios Especializados
    {
        'search': r'<p class="subtitle">Servicios Especializados</p>',
        'replace': '<p class="subtitle" data-i18n="projectmgmt.services.subtitle">Servicios Especializados</p>',
        'description': 'Servicios - Subtítulo'
    },
    {
        'search': r'<h2>Tipos de Proyectos que Gestionamos</h2>',
        'replace': '<h2 data-i18n="projectmgmt.services.title">Tipos de Proyectos que Gestionamos</h2>',
        'description': 'Servicios - Título'
    },
    # Tecnología y Metodología
    {
        'search': r'<p class="subtitle">Tecnología y Metodología</p>',
        'replace': '<p class="subtitle" data-i18n="projectmgmt.technology.subtitle">Tecnología y Metodología</p>',
        'description': 'Tecnología - Subtítulo'
    },
    {
        'search': r'<h2>Herramientas Profesionales de Gestión</h2>',
        'replace': '<h2 data-i18n="projectmgmt.technology.title">Herramientas Profesionales de Gestión</h2>',
        'description': 'Tecnología - Título'
    },
    # Ventajas
    {
        'search': r'<p class="subtitle">Ventajas Competitivas</p>',
        'replace': '<p class="subtitle" data-i18n="projectmgmt.benefits.subtitle">Ventajas Competitivas</p>',
        'description': 'Beneficios - Subtítulo'
    },
    {
        'search': r'<h2>Beneficios de la Gestión Profesional de Proyectos</h2>',
        'replace': '<h2 data-i18n="projectmgmt.benefits.title">Beneficios de la Gestión Profesional de Proyectos</h2>',
        'description': 'Beneficios - Título'
    },
    # FAQ
    {
        'search': r'<p class="subtitle">FAQ</p>',
        'replace': '<p class="subtitle" data-i18n="projectmgmt.faq.subtitle">FAQ</p>',
        'description': 'FAQ - Subtítulo'
    },
    {
        'search': r'<h2>Preguntas Frecuentes sobre Gestión de Proyectos</h2>',
        'replace': '<h2 data-i18n="projectmgmt.faq.title">Preguntas Frecuentes sobre Gestión de Proyectos</h2>',
        'description': 'FAQ - Título'
    },
]


def process_file(file_name: str, specific_patterns: List[Dict]) -> Dict:
    """Procesa un archivo aplicando los patrones especificados"""
    script_dir = os.path.dirname(os.path.abspath(__file__))
    file_path = os.path.join(script_dir, file_name)
    
    print(f'\n📄 Procesando: {file_name}')
    print('-' * 80)
    
    file_report = {
        'fileName': file_name,
        'changes': [],
        'totalChanges': 0,
        'success': False,
        'error': None
    }
    
    try:
        # Leer contenido
        if not os.path.exists(file_path):
            raise FileNotFoundError(f'Archivo no encontrado: {file_name}')
        
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        original_content = content
        
        # Combinar patrones universales con específicos
        all_patterns = universal_patterns + specific_patterns
        
        # Aplicar cada patrón
        for pattern in all_patterns:
            matches = re.findall(pattern['search'], content)
            if matches:
                content = re.sub(pattern['search'], pattern['replace'], content)
                change_info = {
                    'pattern': pattern['description'],
                    'occurrences': len(matches)
                }
                file_report['changes'].append(change_info)
                file_report['totalChanges'] += len(matches)
                print(f"   ✓ {pattern['description']}: {len(matches)} cambio(s)")
        
        # Guardar si hubo cambios
        if content != original_content:
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(content)
            file_report['success'] = True
            print(f"\n   ✅ Archivo actualizado: {file_report['totalChanges']} cambios totales")
        else:
            file_report['success'] = True
            print(f"\n   ℹ️  No se encontraron coincidencias para actualizar")
        
        global_report['successFiles'] += 1
        
    except Exception as error:
        file_report['error'] = str(error)
        global_report['errorFiles'] += 1
        print(f'\n   ❌ Error: {error}')
    
    global_report['fileDetails'][file_name] = file_report
    global_report['totalChanges'] += file_report['totalChanges']
    
    return file_report


# Procesar todos los archivos
print(f'\n📋 Archivos a procesar: {len(FILES_TO_PROCESS)}')
print('=' * 80)

for file_name in FILES_TO_PROCESS:
    global_report['totalFiles'] += 1
    
    # Seleccionar patrones específicos según el archivo
    specific_patterns = []
    if file_name == 'construccion.html':
        specific_patterns = construccion_patterns
    elif file_name == 'excavacion.html':
        specific_patterns = excavacion_patterns
    elif file_name == 'terrassement.html':
        specific_patterns = terrassement_patterns
    elif file_name == 'gestion-proyectos.html':
        specific_patterns = gestion_patterns
    
    process_file(file_name, specific_patterns)

# Generar reporte final
print('\n')
print('=' * 80)
print('📊 REPORTE FINAL DE PROCESAMIENTO')
print('=' * 80)
print(f"\n📈 Estadísticas Globales:")
print(f"   • Total de archivos procesados: {global_report['totalFiles']}")
print(f"   • Archivos exitosos: {global_report['successFiles']}")
print(f"   • Archivos con errores: {global_report['errorFiles']}")
print(f"   • Total de cambios realizados: {global_report['totalChanges']}")

print(f"\n📝 Detalle por archivo:")
for file_name, details in global_report['fileDetails'].items():
    print(f"\n   {file_name}:")
    print(f"   └─ Cambios: {details['totalChanges']}")
    print(f"   └─ Estado: {'✅ Exitoso' if details['success'] else '❌ Error'}")
    if details['error']:
        print(f"   └─ Error: {details['error']}")
    if details['changes']:
        print(f"   └─ Tipos de cambios:")
        for change in details['changes']:
            print(f"      • {change['pattern']}: {change['occurrences']} ocurrencia(s)")

# Guardar reporte en JSON
script_dir = os.path.dirname(os.path.abspath(__file__))
report_path = os.path.join(script_dir, 'i18n-processing-report.json')
with open(report_path, 'w', encoding='utf-8') as f:
    json.dump(global_report, f, indent=2, ensure_ascii=False)
print(f'\n💾 Reporte detallado guardado en: i18n-processing-report.json')

# Sugerencias finales
print(f'\n✨ PROCESO COMPLETADO!')
print(f'\n🎯 Próximos pasos recomendados:')
print(f'   1. Revisar los archivos modificados en tu editor')
print(f'   2. Abrir cada página en el navegador y probar el selector de idiomas')
print(f'   3. Verificar que todas las traducciones se aplican correctamente')
print(f'   4. Revisar el archivo i18n-processing-report.json para detalles')
print(f'   5. Si todo funciona bien, hacer commit de los cambios')

print(f'\n💡 Notas importantes:')
print(f'   • Algunas secciones pueden requerir etiquetas adicionales manualmente')
print(f'   • Verifica los elementos dinámicos y textos en JavaScript')
print(f'   • Asegúrate de que todas las claves existen en js/translations.js')
print('\n' + '=' * 80)

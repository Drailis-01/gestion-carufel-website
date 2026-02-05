#!/usr/bin/env python3
"""Agregar data-i18n a badges en realizaciones.html"""

import re

# Leer archivo
with open('realizaciones.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Mapeo de badges
replacements = [
    (r'<span class="project-badge">Construcción</span>', 
     '<span class="project-badge" data-i18n="projects.badge.construction">Construcción</span>'),
    (r'<span class="project-badge" style="background: #2563eb;">Piscina</span>', 
     '<span class="project-badge" style="background: #2563eb;" data-i18n="projects.badge.pool">Piscina</span>'),
    (r'<span class="project-badge" style="background: #059669;">Comercial</span>', 
     '<span class="project-badge" style="background: #059669;" data-i18n="projects.badge.commercial">Comercial</span>'),
    (r'<span class="project-badge" style="background: #dc2626;">Terrassement</span>', 
     '<span class="project-badge" style="background: #dc2626;" data-i18n="projects.badge.terrassement">Terrassement</span>'),
    (r'<span class="project-badge" style="background: #7c3aed;">Industrial</span>', 
     '<span class="project-badge" style="background: #7c3aed;" data-i18n="projects.badge.industrial">Industrial</span>'),
    (r'<span class="project-badge" style="background: #ea580c;">Paisajismo</span>', 
     '<span class="project-badge" style="background: #ea580c;" data-i18n="projects.badge.landscaping">Paisajismo</span>'),
    (r'<span class="project-badge" style="background: #0891b2;">Gestión</span>', 
     '<span class="project-badge" style="background: #0891b2;" data-i18n="projects.badge.management">Gestión</span>'),
    (r'<span class="project-badge" style="background: #f59e0b;">Excavación</span>', 
     '<span class="project-badge" style="background: #f59e0b;" data-i18n="projects.badge.excavation">Excavación</span>'),
    (r'<span class="project-badge" style="background: #0ea5e9;">Construcción</span>', 
     '<span class="project-badge" style="background: #0ea5e9;" data-i18n="projects.badge.construction">Construcción</span>'),
    (r'<span class="project-badge" style="background: #8b5cf6;">Renovación</span>', 
     '<span class="project-badge" style="background: #8b5cf6;" data-i18n="projects.badge.renovation">Renovación</span>'),
    (r'<span class="project-badge" style="background: #10b981;">Terrassement</span>', 
     '<span class="project-badge" style="background: #10b981;" data-i18n="projects.badge.terrassement">Terrassement</span>'),
]

# Aplicar reemplazos
for old, new in replacements:
    content = content.replace(old, new)

# Guardar
with open('realizaciones.html', 'w', encoding='utf-8') as f:
    f.write(content)

print("✅ Badges actualizados con data-i18n")

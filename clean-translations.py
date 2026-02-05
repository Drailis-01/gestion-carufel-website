#!/usr/bin/env python3
"""Limpia claves de traducción no utilizadas del archivo translations.js"""

import re

# Leer traducciones
with open('js/translations.js', 'r', encoding='utf-8') as f:
    content = f.read()

# Leer claves usadas en todos los archivos relevantes
files_to_check = [
    'construccion.html', 'excavacion.html', 'terrassement.html', 
    'gestion-proyectos.html', 'contacto.html', 'sobre-nosotros.html',
    'realizaciones.html', 'index.html', 'js/components.js'
]

used_keys = set()
for filename in files_to_check:
    try:
        with open(filename, 'r', encoding='utf-8') as f:
            file_content = f.read()
            # data-i18n="key"
            matches = re.findall(r'data-i18n="([^"]+)"', file_content)
            used_keys.update(matches)
            # data-i18n-placeholder="key"
            matches = re.findall(r'data-i18n-placeholder="([^"]+)"', file_content)
            used_keys.update(matches)
    except FileNotFoundError:
        pass

print(f"✅ Claves usadas en archivos: {len(used_keys)}")

# Lista de claves que definitivamente NO se usan
truly_unused = [
    "btn.backtotop",  # No se usa en ningún HTML
    "hero.subtitle",  # No se usa (hay hero.btn.quote, etc. pero no hero.subtitle/title solo)
    "hero.title",
    "excavation.equipment.bulldozers.desc",
    "excavation.equipment.bulldozers.item1",
    "excavation.equipment.bulldozers.item2",
    "excavation.equipment.bulldozers.item3",
    "excavation.equipment.bulldozers.title",
    "projectmgmt.tech.bim.desc",
    "projectmgmt.tech.bim.title",
]

# Verificar que realmente no se usan
actually_unused = []
for key in truly_unused:
    if key not in used_keys:
        actually_unused.append(key)
        print(f"  ✓ {key} - no utilizada")
    else:
        print(f"  ✗ {key} - SÍ se usa, no eliminar")

if not actually_unused:
    print("\n✅ ¡Todas las claves están en uso! No hay nada que limpiar.")
    exit(0)

print(f"\n📊 Se eliminarán {len(actually_unused)} claves no utilizadas")
print("\nProcesando archivo translations.js...")

# Función para eliminar una clave de una sección
def remove_key_from_section(section_content, key):
    # Patrón para encontrar la línea completa con la clave
    pattern = rf'\s*"{re.escape(key)}":\s*"[^"]*",?\n'
    return re.sub(pattern, '', section_content)

# Eliminar claves de cada sección de idioma
for key in actually_unused:
    # Eliminar de español
    content = remove_key_from_section(content, key)

print(f"✅ {len(actually_unused)} claves eliminadas")

# Guardar archivo actualizado
with open('js/translations.js', 'w', encoding='utf-8') as f:
    f.write(content)

print("✅ Archivo translations.js actualizado")
print("\n" + "="*60)
print("RESUMEN")
print("="*60)
print(f"Claves eliminadas: {len(actually_unused)}")
for key in actually_unused:
    print(f"  - {key}")

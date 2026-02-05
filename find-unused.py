#!/usr/bin/env python3
"""Encuentra claves de traducción no utilizadas"""

import re
import json

# Leer traducciones
with open('js/translations.js', 'r', encoding='utf-8') as f:
    content = f.read()

# Extraer claves del español
es_match = re.search(r'es:\s*{([^}]+(?:{[^}]*}[^}]*)*)}', content, re.DOTALL)
es_section = es_match.group(1) if es_match else ""
translation_keys = set(re.findall(r'"([^"]+)":\s*"', es_section))

print(f"Total de claves en translations.js: {len(translation_keys)}")

# Leer claves usadas en HTML
html_files = ['construccion.html', 'excavacion.html', 'terrassement.html', 
              'gestion-proyectos.html', 'contacto.html', 'sobre-nosotros.html',
              'realizaciones.html', 'index.html', 'paisajismo.html', 'diagnostico.html']

html_keys = set()
for html_file in html_files:
    try:
        with open(html_file, 'r', encoding='utf-8') as f:
            html_content = f.read()
            matches = re.findall(r'data-i18n="([^"]+)"', html_content)
            html_keys.update(matches)
    except FileNotFoundError:
        pass

print(f"Total de claves usadas en HTML: {len(html_keys)}")

# Claves no utilizadas
unused = sorted(translation_keys - html_keys)
print(f"\nClaves no utilizadas: {len(unused)}")

# Agrupar por prefijo
grouped = {}
for key in unused:
    prefix = key.split('.')[0]
    if prefix not in grouped:
        grouped[prefix] = []
    grouped[prefix].append(key)

for prefix in sorted(grouped.keys()):
    print(f"\n{prefix} ({len(grouped[prefix])}):")
    for key in grouped[prefix][:5]:
        print(f"  - {key}")
    if len(grouped[prefix]) > 5:
        print(f"  ... y {len(grouped[prefix]) - 5} más")

# Guardar lista completa
with open('unused-keys.json', 'w', encoding='utf-8') as f:
    json.dump(unused, f, indent=2, ensure_ascii=False)

print(f"\n✅ Lista completa guardada en unused-keys.json")

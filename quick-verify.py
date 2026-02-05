#!/usr/bin/env python3
"""Script rápido para verificar claves de traducción faltantes"""

import re
import json

# Leer el archivo de traducciones
with open('js/translations.js', 'r', encoding='utf-8') as f:
    content = f.read()

# Extraer las claves de cada idioma
def extract_keys(lang_section):
    pattern = r'"([^"]+)":\s*"'
    matches = re.findall(pattern, lang_section)
    return set(matches)

# Dividir por sección de idioma
es_match = re.search(r'es:\s*{([^}]+(?:{[^}]*}[^}]*)*)}', content, re.DOTALL)
fr_match = re.search(r'fr:\s*{([^}]+(?:{[^}]*}[^}]*)*)}', content, re.DOTALL)
en_match = re.search(r'en:\s*{([^}]+(?:{[^}]*}[^}]*)*)}', content, re.DOTALL)

if es_match and fr_match and en_match:
    es_keys = extract_keys(es_match.group(1))
    fr_keys = extract_keys(fr_match.group(1))
    en_keys = extract_keys(en_match.group(1))
    
    print(f"✅ Claves en Español: {len(es_keys)}")
    print(f"✅ Claves en Francés: {len(fr_keys)}")
    print(f"✅ Claves en Inglés: {len(en_keys)}")
    print()
    
    # Encontrar claves faltantes
    all_keys = es_keys | fr_keys | en_keys
    
    missing_es = all_keys - es_keys
    missing_fr = all_keys - fr_keys
    missing_en = all_keys - en_keys
    
    if missing_es:
        print(f"❌ Faltan en Español ({len(missing_es)}):")
        for key in sorted(missing_es)[:10]:
            print(f"   - {key}")
        if len(missing_es) > 10:
            print(f"   ... y {len(missing_es) - 10} más")
        print()
    
    if missing_fr:
        print(f"❌ Faltan en Francés ({len(missing_fr)}):")
        for key in sorted(missing_fr)[:10]:
            print(f"   - {key}")
        if len(missing_fr) > 10:
            print(f"   ... y {len(missing_fr) - 10} más")
        print()
    
    if missing_en:
        print(f"❌ Faltan en Inglés ({len(missing_en)}):")
        for key in sorted(missing_en)[:10]:
            print(f"   - {key}")
        if len(missing_en) > 10:
            print(f"   ... y {len(missing_en) - 10} más")
        print()
    
    if not (missing_es or missing_fr or missing_en):
        print("✅ ¡Todas las claves están presentes en los 3 idiomas!")

# Verificar claves usadas en HTML
print("\n" + "="*60)
print("VERIFICANDO CLAVES EN ARCHIVOS HTML")
print("="*60 + "\n")

html_files = ['construccion.html', 'excavacion.html', 'terrassement.html', 
              'gestion-proyectos.html', 'contacto.html', 'sobre-nosotros.html',
              'realizaciones.html', 'index.html']

html_keys = set()
for html_file in html_files:
    try:
        with open(html_file, 'r', encoding='utf-8') as f:
            html_content = f.read()
            matches = re.findall(r'data-i18n="([^"]+)"', html_content)
            if matches:
                print(f"📄 {html_file}: {len(matches)} claves")
                html_keys.update(matches)
    except FileNotFoundError:
        pass

print(f"\n📊 Total de claves únicas en HTML: {len(html_keys)}")

# Verificar si todas las claves HTML tienen traducción
if es_match:
    missing_translations = html_keys - es_keys
    if missing_translations:
        print(f"\n❌ Claves en HTML sin traducción ({len(missing_translations)}):")
        for key in sorted(missing_translations)[:15]:
            print(f"   - {key}")
        if len(missing_translations) > 15:
            print(f"   ... y {len(missing_translations) - 15} más")
    else:
        print("\n✅ ¡Todas las claves HTML tienen traducción!")

print("\n" + "="*60)

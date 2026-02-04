import re
import json

# Leer el archivo actual
with open('js/translations.js', 'r', encoding='utf-8') as f:
    content = f.read()

# Patrones para extraer traducciones
pattern1 = r"'([^']+)':\s*\{\s*es:\s*'([^']*)'\s*,\s*fr:\s*'([^']*)'\s*,\s*en:\s*'([^']*)'\s*\}"
pattern2 = r'"([^"]+)":\s*\{\s*es:\s*"([^"]*)"\s*,\s*fr:\s*"([^"]*)"\s*,\s*en:\s*"([^"]*)"\s*\}"

matches = re.findall(pattern1, content) + re.findall(pattern2, content)

# Organizar por idioma
trans = {
    'es': {},
    'fr': {},
    'en': {}
}

for match in matches:
    key, es, fr, en = match
    trans['es'][key] = es.replace("\\'", "'")
    trans['fr'][key] = fr.replace("\\'", "'")
    trans['en'][key] = en.replace("\\'", "'")

print(f"Traducciones encontradas: {len(matches)}")

# Crear el nuevo archivo
with open('js/translations.js', 'w', encoding='utf-8') as f:
    f.write("// Base de datos de traducciones organizadas por idioma\n")
    f.write("const translations = {\n")
    
    for lang in ['es', 'fr', 'en']:
        f.write(f"  {lang}: {{\n")
        keys = sorted(trans[lang].keys())
        for i, key in enumerate(keys):
            value = trans[lang][key].replace('\\', '\\\\').replace('"', '\\"').replace("'", "\\'")
            comma = "," if i < len(keys) - 1 else ""
            f.write(f'    "{key}": "{value}"{comma}\n')
        comma = "," if lang != 'en' else ""
        f.write(f"  }}{comma}\n")
    
    f.write("};\n\n")
    f.write("// Hacer disponibles globalmente\n")
    f.write("window.translations = translations;\n")

print("✅ Archivo actualizado correctamente")

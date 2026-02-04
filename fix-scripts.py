import re

files = [
    "construccion.html", "contacto.html", "excavacion.html",
    "gestion-proyectos.html", "index.html", "paisajismo.html",
    "realizaciones.html", "sobre-nosotros.html", "terrassement.html"
]

scripts_block = '''    <script src="js/translations.js"></script>
    <script src="js/main.js"></script>
</body>'''

for filename in files:
    with open(filename, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Remover scripts existentes antes de </body>
    content = re.sub(r'\s*<script.*?main\.js.*?</script>\s*', '', content)
    content = re.sub(r'\s*<script.*?translations\.js.*?</script>\s*', '', content)
    content = re.sub(r'\s*<script.*?translator\.js.*?</script>\s*', '', content)
    
    # Agregar los scripts correctos antes de </body>
    content = content.replace('</body>', scripts_block)
    
    with open(filename, 'w', encoding='utf-8') as f:
        f.write(content)
    
    print(f"✅ {filename} actualizado")

print("\n✅ Todas las páginas actualizadas correctamente")

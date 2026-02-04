# Gestion Carufel Inc. - Sitio Web

## 📁 Estructura del Proyecto

```
NUEVO SITIO WEB/
├── index.html              # Página principal
├── sobre-nosotros.html     # Página sobre la empresa
├── contacto.html           # Formulario de contacto
├── realizaciones.html      # Galería de proyectos
├── construccion.html       # Servicio de construcción
├── excavacion.html         # Servicio de excavación
├── terrassement.html       # Servicio de terrassement
├── gestion-proyectos.html  # Servicio de gestión
├── template.html           # Plantilla para nuevas páginas
├── css/
│   └── style.css          # Estilos principales
├── js/
│   ├── components.js      # Header y Footer compartidos
│   └── main.js           # Funcionalidad JavaScript
└── nuestras realizaciones/ # Carpeta con fotos de proyectos
```

## 🎨 Componentes Compartidos

### Header y Footer Automáticos

El header y footer se cargan automáticamente en todas las páginas mediante `js/components.js`.

**Ventajas:**
- ✅ Un solo lugar para editar el header/footer
- ✅ Cambios se reflejan automáticamente en todo el sitio
- ✅ Fácil mantenimiento
- ✅ Consistencia garantizada

### Cómo Editar el Header o Footer

1. Abre el archivo `js/components.js`
2. Busca la función `loadHeader()` o `loadFooter()`
3. Modifica el HTML dentro de la variable correspondiente
4. Los cambios se aplicarán automáticamente a todas las páginas

**Ejemplo - Cambiar el teléfono:**
```javascript
// En loadFooter(), busca:
<p>📞 +1 (XXX) XXX-XXXX</p>

// Cambia a:
<p>📞 +1 (514) 123-4567</p>
```

## 📄 Crear una Nueva Página

1. Copia `template.html` y renómbrala
2. Reemplaza los textos entre corchetes `[TEXTO]` con tu contenido:
   - `[DESCRIPCIÓN DE LA PÁGINA]`
   - `[TÍTULO DE LA PÁGINA]`
   - `[TÍTULO PRINCIPAL]`
   - etc.
3. Añade tu contenido en la sección marcada
4. El header y footer se cargarán automáticamente

## 🎨 Colores del Branding

Los colores están definidos en `css/style.css`:

```css
--primary-color: #FF6B35;      /* Naranja principal */
--primary-dark: #E65528;       /* Naranja oscuro */
--primary-light: #FF8A5C;      /* Naranja claro */
--white: #FFFFFF;              /* Fondo blanco puro */
```

## 📱 Características del Sitio

- ✅ **Diseño Responsivo** - Funciona en móviles, tablets y escritorio
- ✅ **Fondo Blanco Puro** - En todas las páginas y secciones
- ✅ **Navegación con Dropdown** - Menú de servicios desplegable
- ✅ **Menú Móvil** - Hamburguesa menu para dispositivos pequeños
- ✅ **Formulario de Contacto** - Con validación
- ✅ **Animaciones Suaves** - Al hacer scroll
- ✅ **SEO Optimizado** - Meta tags y estructura semántica

## 🔧 Archivos JavaScript

### components.js
- Carga el header y footer compartidos
- Se ejecuta automáticamente al cargar cada página

### main.js
- Navegación móvil
- Validación de formularios
- Animaciones de scroll
- Dropdown de servicios
- Enlaces activos

## 📞 Información de Contacto

Para actualizar la información de contacto en todo el sitio:

1. Abre `js/components.js`
2. Busca la función `loadFooter()`
3. Modifica los datos de contacto:
   - Dirección
   - Teléfono
   - Email
   - Horario

## 🚀 Despliegue

Para publicar el sitio:

1. Sube todos los archivos a tu servidor web
2. Asegúrate de mantener la estructura de carpetas
3. Verifica que los permisos de archivos sean correctos
4. El sitio funcionará automáticamente

## 💡 Consejos de Mantenimiento

- **Actualizar el nombre de la empresa**: Editar solo `js/components.js`
- **Agregar/quitar servicios**: Editar el dropdown en `loadHeader()` dentro de `components.js`
- **Cambiar información de contacto**: Editar `loadFooter()` en `components.js`
- **Modificar estilos globales**: Editar `css/style.css`
- **Agregar nueva página**: Copiar `template.html` y personalizar

## 📋 Checklist de Actualización

Cuando hagas cambios al header/footer:

- [ ] Editar `js/components.js`
- [ ] Guardar cambios
- [ ] Refrescar cualquier página del sitio
- [ ] Los cambios se verán en todas las páginas automáticamente

---

**Gestion Carufel Inc.** - Sitio web profesional con componentes compartidos para facilitar el mantenimiento.

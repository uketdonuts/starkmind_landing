# 🎥 Acceso Directo a Demos - StarkMind

## 📋 URL para Clientes

**URL Directa para Demos:**
```
https://tu-dominio.com/?demo=access
```

## 🔐 Credenciales de Acceso

- **Contraseña:** `demo123`
- **Válida para:** Todas las demos de productos

## 📱 Cómo Funciona

1. **Acceso Directo**: Los clientes hacen clic en la URL y van directo al login
2. **Autenticación**: Ingresan la contraseña `demo123`
3. **Demos Disponibles**: Acceden a los videos de:
   - **Agendify** - Sistema de reservas
   - **DHL** - Sistema de cotizaciones  
   - **Sistema Contable** - Gestión contable

## ⚙️ Configuración Personalizada

### Cambiar la Contraseña
Editar archivo: `src/context/AuthContext.tsx`
```javascript
// Línea 10 - Cambiar la contraseña
const DEMO_PASSWORD = 'tu_nueva_contraseña';
```

### Cambiar el Parámetro de URL
Editar archivo: `src/context/AuthContext.tsx`
```javascript
// Línea 30 - Cambiar el parámetro
const demoParam = urlParams.get('tu_parametro');
if (demoParam === 'tu_valor') {
```

### Actualizar Videos
1. Subir videos a: `public/img/Portfolio/[proyecto]/`
2. Editar: `src/components/DemoVideos.tsx`
3. Actualizar array `videos` con las nuevas rutas

## 🚀 URLs de Ejemplo

```bash
# Producción
https://starkmind.com/?demo=access

# Desarrollo local
http://localhost:3000/?demo=access

# Docker local
http://localhost/?demo=access
```

## 🎯 Ventajas

✅ **Sin botones visibles** - URL completamente discreta  
✅ **Acceso directo** - No necesitan navegar por el sitio  
✅ **Sesión persistente** - Se mantiene logueado al recargar  
✅ **Responsivo** - Funciona en móviles y desktop  
✅ **Profesional** - Experiencia elegante para clientes  

## 📧 Mensaje para Clientes

```
Hola [Cliente],

Te comparto el acceso exclusivo a las demos de nuestros productos:

🔗 URL: https://starkmind.com/?demo=access
🔑 Contraseña: demo123

Podrás ver las demostraciones completas de:
- Sistema de reservas Agendify
- Plataforma de cotizaciones DHL  
- Sistema contable empresarial

¡Cualquier duda, no dudes en contactarme!

Saludos,
[Tu nombre]
```
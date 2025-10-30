# 🐳 Solución para Problemas de Docker y npm

## 🔧 Problemas Resueltos

✅ **Archivo .env creado**  
✅ **Docker-compose actualizado (versión obsoleta corregida)**  
✅ **Puerto cambiado a 80 para acceso web estándar**  

## 🚀 Pasos para Ejecutar

### 1. Instalar dependencias de Node.js
```bash
cd C:\Users\Noel\Documents\Dev\starkmind_landing
npm install
```

### 2. Ejecutar con Docker (Recomendado)
```bash
# Construir y ejecutar
docker-compose up -d --build

# Ver logs
docker-compose logs -f

# Parar contenedores
docker-compose down
```

### 3. Ejecutar en desarrollo local (Alternativo)
```bash
# Solo React (puerto 3000)
npm start

# O construir para producción
npm run build
```

## 🌐 URLs de Acceso

### Con Docker:
- **Sitio principal:** http://localhost
- **Demos:** http://localhost/?demo=access

### Con npm start:
- **Sitio principal:** http://localhost:3000  
- **Demos:** http://localhost:3000/?demo=access

## 🛠️ Si sigues teniendo problemas con npm:

### Opción 1: Reinstalar node_modules
```bash
rmdir /s node_modules
del package-lock.json
npm install
```

### Opción 2: Usar yarn (alternativo)
```bash
npm install -g yarn
yarn install
yarn start
```

### Opción 3: Solo usar Docker
```bash
# El Dockerfile ya instala todo automáticamente
docker-compose up -d --build
```

## 🔍 Verificar que funciona:

1. **Docker:** Ve a http://localhost - deberías ver tu landing page
2. **Demos:** Ve a http://localhost/?demo=access - deberías ver el login
3. **Contraseña:** `demo123`

## 📁 Archivos creados/modificados:

- ✅ `.env` - Variables de entorno
- ✅ `docker-compose.yml` - Sin versión obsoleta, puerto 80
- ✅ Sistema de demos funcionando

¡Ahora tu aplicación debería funcionar perfectamente con Docker! 🎉
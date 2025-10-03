#!/usr/bin/env bash
# Script de despliegue en producción para StarkMind Landing

set -e

COMPOSE_FILE="docker-compose.yml"

# Color codes for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

function usage() {
  echo -e "${BLUE}StarkMind Production Helper${NC}"
  echo ""
  echo -e "${YELLOW}Uso:${NC} $0 {prod|build|stop|restart|logs|status|clean|health|backup|setup|kill|prebuild|clean-build|assets|verify-assets}"
  echo ""
  echo -e "${YELLOW}Comandos principales:${NC}"
  echo "  prod         - Iniciar entorno de producción"
  echo "  build        - Construir imágenes de producción"
  echo "  prebuild     - Pre-construir assets de React localmente"
  echo "  assets       - Construir y optimizar archivos estáticos"
  echo "  verify-assets- Verificar integridad de archivos estáticos"
  echo "  clean-build  - Limpiar builds anteriores"
  echo "  stop         - Detener entorno de producción"
  echo "  restart      - Reiniciar entorno de producción"
  echo "  logs         - Mostrar logs de producción"
  echo "  status       - Mostrar estado del entorno"
  echo "  clean        - Limpiar recursos de Docker"
  echo "  health       - Verificar salud de la aplicación"
  echo "  kill         - Forzar detención de todos los procesos"
  echo ""
  echo -e "${YELLOW}Comandos adicionales:${NC}"
  echo "  backup       - Crear respaldo de configuración"
  echo "  setup        - Crear archivos de producción faltantes"
  echo ""
  echo -e "${YELLOW}URL de Producción:${NC}"
  echo "  Aplicación: http://localhost:5000"
  echo "  API Health: http://localhost:5000/api/health"
  echo "  Archivos estáticos: http://localhost:5000/static/"
  echo ""
  echo -e "${YELLOW}Archivos Estáticos:${NC}"
  echo "  Los archivos estáticos se construyen automáticamente"
  echo "  React build se sirve desde: http://localhost:5000/static/"
  echo "  Favicon: http://localhost:5000/favicon.ico"
  echo "  Manifest: http://localhost:5000/manifest.json"
  exit 1
}

function check_requirements() {
  if ! command -v docker &> /dev/null; then
    echo -e "${RED}❌ Docker no está instalado${NC}"
    exit 1
  fi
  
  if ! command -v docker-compose &> /dev/null; then
    echo -e "${RED}❌ Docker Compose no está instalado${NC}"
    exit 1
  fi
}

function check_files() {
  local missing_files=()
  
  if [ ! -f "$COMPOSE_FILE" ]; then
    missing_files+=("$COMPOSE_FILE")
  fi
  
  if [ ! -f "Dockerfile" ]; then
    missing_files+=("Dockerfile")
  fi
  
  if [ ! -f ".env" ]; then
    missing_files+=(".env")
  fi
  
  if [ ${#missing_files[@]} -gt 0 ]; then
    echo -e "${YELLOW}⚠️  Archivos faltantes:${NC}"
    for file in "${missing_files[@]}"; do
      echo -e "   - ${file}"
    done
    echo -e "${BLUE}💡 Ejecuta '${0} setup' para crear los archivos faltantes${NC}"
    return 1
  fi
  
  return 0
}

function verify_build_integrity() {
  echo -e "${BLUE}🔍 Verificando integridad del build...${NC}"
  
  local build_ok=true
  
  # Verificar archivos esenciales
  if [ ! -f "build/index.html" ]; then
    echo -e "${RED}❌ build/index.html no encontrado${NC}"
    build_ok=false
  fi
  
  if [ ! -f "build/manifest.json" ]; then
    echo -e "${RED}❌ build/manifest.json no encontrado${NC}"
    build_ok=false
  fi
  
  if [ ! -f "build/favicon.ico" ]; then
    echo -e "${YELLOW}⚠️  build/favicon.ico no encontrado${NC}"
  fi
  
  # Verificar directorio static
  if [ ! -d "build/static" ]; then
    echo -e "${RED}❌ Directorio build/static no encontrado${NC}"
    build_ok=false
  else
    # Verificar archivos JS
    js_files=$(find build/static -name "*.js" 2>/dev/null | wc -l)
    if [ "$js_files" -eq 0 ]; then
      echo -e "${RED}❌ No se encontraron archivos JavaScript${NC}"
      build_ok=false
    else
      echo -e "${GREEN}✅ Archivos JavaScript: $js_files${NC}"
    fi
    
    # Verificar archivos CSS
    css_files=$(find build/static -name "*.css" 2>/dev/null | wc -l)
    if [ "$css_files" -eq 0 ]; then
      echo -e "${YELLOW}⚠️  No se encontraron archivos CSS${NC}"
    else
      echo -e "${GREEN}✅ Archivos CSS: $css_files${NC}"
    fi
  fi
  
  if [ "$build_ok" = true ]; then
    echo -e "${GREEN}✅ Build verificado correctamente${NC}"
    return 0
  else
    echo -e "${RED}❌ Build incompleto o corrupto${NC}"
    return 1
  fi
}

function build_react_assets() {
  echo -e "${BLUE}🏗️  Construyendo assets de React...${NC}"
  
  # Verificar Node.js y npm
  if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js no está instalado${NC}"
    return 1
  fi
  
  if ! command -v npm &> /dev/null; then
    echo -e "${RED}❌ npm no está instalado${NC}"
    return 1
  fi
  
  # Verificar package.json
  if [ ! -f "package.json" ]; then
    echo -e "${RED}❌ package.json no encontrado${NC}"
    return 1
  fi
  
  echo -e "${BLUE}📦 Instalando dependencias...${NC}"
  npm install || {
    echo -e "${RED}❌ Error instalando dependencias${NC}"
    return 1
  }
  
  echo -e "${BLUE}🏗️  Ejecutando build de React...${NC}"
  npm run build || {
    echo -e "${RED}❌ Error en el build de React${NC}"
    return 1
  }
  
  # Verificar que el build se completó
  if verify_build_integrity; then
    echo -e "${GREEN}✅ Build de React completado exitosamente${NC}"
    
    # Mostrar estadísticas
    echo -e "${BLUE}📊 Estadísticas del build:${NC}"
    if [ -d "build/static/js" ]; then
      js_count=$(find build/static/js -name "*.js" | wc -l)
      js_size=$(du -sh build/static/js 2>/dev/null | cut -f1)
      echo "   JS files: $js_count ($js_size)"
    fi
    
    if [ -d "build/static/css" ]; then
      css_count=$(find build/static/css -name "*.css" | wc -l)
      css_size=$(du -sh build/static/css 2>/dev/null | cut -f1)
      echo "   CSS files: $css_count ($css_size)"
    fi
    
    total_size=$(du -sh build 2>/dev/null | cut -f1)
    echo "   Total build size: $total_size"
    
    return 0
  else
    return 1
  fi
}

function optimize_static_files() {
  echo -e "${BLUE}⚡ Optimizando archivos estáticos...${NC}"
  
  if [ ! -d "build" ]; then
    echo -e "${RED}❌ Directorio build no encontrado${NC}"
    return 1
  fi
  
  # Crear directorio de backup temporal
  backup_dir="/tmp/starkmind_build_backup_$(date +%s)"
  cp -r build "$backup_dir"
  echo -e "${BLUE}💾 Backup creado en: $backup_dir${NC}"
  
  # Optimizar imágenes si existen herramientas
  if command -v optipng &> /dev/null; then
    echo -e "${BLUE}🖼️  Optimizando imágenes PNG...${NC}"
    find build -name "*.png" -exec optipng -quiet {} \; 2>/dev/null || true
  fi
  
  # Verificar compresión gzip en archivos principales
  echo -e "${BLUE}📦 Verificando compresión...${NC}"
  for file in build/static/js/*.js build/static/css/*.css; do
    if [ -f "$file" ]; then
      original_size=$(wc -c < "$file")
      gzip_size=$(gzip -c "$file" | wc -c)
      compression_ratio=$(echo "scale=1; ($original_size - $gzip_size) * 100 / $original_size" | bc 2>/dev/null || echo "N/A")
      filename=$(basename "$file")
      echo "   $filename: ${original_size} bytes -> ${gzip_size} bytes (${compression_ratio}% compresión)"
    fi
  done
  
  echo -e "${GREEN}✅ Optimización completada${NC}"
  echo -e "${YELLOW}💡 Backup disponible en: $backup_dir${NC}"
}

function setup_static_files() {
  echo -e "${BLUE}📁 Configurando estructura de archivos estáticos...${NC}"
  
  # Crear directorios necesarios
  mkdir -p public/img
  mkdir -p build/static/{js,css,media}
  mkdir -p logs
  
  # Crear robots.txt si no existe
  if [ ! -f "public/robots.txt" ]; then
    cat > public/robots.txt << 'EOF'
User-agent: *
Allow: /
Sitemap: https://yourdomain.com/sitemap.xml
EOF
    echo -e "${GREEN}✅ robots.txt creado${NC}"
  fi
  
  # Crear manifest.json básico si no existe en public
  if [ ! -f "public/manifest.json" ]; then
    cat > public/manifest.json << 'EOF'
{
  "short_name": "StarkMind",
  "name": "StarkMind Landing",
  "icons": [
    {
      "src": "favicon.ico",
      "sizes": "64x64 32x32 24x24 16x16",
      "type": "image/x-icon"
    },
    {
      "src": "logo192.svg",
      "type": "image/svg+xml",
      "sizes": "192x192"
    },
    {
      "src": "logo512.svg",
      "type": "image/svg+xml",
      "sizes": "512x512"
    }
  ],
  "start_url": ".",
  "display": "standalone",
  "theme_color": "#000000",
  "background_color": "#ffffff"
}
EOF
    echo -e "${GREEN}✅ manifest.json básico creado${NC}"
  fi
  
  echo -e "${GREEN}✅ Estructura de archivos estáticos configurada${NC}"
}

function setup_production() {
  echo -e "${BLUE}🔧 Configurando archivos de producción...${NC}"
  
  # Verificar que los archivos principales existen
  if [ ! -f "Dockerfile" ]; then
    echo -e "${RED}❌ Dockerfile no encontrado. Asegúrate de estar en el directorio correcto.${NC}"
    exit 1
  fi
  
  if [ ! -f "$COMPOSE_FILE" ]; then
    echo -e "${RED}❌ $COMPOSE_FILE no encontrado. Asegúrate de estar en el directorio correcto.${NC}"
    exit 1
  fi
  
  # Crear .env si no existe
  if [ ! -f ".env" ]; then
    echo -e "${YELLOW}Creando archivo .env...${NC}"
    
    # Generar SECRET_KEY seguro
    SECRET_KEY=$(openssl rand -hex 32 2>/dev/null || echo "starkmind-$(date +%s)-$(head /dev/urandom | tr -dc A-Za-z0-9 | head -c 32)")
    
    # Crear directorio de logs
    mkdir -p logs
    
    cat > .env << EOF
# Flask Configuration
SECRET_KEY=$SECRET_KEY
FLASK_ENV=production
FLASK_DEBUG=False

# Zoho SMTP Configuration (Production)
ZOHO_EMAIL=noelsantamaria@agendify.xyz
ZOHO_PASSWORD=(Destination01*+)
DEFAULT_FROM_EMAIL=noelsantamaria@agendify.xyz

# Application Settings
APP_NAME=StarkMind Landing
APP_VERSION=1.0.0
EOF
    
    echo -e "${GREEN}✅ Archivo .env creado${NC}"
    echo -e "${YELLOW}🔐 SECRET_KEY generado: ${SECRET_KEY:0:16}...${NC}"
  fi
  
  # Configurar estructura de archivos estáticos
  setup_static_files
  
  echo -e "${GREEN}✅ Configuración de producción completada${NC}"
}

case "$1" in
  prod)
    echo -e "${BLUE}🏭 Iniciando entorno de producción...${NC}"
    check_requirements
    if ! check_files; then
      setup_production
    fi
    echo "La aplicación estará disponible en: http://localhost:5000"
    docker-compose -f $COMPOSE_FILE up -d --build
    echo -e "${GREEN}✅ Entorno de producción iniciado en modo detached${NC}"
    echo -e "${BLUE}💡 Para ver los logs: ./prod.sh logs${NC}"
    echo -e "${BLUE}💡 Para verificar el estado: ./prod.sh status${NC}"
    ;;

  build)
    echo -e "${BLUE}🔨 Construyendo imágenes de producción...${NC}"
    check_requirements
    check_files || exit 1
    
    # Verificar que el build de React existe o construirlo
    if [ ! -d "build" ] || [ ! -f "build/index.html" ]; then
      echo -e "${YELLOW}⚠️  Build de React no encontrado. Construyendo...${NC}"
      if build_react_assets; then
        echo -e "${GREEN}✅ Build de React completado${NC}"
      else
        echo -e "${RED}❌ Error construyendo React assets${NC}"
        echo -e "${YELLOW}El build se realizará dentro del contenedor Docker${NC}"
      fi
    else
      echo -e "${GREEN}✅ Build de React encontrado, verificando integridad...${NC}"
      verify_build_integrity || {
        echo -e "${YELLOW}⚠️  Build corrupto, reconstruyendo...${NC}"
        build_react_assets || {
          echo -e "${YELLOW}El build se realizará dentro del contenedor Docker${NC}"
        }
      }
    fi
    
    docker-compose -f $COMPOSE_FILE build --no-cache
    echo -e "${GREEN}✅ Construcción completada${NC}"
    ;;

  prebuild)
    echo -e "${BLUE}🏗️  Pre-construyendo assets de React...${NC}"
    if build_react_assets; then
      echo -e "${GREEN}✅ Pre-build completado${NC}"
      echo -e "${BLUE}💡 Ahora puedes ejecutar: ./prod.sh build${NC}"
    else
      echo -e "${RED}❌ Error en pre-build${NC}"
      exit 1
    fi
    ;;

  assets)
    echo -e "${BLUE}🎨 Construyendo y optimizando assets...${NC}"
    if build_react_assets; then
      optimize_static_files
      echo -e "${GREEN}✅ Assets construidos y optimizados${NC}"
    else
      echo -e "${RED}❌ Error construyendo assets${NC}"
      exit 1
    fi
    ;;

  verify-assets)
    echo -e "${BLUE}🔍 Verificando integridad de assets...${NC}"
    if verify_build_integrity; then
      echo -e "${GREEN}✅ Assets válidos${NC}"
    else
      echo -e "${RED}❌ Assets inválidos o faltantes${NC}"
      echo -e "${BLUE}💡 Ejecuta './prod.sh assets' para reconstruir${NC}"
      exit 1
    fi
    ;;

  clean-build)
    echo -e "${YELLOW}🧹 Limpiando builds anteriores...${NC}"
    rm -rf build/
    rm -rf node_modules/.cache/ 2>/dev/null || true
    echo -e "${GREEN}✅ Builds limpiados${NC}"
    echo -e "${BLUE}💡 Ejecuta './prod.sh prebuild' para reconstruir${NC}"
    ;;

  stop)
    echo -e "${YELLOW}🛑 Deteniendo entorno de producción...${NC}"
    docker-compose -f $COMPOSE_FILE down
    echo -e "${GREEN}✅ Entorno de producción detenido${NC}"
    ;;

  restart)
    echo -e "${BLUE}🔄 Reiniciando entorno de producción...${NC}"
    docker-compose -f $COMPOSE_FILE down
    docker-compose -f $COMPOSE_FILE up -d --build
    echo -e "${GREEN}✅ Entorno de producción reiniciado${NC}"
    ;;

  logs)
    echo -e "${BLUE}📋 Mostrando logs de producción...${NC}"
    docker-compose -f $COMPOSE_FILE logs -f
    ;;

  status)
    echo -e "${BLUE}📊 Estado del entorno de producción:${NC}"
    docker-compose -f $COMPOSE_FILE ps
    ;;

  clean)
    echo -e "${YELLOW}🧹 Limpiando recursos de Docker de producción...${NC}"
    docker-compose -f $COMPOSE_FILE down -v --remove-orphans
    docker system prune -f
    echo -e "${GREEN}✅ Limpieza de producción completada${NC}"
    ;;

  health)
    echo -e "${BLUE}🏥 Verificando salud de la aplicación...${NC}"
    if curl -f http://localhost:5000/api/health 2>/dev/null; then
      echo -e "${GREEN}✅ API funcionando correctamente${NC}"
      
      # Verificar archivos estáticos principales
      echo -e "${BLUE}📂 Verificando archivos estáticos...${NC}"
      
      # Verificar index.html (ruta principal)
      if curl -f http://localhost:5000/ 2>/dev/null > /dev/null; then
        echo -e "${GREEN}✅ Página principal accesible${NC}"
      else
        echo -e "${RED}❌ Página principal no accesible${NC}"
      fi
      
      # Verificar manifest.json
      if curl -f http://localhost:5000/manifest.json 2>/dev/null > /dev/null; then
        echo -e "${GREEN}✅ Manifest accesible${NC}"
      else
        echo -e "${YELLOW}⚠️  Manifest no encontrado${NC}"
      fi
      
      # Verificar favicon
      if curl -f http://localhost:5000/favicon.ico 2>/dev/null > /dev/null; then
        echo -e "${GREEN}✅ Favicon accesible${NC}"
      else
        echo -e "${YELLOW}⚠️  Favicon no encontrado${NC}"
      fi
      
      # Verificar archivos JS y CSS
      echo -e "${BLUE}🔍 Verificando assets principales...${NC}"
      js_accessible=0
      css_accessible=0
      
      # Buscar archivos JS principales
      for js_file in $(find build/static/js -name "main.*.js" 2>/dev/null | head -3); do
        filename=$(basename "$js_file")
        if curl -f "http://localhost:5000/static/js/$filename" 2>/dev/null > /dev/null; then
          js_accessible=$((js_accessible + 1))
        fi
      done
      
      # Buscar archivos CSS principales
      for css_file in $(find build/static/css -name "main.*.css" 2>/dev/null | head -3); do
        filename=$(basename "$css_file")
        if curl -f "http://localhost:5000/static/css/$filename" 2>/dev/null > /dev/null; then
          css_accessible=$((css_accessible + 1))
        fi
      done
      
      if [ "$js_accessible" -gt 0 ]; then
        echo -e "${GREEN}✅ Archivos JavaScript accesibles ($js_accessible)${NC}"
      else
        echo -e "${RED}❌ Archivos JavaScript no accesibles${NC}"
      fi
      
      if [ "$css_accessible" -gt 0 ]; then
        echo -e "${GREEN}✅ Archivos CSS accesibles ($css_accessible)${NC}"
      else
        echo -e "${YELLOW}⚠️  Archivos CSS no accesibles${NC}"
      fi
      
      # Verificar robots.txt
      if curl -f http://localhost:5000/robots.txt 2>/dev/null > /dev/null; then
        echo -e "${GREEN}✅ robots.txt accesible${NC}"
      else
        echo -e "${YELLOW}⚠️  robots.txt no encontrado${NC}"
      fi
      
      echo ""
      echo -e "${BLUE}📊 Resumen de salud:${NC}"
      echo "   API: ✅ Funcionando"
      echo "   Frontend: $([ $js_accessible -gt 0 ] && echo '✅ Funcionando' || echo '❌ Problemas')"
      echo "   Assets: $([ $js_accessible -gt 0 ] && [ $css_accessible -gt 0 ] && echo '✅ Disponibles' || echo '⚠️  Parciales')"
      
    else
      echo -e "${RED}❌ La aplicación no responde o hay problemas${NC}"
      echo -e "${YELLOW}Verifica que la aplicación esté ejecutándose con: $0 status${NC}"
      echo ""
      echo -e "${BLUE}💡 Diagnóstico rápido:${NC}"
      echo "   1. Verificar contenedores: docker-compose -f $COMPOSE_FILE ps"
      echo "   2. Ver logs: $0 logs"
      echo "   3. Verificar build: $0 verify-assets"
    fi
    ;;

  backup)
    echo -e "${BLUE}💾 Creando respaldo de producción...${NC}"
    timestamp=$(date +"%Y%m%d_%H%M%S")
    backup_dir="backups/prod_${timestamp}"
    mkdir -p "$backup_dir"
    
    # Respaldar logs
    if [ -d "logs" ]; then
      cp -r logs "$backup_dir/"
      echo "Logs respaldados"
    fi
    
    # Respaldar configuración
    if [ -f ".env" ]; then
      cp .env "$backup_dir/"
      echo "Configuración respaldada"
    fi
    
    # Crear archivo comprimido
    tar -czf "${backup_dir}.tar.gz" "$backup_dir"
    rm -rf "$backup_dir"
    
    echo -e "${GREEN}✅ Respaldo creado: ${backup_dir}.tar.gz${NC}"
    ;;

  setup)
    setup_production
    ;;

  kill)
    echo -e "${RED}🛑 Forzando detención de todos los procesos de producción...${NC}"
    # Detener contenedores de producción
    docker-compose -f $COMPOSE_FILE down --remove-orphans
    # Matar procesos específicos de producción si existen
    docker-compose -f $COMPOSE_FILE kill
    # Buscar y matar procesos que puedan estar usando los puertos
    echo -e "${YELLOW}Verificando puertos en uso...${NC}"
    if lsof -ti:5000 &>/dev/null; then
      echo -e "${YELLOW}Matando procesos en puerto 5000...${NC}"
      kill -9 $(lsof -ti:5000) 2>/dev/null || true
    fi
    if lsof -ti:3000 &>/dev/null; then
      echo -e "${YELLOW}Matando procesos en puerto 3000...${NC}"
      kill -9 $(lsof -ti:3000) 2>/dev/null || true
    fi
    # Limpiar contenedores detenidos
    docker container prune -f
    echo -e "${GREEN}✅ Todos los procesos de producción han sido detenidos${NC}"
    ;;

  *)
    usage
    ;;

esac

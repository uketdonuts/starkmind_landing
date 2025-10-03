#!/usr/bin/env bash
# Script de despliegue en desarrollo para StarkMind Landing

set -e

COMPOSE_FILE="docker-compose.dev.yml"

function usage() {
  echo "Uso: $0 {dev|logs-dev|clean|kill}"
  echo ""
  echo "Comandos disponibles:"
  echo "  dev       - Iniciar entorno de desarrollo"
  echo "  logs-dev  - Mostrar logs del entorno de desarrollo"
  echo "  clean     - Limpiar contenedores y volúmenes de desarrollo"
  echo "  kill      - Forzar detención de todos los procesos de desarrollo"
  exit 1
}

case "$1" in
  dev)
    echo "Iniciando entorno de desarrollo..."
    docker-compose -f $COMPOSE_FILE up --build
    ;;

  logs-dev)
    echo "Mostrando logs del entorno de desarrollo..."
    docker-compose -f $COMPOSE_FILE logs -f
    ;;

  clean)
    echo "Limpiando contenedores y volúmenes de desarrollo..."
    docker-compose -f $COMPOSE_FILE down -v --remove-orphans
    ;;

  kill)
    echo "🛑 Forzando detención de todos los procesos de desarrollo..."
    # Detener contenedores de desarrollo
    docker-compose -f $COMPOSE_FILE down --remove-orphans
    # Matar procesos específicos de desarrollo si existen
    docker-compose -f $COMPOSE_FILE kill
    # Limpiar contenedores detenidos
    docker container prune -f
    echo "✅ Todos los procesos de desarrollo han sido detenidos"
    ;;

  *)
    usage
    ;;

esac
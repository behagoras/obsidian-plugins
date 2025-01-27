#!/bin/bash

# Verifica si se proporcionó OUTPUT_DIR como argumento o variable de entorno
if [ -z "$OUTPUT_DIR" ] && [ -z "$1" ]; then
  echo 'Error: Provide OUTPUT_DIR as an argument or environment variable'
  exit 1
fi

# Log the first argument
echo "First argument: $1"

# # Asigna OUTPUT_DIR
# OUTPUT_DIR=${1:-$OUTPUT_DIR}

# # Ejecuta los comandos
OUTPUT_DIR=${1:-$OUTPUT_DIR} npm run build && OUTPUT_DIR=${1:-$OUTPUT_DIR} npm run move && OUTPUT_DIR=${1:-$OUTPUT_DIR} npm run deploy
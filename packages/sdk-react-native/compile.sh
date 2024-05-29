#!/usr/bin/env bash

# Directory to write generated code to (.js and .d.ts files)
OUT_DIR="./compiled"
mkdir -p ${OUT_DIR}

pnpm pbjs \
  -t="static-module" \
  -w="commonjs" \
  -o="${OUT_DIR}/index.js" \
  --force-long \
  proto/*.proto

pnpm pbts \
  -o="${OUT_DIR}/index.d.ts" \
  ${OUT_DIR}/*.js

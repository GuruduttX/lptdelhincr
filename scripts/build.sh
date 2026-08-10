#!/bin/bash
vite build

if [ -d "dist/client" ]; then
  echo "Found dist/client, moving contents to dist..."
  cp -r dist/client/* dist/
elif [ -d ".output/public" ]; then
  echo "Found .output/public, moving contents to dist..."
  mkdir -p dist
  cp -r .output/public/* dist/
elif [ -d ".vercel/output/static" ]; then
  echo "Found .vercel/output/static, moving contents to dist..."
  mkdir -p dist
  cp -r .vercel/output/static/* dist/
fi

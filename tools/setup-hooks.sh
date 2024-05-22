#!/usr/bin/env sh

if ! command -v pre-commit &> /dev/null; then
  echo "pre-commit not found. Installing..."
  if command -v pip &> /dev/null; then
    pip install pre-commit
  elif command -v pip3 &> /dev/null; then
    pip3 install pre-commit
  else
    echo "pip not found. Please install pip or pre-commit manually."
    exit 1
  fi
fi

pre-commit install --install-hooks

echo "Installation complete. Pre-commit is ready to use."

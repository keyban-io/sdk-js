#!/usr/bin/env sh

# Set up pre-commit hooks
install_pre_commit() {
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
}

install_commitlint() {
    # Navigate to the commitlint tools directory
  cd tools/commitlint

  # Check if pnpm is available and install dependencies
  if ! command -v pnpm &> /dev/null; then
    echo "pnpm not found. Installing..."
    npm install -g pnpm
  fi

  pnpm install
}

install_pre_commit
install_commitlint

echo "Installation complete. Pre-commit and Commitlint are ready to use."

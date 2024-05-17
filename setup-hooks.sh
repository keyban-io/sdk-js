#!/usr/bin/env sh

# Set up the hooks path
git config core.hooksPath .githooks

install_gitleaks() {
    if ! command -v gitleaks &> /dev/null; then
  echo "Gitleaks not found. Installing..."

  # Determine the OS and architecture
  OS=$(uname | tr '[:upper:]' '[:lower:]')
  ARCH=$(uname -m)

  case "$OS" in
    "darwin")
      OS="darwin"
      case "$ARCH" in
        "arm64")
          ARCH="arm64"
          ;;
        "x86_64")
          ARCH="x64"
          ;;
        *)
          echo "Unsupported architecture: $ARCH for OS: $OS"
          exit 1
          ;;
      esac
      ;;
    "linux")
      OS="linux"
      case "$ARCH" in
        "aarch64")
          ARCH="arm64"
          ;;
        "armv6l")
          ARCH="armv6"
          ;;
        "armv7l")
          ARCH="armv7"
          ;;
        "i686")
          ARCH="x32"
          ;;
        "x86_64")
          ARCH="x64"
          ;;
        *)
          echo "Unsupported architecture: $ARCH for OS: $OS"
          exit 1
          ;;
      esac
      ;;
    *)
      echo "Unsupported OS: $OS"
      exit 1
      ;;
  esac

  # Fetch the latest release version from GitHub API
  LATEST_RELEASE=$(curl -s https://api.github.com/repos/gitleaks/gitleaks/releases/latest | jq -r .tag_name | sed 's/^v//')


  if [ -z "$LATEST_RELEASE" ]; then
    echo "Failed to fetch the latest release version."
    exit 1
  fi

  # Construct the download URL
  URL="https://github.com/gitleaks/gitleaks/releases/download/v${LATEST_RELEASE}/gitleaks_${LATEST_RELEASE}_${OS}_${ARCH}.tar.gz"

  echo "Download URL: $URL"

  # Download and extract Gitleaks
  if curl -sSfL "$URL" | tar -xz -C /usr/local/bin gitleaks; then
    echo "Installation complete. Gitleaks ready to use."
  else
    echo "Failed to download or extract Gitleaks."
    exit 1
  fi
fi
}

install_commitlint() {
    # Navigate to the commitlint tools directory
cd tools/commitlint

# Check if npx and commitlint are available
if ! command -v npx &> /dev/null || [ ! -d "node_modules" ]; then
  echo "npx or commitlint not found. Installing..."
  pnpm install
fi
}

install_gitleaks
install_commitlint

echo "Installation complete. Gitleaks and Commitlint are ready to use."

# Create new directories
mkdir -p src/assets/images src/assets/fonts src/components/Modal src/pages/WalletDashboard src/pages/QRCodePage

# Move files
mv src/Modal.tsx src/components/Modal/Modal.tsx
mv src/Modal.css src/components/Modal/Modal.css
mv src/pages/WalletDashboard.tsx src/pages/WalletDashboard/WalletDashboard.tsx
mv src/pages/WalletDashboard.css src/pages/WalletDashboard/WalletDashboard.css
mv src/pages/QRCodePage.tsx src/pages/QRCodePage/QRCodePage.tsx
mv src/pages/QRCodePage.css src/pages/QRCodePage/QRCodePage.css
mv public/keyban-logo-small.svg src/assets/images/
mv public/keyban-logo.svg src/assets/images/
mv public/logo.svg src/assets/images/
mv public/fonts/outfit/Outfit-VariableFont_wght.ttf src/assets/fonts/

# Keyban MUI Theme

**Keyban MUI Theme** is a custom Material UI (MUI) theme, specifically designed for Keyban projects. It provides a light theme with customized typography and color palette settings.

## Installation

To install the theme via npm, run the following command:

```bash
npm install @keyban/mui-theme
```

## Usage

After installing the package, you can integrate the theme into your MUI-based React project as follows:

```tsx
import { ThemeProvider } from '@mui/material/styles';
import KeybanTheme from '@keyban/mui-theme';
import CssBaseline from '@mui/material/CssBaseline';

function App() {
  return (
    <ThemeProvider theme={KeybanTheme}>
      <CssBaseline />
      {/* Your application components */}
    </ThemeProvider>
  );
}

export default App;
```

### Accessing Colors and Typography

To access theme properties like colors or typography, use MUI's `useTheme` hook. Here's an example of how to access the color palette:

```tsx
import { useTheme } from '@mui/material/styles';

function MyComponent() {
  const theme = useTheme();

  return (
    <div style={{ backgroundColor: theme.palette.success.main }}>
      {/* Your component content */}
    </div>
  );
}
```

### Custom Typography

The theme also includes custom typography settings. You can access different typography styles in a similar way:

```tsx
const theme = useTheme();
console.log(theme.typography.h1); // Access the styling for h1 headers
```

# Keyban MUI Theme

This is a custom MUI (Material UI) theme developed for Keyban projects. It provides a light theme with custom typography and palette settings.

## Installation

Install the theme via npm:

```js
npm install @keyban/mui-theme
```

## Usage

After installing the package, you can use the theme in your MUI-based React project as follows:

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

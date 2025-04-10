import { CssBaseline, GlobalStyles, ThemeProvider } from "@mui/material";
import { RefineThemes } from "@refinedev/mui";
import React from "react";

// eslint-disable-next-line react-refresh/only-export-components
export enum ColorMode {
  Light = "light",
  Dark = "dark",
}

type ColorModeContextType = {
  mode: ColorMode;
  toggleMode: () => void;
};

const getSystemPreference = () =>
  window?.matchMedia("(prefers-color-scheme: dark)").matches
    ? ColorMode.Dark
    : ColorMode.Light;

const ColorModeContext = React.createContext<ColorModeContextType>({
  mode: getSystemPreference(),
  toggleMode: () => {},
});

export function AppThemeProvider({ children }: React.PropsWithChildren) {
  const userPreference = localStorage.getItem("colorMode") as ColorMode | null;

  const [mode, setMode] = React.useState<ColorMode>(
    userPreference ?? getSystemPreference(),
  );

  React.useEffect(() => {
    window.localStorage.setItem("colorMode", mode);
  }, [mode]);

  const toggleMode = () =>
    setMode(
      (mode) =>
        ({
          [ColorMode.Light]: ColorMode.Dark,
          [ColorMode.Dark]: ColorMode.Light,
        })[mode],
    );

  const theme = {
    [ColorMode.Light]: RefineThemes.Blue,
    [ColorMode.Dark]: RefineThemes.BlueDark,
  }[mode];

  return (
    <ColorModeContext.Provider value={{ toggleMode, mode }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <GlobalStyles styles={{ html: { WebkitFontSmoothing: "auto" } }} />

        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useColorMode() {
  return React.useContext(ColorModeContext);
}

import { AppRouter } from "@/lib/router";
import { AppThemeProvider } from "@/lib/theme";

export default function App() {
  return (
    <AppThemeProvider>
      <AppRouter />
    </AppThemeProvider>
  );
}

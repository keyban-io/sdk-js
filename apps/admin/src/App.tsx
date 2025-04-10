import { Outlet } from "react-router";

import { AppAuthProvider } from "~/lib/auth";
import { AppIntlProvider } from "~/lib/intl";
import { RefineProvider } from "~/lib/refine";
import { AppRouter } from "~/lib/router";
import { AppThemeProvider } from "~/lib/theme";

export default function App() {
  return (
    <AppIntlProvider>
      <AppThemeProvider>
        <AppAuthProvider>
          <AppRouter>
            <RefineProvider>
              <Outlet />
            </RefineProvider>
          </AppRouter>
        </AppAuthProvider>
      </AppThemeProvider>
    </AppIntlProvider>
  );
}

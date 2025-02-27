// in src/App.tsx
import { Admin, Resource } from "react-admin";
import { dataProvider } from "./dataProvider";
import UserList from "./pages/users/user-list";
import PersonIcon from "@mui/icons-material/Person";
import Dashboard from "./pages/dashboard";
// import { authProvider } from "./authProvider";
import { Auth0AuthProvider } from "ra-auth-auth0";
import { Auth0Client } from "@auth0/auth0-spa-js";
import { BrowserRouter } from "react-router-dom";

const auth0 = new Auth0Client({
  domain: import.meta.env.VITE_AUTH0_DOMAIN,
  clientId: import.meta.env.VITE_AUTH0_CLIENT_ID,
  cacheLocation: "localstorage",
  authorizationParams: {
    audience: import.meta.env.VITE_AUTH0_AUDIENCE,
  },
});

const authProvider = Auth0AuthProvider(auth0, {
  loginRedirectUri: import.meta.env.VITE_LOGIN_REDIRECT_URL,
  logoutRedirectUri: import.meta.env.VITE_LOGOUT_REDIRECT_URL,
});
export const App = () => (
  <BrowserRouter>
    <Admin
      dataProvider={dataProvider}
      dashboard={Dashboard}
      authProvider={authProvider}
    >
      + <Resource name="users" list={UserList} icon={PersonIcon} />
    </Admin>
  </BrowserRouter>
);

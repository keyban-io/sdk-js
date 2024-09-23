import ReactDOM from 'react-dom';

import { Auth0Provider } from '@auth0/auth0-react';

import App from './App';
import config from './config';

ReactDOM.render(
  <Auth0Provider
    domain={config.auth.domain}
    clientId={config.auth.clientId}
    authorizationParams={{
      redirect_uri: window.location.origin,
      audience: config.auth.audience,
    }}
  >
    <App />
  </Auth0Provider>,
  document.getElementById("root"),
);

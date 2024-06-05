import { backendEndpoint } from '~/utils/constants';

export const healthCheck = () => {
  return fetch(`${backendEndpoint}/api/health`, { method: 'GET' });
};

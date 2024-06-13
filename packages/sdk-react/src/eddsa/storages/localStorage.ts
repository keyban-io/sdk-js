import type { ClientShare, StorageProviderApi } from '@keyban/sdk-base';

export class KeybanLocalStorage implements StorageProviderApi {
  constructor() {
    if (!localStorage) {
      throw new Error("Your environment doesn't support localStorage web API");
    }
  }

  get(key: string): Promise<ClientShare | undefined> {
    const value = localStorage.getItem(key);
    if (!value) {
      return Promise.resolve(undefined);
    }
    const savedShares = JSON.parse(value) as ClientShare;
    return Promise.resolve(savedShares);
  }

  save(key: string, share: ClientShare): Promise<boolean> {
    localStorage.setItem(key, JSON.stringify(share));
    return Promise.resolve(true);
  }
}

import type { StorageProviderApi } from '@keyban/sdk-base';

export class KeybanLocalStorage implements StorageProviderApi {
  constructor() {
    if (!localStorage) {
      throw new Error("Your environment doesn't support localStorage web API");
    }
  }

  get(key: string): Promise<string> {
    const value = localStorage.getItem(key);
    return Promise.resolve(value ?? '');
  }

  save(key: string, payload: string): Promise<boolean> {
    localStorage.setItem(key, payload);
    return Promise.resolve(true);
  }
}

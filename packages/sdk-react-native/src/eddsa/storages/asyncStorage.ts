import type { StorageProviderApi } from '@keyban/sdk-base';
import type { ClientShare } from '@keyban/sdk-base';
import AsyncStorage from '@react-native-async-storage/async-storage';

export class KeybanAsyncStorage implements StorageProviderApi {
  async get(key: string): Promise<ClientShare | undefined> {
    const value = await AsyncStorage.getItem(key);
    if (!value) {
      return undefined;
    }
    const share = JSON.parse(value) as ClientShare;
    return share;
  }

  async save(key: string, share: ClientShare): Promise<boolean> {
    await AsyncStorage.setItem(key, JSON.stringify(share));
    return true;
  }
}

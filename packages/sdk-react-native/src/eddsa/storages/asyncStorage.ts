import type { StorageProviderApi } from "@keyban/sdk-base";
import AsyncStorage from "@react-native-async-storage/async-storage";

export class KeybanAsyncStorage implements StorageProviderApi {
  async get(key: string): Promise<string | undefined> {
    const value = await AsyncStorage.getItem(key);
    return value ?? undefined;
  }

  async save(key: string, payload: string): Promise<boolean> {
    await AsyncStorage.setItem(key, payload);
    return true;
  }
}

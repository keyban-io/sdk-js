export interface KeybanStorage {
  get: (key: string, password?: string) => Promise<string | null>;
  set: (key: string, value: string, password?: string) => Promise<void>;
}

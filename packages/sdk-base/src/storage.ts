export interface KeybanStorage<T> {
  get: (key: string, password?: string) => Promise<T | undefined>;
  set: (key: string, share: T, password?: string) => Promise<boolean>;
}

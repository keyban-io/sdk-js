export interface KeybanStorage<in out T> {
  get: (key: string, password?: string) => Promise<T | undefined>;
  set: (key: string, share: T, password?: string) => Promise<boolean>;
}

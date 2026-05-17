export interface RuntimeStateStore {
  put(key: string, value: unknown): Promise<void>;
  get<TValue>(key: string): Promise<TValue | undefined>;
}

export class InMemoryRuntimeStateStore implements RuntimeStateStore {
  private readonly store = new Map<string, unknown>();

  public async put(key: string, value: unknown): Promise<void> {
    this.store.set(key, value);
  }

  public async get<TValue>(key: string): Promise<TValue | undefined> {
    return this.store.get(key) as TValue | undefined;
  }
}

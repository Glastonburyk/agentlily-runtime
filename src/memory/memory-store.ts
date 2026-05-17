export interface MemoryEntry {
  agentId: string;
  taskId: string;
  input: string;
  output: unknown;
  recordedAt: string;
}

export interface MemoryStore {
  append(entry: MemoryEntry): Promise<void>;
  listByAgent(agentId: string): Promise<MemoryEntry[]>;
}

export class InMemoryMemoryStore implements MemoryStore {
  private readonly entries: MemoryEntry[] = [];

  public async append(entry: MemoryEntry): Promise<void> {
    this.entries.push(entry);
  }

  public async listByAgent(agentId: string): Promise<MemoryEntry[]> {
    return this.entries.filter((entry) => entry.agentId === agentId);
  }
}

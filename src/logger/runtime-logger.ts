export interface RuntimeLogger {
  info(message: string, metadata?: Record<string, unknown>): void;
  error(message: string, metadata?: Record<string, unknown>): void;
}

export class ConsoleRuntimeLogger implements RuntimeLogger {
  public info(message: string, metadata?: Record<string, unknown>): void {
    console.info(message, metadata ?? {});
  }

  public error(message: string, metadata?: Record<string, unknown>): void {
    console.error(message, metadata ?? {});
  }
}

export class InMemoryRuntimeLogger implements RuntimeLogger {
  public readonly entries: Array<{
    level: "info" | "error";
    message: string;
    metadata: Record<string, unknown> | undefined;
  }> = [];

  public info(message: string, metadata?: Record<string, unknown>): void {
    this.entries.push({ level: "info", message, metadata });
  }

  public error(message: string, metadata?: Record<string, unknown>): void {
    this.entries.push({ level: "error", message, metadata });
  }
}

import type { AgentInstance } from "../agents/agent-instance-manager.js";
import type { MemoryStore } from "../memory/memory-store.js";
import type { ModelProvider } from "../providers/model-provider.js";
import type { RuntimeStateStore } from "../state/runtime-state.js";

export interface RuntimeContext {
  runtimeId: string;
  taskId: string;
  agent: AgentInstance;
  memory: MemoryStore;
  modelProvider: ModelProvider;
  state: RuntimeStateStore;
  now: string;
}

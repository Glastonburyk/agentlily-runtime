import { assertNonEmptyValue } from "../guards/runtime-guards.js";

export interface AgentInstance {
  agentId: string;
  createdAt: string;
}

export class AgentInstanceManager {
  private readonly instances = new Map<string, AgentInstance>();

  public getOrCreate(agentId: string): AgentInstance {
    assertNonEmptyValue(agentId, "agentId");

    const existing = this.instances.get(agentId);
    if (existing) {
      return existing;
    }

    const created = {
      agentId,
      createdAt: new Date().toISOString()
    };

    this.instances.set(agentId, created);
    return created;
  }

  public list(): AgentInstance[] {
    return [...this.instances.values()];
  }
}

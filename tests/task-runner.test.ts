import { describe, expect, it } from "vitest";
import {
  ActionExecutor,
  AgentInstanceManager,
  InMemoryMemoryStore,
  TaskRunner,
  ToolRegistry,
  UnconfiguredModelProvider,
  InMemoryRuntimeStateStore
} from "../src/index.js";

describe("TaskRunner", () => {
  it("wraps unexpected tool failures in EXECUTION_FAILED", async () => {
    const toolRegistry = new ToolRegistry();
    toolRegistry.register({
      name: "explode",
      description: "Throws unexpectedly",
      execute() {
        throw new Error("boom");
      }
    });

    const runner = new TaskRunner(
      new ActionExecutor(toolRegistry),
      new InMemoryMemoryStore()
    );
    const agent = new AgentInstanceManager().getOrCreate("agent-1");

    await expect(
      runner.run(
        {
          taskId: "task-5",
          agentId: "agent-1",
          toolName: "explode",
          input: "Trigger failure",
          payload: {}
        },
        {
          runtimeId: "runtime-1",
          taskId: "task-5",
          agent,
          memory: new InMemoryMemoryStore(),
          modelProvider: new UnconfiguredModelProvider(),
          state: new InMemoryRuntimeStateStore(),
          now: new Date().toISOString()
        }
      )
    ).rejects.toMatchObject({
      code: "EXECUTION_FAILED"
    });
  });
});

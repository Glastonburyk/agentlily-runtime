import { describe, expect, it } from "vitest";
import { RuntimeError, ToolRegistry } from "../src/index.js";

describe("ToolRegistry", () => {
  it("prevents duplicate tool names", () => {
    const registry = new ToolRegistry();
    const tool = {
      name: "echo",
      description: "Echo tool",
      execute() {
        return "ok";
      }
    };

    registry.register(tool);

    expect(() => registry.register(tool)).toThrowError(RuntimeError);
    expect(() => registry.register(tool)).toThrow(/already registered/);
  });
});

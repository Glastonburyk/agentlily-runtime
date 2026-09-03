import { describe, expect, it, vi } from "vitest";
import { RuntimeEventBus } from "../src/index.js";

describe("RuntimeEventBus", () => {
  it("tracks listener counts and updates them when unsubscribed", () => {
    const eventBus = new RuntimeEventBus();
    const unsubscribe = eventBus.on("runtime.started", vi.fn());

    expect(eventBus.listenerCount("runtime.started")).toBe(1);
    expect(eventBus.listenerCount("runtime.task.failed")).toBe(0);

    unsubscribe();
    expect(eventBus.listenerCount("runtime.started")).toBe(0);
  });

  it("warns before exceeding the configured per-event limit", () => {
    const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});
    const eventBus = new RuntimeEventBus({ maxListeners: 1 });
    eventBus.on("runtime.started", vi.fn());

    // The second distinct listener triggers a warning but is still registered.
    expect(() => eventBus.on("runtime.started", vi.fn())).not.toThrow();
    expect(warnSpy).toHaveBeenCalledTimes(1);
    expect(eventBus.listenerCount("runtime.started")).toBe(2);

    // The limit applies independently to each event name.
    expect(() => eventBus.on("runtime.task.failed", vi.fn())).not.toThrow();

    warnSpy.mockRestore();
  });

  it("does not re-add the same listener when it is already registered", () => {
    const eventBus = new RuntimeEventBus({ maxListeners: 1 });
    const listener = vi.fn();

    eventBus.on("runtime.started", listener);
    expect(() => eventBus.on("runtime.started", listener)).not.toThrow();
    expect(eventBus.listenerCount("runtime.started")).toBe(1);
  });

  it.each([0, -1, 1.5, Number.NaN])(
    "rejects invalid maxListeners value %s",
    (maxListeners) => {
      expect(() => new RuntimeEventBus({ maxListeners })).toThrow(RangeError);
    }
  );
});

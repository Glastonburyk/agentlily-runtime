import type { RuntimeContext } from "../runtime/context.js";

export interface ToolInvocation<TPayload = unknown> {
  payload: TPayload;
  context: RuntimeContext;
}

export interface ToolDefinition<TPayload = unknown, TResult = unknown> {
  name: string;
  description: string;
  execute(input: ToolInvocation<TPayload>): Promise<TResult> | TResult;
}

export interface ModelPrompt {
  instructions: string;
  input: string;
}

export interface ModelResponse {
  outputText: string;
  metadata?: Record<string, unknown>;
}

export interface ModelProvider {
  readonly name: string;
  generate(prompt: ModelPrompt): Promise<ModelResponse>;
}

export class UnconfiguredModelProvider implements ModelProvider {
  public readonly name = "unconfigured";

  public async generate(): Promise<ModelResponse> {
    return {
      outputText:
        "No model provider is configured. Contributors can implement one behind the ModelProvider interface."
    };
  }
}

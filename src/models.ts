export interface TraeModelDefinition {
  id: string
  name: string
  attachment: boolean
  reasoning: boolean
  temperature: boolean
  tool_call: boolean
  cost: {
    input: number
    output: number
    cache_read: number
    cache_write: number
  }
  limit: {
    context: number
    output: number
  }
}

export const TRAE_CLOUD_MODEL_IDS = [
  'Doubao-Seed-Code',
  'GLM-5.1',
  'GLM-5.2',
  'MiniMax-M2.7',
  'Kimi-K2.6',
  'Kimi-K2.7-Code',
  'DeepSeek-V4-Pro',
  'Qwen3.7-Plus',
] as const

const TEXT_ONLY_CAPABILITIES = {
  attachment: false,
  reasoning: false,
  temperature: false,
  tool_call: false,
} as const

export const TRAE_MODELS: Record<string, TraeModelDefinition> = Object.fromEntries(
  TRAE_CLOUD_MODEL_IDS.map((id) => [id, createTraeModelDefinition(id)]),
)

export const DEFAULT_MODEL_ID = 'GLM-5.1'

export function getModelById(id: string): TraeModelDefinition | undefined {
  return TRAE_MODELS[id]
}

export function createTraeModelDefinition(id: string, description?: string, contextWindow?: number): TraeModelDefinition {
  return {
    id,
    name: description || id,
    ...TEXT_ONLY_CAPABILITIES,
    cost: { input: 0, output: 0, cache_read: 0, cache_write: 0 },
    limit: { context: contextWindow ?? 128000, output: 8192 },
  }
}

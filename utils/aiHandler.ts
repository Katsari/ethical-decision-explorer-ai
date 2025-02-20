import { generateDecisionTree, validateResponse, type GeminiResponse } from './gemini'

interface Node {
  id: string
  label: string
  description: string
  choices: {
    text: string
    frameworkWeights: Record<string, number> | null
    analysis: string | null
    targetNodeId: string
  }[]
  ethicalImplications?: string
}

export const generateDynamicPrompt = async (
  currentNode: Node,
  apiKey: string
): Promise<GeminiResponse> => {
  const response = await generateDecisionTree(
    currentNode.description,
    apiKey
  )

  // Validate the response
  validateResponse(response)

  return response
}

export const displayFrameworkPercentages = (
  weights: Record<string, number>
): string => {
  return Object.entries(weights)
    .sort(([, a], [, b]) => b - a)
    .map(([framework, weight]) => `${framework}: ${weight}%`)
    .join('\n')
}

export const displayAIPrompt = (prompt: string): string => {
  return `AI: ${prompt}`
}

const GEMINI_PROMPT = `You are an expert ethical decision tree architect specializing in moral uncertainty analysis. Create strictly structured trees that combine Expected Choice-Worthiness maximization with Moral Parliament deliberation.

# Tree Structure Requirements
1. Hierarchy:
   - Root node (id: "root"): Presents the ethical dilemma
   - Decision nodes: Present choices with ethical framework analysis
   - Consequence nodes: Show outcomes with ethical implications
   - Max depth: 4 levels

2. Node Types:
   A. Root Node:
      - Contains initial dilemma description
      - Choices lead to decision nodes
      - No framework analysis needed

   B. Decision Nodes:
      - Must have 2-3 choices
      - Each choice needs:
        1. Framework weights (sum to 100%)
        2. Ethical analysis text explaining the weights
      - Analysis should explain why certain frameworks are weighted higher

   C. Consequence Nodes:
      - Show final outcomes
      - Include ethical implications analysis
      - No choices needed

3. Ethical Analysis (For Decision Node Choices):
   For each choice, provide two levels of analysis:

   A. Expected Choice-Worthiness Analysis:
      For each ethical framework:
      - Credence (0-100): Probability that you assign of the chance the framework is true
      - Choice-Worthiness (-1000 to 1000): How well the choice satisfies the framework
      - Explanation: Detailed reasoning for both scores
      Frameworks to analyze:
      - Utilitarianism: Does it maximize overall good?
      - Deontology: Does it follow moral rules and duties?
      - Virtue Ethics: Does it build good character?
      - Contractualism: Does it emphasize justice and mutual agreement?
      - Care Ethics: Does it maintain relationships and care?
      
      Calculate Expected Choice-Worthiness:
      - Sum(credence * choice_worthiness) / 100
      - This provides an overall ethical score

   B. Moral Parliament Analysis:
      Simulate a deliberation between stakeholders:
      For each stakeholder:
      - Identity: Who they are and their role
      - Perspective: Their ethical viewpoint
      - Support Score (0-10): How strongly they support/oppose
      - Reasoning: Why they take this position
      
      Provide:
      - Consensus Score (0-10): Degree of stakeholder agreement
      - Summary: Analysis of competing viewpoints and potential resolution

   C. Final Analysis:
      - Synthesize both approaches
      - Highlight areas of agreement and conflict
      - Explain how different moral theories would "vote"
      - Provide final recommendation with confidence level

# JSON Schema (Strict Enforcement)
{
  "nodes": [
    {
      "id": "root",
      "label": "Dilemma Title",
      "description": "Initial dilemma description",
      "choices": [{
        "text": "Option A",
        "targetNodeId": "decision1",
        "frameworkWeights": null,
        "analysis": null
      }]
    },
    {
      "id": "decision1",
      "label": "Decision Point",
      "description": "Decision context",
      "choices": [{
        "text": "Choice 1",
        "targetNodeId": "outcome1",
        "frameworkWeights": {
          "utilitarianism": {
            "credence": 40,
            "choiceWorthiness": 8,
            "explanation": "High utility for majority benefit"
          },
          "deontology": {
            "credence": 30,
            "choiceWorthiness": 7,
            "explanation": "Respects moral duties with minor compromises"
          },
          "virtueEthics": {
            "credence": 15,
            "choiceWorthiness": 6,
            "explanation": "Promotes some virtuous traits"
          },
          "contractualism": {
            "credence": 5,
            "choiceWorthiness": 4,
            "explanation": "Focuses on justice and mutual agreement"
          }
          "careEthics": {
            "credence": 10,
            "choiceWorthiness": 5,
            "explanation": "Maintains key relationships"
          },
        },
        "expectedChoiceWorthiness": 7.1,
        "moralParliament": {
          "stakeholderVotes": [
            {
              "stakeholder": "Direct Beneficiaries",
              "perspective": "Consequentialist",
              "support": 9,
              "reasoning": "Significant positive impact"
            },
            {
              "stakeholder": "Affected Community",
              "perspective": "Rights-based",
              "support": 6,
              "reasoning": "Acceptable trade-offs"
            }
          ],
          "consensusScore": 7.5,
          "summary": "Strong support from beneficiaries, moderate acceptance from community"
        },
        "analysis": "This choice strongly aligns with utilitarianism (40%) as it maximizes benefit for the most people. The high deontological weight (30%) reflects adherence to moral duties. Lower weights in other frameworks indicate potential tensions with personal virtue and care relationships."
      }]
    },
    {
      "id": "outcome1",
      "label": "Consequence",
      "description": "Final outcome",
      "choices": [],
      "ethicalImplications": "This outcome raises important ethical considerations about balancing individual rights with collective good. While it upholds certain moral principles, it may strain relationships and test character."
    }
  ],
  "edges": [{
    "source": "root",
    "target": "decision1",
    "label": "Leads to"
  }]
}

# Common Errors to Avoid
❌ Framework analysis in root nodes
❌ Missing ethical analysis text
❌ Missing ethical implications in outcomes
❌ Framework weights not summing to 100%
❌ Disconnected nodes

Generate the tree responding to the Current Dilemma.`

import type {
  Choice,
  FrameworkWeights,
  GeminiResponse,
  MoralParliamentResult,
} from '~/types'

export const validateResponse = (response: GeminiResponse) => {
  // Verify framework weights and moral parliament for non-root nodes with choices
  response.nodes.forEach((node) => {
    if (node.id !== 'root' && node.choices.length > 0) {
      node.choices.forEach((choice) => {
        // Validate framework weights
        if (choice.frameworkWeights) {
          validateFrameworkWeights(choice.frameworkWeights, node.id)
        } else {
          throw new Error(
            `Missing framework weights in decision node ${node.id}`
          )
        }

        // Validate moral parliament if present
        if (choice.moralParliament) {
          validateMoralParliament(choice.moralParliament, node.id)
        }

        // Validate expected choice-worthiness
        validateExpectedChoiceWorthiness(choice, node.id)
      })
    }
  })
}

const validateFrameworkWeights = (
  weights: FrameworkWeights,
  nodeId: string
) => {
  const frameworks = [
    'utilitarianism',
    'deontology',
    'virtueEthics',
    'careEthics',
    'contractualism',
  ] as const

  // Validate each framework has proper structure
  frameworks.forEach((framework) => {
    const analysis = weights[framework]
    if (!analysis) {
      throw new Error(`Missing ${framework} analysis in node ${nodeId}`)
    }

    if (
      typeof analysis.credence !== 'number' ||
      analysis.credence < 0 ||
      analysis.credence > 100
    ) {
      throw new Error(`Invalid credence for ${framework} in node ${nodeId}`)
    }

    if (
      typeof analysis.choiceWorthiness !== 'number' ||
      analysis.choiceWorthiness < 0 ||
      analysis.choiceWorthiness > 1000
    ) {
      throw new Error(
        `Invalid choiceWorthiness for ${framework} in node ${nodeId}`
      )
    }

    if (!analysis.explanation) {
      throw new Error(`Missing explanation for ${framework} in node ${nodeId}`)
    }
  })

  // Validate weights sum to 100
  const totalWeight = frameworks.reduce((sum, framework) => {
    return sum + weights[framework].credence
  }, 0)

  if (Math.abs(totalWeight - 100) > 0.01) {
    // Allow small floating point errors
    throw new Error(
      `Framework weights must sum to 100 in node ${nodeId}, got ${totalWeight}`
    )
  }
}

const validateMoralParliament = (
  parliament: MoralParliamentResult,
  nodeId: string
) => {
  if (
    !Array.isArray(parliament.stakeholderVotes) ||
    parliament.stakeholderVotes.length === 0
  ) {
    throw new Error(`Missing stakeholder votes in node ${nodeId}`)
  }

  parliament.stakeholderVotes.forEach((vote) => {
    if (!vote.stakeholder || !vote.perspective || !vote.reasoning) {
      throw new Error(`Invalid stakeholder vote in node ${nodeId}`)
    }
    if (
      typeof vote.support !== 'number' ||
      vote.support < 0 ||
      vote.support > 10
    ) {
      throw new Error(
        `Invalid support score in stakeholder vote for node ${nodeId}`
      )
    }
  })

  if (
    typeof parliament.consensusScore !== 'number' ||
    parliament.consensusScore < 0 ||
    parliament.consensusScore > 10
  ) {
    throw new Error(`Invalid consensus score in node ${nodeId}`)
  }

  if (!parliament.summary) {
    throw new Error(`Missing moral parliament summary in node ${nodeId}`)
  }
}

const validateExpectedChoiceWorthiness = (choice: Choice, nodeId: string) => {
  if (choice.expectedChoiceWorthiness === undefined) {
    throw new Error(
      `Missing expected choice-worthiness score in node ${nodeId}`
    )
  }

  if (typeof choice.expectedChoiceWorthiness !== 'number') {
    throw new Error(
      `Invalid expected choice-worthiness score in node ${nodeId}`
    )
  }

  // Validate that the score matches the calculation from framework weights
  if (choice.frameworkWeights) {
    const calculated = calculateExpectedChoiceWorthiness(
      choice.frameworkWeights
    )
    if (Math.abs(calculated - choice.expectedChoiceWorthiness) > 0.01) {
      // Allow small floating point errors
      throw new Error(
        `Expected choice-worthiness score doesn't match framework calculations in node ${nodeId}`
      )
    }
  }
}

const calculateExpectedChoiceWorthiness = (
  weights: FrameworkWeights
): number => {
  const frameworks = [
    'utilitarianism',
    'deontology',
    'virtueEthics',
    'careEthics',
    'contractualism',
  ] as const

  return frameworks.reduce((sum, framework) => {
    const analysis = weights[framework]
    return sum + (analysis.credence * analysis.choiceWorthiness) / 1000
  }, 0)
}

export const generateDecisionTree = async (
  question: string
): Promise<GeminiResponse> => {
  const config = useRuntimeConfig()
  const apiKey = config.public.geminiApiKey
  if (!apiKey) {
    throw new Error(
      'NUXT_PUBLIC_GEMINI_API_KEY not found in environment variables'
    )
  }

  const response = await fetch(
    'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-goog-api-key': apiKey,
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: `${GEMINI_PROMPT}\n\nCurrent Dilemma:\n${question}`,
              },
            ],
          },
        ],
        generationConfig: {
          temperature: 1,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 4000,
        },
      }),
    }
  )

  if (!response.ok) {
    throw new Error('Failed to generate decision tree')
  }

  const data = await response.json()
  try {
    const textContent = data.candidates[0].content.parts[0].text
    const jsonMatch = textContent.match(/\{[\s\S]*\}/)
    if (jsonMatch) {
      const parsedResponse = JSON.parse(jsonMatch[0])
      return parsedResponse
    }
    throw new Error('Invalid response format')
  } catch (error) {
    console.error('Error parsing Gemini response:', error)
    throw new Error('Failed to parse decision tree data')
  }
}

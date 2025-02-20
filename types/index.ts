export interface FrameworkAnalysis {
  credence: number
  choiceWorthiness: number
  explanation: string
}

export interface FrameworkWeights {
  utilitarianism: FrameworkAnalysis
  deontology: FrameworkAnalysis
  virtueEthics: FrameworkAnalysis
  careEthics: FrameworkAnalysis
  rightsEthics: FrameworkAnalysis
}

export interface StakeholderVote {
  stakeholder: string
  perspective: string
  support: number
  reasoning: string
}

export interface MoralParliamentResult {
  stakeholderVotes: StakeholderVote[]
  consensusScore: number
  summary: string
}

export interface Choice {
  text: string
  frameworkWeights: FrameworkWeights | null
  analysis?: string | null
  targetNodeId: string
  expectedChoiceWorthiness: number
  moralParliament: MoralParliamentResult | null
}

export interface DecisionNode {
  id: string
  label: string
  description: string
  choices?: Choice[]
  ethicalImplications?: string
}

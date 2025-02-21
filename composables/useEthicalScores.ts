import type { FrameworkCredences } from '~/types'

export function useEthicalScores() {
  const frameworkColors = {
    utilitarianism: 'yellow',
    deontology: 'blue',
    virtueEthics: 'green',
    contractualism: 'purple',
    careEthics: 'pink',
  } as const

  const getFrameworkColor = (name: keyof FrameworkCredences) =>
    frameworkColors[name] || 'gray'

  const getChoiceWorthinessColor = (value: number) => {
    if (value >= 500) return 'green'
    if (value >= 0) return 'emerald'
    if (value >= -500) return 'yellow'
    return 'red'
  }

  const getConsensusColor = (value: number) => {
    if (value >= 8) return 'green'
    if (value >= 6) return 'emerald'
    if (value >= 4) return 'yellow'
    return 'red'
  }

  const formatFrameworkName = (name: keyof typeof frameworkColors): string => {
    const nameMap = {
      utilitarianism: 'Utilitarianism',
      deontology: 'Deontology',
      virtueEthics: 'Virtue Ethics',
      contractualism: 'Contractualism',
      careEthics: 'Care Ethics',
    }
    return nameMap[name] || name
  }

  return {
    getFrameworkColor,
    formatFrameworkName,
    getChoiceWorthinessColor,
    getConsensusColor,
  }
}

export function useEthicalScores() {
  function getChoiceWorthinessColor(value: number) {
    if (value >= 500) return 'green'
    if (value >= 0) return 'emerald'
    if (value >= -500) return 'yellow'
    return 'red'
  }

  function getConsensusColor(value: number) {
    if (value >= 8) return 'green'
    if (value >= 6) return 'emerald'
    if (value >= 4) return 'yellow'
    return 'red'
  }

  return {
    getChoiceWorthinessColor,
    getConsensusColor
  }
}

export function calculatePasswordPercentage(force: string): number {
    const forceToPercentageMap: { [key: string]: number } = {
      "Forte": 4,
      "Boa": 3,
      "Média": 2,
      "Fraca": 1,
    };
  
    return forceToPercentageMap[force] || 0;
  }
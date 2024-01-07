export function getColorScheme(forcePass: string): string {
    const forceToColorMap: { [key: string]: string } = {
        "Forte": "emerald",
        "Boa": "yellow",
        "Média": "warning",
    };
    
    // Retorna a cor correspondente ou "red" se não houver correspondência
    return forceToColorMap[forcePass] || "red";
}

export function iconChoice(category: string): string {
    const categoryToIconMap: { [key: string]: string } = {
        "E-mail": "mail",
        "Site": "chrome",
        "Conta Bancária": "briefcase",
        "Cartão": "credit-card",
        "Outros": "more-horizontal",
        // Adicione mais mapeamentos conforme necessário
    };
    return categoryToIconMap[category]
}
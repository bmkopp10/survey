export function capitalizeFirstLetter(word: string): string {
    if (!word) return word;
    return word[0].toUpperCase() + word.substr(1).toLowerCase();
}

export function camelCaseToLabel(label: string): string {
    const result = label.replace(/([A-Z])/g, ' $1');
    return result.charAt(0)
        .toUpperCase() + result.slice(1);
}

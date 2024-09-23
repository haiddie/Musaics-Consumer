export function getInitials(firstAndLastName: string): string {
    if (typeof firstAndLastName !== 'string') {
        console.error('Expected a string as input');
        return '';
    }

    const words = firstAndLastName.split(' ').filter(word => word.trim() !== '');

    if (words.length === 0) {
        return '';
    }

    const firstInitial = words[0][0].toUpperCase();
    const lastInitial = words[words.length - 1][0].toUpperCase();

    return firstInitial + lastInitial;
}

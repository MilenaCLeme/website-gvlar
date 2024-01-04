export function firstWord(text: string) {
  return text.split(' ')[0];
}

export function transformText(text: string | undefined, about: string) {
  if (about === 'property') {
    return text === '' ? 'Imovél' : text;
  }

  if (about === 'user') {
    return text === '' ? 'Função' : text === 'master' || text === 'worker' ? 'ADM' : 'Comum';
  }

  if (about === 'adm') {
    return text;
  }

  if (about === 'order') {
    return text === '' ? 'Ordenar' : text;
  }
}

export function removeLettersAndLimit(str: string): string {
  const numbersOnly = str.replace(/[^\d]/g, ''); // Remove letters, keeping only numbers
  return numbersOnly.slice(0, 4);
}

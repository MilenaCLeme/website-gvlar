export function capitalizeFirstLetter(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export const validateEmail = (email: string) => {
  const regex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
  return regex.test(email);
};

export const validatePhone = (phone: string) => {
  // Aqui, usaremos uma expressão regular (regex) para verificar o formato do número de telefone.
  // Neste exemplo, estamos validando números de telefone brasileiros.
  const regex = /^\([1-9]{2}\) [0-9]{4}-[0-9]{4,5}$/;
  return regex.test(phone);
};

export const validPassword = (password: string): boolean => {
  // Verificar o tamanho mínimo da senha
  if (password.length < 6) {
    return false;
  }

  // Verificar se há pelo menos uma letra maiúscula e uma letra minúscula usando expressões regulares
  const uppercaseRegex = /[A-Z]/;
  const lowercaseRegex = /[a-z]/;
  if (!uppercaseRegex.test(password) || !lowercaseRegex.test(password)) {
    return false;
  }

  // Se passou por todas as verificações, a senha é válida
  return true;
};

export function formatPhoneNumber(phoneNumber: string) {
  // Remover todos os caracteres que não são dígitos
  const digitsOnly = phoneNumber.replace(/\D/g, '');

  // Verificar o comprimento dos dígitos
  if (digitsOnly.length === 11) {
    // Se houver "_" presente, faça a formatação correta
    if (phoneNumber.includes('_')) {
      const formattedNumber = `(${digitsOnly.slice(0, 2)}) ${digitsOnly.slice(
        2,
        7,
      )}-${digitsOnly.slice(7)}`;
      return formattedNumber;
    } else {
      // Caso contrário, apenas coloque o traço no formato padrão
      const formattedNumber = `(${digitsOnly.slice(0, 2)}) ${digitsOnly.slice(
        2,
        6,
      )}-${digitsOnly.slice(6)}`;
      return formattedNumber;
    }
  } else if (digitsOnly.length === 10) {
    // Coloque o traço no quarto dígito no formato padrão
    const formattedNumber = `(${digitsOnly.slice(0, 2)}) ${digitsOnly.slice(
      2,
      6,
    )}-${digitsOnly.slice(6)}`;
    return formattedNumber;
  } else {
    // Caso não seja um número de telefone válido, retorne a string original
    return phoneNumber;
  }
}

export function firstWord(texto: string) {
  return texto.split(' ')[0];
}

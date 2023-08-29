export const validateEmail = (email: string) => {
  const regex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
  return regex.test(email);
};

export const validatePhone = (phone: string) => {
  const regex = /^\([1-9]{2}\) [0-9]{4,5}-[0-9]{4,5}$/;
  return regex.test(phone);
};

export const validatePassword = (password: string = ''): boolean => {
  if (password === '') {
    return true;
  }
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

export function decodeString(encodedInput: string) {
  try {
    const decoded = atob(encodedInput); // Use a função atob() para decodificar de Base64
    return decoded;
  } catch (error) {
    return false;
  }
}

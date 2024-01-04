import { Property, User } from '@/types';

export function filterSearch(array: Property[], word: string) {
  return array.filter(
    ({ about, address, city, state, situation, area }) =>
      about.toLowerCase().indexOf(word.toLowerCase()) !== -1 ||
      address.toLowerCase().indexOf(word.toLowerCase()) !== -1 ||
      city.toLowerCase().indexOf(word.toLowerCase()) !== -1 ||
      state.toLowerCase().indexOf(word.toLowerCase()) !== -1 ||
      situation.toLowerCase().indexOf(word.toLowerCase()) !== -1 ||
      area.toLowerCase().indexOf(word.toLowerCase()) !== -1,
  );
}

export function filterUser(array: User[], word: string) {
  return array.filter(
    ({ name, email }) =>
      name.toLowerCase().indexOf(word.toLowerCase()) !== -1 ||
      email.toLowerCase().indexOf(word.toLowerCase()) !== -1,
  );
}

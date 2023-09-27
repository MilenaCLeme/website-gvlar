import { Property } from '@/types';

export function disabledProperty(property: Property): boolean {
  if (
    property.about === undefined ||
    property.address === undefined ||
    property.area === undefined ||
    property.bathroom === undefined ||
    property.bedroom === undefined ||
    property.business === undefined ||
    property.city === undefined ||
    property.description === undefined ||
    property.footage === undefined ||
    property.garage === undefined ||
    property.iptu === undefined ||
    property.number === undefined ||
    property.state === undefined ||
    property.zipcode === undefined
  ) {
    return true;
  }

  if (
    property.about === '' ||
    property.address === '' ||
    property.area === '' ||
    property.business === '' ||
    property.city === '' ||
    property.description === '' ||
    property.iptu === '' ||
    property.number === '' ||
    property.state === '' ||
    property.zipcode === ''
  ) {
    return true;
  }

  if (
    property.business === 'ambos' &&
    (property.sell === '' ||
      property.sell === undefined ||
      property.rental === '' ||
      property.rental === undefined)
  ) {
    return true;
  }

  if (property.business === 'venda' && (property.sell === '' || property.sell === undefined)) {
    return true;
  }

  if (
    property.business === 'aluguel' &&
    (property.rental === '' || property.rental === undefined)
  ) {
    return true;
  }

  if (property.footage === 0) {
    return true;
  }

  return false;
}

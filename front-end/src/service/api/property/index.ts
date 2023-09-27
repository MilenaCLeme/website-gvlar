import { ErrorAxios, Property } from '@/types';
import api from '../axios-config';

export const createProperty = async (token: string, body: Property) => {
  try {
    const { data } = await api.post<Property>(
      '/properties/fortheclient',
      {
        business: body.business,
        about: body.about,
        sell: body.sell === undefined || body.business === 'aluguel' ? null : body.sell,
        rental: body.rental === undefined || body.business === 'venda' ? null : body.rental,
        iptu: body.iptu,
        description: body.description,
        footage: body.footage,
        bedroom: body.bedroom,
        bathroom: body.bathroom,
        garage: body.garage,
        address: body.address,
        number: body.number,
        complement:
          body.complement === undefined || body.complement === '' ? null : body.complement,
        zipcode: body.zipcode,
        area: body.area,
        city: body.city,
        state: body.state,
        zone: body.zone === undefined || body.zone === '' ? null : body.zone,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );
    return data as Property;
  } catch (error: any) {
    if ('message' in error) {
      return error as ErrorAxios;
    } else {
      console.log('Erro inesperado:', error);
    }
  }
};

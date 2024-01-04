import { Card, ErrorAxios, FilterPageProperty, PageFilter, Property } from '@/types';
import api from '../axios-config';
import { transformarPageFilter, transformationStringinFloat } from '@/functions/transformation';

export const createProperty = async (token: string, body: Property) => {
  try {
    const { data } = await api.post<Property>(
      '/properties/fortheclient',
      {
        business: body.business,
        about: body.about,
        sell:
          body.sell === undefined || body.sell === null || body.business === 'aluguel'
            ? null
            : transformationStringinFloat(body.sell),
        rental:
          body.rental === undefined || body.rental === null || body.business === 'venda'
            ? null
            : transformationStringinFloat(body.rental),
        iptu: transformationStringinFloat(body.iptu),
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

export const updateProperty = async (token: string, body: Property) => {
  try {
    const { data } = await api.patch<Property>(
      `/properties/fortheclient/${body.id}`,
      {
        business: body.business,
        about: body.about,
        sell:
          body.sell === undefined || body.sell === null || body.business === 'aluguel'
            ? null
            : transformationStringinFloat(body.sell),
        rental:
          body.rental === undefined || body.rental === null || body.business === 'venda'
            ? null
            : transformationStringinFloat(body.rental),
        iptu: transformationStringinFloat(body.iptu),
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

export const deleteProperty = async (id: number, token: string) => {
  try {
    const { data } = await api.delete<Property>(`/properties/fortheclient/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return data as Property;
  } catch (error: any) {
    if ('message' in error) {
      return error as ErrorAxios;
    } else {
      console.log('Erro inesperado:', error);
    }
  }
};

export const getAllPropertiesUser = async (id: number, token: string) => {
  try {
    const { data } = await api.get<Property[]>(`/properties/list/client/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return data as Property[];
  } catch (error: any) {
    if ('message' in error) {
      return error as ErrorAxios;
    } else {
      console.log('Erro inesperado:', error);
    }
  }
};

export const updatePropertyMaster = async (token: string, body: Property) => {
  try {
    const { data } = await api.patch<Property>(
      `/properties/${body.id}`,
      {
        published: body.situation === 'liberado' ? true : false,
        situation: body.situation,
        business: body.business,
        about: body.about,
        sell:
          body.sell === undefined || body.sell === null || body.business === 'aluguel'
            ? null
            : transformationStringinFloat(body.sell),
        rental:
          body.rental === undefined || body.rental === null || body.business === 'venda'
            ? null
            : transformationStringinFloat(body.rental),
        iptu: transformationStringinFloat(body.iptu),
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

export const deletePropertyMaster = async (id: number, token: string) => {
  try {
    const { data } = await api.delete<Property>(`/properties/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return data as Property;
  } catch (error: any) {
    if ('message' in error) {
      return error as ErrorAxios;
    } else {
      console.log('Erro inesperado:', error);
    }
  }
};

export const pageWithFilter = async (page: number, body: FilterPageProperty) => {
  try {
    const filter = transformarPageFilter(body);
    const { data } = await api.post<PageFilter>(`/properties/pagewithfilter/${page}`, {
      ...filter,
    });

    return data as PageFilter;
  } catch (error: any) {
    if ('message' in error) {
      return error as ErrorAxios;
    } else {
      console.log('Erro inesperado:', error);
    }
  }
};

export const pageId = async (id: number) => {
  try {
    const { data } = await api.get<Card>(`/properties/pageproperty/${id}`);

    return data as Card;
  } catch (error: any) {
    if ('message' in error) {
      return error as ErrorAxios;
    } else {
      console.log('Erro inesperado:', error);
    }
  }
};

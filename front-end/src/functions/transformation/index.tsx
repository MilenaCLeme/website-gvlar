import { FilterPageProperty, Property } from '@/types';

export const transformationStringinFloat = (numberString: any) => {
  return parseFloat(numberString.replace(/\./g, '').replace(',', '.'));
};

export const transformationFloatString = (number: any): string => {
  return number.toLocaleString('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

export const transformarProperty = (property: Property): Property => {
  const data = property;
  if (data.iptu) {
    data.iptu = transformationFloatString(data.iptu);
  }

  if (!(data.rental === null)) {
    data.rental = transformationFloatString(data.rental);
  }

  if (!(data.sell === null)) {
    data.sell = transformationFloatString(data.sell);
  }

  return data;
};

export const transformarPageFilter = (filter: FilterPageProperty): FilterPageProperty => {
  const data = filter;

  const newFilter: any = {};

  if (data.maxV && !(data.maxV === '')) {
    data.maxV = transformationStringinFloat(data.maxV);
  }

  if (data.minV && !(data.minV === '')) {
    data.minV = transformationStringinFloat(data.minV);
  }

  const arrays = Object.entries(filter);

  if (arrays.length === 0) {
    return {};
  }

  arrays.map((obj: [string, string]) => {
    if (!(obj[1] === '' || obj[1] === undefined || obj[1] === null)) {
      newFilter[`${obj[0]}`] = obj[1];
    }
  });

  return newFilter;
};

export const shrinkingObjectFilters = (
  filter: FilterPageProperty,
  key: string[],
): FilterPageProperty => {
  const arrays = Object.entries(filter);

  const newFilter: any = {};

  arrays.map((obj: [string, string]) => {
    if (!(key.filter((string) => obj[0] === string).length > 0)) {
      newFilter[`${obj[0]}`] = obj[1];
    }
  });

  return newFilter;
};

export const shrinkingObjectFiltersTransform = (filter: FilterPageProperty): FilterPageProperty => {
  const arrays = Object.entries(filter);

  const newFilter: any = {};

  arrays.map((obj: [string, string]) => {
    if (!(obj[1] === '' || obj[1] === undefined || obj[1] === null)) {
      newFilter[`${obj[0]}`] = obj[1];
    }
  });

  return newFilter;
};

type MyArrayType = [string[], string];

export const transformationFiltersArrays = (filter: FilterPageProperty): MyArrayType[] => {
  const newArray: MyArrayType[] = [];

  if (filter.business) {
    const name: string = filter.business === 'ambos' ? 'Venda e Aluguel' : filter.business;
    newArray.push([['business'], name]);
  }

  if (filter.about) {
    newArray.push([['about'], filter.about]);
  }

  if (filter.maxV || filter.minV) {
    newArray.push([
      ['maxV', 'minV'],
      `R$ ${filter.minV ? filter.minV : '  '} - R$ ${filter.maxV ? filter.maxV : '  '}`,
    ]);
  }

  if (filter.minFoo || filter.maxFoo) {
    newArray.push([
      ['minFoo', 'maxFoo'],
      `${filter.minFoo ? filter.minFoo : '  '} m² - ${filter.maxFoo ? filter.maxFoo : '  '}  m²`,
    ]);
  }

  if (filter.garage) {
    newArray.push([['garage'], `Vagas - ${filter.garage}`]);
  }

  if (filter.bathroom) {
    newArray.push([['bathroom'], `Banheiros - ${filter.bathroom}`]);
  }

  if (filter.bedroom) {
    newArray.push([['bedroom'], `Quartos - ${filter.bedroom}`]);
  }

  if (filter.order) {
    newArray.push([['order'], `Ordenado por: ${filter.order}`]);
  }

  return newArray;
};

export const transformationEmailForGvLar = (filter: FilterPageProperty) => {
  let newArray = '';

  if (filter.business) {
    const name: string = filter.business === 'ambos' ? 'Venda e Aluguel' : filter.business;
    newArray = newArray + `Tipo de negocio: ${name}.`;
  }

  if (filter.about) {
    newArray = newArray + `Tipo de Imovél: ${filter.about}.`;
  }

  if (filter.maxV || filter.minV) {
    newArray =
      newArray +
      `Valor do Imóvel: R$ ${filter.minV ? filter.minV : '  '} - R$ ${
        filter.maxV ? filter.maxV : '  '
      }.`;
  }

  if (filter.minFoo || filter.maxFoo) {
    newArray =
      newArray +
      `Valor da Metragem: ${filter.minFoo ? filter.minFoo : '  '} m² - ${
        filter.maxFoo ? filter.maxFoo : '  '
      }  m².`;
  }

  if (filter.garage) {
    newArray = newArray + `Vagas: ${filter.about}.`;
  }

  if (filter.bathroom) {
    newArray = newArray + `Banheiros: ${filter.bathroom}.`;
  }

  if (filter.bedroom) {
    newArray = newArray + `Quartos: ${filter.bedroom}.`;
  }

  if (filter.text) {
    newArray = newArray + `Localização: ${filter.text}.`;
  }

  return newArray;
};

export const formatarData = (data: Date) => {
  const day = data.getDate();
  const month = (data.getMonth() + 1).toString().padStart(2, '0');
  const year = data.getFullYear();

  return `${day}/${month}/${year}`;
};

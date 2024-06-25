import { Comment } from '@prisma/client';

export const commentEntityList: Comment[] = [
  {
    id: 1,
    name: 'Milena',
    type: 'comprador',
    comment: 'Eu amei comprar casa com a imobiliaria',
  },
  {
    id: 2,
    name: 'Rosa',
    type: 'locatário',
    comment: 'Eu amei fazer a locação na minha casa com a imobiliaria',
  },
  {
    id: 3,
    name: 'Lucia',
    type: 'comprador',
    comment: 'Eu amei comprar minha casa nova',
  },
];

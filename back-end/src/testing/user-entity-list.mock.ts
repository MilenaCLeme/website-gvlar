import { User } from '@prisma/client';

export const userEntityList: User[] = [
  {
    id: 1,
    email: 'segunda4@uorak.com',
    name: 'teste master',
    hashedPassword:
      '$2b$10$/Ij.WdfV7Huf3krP5FkY3e3VWzFsBBqjgFJFDsm1P9hkLXXO0.AUO',
    hashedRefreshToken:
      '$2b$10$ncJSeWKCFJ75H1tZXB2D.u5s9.qgCksUQvpTaALm7U9GMN0oEAB0a',
    phone: '(86) 3917-3135',
    validation: true,
    role: 'master',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 2,
    email: 'milenaleme4@hotmail.com',
    name: 'Milena Leme',
    hashedPassword:
      '$2b$10$JqzKyuB5k7aaWfr5G1zO9ODshI0Dz2TfQnGtXIaTIup0wUASGJiNm',
    hashedRefreshToken: null,
    phone: '(11) 95219-2009',
    validation: true,
    role: 'client',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 3,
    email: 'netoacrn1@gmail.com',
    name: 'Neto Russo',
    hashedPassword:
      '$2b$10$MhjYU3M0whaSbhwUPjVGZOtThsRNGSXe4Mu41czYwSvBWdxWV2sWe',
    hashedRefreshToken: null,
    phone: '(11) 95219-2009',
    validation: false,
    role: 'client',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 4,
    email: 'milenalemeh@gmail.com',
    name: 'Milena Russo',
    hashedPassword:
      '$2b$10$JRdhxTukoCA3vSlhogu8hesVq2brO6YtrAP7b4h4xQ8nRtag/Ii9S',
    hashedRefreshToken: null,
    phone: '(11) 95219-2009',
    validation: false,
    role: 'client',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

import { PrismaService } from '../prisma/prisma.service';
import { userEntityList } from './user-entity-list.mock';
import { commentEntityList } from './comment/comment-entity-list.mock';

export const PrismaRepositoryMock = {
  provide: PrismaService,
  useValue: {
    user: {
      create: jest.fn().mockResolvedValue(userEntityList[3]),
      findMany: jest.fn().mockResolvedValue(userEntityList),
      findUnique: jest.fn().mockResolvedValue(userEntityList[0]),
      update: jest.fn().mockResolvedValue(userEntityList[1]),
      delete: jest.fn().mockResolvedValue(userEntityList[3]),
      count: jest.fn().mockResolvedValue(1),
      findFirst: jest.fn().mockResolvedValue(userEntityList[0]),
    },
    comment: {
      create: jest.fn().mockResolvedValue(commentEntityList[2]),
      findMany: jest.fn().mockResolvedValue(commentEntityList),
      findUnique: jest.fn().mockResolvedValue(commentEntityList[0]),
      update: jest.fn().mockResolvedValue(commentEntityList[2]),
      delete: jest.fn().mockResolvedValue(commentEntityList[2]),
      count: jest.fn().mockResolvedValue(1),
    },
  },
};

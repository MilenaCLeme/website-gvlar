import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { PrismaService } from '../prisma/prisma.service';
import { PrismaRepositoryMock } from '../testing/prisma-repository.mock';
import { mailRepositoryMock } from '../testing/mail-repository.mock';
import { propertyRepositoryMock } from '../testing/propertyService.mock';
import { userEntityList } from '../testing/user-entity-list.mock';
import { MailService } from '../mail/mail.service';
import { createUserDTO } from '../testing/create-user-dto.mock';
import { updatePutUserDTO } from '../testing/update-put-user-dto.mock';

jest.mock('bcrypt', () => ({
  hash: jest
    .fn()
    .mockResolvedValue(
      '$2b$10$JRdhxTukoCA3vSlhogu8hesVq2brO6YtrAP7b4h4xQ8nRtag/Ii9S',
    ),
  genSalt: jest.fn().mockResolvedValue('saltMock'),
}));

describe('UserService', () => {
  let userService: UserService;
  let prisma: PrismaService;
  let mailService: MailService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        PrismaRepositoryMock,
        mailRepositoryMock,
        propertyRepositoryMock,
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
    prisma = module.get<PrismaService>(PrismaService);
    mailService = module.get<MailService>(MailService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('Validar a definição', () => {
    expect(userService).toBeDefined();
    expect(prisma).toBeDefined();
    expect(mailService).toBeDefined();
  });

  describe('Create', () => {
    test('method createUser', async () => {
      const result = await userService.createUser(createUserDTO);

      expect(result).toEqual({
        user: userEntityList[3],
        accessToken: expect.any(String),
      });
    });
  });

  describe('Read', () => {
    test('method list', async () => {
      const result = await userService.listUsers();

      expect(result).toEqual(userEntityList);
    });

    test('method show id', async () => {
      const result = await userService.showId(1);

      expect(result).toEqual(userEntityList[0]);
    });

    test('method show email', async () => {
      const result = await userService.showEmail('segunda4@uorak.com');

      expect(result).toEqual(userEntityList[0]);
    });
  });

  describe('UpdateUser', () => {
    test('method update', async () => {
      const result = await userService.updateUser(2, updatePutUserDTO);

      expect(result).toEqual(userEntityList[1]);
    });

    test('method update Partial', async () => {
      const result = await userService.updateUser(2, { name: 'Milena Leme' });

      expect(result).toEqual(userEntityList[1]);
    });
  });

  describe('DeleteUser', () => {
    test('method delete', async () => {
      const result = await userService.deleteUser(4);

      expect(result).toEqual(userEntityList[3]);
    });
  });
});

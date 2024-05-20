import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { PrismaService } from '../prisma/prisma.service';
import { MailService } from '../mail/mail.service';
import { PropertyService } from '../property/property.service';

const fakeUser = [
  {
    id: 1,
    email: 'segunda4@uorak.com',
    name: 'Master Usuario',
    hashedPassword: 'Teste123',
    hashedRefreshToken: 'autorizado',
    phone: '(86) 3917-3135',
    validation: true,
    role: 'master',
    createdAt: '',
    updatedAt: '',
  },
  {
    id: 2,
    email: 'milenaleme@uorak.com',
    name: 'Milena Leme',
    hashedPassword: 'Teste123',
    hashedRefreshToken: 'autorizado',
    phone: '(11) 95219-20009',
    validation: true,
    role: 'client',
    createdAt: '',
    updatedAt: '',
  },
  {
    id: 3,
    email: 'mika@uorak.com',
    name: 'Mika',
    hashedPassword: 'Teste123',
    hashedRefreshToken: 'autorizado',
    phone: '(86) 3917-3135',
    validation: false,
    role: 'client',
    createdAt: '',
    updatedAt: '',
  },
  {
    id: 4,
    email: 'milaleme@uorak.com',
    name: 'Mila',
    hashedPassword: 'Teste123',
    hashedRefreshToken: 'autorizado',
    phone: '(86) 3917-3135',
    validation: false,
    role: 'worker',
    createdAt: '',
    updatedAt: '',
  },
];

const prismaMock = {
  user: {
    create: jest.fn().mockReturnValue(fakeUser[1]),
    findMany: jest.fn().mockResolvedValue(fakeUser),
    findUnique: jest.fn().mockResolvedValue(fakeUser[1]),
    update: jest.fn().mockResolvedValue(fakeUser[1]),
    delete: jest.fn(),
    count: jest.fn(),
  },
};

describe('UserService', () => {
  let userService: UserService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: PrismaService,
          useValue: prismaMock,
        },
        {
          provide: MailService,
          useValue: {
            sendEmailConfirmtion: jest.fn(),
          },
        },
        {
          provide: PropertyService,
          useValue: {
            updateRegisterForUserMaster: jest.fn(),
          },
        },
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  test('Validar a definição', () => {
    expect(userService).toBeDefined();
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UserRepositoryMock } from '../testing/user-repository.mock';
import { PrismaRepositoryMock } from '../testing/prisma-repository.mock';
import { mailRepositoryMock } from '../testing/mail-repository.mock';
import {
  JwtServiceRepositoryMock,
  data,
} from '../testing/jwtService-repository.mock';
import { userEntityList } from '../testing/user-entity-list.mock';
import { UserService } from '../user/user.service';

describe('AuthService', () => {
  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6InRlc3RlIG1hc3RlciIsImVtYWlsIjoic2VndW5kYTRAdW9yYWsuY29tIiwiaWF0IjoxNzE4OTMwNTcwLCJleHAiOjE3MTk1MzUzNzAsImF1ZCI6InVzZXJzIiwiaXNzIjoiZ3ZsYXIiLCJzdWIiOiIxIn0.brLD5JMiDTgf6ISlTGUj5O8Mhk9W7o0aInvX0d9p1v4';

  let authService: AuthService;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        UserRepositoryMock,
        PrismaRepositoryMock,
        mailRepositoryMock,
        JwtServiceRepositoryMock,
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    userService = module.get<UserService>(UserService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('Validar a definição', () => {
    expect(authService).toBeDefined();
    expect(userService).toBeDefined();
  });

  describe('token', () => {
    test('method create Token', () => {
      const result = authService.createToken(userEntityList[1]);

      expect(result).toEqual({
        accessToken: token,
      });
    });

    test('method checkToken', () => {
      const result = authService.checkToken(token);

      expect(result).toEqual(data);
    });

    test('method isValid Token insert boolean', () => {
      const result = authService.isValidToken(token);

      expect(result).toEqual(true);
    });

    test('method check Token Validity', async () => {
      const result = await authService.checkTokenValidity(userEntityList[0]);

      expect(result).toEqual({ accessToken: token, user: userEntityList[0] });
    });
  });

  describe('Autenticacion', () => {
    test('login with email and password success', async () => {
      const result = await authService.login('segunda4@uorak.com', 'Teste123');

      expect(result).toEqual({ accessToken: token, user: userEntityList[0] });
    });

    test('method forget', async () => {
      const result = await authService.forget('segunda4@uorak.com');

      expect(result).toEqual({ sucess: 'Ok' });
    });

    test('method forget', async () => {
      const result = await authService.reset(1, 'Teste123', token);

      expect(result).toEqual({ sucess: 'Ok' });
    });

    test('method change Password', async () => {
      const result = await authService.changePassword(1, {
        passwordNew: 'Teste123',
        passwordOld: 'Teste123',
      });

      expect(result).toEqual(userEntityList[0]);
    });

    test('method validation', async () => {
      jest.spyOn(userService, 'user').mockResolvedValueOnce(userEntityList[2]);

      const result = await authService.validation(3);

      expect(result).toEqual({ sucess: 'Ok' });
    });
  });
});

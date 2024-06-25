import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UserServiceMock } from '../testing/user-service.mock';
import { PrismaRepositoryMock } from '../testing/prisma-repository.mock';
import { mailServiceMock } from '../testing/mail/mail-service.mock';
import {
  JwtServiceRepositoryMock,
  data,
} from '../testing/jwtService-repository.mock';
import { userEntityList } from '../testing/user-entity-list.mock';
import { UserService } from '../user/user.service';
import { token } from '../testing/token.mock';

describe('AuthService', () => {
  let authService: AuthService;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        UserServiceMock,
        PrismaRepositoryMock,
        mailServiceMock,
        JwtServiceRepositoryMock,
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    userService = module.get<UserService>(UserService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('Validate the definition', () => {
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

    test('method reset', async () => {
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

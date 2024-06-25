import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthGuard } from '../guards/auth.guard';
import { guardMock } from '../testing/guard.mock';
import { AuthServiceMock } from '../testing/auth-service.mock';
import { authLoginDTO } from '../testing/auth-login-dto.mock';
import { token } from '../testing/token.mock';
import { userEntityList } from '../testing/user-entity-list.mock';
import { createUserDTO } from '../testing/create-user-dto.mock';

describe('Auth Controller', () => {
  let authController: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthServiceMock],
    })
      .overrideGuard(AuthGuard)
      .useValue(guardMock)
      .compile();

    authController = module.get<AuthController>(AuthController);
  });

  test('Validate the definition', () => {
    expect(authController).toBeDefined();
  });

  describe('authentication flow', async () => {
    test('login method', async () => {
      const result = await authController.login(authLoginDTO);

      expect(result).toEqual({ accessToken: token, user: userEntityList[0] });
    });

    test('register method', async () => {
      const result = await authController.register(createUserDTO);

      expect(result).toEqual({
        user: userEntityList[3],
        accessToken: expect.any(String),
      });
    });

    test('check Token validity method', async () => {
      const result = await authController.checkTokenValidity(userEntityList[0]);

      expect(result).toEqual({ accessToken: token, user: userEntityList[0] });
    });

    test('logout method', async () => {
      const result = await authController.logout(userEntityList[0]);

      expect(result).toEqual({ sucess: 'OK' });
    });

    test('forget method', async () => {
      const result = await authController.forget({
        email: 'milenaleme4@hotmail.com',
      });

      expect(result).toEqual({ sucess: 'OK' });
    });

    test('reset method', async () => {
      const result = await authController.reset(2, {
        password: 'Milena123',
        number: '5462',
      });

      expect(result).toEqual({ sucess: 'Ok' });
    });

    test('change password method', async () => {
      const result = await authController.changePassword(1, {
        passwordNew: 'Teste441',
        passwordOld: 'Teste123',
      });

      expect(result).toEqual(userEntityList[0]);
    });
  });

  describe('update register', async () => {
    const result = await authController.registerUpdate(2, userEntityList[1]);

    expect(result).toEqual(userEntityList[1]);
  });

  describe('validation user', () => {
    test('validation method', async () => {
      const result = await authController.validation(3);

      expect(result).toEqual({ sucess: 'Ok' });
    });

    test('validate method', async () => {
      const result = await authController.validate({
        email: 'netoacrn1@gmail.com',
      });

      expect(result).toEqual({ sucess: 'Ok' });
    });
  });
});

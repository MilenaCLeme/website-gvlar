import { AuthService } from '../auth/auth.service';
import { token } from './token.mock';
import { userEntityList } from './user-entity-list.mock';

export const AuthServiceMock = {
  provide: AuthService,
  useValue: {
    createToken: jest.fn(),
    checkToken: jest.fn(),
    isValidToken: jest.fn(),
    checkTokenValidity: jest
      .fn()
      .mockResolvedValue({ accessToken: token, user: userEntityList[0] }),
    logout: jest.fn().mockResolvedValue({ sucess: 'Ok' }),
    register: jest.fn().mockResolvedValue({
      user: userEntityList[3],
      accessToken: expect.any(String),
    }),
    updateRegister: jest.fn().mockResolvedValue(userEntityList[1]),
    login: jest
      .fn()
      .mockResolvedValue({ accessToken: token, user: userEntityList[0] }),
    generateRandom4DigitNumber: jest.fn(),
    forget: jest.fn().mockResolvedValue({ sucess: 'Ok' }),
    reset: jest.fn().mockResolvedValue({ sucess: 'Ok' }),
    changePassword: jest.fn().mockResolvedValue(userEntityList[0]),
    validation: jest.fn().mockResolvedValue({ sucess: 'Ok' }),
    validate: jest.fn().mockResolvedValue({ sucess: 'OK' }),
  },
};

import { ConfigService } from '@nestjs/config';

export const ConfigServiceMock = {
  provide: ConfigService,
  useValue: {
    get: jest.fn(),
  },
};

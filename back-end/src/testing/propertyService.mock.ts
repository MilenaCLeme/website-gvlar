import { PropertyService } from '../property/property.service';

export const propertyRepositoryMock = {
  provide: PropertyService,
  useValue: {
    updateRegisterForUserMaster: jest.fn(),
    sendEmailConfirmtion: jest.fn().mockResolvedValue(true),
  },
};

import { PropertyService } from '../property/property.service';

export const propertyServiceMock = {
  provide: PropertyService,
  useValue: {
    updateRegisterForUserMaster: jest.fn(),
  },
};

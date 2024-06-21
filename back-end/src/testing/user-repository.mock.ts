import { UserService } from '../user/user.service';
import { userEntityList } from './user-entity-list.mock';
//import { userEntityList } from './user-entity-list.mock';

export const UserRepositoryMock = {
  provide: UserService,
  useValue: {
    user: jest.fn().mockResolvedValue(userEntityList[0]),
    users: jest.fn(),
    showId: jest.fn().mockResolvedValue(userEntityList[0]),
    showEmail: jest.fn(),
    listUsers: jest.fn(),
    encodeString: jest.fn(),
    createUser: jest.fn(),
    updateUser: jest.fn().mockResolvedValue(userEntityList[0]),
    deleteUser: jest.fn(),
    countUser: jest.fn(),
    exists: jest.fn(),
    existsEmail: jest.fn(),
  },
};

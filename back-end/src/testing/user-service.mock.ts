import { UserService } from '../user/user.service';
import { userEntityList } from './user-entity-list.mock';
//import { userEntityList } from './user-entity-list.mock';

export const UserServiceMock = {
  provide: UserService,
  useValue: {
    user: jest.fn().mockResolvedValue(userEntityList[0]),
    users: jest.fn(),
    showId: jest.fn().mockResolvedValue(userEntityList[0]),
    showEmail: jest.fn().mockResolvedValue(userEntityList[1]),
    listUsers: jest.fn().mockResolvedValue(userEntityList),
    encodeString: jest.fn(),
    createUser: jest.fn().mockResolvedValue(userEntityList[1]),
    updateUser: jest.fn().mockResolvedValue(userEntityList[0]),
    deleteUser: jest.fn().mockResolvedValue(userEntityList[1]),
    countUser: jest.fn(),
    exists: jest.fn(),
    existsEmail: jest.fn(),
  },
};

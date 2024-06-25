import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserServiceMock } from '../testing/user-service.mock';
import { AuthGuard } from '../guards/auth.guard';
import { guardMock } from '../testing/guard.mock';
import { RoleGuard } from '../guards/role.guard';
import { UserService } from './user.service';
import { createUserDTO } from '../testing/create-user-dto.mock';
import { userEntityList } from '../testing/user-entity-list.mock';
import { updatePutUserDTO } from '../testing/update-put-user-dto.mock';

describe('User Controller', () => {
  let userController: UserController;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserServiceMock],
    })
      .overrideGuard(AuthGuard)
      .useValue(guardMock)
      .overrideGuard(RoleGuard)
      .useValue(guardMock)
      .compile();

    userController = module.get<UserController>(UserController);
    userService = module.get<UserService>(UserService);
  });

  test('Validate the definition', () => {
    expect(userController).toBeDefined();
    expect(userService).toBeDefined();
  });

  describe('Testing the application of Guards in this Control', () => {
    test('If guards are applied', () => {
      const guards = Reflect.getMetadata('__guards__', UserController);
      expect(guards.length).toEqual(2);
      expect(new guards[0]()).toBeInstanceOf(AuthGuard);
      expect(new guards[1]()).toBeInstanceOf(RoleGuard);
    });
  });

  describe('Create', () => {
    test('create method', async () => {
      const result = await userController.create(createUserDTO);

      expect(result).toEqual(userEntityList[1]);
    });
  });

  describe('Read', () => {
    test('list method', async () => {
      const result = await userController.list();

      expect(result).toEqual(userEntityList);
    });

    test('show id method', async () => {
      const result = await userController.showId(1);

      expect(result).toEqual(userEntityList[0]);
    });

    test('show email method', async () => {
      const result = await userController.showEmail('milenaleme4@hotmail.com');

      expect(result).toEqual(userEntityList[1]);
    });
  });

  describe('Update', () => {
    test('update method', async () => {
      const result = await userController.update(1, updatePutUserDTO);

      expect(result).toEqual(userEntityList[0]);
    });

    test('updateParcial method', async () => {
      const result = await userController.updatePartial(1, updatePutUserDTO);

      expect(result).toEqual(userEntityList[0]);
    });
  });

  describe('Delete', () => {
    test('delete method', async () => {
      const result = await userController.delete(2);

      expect(result).toEqual(userEntityList[1]);
    });
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { CommentController } from './comment.controller';
import { CommentServiceMock } from '../testing/comment/comment-service.mock';
import { AuthGuard } from '../guards/auth.guard';
import { guardMock } from '../testing/guard.mock';
import { RoleGuard } from '../guards/role.guard';
import { createCommentDTO } from '../testing/comment/create-comment-dto.mock';
import { commentEntityList } from '../testing/comment/comment-entity-list.mock';

describe('Comment Controller', () => {
  let commentController: CommentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CommentController],
      providers: [CommentServiceMock],
    })
      .overrideGuard(AuthGuard)
      .useValue(guardMock)
      .overrideGuard(RoleGuard)
      .useValue(guardMock)
      .compile();

    commentController = module.get<CommentController>(CommentController);
  });

  test('Validate the definition', () => {
    expect(commentController).toBeDefined();
  });

  describe('Create', () => {
    test('Create method', async () => {
      const result = await commentController.create(createCommentDTO);

      expect(result).toEqual(commentEntityList[2]);
    });
  });

  describe('Read', () => {
    test('list method', async () => {
      const result = await commentController.list();

      expect(result).toEqual(commentEntityList);
    });

    test('show id method', async () => {
      const result = await commentController.showId(1);

      expect(result).toEqual(commentEntityList[0]);
    });
  });

  describe('Update', () => {
    test('Update method', async () => {
      const result = await commentController.updatePartial(3, createCommentDTO);

      expect(result).toEqual(commentEntityList[2]);
    });
  });

  describe('Delete', () => {
    test('delete method', async () => {
      const result = await commentController.delete(3);

      expect(result).toEqual(commentEntityList[2]);
    });
  });
});

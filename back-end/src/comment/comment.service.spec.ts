import { Test, TestingModule } from '@nestjs/testing';
import { CommentService } from './comment.service';
import { PrismaRepositoryMock } from '../testing/prisma-repository.mock';
import { commentEntityList } from '../testing/comment/comment-entity-list.mock';
import { createCommentDTO } from '../testing/comment/create-comment-dto.mock';

describe('CommentService', () => {
  let commentService: CommentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CommentService, PrismaRepositoryMock],
    }).compile();

    commentService = module.get<CommentService>(CommentService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('Validate the definition', () => {
    expect(commentService).toBeDefined();
  });

  describe('Create', () => {
    test('create method', async () => {
      const result = await commentService.create(createCommentDTO);

      expect(result).toEqual(commentEntityList[2]);
    });
  });

  describe('Read', () => {
    test('show list method', async () => {
      const result = await commentService.list();

      expect(result).toEqual(commentEntityList);
    });

    test('show id method', async () => {
      const result = await commentService.showId(1);

      expect(result).toEqual(commentEntityList[0]);
    });
  });

  describe('Update', () => {
    test('update method', async () => {
      const result = await commentService.update(3, createCommentDTO);

      expect(result).toEqual(commentEntityList[2]);
    });
  });

  describe('Delete', () => {
    test('delete method', async () => {
      const result = await commentService.delete(3);

      expect(result).toEqual(commentEntityList[2]);
    });
  });
});

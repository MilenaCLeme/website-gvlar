import { CommentService } from '../../comment/comment.service';
import { commentEntityList } from './comment-entity-list.mock';

export const CommentServiceMock = {
  provide: CommentService,
  useValue: {
    create: jest.fn().mockResolvedValue(commentEntityList[2]),
    comments: jest.fn(),
    list: jest.fn().mockResolvedValue(commentEntityList),
    comment: jest.fn(),
    showId: jest.fn().mockResolvedValue(commentEntityList[0]),
    update: jest.fn().mockResolvedValue(commentEntityList[2]),
    delete: jest.fn().mockResolvedValue(commentEntityList[2]),
    exists: jest.fn(),
  },
};

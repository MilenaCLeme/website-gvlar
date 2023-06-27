import { Injectable } from '@nestjs/common';
import { CreateCommentDTO } from './dto/create-comment.dto';
import { UpdatePatchCommmentDTO } from './dto/update-patch-comment.dto';

@Injectable()
export class CommentService {
  async create(data: CreateCommentDTO) {
    return { data };
  }

  async list() {
    return [];
  }

  async showId(id: number) {
    return id;
  }

  async update(id: number, data: UpdatePatchCommmentDTO) {
    return { id, data };
  }

  async delete(id: number) {
    return id;
  }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCommentDTO } from './dto/create-comment.dto';
import { UpdatePatchCommmentDTO } from './dto/update-patch-comment.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Comment, Prisma } from '@prisma/client';

@Injectable()
export class CommentService {
  constructor(private readonly prisma: PrismaService) {}
  async create(data: CreateCommentDTO) {
    return await this.prisma.comment.create({ data });
  }

  async comments(params: Prisma.CommentFindManyArgs): Promise<Comment[]> {
    return await this.prisma.comment.findMany(params);
  }

  async list() {
    return await this.comments({});
  }

  async comment(where: Prisma.CommentWhereUniqueInput): Promise<Comment> {
    return await this.prisma.comment.findUnique({ where });
  }

  async showId(id: number) {
    await this.exists(id);

    return await this.comment({ id });
  }

  async update(id: number, data: UpdatePatchCommmentDTO) {
    await this.exists(id);

    return await this.prisma.comment.update({
      where: {
        id,
      },
      data,
    });
  }

  async delete(id: number) {
    await this.exists(id);

    return await this.prisma.comment.delete({
      where: {
        id,
      },
    });
  }

  async exists(id: number) {
    if (
      !(await this.prisma.comment.count({
        where: {
          id,
        },
      }))
    ) {
      throw new NotFoundException(`O ${id} não existe`);
    }
  }
}

import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CreateCommentDTO } from './dto/create-comment.dto';
import { ParamId } from '../decorators/param-id.decorator';
import { UpdatePatchCommmentDTO } from './dto/update-patch-comment.dto';
import { CommentService } from './comment.service';
import { AuthGuard } from '../guards/auth.guard';
import { RoleGuard } from '../guards/role.guard';
import { Roles } from '../decorators/roles.decorator';
import { Role } from '../enums/role.enum';
import { LogInterceptor } from '../interceptors/log.interceptor';
import { ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';

@UseGuards(AuthGuard, RoleGuard)
@Roles(Role.master, Role.worker)
@UseInterceptors(LogInterceptor)
@ApiTags('Comment')
@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post()
  @ApiBody({ type: CreateCommentDTO })
  async create(@Body() data: CreateCommentDTO) {
    return await this.commentService.create(data);
  }

  @Get()
  async list() {
    return await this.commentService.list();
  }

  @Get(':id')
  @ApiParam({ name: 'id', description: 'ID do comentario' })
  async showId(@ParamId() id: number) {
    return await this.commentService.showId(id);
  }

  @Patch(':id')
  @ApiParam({ name: 'id', description: 'ID do comentario' })
  @ApiBody({ type: UpdatePatchCommmentDTO })
  async updatePartial(
    @ParamId() id: number,
    @Body() data: UpdatePatchCommmentDTO,
  ) {
    return await this.commentService.update(id, data);
  }

  @Delete(':id')
  @ApiParam({ name: 'id', description: 'ID do comentario' })
  async delete(@ParamId() id: number) {
    return await this.commentService.delete(id);
  }
}

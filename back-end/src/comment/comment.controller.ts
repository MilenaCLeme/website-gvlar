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
import { ParamId } from 'src/decorators/param-id.decorator';
import { UpdatePatchCommmentDTO } from './dto/update-patch-comment.dto';
import { CommentService } from './comment.service';
import { AuthGuard } from 'src/guards/auth.guard';
import { RoleGuard } from 'src/guards/role.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/enums/role.enum';
import { LogInterceptor } from 'src/interceptors/log.interceptor';

@UseGuards(AuthGuard, RoleGuard)
@Roles(Role.master, Role.worker)
@UseInterceptors(LogInterceptor)
@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post()
  async create(@Body() data: CreateCommentDTO) {
    return await this.commentService.create(data);
  }

  @Get()
  async list() {
    return await this.commentService.list();
  }

  @Get(':id')
  async showId(@ParamId() id: number) {
    return await this.commentService.showId(id);
  }

  @Patch(':id')
  async updatePartial(
    @ParamId() id: number,
    @Body() data: UpdatePatchCommmentDTO,
  ) {
    return await this.commentService.update(id, data);
  }

  @Delete(':id')
  async delete(@ParamId() id: number) {
    return await this.commentService.delete(id);
  }
}

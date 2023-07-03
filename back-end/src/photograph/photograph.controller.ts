import {
  Body,
  Controller,
  ParseFilePipe,
  Post,
  UploadedFile,
  UseInterceptors,
  FileTypeValidator,
  MaxFileSizeValidator,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { PhotographService } from './photograph.service';
import { ParamId } from 'src/decorators/param-id.decorator';
import { AuthGuard } from 'src/guards/auth.guard';
import { RoleGuard } from 'src/guards/role.guard';
import { User } from 'src/decorators/user.decorator';
import { User as typeUser } from '@prisma/client';
import { LogInterceptor } from 'src/interceptors/log.interceptor';

@UseGuards(AuthGuard, RoleGuard)
@UseInterceptors(LogInterceptor)
@Controller('photo')
export class PhotographController {
  constructor(private readonly photographService: PhotographService) {}

  @UseInterceptors(FileInterceptor('file'))
  @Post(':id')
  async uploadPhoto(
    @User() user: typeUser,
    @ParamId() propertyId: number,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new FileTypeValidator({ fileType: 'image/jpeg' }),
          new MaxFileSizeValidator({ maxSize: 1024 * 20000 }),
        ],
      }),
    )
    photo: Express.Multer.File,
    @Body('describe') describe: string,
  ) {
    return await this.photographService.uploadPhoto(
      user,
      propertyId,
      photo,
      describe,
    );
  }

  @Delete(':id')
  async deletePhoto(@ParamId() photoId: number) {
    return await this.photographService.deletePhoto(photoId);
  }
}

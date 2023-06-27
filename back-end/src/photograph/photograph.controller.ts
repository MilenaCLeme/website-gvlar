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
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { PhotographService } from './photograph.service';
import { ParamId } from 'src/decorators/param-id.decorator';

@Controller('photo')
export class PhotographController {
  constructor(private readonly photographService: PhotographService) {}

  @UseInterceptors(FileInterceptor('file'))
  @Post(':id')
  async uploadPhoto(
    @ParamId() propertieId: number,
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
      propertieId,
      photo,
      describe,
    );
  }

  @Delete(':id')
  async deletePhoto(@ParamId() photoId: number) {
    return await this.photographService.deletePhoto(photoId);
  }
}

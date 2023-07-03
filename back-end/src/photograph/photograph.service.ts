import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { join } from 'path';
import { FileService } from 'src/file/file.service';
import { PropertyService } from 'src/property/property.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { v4 } from 'uuid';
import { User } from '@prisma/client';

@Injectable()
export class PhotographService {
  constructor(
    private readonly fileService: FileService,
    private readonly propertieService: PropertyService,
    private readonly prisma: PrismaService,
  ) {}

  async limitPhotographByPropertieId(propertieId: number) {
    const max = 10;
    if (
      !(
        (await this.prisma.photograph.count({
          where: {
            propertyId: propertieId,
          },
        })) < max
      )
    ) {
      throw new BadRequestException(`Limite máximo de fotos atingido`);
    }
  }

  fileName(): string {
    const today = new Date();
    const fileId = v4();
    return `${fileId}-${today.getDate()}${today.getMonth()}${today.getFullYear()}.jpeg`;
  }

  async uploadPhoto(
    user: User,
    propertyId: number,
    photo: Express.Multer.File,
    describe: string,
  ) {
    try {
      const fileName = this.fileName();

      const path = join(__dirname, '..', '..', 'uploads', `${fileName}`);

      await this.propertieService.exists(propertyId);

      if (user.role === 'client') {
        await this.propertieService.releaseAuth(propertyId, user.id);
      }

      await this.limitPhotographByPropertieId(propertyId);

      await this.fileService.upload(photo, path);

      const photograph = await this.prisma.photograph.create({
        data: {
          url: fileName,
          describe,
          property: {
            connect: {
              id: propertyId,
            },
          },
        },
      });

      return photograph;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async deletePhoto(photoId: number) {
    try {
      await this.exists(photoId);

      const { url } = await this.prisma.photograph.delete({
        where: {
          id: photoId,
        },
      });

      const path = join(__dirname, '..', '..', 'uploads', `${url}`);

      await this.fileService.delete(path);

      return { url, sucesso: 'ok' };
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async exists(id: number) {
    if (
      !(await this.prisma.photograph.count({
        where: {
          id,
        },
      }))
    ) {
      throw new NotFoundException(`${id} não existe`);
    }
  }
}

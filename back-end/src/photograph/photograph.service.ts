import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
  forwardRef,
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
    @Inject(forwardRef(() => FileService))
    private readonly fileService: FileService,
    @Inject(forwardRef(() => PropertyService))
    private readonly propertieService: PropertyService,
    @Inject(forwardRef(() => PrismaService))
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

      await this.prisma.photograph.create({
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

      const propertie = await this.propertieService.update(propertyId, {
        published: false,
        situation: 'em analise',
      });

      return propertie;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async deletePhoto(photoId: number) {
    try {
      await this.exists(photoId);

      const { url, propertyId } = await this.prisma.photograph.delete({
        where: {
          id: photoId,
        },
      });

      const path = join(__dirname, '..', '..', 'uploads', `${url}`);

      await this.fileService.delete(path);

      const propertie = await this.propertieService.property({
        id: propertyId,
      });

      return propertie;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async deletePhotoForProperty(id: number) {
    try {
      const propertieId = await this.prisma.photograph.findMany({
        where: {
          propertyId: id,
        },
      });

      if (propertieId.length > 0) {
        propertieId.map(async ({ id }) => {
          await this.deletePhoto(id);
        });
      }
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

import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { AuthService } from 'src/auth/auth.service';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bycrpt from 'bcrypt';
import { UpdatePatchUserDTO } from './dto/update-patch-user.dto';
import { MailService } from 'src/mail/mail.service';
import { PropertyService } from 'src/property/property.service';

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly authService: AuthService,
    private readonly mailService: MailService,
    private readonly propertyService: PropertyService,
  ) {}

  async user(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput,
  ): Promise<User | null> {
    return await this.prisma.user.findUnique({
      where: userWhereUniqueInput,
    });
  }

  async users(params: Prisma.UserFindManyArgs) {
    return await this.prisma.user.findMany(params);
  }

  async showId(id: number) {
    await this.exists(id);

    return this.user({ id });
  }

  async showEmail(email: string) {
    await this.existsEmail(email);

    return this.user({ email });
  }

  async listUsers(): Promise<User[]> {
    return await this.users({});
  }

  encodeString(input: string) {
    const encoded = Buffer.from(input).toString('base64');
    return encoded;
  }

  async createUser(data: Prisma.UserCreateInput) {
    try {
      data.hashedPassword = await bycrpt.hash(
        data.hashedPassword,
        await bycrpt.genSalt(),
      );

      const user = await this.prisma.user.create({
        data,
      });

      const accessToken = this.encodeString(`${user.id}`);

      await this.mailService.sendEmailConfirmtion(user, accessToken);

      return { user, accessToken };
    } catch (error: any) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new ConflictException(
          'O e-mail já está em uso. Por favor, escolha um e-mail diferente.',
        );
      }
      throw new InternalServerErrorException(
        'Ocorreu um erro inesperado ao cadastrar',
      );
    }
  }

  async updateUser(id: number, data: UpdatePatchUserDTO): Promise<User> {
    await this.exists(id);

    const salt = await bycrpt.genSalt();

    if (data.hashedPassword) {
      data.hashedPassword = await bycrpt.hash(data.hashedPassword, salt);
    }

    if (data.hashedRefreshToken) {
      data.hashedRefreshToken = await bycrpt.hash(
        data.hashedRefreshToken,
        salt,
      );
    }

    return await this.prisma.user.update({
      where: {
        id,
      },
      data,
    });
  }

  async deleteUser(id: number): Promise<User> {
    await this.exists(id);
    await this.propertyService.updateRegisterForUserMaster(id);
    return await this.prisma.user.delete({
      where: {
        id,
      },
    });
  }

  async countUser(where: Prisma.UserWhereUniqueInput): Promise<number> {
    return await this.prisma.user.count({ where });
  }

  async exists(id: number) {
    if (!(await this.countUser({ id }))) {
      throw new NotFoundException(`O usuário ${id} não existe`);
    }
  }

  async existsEmail(email: string) {
    if (!(await this.countUser({ email }))) {
      throw new NotFoundException(`O usuário no email ${email} não existe`);
    }
  }
}

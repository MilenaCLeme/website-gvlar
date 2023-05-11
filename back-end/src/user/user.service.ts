import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
// import { AuthService } from 'src/auth/auth.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async user(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput,
  ): Promise<User | null> {
    return await this.prisma.user.findUnique({
      where: userWhereUniqueInput,
    });
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
    return await this.prisma.user.findMany();
  }

  async createUser(data: Prisma.UserCreateInput) {
    return await this.prisma.user.create({
      data,
    });

    /*
    const { accessToken } = this.authService.createToken(user);

    const update = { hashedRefreshToken: accessToken };

    await this.updateUser(user.id, update);

    const { token } = this.authService.transformToken(accessToken);

    return { user, token };
    */
  }

  async updateUser(id: number, data: Prisma.UserUpdateInput): Promise<User> {
    await this.exists(id);
    return await this.prisma.user.update({
      where: {
        id,
      },
      data,
    });
  }

  async deleteUser(id: number): Promise<User> {
    await this.exists(id);
    return await this.prisma.user.delete({
      where: {
        id,
      },
    });
  }

  async exists(id: number) {
    if (
      !(await this.prisma.user.count({
        where: {
          id,
        },
      }))
    ) {
      throw new NotFoundException(`O usuário ${id} não existe`);
    }
  }

  async existsEmail(email: string) {
    if (
      !(await this.prisma.user.count({
        where: {
          email,
        },
      }))
    ) {
      throw new NotFoundException(`O usuário no email ${email} não existe`);
    }
  }
}

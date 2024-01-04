import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bycrpt from 'bcrypt';

@Injectable()
export class InitialUserService {
  constructor(private readonly prisma: PrismaService) {}

  async createInitialUser() {
    try {
      const existUserFrist = await this.prisma.user.findFirst();

      if (!existUserFrist) {
        const password = await bycrpt.hash('Teste123', await bycrpt.genSalt());

        const newUser = await this.prisma.user.create({
          data: {
            name: 'teste master',
            email: 'segunda4@uorak.com',
            hashedPassword: password,
            phone: '(86) 3917-3135',
            validation: true,
            role: 'master',
          },
        });

        console.log('Usuário inicial criado:', newUser);
      } else {
        console.log('Usuário inicial já existe');
      }
    } catch (error) {
      console.error('Erro ao criar o usuário inicial', error);
    }
  }
}

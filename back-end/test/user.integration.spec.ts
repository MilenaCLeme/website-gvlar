import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { PrismaClient } from '@prisma/client';
import {
  StartedPostgreSqlContainer,
  PostgreSqlContainer,
} from '@testcontainers/postgresql';
import { AppModule } from '../src/app.module';
import { execSync } from 'child_process';
import { AuthRegisterDTO } from '../src/auth/dto/auth-register.dto';
import * as request from 'supertest';

describe('UserController (e2e)', () => {
  let prisma: PrismaClient;
  let app: INestApplication;
  let container: StartedPostgreSqlContainer;

  beforeAll(async () => {
    // aumentar o timeout do beforeAll
    jest.setTimeout(30000);

    // iniciando o container docker
    container = await new PostgreSqlContainer().start();

    // configurando a URL de conexão do prisma
    const urlConnection = `postgresql://${container.getUsername()}:${container.getPassword()}@${container.getHost()}:${container.getPort()}/${container.getDatabase()}?schema=public`;

    // definir a URL de conexão para conexãp do prisma
    process.env.DATABASE_URL = urlConnection;

    // criar as tabelas definidas no prisma no banco de dados
    execSync('npx prisma db push', {
      env: {
        ...process.env,
        DATABASE_URL: urlConnection,
      },
    });

    // importar o modúlo que queremos testar
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    // criar a aplicação
    app = moduleRef.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());

    // Instanciar o prisma client com a URL de conexão
    prisma = new PrismaClient({
      datasources: {
        db: {
          url: urlConnection,
        },
      },
    });

    // Iniciar a aplicação
    await app.init();
  });

  afterAll(async () => {
    // fechar a aplicação NestJS
    await app.close();

    // parar o container do PostgreSQL
    await container.stop();

    // desconectar o Prisma Client
    await prisma.$disconnect();
  });

  describe('[/auth/register] (POST)', () => {
    it('should create a user through registry ', async () => {
      const user: AuthRegisterDTO = {
        email: 'milenaleme4@hotmail.com',
        name: 'Milena Leme',
        hashedPassword: 'Milena441',
        phone: '(11) 95219-2009',
      };

      const response = await request(await app.getHttpServer())
        .post('/auth/register')
        .send(user)
        .expect(201);

      expect(response.body).toBeDefined();
      expect(response.body.user.email).toBe(user.email);
      expect(response.body.user.name).toBe(user.name);
      expect(response.body.user.hashedPassword).not.toBe(user.hashedPassword);
      expect(response.body.accessToken).toBeDefined();
    });
  });
});

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
import { Role } from '../src/enums/role.enum';

describe('Controller (e2e)', () => {
  let prisma: PrismaClient;
  let app: INestApplication;
  let container: StartedPostgreSqlContainer;

  beforeAll(async () => {
    // aumentar o timeout do beforeAll
    jest.setTimeout(3000000);

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

  const user: AuthRegisterDTO = {
    email: 'milenaleme4@hotmail.com',
    name: 'Milena Leme',
    hashedPassword: 'Test123',
    phone: '(11) 95219-2009',
  };

  let accessToken: string = '';

  describe('[/auth/register] (POST)', () => {
    it('should create a new user with the path register ', async () => {
      const response = await request(await app.getHttpServer())
        .post('/auth/register')
        .send(user)
        .expect(201);

      expect(response.body).toBeDefined();
      expect(response.body.user.email).toBe(user.email);
      expect(response.body.user.name).toBe(user.name);
      expect(response.body.user.hashedPassword).not.toBe(user.hashedPassword);
      expect(response.body.accessToken).toBeDefined();
    }, 10000);

    it('should create a new user with the path register using role administrator and worker', async () => {
      const response = await request(await app.getHttpServer())
        .post('/auth/register')
        .send({ ...user, role: Role.master, email: 'biluzinha4@hotmail.com' })
        .expect(201);

      expect(response.body).toBeDefined();
      expect(response.body.user.email).toBe('biluzinha4@hotmail.com');
      expect(response.body.user.name).toBe(user.name);
      expect(response.body.user.hashedPassword).not.toBe(user.hashedPassword);
      expect(response.body.user.role).not.toBe(Role.master);
      expect(response.body.user.role).not.toBe(Role.worker);
      expect(response.body.accessToken).toBeDefined();
    }, 10000);
  });

  describe('[/auth/validation/:id] (GET)', () => {
    it('validation new user id 2 create', async () => {
      const response = await request(await app.getHttpServer())
        .get('/auth/validation/2')
        .expect(200);

      expect(response.body).toBeDefined();
      expect(response.body).toEqual({ sucess: 'Ok' });
      expect(response.body.sucess).toEqual('Ok');
    }, 10000);
  });

  describe('[/auth/login] (POST)', () => {
    it('insert login user create and validate id 2', async () => {
      const login = {
        email: user.email,
        password: user.hashedPassword,
      };

      const response = await request(await app.getHttpServer())
        .post('/auth/login')
        .send(login)
        .expect(201);

      accessToken = response.body.accessToken;

      expect(response.body).toBeDefined();
      expect(response.body.user.email).toBe(user.email);
      expect(response.body.user.name).toBe(user.name);
      expect(response.body.user.hashedPassword).not.toBe(user.hashedPassword);
      expect(response.body.accessToken).toBeDefined();
    }, 10000);
  });

  describe('[/auth/check-token] (GET)', () => {
    it('Get logged in user data', async () => {
      const response = await request(await app.getHttpServer())
        .get('/auth/check-token')
        .set('Authorization', `bearer ${accessToken}`)
        .expect(200);

      accessToken = response.body.accessToken;

      expect(response.body).toBeDefined();
      expect(response.body.user.email).toBe(user.email);
      expect(response.body.user.name).toBe(user.name);
      expect(response.body.user.hashedPassword).not.toBe(user.hashedPassword);
      expect(response.body.accessToken).toBeDefined();
    }, 10000);
  });

  describe('[/auth/register] (PATH)', () => {
    it('update user id 2', async () => {
      const response = await request(await app.getHttpServer())
        .patch('/auth/register')
        .set('Authorization', `bearer ${accessToken}`)
        .send({
          name: 'Teste Nome',
        })
        .expect(200);

      expect(response.body).toBeDefined();
      expect(response.body.email).toBe(user.email);
      expect(response.body.name).toBe('Teste Nome');
      expect(response.body.name).not.toBe(user.name);
      expect(response.body.hashedPassword).not.toBe(user.hashedPassword);
    }, 10000);
  });
});

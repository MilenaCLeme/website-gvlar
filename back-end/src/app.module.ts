import { Module, OnModuleInit, forwardRef } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { MailModule } from './mail/mail.module';
import { PropertyModule } from './property/property.module';
import { OwnerModule } from './owner/owner.module';
import { PropertyAndOwnerModule } from './propertyandowner/propertyandowner.module';
import { PhotographModule } from './photograph/photograph.module';
import { FileModule } from './file/file.module';
import { InitialUserService } from './user/initial-user/initial-user.service';
import { PrismaService } from './prisma/prisma.service';
import { CommentModule } from './comment/comment.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 500,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      serveRoot: '/uploads',
    }),
    forwardRef(() => UserModule),
    forwardRef(() => AuthModule),
    forwardRef(() => MailModule),
    forwardRef(() => PropertyModule),
    forwardRef(() => OwnerModule),
    forwardRef(() => PropertyAndOwnerModule),
    forwardRef(() => PhotographModule),
    forwardRef(() => FileModule),
    forwardRef(() => CommentModule),
  ],
  controllers: [],
  providers: [
    { provide: APP_GUARD, useClass: ThrottlerGuard },
    PrismaService,
    InitialUserService,
  ],
  exports: [],
})
export class AppModule implements OnModuleInit {
  constructor(private readonly initialUserService: InitialUserService) {}

  async onModuleInit() {
    await this.initialUserService.createInitialUser();
  }
}

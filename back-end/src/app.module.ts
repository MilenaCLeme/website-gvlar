import { Module, forwardRef } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { MailModule } from './mail/mail.module';
import { PropertieModule } from './propertie/propertie.module';
import { OwnerModule } from './owner/owner.module';
import { ImmobileOnOwnerModule } from './immobileOnOwner/immobileonowner.module';
import { PhotographModule } from './photograph/photograph.module';
import { FileModule } from './file/file.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 500,
    }),
    forwardRef(() => UserModule),
    forwardRef(() => AuthModule),
    forwardRef(() => MailModule),
    forwardRef(() => PropertieModule),
    forwardRef(() => OwnerModule),
    forwardRef(() => ImmobileOnOwnerModule),
    forwardRef(() => PhotographModule),
    forwardRef(() => FileModule),
  ],
  controllers: [],
  providers: [{ provide: APP_GUARD, useClass: ThrottlerGuard }],
  exports: [],
})
export class AppModule {}

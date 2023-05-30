import { Module, forwardRef } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { MailModule } from './mail/mail.module';
import { ImmobileModule } from './immobile/immobile.module';
import { OwnerModule } from './owner/owner.module';
import { ImmobileOnOwnerModule } from './immobileOnOwner/immobileonowner.module';

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
    forwardRef(() => ImmobileModule),
    forwardRef(() => OwnerModule),
    forwardRef(() => ImmobileOnOwnerModule),
  ],
  controllers: [],
  providers: [{ provide: APP_GUARD, useClass: ThrottlerGuard }],
  exports: [],
})
export class AppModule {}

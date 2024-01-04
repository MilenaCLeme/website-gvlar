import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
  forwardRef,
} from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserIdCheckMiddleware } from 'src/middlewares/user-id-check.middleware';
import { AuthModule } from 'src/auth/auth.module';
import { MailModule } from 'src/mail/mail.module';
import { PropertyModule } from 'src/property/property.module';

@Module({
  imports: [
    forwardRef(() => PrismaModule),
    forwardRef(() => AuthModule),
    forwardRef(() => MailModule),
    forwardRef(() => PropertyModule),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(UserIdCheckMiddleware).forRoutes({
      path: 'users/:id',
      method: RequestMethod.ALL,
    });
  }
}

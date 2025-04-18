import { MiddlewareConsumer, Module } from '@nestjs/common';

import { AuthMiddleware } from './utils/auth-middleware/auth-middleware';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GuestService } from './services/guest/guest.service';
import { GiftService } from './services/gift/gift.service';
import { GuestController } from './controllers/guest/guest.controller';
import { GiftController } from './controllers/gift/gift.controller';
import { GuestRepository } from './repositories/guest-repositories';
import { GuestPrismaRepository } from './repositories/prisma/guest-prisma-repositories';
import { GiftRepository } from './repositories/gift-repositories';
import { GiftPrismaRepository } from './repositories/prisma/gift-prisma-repositories';
import { PrismaService } from './database/prisma.service';

@Module({
  imports: [],
  controllers: [AppController, GuestController, GiftController],
  providers: [
    AppService,
    PrismaService,
    GuestService,
    GiftService,
    {
      provide: GuestRepository,
      useClass: GuestPrismaRepository,
    },
    {
      provide: GiftRepository,
      useClass: GiftPrismaRepository,
    },
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(
        '/guest/create',
        '/guest/delete',
        '/guest/update',
        '/gift/create',
        '/gift/delete',
        '/gift/update',
      );
  }
}

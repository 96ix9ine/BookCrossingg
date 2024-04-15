import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { BookModule } from './book/book.module';
import { UserModule } from './user/user.module';
import { DealModule } from './deal/deal.module';

@Module({
  imports: [PrismaModule, BookModule, UserModule, DealModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

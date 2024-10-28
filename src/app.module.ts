import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { TelegramBotModule } from './telegram-bot/telegram-bot.module';
import { configuration } from './config/configuration';
import { validationSchema } from './config/validationSchema';
import { ConfigurationService } from './config/configuration.service';
import { ConfigurationModule } from './config/configuration.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `${process.cwd()}/config/${process.env.NODE_ENV}.env`,
      isGlobal: true,
      load: [configuration],
      validationSchema,
    }),
    ConfigurationModule,
    PrismaModule,
    UserModule,
    TelegramBotModule,
  ],
})
export class AppModule {}
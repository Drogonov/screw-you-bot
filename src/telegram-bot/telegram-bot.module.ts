import { Module } from '@nestjs/common';
import { TelegrafModule } from 'nestjs-telegraf';
import { TelegramBotService } from './telegram-bot.service';
import { UserModule } from '../user/user.module';
import { UserService } from 'src/user/user.service';
import { MessageService } from 'src/message/message.service';
import { ScrewYouService } from 'src/screw-you/screw-you.servce';
import { ConfigService } from '@nestjs/config';

@Module({
    imports: [
        UserModule,
        TelegrafModule.forRootAsync({
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => {
                const token = configService.get('TELEGRAM_BOT_TOKEN');
                return { token };
            }
        })
    ],
    providers: [TelegramBotService, UserService, MessageService, ScrewYouService],
})
export class TelegramBotModule { }
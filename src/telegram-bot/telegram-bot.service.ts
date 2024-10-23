import { Inject, Injectable } from '@nestjs/common';
import { Command, Ctx, On, Start, Update } from 'nestjs-telegraf';
import { Context } from 'telegraf';
import { UserService } from '../user/user.service';
import { MessageService } from '../message/message.service';
import { ScrewYouService } from '../screw-you/screw-you.servce';

@Injectable()
@Update()
export class TelegramBotService {
    // Private properties
    private _isScrewYouFlowActive: boolean = false;

    // Dependency injection in service constructor
    constructor(
        private readonly userService: UserService,
        private readonly messageService: MessageService,
        private readonly screwYouService: ScrewYouService
    ) { }

    // Handle /help command
    @Command('help')
    async help(@Ctx() ctx: Context) {
        const helpMessage: string = `
      Available Commands: 
      - /start: хочешь узнать о себе что-то новое?
      - /help: справка для самых маленьких.
      - /screwyou: пора кого-то послать нахуй?
      - /screwyoutimes: сколько раз тебя послали нахуй?
      - /delete: ну поплачь!
    `;
        await ctx.reply(helpMessage);
    }

    // Handle /start command
    @Start()
    async start(@Ctx() ctx: Context) {
        try {
            const user = await this.userService.getUser(ctx.message.from.id);
            if (user) {
                const messages = await this.messageService.getNewMessages(user.id);
                if (messages.length) {
                    await ctx.reply(`Вас послали нахуй дорогой, ${user.firstName}`);
                    for (const message of messages) {
                        await ctx.reply(message.text);
                    }
                } else {
                    await ctx.reply('Привет, кажется ты никому не нужен, даже чтобы послать тебя нахуй)');
                }
            }
        } catch (error) {
            await this._handleNewUser(ctx);
        }
    }

    // Handle /screwyou command
    @Command('screwyou')
    async screwYou(@Ctx() ctx: Context) {
        this._setScrewYouFlowActive(true);
        await ctx.reply(`Привет ${ctx.message.from.first_name}, кого ты хочешь послать нахуй сегодня?`);
    }

    // Handle /screwyoutimes command
    @Command('screwyoutimes')
    async screwYouTimes(@Ctx() ctx: Context) {
        try {
            const user = await this.userService.getUser(ctx.message.from.id);
            const count = await this.messageService.numberOfViewedMessages(user.id);
            await ctx.reply(`Вас послали нахуй дорогой, ${count} раз`);
        } catch (error) {
            await ctx.reply('Привет, кажется ты никому не нужен...');
        }
    }

    // Handle /delete command
    @Command('delete')
    async delete(@Ctx() ctx: Context) {
        try {
            const user = await this.userService.getUser(ctx.message.from.id);
            await this.messageService.deleteAllMessages(user.id);
            await this.userService.deleteUser(user.telegramId);
            await ctx.reply('До встречи мистер лох');
        } catch (error) {
            await ctx.reply('Похоже случилась ошибка, пес ты все сломал...');
        }
    }

    // Handle message
    @On('message')
    async onText(@Ctx() ctx: Context) {
        if (this._isScrewYouFlowActive) {
            try {
                const userName = this._extractUsername(ctx.text);
                const user = await this.userService.getUser(ctx.message.from.id);
                const newUser = await this.userService.createDummyUser(userName);
                const newMessage = this._generateScrewYouMessage(user.id, newUser.id);

                await ctx.reply(`Отлично, мы передадим ${userName} пару ласковых`);
            } catch (error) {
                await ctx.reply('Похоже случилась ошибка, пес ты все сломал...');
            }
        } else {
            await ctx.reply('Ой или выбери команду или иди нахуй');
        }
    }

    // Private Methods

    private _setScrewYouFlowActive(status: boolean) {
        this._isScrewYouFlowActive = status;
    }

    private _extractUsername(text: string): string {
        // Remove '@' if present
        if (text.startsWith('@')) {
            return text.slice(1);
        }

        // Use RegExp to extract the username part from a URL
        const urlRegex = /(?:https?:\/\/)?(?:t\.me\/)([\w_]+)/i;
        const match = text.match(urlRegex);
        return match ? match[1] : text;
    }

    private _generateScrewYouMessage(senderId: number, receiverId: number) {
        const randomMessage = this.screwYouService.generateRandomMessage();
        return this.messageService.createMessage({
            senderId,
            receiverId,
            text: randomMessage,
        });
    }

    private async _handleNewUser(ctx: Context) {
        try {
            const newUser = await this.userService.createUser({
                telegramId: ctx.message.from.id,
                firstName: ctx.message.from.first_name,
                userName: ctx.message.from.username,
            });
            await ctx.reply('Привет, кажется ты у нас тут совсем новенький)');
        } catch (error) {
            await ctx.reply('Чет у нас тут какие-то ошибки идика ты нахуй');
        }
    }
}
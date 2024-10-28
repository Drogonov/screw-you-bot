import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ConfigurationService {
    constructor(private configService: ConfigService) { }

    getDatabaseURL(): string {
        return this.configService.get('db.url');;
    }

    getAppPort(): string {
        return this.configService.get('app.port');;
    }

    getTelegramToken():string {
        return this.configService.get('app.telegramToken')
    }
}
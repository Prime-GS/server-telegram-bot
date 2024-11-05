import { Module } from '@nestjs/common'
import { TelegrafModule } from 'nestjs-telegraf'
import { ConfigModule, ConfigService } from '@nestjs/config'
import * as LocalSession from 'telegraf-session-local'
import 'dotenv/config'

import { TelegramModule } from './modules/telegram/telegram.module'

const sessions = new LocalSession({ database: 'session_db.json' })

@Module({
  imports: [
    TelegrafModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        token: configService.get<string>('TG_TOKEN'),
        middlewares: [sessions.middleware()]
      }),
      inject: [ConfigService]
    }),
    ConfigModule.forRoot({ isGlobal: true }),
    TelegramModule
  ]
})
export class AppModule {}

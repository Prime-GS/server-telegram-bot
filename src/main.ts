import { NestExpressApplication } from '@nestjs/platform-express'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ConfigService } from '@nestjs/config'
import * as fs from 'fs'
import { getBotToken } from 'nestjs-telegraf'

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule)

  const bot = app.get(getBotToken())
  app.use(bot.webhookCallback('/tg-webhook'))

  app.enableCors()

  const configService = app.get(ConfigService)

  const storageRoot = configService.get<string>('STORAGE_ROOT')

  if (!storageRoot || !fs.existsSync(storageRoot)) {
    throw new Error('Storage root does not exist')
  }

  app.useStaticAssets(storageRoot, {
    prefix: '/storage'
  })

  await app.listen(3000)
}
bootstrap()

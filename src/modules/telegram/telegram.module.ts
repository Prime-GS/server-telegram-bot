import { Module } from '@nestjs/common'
import { AppService } from './service'
import { AppUpdate } from './update'
import { NameScene, TelScene, FileScene, SaveDataScene } from './scenes'
import { GoogleSheetModule } from 'nest-google-sheet-connector'
import * as credentials from 'service.json'

@Module({
  providers: [AppUpdate, NameScene, TelScene, FileScene, SaveDataScene, AppService],
  imports: [GoogleSheetModule.register(credentials)]
})
export class TelegramModule {}

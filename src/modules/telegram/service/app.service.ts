/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@nestjs/common'
import { GoogleSheetConnectorService } from 'nest-google-sheet-connector'
import { State } from '../interface'
import { writeFile } from 'fs/promises'

@Injectable()
export class AppService {
  constructor(private googleSheetConnectorService: GoogleSheetConnectorService) {}

  async saveData(data: State): Promise<any> {
    return await this.googleSheetConnectorService.appendRow(
      process.env.SPREAD_SHEET_ID,
      { properties: { title: 'list' } },
      [[data.id, data.telegram_id, data.telegram_name, data.participant_name, data.tel, data.cheque, data.date]]
    )
  }

  async getId(): Promise<any> {
    const data = await this.googleSheetConnectorService.readRange(process.env.SPREAD_SHEET_ID, 'I1')
    const cell = data[0][0]

    return Number(cell) + 100001
  }

  async getFileUrl(fileId: string): Promise<any> {
    try {
      const response = await fetch(`https://api.telegram.org/bot${process.env.TG_TOKEN}/getFile?file_id=${fileId}`, {
        cache: 'no-cache'
      })
      const data = await response.json()

      await fetch(`https://api.telegram.org/file/bot${process.env.TG_TOKEN}/${data.result.file_path}`, {
        cache: 'no-cache'
      })
        .then((x) => x.arrayBuffer())
        .then((x) => writeFile(`${process.env.STORAGE_ROOT}/${data.result.file_path}`, Buffer.from(x)))

      return process.env.STORAGE_PATH + data.result.file_path
    } catch (error) {
      console.log(error)
    }
  }
}

import { Injectable } from '@nestjs/common'
import { Ctx, Message, On, Scene, SceneEnter } from 'nestjs-telegraf'
import { SceneContext } from 'telegraf/typings/scenes'
import { Context } from '../interface'
import { AppService } from '../service'

@Injectable()
@Scene('fileScene')
export class FileScene {
  constructor(private readonly appService: AppService) {}

  @SceneEnter()
  async FileScene(@Ctx() ctx: SceneContext & Context) {
    ctx.session.type = 'file'
    await ctx.reply('Отправьте чек | Чекті жіберіңіз')
  }

  @On('photo')
  async onPhoto(@Message() message, @Ctx() ctx: Context) {
    if (!ctx.session.type) return
    if (ctx.session.type === 'file' && !!message.photo) {
      ctx.session.type = undefined
      ctx.reply('Данные отправляются | Деректер жіберіледі')

      const length = message.photo.length - 1

      ctx.session.state.cheque = await this.appService.getFileUrl(message.photo[length].file_id)
      ctx.scene.enter('saveDataScene')
    }
  }

  @On('document')
  async onDocument(@Message() message, @Ctx() ctx: Context) {
    if (!ctx.session.type) return

    if (ctx.session.type === 'file' && !!message.document) {
      const format = message.document.file_name.split('.')[message.document.file_name.split('.').length - 1]

      if (['pdf', 'docx', 'png', 'jpeg', 'svg', 'jpg'].includes(format)) {
        ctx.session.type = undefined
        ctx.reply('Данные отправляются | Деректер жіберіледі')
        ctx.session.state.cheque = await this.appService.getFileUrl(message.document.file_id)
        ctx.scene.enter('saveDataScene')
      } else {
        ctx.reply(
          'Недопустимый тип файла | Жарамсыз файл түрі \nРазрешенные форматы | Рұқсат етілген форматтар: \npng, jpeg, jpg, svg, pdf, docx'
        )
      }
    }
  }
}

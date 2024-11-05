import { Injectable } from '@nestjs/common'
import { Ctx, Scene, SceneEnter } from 'nestjs-telegraf'
import { SceneContext } from 'telegraf/typings/scenes'
import { Context } from '../interface'
import { AppService } from '../service'
import { repeatButton } from '../buttons'

@Injectable()
@Scene('saveDataScene')
export class SaveDataScene {
  constructor(private readonly appService: AppService) {}

  @SceneEnter()
  async FileScene(@Ctx() ctx: SceneContext & Context) {
    ctx.session.state.id = await this.appService.getId()
    ctx.session.state.telegram_id = ctx.message.from.username
    ctx.session.state.telegram_name = ctx.message.from.first_name
    ctx.session.state.date = new Date().toLocaleString('kk-RU')

    ctx.session.state.tel = ctx.session.state.tel.replace('+', '')

    await this.appService.saveData(ctx.session.state)

    ctx.session.type = undefined
    ctx.replyWithHTML(
      `Данные отправлены | Деректер жіберілді \nВаш номер участника | Сіздің мүшелік нөміріңіз 
      <b>${ctx.session.state.id}</b>`,
      repeatButton()
    )
    ctx.scene.leave()
    return
  }
}

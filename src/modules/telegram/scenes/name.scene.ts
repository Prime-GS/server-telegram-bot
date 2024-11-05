import { Injectable } from '@nestjs/common'
import { Ctx, Message, On, Scene, SceneEnter } from 'nestjs-telegraf'
import { SceneContext } from 'telegraf/typings/scenes'
import { Context } from '../interface'

@Injectable()
@Scene('nameScene')
export class NameScene {
  @SceneEnter()
  async scene(@Ctx() ctx: SceneContext & Context) {
    ctx.session.type = 'name'
    await ctx.reply('Введите своё ФИО | Аты-жөніңізді енгізіңіз')
  }

  @On('message')
  async onMessage(@Message('text') message: string, @Ctx() ctx: SceneContext & Context) {
    if (!ctx.session.type) return

    if (!message) {
      ctx.reply('Ошибка обработки')
    } else if (ctx.session.type === 'name') {
      ctx.session.state.participant_name = message

      ctx.scene.enter('telScene')
      return
    }
  }
}

import { Injectable } from '@nestjs/common'
import { Ctx, Message, On, Scene, SceneEnter } from 'nestjs-telegraf'
import { SceneContext } from 'telegraf/typings/scenes'
import { Context } from '../interface'

@Injectable()
@Scene('telScene')
export class TelScene {
  @SceneEnter()
  async telScene(@Ctx() ctx: SceneContext & Context) {
    ctx.session.type = 'tel'
    await ctx.reply('Введите номер телефона | Телефон нөмірін енгізіңіз')
  }

  @On('message')
  async onMessage(@Message('text') message: string, @Ctx() ctx: Context) {
    ctx.session.type = 'tel'

    if (!ctx.session.type) return

    if (ctx.session.type === 'tel') {
      const check = /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/
      if (check.test(message)) {
        ctx.session.state.tel = message

        ctx.scene.enter('fileScene')
        return
      } else {
        await ctx.reply(
          'Некорректный ввод телефона | Телефонды дұрыс енгізбеу \nВведите номер телефона | Телефон нөмірін енгізіңіз'
        )
      }
    }
  }
}

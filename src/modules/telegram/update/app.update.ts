import { Action, Ctx, InjectBot, Start, Update } from 'nestjs-telegraf'
import { Telegraf } from 'telegraf'
import { Context } from '../interface'
import { actionButtons } from '../buttons'
import { AppService } from '../service'

@Update()
export class AppUpdate {
  constructor(@InjectBot() private readonly bot: Telegraf<Context>, private readonly appService: AppService) {}

  @Start()
  async startCommand(@Ctx() ctx: Context) {
    await ctx.replyWithHTML(
      `
<b>Период акции с 01 августа по 30 сентября 2024 года</b>
1.  Заправься от 30 л топливом АИ-92, АИ-95, ДТ, получи чек 
2.  Заполните Ваше имя и телефон 
3.  Прикрепите чек
4.  Получите номер участника   
5.  Следи за розыгрышем в инстаграм https://www.instagram.com/compass.kz/

<b>Регистрируясь, вы подтверждаете согласие с правилами акции </b>


<b>Науқан мерзімі 2024 жылғы 1 тамыздан 30 қыркүйекке дейін</b>
1. 30 литр АИ-92, АИ-95, ДТ жанармай құйып, түбіртек алыңыз. 
2. Аты-жөніңізді және телефон нөміріңізді енгізіңіз 
3. Түбіртекті тіркеңіз
4. Мүшелік нөміріңізді алыңыз   
5. Инстаграмдағы ұтысқа жазылыңыз https://www.instagram.com/compass.kz/

<b>Тіркелу арқылы сіз акция ережелерімен келісесіз</b>`,
      actionButtons()
    )
  }

  @Action('data')
  async getUserData(@Ctx() ctx: Context) {
    if (!ctx.session.type) {
      ctx.session.state = {}
      await ctx.scene.enter('nameScene')
      await ctx.web
    }
  }
}

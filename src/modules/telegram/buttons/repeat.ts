import { Markup } from 'telegraf'

export const repeatButton = () => {
  return Markup.inlineKeyboard(
    [Markup.button.callback('Заполнить данные еще раз | Деректерді тағы бір рет толтырыңыз', 'data')],
    { columns: 1 }
  )
}

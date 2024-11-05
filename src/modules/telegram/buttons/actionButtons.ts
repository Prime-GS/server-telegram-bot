import { Markup } from 'telegraf'

export const actionButtons = () => {
  return Markup.inlineKeyboard(
    [
      Markup.button.webApp('Правила акции | Акция ережелері', 'https://sites.google.com/uss.kz/action-compass'),
      Markup.button.callback('Участвовать | Қатысу', 'data')
    ],
    { columns: 1 }
  )
}

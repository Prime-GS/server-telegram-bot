/* eslint-disable @typescript-eslint/no-explicit-any */
import { Context as ContextTelegraf } from 'telegraf'
import { State } from './state.interface'

export interface Context extends ContextTelegraf {
  [x: string]: any
  ctx: any
  session: {
    type?: 'name' | 'tel' | 'file'
    state?: State
  }
}

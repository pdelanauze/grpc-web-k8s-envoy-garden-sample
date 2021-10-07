import {IContext} from 'overmind'
import {state} from "./state";
import * as actions from './actions';
import * as effects from './effects';

export const config = {
  state,
  actions,
  effects,
}

export type Context = IContext<typeof config>

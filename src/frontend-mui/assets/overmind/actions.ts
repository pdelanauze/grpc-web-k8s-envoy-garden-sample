import {Context} from "./index";

export const onInitializeOvermind = async ({state, actions, effects}, overmind) => {
  await effects.api.connect();
}

export const sendCommandAction = async (context: Context, command: string, args: string[]) => {
  context.state.isSending = true;
  context.state.result = "";
  context.state.result = await context.effects.api.sendCommand(command, args);
  context.state.isSending = false;
}

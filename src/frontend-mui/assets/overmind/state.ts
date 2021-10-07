import {derived} from "overmind";

type State = {
  command: string
  arguments: string[]
  result: string,
  isSending: boolean,
}

export const state: State = {
  command: "",
  arguments: [],
  isSending: false,
  result: derived((state: State) => {
    if (state.command && state.arguments?.length) {
      return "Command result: TODO";
    }
    return "Server is listening ...";
  })
}

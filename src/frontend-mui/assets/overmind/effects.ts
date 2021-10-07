import {RemoteCLIClient} from "../proto/CliServiceClientPb";
import {CommandInput} from "../proto/cli_pb";

let service: RemoteCLIClient;

export const api = {

  connect: async (): Promise<void> => {
    service = new RemoteCLIClient(`${window.location.origin}/grpc`, null, {

    });
  },

  sendCommand: async (command, args): Promise<string> => {
    const request = new CommandInput();
    request.setCommand(command);
    request.setArgsList(args);

    const response = await service.shell(request, null);
    return response.getOutput();
  }
}

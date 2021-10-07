// For executing commands
use std::process::{Command, Stdio};

use tonic::{Request, Response, Status, transport::Server};

// Proto message structs
use remotecli_proto::{CommandInput, CommandOutput};
// Proto generated server traits
use remotecli_proto::remote_cli_server::{RemoteCli, RemoteCliServer};

// For the server listening address
use crate::ServerOptions;

pub mod remotecli_proto {
  tonic::include_proto!("remotecli");
}

#[derive(Default)]
pub struct Cli {}

#[tonic::async_trait()]
impl RemoteCli for Cli {
  async fn shell(
    &self,
    request: Request<CommandInput>,
  ) -> Result<Response<CommandOutput>, Status> {
    let req_command = request.into_inner();
    let command = req_command.command;
    let args = req_command.args;

    println!("Running command: {:?} - args: {:?}", &command, &args);

    let process = Command::new(command)
      .args(args)
      .stdout(Stdio::piped())
      .spawn()
      .expect("Failed to execute child process");

    let output = process
      .wait_with_output()
      .expect("Failed to wait on child process");

    let output = output.stdout;

    Ok(Response::new(CommandOutput {
      output: String::from_utf8(output).unwrap()
    }))
  }
}

pub async fn start_server(opts: ServerOptions) -> Result<(), Box<dyn std::error::Error>> {
  let addr = opts.server_listen_addr.parse().unwrap();
  let cli_server = Cli::default();

  println!("RemoteCliServer listening on {}", addr);

  Server::builder()
    .add_service(RemoteCliServer::new(cli_server))
    .serve(addr)
    .await?;

  Ok(())
}

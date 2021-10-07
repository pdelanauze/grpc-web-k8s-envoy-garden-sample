use tokio::time::{Duration, sleep};

use remotecli_proto::CommandInput;
use remotecli_proto::remote_cli_client::RemoteCliClient;

use crate::RemoteCommandOptions;

pub mod remotecli_proto {
  tonic::include_proto!("remotecli");
}

pub async fn client_run(rc_opts: RemoteCommandOptions) -> Result<(), Box<dyn std::error::Error>> {
  let mut client = RemoteCliClient::connect(rc_opts.server_address).await?;

  let request = tonic::Request::new(CommandInput {
    command: rc_opts.command[0].clone().into(),
    args: rc_opts.command[1..].to_vec()
  });

  let response = client.shell(request).await?;

  println!("Response:{:?}", response);

  Ok(())
}

pub async fn test_lb(rc_opts: RemoteCommandOptions) -> Result<(), Box<dyn std::error::Error>> {
  let mut client = RemoteCliClient::connect(rc_opts.server_address).await?;

  for _i in 1..100 {
    let request = tonic::Request::new(CommandInput {
      command: String::from("env"),
      args: vec![String::from("hostname")]
    });

    let response = client.shell(request).await?;

    println!("Host {:?} replied", response);
    sleep(Duration::from_millis(100)).await;
  }

  Ok(())
}

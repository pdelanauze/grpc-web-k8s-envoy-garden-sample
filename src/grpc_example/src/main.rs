use structopt::StructOpt;

pub mod remotecli;

#[derive(Debug, StructOpt)]
pub enum SubCommand {
  /// Start the gRPC server
  #[structopt(name = "server")]
  StartServer(ServerOptions),

  /// Send a remote command to the gRPC server
  #[structopt(setting = structopt::clap::AppSettings::TrailingVarArg)]
  Run(RemoteCommandOptions),

  /// Test load balancing
  #[structopt(name = "test-lb")]
  TestLoadBalancer(RemoteCommandOptions)
}

#[derive(StructOpt, Debug)]
pub struct ServerOptions {
  /// The listening address of the server
  #[structopt(long, default_value = "127.0.0.1:50051")]
  pub server_listen_addr: String,
}

#[derive(StructOpt, Debug)]
pub struct RemoteCommandOptions {
  /// The remote address of the grpc server
  #[structopt(long = "server", default_value = "http://127.0.0.1:50051")]
  pub server_address: String,

  /// The full command to send to the server
  pub command: Vec<String>,
}

#[derive(StructOpt, Debug)]
#[structopt(name = "remotecli")]
struct ApplicationArguments {
  #[structopt(flatten)]
  pub subcommand: SubCommand,
}

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
  let args = ApplicationArguments::from_args();

  match args.subcommand {
    SubCommand::StartServer(opts) => {
      println!("Start the server on {:?}", opts.server_listen_addr);
      remotecli::server::start_server(opts).await?;
    }
    SubCommand::Run(rc_opts) => {
      println!("Run command: '{:?}'", rc_opts.command);
      remotecli::client::client_run(rc_opts).await?;
    }
    SubCommand::TestLoadBalancer(opts) => {
      println!("Starting to send requests");
      remotecli::client::test_lb(opts).await?;
    }
  }

  Ok(())
}

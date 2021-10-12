FROM rust:1.55.0

WORKDIR /code
RUN rustup component add rustfmt

# This is only used in dev mode
RUN cargo install watchexec-cli

COPY . .
RUN cargo install --path .

CMD ["target/release/grpc_example", "server", "--server-listen-addr", "0.0.0.0:50051"]

FROM rust:1.55.0

WORKDIR /code
RUN rustup component add rustfmt

COPY . .
RUN cargo install --path .

CMD ["target/release/grpc_example", "server", "--server-listen-addr", "0.0.0.0:50051"]

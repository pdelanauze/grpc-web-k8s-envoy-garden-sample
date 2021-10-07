#!/bin/sh -e

# This requires apt install protobuf-compiler
# And https://github.com/grpc/grpc-web/releases/download/1.2.1/protoc-gen-grpc-web-1.2.1-linux-x86_64 to be in your path


DIR=./proto/
OUT_DIR=assets/proto

mkdir -p assets/proto
protoc -I=$DIR cli.proto \
    --js_out=import_style=commonjs,binary:$OUT_DIR \
    --grpc-web_out=import_style=typescript,mode=grpcweb:$OUT_DIR

FROM node:16
WORKDIR /code

# Used by the esbuild process
RUN apt update
RUN apt install rsync protobuf-compiler wget -y

RUN wget https://github.com/grpc/grpc-web/releases/download/1.2.1/protoc-gen-grpc-web-1.2.1-linux-x86_64
RUN mv protoc-gen-grpc-web-1.2.1-linux-x86_64 /usr/local/bin/protoc-gen-grpc-web
RUN chmod +x /usr/local/bin/protoc-gen-grpc-web

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build
CMD ["npm", "run", "start"]

# grpc-web-k8s-envoy-garden-sample

Sample project deploying a grpc load balanced service with envoy being consumed by a frontend service with grpc-web on k8s through garden.

## Prerequisites

- [kind](https://kind.sigs.k8s.io/docs/user/quick-start/)
- [garden](https://docs.garden.io/getting-started/1-installation)

## Getting started

```
./project.garden.init.sh
cp -r src/grpc_example/proto src/frontend-mui/
garden deploy
```

Go to [http://grpc-web-k8s-envoy-garden-sample.local.app.garden/client/](http://grpc-web-k8s-envoy-garden-sample.local.app.garden/client/)

When making changes, you'll need to rerun `garden deploy` to see them (until hot reload is implemented for dev environments).

## TODO:

- Fix passing arg1,2,3 in RpcExample.ts file (only sends the command right now)
- gRPC header metadata example that could have JWT tokens, or figure out [how to get grpc-web authentication going](https://github.com/grpc/grpc-web/issues/351)
- Generate & use self-signed certs (look up garden & cert-manager integration)
- Figure out build process around proto files, right now have to copy proto directory manually on change

## Known issues:

- initial deployment fails with too many open files w/ garden: run it again and it should succeed

  ```

****** frontend-mui-795bdbdf47-dvd2j ******
------ frontend-mui ------
> frontend@1.0.0 start
> nodemon index.ts

[nodemon] 2.0.13
[nodemon] to restart at any time, enter `rs`
[nodemon] watching path(s): *.*
[nodemon] watching extensions: ts,json
[nodemon] starting `ts-node index.ts`
[nodemon] Internal watch failed: EMFILE: too many open files, watch '/code'
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
1 deploy task(s) failed!

See .garden/error.log for detailed error message

```


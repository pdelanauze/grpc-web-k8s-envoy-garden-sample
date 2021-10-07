# EFK based logging infrastructure

Access the RESTful API of elasticsearch through:

```
kubectl port-forward es-cluster-0 9200:9200 --namespace=kube-logging
curl http://localhost:9200/_cluster/state?pretty
```

Access the kibana interface through:

`./start_kibana.sh`

# TODO

- [ ] Expose a port through garden

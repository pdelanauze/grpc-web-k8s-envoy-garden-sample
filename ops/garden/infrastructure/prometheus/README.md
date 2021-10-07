# Prometheus & Grafana setup

Easiest way is to use the [kube-prometheus project](https://github.com/prometheus-operator/kube-prometheus#installing)

Install:

```
# Create the namespace and CRDs, and then wait for them to be available before creating the remaining resources
kubectl create -f manifests/setup
until kubectl get servicemonitors --all-namespaces ; do date; sleep 1; echo ""; done
kubectl create -f manifests/
```

Prometheus

`kubectl --namespace monitoring port-forward svc/prometheus-k8s 9090`

Then access via http://localhost:9090

Grafana

`kubectl --namespace monitoring port-forward svc/grafana 3000`

Then access via http://localhost:3000 and use the default grafana user:password of admin:admin.

Alert Manager

`kubectl --namespace monitoring port-forward svc/alertmanager-main 9093`

Then access via http://localhost:9093

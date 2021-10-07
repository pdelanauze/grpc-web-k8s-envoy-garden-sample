#!/bin/sh -e

kubectl port-forward `kubectl get pods --namespace kube-logging | grep kibana | awk '{print $1}'` 5601:5601 --namespace=kube-logging



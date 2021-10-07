#!/bin/sh -e

echo ""
echo ""
echo ""
echo "Here's your token: "

kubectl -n kubernetes-dashboard get secret $(kubectl -n kubernetes-dashboard get sa/admin-user -o jsonpath="{.secrets[0].name}") -o go-template="{{.data.token | base64decode}}"

echo ""
echo ""
echo ""
echo "Open your browser at the following link to see your dashboard"

echo "http://localhost:8001/api/v1/namespaces/kubernetes-dashboard/services/https:kubernetes-dashboard:/proxy/"


kubectl proxy

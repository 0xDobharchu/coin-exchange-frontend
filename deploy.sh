#!/bin/bash

builNumber=$(date "+%Y%m%d_%H%M%S")

PROJECT="coin-exchange-221604"
NAME_SPACE=$1
NGINX_IMAGE="$NAME_SPACE-nginx"
FRONTEND_IMAGE="$NAME_SPACE-frontend-service"

gcloud auth activate-service-account --key-file /deployments/deploy.cred.json
gcloud container clusters get-credentials server-cluster-1 --zone asia-southeast1-a --project coin-exchange-221604
docker build -t gcr.io/$PROJECT/$NGINX_IMAGE:$builNumber .

printf '\033[31m%s\033[0m\n' "=== READY TO DEPLOY ======";

docker tag gcr.io/$PROJECT/$NGINX_IMAGE:$builNumber gcr.io/$PROJECT/$NGINX_IMAGE:$builNumber
gcloud docker -- push gcr.io/$PROJECT/$NGINX_IMAGE:$builNumber
kubectl --namespace=$NAME_SPACE set image deployment/nginx nginx=gcr.io/$PROJECT/$NGINX_IMAGE:$builNumber

printf '\033[32m%s\033[0m\n' "=== SUCCESSFULL DEPLOY $V ===== "

#!/bin/bash

builNumber=$(date "+%Y%m%d_%H%M%S")

PROJECT="handshake-205007"
NAME_SPACE=$1
NGINX_IMAGE="$NAME_SPACE-nginx"
FRONTEND_IMAGE="$NAME_SPACE-frontend-service"

gcloud auth activate-service-account --key-file handshake-e07c096463e6.json
gcloud container clusters get-credentials server-cluster1 --zone us-west1-a --project handshake-205007
docker build -t gcr.io/$PROJECT/$NGINX_IMAGE:$builNumber .

printf '\033[31m%s\033[0m\n' "=== READY TO DEPLOY ======";

docker tag gcr.io/$PROJECT/$NGINX_IMAGE:$builNumber gcr.io/$PROJECT/$NGINX_IMAGE:$builNumber
gcloud docker -- push gcr.io/$PROJECT/$NGINX_IMAGE:$builNumber
kubectl --namespace=$NAME_SPACE set image deployment/nginx nginx=gcr.io/$PROJECT/$NGINX_IMAGE:$builNumber

printf '\033[32m%s\033[0m\n' "=== SUCCESSFULL DEPLOY $V ===== "

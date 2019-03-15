#!/bin/sh
docker login --username gitlab-ci-token --password $CI_JOB_TOKEN $CI_REGISTRY;
docker build --file ./deploy/configs/Dockerfile --tag $CI_REGISTRY_IMAGE:$CI_BUILD_REF_NAME .;
docker push $CI_REGISTRY_IMAGE:$CI_BUILD_REF_NAME;


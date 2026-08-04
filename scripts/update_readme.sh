#!/bin/sh

set -e

VERSION=$1
BRANCH=$2

if [ -z "${VERSION}" ]; then
  echo "Version not specified; Exiting."
  exit 1;
fi
if [ -z "${BRANCH}" ]; then
  echo "Version not specified; Exiting."
  exit 1;
fi

if [ ! "${BRANCH}" = "refs/heads/main" ]; then
  echo "Branch is ${BRANCH}; README.md not updated."
  exit 0;
fi

sed -i -e "s/NEXT_VERSION/${VERSION}/g" ./README.md
sed -i -e "s|https://github.com/fran68/mini-graph-card-xt/releases/download/.*/mini-graph-card-xt-bundle.js|https://github.com/fran68/mini-graph-card-xt/releases/download/${VERSION}/mini-graph-card-xt-bundle.js|g" ./README.md
sed -i -e "s|-\surl:\s/local/mini-graph-card-xt-bundle.js?v=.*|- url: /local/mini-graph-card-bundle-xt.js?v=${VERSION}|g" ./README.md


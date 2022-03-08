#!/bin/bash

cd /Users/qoli/BitizenWallet/sdk-0.4.5
# yarn unlink
yarn clean
yarn
yarn build
yarn link
yarn watch

cd /Users/qoli/BitizenWallet/lifi-web
rm -rf node_modules
yarn install --force
yarn link '@lifinance/sdk'
yarn start

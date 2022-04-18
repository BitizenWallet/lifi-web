# BitizenWallet/lifi



## Web

https://swap.dev.bitizen.org/

for normal network.



https://swap.dev.bitizen.org/#/testnet

for test network.



## Dev

```shell
// install
yarn install

// debug run
yarn start 

// build + deply to gh-pages
yarn deploy 
```

## error
```
Failed to compile
./src/components/web3/connectors.ts
Attempted import error: 'ChainId' is not exported from '../../types'.
```

需要 SDK Build `yarn build`


## helpful Link

https://ropsten.oregonctf.org/

https://socialsharepreview.com/?url=https://swap.dev.bitizen.org/



## SDK 開發

```shell
// enter SDK dirctory
yarn link

// enter UI dirctrory
yarn link '@lifinance/sdk'
```


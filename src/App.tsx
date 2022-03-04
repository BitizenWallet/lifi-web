import './App.css'
import './ThemePatch.css'

import { Button, Col, Layout, Menu, Row } from 'antd'
import { Content } from 'antd/lib/layout/layout'
import { useEffect, useState } from 'react'
import { HashRouter, Redirect, Route, Switch } from 'react-router-dom'

import NotFoundPage from './components/NotFoundPage'
import Swap from './components/Swap'
import WalletButtons from './components/web3/WalletButtons'
import Web3ConnectionManager from './components/web3/Web3ConnectionManager'
import WrappedWeb3ReactProvider from './components/web3/WrappedWeb3ReactProvider'
import setMetatags from './services/metatags'
import { getChainById } from './types'

const getTransferChains = (jsonArraySting: string) => {
  try {
    const chainIds = JSON.parse(jsonArraySting)
    return chainIds.map(getChainById)
  } catch (e) {
    return []
  }
}

function App() {
  return (
    <HashRouter>
      <WrappedWeb3ReactProvider>
        <Web3ConnectionManager>
          <Layout>
            <Content>
              <Switch>
                <Redirect exact from="/swap" to="/" />
                <Route
                  exact
                  path="/"
                  render={() => {
                    setMetatags({
                      title: 'Swap',
                    })

                    const transferChains = getTransferChains(
                      process.env.REACT_APP_LIFI_ENABLED_CHAINS_JSON!,
                    )
                    return (
                      <div className="lifiWrap">
                        <Swap transferChains={transferChains} />
                      </div>
                    )
                  }}
                />
                <Route
                  exact
                  path="/testnet"
                  render={() => {
                    setMetatags({
                      title: 'Testnet',
                    })
                    const transferChains = getTransferChains(
                      process.env.REACT_APP_LIFI_ENABLED_CHAINS_TESTNET_JSON!,
                    )
                    return (
                      <div className="lifiWrap">
                        <Swap transferChains={transferChains} />
                      </div>
                    )
                  }}
                />
                <Route
                  path="*"
                  render={() => {
                    setMetatags({
                      title: 'Not Found',
                      status: 404,
                    })
                    return <NotFoundPage />
                  }}
                />
              </Switch>
            </Content>
          </Layout>
        </Web3ConnectionManager>
      </WrappedWeb3ReactProvider>
    </HashRouter>
  )
}

export { App }

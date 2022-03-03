import './App.css'

import { GithubOutlined, TwitterOutlined } from '@ant-design/icons'
import { Button, Col, Layout, Menu, Row } from 'antd'
import { Content } from 'antd/lib/layout/layout'
import { useEffect, useState } from 'react'
import { HashRouter, Redirect, Route, Switch } from 'react-router-dom'

// import logo from './assets/icon192.png'
// import AboutPage from './components/AboutPage'
import NotFoundPage from './components/NotFoundPage'
import NotificationOverlay from './components/NotificationsOverlay'
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

function usePageViews() {
  const [path, setPath] = useState<string>()

  // eslint-disable-next-line no-console
  console.log('path', path)

  // useEffect(() => {
  //   if (path) {
  //     analytics.sendPageView(path)
  //   }
  // }, [path])

  return path
}

function App() {
  const path = usePageViews()

  function embedView() {
    setMetatags({
      title: 'Swap (embed)',
    })
    const transferChains = getTransferChains(process.env.REACT_APP_LIFI_ENABLED_CHAINS_JSON!)
    return (
      <div className="lifiEmbed">
        <Swap transferChains={transferChains} />
        <div className="poweredBy">
          powered by{' '}
          <a href="https://li.finance/" target="_blank" rel="nofollow noreferrer">
            Li.Finance
          </a>
        </div>
        <div className="wallet-buttons-embed-view">
          <WalletButtons />
        </div>
      </div>
    )
  }

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

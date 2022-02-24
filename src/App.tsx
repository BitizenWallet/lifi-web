import './App.css'

import { GithubOutlined, TwitterOutlined } from '@ant-design/icons'
import { Button, Col, Layout, Menu, Row } from 'antd'
import { Content } from 'antd/lib/layout/layout'
import { useEffect, useState } from 'react'
import { HashRouter, Redirect, Route, Switch } from 'react-router-dom'

// import logo from './assets/icon192.png'
// import AboutPage from './components/AboutPage'
import Dashboard from './components/Dashboard'
import NotFoundPage from './components/NotFoundPage'
import NotificationOverlay from './components/NotificationsOverlay'
import Swap from './components/Swap'
import WalletButtons from './components/web3/WalletButtons'
import Web3ConnectionManager from './components/web3/Web3ConnectionManager'
import WrappedWeb3ReactProvider from './components/web3/WrappedWeb3ReactProvider'
import analytics from './services/analytics'
import setMetatags from './services/metatags'
import { initStomt } from './services/stomt'
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
          {path === '/embed' ? (
            embedView()
          ) : (
            <Layout>
              <Content>
                <Switch>
                  <Redirect exact from="/swap" to="/" />
                  {/* <Route
                    path="/dashboard"
                    render={() => {
                      setMetatags({
                        title: 'Dashboard',
                      })
                      initStomt('dashboard')
                      return (
                        <>
                          <Dashboard />
                        </>
                      )
                    }}
                  /> */}
                  <Route
                    path="/"
                    render={() => {
                      setMetatags({
                        title: 'Swap',
                      })
                      initStomt('swap')
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
                    path="/testnet"
                    render={() => {
                      setMetatags({
                        title: 'Testnet',
                      })
                      initStomt('swap')
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
                      initStomt('lifi')
                      return <NotFoundPage />
                    }}
                  />
                </Switch>
              </Content>

              {/* Social Links */}
              <div className="lifi-content-social-links">
                <a
                  className="icon-link"
                  href="https://twitter.com/lifiprotocol"
                  target="_blank"
                  rel="nofollow noreferrer">
                  <TwitterOutlined />
                </a>
                <a
                  className="icon-link"
                  href="https://github.com/lifinance"
                  target="_blank"
                  rel="nofollow noreferrer">
                  <GithubOutlined />
                </a>
                <Button
                  className="lifi-support-link"
                  href="https://discord.gg/lifi"
                  target="_blank"
                  rel="nofollow noreferrer">
                  Support
                </Button>
              </div>

              {/* <Footer></Footer> */}
              <NotificationOverlay />
            </Layout>
          )}
        </Web3ConnectionManager>
      </WrappedWeb3ReactProvider>
    </HashRouter>
  )
}

export { App }

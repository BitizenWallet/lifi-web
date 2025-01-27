import { Button, Steps } from 'antd'

import { formatTokenAmount, parseSecondsAsTime } from '../services/utils'
import { findTool, getChainById, Route as RouteType, Step } from '../types'

interface RouteProps {
  route: RouteType
  selected: boolean
  onSelect: Function
}

const Route = ({ route, selected, onSelect }: RouteProps) => {
  const formatToolName = (toolKey: string) => {
    const tool = findTool(toolKey)
    if (tool) {
      return tool.name
    } else {
      return toolKey
    }
  }

  const parseStepShort = (step: Step) => {
    switch (step.type) {
      case 'swap':
        return (
          <>
            Swap to {formatTokenAmount(step.action.toToken, step.estimate.toAmount)} via{' '}
            {formatToolName(step.tool)}
          </>
        )
      case 'cross':
        return (
          <>
            Transfer to {formatTokenAmount(step.action.toToken, step.estimate.toAmount)} via{' '}
            {formatToolName(step.tool)}
          </>
        )
      default:
        // eslint-disable-next-line no-console
        console.error('invalid short step')
        return <></>
    }
  }

  const parseStep = (step: Step) => {
    const { action, estimate } = step
    switch (step.type) {
      case 'swap':
        return {
          title: 'Swap Tokens',
          description: `${formatTokenAmount(
            action.fromToken,
            estimate.fromAmount,
          )} for ${formatTokenAmount(action.toToken, estimate.toAmount)} via ${formatToolName(
            step.tool,
          )}`,
        }
      case 'cross':
        return {
          title: 'Cross Chains',
          description: `${getChainById(action.fromChainId).name}: ${formatTokenAmount(
            action.fromToken,
            estimate.fromAmount,
          )} to ${getChainById(action.toChainId).name}: ${formatTokenAmount(
            action.toToken,
            estimate.toAmount,
          )} via ${formatToolName(step.tool)}`,
        }
      case 'lifi':
        return {
          title: 'LiFi Contract',
          description: (
            <>
              Single transaction including:
              <br />
              <ol style={{ paddingLeft: 22 }}>
                {step.includedSteps.map(parseStepShort).map((line, index) => (
                  <li key={index}>{line}</li>
                ))}
              </ol>
            </>
          ),
        }
      default:
        return {
          title: 'Invalid Step',
          description: '',
        }
    }
  }

  const aggregatedDuration = route.steps.reduce<number>(
    (duration, step) => duration + step.estimate?.executionDuration || 1,
    0,
  )

  const parsedDuration = parseSecondsAsTime(aggregatedDuration)

  return (
    <div
      className={'swap-route ' + (selected ? 'optimal' : '')}
      style={{
        padding: 24,
        paddingTop: 24,
        paddingBottom: 24,
        marginTop: 10,
        marginBottom: 10,
      }}
      onClick={() => onSelect()}>
      {/* {selected ? (
        <div className="selected-label">Selected</div>
      ) : (
        <Button shape="round" type="text" size={'large'} onClick={() => onSelect()}>
          Click To Select Route
        </Button>
      )} */}

      <h5>Token</h5>

      <div className="selected">
        <div className="dataRow background-z2">
          <div className="value">
            <b className="vi-hightlight">{formatTokenAmount(route.toToken, route.toAmount)}</b>
            {/* <div className='miniText' >≈$ {route.toAmountUSD}</div> */}
          </div>
          <span className="title">Estimated token</span>
        </div>

        <div style={{ textAlign: 'left' }}>
          <div className="dataRow-horizontal">
            <span className="title ">Estimated result</span>
            <div className="value">$ {route.toAmountUSD}</div>
          </div>

          <div className="dataRow-horizontal">
            <div className="value ">$ {route.gasCostUSD}</div>
            <span className="title ">Estimated gas costs</span>
          </div>

          <div className="dataRow-horizontal">
            <div className="value ">{parsedDuration} min</div>
            <span className="title ">Estimated duration</span>
          </div>
        </div>
      </div>

      <hr />

      <h5>Steps</h5>

      <Steps
        progressDot
        size="small"
        direction="vertical"
        current={5}
        className="progress-step-list">
        {route.steps.map((step) => {
          let { title, description } = parseStep(step)
          return <Steps.Step key={title} title={title} description={description}></Steps.Step>
        })}
      </Steps>
    </div>
  )
}

export default Route

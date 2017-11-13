import React from 'react'
import ReactDOM from 'react-dom'
import { injectGlobal } from 'styled-components'
// import { deadScenes, deadScenesManual } from './DeadScenes'
// import vnConfig from './constants/vnConfig'
import vnConfig_old from './constants/vnConfig_old'
import pathChecker from './PathChecker'
// import App from './App';
import registerServiceWorker from './registerServiceWorker'

// eslint-disable-next-line no-unused-expressions
injectGlobal`
  body {
    margin: 0;
    padding: 0;
    font-family: Tahoma, sans-serif;
    box-sizing: border-box;
  }
  
  * {
    box-sizing: inherit;
  }
`

// ReactDOM.render(<App />, document.getElementById('root'));
ReactDOM.render(
  <div style={{ padding: '30px' }}>
      OPEN CONSOLE.
      <br /> if no error/warning, then it should be fine.
      <br /> if there is error, number in xxx(yyy)
      <br /> xxx : scene id in database
      <br /> yyy : scene id that user see (sorted scenes)
  </div>
  , document.getElementById('root'))
console.log(pathChecker(null, vnConfig_old))
// console.log(pathChecker())

// console.log('>> deadScenes(): ', deadScenes(vnConfig_old))
// console.log('>> deadScenesManual(): ', deadScenesManual(vnConfig_old))

registerServiceWorker()

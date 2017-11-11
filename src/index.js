// import React from 'react';
// import ReactDOM from 'react-dom';
import { injectGlobal } from 'styled-components'

// import App from './App';
import registerServiceWorker from './registerServiceWorker';
import pathChecker from './PathChecker'

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
pathChecker()
document.write(`OPEN CONSOLE. 
if no error/warning, then it should be fine.
if there is error, number in xxx(yyy)
xxx : scene id in database
yyy : scene id that user see (sorted scenes)
`)

registerServiceWorker();

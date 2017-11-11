import React, { Component } from 'react'
import styled, { ThemeProvider } from 'styled-components'

import DemoHeader from './components/DemoHeader'

const Outer = styled.div`
  text-align: center;
`

const theme = {
  // bg: 'palevioletred',
  // fg: 'papayawhip'
}

class App extends Component {
  render() {
    return (
      <Outer>
        <ThemeProvider theme={theme}>
          <DemoHeader/>
        </ThemeProvider>
      </Outer>
    )
  }
}

export default App

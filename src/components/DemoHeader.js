import React from 'react'
import styled, { keyframes } from 'styled-components'
import logo from '../images/logo.svg';


const Header = styled.div`
  background-color: ${ props => props.theme.bg || '#222'};
  height: 190px;
  padding: 20px;
  color: ${ props => props.theme.fg || 'white'};
  
  > h2 {
    color: ${ props => props.theme.fg || 'white'};
  }
`
const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`

const Logo = styled.img`
  animation: ${ spin } infinite 20s linear;
  ${ props => props.backwards && `animation-direction: reverse;`}
  height: 80px;
`

export default () => (
	<Header>
		<Logo backwards src={logo} alt="logo" />
		<Logo src={logo} alt="logo" />
		<h2>Welcome to React</h2>
	</Header>
)
import * as React from 'react'
import { render } from 'react-dom'

import { ThemeProvider } from 'styled-components'

import App from './App'
import theme from './styles/theme'
import GlobalStyle from './styles/globalStyles'
import { BrowserRouter } from 'react-router-dom'

const rootEl = document.getElementById('root')

render(
  <BrowserRouter basename='/'>
    <ThemeProvider theme={theme}>
      <App />
      <GlobalStyle />
    </ThemeProvider>
  </BrowserRouter>,
  rootEl
)

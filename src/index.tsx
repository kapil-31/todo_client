import * as React from 'react'
import { createRoot } from 'react-dom/client'

import { ThemeProvider } from 'styled-components'

import App from './App'
import theme from './styles/theme'
import GlobalStyle from './styles/globalStyles'
import { BrowserRouter } from 'react-router-dom'

const rootEl = document.getElementById('root')
if (rootEl) {
  createRoot(rootEl).render(
    <BrowserRouter basename='/'>
      <ThemeProvider theme={theme}>
        <App />
        <GlobalStyle />
      </ThemeProvider>
    </BrowserRouter>
  )
}

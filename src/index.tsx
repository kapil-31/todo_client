import * as React from 'react'
import { createRoot } from 'react-dom/client'

import { ThemeProvider } from 'styled-components'
import { Provider } from 'react-redux'

import App from './App'
import theme from './styles/theme'
import GlobalStyle from './styles/globalStyles'
import { BrowserRouter } from 'react-router-dom'
import { store } from './redux'

const rootEl = document.getElementById('root')
if (rootEl) {
  createRoot(rootEl).render(
    <Provider store={store}>
      <BrowserRouter basename='/'>
        <ThemeProvider theme={theme}>
          <App />
          <GlobalStyle />
        </ThemeProvider>
      </BrowserRouter>
    </Provider>
  )
}

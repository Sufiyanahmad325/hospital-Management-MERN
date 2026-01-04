import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { store } from './reduxtollkit/store.js'
import { Provider } from 'react-redux'
import { CookiesProvider } from 'react-cookie'

createRoot(document.getElementById('root')).render(
  <CookiesProvider>
  <Provider store={store}>
    <StrictMode>
      <App />
    </StrictMode>,
  </Provider>
  </CookiesProvider>
)

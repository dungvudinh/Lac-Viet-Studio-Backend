import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { CssBaseline } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles'
import { BrowserRouter } from 'react-router-dom'
import lacviet from './theme.js'
import './global.scss'
import './_breakpoint.scss'
import './style.scss'
import { Provider } from 'react-redux'
import store from './redux/store.js'
import './i18n'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/effect-coverflow'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider theme={lacviet}>
      <CssBaseline />
      <BrowserRouter>
        <Provider store={store}>
          <App />
        </Provider>
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>
)

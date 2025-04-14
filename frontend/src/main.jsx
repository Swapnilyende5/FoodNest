import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import "bootstrap/dist/css/bootstrap.min.css"
import './index.scss'
import { BrowserRouter } from 'react-router-dom'
import RestaurantContextProvider from './context/restaurantContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RestaurantContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </RestaurantContextProvider>
  </StrictMode>,
)

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import ThemeCustomProvider from './Contexts/ThemeContextProvider'


ReactDOM.createRoot(document.getElementById('root')).render(
  <ThemeCustomProvider>
    <App />
  </ThemeCustomProvider>,
)

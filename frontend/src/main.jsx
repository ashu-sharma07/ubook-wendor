import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { AuthContextProvider } from './context/AuthContext.jsx'
import GlobalLayout from './components/Layout/GlobalLayout.jsx'
import { BrowserRouter } from 'react-router-dom'
import { NextUIProvider } from '@nextui-org/react'
import { ModalContextProvider } from './context/ModalContext.jsx'
import { AddressContextProvider } from './context/AddressContext.jsx'
import { Toaster } from 'react-hot-toast'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <NextUIProvider>
        <AuthContextProvider>
          <AddressContextProvider>
            <ModalContextProvider>
              <Toaster />
              <GlobalLayout>
                <App />
              </GlobalLayout>
            </ModalContextProvider>
          </AddressContextProvider>
        </AuthContextProvider>
      </NextUIProvider>
    </BrowserRouter>
  </React.StrictMode>,
)

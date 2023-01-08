import React from 'react'
import { createRoot } from 'react-dom/client'
import { ApiProvider } from '@reduxjs/toolkit/dist/query/react'


import App from './App'
import { apiSlice } from './features/api/apiSlice'
import './index.css'


const root = document.getElementById('root')
createRoot(root).render(
  <React.StrictMode>
    <ApiProvider api={apiSlice}>
      <App />
    </ApiProvider>
  </React.StrictMode>  
)

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import 'bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter } from 'react-router-dom'
import './index.css' // (optional: if you have global CSS)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  
      <App />
   
  </React.StrictMode>
)

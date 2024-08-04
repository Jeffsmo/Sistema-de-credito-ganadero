import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './components/app/App.jsx'
import './global/styles/index.css'
import './global/styles/enviroment.css';
import './global/styles/normalize.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

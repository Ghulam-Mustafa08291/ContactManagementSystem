import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
// import App from './App.jsx'
import LoginPage from './LoginPage.jsx'
import RegistrationPage from './RegistrationPage'
import Dashboard from './Dashboard'
import AddContactForm from './AddContactForm'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AddContactForm />
  </StrictMode>,
)

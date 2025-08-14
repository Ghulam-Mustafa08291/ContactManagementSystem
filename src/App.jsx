// App.jsx or App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import LoginPage from './LoginPage.jsx'
import RegistrationPage from './RegistrationPage'
import Dashboard from './Dashboard.jsx'
import AddContactForm from './AddContactForm'
import UserProfile from './UserProfile'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/addContact" element={<AddContactForm  />} />
        {/* <Route path="/contact/:id" element={<ContactDetails />} /> */}
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </Router>
  );
}

export default App;

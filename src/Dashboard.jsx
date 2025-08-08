import './Dashboard.css';
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";

function Dashboard() {
  const navigate=useNavigate();
  const dummyContacts = [
    { id: 1, firstName: "Ali", lastName: "Khan", phone: "03211234567" },
    { id: 2, firstName: "Sara", lastName: "Malik", phone: "03009876543" }
  ];

    const [contacts, setContacts] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      // Redirect to login or show error
      return;
    }

    fetch('http://localhost:8080/api/contacts', {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
      .then(res => {
        if (!res.ok) {
          throw new Error('Failed to fetch contacts');
        }
        return res.json();
      })
      .then(data => {
        setContacts(data);
      })
      .catch(error => {
        console.error('Error fetching contacts:', error);
      });
  }, []);
  

  const handleLogOut= () => {
    navigate('/');
  }
  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h2>Contact Dashboard</h2>
        <button onClick={handleLogOut} className="logout-button">Logout</button>
      </header>

      <div className="dashboard-controls">
        <input type="text" placeholder="Search contacts..." className="search-input" />
        <button className="add-contact-button">+ Add Contact</button>
      </div>

      <div className="contacts-list">
        {contacts.length > 0 ? (
          contacts.map(contact => (
            <div className="contact-card" key={contact.id}>
              <p>{contact.firstName} {contact.lastName}</p>
              <p>
                {contact.phoneNumbers?.map(pn => (
                  <span key={pn.number}>{pn.label}: {pn.number}<br /></span>
                ))}
              </p>
              <button>Edit</button>
              <button>Delete</button>
            </div>
          ))
        ) : (
          <p>No contacts to show yet.</p>
        )}
      </div>

    </div>
  );
}

export default Dashboard;

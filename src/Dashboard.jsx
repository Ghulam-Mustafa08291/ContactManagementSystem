import './Dashboard.css';
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";

function Dashboard() {
  const navigate = useNavigate();

  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    console.log('Dashboard mounted');
    const token = localStorage.getItem('token');
    console.log('Token from localStorage:', token);

    if (!token) {
      console.warn('No token found; redirecting to login');
      navigate('/');
      return;
    }

    const fetchContacts = async () => {
      try {
        const res = await fetch('http://localhost:8080/api/users/contacts', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          const body = await res.text().catch(() => '');
          throw new Error(`Failed to fetch contacts: ${res.status} ${res.statusText} | ${body}`);
        }

        const data = await res.json();
        console.log('Fetched contacts:', data);
        setContacts(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error('Error fetching contacts:', err);
      }
    };

    fetchContacts();
  }, [navigate]);

  const handleLogOut = () => {
    navigate('/');
  };

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
          contacts.map((contact) => (
            <div className="contact-card" key={contact.id ?? `${contact.firstName}-${contact.lastName}`}>
              <p>{contact.firstName} {contact.lastName} {contact.title}</p>
              <p>
                {Array.isArray(contact.phoneNumbers) && contact.phoneNumbers.length > 0 ? (
                  contact.phoneNumbers.map((pn) => (
                    <span key={pn.id ?? `${pn.label ?? pn.type ?? 'phone'}-${pn.number}`}>
                      {(pn.label ?? pn.type ?? 'Phone')}: {pn.number}
                      <br />
                    </span>
                  ))
                ) : (
                  <span>No phone numbers</span>
                )}

                {Array.isArray(contact.emails) && contact.emails.length > 0 ? (
                  contact.emails.map((em) => (
                    <span key={em.id ?? `${em.label ?? 'email'}-${em.email}`}>
                      {(em.label ?? 'Email')}: {em.email}
                      <br />
                    </span>
                  ))
                ) : (
                  <span>No emails</span>
                )}
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
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

    fetchContacts();
  }, [navigate]);

  const fetchContacts = async () => {
    const token = localStorage.getItem('token');
    
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

  const handleDeleteContact = async (contactId) => {
    // Confirm before deleting
    if (!window.confirm('Are you sure you want to delete this contact?')) {
      return;
    }

    const token = localStorage.getItem('token');

    try {
      const response = await fetch(`http://localhost:8080/api/contacts/${contactId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        // Remove the contact from the local state (no need to refetch all)
        setContacts(contacts.filter(contact => contact.id !== contactId));
        alert('Contact deleted successfully!');
      } else {
        const errorText = await response.text();
        alert(`Failed to delete contact: ${errorText}`);
      }
    } catch (error) {
      console.error('Error deleting contact:', error);
      alert('Network error. Please try again.');
    }
  };

  const handleLogOut = () => {
    navigate('/');
  };

  const onAddContactClicked = () => {
    navigate('/addContact');
  };

  const handleEditContact = (contactId) => {
    navigate(`/editContact/${contactId}`);
  };


  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h2>Contact Dashboard</h2>
        <button onClick={handleLogOut} className="logout-button">Logout</button>
      </header>

      <div className="dashboard-controls">
        <input type="text" placeholder="Search contacts..." className="search-input" />
        <button onClick={onAddContactClicked} className="add-contact-button">+ Add Contact</button>
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
              <button onClick={() => handleEditContact(contact.id)} >Edit</button>
              <button 
                onClick={() => handleDeleteContact(contact.id)}
                style={{ backgroundColor: '#ff4444', color: 'white' }}
              >
                Delete
              </button>
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
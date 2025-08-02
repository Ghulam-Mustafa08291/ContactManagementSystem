import './Dashboard.css';

function Dashboard() {

  const dummyContacts = [
    { id: 1, firstName: "Ali", lastName: "Khan", phone: "03211234567" },
    { id: 2, firstName: "Sara", lastName: "Malik", phone: "03009876543" }
  ];


  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h2>Contact Dashboard</h2>
        <button className="logout-button">Logout</button>
      </header>

      <div className="dashboard-controls">
        <input type="text" placeholder="Search contacts..." className="search-input" />
        <button className="add-contact-button">+ Add Contact</button>
      </div>

      <div className="contacts-list">
        {/* Later: map over contacts and display them */}
        {dummyContacts.map(contact =>(
          <div className="contact-card" key={contact.id}>
            <p>{contact.firstName} {contact.lastName} </p>
            <p>number: {contact.phone}</p>
            <button>Edit</button>
            <button>Delete</button>
          </div>
        ))}
        <p>No contacts to show yet.</p>
      </div>
    </div>
  );
}

export default Dashboard;

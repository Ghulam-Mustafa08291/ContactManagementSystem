import './LoginPage.css'; // Importing CSS file

function LoginPage() {
  return (
    <div className="login-wrapper">
        <div className="login-container">
        <h2>Login</h2>
        <input
            type="text"
            placeholder="Enter your Phone Number"
            className="login-input"
        />
        <input
            type="password"
            placeholder="Enter your password"
            className="login-input"
        />
        <button className="login-button">Login</button>
        </div>
    </div>
  );
}

export default LoginPage;

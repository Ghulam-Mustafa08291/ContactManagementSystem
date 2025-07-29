import './LoginPage.css'; // Importing CSS file
import {useState} from 'react';

function LoginPage() {

    const [inpPhoneNumber,setInpPhoneNumber]= useState('');
    const [inpPassword,setInpPassword]=useState('');
    const [error, setError] = useState({
        phoneNumberError: "wrong phone number",
        passwordError: "wrong password"
    });


    const onPhoneNumberChange = (e) => {
       setInpPhoneNumber(e.target.value);
        
    }

    const onPasswordChange = (e)=> {
        setInpPassword(e.target.value)
    }

    const handleLogin = () =>{
        if (inpPhoneNumber.length !=11){
            setError({...error,phoneNumberError:"incorrect phone number"})
            alert(error.phoneNumberError)
        }

        if (inpPassword.length <1){
            setError({...error,passwordError:"Password field cant be empty!"})
            alert(error.passwordError)
        }
    }

  return (
    <div className="login-wrapper">
        <div className="login-container">
        <h2>Login</h2>
        <input
            value={inpPhoneNumber}
            onChange={onPhoneNumberChange}
            type="text"
            placeholder="Enter your Phone Number"
            className="login-input"
        />
        <input
            value={inpPassword}
            onChange={onPasswordChange}
            type="password"
            placeholder="Enter your password"
            className="login-input"
        />
        <button onClick={handleLogin} className="login-button">Login</button>
        </div>
    </div>
  );
}

export default LoginPage;

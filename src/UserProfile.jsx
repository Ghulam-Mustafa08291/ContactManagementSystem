import {useState} from 'react'
import './UserProfile.css'

function UserProfile (){
    const User= {
        name:"ikhlas ahmad",
        email:"ia08294@st.habib.edu.pk",
        password:"neega123"
    }

    return (
        <div className="userProfileDiv" > 
            <div className="userInfoContainer">
                <p><strong>Name:</strong> {User.name} </p>
                <p> <strong> Email:</strong> {User.email} </p>
                <p> <strong>Password:</strong> {User.password} </p>
            </div>
            <div className="buttonContainer" >
                <button className="changePasswordButton" >Change Password</button>
                <button className="logOutButton" >Log out</button>
            </div>
        </div>
    )
}


export default UserProfile

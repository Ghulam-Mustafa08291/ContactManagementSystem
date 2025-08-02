import {useState} from 'react';

import './AddContactForm.css'
function AddContactForm () {
    const [emails,setEmails]=useState([{label:"work",email:""}])
    const [phoneNumbers,setPhoneNumbers]=useState([{label:"work",number:""}])
    const [name,setName]= useState({firstName:"",secondName:""})

    const handleFirstNameChange = (e) => {
        setName({...name,firstName:e.target.value})
    } 

    const handleSecondNameChange = (e) => {
        setName({...name,secondName:e.target.value})
    }

    const handleEmailChange = (index,field,value) => {
        const updated= [...emails];
        updated[index][field]=value;
        setEmails(updated)
    }

    const handleAddEmail = () => {
        setEmails([...emails,{label:"work",email:""}])
    }

    const handleRemoveEmail = (index) => {
        const updated = [...emails];
        updated.splice(index, 1);
        setEmails(updated);
    }


    const handlePhoneNumberChange =(index,field,value) => {
        const updated=[...phoneNumbers]
        updated[index][field]=value;
        setPhoneNumbers(updated)
    }

    const handleAddNumber = ()=>{
        setPhoneNumbers([...phoneNumbers,{label:"work",number:""}])
    } 

    const handleRemoveNumber =(index)=>{
        const updated = [...phoneNumbers]
        updated.splice(index,1)
        setPhoneNumbers(updated)
    }
    return (
        <div className="formContainer" >
            <input  className="inputFields" onChange={(e)=>handleFirstNameChange(e)} value={name.firstName} placeholder="enter first name" />
            <input className="inputFields" onChange={(e)=>handleSecondNameChange(e)} value={name.secondName} placeholder="enter second name" />
            <input className="inputFields" placeholder="enter Title" />
            {emails.map((email,index) =>(
                <div  className="emailContainer" key={index} style={{marginBottom:'10px'}}>
                    <select value={email.label} onChange={(e)=>handleEmailChange(index,'label',e.target.value)} >
                        <option value="work" >work</option>
                        <option value="personal" >personal</option>
                        <option value="other" >other</option>
                    </select>
                    <input 
                        className="inputFields"
                        placeholder="enter email"
                        type="email"
                        value={email.email} 
                        onChange= {(e)=>handleEmailChange(index,'email',e.target.value)}       
                    />
                    {emails.length>1 ? <button className="removeButton" onClick={()=>handleRemoveEmail(index)} >Remove</button> : <></>}
                </div>
            ))}
            <button className="addButton" onClick={handleAddEmail} >Add Email</button>
            
            {phoneNumbers.map((phoneNumber,index)=>(
                <div className="phoneNumberContainer" key={index} >
                    <select onChange={(e)=>handlePhoneNumberChange(index,"label",e.target.value)} >
                        <option value="work" >work</option>
                        <option value="personal">personal</option>
                        <option value="home">home</option>
                    </select>
                    <input  className="inputFields" value={phoneNumber.number} onChange={(e)=>handlePhoneNumberChange(index,"number",e.target.value)} placeholder="enter phone number" />
                    {phoneNumbers.length>1 ? <button className="removeButton" onClick={()=>handleRemoveNumber(index)} >Remove</button> : <></>}
                </div>
            ))}
            <button  className="addButton" onClick={handleAddNumber}>Add Number</button>


        </div>
    )
}


export default AddContactForm

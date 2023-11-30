import React, { useState } from 'react';
import './register.css';
import { useNavigate } from 'react-router-dom';
function Create() {
  const [title,settitle]=useState('')
  const [desc, setdesc] = useState('');
  const [date,setdate]=useState('')
  const [time,settime]=useState('')
  const [loc,setloc]=useState('')
  const [slot,setslot]=useState('')
  const bearerToken = localStorage.getItem('token')
  const navigate=useNavigate()
  const handletitle=(event)=>{
    settitle(event.target.value)
  }
   
  const handledesc=(event)=>{
    setdesc(event.target.value)
  }
  const handledate=(event)=>{
    setdate(event.target.value)
  }
  const handletime= (event) => {
    settime(event.target.value);
  };

  const handleloc= (event) => {
    setloc(event.target.value);
  };

  const handleslot= (event) => {
    setslot(event.target.value);
  };



  const handlesubmit = (event) => {
    event.preventDefault();
    let data={
      "title":title,
      "description":desc,
      "date":date,
      "time":time,
      "location":loc,
      "slots":slot
    }
    console.log(data)
    fetch("http://localhost:8000/event/createevent",{
      method:"POST",
      headers: {
        Authorization: `Bearer ${bearerToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),

    }).then(res=>res.json()).then(res=>console.log(res))
    navigate('/')
  };

  return (
    <div className="register-page">
      <h1 className="register-page__heading">Create Event</h1>
      <form className="register-page__form" onSubmit={handlesubmit}>
      <label htmlFor="email" className="register-page__label">
          Title
        </label>
        <input
          type="text"
          id="username"
          value={title}
          onChange={handletitle}
          className="register-page__input"
          required
        />
        <label htmlFor="email" className="register-page__label">
          Description
        </label>
        <input
          type="text"
          id="FirstName"
          value={desc}
          onChange={handledesc}
          className="register-page__input"
          required
        />
        <label htmlFor="email" className="register-page__label">
          Date
        </label>
        <input
          type="text"
          id="LastName"
          value={date}
          onChange={handledate}
          className="register-page__input"
          required
        />
        <label htmlFor="email" className="register-page__label">
          Time
        </label>
        <input
          type="text"
          id="text"
          value={time}
          onChange={handletime}
          className="register-page__input"
          required
        />

    <label htmlFor="text" className="register-page__label">
          Location
        </label>
        <input
          type="text"
          id="text"
          value={loc}
          onChange={handleloc}
          className="register-page__input"
          required
        />

<label htmlFor="text" className="register-page__label">
          Slots
        </label>
        <input
          type="text"
          id="text"
          value={slot}
          onChange={handleslot}
          className="register-page__input"
          required
        />
 

        <button type="submit" className="register-page__button">
          Create
        </button>
      </form>
    </div>
  );
}

export default Create;
import React, { useState } from 'react';
import logo from '/logo1.svg';
import './App.css';

function App() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  }

  function handleLogin(event) {
    event.preventDefault();

    if (!formData.username || !formData.password) {
      console.log('Please fill in all fields');
      return;
    }

    fetch('http://localhost:5000/api/v1/auth/login-admin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          console.log('Successfully logged in');
        } else {
          console.log('Login failed: ', data.message);
        }
      })
      .catch((error) => {
        console.error('Error during login:', error);
      });
  }

  return (
    <>
      <div className='body'>
        <div className='wrapper'>

          <img src="/logo2.png" alt="Logo"></img>

          <div className='formContainer'>
            <form className='form' onSubmit={handleLogin}>
              <a target="_blank" className='logo'>
                <img src={logo} className="logo" alt="Logo" />
              </a>
              <h2>Login as admin</h2>
              <label className='username'>Username</label>
              <input
                className='usernamebox'
                type="text"
                name="username"
                placeholder='Username'
                value={formData.username}
                onChange={handleChange}
              />
              <label className='password'>Password</label>
              <input
                className='passwordbox'
                type="password"
                name="password"
                placeholder='Password'
                value={formData.password}
                onChange={handleChange}
              />
              <button className="btn" type="submit">Login</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;

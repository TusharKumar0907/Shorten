import React, { useState } from 'react';
import '../styles/register.css';
import { registerUser } from '../service/user';

import {
  MDBContainer,
  MDBInput,
  MDBBtn
}
from 'mdb-react-ui-kit';
import { useNavigate } from 'react-router';

function RegisterPage() {

  const navigate = useNavigate();
   
  const goToLoginPage = (e) => {
    
    e.preventDefault();
    navigate('/login');

  }

  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    
    e.preventDefault();

    try {
      await registerUser(formData);
      alert('Registration successful!');
      navigate('/login');
    } catch (error) {
      console.error('Registration failed:', error);
      alert('Registration failed. Please try again.');
    }

  };

  return (
    <MDBContainer className="p-3 my-5 d-flex flex-column w-500">

      <MDBInput wrapperClass='mb-4' label='Username' id='form1' type='text' value={formData.username} onChange={handleChange} name="username"/>
      <MDBInput wrapperClass='mb-4' label='Password' id='form2' type='password' value={formData.password} onChange={handleChange} name="password"/>
      <MDBInput wrapperClass='mb-4' label='Email' id='form3' type='email' value={formData.email} onChange={handleChange}  name="email"/>

      <MDBBtn className="mb-4" onClick={handleSubmit}>Register</MDBBtn>

      <div className="text-center">
        <p>Already a member? <a href="" onClick={goToLoginPage}>Login</a></p>
      </div>

    </MDBContainer>
  );
}

export default RegisterPage;
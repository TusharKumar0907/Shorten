import React, {useState} from 'react';
import '../styles/login.css';
import { loginUser } from '../service/user';
import {
  MDBContainer,
  MDBInput,
  MDBBtn
}
from 'mdb-react-ui-kit';
import { useNavigate } from 'react-router';

function LoginPage() {

  const navigate = useNavigate();
   
  const goToRegisterPage = (e) => {
    
    e.preventDefault();
    navigate('/');

  }

  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    
    e.preventDefault();

    try {
      const response = await loginUser(formData);
      localStorage.setItem("JWT_TOKEN", JSON.stringify(response.data.token));
      alert('Login successful!');
      navigate('/home');
    } catch (error) {
      console.error('Login failed:', error);
      alert('Login failed. Please try again.');
    }

  };

  return (
    <MDBContainer className="p-3 my-5 d-flex flex-column w-500">

      <MDBInput wrapperClass='mb-4' label='Username' id='form1' type='username' value={formData.username} name="username" onChange={handleChange}/>
      <MDBInput wrapperClass='mb-4' label='Password' id='form2' type='password' value={formData.password} name="password" onChange={handleChange}/>

      <MDBBtn className="mb-4" onClick={handleSubmit}>Log In</MDBBtn>

      <div className="text-center">
        <p>Not a member? <a href="" onClick={goToRegisterPage}>Register</a></p>
      </div>

    </MDBContainer>
  );
}

export default LoginPage;
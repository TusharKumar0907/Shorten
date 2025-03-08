import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { shortUrl } from '../service/user';

const AddUrl = () => {
 
  const [url, setUrl] = useState({
    originalUrl:''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUrl({ ...url, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await shortUrl(url);
      navigate('/home');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Paste Original URL:
        <input type="text" value={url.originalUrl} onChange={handleChange} name="originalUrl"/>
      <input type="submit" value="Short URL" />
      </label>
    </form>
  );

};

export default AddUrl;

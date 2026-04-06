import React, { useState } from 'react';
import { loginUser } from '../api';

const LoginForm = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Logging in...');
    try {
      const result = await loginUser(formData.email, formData.password);
      setStatus('Success! Redirecting...');
      console.log('User logged in:', result);
      // Redirect logic yahan add karein (e.g., useNavigate('/dashboard'))
    } catch (err) {
      setStatus(`Error: ${err.message}`);
    }
  };

  return (
    <div className="login-container">
      <h2>Login to Ladies Bag</h2>
      <form onSubmit={handleSubmit}>
        <input 
          type="email" 
          placeholder="Email Address" 
          value={formData.email} 
          onChange={(e) => setFormData({...formData, email: e.target.value})} 
          required 
        />
        <input 
          type="password" 
          placeholder="Password" 
          value={formData.password} 
          onChange={(e) => setFormData({...formData, password: e.target.value})} 
          required 
        />
        <button type="submit">Login</button>
      </form>
      {status && <p>{status}</p>}
    </div>
  );
};

export default LoginForm;
import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { requestResetToken } from '../../util/http'; // Import requestResetToken
import './ForgotPassword.css';
import ResetPasswordPage from './RestPasswordPage';
import { nav } from 'framer-motion/client';
import { Link, useNavigate } from 'react-router-dom';


function ForgotPasswordPage() {
  
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [token, setToken] = useState(null);
  const navigate = useNavigate();
  
  const requestTokenMutation = useMutation({
    mutationFn: (email) => requestResetToken(email),
    onSuccess: (data ) => {
      console.log("data token",data);
      
      
      // ResetPasswordPage({token});
      setToken(data.reset_token);

      // Use setTimeout to delay navigation
      setTimeout(() => {
        navigate('/'); // Navigate to the desired route after the delay
      }, 3000); // 2000 milliseconds = 2 seconds
      
      
      setMessage('An email has been sent with instructions to reset your password');
    },
    onError: (error) => {
      setMessage(error.message || 'An error occurred while requesting the token.');
    }
  });
  // if(token !== null){ 
    
  //   return <ResetPasswordPage token={token} />
  // }

  const handleSubmit = (e) => {
    e.preventDefault();
    requestTokenMutation.mutate(email);
  };

  return (
    <div className="forgot-password-container">
      <form onSubmit={handleSubmit} className="forgot-password__form">
        <h3>Request Password Reset</h3>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
           
        />
        <button type="submit" disabled={requestTokenMutation.isLoading} >
          {requestTokenMutation.isLoading ? 'Sending...' : 'Send Reset Link'}
        </button>
        {message && <p>{message}</p>}
      </form>
      <Link
          to="../"
          className="ri-close-line signup__close"
          id="signup-close"
        ></Link>
    </div>
  );
}

export default ForgotPasswordPage;

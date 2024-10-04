// ForgotPassword.js
import React, { useState } from 'react';
import { sendPasswordResetEmail } from 'firebase/auth';
import { getAuth } from 'firebase/auth';
import { Link } from 'react-router-dom';
import app from '../firebase/firebase.config'; // Ensure the path is correct

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const auth = getAuth();

  // Handle Password Reset
  const handlePasswordReset = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    try {
      await sendPasswordResetEmail(auth, email);
      alert('Password reset email sent! Please check your inbox.')
      setMessage('Password reset email sent! Please check your inbox.');
    } catch (err) {
      setError(`Failed to send reset email: ${err.message}`);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      {/* Forgot Password Card */}
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg border">
        <h2 className="text-2xl font-bold text-center mb-6">Forgot Password</h2>

        {message && <p className="text-green-500 mb-4 text-center">{message}</p>}
        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

        {/* Password Reset Form */}
        <form onSubmit={handlePasswordReset}>
          {/* Email Input */}
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2" htmlFor="email">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
              placeholder="Enter your email"
              required
            />
          </div>

          {/* Reset Password Button */}
          <button
            type="submit"
            className="w-full py-2 bg-green-500 text-white rounded hover:bg-green-600 transition duration-300"
          >
            Reset Password
          </button>
        </form>

        <div className="mt-6 text-center">
          <Link to="/login" className="text-sm text-blue-500 font-semibold hover:underline">
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;

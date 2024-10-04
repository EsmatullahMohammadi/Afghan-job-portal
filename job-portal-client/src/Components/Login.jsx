// Login.js
import React, { useState } from 'react';
import { GoogleAuthProvider, FacebookAuthProvider, signInWithPopup, signInWithEmailAndPassword, fetchSignInMethodsForEmail } from 'firebase/auth';
import { getAuth } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import app from '../firebase/firebase.config'; // Ensure the path is correct

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const auth = getAuth();
  const googleProvider = new GoogleAuthProvider();
  const facebookProvider = new FacebookAuthProvider();
  facebookProvider.addScope('email');

  // Handle Google Login
  const handleGoogleLogin = () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        const user = result.user;
        if (user.emailVerified === true) {

          sessionStorage.setItem('isAuthenticated', 'true');
          sessionStorage.setItem('photoURL', user.photoURL);
          sessionStorage.setItem('email', user.email);
          navigate('/my-job');

        }
        window.location.reload();
      })
      .catch((error) => {
        setError(error.message);
      });
  };
  // Handle Facebook Login
  const handleFacebookLogin = () => {
    signInWithPopup(auth, facebookProvider)
      .then((result) => {
        const user = result.user;
        console.log(user)
        const email = user.email || 'No email provided';
        if (user) {
          sessionStorage.setItem('isAuthenticated', 'true');
          sessionStorage.setItem('photoURL', user.photoURL);
          sessionStorage.setItem('email', user.email);
          console.log(user.email)
          navigate('/my-job');
        }
        // window.location.reload();
      })
      .catch((error) => {
        setError(error.message);
      });
  };
  const checkEmailExists = async (email) => {
    const auth = getAuth();
    try {
      const signInMethods = await fetchSignInMethodsForEmail(auth, email);
      return signInMethods.length > 0; // Returns true if the email is registered
    } catch (error) {
      console.error("Error checking email:", error);
      return false; // In case of an error, assume the email is not registered
    }
  };
  // Handle Sign-In with Email and Password
  const handleEmailSignIn = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      if(user){
        sessionStorage.setItem('isAuthenticated', 'true');
        sessionStorage.setItem('email', user.email);
        sessionStorage.setItem('photoURL', user.photoURL);
        navigate('/my-job'); 
      }

      window.location.reload();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      {/* Login Card */}
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg border">
        {/* Social Login Buttons */}
        <div className="flex flex-col space-y-3 mb-6">
          {/* Google Login */}
          <button
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center py-2 sm:py-3 bg-gradient-to-r from-violet-500 to-yellow-400 text-white rounded-lg hover:from-violet-600 hover:to-yellow-500 transition duration-300 ease-in-out"
          >
            <svg height="24px" className="mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
              <path
                fill="#ffffff"
                d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
              />
            </svg>
            Continue with Google
          </button>

          {/* Facebook Login */}
          <button
            onClick={handleFacebookLogin}
            className="w-full flex items-center justify-center py-2 sm:py-3 bg-gradient-to-r from-indigo-600 to-indigo-400 text-white rounded-lg hover:from-indigo-700 hover:to-indigo-500 transition duration-300 ease-in-out"
          >
            <svg height="24px" className="mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
              <path
                fill="#ffffff"
                d="M80 299.3V512H196V299.3h86.5l18-97.8H196V166.9c0-51.7 20.3-71.5 72.7-71.5c16.3 0 29.4 .4 37 1.2V7.9C291.4 4 256.4 0 236.2 0C129.3 0 80 50.5 80 159.4v42.1H14v97.8H80z"
              />
            </svg>
            Continue with Facebook
          </button>
        </div>

        <h2 className="text-2xl font-bold text-center mb-6">Please Login Here</h2>

        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

        {/* Sign-In with Email and Password Form */}
        <form onSubmit={handleEmailSignIn}>
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

          {/* Password Input */}
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'} // Switch between 'text' and 'password' types
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500 pr-10"
              placeholder="Enter your password"
              required
            />
            {/* Show/Hide Password Icon */}
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-800 focus:outline-none"
            >
              {showPassword ? <FiEyeOff /> : <FiEye />} {/* Toggle icon based on state */}
            </button>
          </div>

          <div className="flex items-center justify-between mb-4">
            <Link to="/" className="text-sm hover:underline">
              Back to home
            </Link>
            <a href="/frogot-password" className="text-sm text-blue-500 hover:underline">
              Forgot password?
            </a>
          </div>

          {/* Login Button */}
          <button type="submit" className="w-full py-2 bg-green-500 text-white rounded hover:bg-green-600 transition">
            Login
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm">
            Do not have an account?{' '}
            <Link to="/sign-up" className="text-blue-500 font-semibold hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;

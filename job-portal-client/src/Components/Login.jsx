import { useState } from 'react';
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getAuth } from "firebase/auth";
import app from '../firebase/firebase.config';
import { Link, useNavigate } from 'react-router-dom';



const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate= useNavigate();

  const auth = getAuth();
  const googleProvider = new GoogleAuthProvider();

  const handleLogin = ()=>{
    signInWithPopup(auth, googleProvider).then((result) => {
      
      const user = result.user;
      if(user.emailVerified === true){
        const photoURL=user.photoURL;
        const email = user.email;
        sessionStorage.setItem('isAuthenticated', 'true');
        sessionStorage.setItem('photoURL', photoURL);
        sessionStorage.setItem('email', email);
        navigate("/my-job")
      }
      // Reloads the current page
      window.location.reload();
      console.log(user)

    }).catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });
    
  }
  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Email:', email);
    console.log('Password:', password);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
  {/* Login Card */}
  <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg border">
    {/* Social Login Buttons */}
    <div className="flex flex-col space-y-3 mb-6">
      {/* Google Login */}
      <button
        onClick={handleLogin}
        className="w-full flex items-center justify-center py-2 sm:py-3 bg-gradient-to-r from-violet-500 to-yellow-400 text-white rounded-lg hover:from-violet-600 hover:to-yellow-500 transition duration-300 ease-in-out"
      >
        <svg
          height="24px"
          className="mr-2"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 488 512"
        >
          <path
            fill="#ffffff"
            d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
          />
        </svg>
        Continue with Google
      </button>

      {/* Facebook Login */}
      <button
        className="w-full flex items-center justify-center py-2 sm:py-3 bg-gradient-to-r from-indigo-600 to-indigo-400 text-white rounded-lg hover:from-indigo-700 hover:to-indigo-500 transition duration-300 ease-in-out"
      >
        <svg
          height="24px"
          className="mr-2"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 320 512"
        >
          <path
            fill="#ffffff"
            d="M80 299.3V512H196V299.3h86.5l18-97.8H196V166.9c0-51.7 20.3-71.5 72.7-71.5c16.3 0 29.4 .4 37 1.2V7.9C291.4 4 256.4 0 236.2 0C129.3 0 80 50.5 80 159.4v42.1H14v97.8H80z"
          />
        </svg>
        Continue with Facebook
      </button>
    </div>

    <h2 className="text-2xl font-bold text-center mb-6">Please Login Here</h2>

    <form onSubmit={handleSubmit}>
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
      <div className="mb-4">
        <label className="block text-sm font-semibold mb-2" htmlFor="password">
          Password
        </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
          placeholder="Enter your password"
          required
        />
      </div>

      <div className="flex items-center justify-between mb-4">
        <Link to={"/"} className='text-sm hover:underline'>Back to home</Link>
        <a href="#" className="text-sm text-blue hover:underline">
          Forgot password?
        </a>
      </div>

      {/* Login Button */}
      <button
        type="submit"
        className="w-full py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
      >
        Login
      </button>
    </form>

    <div className="mt-6 text-center">
      <p className="text-sm">
        Do not have an account?{' '}
        <a href="/sign-up" className="text-blue-500 font-semibold hover:underline">
          Sign up
        </a>
      </p>
    </div>
  </div>
</div>

  );
};

export default Login;

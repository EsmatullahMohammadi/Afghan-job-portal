import React, { useState } from 'react';

const SignUp = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match!');
    } else {
      console.log('First Name:', firstName);
      console.log('Last Name:', lastName);
      console.log('Email:', email);
      console.log('Password:', password);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center  overflow-hidden bg-gray-200">
      {/* Card with glassmorphism effect */}
      <div className="relative bg-white/30 backdrop-blur-md p-8 md:p-12 rounded-lg shadow-lg w-full max-w-4xl border border-white/20 bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-600">
         {/* Decorative Background Elements */}
         <div className="absolute inset-0 w-full h-full flex items-center justify-center">
          <div className="absolute w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-50 top-10 left-20 animate-pulse"></div>
          <div className="absolute w-96 h-96 bg-teal-300 rounded-full mix-blend-multiply filter blur-xl opacity-40 bottom-10 right-20 animate-pulse"></div>
          <div className="absolute w-80 h-80 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-pulse"></div>
        </div>
        {/* Social Sign-Up Buttons */}
        <div className="flex flex-col space-y-3 mb-6">
          {/* Google Sign-Up */}
          <button
            className="w-full flex items-center justify-center py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg shadow-md hover:from-purple-600 hover:to-pink-600 transition duration-300 ease-in-out"
          >
            <svg height={"30px"} className='px-4' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512"><path fill="#4B0082" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"/></svg>
            Sign up with Google
          </button>

          {/* Facebook Sign-Up */}
          <button
            className="w-full flex items-center justify-center py-3 bg-gradient-to-r from-blue-700 to-blue-600 text-white rounded-lg shadow-md hover:from-blue-800 hover:to-blue-700 transition duration-300 ease-in-out"
          >
            <svg height={"30px"} className='px-4' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path fill="#00FFFF" d="M80 299.3V512H196V299.3h86.5l18-97.8H196V166.9c0-51.7 20.3-71.5 72.7-71.5c16.3 0 29.4 .4 37 1.2V7.9C291.4 4 256.4 0 236.2 0C129.3 0 80 50.5 80 159.4v42.1H14v97.8H80z"/></svg>
            Sign up with Facebook
          </button>
        </div>

        <h2 className="text-3xl font-bold text-center mb-8 text-white">
          Create an Account
        </h2>

        <form onSubmit={handleSubmit}>
          {/* Two-column layout for form fields */}
          <div className="grid sm:grid-cols-2 grid-cols-1 gap-6">
            {/* First Name */}
            <div>
              <label
                className="block text-white text-sm font-semibold mb-2"
                htmlFor="firstName"
              >
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-white/70 text-gray-900 border border-gray-300 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-300 transition duration-200 ease-in-out"
                placeholder="First name"
                required
              />
            </div>

            {/* Last Name */}
            <div>
              <label
                className="block text-white text-sm font-semibold mb-2"
                htmlFor="lastName"
              >
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-white/70 text-gray-900 border border-gray-300 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-300 transition duration-200 ease-in-out"
                placeholder="Last name"
                required
              />
            </div>

            {/* Email */}
            <div>
              <label
                className="block text-white text-sm font-semibold mb-2"
                htmlFor="email"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-white/70 text-gray-900 border border-gray-300 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-300 transition duration-200 ease-in-out"
                placeholder="Enter your email"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label
                className="block text-white text-sm font-semibold mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-white/70 text-gray-900 border border-gray-300 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-300 transition duration-200 ease-in-out"
                placeholder="Enter your password"
                required
              />
            </div>

            {/* Confirm Password */}
            <div>
              <label
                className="block text-white text-sm font-semibold mb-2"
                htmlFor="confirmPassword"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-white/70 text-gray-900 border border-gray-300 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-300 transition duration-200 ease-in-out"
                placeholder="Confirm your password"
                required
              />
            </div>
          </div>

          {/* Sign-Up Button */}
          <div className="mt-6">
            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-green-500 to-green-400 text-white rounded-lg shadow-md hover:from-green-600 hover:to-green-500 focus:outline-none focus:ring-2 focus:ring-green-300 focus:ring-opacity-50 transition duration-300 ease-in-out"
            >
              Sign Up
            </button>
          </div>
        </form>

        {/* Divider */}
        <div className="mt-6 flex items-center">
          <div className="flex-grow h-px bg-white/20"></div>
          <span className="mx-3 text-white text-sm">OR</span>
          <div className="flex-grow h-px bg-white/20"></div>
        </div>

        {/* Login Link */}
        <p className="text-center text-sm text-white mt-6">
          Already have an account?{' '}
          <a
            href="#"
            className="text-blue-200 font-semibold hover:underline"
          >
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignUp;

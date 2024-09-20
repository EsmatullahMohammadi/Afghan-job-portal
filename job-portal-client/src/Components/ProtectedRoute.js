// ProtectedRoute.js
import React, { useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

// ProtectedRoute component to check authentication
const ProtectedRoute = ({ children }) => {
  // Check if the user is authenticated by looking at sessionStorage
  const isAuthenticated = sessionStorage.getItem('isAuthenticated');
  const navigate=useNavigate();
  // If not authenticated, redirect to the login page
  useEffect(()=>{
    if (!isAuthenticated) {
        return navigate("/login");
      }
  },[])
 
  // If authenticated, render the children components
  return children;
};

export default ProtectedRoute;

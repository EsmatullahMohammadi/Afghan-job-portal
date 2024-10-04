
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDFSHs_q7-wCwmcC8uWWMEzlK67syvEOx8",
  authDomain: "job-portal-demo-a7164.firebaseapp.com",
  projectId: "job-portal-demo-a7164",
  storageBucket: "job-portal-demo-a7164.appspot.com",
  messagingSenderId: "15587809353",
  appId: "1:15587809353:web:112f3682252a1036928798"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default  app;

const auth = getAuth(app);

export { auth };
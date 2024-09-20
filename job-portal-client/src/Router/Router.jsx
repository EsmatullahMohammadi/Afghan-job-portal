import {
    createBrowserRouter,
  } from "react-router-dom";
import App from "../App";
import HomePage from "../Pages/HomePage";
import CreateJob from "../Pages/CreateJob";
import MyJobs from "../Pages/MyJobs";
import SallaryPage from "../Pages/SallaryPage";
import UpadateJobs from "../Pages/UpadateJobs";
import Login from "../Components/Login";
import SignUp from "../Components/SingUp";
import ProtectedRoute from "../Components/ProtectedRoute";

  const router = createBrowserRouter([
    {
      path: "/",
      element: <App/>,
      children:[
        {
            path:"/",
            element: <HomePage/>
        },
        {
            path:"/post-job",
            element: <CreateJob />
        },
        {
          path:"/my-job",
          element:(
            <ProtectedRoute>
              <MyJobs />
            </ProtectedRoute>
          )
        },
        {
          path:"/salary",
          element: <SallaryPage />
       },
       {
         path:"/edit-job/:id",
         element: <UpadateJobs />,
         loader: ({params}) => fetch(`http://localhost:3000/all-jobs/${params.id}`)
      },
      {
        path: "/sign-up",
        element: <SignUp />
      },
      {
        path: "/login",
        element: <Login />,
      }
      ]
    }
  ]);
  export default router;
import {
    createBrowserRouter,
  } from "react-router-dom";
import App from "../App";
import HomePage from "../Pages/HomePage";
import CreateJob from "../Pages/CreateJob";

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
        }
      ]
    },
  ]);
  export default router;
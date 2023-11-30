import { createBrowserRouter } from "react-router-dom";
import Main from "../Layouts/Main";
import ErrorPage from "../Error/ErrorPage/ErrorPage";
import Home from "../Pages/Home/Home/Home";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Login/Register/Register";
import Dashboard from "../Layouts/Dashboard";
import AddAPet from "../Pages/Dashboard/AddAPet/AddAPet";
import PrivateRoute from "./PrivateRoute";
import PetListing from "../Pages/PetListing/PetListing";

const router = createBrowserRouter([
    {
      path: "/",
      element:<Main></Main>,
      errorElement:<ErrorPage></ErrorPage>,
      children:[
        {
            index: true,
            element:<Home></Home>

        },
        {
          path:'pet-listing',
          element:<PrivateRoute>
            <PetListing></PetListing>
          </PrivateRoute>
        }
      ]
    },
    {
      path:'/login',
      element:<Login></Login>
    },
    {
      path:'/register',
      element: <Register></Register>
    }, {
      path:'/dashboard',
      element:<PrivateRoute>
        <Dashboard></Dashboard>
      </PrivateRoute>,

      children:[
        {
          path:'add-a-pet',
          element:<PrivateRoute>
            <AddAPet></AddAPet>
          </PrivateRoute>
        }
      ]
    }
  ]);

  export default router;
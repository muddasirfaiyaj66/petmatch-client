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
import CategoryDetails from "../Pages/CategoryDetailsPage/CategoryDetails";
import PetDetails from "../Pages/PetDetails/PetDetails";
import MyAddedPets from "../Pages/Dashboard/MyAddedPets/MyAddedPets";
import MyPetEdit from "../Pages/Dashboard/MyAddedPets/MyPetEdit/MyPetEdit";
import CreateDonationCampaign from "../Pages/Dashboard/CreateDonationCampaign/CreateDonationCampaign";
import DonationCampaign from "../Pages/DonationCampaign/DonationCampaign";
import DonationDetails from "../Pages/DonationDetails/DonationDetails";

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
        },
        {
          path:'category-details/:category',
          element:<PrivateRoute>
            <CategoryDetails></CategoryDetails>
          </PrivateRoute>
        },
        {
          path:'pet-details/:id',
          element: <PrivateRoute>
            <PetDetails></PetDetails>
          </PrivateRoute>
        },{
          path:'donation-campaigns',
          element:<PrivateRoute>
            <DonationCampaign></DonationCampaign>
          </PrivateRoute>
        },
        {
          path:'donation-details/:id',
          element: <PrivateRoute>
            <DonationDetails></DonationDetails>
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
        },
        {
          path:'my-added-pets',
          element:<PrivateRoute>
            <MyAddedPets></MyAddedPets>
          </PrivateRoute>
        },
        {
          path:'my-pet-edit/:id',
          element:<PrivateRoute>
            <MyPetEdit></MyPetEdit>
          </PrivateRoute>
        },
        {
          path:'create-donation',
          element: <PrivateRoute>
            <CreateDonationCampaign></CreateDonationCampaign>
          </PrivateRoute>
        }

      ]
    }
  ]);

  export default router;
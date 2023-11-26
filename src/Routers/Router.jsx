import { createBrowserRouter } from "react-router-dom";
import Main from "../Layouts/Main";
import ErrorPage from "../Error/ErrorPage/ErrorPage";
import Home from "../Pages/Home/Home/Home";

const router = createBrowserRouter([
    {
      path: "/",
      element:<Main></Main>,
      errorElement:<ErrorPage></ErrorPage>,
      children:[
        {
            index: true,
            element:<Home></Home>

        }
      ]
    },
  ]);

  export default router;
import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import loadingGip from "../assets/preloader.gif"


const PrivateRoute = ({children}) => {
    const {user, loading}= useAuth();
    const location =  useLocation();
    if(loading){
        return <div className="max-w-screen-xl mx-auto">
            <img src={loadingGip}  className="w-full h-full object-cover" alt="" />
        </div>
    }
    if(user){
        return children;

    }
    return <Navigate to="/login" state={{from:location}} replace></Navigate>
};

export default PrivateRoute;
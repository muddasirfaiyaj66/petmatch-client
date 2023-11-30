import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import loadingGip from "../assets/preloader.gif"
import Loading from "../Components/Loading/Loading";


const PrivateRoute = ({children}) => {
    const {user, loading}= useAuth();
    const location =  useLocation();
    if(loading){
        return <div className="object-cover h-full w-full">
            <Loading></Loading>
        </div>
    }
    if(user){
        return children;

    }
    return <Navigate to="/login" state={{from:location}} replace></Navigate>
};

export default PrivateRoute;
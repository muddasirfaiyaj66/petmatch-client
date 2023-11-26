import { Link } from "react-router-dom";
import { IoIosReturnLeft } from "react-icons/io";

const ErrorPage = () => {
  return (
   <div >
     <div >
    <Link to='/'>
    <button className="btn bg-red-600 md:btn-lg my-4 px-6  glass"><IoIosReturnLeft className="text-5xl text-white font-bold"></IoIosReturnLeft></button>
    </Link>
      </div>
     
    <div >
      <img src="https://i.ibb.co/T15MX66/7906236-3804935.jpg" className="w-full h-full object-cover" alt="" />

     
    </div>
   
   </div>
  );
};

export default ErrorPage;

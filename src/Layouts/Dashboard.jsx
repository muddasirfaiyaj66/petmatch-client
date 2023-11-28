import { NavLink, Outlet } from "react-router-dom";


const Dashboard = () => {
    return (
        <div className="flex">
            <div className="w-64 min-h-screen bg-[#000000] ">
                <div className="menu my-6">
                <li>
           <NavLink to="/dashboard/add-a-pet">
             
            Add A Pet
           </NavLink>
         </li>
                </div>
            </div>
            <div className="flex-1 p-8">
        <Outlet></Outlet>
      </div>
        </div>
    );
};

export default Dashboard;
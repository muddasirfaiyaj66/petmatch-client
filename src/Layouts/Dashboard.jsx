import { NavLink, Outlet } from "react-router-dom";
import useAdmin from "../Hooks/UseAdmin";


const Dashboard = () => {
    const [isAdmin] = useAdmin();
    return (
        <div className="flex">
            <div className="w-64 min-h-screen bg-[#000000]">
                <div className="menu my-6 md:text-xl text-white ">
                    {isAdmin?
                 <>
                 <li>
                     <NavLink
                          to="/dashboard/all-users"
                         className={({ isActive, isPending }) =>
                             isPending ? "pending" : isActive ? "bg-[#FFA500]  text-white " : ""
                         }
                     >
                       All Users
                     </NavLink>
                 </li>
                 <li>
                     <NavLink
                          to="/dashboard/all-pets"
                         className={({ isActive, isPending }) =>
                             isPending ? "pending" : isActive ? "bg-[#FFA500]  text-white " : ""
                         }
                     >
                       All Pets
                     </NavLink>
                 </li>
                 <li>
                     <NavLink
                          to="/dashboard/all-donations"
                         className={({ isActive, isPending }) =>
                             isPending ? "pending" : isActive ? "bg-[#FFA500]  text-white " : ""
                         }
                     >
                       All Donations
                     </NavLink>
                 </li>
                 </>    
                :

                <>
                <li >
                    <NavLink
                        to="/dashboard/add-a-pet"
                        className={({ isActive, isPending }) =>
                            isPending ? "pending" : isActive ? "bg-[#FFA500]  text-white " : ""
                        }
                    >
                        Add A Pet
                    </NavLink>
                </li>

                <li>
                    <NavLink
                        to="/dashboard/my-added-pets"
                        className={({ isActive, isPending }) =>
                            isPending ? "pending" : isActive ? "bg-[#FFA500]  text-white " : ""
                        }
                    >
                      My Added Pets
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/dashboard/create-donation"
                        className={({ isActive, isPending }) =>
                            isPending ? "pending" : isActive ? "bg-[#FFA500]  text-white " : ""
                        }
                    >
                      Create Donation Campaign
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/dashboard/my-donation-campaign"
                        className={({ isActive, isPending }) =>
                            isPending ? "pending" : isActive ? "bg-[#FFA500]  text-white " : ""
                        }
                    >
                      My Donation Campaign
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/dashboard/my-donation"
                        className={({ isActive, isPending }) =>
                            isPending ? "pending" : isActive ? "bg-[#FFA500]  text-white " : ""
                        }
                    >
                      My Donation 
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/dashboard/adoption-request"
                        className={({ isActive, isPending }) =>
                            isPending ? "pending" : isActive ? "bg-[#FFA500]  text-white " : ""
                        }
                    >
                      Adoption Request 
                    </NavLink>
                </li></>
                }
                  
                   <div className="divider">
                   <li>
                        <NavLink
                            to="/"
                            className={({ isActive, isPending }) =>
                                isPending ? "pending" : isActive ? "bg-[#FFA500]  text-white " : ""
                            }
                        >
                          Home
                        </NavLink>
                    </li>
                   </div>


                   
                </div>
            </div>
            <div className="flex-1 p-8">
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;
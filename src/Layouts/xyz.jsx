import { NavLink, Outlet } from "react-router-dom";


const Dashboard = () => {
    return (
        <div className="flex">
            <div className="w-64 min-h-screen bg-[#000000] drawer">
                <div className="menu my-6 md:text-xl text-white ">

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
            <div className="flex-1 p-8">
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;
import { Link, NavLink } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";

const Navbar = () => {
  const {user, logOut}= useAuth()
  const navLinks = (
    <>
      <li>
        {" "}
        <NavLink
          to="/"
          className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? "bg-[#FFA500]  text-white " : ""
          }
        >
          Home
        </NavLink>
      </li>
      <li>
        {" "}
        <NavLink
          to="/pet-listing"
          className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? "bg-[#FFA500]  text-white " : ""
          }
        >
          Pet Listing
        </NavLink>
      </li>
      <li>
        {" "}
        <NavLink
          to="/donation-campaigns"
          className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? "bg-[#FFA500]  text-white " : ""
          }
        >
          Donation Campaigns
        </NavLink>
      </li>
      <li>
        {" "}
        <NavLink
          to="/about"
          className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? "bg-[#FFA500]  text-white " : ""
          }
        >
          About
        </NavLink>
      </li>
    </>
  );
  return (

    <div className="navbar fixed z-10 bg-black bg-opacity-50    ">
      <div className="navbar-start lg:ml-8">

        <div >
          <Link to='/'>
            <img
              className=" w-[120px] h-[90px]  flex items-center justify-center"
              src="logo.png"
              alt=""
            />
          </Link>
        </div>
      </div>
      <div className="navbar-center hidden  md:flex">
        <ul className="menu menu-horizontal px-1 font-bold gap-5 text-lg text-white">
          {navLinks}
        </ul>
      </div>
      {/* avatar part  */}

      <div className="navbar-end md:mr-8">
        <div className="flex px-2">
          <div>
            {
                        user?.email ? <div className="dropdown dropdown-end">
                            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                                <div className="w-10 rounded-full">
                                    <img src={user.photoURL? user.photoURL : ''} alt={user.displayName} />
                                </div>
                            </label>
                            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                                <li>
                                    <button className="btn btn-sm  btn-ghost">{user.displayName}</button>

                                </li>
                                <li>
                                  
                                  <button className="btn my-3 ">
                                 <Link to='/dashboard'>
                                 Dashboard
                                 </Link>
                                  </button>
                                  
                                
                                </li>
                                <li>
                                    <button className="btn btn-sm  btn-ghost bg-red-500 text-white font-bold"
                                        onClick={logOut}
                                    >Logout</button>

                                </li>
                            </ul>
                        </div>
                            :
                            <Link to='/login'>
                                <button className="btn btn-sm  btn-ghost hover:bg-[#FF0000] px-8 bg-black text-white font-bold">Login</button>
                            </Link>
                    }
          </div>
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost md:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="white"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 font-bold"
              style={{ textAlign: "right" }}
            >
              {navLinks}
            </ul>
          </div>
        </div>
      </div>
    </div>

  );
};

export default Navbar;

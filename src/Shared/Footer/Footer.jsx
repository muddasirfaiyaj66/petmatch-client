import { Link } from "react-router-dom";


const Footer = () => {
    return (
        <div>
            <footer className="bg-white  shadow dark:bg-gray-900 ">
  <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
    <div className="sm:flex sm:items-center sm:justify-between">
    <div >
          <Link to='/'>
          <img
            className=" w-[150px]   flex items-center justify-center"
            src="logo.png"
            alt=""
          />
          </Link>
        </div>
      <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
        <li>
          <a href="#" className="hover:underline me-4 md:me-6">
            About
          </a>
        </li>
        <li>
          <a href="#" className="hover:underline me-4 md:me-6">
            Privacy Policy
          </a>
        </li>
        <li>
          <a href="#" className="hover:underline me-4 md:me-6">
            Licensing
          </a>
        </li>
        <li>
          <a href="#" className="hover:underline">
            Contact
          </a>
        </li>
      </ul>
    </div>
    <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
    <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
      © 2023{" "}
      <a href="https://flowbite.com/" className="hover:underline">
        PetMatch™
      </a>
      . All Rights Reserved.
    </span>
   <span className="flex justify-center items-center text-gray-500">
   <a href="https://www.freepik.com">Image by  Freepik</a>
   </span>
  </div>
</footer>

        </div>
    );
};

export default Footer;
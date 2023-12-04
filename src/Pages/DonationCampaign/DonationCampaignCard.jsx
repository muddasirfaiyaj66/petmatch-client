import { Link } from "react-router-dom";
import { FaBangladeshiTakaSign } from "react-icons/fa6";

const DonationCampaignCard = ({item}) => {
    const {image,name,maxDonationAmount,totalDonation,_id}=item;
    return (
        <div className="relative flex flex-col text-gray-700 bg-white shadow-md bg-clip-border rounded-xl w-96">
        <div className="relative mx-4 mt-4 overflow-hidden text-gray-700 bg-white bg-clip-border rounded-xl h-96">
          <img
            src={image}
            alt="card-image"
            className="object-cover w-full h-full"
          />
        </div>
        <div className="p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="block font-sans text-base antialiased font-medium leading-relaxed text-blue-gray-900">
              Name:{name}
            </p>
           
          </div>
          <div className="flex items-center justify-between mb-2">
         
            <p className=" font-sans text-base flex justify-center items-center font-bold antialiased  leading-relaxed text-blue-gray-900">
            Maximum Donation Amount: {maxDonationAmount} <FaBangladeshiTakaSign className="text-green-500 text-xl"></FaBangladeshiTakaSign>
            </p>
          </div>
          <div className="flex items-center justify-between mb-2">
            <div>
         
            <p className="block font-sans text-xl antialiased font-normal leading-normal text-gray-700 opacity-75">
            Donated Amount: {totalDonation} </p>
           
            </div>
            <div>
            
            </div>
          </div>
        </div>
        <div className="p-6 pt-0">
          <Link to={`/donation-details/${_id}`}>
          <button
            className="align-middle bg-[#00ff48] text-white select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg shadow-gray-900/10 hover:shadow-gray-900/20 focus:opacity-[0.85] active:opacity-[0.85] active:shadow-none block w-full bg-blue-gray-900/10 text-blue-gray-900 shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
            type="button"
          >
            Details
          </button>
          </Link>
        </div>
      </div>
      
      );
};

export default DonationCampaignCard;
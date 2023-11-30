
import { Link } from 'react-router-dom';

const PetListCard = ({item}) => {
  const {image,name,age,location,adopted,_id}=item;
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
          <p className="block font-sans text-base antialiased font-medium leading-relaxed text-blue-gray-900">
            Location: {location}
          </p>
        </div>
        <div className="flex items-center justify-between mb-2">
          <div>
          <p className="block font-sans text-sm antialiased font-normal leading-normal text-gray-700 opacity-75">
         Age: {age} </p>
          </div>
          <div>
          {adopted === 'true' ? <p className="block font-sans font-bold  antialiased text-[#0000FF] leading-normal ">
          Adopted
          </p> : 
          adopted === 'false'?
          <p className="block font-sans font-bold text-sm antialiased text-[#FF0000] leading-normal text-">
          Not Adopted
          </p>
        :
        <p className="block font-sans font-bold text-sm antialiased text-[#FFA500] leading-normal text-">
          Pending
          </p>

        }
          
          </div>
        </div>
      </div>
      <div className="p-6 pt-0">
        <Link to={`/pet-details/${_id}`}>
        <button
          className="align-middle bg-[#FF0000] text-white select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg shadow-gray-900/10 hover:shadow-gray-900/20 focus:opacity-[0.85] active:opacity-[0.85] active:shadow-none block w-full bg-blue-gray-900/10 text-blue-gray-900 shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
          type="button"
        >
          Details
        </button>
        </Link>
      </div>
    </div>
    
    );
};

export default PetListCard;
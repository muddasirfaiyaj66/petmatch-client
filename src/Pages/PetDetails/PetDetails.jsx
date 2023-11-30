import { useParams } from "react-router-dom";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../Components/Loading/Loading";
import banner from '../../assets/11_30_2023 3_09_01 PM.png'
import moment from "moment/moment";
import useAuth from "../../Hooks/useAuth";


const PetDetails = () => {
    const { id } = useParams();
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth()
    console.log(user);

    const { data, isLoading, refetch } = useQuery({
        queryKey: ['petData', id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/pets/${id}`)
            return res.data;
        }

    })

    console.log(data);
    const { image, name, long_description, short_description, category, adopted, location, date, time,email } = data || [];
    const petAddTime = moment(time, 'HH:mm').format('hh:mm A');


    const handleAdoptPet = event =>{
        event.preventDefault();
        const form = event.target;
        const adoptUserNumber = form.number.value;
        const adoptUserLocation = form.user_location.value;
        const adoptUserEmail = user?.email;
        const adoptUserName = user?.displayName;
        const NewAdopted = 'pending';
        const adoptFormData = {
              adoptUserEmail,
              adoptUserLocation,
              adoptUserName,
              adoptUserNumber,
              image,
              name,
              long_description,
              short_description,
              category,
              adopted:NewAdopted,
              location,
              date,
              time,
              petId: id,
              ownerEmail:email



        }

        console.log(adoptFormData);
    }
    return (
        <div>
            <div>
                <img src={banner} className="w-full h-full object-cover" alt="" />
            </div>
            {isLoading ? <Loading></Loading>
                :
                <div className="w-full bg-[url('https://i.ibb.co/2FNdPpS/testimonial-bg.jpg')] my-20 text-white p-8">
                    <div className="max-w-screen-xl mx-auto">

                        <div className="space-y-2 p-5">
                            <h1 className="uppercase  text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r to-[#0000FF] from-[#00ff9d]">Pet Name: {name}</h1>
                            <h1 className="md:text-3xl text-xl   text-black font-bold ">Category : {category}</h1>

                        </div>

                        <div className="flex justify-center items-center p-5">
                            <img src={image} className=" w-full object-cover rounded-lg" alt="" />

                        </div>

                        <div className='flex justify-between p-5'>
                            <div>
                                <p className="text-[#FFA500] md:text-2xl font-bold">Location: {location}</p>
                            </div>
                            <div className="text-[#FF0000] font-semibold">
                                <p>Date: {date}</p>
                                <p>Time: {petAddTime}  </p>
                            </div>

                        </div>
                        <div className='p-5'>
                            <p className="text-gray-400 text-xl font-bold">{short_description}</p>

                        </div>
                        <div className="p-5 my-6 text-black"
                            dangerouslySetInnerHTML={{ __html: long_description }}
                        />

                        <div className="text-center">
                            {adopted === 'true' ?
                                <button disabled className="btn w-full font-bold disabled:bg-[#FF0000] disabled:text-white ">
                                    Adopted
                                </button>
                                :
                                adopted === 'pending' ?
                                    <button disabled className="btn w-full font-bold disabled:bg-[#FFA500] disabled:text-white ">
                                        Pending
                                    </button>
                                    :

                                    <>
                                        <button className="btn w-full font-bold bg-[#0000FF] text-white" onClick={() => document.getElementById('my_modal_5').showModal()}>Adopt</button>
                                        <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
                                            <div className="modal-box">
                                                <form onSubmit={handleAdoptPet} className="card-body">
                                                    <div className="form-control">
                                                        <label className="label">
                                                            <span className="label-text">User Name</span>
                                                        </label>
                                                        <input type="text" disabled defaultValue={user?.displayName} className="input  text-gray-600 input-bordered" required />
                                                    </div>
                                                    <div className="form-control">
                                                        <label className="label">
                                                            <span className="label-text">Email</span>
                                                        </label>
                                                        <input type="email" disabled defaultValue={user?.email} className="input  text-gray-600 input-bordered" required />

                                                    </div>
                                                    <div className="form-control">
                                                        <label className="label">
                                                            <span className="label-text">Phone Number</span>
                                                        </label>
                                                        <input type="number" name="number" placeholder="Enter your Phone Number" className="input  text-gray-600 input-bordered" required />

                                                    </div>
                                                    <div className="form-control">
                                                        <label className="label">
                                                            <span className="label-text">Location</span>
                                                        </label>
                                                        <input type="text" name="user_location" placeholder="Your Location" className="input input-bordered text-gray-600" required />

                                                    </div>
                                                    <div className="form-control  mt-6">
                                                        <button className="btn btn-primary modal-action bg-[#2f47ce] flex justify-center items-center font-bold ">Adopt</button>
                                                    </div>
                                                </form>
                                                <div className="modal-action">
                                                    <form method="dialog">

                                                        <button className="btn">Close</button>
                                                    </form>
                                                </div>
                                            </div>
                                        </dialog>
                                    </>

                            }
                        </div>




                    </div>

                </div>
            }
        </div>
    );
};

export default PetDetails;
import React from 'react';
import { useParams } from 'react-router-dom';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import useAuth from '../../Hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../Components/Loading/Loading';
import moment from 'moment';
import banner from '../../assets/11602400_4760409.jpg';

const DonationDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['Donations_Details', id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/donationCampaigns/${id}`);
      return res.data;
    },
  });

  if (isLoading) {
    return <Loading />;
  }

  if (error || !data) {
    return <div>Error loading donation details. Please try again.</div>;
  }

  const { image, name, long_description, short_description, maxDonationAmount, isPaused,lastDate, lastTime } = data;
  const lastTimeOfDonation = moment(lastTime, 'HH:mm').format('hh:mm A');

  return (
    <div>
      <div>
        <img src={banner} className="w-full h-full object-cover" alt="" />
      </div>
      <div className="w-full bg-[url('https://i.ibb.co/2FNdPpS/testimonial-bg.jpg')] my-20 text-white p-8">
        <div className="max-w-screen-xl mx-auto">
          <div className="space-y-2 p-5">
            <h1 className="uppercase text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r to-[#0000FF] from-[#00ff9d]">
              Pet Name: {name}
            </h1>
            <h1 className="md:text-3xl text-xl text-black font-bold">Maximum Donation Amount : {maxDonationAmount}</h1>
          </div>

          <div className="flex justify-center items-center p-5">
            <img src={image} alt={`Pet ${name}`} className="w-full object-cover rounded-lg" />
          </div>

          <div className="flex justify-between p-5">
            <div className="text-[#FF0000] font-semibold">
              <p>Last Date of Donation: {lastDate}</p>
              <p>Last Time of Donation: {lastTimeOfDonation}</p>
            </div>
          </div>

          <div className="p-5">
            <p className="text-gray-400 text-xl font-bold">{short_description}</p>
          </div>

          <div
            className="p-5 my-6 text-black"
            dangerouslySetInnerHTML={{ __html: long_description }}
          />
        </div>

        {isPaused === 'false' ? 
          <>
          <button className="btn w-full font-bold bg-[#00ff15] text-white" onClick={() => document.getElementById('my_modal_5').showModal()}>Donate</button>
          <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
              <div className="modal-box">
                  <form onSubmit={''} className="card-body">
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

      :
      <button disabled className="btn w-full font-bold disabled:bg-[#FF0000] disabled:text-white ">
      Donation Paused 
  </button>
      }
      </div>
    </div>
  );
};

export default DonationDetails;

import banner from '../../../assets/2210.q702.010.S.m005.c12.charity.jpg'
import { useFormik } from 'formik';
import { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import useAuth from '../../../Hooks/useAuth';
import useAxiosPublic from '../../../Hooks/useAxiosPublic';
import axios from 'axios';
const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`
const MyEditor = ({ content, onContentChange }) => {
  const handleChange = (value) => {
    onContentChange(value);
  };

  MyEditor.modules = {
    toolbar: [
      [{ 'header': [1, 2, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
      ['link', 'image'],
      ['clean']
    ],
    clipboard: {
      matchVisual: false,
    },
  };

  MyEditor.formats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image'
  ];

  return (
    <ReactQuill
      value={content}
      onChange={handleChange}
      modules={MyEditor.modules}
      formats={MyEditor.formats}
    />
  );
};
const CreateDonationCampaign = () => {
    const [content, setContent] = useState('');
    const axiosSecure = useAxiosSecure()
    const axiosPublic = useAxiosPublic();
    const {user} = useAuth()
  
    const handleContentChange = (value) => {
      setContent(value);
    };
  
    const validate = values => {
      const errors = {};
  
      if (!values.name) {
        errors.name = 'Required';
      }
  
      return errors;
    };
  
    const formik = useFormik({
      initialValues: {
        name: '',
        maxDonationAmount: '',
        lastDate: '',
        lastTime: '',
        short_description: '',
        long_description: '',
        
      },
      validate,
      onSubmit: async (values,  {resetForm}) => {
  
        const imageFile = {image:values.image}
       
        const res = await axios.post(image_hosting_api,imageFile,{
          headers:{
            'Content-Type': 'multipart/form-data'
          }
        });
        console.log(imageFile, res);
        console.log("Image url ", res.data.data.display_url, res.data.success);
  
  
        
  
        if(res?.data?.success){
          const formData = {
            ...values,
            long_description: content,
            image: res?.data?.data?.display_url,
            email: user?.email,
            totalDonation: 0,
            isPaused:'false'
           
  
          };
  
       const petData = await  axiosSecure.post('/donationCampaigns', formData)
        if(petData.data.insertedId){
          resetForm();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title:` successfully added in Donation Campaign`,
            showConfirmButton: false,
            timer: 1500
          });
        }
         
        }
  
      },
    });
  
    return (
        <div>
         <div className='mb-10 w-full'>
            <img src={banner} className='w-full h-full object-cover' alt="" />
         </div>
          <div className="my-10 mb-20">
            <div className="max-w-screen-xl mx-auto bg-[#F4F3F0] p-10 rounded-xl shadow-lg">
              <div className="text-center space-y-8">
                <h1 className="md:text-5xl text-2xl my-5 font-bold">Create A Donation Campaign</h1>
              </div>
    
              <div>
                <form onSubmit={formik.handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    
                    <div className="form-control w-full">
                      <label className="label">
                        <span className="label-text font-bold">Pet Name</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.name}
                        required
                        placeholder="Enter pet name"
                        className="input input-bordered w-full"
                      />
                    </div>
                 
                    <div className="form-control w-full">
                      <label className="label">
                        <span className="label-text font-bold">Maximum Donation Amount</span>
                      </label>
                      <input
                        type="number"
                        name="maxDonationAmount"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.maxDonationAmount}
                        required
                        placeholder="Enter your campaign maximum Donation Amount"
                        className="input input-bordered w-full"
                      />
                    </div>
                 
                    
                    <div className="form-control w-full">
                      <label className="label">
                        <span className="label-text font-bold">Last Date of donation</span>
                      </label>
                      <input
                        type="date"
                        name="lastDate"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.lastDate}
                        required
                        placeholder="Last Date of donation"
                        className="input input-bordered w-full"
                      />
                    </div>
                    <div className="form-control w-full">
                      <label className="label">
                        <span className="label-text font-bold">Last Time of Donation</span>
                      </label>
                      <input
                        type="time"
                        name="lastTime"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.lastTime}
                        required
                        placeholder="Last Time of Donation"
                        className="input input-bordered w-full"
                      />
                    </div>
                  </div>
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text font-bold">Short Description</span>
                    </label>
                    <input
                      type="text"
                      name="short_description"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.short_description}
                      required
                      placeholder="Short Description"
                      className="input input-bordered w-full"
                    />
                  </div>
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text font-bold">Long Description</span>
                    </label>
                    <MyEditor  content={content} onContentChange={handleContentChange} />
                    
                  </div>
                  
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text font-bold"> Pet Image </span>
                    </label>
                    <input
                      type="file"
                      name="image"
                      required
                      onChange={(event) => {
                        formik.setFieldValue('image', event.target.files[0]);
                      }}
                    />
                  </div>
                  <button
                    type="submit"
                    className="middle none center w-full rounded-lg my-5 bg-[#ff5148] py-3 px-6 font-sans text-xs font-bold uppercase text-white"
                    data-ripple-light="true"
                  >
                   Create a donation
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      );
};

export default CreateDonationCampaign;
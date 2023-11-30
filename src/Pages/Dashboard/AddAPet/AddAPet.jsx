import { useFormik } from 'formik';
import { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import useAxiosPublic from '../../../Hooks/useAxiosPublic';
import useAuth from '../../../Hooks/useAuth';
import Swal from 'sweetalert2';
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

const AddAPet = () => {
  const [content, setContent] = useState('');
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
      age: '',
      category: 'Cats',
      location: '',
      short_description: '',
      long_description: '',
      
    },
    validate,
    onSubmit: async (values,  {resetForm}) => {

      const imageFile = {image:values.image}
     
      const res = await axiosPublic.post(image_hosting_api,imageFile,{
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
          adopted: 'false',

        };

     const petData = await  axiosPublic.post('/pets', formData)
      if(petData.data.insertedId){
        resetForm();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title:`${values.name} successfully added in pets collection`,
          showConfirmButton: false,
          timer: 1500
        });
      }
       
      }

    },
  });

  return (
    <div>
     
      <div className="my-10 mb-20">
        <div className="max-w-screen-xl mx-auto bg-[#F4F3F0] p-10 rounded-xl shadow-lg">
          <div className="text-center space-y-8">
            <h1 className="md:text-5xl text-2xl my-5 font-bold">Add A Pet</h1>
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
                    placeholder="Add your pet name"
                    className="input input-bordered w-full"
                  />
                  {formik.errors.name ? <div>{formik.errors.name}</div> : null}
                </div>
                
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text font-bold">Age</span>
                  </label>
                  <input
                    type="number"
                    name="age"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.age}
                    required
                    placeholder="Enter your pet age"
                    className="input input-bordered w-full"
                  />
                </div>
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text font-bold"></span>
                  </label>
                  <select
                    name="category"
                    required
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.category}
                    className="input input-bordered w-full"
                  >
                    <option>Cats</option>
                    <option>Dogs</option>
                    <option>Rabbit</option>
                    <option>Birds</option>
                  </select>
                </div>
               
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text font-bold">Location</span>
                  </label>
                  <input
                    type="text"
                    name="location"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.location}
                    required
                    placeholder="Location"
                    className="input input-bordered w-full"
                  />
                </div>
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text font-bold">Date</span>
                  </label>
                  <input
                    type="date"
                    name="date"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.date}
                    required
                    placeholder="Date"
                    className="input input-bordered w-full"
                  />
                </div>
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text font-bold">Time</span>
                  </label>
                  <input
                    type="time"
                    name="time"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.time}
                    required
                    placeholder="Time"
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
                  <span className="label-text font-bold">Image </span>
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
                className="middle none center w-full rounded-lg my-5 bg-[#3839AF] py-3 px-6 font-sans text-xs font-bold uppercase text-white"
                data-ripple-light="true"
              >
                Add a pet
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddAPet;

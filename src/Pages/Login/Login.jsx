import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import { Formik } from 'formik';
import Swal from "sweetalert2";
import SocialLogin from "../../Components/SocialLogin/SocialLogin";

const Login = () => {
  const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from?.pathname || '/';
    const {login} = useAuth();
  
    return (
       <div className="max-w-screen-xl mx-auto my-20 flex justify-center items-center">
         <div className="w-full max-w-md p-8 space-y-3 rounded-xl dark:bg-gray-900 dark:text-gray-100">
            <h1 className="text-2xl font-bold text-center">Login</h1>
            <Formik
       initialValues={{ email: '', password: '' }}
       validate={values => {
         const errors = {};
         if (!values.email) {
           errors.email = 'Required';
         } else if (
           !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
         ) {
           errors.email = 'Invalid email address';
         }
         return errors;
       }}
       onSubmit={(values, { setSubmitting }) => {
         setTimeout(() => {
           
           const email = values.email;
           const password = values.password;
            console.log('success',  values.email, values.password)
            login(email,password)
            .then(res=>{
              if (res.data.insertedId) {
                Swal.fire({
                    icon: "success",
                    title: "Congrats!!!",
                    text: "Log in Successfully",
                });
                //navigate after register
                navigate(from, { replace: true });
            }
            })
          
           setSubmitting(false);
         }, 400);
       }}
     >
       {({
         values,
         errors,
         touched,
         handleChange,
         handleBlur,
         handleSubmit,
         isSubmitting,
         /* and other goodies */
       }) => (
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-1 text-sm">
                    <label  className="block dark:text-gray-400">Email</label>
                    <input
                    type="email"
                    name="email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                     id="username" placeholder="Username" className="w-full px-4 py-3 rounded-md dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 focus:dark:border-violet-400" />
                      {errors.email && touched.email && errors.email}
                </div>
                <div className="space-y-1 text-sm">
                    <label className="block dark:text-gray-400">Password</label>
                    <input 
                    type="password"
                    name="password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                    id="password" placeholder="Password" className="w-full px-4 py-3 rounded-md dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 focus:dark:border-violet-400" />
                    {errors.password && touched.password && errors.password}
                    <div className="flex justify-end text-xs dark:text-gray-400">
                        <a rel="noopener noreferrer" href="#">Forgot Password?</a>
                    </div>
                </div>
                <button  type="submit" disabled={isSubmitting} className="block w-full p-3 text-center rounded-sm dark:text-white dark:bg-[#FF0000]">Sign in</button>
            </form>
            )}
            </Formik>
            {/* social log in */}
            <SocialLogin></SocialLogin>
            <p className="text-xs text-center sm:px-6 dark:text-gray-400">Don't have an account?
                <a rel="noopener noreferrer" href="/register" className="underline dark:text-gray-100">Sign up</a>
            </p>
        </div>
       </div>
    );
};

export default Login;
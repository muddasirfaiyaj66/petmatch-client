import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import { Formik, Field, ErrorMessage } from 'formik';
import Swal from "sweetalert2";
import SocialLogin from "../../Components/SocialLogin/SocialLogin";
import { useState } from "react";

const Login = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || '/';
  const [error, setError] = useState(null);
  const { login } = useAuth();

  const handleLogin = async (values, { setSubmitting }) => {
    try {
      const { email, password } = values;
  
      const response = await login(email, password);
     
      if (response) {
        Swal.fire({
          icon: "success",
          title: "Congrats!!!",
          text: "Log in Successfully",
        });
        // Navigate after successful login
        navigate(from, { replace: true });
      }
    } catch (error) {
      setError(error?.message);
      
    } finally {
    
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-screen-xl mx-auto my-20 flex justify-center items-center">
      <div className="w-full max-w-md p-8 space-y-3 rounded-xl dark:bg-gray-900 dark:text-gray-100">
        <h1 className="text-2xl font-bold text-center">Login</h1>
        {error && (
          <div className="text-red-500 text-sm mb-2">{error}</div>
        )}
        <Formik
          initialValues={{ email: '', password: '' }}
          validate={(values) => {
            const errors = {};
            if (!values.email) {
              errors.email = 'Required';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
              errors.email = 'Invalid email address';
            }
            if (!values.password) {
              errors.password = 'Required';
            }
            return errors;
          }}
          onSubmit={handleLogin}
        >
          {({ isSubmitting, handleSubmit }) => (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email input */}
              <div className="mb-4">
                <label htmlFor="email" className="block dark:text-gray-400">
                  Email
                </label>
                <Field
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Email"
                  className="w-full px-4 py-3 rounded-md dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 focus:dark:border-violet-400"
                />
                <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
              </div>

              {/* Password input */}
              <div className="mb-4">
                <label htmlFor="password" className="block dark:text-gray-400">
                  Password
                </label>
                <Field
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Password"
                  className="w-full px-4 py-3 rounded-md dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 focus:dark:border-violet-400"
                />
                <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />
                <div className="flex justify-end text-xs dark:text-gray-400">
                  <a rel="noopener noreferrer" href="#">
                    Forgot Password?
                  </a>
                </div>
              </div>

              {/* Submit button */}
              <button type="submit" className="block w-full p-3 text-center rounded-sm dark:text-white dark:bg-[#FF0000]" disabled={isSubmitting}>
                Sign in
              </button>
            </form>
          )}
        </Formik>
        {/* Social log in */}
        <SocialLogin />
        <p className="text-xs text-center sm:px-6 dark:text-gray-400">
          Don't have an account? <a rel="noopener noreferrer" href="/register" className="underline dark:text-gray-100">Sign up</a>
        </p>
      </div>
    </div>
  );
};

export default Login;

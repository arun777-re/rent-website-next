"use client"
import React from "react";
import { Formik, FormikHelpers } from "formik";
import * as yup from "yup";
import { useDispatch} from "react-redux";
import { AppDispatch} from "@/redux/store";
import { RiHome8Line } from "react-icons/ri";
import { useRouter } from "next/navigation";
import { loginUser } from "@/redux/slices/userSlice";
import toast from "react-hot-toast";
import { ErrorProps } from "@/redux/slices/adminSlice";

interface loginProps {
    email: string;
    password: string;
  }

  const initialLoginValue: loginProps = {
    email: "",
    password: "",
  };

  const initialLoginSchema = yup.object().shape({
    email: yup.string().email("Enter valid email type").required(),
    password: yup.string().required(),
  });

 

const LoginForm = () => {
      const dispatch = useDispatch<AppDispatch>();
          const router = useRouter();
          
      const handleLogin = async (values:loginProps, { resetForm }:FormikHelpers<loginProps>) => {
        try {
          // API call to login user
          await dispatch(loginUser(values)).unwrap().then((res)=>{
            toast.success('Login Successfull')
            router.push('/')
          }).catch((err:ErrorProps)=>{
            const message = err?.message || 'Login Failed';
            toast.error(message)
            router.push('/user/auth-login')
          });
          resetForm();
        } catch (error) {
          console.error("login failed. Please check your credentials.");
          throw new Error("login failed. Please check your credentials.");
        }
      };
  return (
  <Formik
       initialValues={initialLoginValue}
       validationSchema={initialLoginSchema
       }
       onSubmit={handleLogin}
     >
       {({ values, errors, handleBlur, handleChange, handleSubmit ,touched}) => (
         <form onSubmit={handleSubmit} 
         method="POST"
         
         className="relative w-[40vw] bg-white flex flex-col  z-20
         items-center justify-cente gap-5 py-10 rounded-sm shadow-xl ">
           <a href="/" className="flex items-center space-x-1 rtl:space-x-reverse">
               <RiHome8Line className="text-3xl text-green-600  dark:text-gray-700" />
                <span className="self-center text-xl font-semibold whitespace-nowrap text-gray-800 dark:text-gray-700">Hously</span>
            </a>
           <div className="relative w-full h-auto flex flex-col items-start gap-5 px-10 z-40">
                 
 
             <input
               type="email"
               placeholder="Email"
               name="email"
               value={values.email}
               onBlur={handleBlur}
               onChange={handleChange}
               className="w-full py-3 px-2 border border-gray-600/40 rounded-sm placeholder:text-sm" 
             />
             {touched.email && errors.email && <div className="text-red-500 text-sm">{errors.email}</div>}
             <input
               type="password"
               placeholder="Password"
               name="password"
               value={values.password}
               onBlur={handleBlur}
               onChange={handleChange}
               className="w-full py-3 px-2 border border-gray-600/40 rounded-sm placeholder:text-sm" 
             />
          {touched.password && errors.password && <div className="text-red-500 text-sm">{errors.password}</div>}
 
             <button type="submit" className="w-full py-3 flex items-center justify-center
             rounded-lg cursor-pointer hover:bg-green-700 transition-colors duration-300 bg-green-600 text-white font-medium">
               Login
             </button>
           </div>
     
         </form>
       )}
     </Formik>
  )
}

export default LoginForm
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
import Image from "next/image";

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
    <div className="max-w-[100vw] w-full relative bg-white rounded-sm drop-shadow-2xl drop-shadow-black py-10">
  <Formik
       initialValues={initialLoginValue}
       validationSchema={initialLoginSchema
       }
       onSubmit={handleLogin}
     >
       {({ values, errors, handleBlur, handleChange, handleSubmit ,touched}) => (
         <form onSubmit={handleSubmit} 
         method="POST"
         
         className="relative w-[96vw] md:w-[40vw]  flex flex-col px-4 z-20 
        items-center justify-center gap-5  ">
           <a
                    href="/"
                    className="flex items-center space-x-1 rtl:space-x-reverse"
                  >
                    <Image src={'/images/tree-house.png'}
                    height={60}
                    width={60}
                    alt="logo-image"
                    priority
                    className="text-3xl text-green-700  dark:text-gray-700" />
                   
                  </a>
           <div className="relative w-full h-auto flex flex-col items-start gap-5 md:px-10 z-40">
                 
 
             <input
               type="email"
               placeholder="Email:name@gmail.com"
               name="email"
               value={values.email}
               onBlur={handleBlur}
               onChange={handleChange}
               className="w-full py-3 px-2 border border-gray-600/40 rounded-sm placeholder:text-sm" 
             />
             {touched.email && errors.email && <div className="text-red-500 text-sm">{errors.email}</div>}
             <input
               type="password"
               placeholder="Password:Asdf@145"
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
     </div>
  )
}

export default LoginForm
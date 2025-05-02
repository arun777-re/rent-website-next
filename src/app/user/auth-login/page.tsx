// login signup form
"use client";
import React, { useCallback, useEffect, useState } from "react";
import { Formik, FormikHelpers } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { RiHome8Line } from "react-icons/ri";
import { useRouter } from "next/navigation";
import { createUser,loginUser } from "@/redux/slices/userSlice";
import Image from "next/image";
import toast from 'react-hot-toast'

interface loginProps {
  email: string;
  password: string;
}
interface registerProps {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
}

const initialLoginValue: loginProps = {
  email: "",
  password: "",
};

const initialSignUpValue: registerProps = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  phone: "",
};

const initialSignUpSchema = yup.object().shape({
    firstName: yup.string().required("First name is required"),
    lastName: yup.string().required("Last name is required"),
    email: yup.string().email("Enter a valid email").required("Email is required"),
    phone: yup.string().required("Phone is required"),
    password: yup.string().required("Password is required"),
  });
  

const initialLoginSchema = yup.object().shape({
  email: yup.string().email("Enter valid email type").required(),
  password: yup.string().required(),
});

const UserSignUp = () => {
  const [page, setPage] = useState<String>("register");
  const dispatch = useDispatch<AppDispatch>();

  const router = useRouter();

  const {users,loading,error}= useSelector((state: RootState) => state.user);
  console.log("Error is:",error)

  const handleLogin = async (
    values: loginProps,
    { resetForm }: FormikHelpers<loginProps>
  ) => {
    try {
      // API call to login user
      await dispatch(loginUser(values)).unwrap();
      resetForm();
    } catch (error) {
      console.error("login failed. Please check your credentials.");
      throw error;
    }
  };

  const handleSignUp = useCallback(
    async (
      values: registerProps,
      { resetForm }: FormikHelpers<registerProps>
    ) => {
      try {
        console.log("Signup triggered", values);
        await dispatch(createUser(values)).unwrap();
        resetForm();
        router.push("/");
      } catch (error) {
        console.error("Signup failed. Please check your credentials.", error);
      }
    },
    [dispatch]
  );

  useEffect(()=>{
    if(error){
      console.log("error is:",error)
      toast.error(error)
    }
  },[error])
 
  return (
    <div className="relative w-[100vw] mx-auto h-screen">

    <div
      className=" absolute inset-0 z-0 bg-[url('/images/login.avif')] bg-no-repeat bg-cover bg-fixed 
               animate-wiggle transition-all duration-800"
               style={{backgroundSize:"120%"}}
    >
      <div className="absolute inset-0 bg-gray-700/60
       opacity-80 z-0"></div>
       <div className="relative z-10 flex justify-center items-center h-full">
      <Formik
        initialValues={
          page === "login" ? initialLoginValue : initialSignUpValue
        }
        validationSchema={
          page === "login" ? initialLoginSchema : initialSignUpSchema
        }
        onSubmit={page === "login" ? handleLogin : handleSignUp}
      >
        {({ values, errors, handleBlur, handleChange, handleSubmit }) => (
          <form
            onSubmit={handleSubmit}
            method="POST"
            noValidate
            className="relative w-[30vw] bg-white flex flex-col  z-20
        items-center justify-cente gap-5 py-8 rounded-sm shadow-2xl"
          >
            <a
              href="/"
              className="flex items-center space-x-1 rtl:space-x-reverse"
            >
              <Image src={'/images/logo.png'} height={50}
              width={40}
              alt='logo'
              className="text-3xl text-green-700  dark:text-gray-700" />
              
            </a>
            <div className="relative w-full h-auto flex flex-col items-start gap-5 px-10 z-40">
              {page === "register" && (
                <>
                  <input
                    type="text"
                    placeholder="FirstName"
                    name="firstName"
                    value={values.firstName}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    className="w-full py-3 px-2 border border-gray-600/40 rounded-sm placeholder:text-sm"
                  />
                  <input
                    type="text"
                    placeholder="lastName"
                    name="lastName"
                    value={values.lastName}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    className="w-full py-3 px-2 border border-gray-600/40 rounded-sm placeholder:text-sm"
                  />
                  <input
                    type="number"
                    placeholder="Phone"
                    name="phone"
                    value={values.phone}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    className="w-full py-3 px-2 border border-gray-600/40 rounded-sm placeholder:text-sm"
                  />
                </>
              )}

              <input
                type="email"
                placeholder="Email"
                name="email"
                value={values.email}
                onBlur={handleBlur}
                onChange={handleChange}
                className="w-full py-3 px-2 border border-gray-600/40 rounded-sm placeholder:text-sm"
              />
              <input
                type="password"
                placeholder="Password"
                name="password"
                value={values.password}
                onBlur={handleBlur}
                onChange={handleChange}
                className="w-full py-3 px-2 border border-gray-600/40 rounded-sm placeholder:text-sm"
              />

              <button
                type="submit"
                className="w-full py-3 flex items-center justify-center
            rounded-lg cursor-pointer hover:bg-green-700 transition-colors duration-300 bg-green-600 text-white font-medium"
              >
                {page === "login" ? <p>Login</p> : <p>Signup</p>}
              </button>
            </div>
            <button
              className="w-[84%] py-3 flex items-center justify-center bg-green-300 text-white font-medium rounded-lg"
              type="button"
              onClick={() => setPage(page === "login" ? "register" : "login")}
            >
              Switch to {page === "login" ? "Register" : "Login"}
            </button>
          </form>
        )}
      </Formik>
      </div>
    </div>
    </div>

  );
};

export default UserSignUp;

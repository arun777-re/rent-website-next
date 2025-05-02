// login signup form
"use client"
import React, { useCallback, useEffect, useState } from "react";
import { Formik, FormikHelpers } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch ,RootState} from "@/redux/store";
import { loginAdmin,signupAdmin } from "@/redux/slices/adminSlice";
import { RiHome8Line } from "react-icons/ri";
import { useRouter } from "next/navigation";

interface loginProps {
  email: string;
  password: string;
}
interface registerProps {
  name: string;
  inviteCode: string;
  email: string;
  password: string;
  phone:string;
  agencyName:string;
  agencyAddress:string;
  licenseNumber:string;
}

const initialLoginValue: loginProps = {
  email: "",
  password: "",
};

const initialSignUpValue: registerProps = {
  name: "",
  email: "",
  password: "",
  inviteCode: "",
  phone:"",
  agencyName:"",
  agencyAddress:"",
  licenseNumber:""
};
const initialSignUpSchema = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().required("Please enter a valid email"),
  phone: yup.string().required("Please enter a valid phone"),
  agencyName: yup.string().required("Please enter a valid agencyName"),
  agencyAddress: yup.string().required("Please enter a valid agencyAddress"),
  licenseNumber: yup.string().required("Please enter a valid licenseNumber"),
  password: yup.string().required(),
  inviteCode: yup.string(),
});

const initialLoginSchema = yup.object().shape({
  email: yup.string().email("Enter valid email type").required(),
  password: yup.string().required(),
});

const signup = () => {
  const [page,setPage] = useState<String>("register");
  const dispatch = useDispatch<AppDispatch>();

const router = useRouter();

const adminData = useSelector((state:RootState)=> state.admin.admin);

  const handleLogin = async (values:loginProps, { resetForm }:FormikHelpers<loginProps>) => {
    try {
      // API call to login user
      await dispatch(loginAdmin(values)).unwrap();
      resetForm();
    } catch (error) {
      console.error("login failed. Please check your credentials.");
      throw error;
    }
  };

  const handleSignUp = useCallback(
    async (values: registerProps, { resetForm }: FormikHelpers<registerProps>) => {
      try {
        console.log("Signup triggered",values);
        await dispatch(signupAdmin(values)).unwrap();
        resetForm();
        router.push('/admin/')
      } catch (error) {
        console.error("Signup failed. Please check your credentials.", error);
      }
    },
    [dispatch]
  );



  return (
    <div className="relative w-[100vw] mx-auto h-auto pl-40 
    bg-center bg-no-repeat bg-cover
    z-0 py-10" style={{
      backgroundImage:'url("/images/login.avif")',
    }}>
  <div className="absolute inset-0 bg-black opacity-60 z-0"></div>
    <Formik
      initialValues={page === "login" ? initialLoginValue : initialSignUpValue}
      validationSchema={
        page === "login" ? initialLoginSchema : initialSignUpSchema
      }
      onSubmit={page === "login" ? handleLogin : handleSignUp}
    >
      {({ values, errors, handleBlur, handleChange, handleSubmit }) => (
        <form onSubmit={handleSubmit} 
        method="POST"
        
        className="relative w-[40vw] bg-white flex flex-col  z-20
        items-center justify-cente gap-5 py-10 rounded-sm shadow-xl ">
          <a href="/" className="flex items-center space-x-1 rtl:space-x-reverse">
              <RiHome8Line className="text-3xl text-green-600  dark:text-gray-700" />
               <span className="self-center text-xl font-semibold whitespace-nowrap text-gray-800 dark:text-gray-700">Hously</span>
           </a>
          <div className="relative w-full h-auto flex flex-col items-start gap-5 px-10 z-40">
            {page === "register" && (
              <>
                <input
                  type="text"
                  placeholder="name"
                  name="name"
                  value={values.name}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  className="w-full py-3 px-2 border border-gray-600/40 rounded-sm placeholder:text-sm" 
                />
                <input
                  type="text"
                  placeholder="InviteCode"
                  name="inviteCode"
                  value={values.inviteCode}
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
            <input
              type="text"
              placeholder="Phone"
              name="phone"
              value={values.phone}
              onBlur={handleBlur}
              onChange={handleChange}
              className="w-full py-3 px-2 border border-gray-600/40 rounded-sm placeholder:text-sm" 
            />
            <input
              type="text"
              placeholder="agencyName"
              name="agencyName"
              value={values.agencyName}
              onBlur={handleBlur}
              onChange={handleChange}
              className="w-full py-3 px-2 border border-gray-600/40 rounded-sm placeholder:text-sm" 
            />
            <input
              type="text"
              placeholder="agencyAddress"
              name="agencyAddress"
              value={values.agencyAddress}
              onBlur={handleBlur}
              onChange={handleChange}
              className="w-full py-3 px-2 border border-gray-600/40 rounded-sm placeholder:text-sm" 
            />
            <input
              type="text"
              placeholder="agencyNumber"
              name="agencyNumber"
              value={values.agencyNumber}
              onBlur={handleBlur}
              onChange={handleChange}
              className="w-full py-3 px-2 border border-gray-600/40 rounded-sm placeholder:text-sm" 
            />
            <input
              type="text"
              placeholder="licenseNumber"
              name="licenseNumber"
              value={values.licenseNumber}
              onBlur={handleBlur}
              onChange={handleChange}
              className="w-full py-3 px-2 border border-gray-600/40 rounded-sm placeholder:text-sm" 
            />

            <button type="submit" className="w-full py-3 flex items-center justify-center
            rounded-lg cursor-pointer hover:bg-green-700 transition-colors duration-300 bg-green-600 text-white font-medium">
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

  );
};

export default signup;

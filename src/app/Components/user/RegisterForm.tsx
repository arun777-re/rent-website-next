"use client";
import React, { useCallback} from "react";
import { Formik, FormikHelpers } from "formik";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { RiHome8Line } from "react-icons/ri";
import { useRouter } from "next/navigation";
import { createUser } from "@/redux/slices/userSlice";
import toast from "react-hot-toast";
import Image from "next/image";

interface registerProps {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
}

const initialSignUpValue: registerProps = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  phone: "",
};
const initialSignUpSchema = yup.object().shape({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  email: yup.string().required("Please enter a valid email"),
  phone: yup.string().required("Please enter a valid phone"),
  password: yup.string().required(),
});
const RegisterForm = () => {
  const dispatch = useDispatch<AppDispatch>();

  const router = useRouter();

  const handleSignUp = useCallback(
    async (
      values: registerProps,
      { resetForm }: FormikHelpers<registerProps>
    ) => {
      try {
        await dispatch(createUser(values))
          .unwrap()
          .then((res) => {
            toast.success("SignUp completed");
            router.push("/");
          })
          .catch((err) => {
            toast.error("SignUp failed");
            router.push("/user/auth-login");
          });
        resetForm();
      } catch (error) {
        toast.error("SignUp failed");
        console.error("Signup failed. Please check your credentials.", error);
      }
    },
    [dispatch]
  );
  return (
    <div className="max-w-[100vw] w-full relative bg-white rounded-sm drop-shadow-2xl drop-shadow-black py-10">

    <Formik
      initialValues={initialSignUpValue}
      validationSchema={initialSignUpSchema}
      onSubmit={handleSignUp}
      className={"relative w-full"}
    >
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
      }) => (
        <form
          onSubmit={handleSubmit}
          method="POST"
          className="relative w-[96vw] md:w-[40vw]  flex flex-col px-4 z-20 
        items-center justify-center gap-5  "
        >
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
          <div className="relative w-full h-auto flex flex-col items-start gap-5  md:px-10 z-40">
            <input
              type="text"
              placeholder="Fistname"
              name="firstName"
              value={values.firstName}
              onBlur={handleBlur}
              onChange={handleChange}
              className="w-full py-3 px-2 border border-gray-600/40 rounded-sm placeholder:text-sm"
            />
            {touched.firstName && errors.firstName && (
              <div className="text-red-500 text-sm">{errors.firstName}</div>
            )}
            <input
              type="text"
              placeholder="LastName"
              name="lastName"
              value={values.lastName}
              onBlur={handleBlur}
              onChange={handleChange}
              className="w-full py-3 px-2 border border-gray-600/40 rounded-sm placeholder:text-sm"
            />
            {touched.lastName && errors.lastName && (
              <div className="text-red-500 text-sm">{errors.lastName}</div>
            )}
            <input
              type="email"
              placeholder="Email:name@example.com"
              name="email"
              value={values.email}
              onBlur={handleBlur}
              onChange={handleChange}
              className="w-full py-3 px-2 border border-gray-600/40 rounded-sm placeholder:text-sm"
            />
            {touched.email && errors.email && (
              <div className="text-red-500 text-sm">{errors.email}</div>
            )}
            <input
              type="password"
              placeholder="Password:Asdf@123"
              name="password"
              value={values.password}
              onBlur={handleBlur}
              onChange={handleChange}
              className="w-full py-3 px-2 border border-gray-600/40 rounded-sm placeholder:text-sm"
            />
            {touched.password && errors.password && (
              <div className="text-red-500 text-sm">{errors.password}</div>
            )}
            <input
              type="text"
              placeholder="Phone"
              name="phone"
              value={values.phone}
              onBlur={handleBlur}
              onChange={handleChange}
              className="w-full py-3 px-2 border border-gray-600/40 rounded-sm placeholder:text-sm"
            />
            {touched.phone && errors.phone && (
              <div className="text-red-500 text-sm">{errors.phone}</div>
            )}
            <button
              type="submit"
              className="w-full py-3 flex items-center justify-center 
            rounded-lg cursor-pointer hover:bg-green-700 transition-colors duration-300 bg-green-600 text-white font-medium"
            >
              <p className="text-white text-sm">SignUp</p>
            </button>
          </div>
       
        </form>
      )}
    </Formik>
    </div>

  );
};

export default RegisterForm;

"use client";
import React, { useCallback } from "react";
import { Formik, FormikHelpers } from "formik";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { RiHome8Line } from "react-icons/ri";
import { useRouter } from "next/navigation";
import { createUser } from "@/redux/slices/userSlice";
import toast from "react-hot-toast";

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
        console.log("Signup triggered", values);
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
    <Formik
      initialValues={initialSignUpValue}
      validationSchema={initialSignUpSchema}
      onSubmit={handleSignUp}
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
          className="relative w-[40vw] bg-white flex flex-col  z-20
        items-center justify-cente gap-5 py-10 rounded-sm shadow-xl "
        >
          <a
            href="/"
            className="flex items-center space-x-1 rtl:space-x-reverse"
          >
            <RiHome8Line className="text-3xl text-green-600  dark:text-gray-700" />
            <span className="self-center text-xl font-semibold whitespace-nowrap text-gray-800 dark:text-gray-700">
              Hously
            </span>
          </a>
          <div className="relative w-full h-auto flex flex-col items-start gap-5 px-10 z-40">
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
              placeholder="Email"
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
              placeholder="Password"
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
  );
};

export default RegisterForm;

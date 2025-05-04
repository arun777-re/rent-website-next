"use client";
import React, { useState } from "react";
import LoginForm from "@/app/Components/user/LoginForm";
import RegisterForm from "@/app/Components/user/RegisterForm";

const UserSignUp = () => {
  const [page, setPage] = useState<String>("register");

  return (
    <div className="relative w-[100vw] mx-auto h-screen">
      <div
        className=" absolute inset-0 z-0 bg-[url('/images/login.avif')] bg-no-repeat bg-cover bg-fixed 
               animate-wiggle transition-all duration-800"
        style={{ backgroundSize: "120%" }}
      >
        <div
          className="absolute inset-0 bg-gray-700/60
       opacity-80 z-0"
        ></div>
        <div className="relative z-10 flex flex-col justify-center items-center h-full gap-2 ">
          <div className="relative ">
            {page === "login" ? <LoginForm /> : <RegisterForm />}
          </div>

          <button
            type="button"
            onClick={() => setPage(page === "login" ? "register" : "login")}
            className="underline text-first cursor-pointer px-4 py-2 bg-white rounded-lg"
          >
            {page === "login" ? "SignUp" : "Login"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserSignUp;

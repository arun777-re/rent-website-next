"use client";
import React, { useState } from "react";
import LoginForm from "@/app/Components/user/LoginForm";
import RegisterForm from "@/app/Components/user/RegisterForm";

const UserSignUp = () => {
  const [page, setPage] = useState<String>("register");

  return (
    <div className="relative max-w-screen w-full mx-auto h-[120vh]">
      <div
        className=" absolute inset-0 z-0 bg-[url('/images/login.avif')] bg-no-repeat bg-cover bg-fixed 
               animate-wiggle transition-all duration-800"
        style={{ backgroundSize: "120%" }}
      >
        <div
          className="absolute inset-0 bg-gray-700/60
       opacity-80 z-0"
        ></div>
        <div className="relative z-10 flex flex-col justify-center items-center h-full gap-5 px-4 ">
          <div className="relative ">
            {page === "login" ? <LoginForm /> : <RegisterForm />}
          </div>

          <button
            type="button"
            onClick={() => setPage(page === "login" ? "register" : "login")}
            className="underline text-white font-semibold cursor-pointer px-8 py-2 bg-green-400 animate-out
             rounded-lg relative right-[32%] md:right-[16%] z-300 top-[-88%] md:top-[-86%]"
          >
            {page === "login" ? "SignUp" : "Login"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserSignUp;

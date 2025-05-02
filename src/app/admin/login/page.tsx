// app/admin/signup/page.tsx or wherever your page lives
"use client";
import LoginForm from "@/app/Components/admin/LoginForm";
import RegisterForm from "@/app/Components/admin/RegisterForm";
import React, { useState } from "react";

const SignupPage = () => {
  const [page, setPage] = useState<"login" | "register">("login");

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center gap-4">
      {page === "login" ? <LoginForm /> : <RegisterForm />}
      <button
        onClick={() => setPage(page === "login" ? "register" : "login")}
        className="text-blue-500 underline cursor-pointer"
      >
        Switch to {page === "login" ? "Register" : "Login"}
      </button>
    </div>
  );
};

export default SignupPage;

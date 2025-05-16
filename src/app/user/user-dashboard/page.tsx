"use client";

import Button from "@/app/_component/Button";
import React, { useState, useEffect } from "react";
import { MdOutlineAddHomeWork } from "react-icons/md";
import { RiHomeHeartFill } from "react-icons/ri";
import Image from "next/image";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { getUser, UserProps } from "@/redux/slices/userSlice";
import LastActivity from "@/app/Components/user/LastActivity";
import ViewFavorate from "@/app/Components/user/ViewFavorate";
import NotificationBell from "@/app/_component/NotificationBell";

const UserDashboard = () => {
  const [page, setPage] = useState<string>("interaction");
  const dispatch = useDispatch<AppDispatch>();
  const [user, setUser] = useState<UserProps>({
    firstName: "",
    lastName: "",
    _id: "",
  });

  // get user when open dashboard
  useEffect(() => {
    dispatch(getUser())
      .unwrap()
      .then((res) => {
        if (res?.data) {
          setUser(res?.data);
        }
      });
  }, [dispatch]);


  return (
    <div className="max-w-screen w-full relative h-auto mx-auto inset-0 hide-scroolbar overflow-x-hidden">
      <div className="w-full flex flex-col lg:flex-row relative">
        <aside className="w-full lg:w-[20%] h-[20vh] lg:min-h-screen sticky top-0 flex flex-col items-start justify-between lg:justify-start gap-5 lg:gap-10 p-5 bg-black text-white backdrop-blur-2xl z-30">
          <a
            href="/"
            className="flex items-center justify-center gap-1 rtl:space-x-reverse sticky top-5"
          >
            <Image
              src={"/images/tree-house.png"}
              height={22}
              width={22}
              alt="logo"
              className="text-3xl text-green-700  dark:text-gray-700"
            />
            <span
              className={`self-center tracking-wide text-lg font-medium whitespace-nowrap dark:text-gray-700
                      `}
            >
              Hously
            </span>
          </a>
          <div className="flex flex-row
           lg:flex-col items-start justify-between text-white w-full h-auto gap-8 sticky top-10 lg:top-20">
            <Button
              onClick={() => setPage("interaction")}
              className="flex flex-row items-center gap-2 sm:gap-4 cursor-pointer text-gray-300/60
                  active:text-white hover:text-white transition-colors duration-300"
            >
              <MdOutlineAddHomeWork size={18} />
              <p className="text-sm font-medium text-gray-300/60 text-start">
                Last Activity
              </p>
            </Button>
            <Button
              onClick={() => setPage("favorate")}
              className="flex flex-row items-center gap-2 sm:gap-4 cursor-pointer text-gray-300/60
                  active:text-white hover:text-white transition-colors duration-300"
            >
              <RiHomeHeartFill size={18} />
              <p className="text-sm font-medium text-gray-300/60 text-start">
                Favorate Properties
              </p>
            </Button>
          </div>
        </aside>
        <section className="w-full lg:w-[80%] h-screen overflow-y-scroll">
          <div className="w-full sticky top-0 mx-auto backdrop-blur-3xl z-30">
            <div className="flex flex-row items-center justify-between shadow px-6 py-4 ">
              <div className="flex flex-row items-center gap-4">
                <h4 className="animate-pulse">
                  {user?.firstName}&nbsp;
                  {user?.lastName}
                </h4>
              </div>
              <div className="flex flex-row items-center gap-2">
                <NotificationBell />
              </div>
            </div>
          </div>
          <div className="relative w-full h-auto px-6 py-6 bg-gray-300/20 overflow-y-scroll overflow-x-hidden">
            {page === "interaction" && <LastActivity />}
            {page === "favorate" && <ViewFavorate />}
          </div>
        </section>
      </div>
    </div>
  );
};

export default UserDashboard;


"use client";

import Button from "@/app/_component/Button";
import React, { useEffect, useState } from "react";
import { RiHome8Line } from "react-icons/ri";
import { RxDashboard } from "react-icons/rx";
import { MdOutlineAddHomeWork } from "react-icons/md";
import { IoReorderThreeOutline } from "react-icons/io5";
import AddProperty from "@/app/Components/admin/AddProperty";
import { IoMdNotificationsOutline } from "react-icons/io";
import { MdOutlineMapsHomeWork } from "react-icons/md";
import { RiHomeHeartFill } from "react-icons/ri";
import { RiHome9Fill } from "react-icons/ri";
import { FaUserPen } from "react-icons/fa6";
import Image from "next/image";
import ExplorePrprty from "@/app/Components/admin/ExplorePrprty";
import FavoritePrprty from "@/app/Components/admin/FavoritePrprty";
import FeaturedPrprty from "@/app/Components/admin/FeaturedPrprty";
import AdProfile from "@/app/Components/admin/AdProfile";
import Dashboard from "@/app/Components/admin/Dashboard";
import NotificationSender from "@/app/Components/admin/NotificationSender";
import ViewRented from "@/app/Components/admin/ViewRented";
import ViewSold from "@/app/Components/admin/ViewSold";


const AdminDashboard = () => {
  const [page, setPage] = useState<string>("dashboard");


  return (
    <div className="w-[100vw] relative h-auto mx-auto">
      <div className="w-full flex flex-row relative">
        <aside className="w-[20%] min-h-screen relative flex flex-col items-start justify-start gap-10 p-5 bg-black text-white">
          <a
            href="/"
            className="flex items-center space-x-1 rtl:space-x-reverse"
          >
            <RiHome8Line className="text-3xl text-green-600  dark:text-gray-700" size={20}/>
            <span className="self-center text-lg font-normal whitespace-nowrap text-white dark:text-gray-700">
              Hously
            </span>
          </a>
          <div className="flex flex-col items-start relative text-white w-full h-auto gap-8">
            <Button onClick={()=> setPage("dashboard")}
              className="flex flex-row items-center gap-4 cursor-pointer text-gray-300/60
                  active:text-white hover:text-white transition-colors duration-300"
            >
              <RxDashboard size={18} />
              <p className="text-sm font-medium  text-gray-300/60">Dashboard</p>
            </Button>
            <Button onClick={()=> setPage("explore")}
              className="flex flex-row items-center gap-4 cursor-pointer text-gray-300/60
                  active:text-white hover:text-white transition-colors duration-300"
            > 
              <MdOutlineAddHomeWork size={18} />
              <p className="text-sm font-medium text-gray-300/60">Explore Properties</p>
            </Button>
            <Button onClick={()=> setPage("featured")}
              className="flex flex-row items-center gap-4 cursor-pointer text-gray-300/60
                  active:text-white hover:text-white transition-colors duration-300"
            >
              <RiHomeHeartFill size={18} />
              <p className="text-sm font-medium text-gray-300/60">Featured Properties</p>
            </Button>
            <Button onClick={()=> setPage("favorite")}
              className="flex flex-row items-center gap-4 cursor-pointer text-gray-300/60
                  active:text-white hover:text-white transition-colors duration-300"
            >
              <RiHome9Fill size={18} />
              <p className="text-sm font-medium text-gray-300/60">Favorite Properties</p>
            </Button>
            <Button
            onClick={() => setPage("addProperty")}
              className="flex flex-row items-center gap-4 cursor-pointer text-gray-300/60
                  active:text-white hover:text-white transition-colors duration-300"
            >
              <MdOutlineAddHomeWork
                size={25}
                className="shadow rounded"
              />
              <p className="text-sm font-medium text-gray-300/60">Add Property</p>
            </Button>
            <Button
            onClick={() => setPage("profile")}
              className="flex flex-row items-center gap-4 cursor-pointer text-gray-300/60
                  active:text-white hover:text-white transition-colors duration-300"
            >
              <FaUserPen
                size={25}
                className="shadow rounded"
              />
              <p className="text-sm font-medium text-gray-300/60">User Profile</p>
            </Button>
            <Button
            onClick={() => setPage("notification")}
              className="flex flex-row items-center gap-4 cursor-pointer text-gray-500
                  active:text-white hover:text-white transition-colors duration-300"
            >
              <FaUserPen
                size={25}
                className="shadow rounded"
              />
              <p className="text-sm font-medium text-gray-300/60">Send Notification</p>
            </Button>
            <Button
            onClick={() => setPage("sold")}
              className="flex flex-row items-center gap-4 cursor-pointer text-gray-500
                  active:text-white hover:text-white transition-colors duration-300"
            >
              <FaUserPen
                size={25}
                className="shadow rounded"
              />
              <p className="text-sm font-medium text-gray-300/60">Sold Properties</p>
            </Button>
            <Button
            onClick={() => setPage("rent")}
              className="flex flex-row items-center gap-4 cursor-pointer text-gray-500
                  active:text-white hover:text-white transition-colors duration-300"
            >
              <FaUserPen
                size={25}
                className="shadow rounded"
              />
              <p className="text-sm font-medium text-gray-300/60">Rented Properties</p>
            </Button>
          </div>
        </aside>
        <section className="w-[80%] h-auto relative">
          <div className="w-full relative mx-auto">
            <div className="flex flex-row items-center justify-between shadow px-6 py-4 ">
              <div className="flex flex-row items-center gap-4">
                <IoReorderThreeOutline size={25} className="shadow" />
                   
                <form className="max-w-lg w-lg mx-auto">
                  <div className="relative flex flex-row items-center justify-center">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                      <svg
                        className="w-4 h-4 text-gray-500 dark:text-gray-400"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 20 20"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                         strokeWidth="2"
                          d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                        />
                      </svg>
                    </div>
                    <input
                      type="search"
                      id="default-search"
                      className="block w-full p-2 ps-10 text-sm text-gray-800 rounded-lg bg-white focus:border-none focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Search"
                      required
                    />
                    <button
                      type="submit"
                      className="text-white absolute right-0 rounded-r-lg bg-green-600 hover:bg-green-700 font-medium text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 cursor-pointer"
                    >
                      Search
                    </button>
                  </div>
                </form>
              </div>
              <div className="flex flex-row items-center gap-2">
            <Image
              src={"/images/india.png"}
              height={25}
              width={25}
              alt="india flag"
              className="shadow rounded cursor-pointer"
            />
            <IoMdNotificationsOutline size={25} className="shadow rounded cursor-pointer"/>
            <Image
              src={"/images/men.png"}
              height={25}
              width={25}
              alt="men"
              className="shadow rounded cursor-pointer"
            />
          </div>
            </div>
          </div>
         <div className="relative w-full h-auto px-6 py-6 bg-gray-300/20 overflow-scroll">
         <h1>{}</h1>
          {page === 'dashboard' && <Dashboard/>}
          {page === "addProperty" && <AddProperty />}
          {page === "explore" && <ExplorePrprty/>}
          {page === "favorite" && <FavoritePrprty/>}
          {page === "profile" && <AdProfile/>}
          {page === "featured" && <FeaturedPrprty/>}
          {page === "notification" && <NotificationSender/>}
          {page === "sold" && <ViewSold/>}
          {page === "rented" && <ViewRented/>}
         </div>

        </section>
      </div>
    </div>
  );
};

export default AdminDashboard;

"use client";
import React, { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Button from "../_component/Button";
import { CgUser } from "react-icons/cg";
import clsx from "clsx";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import NotificationBell from "../_component/NotificationBell";
import { logoutuser } from "@/redux/slices/userSlice";
import toast from "react-hot-toast";

interface navProps {
  color?: string;
  headColor?: string;
  hoverColor?: string;
  onScrollColor?: string;
  onScrollHover?: string;
}

const Navbar: React.FC<navProps> = ({
  color = "gray-400",
  headColor = "white",
  hoverColor = "white",
  onScrollColor = "third",
  onScrollHover = "first",
}) => {
  const router = useRouter();

  const [scrool, setScrool] = useState<boolean>(false);
  // get user if it is logged in
  const {user}= useSelector((state:RootState )=> state.user);

const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setScrool(true);
      } else {
        setScrool(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
    // eslint-disable-next-line
  }, []);

  const handleSignUp = useCallback((e:React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    router.push("/user/auth-login");
  },[router]);

  const handleLogout = useCallback((e:React.MouseEvent<HTMLButtonElement>)=>{
    e.preventDefault();
    try {
      dispatch(logoutuser()).unwrap();
    toast.success('Logged Out successfully');
    } catch (error:any) {
      toast.error(error);
    }
    
  },[dispatch])

  const handleUserDashboard = useCallback((e:React.MouseEvent<SVGElement>)=>{
      e.preventDefault();
      if(user && user?.success === true){
        router.push('/user/user-dashboard');
      }else{
        toast.error('You have to signUp/Login first');
      }

  },[router]);

  let small;
  if(typeof window !== 'undefined'){
     small = window.innerWidth < 800;

  }

  return (
    <>
      {!small ? (
        <nav
          className={clsx(`${
            scrool ? "bg-white" : "bg-transparent"
          } dark:bg-gray-900 fixed ${
            scrool ? "backdrop-blur-3xl" : "bg-transparent"
          }  w-full z-1000 top-0
           start-0  dark:border-gray-600 transition-all duration-300 ${
             scrool ? "shadow-md" : "shadow-none"
           }`)}
        >
          <div className="w-full flex flex-wrap items-center justify-between mx-auto py-4 inset-0 px-30">
            <a
              href="/"
              className="flex items-center justify-center gap-1 rtl:space-x-reverse"
            >
              <Image
                src={"/images/tree-house.png"}
                height={22}
                width={22}
                alt="logo"
                className="text-3xl text-green-700  dark:text-gray-700"
              />
              <span
                className={clsx(`self-center tracking-wide text-lg font-medium whitespace-nowrap dark:text-gray-700
                ${scrool ? `text-${onScrollColor}` : `text-${headColor}`}`)}
              >
                Hously
              </span>
            </a>
            <div className="order-1 flex flex-row items-center gap-10 justify-center">
              <div className="hidden md:flex md:w-auto">
                <ul className="relative flex flex-row space-x-10 text-sm font-medium">
                  {["Home", "Buy", "Sell", "Listing", "About", "Contact"].map(
                    (item) => {
                      return (
                        <li key={item}>
                          <a
                            href={`${item === 'Home' ? '/' :`/${item.toLowerCase()}`}`}
                            className={clsx(
                              "dark:text-gray-700 active:text-first",
                              scrool
                                ? `hover:text-${onScrollHover}`
                                : `hover:text-${hoverColor}`,
                              "dark:hover:text-green-600 cursor-pointer",
                              scrool
                                ? `text-${onScrollColor}`
                                : `text-${color}`,
                              "transition-colors duration-300"
                            )}
                          >
                            {item}
                          </a>
                        </li>
                      );
                    }
                  )}
                </ul>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <NotificationBell/>
                <CgUser
                onClick={handleUserDashboard}
                  size={34}
                  className="bg-first text-white rounded-full 
                      cursor-pointer hover:bg-green-700"
                />
                {user && user?.success ? ( <Button
                  onClick={handleLogout}
                  className="md:px-4 md:py-2 lg:px-5 lg:py-2 bg-green-600 rounded-full cursor-pointer
                hover:bg-green-700 
                text-white"
                >
                  Logout
                </Button>) : ( <Button
                  onClick={handleSignUp}
                  className="md:px-4 md:py-2 lg:px-5 lg:py-2 bg-green-600 rounded-full cursor-pointer
                hover:bg-green-700 
                text-white"
                >
                  Signup
                </Button>)}
               
              </div>
            </div>
          </div>
        </nav>
      ) : (
        <></>
      )}
    </>
  );
};

export default Navbar;

"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Button from "../_component/Button";
import clsx from "clsx";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { getNotification, logoutuser } from "@/redux/slices/userSlice";
import toast from "react-hot-toast";
import { FaDashcube } from "react-icons/fa6";
import Link from "next/link";

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
  const [hasNotification, setHasNotification] = useState<boolean>(true);
  const [scroll, setScroll] = useState<boolean>(false);
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);
  const { user } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const handleScroll = () => {
      setScroll(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [window.scrollY]);

  // handle signup logic
  const handleSignUp = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      router.push("/user/auth-login");
    },
    [router]
  );

  // handle logout logic
  const handleLogout = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      try {
        dispatch(logoutuser()).unwrap();
        toast.success("Logged Out successfully");
      } catch (error: any) {
        toast.error(error);
      }
    },
    [dispatch]
  );

  const handleUserDashboard = useCallback(
    (e: React.MouseEvent<SVGElement>) => {
      e.preventDefault();
      console.log(user?.success)
      if (user && user?.success === true) {
        router.push("/user/user-dashboard");
      } else {
        toast.error("You have to signUp/Login first");
      }
    },
    [router]
  );

  useEffect(() => {
    dispatch(getNotification())
      .unwrap()
      .then((res) => {
        if (res?.data?.length > 0) {
          setHasNotification(true);
        }
      });
  }, [dispatch]);

  return (
    <>
      <nav
        className={clsx(`hidden md:block scroll-smooth fixed top-0 left-0 max-w-screen w-full z-50
   ${scroll ? "bg-white" : "bg-transparent"}
           dark:bg-gray-900 fixed ${
             scroll ? "backdrop-blur-3xl" : "bg-transparent"
           }  w-full z-1000 top-0
           start-0  dark:border-gray-600 transition-all duration-300 ${
             scroll ? "shadow-md" : "shadow-none"
           }`)}
      >
        <div className="w-full flex flex-wrap items-center justify-between mx-auto py-4 inset-0 px-4 lg:px-30 xl:px-30">
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
                ${scroll ? `text-${onScrollColor}` : `text-${headColor}`}`)}
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
                          href={`${
                            item === "Home" ? "/" : `/${item.toLowerCase()}`
                          }`}
                          className={clsx(
                            "dark:text-gray-700 active:text-first",
                            scroll
                              ? `hover:text-${onScrollHover}`
                              : `hover:text-${hoverColor}`,
                            "dark:hover:text-green-600 cursor-pointer",
                            scroll ? `text-${onScrollColor}` : `text-${color}`,
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
              <FaDashcube
                onClick={handleUserDashboard}
                size={24}
                className=" text-first 
                      cursor-pointer hover:text-green-700"
              />
              {hasNotification && (
                <span className="absolute top-9 right-52 block h-2 w-2 rounded-full ring-2 ring-white bg-red-600 animate-pulse" />
              )}
              {user && user?.success ? (
                <Button
                  onClick={handleLogout}
                  className="md:px-4 md:py-2 lg:px-5 lg:py-2 bg-green-600 rounded-full cursor-pointer
                hover:bg-green-700 
                text-white"
                >
                  Logout
                </Button>
              ) : (
                <Button
                  onClick={handleSignUp}
                  className="md:px-4 md:py-2 lg:px-5 lg:py-2 bg-green-600 rounded-full cursor-pointer
                hover:bg-green-700 
                text-white"
                >
                  Signup
                </Button>
              )}
            </div>
          </div>
        </div>
      </nav>

      <nav
        className={clsx(`md:hidden fixed max-w-screen top-0 left-0 w-full z-50 px-4  py-4 bg-white
           start-0  dark:border-gray-600 transition-all duration-300 shadow-md backdrop-blur-3xl`)}
      >
        <div className="flex items-center justify-between">
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
                ${scroll ? `text-${onScrollColor}` : `text-${headColor}`}`)}
            >
              Hously
            </span>
          </a>
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
          >
            {mobileOpen ? (
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <div className="flex flex-row items-center gap-2">
                <Link
                  href={"/user/auth-login"}
                  className="md:px-4 md:py-2 lg:px-5 lg:py-2 underline cursor-pointer
                hover:bg-green-700 
                text-first"
                >
                  Signup
                </Link>
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>
              </div>
            )}
          </button>
        </div>

        {mobileOpen && (
          <div className="mt-3 space-y-1">
            {[
              "Dashboard",
              "Buy",
              "Sell",
              "listing",
              "About",
              "Contact",
            ].map((item) => (
              <a
                key={item}
                href={
                  item === "Dashboard"
                    ? "/user/user-dashboard"
                    : `/${item.toLowerCase()}`
                }
                className="block px-3 py-2 rounded-md text-base font-medium text-slate-400 hover:text-white hover:bg-gray-700"
              >
                {item}
              </a>
            ))}
            <button
              onClick={handleLogout}
              className="block w-full px-3 py-2 rounded-md text-base font-medium text-white bg-green-600 hover:bg-green-700"
              >
                Logout
              </button>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;

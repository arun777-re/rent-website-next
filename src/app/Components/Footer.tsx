"use client";

import React from "react";
import Button from "../_component/Button";
import { TbPhoneCalling } from "react-icons/tb";
import { CiLocationOn, CiMail} from "react-icons/ci";
import { IoCallOutline } from "react-icons/io5";
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
import { PiGreaterThanBold } from "react-icons/pi";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import Link  from "next/link";

const Footer = () => {
  const router = usePathname();

  const Handlecontact = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const redirect = useRouter();
    redirect.push('/contact')
  };
  return (
    <section className="relative max-w-screen w-full mx-auto ">
      <div className="relative w-full flex flex-col pt-5">
        <article
          className={`relative flex flex-col text-center gap-4 items-center justify-center px-4 sm:px-20 ${
            router === "/contact" ? "hidden" : "visible"
          }`}
        >
          <h3 className="font-medium mb-2">Have Questions ? Get in Touch!</h3>
          <p className="leading-loose w-full sm:w-[40vw] lg:w-[36vw]">
            A great plateform to buy and sell your properties without any agent
            or commisions.
          </p>
          <Button
            onClick={Handlecontact}
            className="py-2 px-4 bg-green-600 w-40 flex items-center
         text-white justify-center gap-2 rounded-md hover:bg-green-700 transition colors duration-150 cursor-pointer"
          >
            <TbPhoneCalling size={20} />
            &nbsp;Contact us
          </Button>
        </article>
        <div className="w-full mx-auto">
          <div className=" w-full h-auto mx-auto relative  mt-20 rounded-lg px-4 md:px-20 lg:px-[7.5rem]">
            <div className="relative p-4 sm:p-10 flex flex-col lg:flex-row gap-6 lg:gap-0 items-center justify-between shadow-2xl z-30 rounded-lg bg-white ">
              <article className="flex flex-col md:text-center">
                <h3 className="text-2xl font-medium text-gray-800">
                  Subscribe to our Newsletter!
                </h3>
                <p className="leading-loose tracking-wider">
                  Subscribe to get latest updates and information.
                </p>
              </article>
              <form
                action=""
                method="post"
                className="flex flex-col sm:flex-row items-center justify-center relative gap-4 w-full lg:w-[40%]"
              >
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Enter your email"
                  className="w-full
    h-10 px-4 border border-gray-400 rounded-full border-none placeholder:text-sm
    shadow focus:outline-none focus:border-green-600"
                />
                <Button
                  className="right-0 relative md:absolute py-2 px-6 bg-green-600  flex items-center
         text-white justify-center gap-2 rounded-full hover:bg-green-700 text-sm h-full
         transition colors duration-150 cursor-pointer"
                >
                  Subscribe
                </Button>
              </form>
            </div>
          </div>
        </div>

        <div className="absolute h-auto bg-black px-0 w-full z-0 top-[88%] text-gray-100/90">
          <div className="flex flex-col gap-20">
            <div className="max-w-screen w-full grid grid-cols-1 lg:grid-cols-4 px-4 md:px-20 lg:px-30 pt-30 gap-10 ">
              <div className="flex flex-col gap-5 items-start w-3/ justify-start">
                <Link
                  href="/"
                  className="flex items-center space-x-1 rtl:space-x-reverse"
                >
                  <Image
                    src={"/images/tree-house.png"}
                    height={20}
                    width={20}
                    alt="logo"
                    className="text-3xl text-green-700  dark:text-gray-700"
                  />
                  <span className="self-center text-base font-medium whitespace-nowrap tracking-widest text-white dark:text-white">
                    Hously
                  </span>
                </Link>
                <p className="text-sm text-space leading-loose text-gray-100/90 h-16 lg:h-20 tracking-wide">
                  A great plateform to buy and sell your properties without any
                  agent or commisions.
                </p>
              </div>
              <div className="flex flex-col gap-5 items-start w-3/ justify-start">
                <h4 className="font-medium tracking-widest leading-loose">Company</h4>
                <ul className="flex flex-col gap-3">
                  <li>
                    <Link
                      href="#"
                      className="text-sm hover:text-gray-100/70 tracking-wider cursor-pointer transition colors duration-350 ease-in-out flex gap-2 items-center-safe"
                    >
                      <PiGreaterThanBold /> About us
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="text-sm hover:text-gray-100/70 tracking-wider cursor-pointer transition colors duration-350 ease-in-out flex gap-2 items-center-safe"
                    >
                      <PiGreaterThanBold /> Services
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="text-sm hover:text-gray-100/70 tracking-wider cursor-pointer transition colors duration-350 ease-in-out flex gap-2 items-center-safe"
                    >
                      <PiGreaterThanBold /> Pricing
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="text-sm hover:text-gray-100/70 tracking-wider cursor-pointer transition colors duration-350 ease-in-out flex gap-2 items-center-safe"
                    >
                      <PiGreaterThanBold /> Blog
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="text-sm hover:text-gray-100/70 tracking-wider cursor-pointer transition colors duration-350 ease-in-out flex gap-2 items-center-safe"
                    >
                      <PiGreaterThanBold /> Login
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="flex flex-col gap-5 items-start w-3/ justify-start">
                <h4 className="font-normal tracking-widest leading-loose">Support</h4>
                <ul className="flex flex-col gap-3">
                  <li>
                    <Link
                      href="#"
                      className="text-sm hover:text-gray-100/70 tracking-wider cursor-pointer transition colors duration-350 ease-in-out flex gap-2 items-center-safe"
                    >
                      <PiGreaterThanBold />
                      Help Center
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="text-sm hover:text-gray-100/70 tracking-wider cursor-pointer transition colors duration-350 ease-in-out flex gap-2 items-center-safe"
                    >
                      <PiGreaterThanBold />
                      Terms of Service
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="text-sm tracking-wider hover:text-gray-100/70 cursor-pointer transition colors duration-350 ease-in-out flex gap-2 items-center-safe"
                    >
                      <PiGreaterThanBold />
                      Legal Notices
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="text-sm tracking-wider hover:text-gray-100/70 cursor-pointer transition colors duration-350 ease-in-out flex gap-2 items-center-safe"
                    >
                      <PiGreaterThanBold />
                      Security
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="flex flex-col gap-5 items-start w-3/ justify-start">
                <h4 className="font-normal tracking-widest leading-loose">Contact Details</h4>
                <ul className="flex flex-col gap-3">
                  <li className="flex flex-row items-center gap-2">
                    <CiLocationOn size={24} className="text-green-600" />
                    <span className="text-sm hover:text-gray-100/70 tracking-wider cursor-pointer transition colors duration-350 ease-in-out">
                      Sonipat, Haryana, India
                    </span>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="text-sm text-green-600 hover:text-green-800 pl-8 tracking-wider
                 cursor-pointer transition colors duration-350 ease-in-out"
                    >
                      View on Google map
                    </Link>
                  </li>
                  <li className="flex flex-row items-center gap-2">
                    <CiMail size={22} className="text-green-600" />
                    <span className="text-sm hover:text-gray-100/70 tracking-wider cursor-pointer transition colors duration-350 ease-in-out">
                      contact@example.com
                    </span>
                  </li>
                  <li className="flex flex-row items-center gap-2">
                    <IoCallOutline size={22} className="text-green-600" />
                    <span className="text-sm hover:text-gray-100/70 tracking-wider cursor-pointer transition colors duration-350 ease-in-out">
                      +152 534-468-854
                    </span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="w-full flex flex-col md:flex-row md:justify-between gap-6 md:gap-0 items-center px-4 md:px-20 lg:px-30 pb-5">
              <p className="text-gray-400 tracking-widest leading-loose text-center">
                © 2025 S.R Tech Solutions. All rights reserved.
              </p>
              <div  className="flex flex-row gap-5 items-center justify-center">
                <FaLinkedin size={20} className="text-white animate-pulse cursor-pointer" />
                <FaFacebook size={20} className="text-white animate-pulse cursor-pointer" />
                <FaInstagram size={20} className="text-white animate-pulse cursor-pointer" />
                <FaTwitter size={20} className="text-white animate-pulse cursor-pointer" />
                <FaInstagram size={20} className="text-white animate-pulse cursor-pointer" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Footer;

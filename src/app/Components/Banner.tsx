"use client";
import React, { useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { CiSearch } from "react-icons/ci";
import { StaticImageData } from "next/image";
import { IoMdPlayCircle } from "react-icons/io";
import { useRouter } from "next/navigation";

type ImageProps = string | StaticImageData;

interface BannerProps {
  heading?: string;
  subHeading?: string;
  image?: ImageProps;
}

const Banner: React.FC<BannerProps> = ({
  heading = "",
  subHeading = "",
  image,
}) => {
  const path = usePathname();
  const router = useRouter();
const [value,setValue] = useState<string>('');

  const handleSubmit = (e:React.FormEvent<HTMLFormElement>)=>{
e.preventDefault();
router.push(`/explore/${value}`);

  }

  return (
    <>
      {path === "/" ? (
        <>
          <div className="max-w-screen w-full relative mx-auto h-auto" >
            <div className="relative w-full mx-auto flex flex-col items-center justify-center pt-28 lg:pt-40 px-4 lg:px-30 xl:px-30 gap-12">
              <article className="relative z-10 flex flex-col items-center gap-5 justify-center h-full w-full text-center text-white">
                <h1 className="font-bold tracking-wider text-gray-800 leading-relaxed">
                  Are you ready to find Your Dream Home
                </h1>

                <p className="text-sm text-gray-700/60 w-full lg:w-130 font-medium tracking-wider leading-8">
                  A great platform to buy and sell your properties without any
                  agent or commisions.
                </p>
              </article>

              <div className="max-w-[100vw] w-full h-[88vh] mx-auto relative rounded-2xl flex items-start justify-center">
                <form className="w-full max-w-[50vw] relative z-20 drop-shadow-2xl" onSubmit={handleSubmit}>
                  <CiSearch
                    className="absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-900"
                    size={25}
                  />

                  <input
                    type="text"
                    placeholder="City, Address, Zip"
                    onChange={(e:React.ChangeEvent<HTMLInputElement>) =>setValue(e.target.value)}
                    value={value}
                    className="w-full px-12 py-3 pr-30 rounded-full bg-white text-gray-800
                        border border-gray-300 placeholder:text-sm
                    placeholder-gray-700/70 shadow-xl focus:outline-none placeholder:pl-6 placeholder:font-normal"
                  />

                  <button type='submit'
                    className="absolute right-0 top-1/2 transform -translate-y-1/2 px-6 py-3 bg-green-600 text-white 
         rounded-full flex items-center cursor-pointer hover:bg-green-800 transition duration-300 ease-in-out"
                  >
                    Search
                  </button>
                </form>

                <div className="absolute bottom-6 w-full inset-x-0 h-[80vh] bg-white rounded-lg shadow-md overflow-hidden">
                  <Image
                    src="/images/banner-main.jpg"
                    alt="Banner Image"
                    width={1000}
                    height={1000}
                    className="w-full h-full object-cover object-center rounded-lg"
                  />
                  <IoMdPlayCircle className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-full text-5xl cursor-pointer text-green-600" />
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <header
          className={`w-[100vw] h-[54vh] relative
            flex items-center justify-center
           overflow-hidden
               bg-cover bg-no-repeat bg-center object-center object-fill`}
          style={{
            backgroundImage: `url(${image})`,
            zIndex: 0,
          }}
        >
          <div className="absolute w-full h-full inset-0 bg-blend-overlay bg-black opacity-60 z-10"></div>
          <article className="relative translate-y-1/2 z-50">
            <h1 className="text-3xl font-semibold text-white tracking-loose">{heading}</h1>
            <p>{subHeading}</p>
          </article>
        </header>
      )}
    </>
  );
};

export default Banner;

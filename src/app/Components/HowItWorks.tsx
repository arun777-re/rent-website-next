"use client";
import React from "react";
import { AiOutlineHome } from "react-icons/ai";
import { PiHandbagBold } from "react-icons/pi";
import { LuKey } from "react-icons/lu";
import clsx from "clsx";


interface HowItW {
  paddingtop: boolean;
}

const works = [
  {
    icon: <AiOutlineHome className="text-4xl text-green-600 " size={40} />,
    heading: "Evaluate Property",
    desc: "If the distribution of letters and words is random, the reader will not be distracted from making.",
  },
  {
    icon: <PiHandbagBold className="text-4xl text-green-600 " size={40} />,
    heading: "Meeting with Agent",
    desc: "If the distribution of letters and words is random, the reader will not be distracted from making.",
  },
  {
    icon: <LuKey className="text-4xl text-green-600 " size={40} />,
    heading: "Close the Deal",
    desc: "If the distribution of letters and words is random, the reader will not be distracted from making.",
  },
];


const HowItWorks: React.FC<HowItW> = ({ paddingtop=false }) => {
    const forceTailwind = "pt-0 pt-20";

  return (
      
        <section className="relative max-w-screen w-full h-auto bg-white inset-0">
          <div
        className={clsx(
            "relative w-full flex flex-col items-center justify-center gap-6 md:gap-8 lg:gap-15 px-4 md:px-20 lg:px-30 xl:px-30 pb-16 lg:pb-20",
            {
              "pt-20": paddingtop, // Apply pt-20 if paddingtop is true
              "pt-0": !paddingtop, // Apply pt-0 if paddingtop is false
            }
          )}
          >
            <article className="flex flex-col items-center">
              <h3 className="">How It Works</h3>
              <p className=" w-full lg:w-140 text-center leading-loose tracking-wider">
                A great platform to buy and sell your properties without any
                agent or commisions.
              </p>
            </article>
            <div className="relative w-full flex-row flex items-center justify-between flex-wrap ">
              {works.map((item, index) => {
                return (
                  <figure
                    key={index}
                    className="flex flex-col items-center justify-center w-full  lg:w-65 xl:w-70 h-auto"
                  >
                    <div
                      className="w-25 h-25 bg-green-200/10 rounded-md flex items-center justify-center shadow-md"
                      style={{
                        clipPath:
                          "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
                      }}
                    >
                      {item?.icon}
                    </div>
                    <figcaption className="pt-5 text-center">
                      <h4 className="font-semibold pb-4">{item?.heading}</h4>
                      <p className="leading-loose ">{item?.desc}</p>
                    </figcaption>
                  </figure>
                );
              })}
            </div>
          </div>
        </section>
  );
};

export default HowItWorks;

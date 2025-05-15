'use client'
import React from 'react'
import { FiPhone, FiMail } from "react-icons/fi";
import { IoLocationOutline } from "react-icons/io5";


const works1 = [
  {
    icon: <FiPhone className="text-4xl text-green-600 " size={40} />,
    heading: "Phone",
    desc: "If the distribution of letters and words is random, the reader will not be distracted from making.",
    footer: "+132 434-456-789",
  },
  {
    icon: <FiMail className="text-4xl text-green-600 " size={40} />,
    heading: "Email",
    desc: "If the distribution of letters and words is random, the reader will not be distracted from making.",
    footer: "contact@example.com",
  },
  {
    icon: <IoLocationOutline className="text-4xl text-green-600 " size={40} />,
    heading: "Location",
    desc: "C/90 Northwest Freeway, Suite 557, Sonipat, Haryana.",
    footer: " View on Google map",
  },
];
const HowItWorks1 = () => {
  return (
    <section className="max-w-screen relative w-full h-auto bg-white pt-14 sm:pt-20 pb-20sm:pb-10">
    <div className="flex-row flex flex-wrap items-center justify-center sm:justify-between relative w-full gap-5 sm:gap-10 px-4 md:px-20 lg:px-30">
      {works1.map((item, index) => {
        return (
          <figure
            key={index}
            className="flex flex-col items-center justify-center w-65 h-auto"
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
              <h4 className="font-semibold pb-4 tracking-wide">{item?.heading}</h4>
              <p className="leading-loose pb-5 tracking-wide">{item?.desc}</p>
              <a className="text-sm text-first font-semibold tracking-wide ">
                {item?.footer}
              </a>
            </figcaption>
          </figure>
        );
      })}
    </div>
  </section>
  )
}

export default HowItWorks1
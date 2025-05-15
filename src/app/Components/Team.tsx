
'use client'
import Image from "next/image";
import React, { useEffect } from "react";
import AOS from 'aos';

const Team = () => {

  useEffect(()=>{
    AOS.refresh();
  },[])
  const teamData = [
    {
      name: "Arun Tyagi",
      designation: "Designer",
      image: "/images/team-1.jpg",
    },
    {
      name: "Arun Tyagi",
      designation: "Designer",
      image: "/images/team-2.jpg",
    },
    {
      name: "Arun Tyagi",
      designation: "Designer",
      image: "/images/team-5.jpg",
    },
    {
      name: "Arun Tyagi",
      designation: "Designer",
      image: "/images/tem-4.jpg",
    },
  ];

  return (
    <section className="max-w-screen w-full relative h-auto ">
      <div className="h-auto px-4 md:px-20 lg:px-30 py-20 flex flex-col gap-10 relative">
        <article className="flex flex-col items-center">
          <h3 className="">Meet The Agent Team</h3>
          <p className="text-gray-700/60 text-md leading-loose text-center tracking-wide">
            A great platform to buy and sell your properties without any agent
            or commisions.
          </p>
          <div className="w-full relative flex flex-row flex-wrap items-center justify-center sm:justify-between gap-10 pt-18">
            {teamData &&
              teamData.map((i, k) => {
                return (
                  <figure data-aos='zoom-out-up' key={k} className="relative flex flex-col
                   items-center justify-center 
                   hover:bg-blend-overlay cursor-pointer">
                    <Image
                      src={i?.image}
                      alt="team-member"
                      width={190}
                      height={190}
                      className="rounded-[50%] object-cover object-center aspect-square"
                    />
                    <figcaption className="pt-4 text-center">
                      <p className="font-semibold text-gray-800">{i?.name}</p>
                      <p>{i?.designation}</p>
                    </figcaption>
                  </figure>
                );
              })}
          </div>
        </article>
      </div>
    </section>
  );
};

export default Team;

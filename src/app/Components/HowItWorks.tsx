'use client';
import React from 'react';
import { AiOutlineHome } from "react-icons/ai";
import { PiHandbagBold } from "react-icons/pi";
import { LuKey } from "react-icons/lu";
import { usePathname } from "next/navigation";
import { FiPhone,FiMail } from "react-icons/fi";
import { IoLocationOutline } from "react-icons/io5";


const works = [
    {icon:<AiOutlineHome className='text-4xl text-green-600 ' size={40}/>,
        heading:'Evaluate Property',
        desc:"If the distribution of letters and words is random, the reader will not be distracted from making."},
    {icon:<PiHandbagBold className='text-4xl text-green-600 ' size={40}/>,
        heading:'Meeting with Agent',
        desc:"If the distribution of letters and words is random, the reader will not be distracted from making."},
    {icon:<LuKey className='text-4xl text-green-600 ' size={40}/>,
        heading:'Close the Deal',
        desc:"If the distribution of letters and words is random, the reader will not be distracted from making."},
]

const HowItWorks = () => {
  const router = usePathname();
  return (
    <>
    {router === '/contact' ? (
       <section className='max-w-screen-xl w-full h-auto bg-white pb-10 lg:pb-16'>
        
          <div className="flex-row flex items-center justify-between w-full gap-10 px-30">
           <figure className="flex flex-col items-center justify-center w-65 h-auto">
               <div className="w-25 h-25 bg-green-200/10 rounded-md flex items-center justify-center shadow-md"
                style={{clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)'}}>
                   <FiPhone className='text-4xl text-green-600 ' size={40}/>
               </div>
               <figcaption className="pt-5 text-center">
                   <h4 className="font-semibold pb-4">Phone</h4>
                   <p className="leading-loose pb-5">If the distribution of letters and words is 
                   random.</p>
                      <a className="text-sm text-first font-semibold ">
                    +132 434-456-789
                   </a>
               </figcaption>
           </figure>
           <figure className="flex flex-col items-center justify-center w-65 h-auto">
               <div className="w-25 h-25 bg-green-200/10 rounded-md flex items-center justify-center shadow-md"
                style={{clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)'}}>
                   <FiMail className='text-4xl text-green-600 ' size={40}/>
               </div>
               <figcaption className="pt-5 text-center">
                   <h4 className="font-semibold pb-4">Email</h4>
                   <p className="leading-loose pb-5">If the distribution of letters and words is 
                   random.</p>
                      <a className="text-sm text-first font-semibold ">
                    contact@example.com
                   </a>
               </figcaption>
           </figure>
           <figure className="flex flex-col items-center justify-center w-65 h-auto">
               <div className="w-25 h-25 bg-green-200/10 rounded-md flex items-center justify-center shadow-md"
                style={{clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)'}}>
                   <IoLocationOutline className='text-4xl text-green-600 ' size={40}/>
               </div>
               <figcaption className="pt-5 text-center">
                   <h4 className="font-semibold pb-4">Location</h4>
                   <p className="leading-loose pb-5">C/90 Northwest Freeway, Suite 557, Sonipat, Haryana.</p>
                   <a className="text-sm text-first font-semibold ">
                    View on Google map
                   </a>
               </figcaption>
           </figure>
       </div>
       
           </section>

    ):(
      <section className='max-w-screen-xl w-full h-auto bg-white '>
      <div className="flex flex-col items-center justify-center gap-6 md:gap-8 lg:gap-15 relative px-4 md:px-20 lg:px-30 xl:px-30 pb-16 lg:pb-20">
        <article className="flex flex-col items-center">
          <h3 className="">How It Works</h3>
          <p className=" w-full lg:w-140 text-center leading-loose tracking-wider">
            A great platform to buy and sell your properties without any agent or
            commisions.
          </p>
        </article>
         <div className="flex-row flex items-center justify-between flex-wrap w-full ">
            {works.map((item,index)=>{
                return (
                    <figure key={index} className="flex flex-col items-center justify-center w-full  lg:w-65 xl:w-70 h-auto">
                    <div className="w-25 h-25 bg-green-200/10 rounded-md flex items-center justify-center shadow-md"
                     style={{clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)'}}>
                        {item?.icon}
                    </div>
                    <figcaption className="pt-5 text-center">
                        <h4 className="font-semibold pb-4">{item?.heading}</h4>
                        <p className="leading-loose ">{item?.desc}</p>
                    </figcaption>
                </figure>
                )
            })}
        
         </div>
      </div>
      
          </section>
    )}
   
    </>

  )
}

export default HowItWorks
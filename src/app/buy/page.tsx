import React from 'react'
import Banner from '../Components/Banner'
import Navbar from '../Components/Navbar';
import { IoSearchOutline } from "react-icons/io5";
import PropertyCard from '../_component/PropertyCard';
import Footer from '../Components/Footer';
import HowItWorks from '../Components/HowItWorks';

const page = () => {

    const properties = [
        {
          image: "/images/banner-main.jpg",
          title: "Property for sale in Sonipat",
          price: "10M",
          rating: "5",
          rooms: "5",
          bathrooms: "3",
          area: "2000sqft",
        },
        {
          image: "/images/banner-main.jpg",
          title: "Property for sale in Sonipat",
          price: "10M",
          rating: "5",
          rooms: "5",
          bathrooms: "3",
          area: "2000sqft",
        },
        {
          image: "/images/banner-main-1.jpg",
          title: "Property for sale in Sonipat",
          price: "10M",
          rating: "5",
          rooms: "5",
          bathrooms: "3",
          area: "2000sqft",
        },
        {
          image: "/images/industrial.jpg",
          title: "Property for sale in Sonipat",
          price: "10M",
          rating: "5",
          rooms: "4",
          bathrooms: "3",
          area: "1000sqft",
        },
        {
          image: "/images/commercial.jpg",
          title: "Property for sale in Sonipat",
          price: "5M",
          rating: "5",
          rooms: "2",
          bathrooms: "1",
          area: "3000sqft",
        },
        {
          image: "/images/commercial.jpg",
          title: "Property for sale in Sonipat",
          price: "5M",
          rating: "5",
          rooms: "2",
          bathrooms: "1",
          area: "3000sqft",
        },
      ];

return (
    <div className="w-full h-auto relative mx-auto">
        <Navbar color='gray-400' hoverColor='white' headColor='white'/>
        <Banner heading='Find Your Dream Home' subHeading='' image={'/images/banner-buy.jpg'}/>
        <div className="flex w-full items-center justify-center mx-auto -mt-6">
          <form action="" className="flex flex-row items-center justify-center w-[55vw] relative z-20">
            <IoSearchOutline className='absolute left-4 text-gray-900' size={25}/>
            <input type="text" placeholder='Search by city, address, zip' 
            className='w-full px-10 py-3 pr-24 pl-12 rounded-lg bg-white text-gray-800 border
             border-gray-300 placeholder-gray-700 shadow-sm placeholder:text-sm
            focus:outline-none placeholder:pl-3 placeholder:font-normal'/>
            <button 
            className='absolute right-1 px-6 py-3 bg-green-600 text-white rounded-lg flex items-center cursor-pointer hover:bg-green-800 transition duration-300 ease-in-out'>Search</button>
          </form>
        </div>
        <div className="flex flex-col max-w-screen-xl w-full overflow-hidden relative mx-auto px-30">
            <article className="flex flex-col gap-0 items-center text-center pt-20">
        <h3 className="font-semibold  text-gray-800">
            Featured Properties
          </h3>
          <p className="max-w-md">
            A great platform to buy and sell your properties without any agent
            or commissions.
          </p>
        </article>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 grid-rows-auto gap-8 py-20 w-full h-auto">
        {properties.map((prprty, index) => {
                return (
                    <PropertyCard key={index} {...prprty} />
                );
              })}
        </div>
        </div>
        <HowItWorks/>
        <Footer/>
    </div>
)
}

export default page
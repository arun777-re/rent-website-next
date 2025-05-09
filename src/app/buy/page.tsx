"use client"
import React, { useEffect, useState } from 'react'
import Banner from '../Components/Banner'
import Navbar from '../Components/Navbar';
import { IoSearchOutline } from "react-icons/io5";
import PropertyCard from '../_component/PropertyCard';
import Footer from '../Components/Footer';
import HowItWorks from '../Components/HowItWorks';
import { getFeaturedProperty, getRecommendedProperties, PropertyItem } from '@/redux/slices/propertSlice';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/redux/store';
import PropertySkeleton from '../_component/PropertySkeleton';

const Buy = () => {

  const [properties,setProperties] = useState<PropertyItem[]>([]);

  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state:RootState)=>state.user.user);
  const isLogin = user?.success;
// when component loads then fetch api to get recommended properties
useEffect(() => {
  const fetchProperties = async () => {
    try {
      const res = isLogin
        ? await dispatch(getRecommendedProperties()).unwrap()
        : await dispatch(getFeaturedProperty()).unwrap();

      setProperties(res?.data || []);
    } catch (err) {
      console.error("Failed to fetch properties", err);
    }
  };

  fetchProperties();
}, [dispatch, isLogin]);


 

  // handling  fallback
  if (!properties || properties.length === 0) {
    return (
      <section className="max-w-[100vw] mx-auto h-auto relative">
      <div className="h-auto px-30 py-20 flex flex-col gap-10 relative">
        <article className="flex flex-col items-center">
          <h3 className="">
            Featured Properties
          </h3>
          <p className="text-gray-700/60 text-md">
            A great platform to buy and sell your properties without any agent
            or commisions.
          </p>
        </article>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(6)].map((_, index) => (
            <PropertySkeleton key={index} />
          ))}
        </div>
      </div>
    </section>
    );
  }
    

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

export default Buy;
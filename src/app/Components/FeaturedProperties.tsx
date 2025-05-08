'use client';

import React, { useEffect, useState } from "react";
import PropertCard from "../_component/PropertyCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { getFeaturedProperty, getRecommendedProperties, PropertyItem } from "@/redux/slices/propertSlice";
import PropertySkeleton from "../_component/PropertySkeleton";

const FeaturedProperties = () => {

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


  const autoplay = Autoplay({
    stopOnInteraction:false,
    delay: 2000,
    stopOnMouseEnter:true
  });

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
    <section className="max-w-screen-xl w-full mx-auto h-auto relative">
      <div className="h-auto w-full px-4 md:px-20 lg:px-30 pb-20 flex flex-col gap-10 relative">
        <article className="flex flex-col items-center">
          <h3 className="">
            Featured Properties
          </h3>
          <p className="text-gray-700/60 text-md">
            A great platform to buy and sell your properties without any agent
            or commisions.
          </p>
        </article>
        <div className="w-full">
          <Carousel className="w-full max-w-full" plugins={[autoplay]}>
            <CarouselContent className="-ml-0 pt-10 pb-6 flex flex-row gap-1">
              {properties && properties?.map((prprty) => {
                return (
                  <CarouselItem 
                    key={prprty._id}
                    className="pl-1 basis-1/1 sm:basis-1/2 md:basis-1/2 lg:basis-1/3"
                  >
                    <PropertCard {...prprty} />
                  </CarouselItem>
                );
              })}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProperties;

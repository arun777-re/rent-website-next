'use client';

import React, { useEffect } from "react";
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
import { getRecommendedProperties } from "@/redux/slices/propertSlice";

const FeaturedProperties = () => {
  const dispatch = useDispatch<AppDispatch>();

// when component loads then fetch api to get recommended properties
  useEffect(()=>{
  dispatch(getRecommendedProperties()).unwrap();
  },[dispatch])


  // getting recommended properties after api call
  const propertyState = useSelector((state:RootState)=>state.property.property);

  const properties = propertyState.data || [];

  const autoplay = Autoplay({
    stopOnInteraction:false,
    delay: 1000,
    stopOnMouseEnter:true
  });

  if(properties.length == 0){
    return <div className="max-w-[100vw] mx-auto h-auto relative text-center">
      <h4>  Loading...</h4>
    
      </div>
  }

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
        <div className="w-full">
          <Carousel className="w-full max-w-full" plugins={[autoplay]}>
            <CarouselContent className="-ml-0 py-10 flex flex-row gap-1">
              {properties && properties?.map((prprty) => {
                return (
                  <CarouselItem 
                    key={prprty._id}
                    className="pl-1 md:basis-1/2 lg:basis-1/3"
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

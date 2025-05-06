"use client"
import React,{useMemo} from 'react'
import TestimCard from '../_component/TestimCard'
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import Autoplay from "embla-carousel-autoplay";

const Testimonials = () => {
  const testimData = [
    {
      name: "Arun Tyagi",
      designation: "Designer",
      image: "/images/team-1.jpg",
      description:" My favorite part about selling my home myself was that we got to meet and get to know the people personally. This made it so much more enjoyable! "


    },
    {
      name: "Arun Tyagi",
      designation: "Designer",
      image: "/images/team-2.jpg",
      description:" My favorite part about selling my home myself was that we got to meet and get to know the people personally. This made it so much more enjoyable! "


    },
    {
      name: "Arun Tyagi",
      designation: "Designer",
      image: "/images/team-5.jpg",
      description:" My favorite part about selling my home myself was that we got to meet and get to know the people personally. This made it so much more enjoyable! "


    },
    {
      name: "Arun Tyagi",
      designation: "Designer",
      image: "/images/tem-4.jpg",
      description:"My favorite part about selling my home myself was that we got to meet and get to know the people personally. This made it so much more enjoyable! ",


    },
  ];

  const autoPlay = useMemo(()=>Autoplay({
    delay:2000,
    stopOnInteraction:false,
    stopOnMouseEnter:true
}),[]) 
  return (
     <section className="max-w-screen-xl w-full relative h-auto">
          <div className="h-auto px-30 py-20 flex flex-col gap-10 relative">
            <article className="flex flex-col items-center">
              <h3 className="">What Our Client Say ?</h3>
              <p className="text-gray-700/60 text-md">
                A great platform to buy and sell your properties without any agent
                or commisions.
              </p>
              <div className="w-full relative flex flex-row items-center justify-between pt-18">
                <Carousel plugins={[autoPlay]}>
               <CarouselContent>
                
                {testimData && testimData.map((i,k)=>{
                  return (
                <CarouselItem key={k} className='basis-1/3'>
                  <TestimCard {...i}
                  />
                </CarouselItem>
                  )
                })}
               </CarouselContent>

                </Carousel>

              </div>
            </article>
          </div>
        </section>
  )
}

export default Testimonials
"use client";
import Footer from "@/app/Components/Footer";
import Navbar from "@/app/Components/Navbar";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import React, { useEffect } from "react";
import { IoLocationOutline } from "react-icons/io5";
import { HiMiniArrowsPointingIn } from "react-icons/hi2";
import { LuBedSingle } from "react-icons/lu";
import { MdOutlineBathtub, MdPriceChange } from "react-icons/md";
import MapComponent from "@/app/Components/MapComponent";
import Button from '@/app/_component/Button';
import { LuPhone } from "react-icons/lu";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { createInteraction } from "@/redux/slices/userSlice";
import { getSingleProperty } from "@/redux/slices/propertSlice";
import { useParams } from "next/navigation";
 
// static data for images
const images = [
  { index: 1, image: "/images/prprty-1.jpg" },
  { index: 2, image: "/images/prprty-2.jpg" },
  { index: 3, image: "/images/prprty-3.jpg" },
  { index: 4, image: "/images/prprty-4.jpg" },
  { index: 5, image: "/images/prprty-5.jpg" },
];

const autoPlay = Autoplay({
    delay:2000,
    stopOnInteraction:false,
    stopOnMouseEnter:true
})
const PropertyDetails = () => {
const {slug} = useParams();

const dispatch = useDispatch<AppDispatch>();
const property = useSelector((state:RootState)=> state.property.property);

  // here we will dispatch thunk to get a property using slug
  useEffect(() => {
    dispatch(getSingleProperty(slug)).unwrap();
  }, []);

  // thunk to create user interaction
  const data = {
    type:'view',
    propertyId:property?._id
  }
  useEffect(() => {
    dispatch(createInteraction(data)).unwrap();
  }, [property]);
  return (
    <div>
      <Navbar />
    
    <section className="relative max-w-screen-xl w-full min-h-screen pt-20 px-30 pb-10">
  <div className="flex flex-col lg:flex-row gap-6">
    {/* LEFT: Property Details */}
    <div className="w-full lg:w-2/3 flex flex-col gap-5">
      <div className="h-[80vh] relative rounded-lg">
        <Carousel plugins={[autoPlay]}>
          <CarouselContent className="rounded-lg -ml-0">
            {images.map((i, k) => (
              <CarouselItem key={k} className="basis-full relative h-[78vh] rounded-lg">
                <Image
                  src={i.image}
                  alt="prprty-page"
                  fill
                  className="object-center object-fill rounded-lg"
                />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>

      <article className="items-start">
        <h3>4BHK Luxury Family Home</h3>
        <p className="flex items-center">
          <IoLocationOutline size={22} />
          &nbsp;108967 Jain Bag Colony, Delhi Road, Sonipat, Haryana, India
        </p>
      </article>

      {/* Features */}
      <div className="w-full flex flex-row justify-between items-center">
      <div className="w-[26rem] flex flex-row justify-between items-center">
                          <figure className="flex flex-row items-center justify-center gap-2">
                            <HiMiniArrowsPointingIn size={30} className="text-green-600" />
                            <figcaption className="text-gray-800 font-normal text-sm">
                              {/* {area} */}
                              <h4 className="text-lg">
                              4000sqf
                              </h4>
                            </figcaption>
                          </figure>
                          <figure className="flex flex-row items-center justify-center gap-2">
                            <LuBedSingle size={30} className="text-green-600" />
                            <figcaption className="text-gray-800 font-normal text-sm">
                              {/* {rooms}&nbsp;Beds */}
                              <h4 className="text-lg">
                              4 Beds
                              </h4>
                            </figcaption>
                          </figure>
                          <figure className="flex flex-row items-center justify-center gap-2">
                            <MdOutlineBathtub size={30} className="text-green-600" />
                            <figcaption className="text-gray-800 font-normal text-sm">
                              {/* {bathrooms}&nbsp;Bath */}
                              <h4 className="text-lg">
                              4 Baths
                              </h4>
                            </figcaption>
                          </figure>
                        </div>
      </div>

      {/* Description */}
      <article className="flex flex-col gap-2">
      <article className="flex items-start flex-col gap-2">
                            <p className="leading-loose">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Non tempore
                                 placeat quidem facilis voluptate?
                                 Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                                  Quos pariatur quidem at explicabo perspiciatis nulla. Rem, quod repudiandae?
                                  Lorem ipsum dolor sit amet. Facilis, quam itaque!</p>
                                  <p className="leading-loose">
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem, reprehenderit eum? Ipsam sapiente vel modi minima illo earum nostrum maiores facilis,
                                     quis nihil enim id culpa, perferendis dicta molestias natus!
                                  </p>
                                  <p className="leading-loose">
                                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Est esse consectetur laboriosam doloribus saepe in, reiciendis,
                                     ducimus veniam incidunt facilis optio possimus asperiores dolorum culpa nisi exercitationem assumenda?
                                  </p>
                        </article>
      </article>

      <MapComponent height="70vh" />
    </div>

    {/* RIGHT: Sticky Sidebar */}
    <div className="w-full lg:w-1/3 h-auto">
    <div className="sticky top-14 ">
             <div className="bg-gray-100/40 rounded-lg pb-4">
             <article className="p-6">
               <h4 className="text-xl">Price:</h4>
               <div className="pt-3 flex items-center justify-between">
                <h4 className="text-xl">
                    {/* {price} */}
                    Rs 1000000
                </h4>
                <Button className="p-2 bg-green-200/80 rounded text-first">
                    {/* {actual type} */}
                    For Sale</Button>
               </div>
               <div className="py-3 flex flex-col gap-2">
                <article className="flex flex-row items-center justify-between">
                    <p>Days on Plateform</p>
                    <p className="text-gray-800 text-xs">
                        {/* {created at} */}
                        120 Days
                    </p>
                </article>
                <article className="flex flex-row items-center justify-between">
                    <p>Price per sq ft</p>
                    <p className="text-gray-800 text-xs">
                        {/* {price/area} */}
                        Rs 10000
                    </p>
                </article>
                <article className="flex flex-row items-center justify-between">
                    <p>Monthly Pay (estimated)</p>
                    <p className="text-gray-800 text-xs">
                        {/* {total price/months} */}
                        Rs 10000/Monthly
                    </p>
                </article>
               </div>
              
             </article>
             <div className="flex flex-row items-center justify-between gap-2 px-2">
                <Button className="bg-first text-white px-9 py-2 text-sm font-semibold rounded-lg">Book Now</Button>
                <Button className="bg-first text-white px-9 py-2 text-sm font-semibold rounded-lg">Offer Now</Button>
                </div>
             </div>
             <article className="pt-8 flex flex-col gap-6 items-center justify-center">

             <h4 className="text-center font-semibold">Have Question ? Get in touch!</h4>
             <Button className="flex items-center justify-center gap-2 border border-first bg-white rounded-lg
              px-6 py-2 text-first font-semibold"><LuPhone size={16}/>Contact us</Button>
             </article>
             </div>

           </div>
  </div>
</section>

      <Footer />
    </div>
  );
};

export default PropertyDetails;

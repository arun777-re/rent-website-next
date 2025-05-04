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
import React, { useEffect, useState } from "react";
import { IoLocationOutline } from "react-icons/io5";
import { HiMiniArrowsPointingIn } from "react-icons/hi2";
import { LuBedSingle } from "react-icons/lu";
import { MdOutlineBathtub } from "react-icons/md";
import MapComponent from "@/app/Components/MapComponent";
import Button from "@/app/_component/Button";
import { LuPhone } from "react-icons/lu";
import { useDispatch} from "react-redux";
import { AppDispatch} from "@/redux/store";
import { addFavorate, createInteraction } from "@/redux/slices/userSlice";
import { getSingleProperty, PropertyItem } from "@/redux/slices/propertSlice";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";

const autoPlay = Autoplay({
  delay: 2000,
  stopOnInteraction: false,
  stopOnMouseEnter: true,
});
const PropertyDetails = () => {
  const [property, setProperty] = useState<PropertyItem | null>(null);
  const { slug } = useParams();
  const router = useRouter();

  const dispatch = useDispatch<AppDispatch>();
  // here we will dispatch thunk to get a property using slug
  useEffect(() => {
    if (typeof slug === "string") {
      dispatch(getSingleProperty(slug))
        .unwrap()
        .then((res) => {
          const data = res.data;
          setProperty(data);
        })
        .catch((err) => {});
    }
    // eslint-disable-next-line
  }, [dispatch,slug]);

  // thunk to create user interaction
  const data = {
    type: "view",
    propertyId: property?._id,
  };

  useEffect(() => {
    if (property?.title) {
      dispatch(createInteraction(data)).unwrap();
    }
    // eslint-disable-next-line
  }, [property,dispatch]);

  const createdAtDate = new Date(property?.createdAt ?? "");
  const now = new Date();

  const diffInMins = now.getTime() - createdAtDate.getTime();
  const daysOnPlatform = Math.floor(diffInMins / (1000 * 60 * 60 * 24));
  const propertyId = property?._id as string;

  const handleContact = (e: React.MouseEvent<HTMLButtonElement>) => {
    router.push("/contact");
  };

  const handleBook = (e: React.MouseEvent<HTMLButtonElement>) => {
    try {
      dispatch(addFavorate({propertyId:propertyId,type:"booking"}))
        .unwrap()
        .then((res) => {
          toast.success("Booking Confirmed");
        });
    } catch (error) {
      toast.error("Booking Not Confirmed");
    }
  };
  return (
    <>
      {property ? (
        <div>
          <Navbar />
          <section className="relative max-w-screen-xl w-full min-h-screen pt-20 px-30 pb-10">
            <div className="flex flex-col lg:flex-row gap-6">
              {/* LEFT: Property Details */}
              <div className="w-full lg:w-2/3 flex flex-col gap-5">
                <div className="h-[80vh] relative rounded-lg">
                  <Carousel plugins={[autoPlay]}>
                    <CarouselContent className="rounded-lg -ml-0">
                      {property?.images &&
                        property?.images?.length > 0 &&
                        property.images.map((i, k) => (
                          <CarouselItem
                            key={k}
                            className="basis-full relative h-[78vh] rounded-lg"
                          >
                            <Image
                              src={i}
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
                  <h3>{property?.title}</h3>
                  <p className="flex items-center">
                    <IoLocationOutline size={22} />
                    &nbsp;
                    {[
                      property?.address?.postalCode,
                      property?.address?.city,
                      property?.address?.state,
                      property?.address?.country,
                    ]
                      .filter(Boolean)
                      .join(", ")}
                  </p>
                </article>

                {/* Features */}
                <div className="w-full flex flex-row justify-between items-center">
                  <div className="w-[26rem] flex flex-row justify-between items-center">
                    <figure className="flex flex-row items-center justify-center gap-2">
                      <HiMiniArrowsPointingIn
                        size={30}
                        className="text-green-600"
                      />
                      <figcaption className="text-gray-800 font-normal text-sm">
                        {/* {area} */}
                        <h4 className="text-lg">{property?.area}sqft</h4>
                      </figcaption>
                    </figure>
                    <figure className="flex flex-row items-center justify-center gap-2">
                      <LuBedSingle size={30} className="text-green-600" />
                      <figcaption className="text-gray-800 font-normal text-sm">
                        {/* {rooms}&nbsp;Beds */}
                        <h4 className="text-lg">{property?.bedrooms}Beds</h4>
                      </figcaption>
                    </figure>
                    <figure className="flex flex-row items-center justify-center gap-2">
                      <MdOutlineBathtub size={30} className="text-green-600" />
                      <figcaption className="text-gray-800 font-normal text-sm">
                        {/* {bathrooms}&nbsp;Bath */}
                        <h4 className="text-lg">{property?.bathrooms}Baths</h4>
                      </figcaption>
                    </figure>
                  </div>
                </div>

                {/* Description */}
                <article className="flex flex-col gap-2">
                  <article className="flex items-start flex-col gap-2">
                    <p className="leading-loose">{property?.description}</p>
                  </article>
                </article>
                <MapComponent
                  height="70vh"
                  longitude={property?.location?.coordinates[1]}
                  latitude={property?.location?.coordinates?.[0]}
                />
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
                          Rs {property?.price}
                        </h4>
                        <Button className="p-2 bg-green-200/80 rounded text-first">
                          {/* {actual type} */}
                          For Sale
                        </Button>
                      </div>
                      <div className="py-3 flex flex-col gap-2">
                        <article className="flex flex-row items-center justify-between">
                          <p>Days on Plateform</p>
                          <p className="text-gray-800 text-xs">
                            {/* {created at} */}
                            {daysOnPlatform} Days
                          </p>
                        </article>
                        <article className="flex flex-row items-center justify-between">
                          <p>Price per sq ft</p>
                          <p className="text-gray-800 text-xs">
                            {/* {price/area} */}
                            Rs {Math.floor(property?.price / property?.area)}
                          </p>
                        </article>
                        <article className="flex flex-row items-center justify-between">
                          <p>Monthly Pay (estimated)</p>
                          <p className="text-gray-800 text-xs">
                            {/* {total price/months} */}
                            Rs {Math.floor(property?.price / 84)}/Monthly
                          </p>
                        </article>
                      </div>
                    </article>
                    <div className="flex flex-row items-center justify-between gap-2 px-2">
                      <Button
                        onClick={handleBook}
                        className="bg-first text-white px-9 py-2 text-sm font-semibold rounded-lg cursor-pointer"
                      >
                        Book Now
                      </Button>
                      <Button className="bg-first text-white px-9 py-2 text-sm font-semibold rounded-lg cursor-pointer">
                        Offer Now
                      </Button>
                    </div>
                  </div>
                  <article className="pt-8 flex flex-col gap-6 items-center justify-center">
                    <h4 className="text-center font-semibold ">
                      Have Question ? Get in touch!
                    </h4>
                    <Button
                      onClick={handleContact}
                      className="flex items-center justify-center gap-2 border border-first bg-white rounded-lg
                       px-6 py-2 text-first font-semibold  cursor-pointer"
                    >
                      <LuPhone size={16} />
                      Contact us
                    </Button>
                  </article>
                </div>
              </div>
            </div>
          </section>

          <Footer />
        </div>
      ) : (
        <div>
          <h4>Loading...</h4>
        </div>
      )}
    </>
  );
};

export default PropertyDetails;

"use client";
import { Card } from "@radix-ui/themes";
import Image from "next/image";
import React from "react";
import { FaStar } from "react-icons/fa";
import { HiMiniArrowsPointingIn } from "react-icons/hi2";
import { LuBedSingle } from "react-icons/lu";
import { MdOutlineBathtub } from "react-icons/md";
import { IoHeartCircle } from "react-icons/io5";
import clsx from "clsx";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { addFavorate, createInteraction } from "@/redux/slices/userSlice";
import { PropertyItem } from "@/redux/slices/propertSlice";

interface PropertyCardProps extends PropertyItem {
  width?: string | number;
}

const PropertyCard: React.FC<PropertyCardProps> = ({
  _id,
  images,
  title,
  area,
  bedrooms,
  bathrooms,
  price,
  slug,
}) => {
  const [active, setActive] = React.useState(false);
  const dispatch = useDispatch<AppDispatch>();

  const handleFavorate = (
    e: React.MouseEvent<HTMLButtonElement | SVGElement>
  ) => {
    e.stopPropagation(); // 🚫 prevent card click
    setActive((prev) => !prev);
    dispatch(addFavorate({ propertyId: _id, type: "liked" })).unwrap();
    dispatch(createInteraction({ type: "click", propertyId: _id })).unwrap();
  };

  return (
    <Card
      className={clsx("w-full sm:w-[100vw] md:w-full lg:w-[38vw] h-[224px] bg-white shadow hover:drop-shadow-2xl cursor-pointer transition-all duration-300 rounded-lg overflow-hidden"
      )}
    >
      <figure
        className={clsx(
          "flex",
          "flex-row",
          "items-center relative w-full h-full"
        )}
      >
        <div className="relative w-[40%] h-full overflow-hidden rounded-l-lg">
          <Image
            src={images?.[0] || "/images/banner-main-1.jpg"}
            alt="property image"
            fill
            className="object-fill object-center"
            priority
            unoptimized
          />
        </div>

        <figcaption className="w-[60%] h-full flex flex-col justify-between px-4 sm:px-6 py-4 space-y-4">
          <Link href={`/property-detail/${slug}`} className="block">
            <h4 className="font-medium text-base md:text-lg text-gray-900 tracking-wide hover:text-first cursor-pointer transition-colors duration-300 line-clamp-2">
              {title || "No title available"}
            </h4>
          </Link>

          <div className="border-t border-gray-300/40"></div>

          <div className="flex flex-row justify-between gap-3 py-2">
            <div className="flex items-center gap-1">
              <HiMiniArrowsPointingIn size={20} className="text-green-600" />
              <span className="text-sm text-gray-700 text-nowrap">{area}</span>
            </div>
            <div className="flex items-center gap-1">
              <LuBedSingle size={20} className="text-green-600" />
              <span className="text-sm text-gray-700 text-nowrap">{bedrooms} Beds</span>
            </div>
            <div className="flex items-center gap-1">
              <MdOutlineBathtub size={20} className="text-green-600" />
              <span className="text-sm text-gray-700 text-nowrap">{bathrooms} Bath</span>
            </div>
          </div>

          <div className="border-t border-gray-300/40"></div>

          <div className="flex justify-between items-end pt-2">
            <article>
              <h5 className="text-xs text-gray-500 font-medium">Price</h5>
              <p className="text-base font-semibold text-gray-800">{price}</p>
            </article>
            <article className="text-right">
              <h5 className="text-xs text-gray-500 font-medium">Rating</h5>
              <div className="flex items-center gap-1 text-yellow-500">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} size={14} />
                ))}
                <span className="text-sm text-gray-800 font-medium ml-1">
                  5
                </span>
              </div>
            </article>
          </div>
        </figcaption>

        <IoHeartCircle
          onClick={handleFavorate}
          aria-label={active ? "Remove from favorites" : "Add to favorites"}
          size={30}
          className={clsx(
            `absolute left-2 top-2 text-white ${
              active ? "bg-red-500/80" : "bg-gray-400"
            }`,
            "rounded-full hover:bg-red-400/60 cursor-pointer transition-colors duration-300"
          )}
        />
      </figure>
    </Card>
  );
};

export default PropertyCard;

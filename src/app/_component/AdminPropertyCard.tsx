"use client";
import { Card } from "@radix-ui/themes";
import Image from "next/image";
import React, { useCallback, useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { HiMiniArrowsPointingIn } from "react-icons/hi2";
import { LuBedSingle } from "react-icons/lu";
import { MdOutlineBathtub } from "react-icons/md";
import clsx from "clsx";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { PropertyItem } from "@/redux/slices/propertSlice";
import { changeStatus } from "@/redux/slices/adminSlice";
import toast from "react-hot-toast";

interface PropertyCardProps extends PropertyItem {
  direction?: string;
  width?: string;
  imageHeight?: string;
  imageWidth?: string;
  round?: boolean;
}

const AdminPropertyCard: React.FC<PropertyCardProps> = ({
  _id,
  images,
  title,
  area,
  bedrooms,
  bathrooms,
  price,
  slug,
  direction,
  width,
  imageHeight,
  imageWidth,
  round,
}) => {
  const [value, setValue] = useState<string>("");
  const dispatch = useDispatch<AppDispatch>();
  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (value) {
        dispatch(changeStatus({ status: value, propertyId: _id }))
          .unwrap()
          .then((res) => {
            toast.success("Status Changed");
            setValue("");
          })
          .catch((err) => {
            toast.error("Status change fatal");
            console.log(err);
          });
      }
    },
    [value]
  );

  return (
    <Card
      className={clsx(
        width ? `w-[${width}]` : "w-[24.9vw]",
        "h-auto bg-white shadow hover:shadow-xl cursor-pointer transition-all duration-300 rounded-lg overflow-hidden"
      )}
    >
      <figure
        className={clsx(
          "flex",
          direction ?? "flex-col",
          "items-center relative w-full h-auto"
        )}
      >
        <div
          className={clsx(
            "relative",
            imageWidth ?? "w-full",
            imageHeight ?? "h-[34vh]",
            "lg:h-[40vh] md:h-[30vh] sm:h-[25vh] ",
            round ? "xl:h-[33vh]" : "",
            "object-fill object-center",
            round ? "rounded-l-lg" : "rounded-t-lg"
          )}
        >
          <Image
            src={images?.[0] || "/images/banner-main-1.jpg"}
            alt="property image"
            fill
            className={clsx("top-0 bottom-0")}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority
          />
        </div>

        <figcaption
          className={`w-full flex flex-col items-start justify-start px-6 ${
            round ? "pt-4" : "pt-6"
          } 
          ${round ? "space-y-2" : "space-y-3"} flex-grow`}
        >
          <Link href={`/property-detail/${slug}`} className="relative">
            <h4 className="font-medium tracking-wide pb-4 hover:text-first cursor-pointer transition-colors duration-300">
              {title
                ? title.length > 45
                  ? `${title.slice(0, 45)}...`
                  : title
                : "No title available"}
            </h4>
          </Link>

          <div className="w-full h-[1px] bg-gray-400/40"></div>
          <div className="w-full flex flex-row justify-between items-center py-3">
            <figure className="flex flex-row items-center justify-center gap-2">
              <HiMiniArrowsPointingIn size={20} className="text-green-600" />
              <figcaption className="text-gray-800 font-normal text-sm">
                {area}
              </figcaption>
            </figure>
            <figure className="flex flex-row items-center justify-center gap-2">
              <LuBedSingle size={20} className="text-green-600" />
              <figcaption className="text-gray-800 font-normal text-sm">
                {bedrooms}&nbsp;Beds
              </figcaption>
            </figure>
            <figure className="flex flex-row items-center justify-center gap-2">
              <MdOutlineBathtub size={20} className="text-green-600" />
              <figcaption className="text-gray-800 font-normal text-sm">
                {bathrooms}&nbsp;Bath
              </figcaption>
            </figure>
          </div>

          <div className="w-full h-[1px] bg-gray-400/40"></div>
          <div className="w-full pt-3 flex flex-row items-center justify-between pb-5">
            <article className="flex flex-col items-start">
              <h5 className="text-gray-700/60 font-medium text-md">Price</h5>
              <p className="text-gray-800 font-semibold">{price}</p>
            </article>
            <article className="flex flex-col items-start">
              <h5 className="text-gray-700/60 font-medium text-md">Rating</h5>
              <div className="flex items-center justify-center gap-1 text-gray-800 font-semibold">
                <FaStar className="text-yellow-500" />
                <FaStar className="text-yellow-500" />
                <FaStar className="text-yellow-500" />
                <FaStar className="text-yellow-500" />
                <FaStar className="text-yellow-500" />
                <p>5</p>
              </div>
            </article>
          </div>
          <div className="w-full h-[1px] bg-gray-400/40"></div>
          <div className="relative w-full py-3">
            <form
              action=""
              className="flex flex-row gap-2 items-center"
              onSubmit={handleSubmit}
            >
              <select
                name="status"
                value={value}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                  setValue(e.target.value)
                }
                className="py-3 px-2 w-[73%] rounded-lg border border-blue-700/60 focus:outline-none text-sm"
              >
                <option value="" className="text-sm text-gray-800/60">
                  Change Status ...
                </option>
                <option value="sold">Sold</option>
                <option value="rented">Rented</option>
              </select>
              <button type="submit" className="py-4 px-4 bg-first rounded-lg">
                <p className="text-white font-semibold text-xs">Change</p>
              </button>
            </form>
          </div>
        </figcaption>
      </figure>
    </Card>
  );
};

export default AdminPropertyCard;

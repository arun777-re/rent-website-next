"use client";
import PropertyCard from "@/app/_component/PropertyCard";
import PropertySkeleton from "@/app/_component/PropertySkeleton";
import { getFavorate, PropertyItem } from "@/redux/slices/propertSlice";
import { AppDispatch } from "@/redux/store";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const ViewFavorate = () => {
  const [property, setProperty] = useState<PropertyItem[] | null>(null);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getFavorate())
      .unwrap()
      .then((res) => {
        if (res?.data) {
        setProperty(res?.data)
        } else {
          setProperty([]);
        }
      })
      .catch(() => setProperty([]));
  }, [dispatch]);

  return (
    <section className="relative w-full min-h-[80vh] hide-scrollbar">
      <h3 className="text-lg font-semibold mb-4">Favorated Properties</h3>
      <section className="w-full relative mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {property === null ? (
          Array(4)
            .fill(null)
            .map((_, k) => <PropertySkeleton key={k} />)
        ) : property.length > 0 ? (
          property.map((item, k) => <PropertyCard key={k} {...(item as any)?.propertyId} />)
        ) : (
          <p className="text-gray-500">No favorited properties found.</p>
        )}
      </section>
    </section>
  );
};

export default ViewFavorate;

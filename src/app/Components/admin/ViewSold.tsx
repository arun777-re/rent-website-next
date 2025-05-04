"use client"
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/redux/store';
import PropertyCard from '@/app/_component/PropertyCard';
import {getSoldProperties } from '@/redux/slices/propertSlice';
import { BiSolidSkipNextCircle,BiSolidSkipPreviousCircle } from "react-icons/bi";

const SoldPrprty: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  const dispatch = useDispatch<AppDispatch>();
  const { property } = useSelector((state: RootState) => state.property);

  const properties = property.data ?? [];
  const dataLength: number = property.dataLength ?? 0;
  const success: boolean = property.success ?? false;

  useEffect(() => {
    dispatch(getSoldProperties({ page: currentPage, limit: 12 }))
      .unwrap()
      .then((res) => {
        if (res?.totalPages) setTotalPages(res.totalPages);
      }).catch((err)=>{
        console.error('Error fetching featured properties',err)
      })
      // eslint-disable-next-line
  }, [dispatch, currentPage]);

  const handleNext = () => {
    if (currentPage < totalPages) {setCurrentPage((prev) => prev + 1)}else if(currentPage <= 0){
      setCurrentPage(1)
    };
  };

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  return (
    <section className="w-full min-h-screen relative space-y-4">
      <h4 className="text-xl font-semibold">Sold Properties</h4>

      <div className="flex flex-wrap gap-4 sticky overflow-y-scroll h-auto">
        {success && dataLength > 0 ? (
          properties.map((item) => (
            <PropertyCard key={item._id} {...item} />
          ))
        ) : (
          <p className="text-gray-600">No properties found.</p>
        )}
      </div>

      <div className="flex justify-center items-center gap-4 py-6">
        <button
          onClick={handlePrev}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50 cursor-pointer"
        >
          <BiSolidSkipPreviousCircle size={30}/>
        </button>
        <span className="font-medium">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50 cursor-pointer"
        >
          <BiSolidSkipNextCircle size={30}/>
        </button>
      </div>
    </section>
  );
};

export default SoldPrprty;

import AdminFavoritesCard from '@/app/_component/AdminFavorateCard';
import { AppDispatch, RootState } from '@/redux/store';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { BiSolidSkipNextCircle,BiSolidSkipPreviousCircle } from "react-icons/bi";
import { getAdminFavorate } from '@/redux/slices/cardSlice';

const FavoritePrprty = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(()=>{
    dispatch(getAdminFavorate({page:currentPage,limit:10})).unwrap().then((res)=>{
      const pages = res?.totalPages;
      setTotalPages(pages)
    }).catch((err)=>{
      throw new Error(err)
    })
     // eslint-disable-next-line
  },[dispatch,currentPage]);
  
  
    const { cardData } = useSelector((state: RootState) => state.card);
  
    const properties = cardData.data ?? [];
    const dataLength: number = cardData.dataLength ?? 0;
    const success: boolean = cardData.success ?? false;
  
  
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
    <h4 className="text-xl font-semibold">Favorate Properties</h4>

    <div className="flex flex-wrap gap-4 sticky overflow-y-scroll h-auto">
      {success && dataLength > 0 ? (
        properties.map((item,index) => (
          <AdminFavoritesCard item={item} key={index}/>
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
  )
}

export default FavoritePrprty
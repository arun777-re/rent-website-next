"use client";
import React, { useCallback, useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import Banner from "../Components/Banner";
import Footer from "../Components/Footer";
import Button from "../_component/Button";
import { IoSearchOutline } from "react-icons/io5";
import { IoHomeOutline } from "react-icons/io5";
import { FaIndianRupeeSign, FaRupeeSign } from "react-icons/fa6";
import ListingCard from "../_component/ListingCard";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import {
  getavailableProperties,
  getPropertyByAdvanceSearch,
  PropertyItem,
} from "@/redux/slices/propertSlice";
import {
  BiSolidSkipPreviousCircle,
  BiSolidSkipNextCircle,
} from "react-icons/bi";
import { Formik, FormikHelpers } from "formik";
import PropertySkeleton from "../_component/PropertySkeleton";

export interface FormValues {
  title: string;
  category: string;
  price: number;
  location: string;
}

const initialValues: FormValues = {
  title: "",
  category: "",
  price:0,
  location: "",
};

// here api will be fetched based on the search query one is from home page and other is from same page
const ListingPage = () => {
  const [propertyBySearch, setPropertyBySearch] = useState<PropertyItem[]>([]);
  const [properties, setProperties] = useState<PropertyItem[]>([]);
  const [totalPages, setTotalPages] = useState<number>(1);
  const dispatch = useDispatch<AppDispatch>();
  const [currentPage, setCurrentPage] = React.useState(1);
  const [limit] = React.useState(10);
  const [isSearch, setIsSearch] = useState<boolean>(false);
  // number of items per page

  // when component loads then fetch api to get available properties here
  useEffect(() => {
    dispatch(getavailableProperties({ page: currentPage, limit }))
      .unwrap()
      .then((res) => {
        setProperties(res?.data);
        setTotalPages(res?.totalPages);
      });
  }, [dispatch, currentPage, limit]);

  const handleOnSubmit = useCallback(
    async (
      values: typeof initialValues,
      { resetForm }: FormikHelpers<FormValues>
    ) => {
      try {
        const formData: {
          title?: string;
          price?:number;
          category?: string;
          location?: string;
        } = {};
        if (values) {
          if (values.title) formData.title = values.title;
          if (values.location) formData.location = values.location;
          if (values.price) formData.price = values.price;
          if (values.category) formData.category = values.category;
          setIsSearch(true);
          await dispatch(
            getPropertyByAdvanceSearch({
              ...formData,
              page: currentPage,
              limit: limit,
            })
          )
            .unwrap()
            .then((res) => {
              const data = res?.data;
              setPropertyBySearch(data);
              setTotalPages(res?.totalPages);
            });
        }
        resetForm();
      } catch (error) {
        console.error("Error submitting form:", error);
      }
    },
    [dispatch]
  );

  return (
    <div className="mx-auto w-full h-auto flex flex-col items-center inset-0 overflow-x-hidden hide-scrollbar">
      <Navbar color="gray-400" />
      <Banner heading="List View Layout" image={"/images/prprty-2.jpg"} />
      <section className="max-w-screen-xl relative w-full h-auto">
        <div className="relative px-30 z-0">
          <Formik initialValues={initialValues} onSubmit={handleOnSubmit}>
            {({
              values,
              errors,
              handleSubmit,
              handleBlur,
              handleChange,
              isSubmitting,
              isValid,
              dirty,
            }) => (
              <form
                onSubmit={handleSubmit}
                method="post"
                className="w-full px-5 py-5 z-3000 shadow-lg rounded-lg space-y-6 -mt-14 bg-white"
              >
                <div className="w-full relative flex flex-row gap-4 basis-1/4">
                  <article className="relative flex flex-col gap-2">
                    <label
                      htmlFor="search-input"
                      className="text-base font-medium"
                    >
                      Search:
                    </label>
                    <div className="relative w-full flex items-center">
                      <IoSearchOutline size={20} className="mr-2 text-first" />
                      <input
                        id="search-input"
                        type="text"
                        placeholder="Search your Keywords"
                        name="title"
                        className="placeholder:text-xs bg-gray-100/40 py-3 pl-8 w-full"
                        value={values.title}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </div>
                  </article>

                  <article className="relative flex flex-col gap-2">
                    <label
                      htmlFor="category-select"
                      className="text-base font-medium"
                    >
                      Select Categories:
                    </label>
                    <div className="relative w-full flex items-center">
                      <IoHomeOutline size={20} className="mr-2 text-first" />
                      <select
                        id="category-select"
                        className="text-xs bg-gray-100/40 py-3.5 px-14 w-full"
                        name="category"
                        value={values.category}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      >
                        <option value="">Select...</option>
                        <option value="plot">Plots</option>
                        <option value="apartment">Apartment</option>
                        <option value="offices">Offices</option>
                        <option value="villa">Villa</option>
                      </select>
                    </div>
                  </article>

                  <article className="relative flex flex-col gap-2">
                    <label
                      htmlFor="price-range"
                      className="text-base font-medium"
                    >
                      Select Price Range:
                    </label>
                    <div className="relative w-full flex items-center">
                      <FaIndianRupeeSign
                        size={20}
                        className="mr-2 text-first"
                      />
                      <input
                        id="price-range"
                        type="number"
                        placeholder="Search Price Range"
                        className="placeholder:text-xs bg-gray-100/40 py-3 pl-8 w-full"
                        name="price"
                        value={values.price}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </div>
                  </article>

                  <article className="relative flex flex-col gap-2">
                    <label htmlFor="location" className="text-base font-medium">
                      Location:
                    </label>
                    <div className="relative w-full flex items-center">
                      <FaIndianRupeeSign
                        size={20}
                        className="mr-2 text-first"
                      />
                      <input
                        id="location"
                        type="text"
                        placeholder="Search by Location"
                        className="placeholder:text-xs bg-gray-100/40 py-3 pl-8 w-full"
                        name="location"
                        value={values.location}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </div>
                  </article>
                </div>

                <Button
                  type="submit"
                  disabled={!isValid || !dirty || isSubmitting}
                  className="bg-first py-3 px-6 md:px-10 text-white font-semibold cursor-pointer"
                >
                  Search
                </Button>
              </form>
            )}
          </Formik>
        </div>
      </section>
      <section className="relative py-20 max-w-screen-xl w-full">
        <div className="flex flex-row flex-wrap items-center justify-center sm:px-6 md:px-8 lg:px-10 xl:px-16 gap-4 lg:gap-10">
          {properties.length === 0 && propertyBySearch.length === 0 ? (
            <section className="max-w-[100vw] mx-auto h-auto relative">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[...Array(6)].map((_, index) => (
                  <PropertySkeleton key={index} />
                ))}
              </div>
            </section>
          ) : (
            (isSearch ? propertyBySearch : properties).map((i, k) => {
              return <ListingCard key={k} {...i} />;
            })
          )}
        </div>
      </section>
      {/* Pagination Controls */}
      <div className="flex justify-center items-center gap-4 mb-10">
        <Button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          className=" text-white"
        >
          <BiSolidSkipPreviousCircle
            size={30}
            className="text-first cursor-pointer"
          />
        </Button>
        <span className="text-sm font-semibold">
          Page {currentPage} of {totalPages}
        </span>
        <Button
          disabled={currentPage === totalPages}
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          className=" text-white "
        >
          <BiSolidSkipNextCircle
            size={30}
            className="text-first cursor-pointer"
          />
        </Button>
      </div>
      <Footer />
    </div>
  );
};

export default ListingPage;

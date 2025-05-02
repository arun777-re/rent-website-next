"use client";
import React, { useCallback, useEffect, useState } from "react";
import Navbar from "@/app/Components/Navbar";
import Banner from "@/app/Components/Banner";
import Footer from "@/app/Components/Footer";
import Button from "@/app/_component/Button";
import { FaSearch } from "react-icons/fa";
import { IoSearchOutline } from "react-icons/io5";
import { IoHomeOutline } from "react-icons/io5";
import { FaIndianRupeeSign, FaRupeeSign } from "react-icons/fa6";
import PropertyCard from "@/app/_component/PropertyCard";
import { useParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import {
  getPropertyByAdvanceSearch,
  getPropertyByHome,
  PropertyItem,
} from "@/redux/slices/propertSlice";
import { FormValues } from "@/app/listing/page";
import { FormikHelpers, Formik } from "formik";

const initialValues: FormValues = {
  title: "",
  category: "",
  price: "",
  location: "",
};

// here api will be fetched based on the search query one is from home page and other is from same page
const ListingByHomeSearch = () => {
  const [isSearch, setIsSearch] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [limit] = React.useState(10); // number of items per page

  const { location } = useParams();
  const dispatch = useDispatch<AppDispatch>();

  const safeLocation = typeof location === "string" ? location : "";

  useEffect(() => {
    if (location) {
      dispatch(
        getPropertyByHome({ location: safeLocation, page: currentPage, limit })
      ).unwrap();
    }
  }, [location, currentPage]);

  const { property } = useSelector((state: RootState) => state.property);
  const totalPages = property?.totalPages ?? 1;
  const properties = property?.data || [];

  const handleOnSubmit = useCallback(
    async (
      values: typeof initialValues,
      { resetForm }: FormikHelpers<FormValues>
    ) => {
      try {
        const formData = new FormData();
        if (values) {
          formData.append("title", values.title);
          formData.append("category", values.category);
          formData.append("price", values.price);
          formData.append("location", values.location);
          setIsSearch(true);
          await dispatch(getPropertyByAdvanceSearch(formData)).unwrap();
        }
        resetForm();
      } catch (error) {
        console.error("Error submitting form:", error);
      }
    },
    [dispatch]
  );

  // get properties when search
  const propertyBySearch = property.data || [];

  if (properties.length == 0 || (isSearch && propertyBySearch.length === 0)) {
    return (
      <div className="max-w-[100vw] mx-auto h-auto relative text-center">
        <h4> Loading...</h4>
      </div>
    );
  }

  return (
    <>
      <Navbar color="gray-400" />
      <Banner heading="List View Layout" image={"/images/prprty-2.jpg"} />
      <section className="max-w-screen-xl relative w-full h-auto">
        <div className="relative px-30 z-0">
          <Formik initialValues={initialValues} onSubmit={handleOnSubmit}>
            {({ values, errors, handleSubmit, handleBlur, handleChange }) => (
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
                        value={values.category}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      >
                        <option value="">Select...</option>
                        <option value="industrial">Industrial</option>
                        <option value="apartment">Apartment</option>
                        <option value="offices">Offices</option>
                        <option value="townhome">TownHome</option>
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
                        type="text"
                        placeholder="Search Price Range"
                        className="placeholder:text-xs bg-gray-100/40 py-3 pl-8 w-full"
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
                        value={values.location}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </div>
                  </article>
                </div>

                <Button className="bg-first py-3 px-6 md:px-10 text-white font-semibold">
                  Search
                </Button>
              </form>
            )}
          </Formik>
        </div>
      </section>
      <section className="relative py-20 max-w-screen-xl w-full">
        {properties && properties.length === 0 ? (
          <p className="text-center text-gray-500 font-semibold">
            No properties found for this location.
          </p>
        ) : (
          <div className="grid grid-cols-1 grid-rows-auto lg:grid-cols-2 gap-4 px-30 xl:px-30 md:px-16">
            {(isSearch ? propertyBySearch : properties).map((i, k) => {
              return (
                <PropertyCard
                  key={k}
                  {...i}
                  direction="flex-row"
                  width="45%"
                  imageWidth="w-[44%]"
                  round={true}
                />
              );
            })}
          </div>
        )}
      </section>
      {/* Pagination Controls */}
      <div className="flex justify-center items-center gap-4 mt-10">
        <Button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          className="bg-first text-white px-4 py-2"
        >
          Previous
        </Button>
        <span className="text-sm font-semibold">
          Page {currentPage} of {totalPages}
        </span>
        <Button
          disabled={currentPage === totalPages}
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          className="bg-first text-white px-4 py-2"
        >
          Next
        </Button>
      </div>
      <Footer />
    </>
  );
};

export default ListingByHomeSearch;

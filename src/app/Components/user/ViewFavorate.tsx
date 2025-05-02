"use client";
import { getFavorate } from "@/redux/slices/propertSlice";
import { AppDispatch, RootState } from "@/redux/store";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const ViewFavorate = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getFavorate()).unwrap();
  }, [dispatch]);

  const { property } = useSelector((state: RootState) => state.property);

  return (
    <section className="relative w-full min-h-[80vh]">
      <h1>hello favorate properties are</h1>
    </section>
  );
};

export default ViewFavorate;

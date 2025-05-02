import React from "react";
import { Formik } from "formik";
import PropertyForm from "./PropertyForm";

const AddProperty = () => {
  return (
    <div className="w-full h-auto">
      <h2 className="text-lg font-semibold text-gray-800 px-10">Add Property</h2>
      <div className="w-full relative h-auto py-8">
        <PropertyForm />
      </div>
    </div>
  );
};

export default AddProperty;

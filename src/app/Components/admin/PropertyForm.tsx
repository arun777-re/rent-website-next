"use client";
import React, { useState } from "react";
import { Formik} from "formik";
import * as yup from "yup";
import LocationPicker from "./LocationPicker"; // Should call setCoordinates
import { useDispatch, useSelector } from "react-redux";
import { createProperty } from "@/redux/slices/propertSlice";
import { AppDispatch, RootState } from "@/redux/store";
import Dropzone from "react-dropzone";
import toast from "react-hot-toast";
interface Address {
  city: string;
  state: string;
  country: string;
  postalCode: string;
}

interface Owner {
  name: string;
  phone: string;
  email: string;
  address: string;
}



interface FormValues {
  title: string;
  description: string;
  price: string;
  category: string;
  bedrooms: string;
  bathrooms: string;
  area: string;
  images: never[];
  amenities: never[];
  featured: boolean;
  status: string;
  location: { coordinates: number[]; type: string };
  address: Address;
  owner: Owner
}


const initialValues:FormValues = {
  title: "",
  description: "",
  price: "",
  category: "",
  bedrooms: "",
  bathrooms: "",
  area: "",
  images: [],
  amenities: [],
  featured: false,
  status: "available",
  location: {
    coordinates: [],
    type: "Point",
  },
  address: {
    city: "",
    state: "",
    country: "",
    postalCode: "",
  },
  owner: {
    name: "",
    phone: "",
    email: "",
    address: "",
  },
};

const validationSchema = yup.object().shape({
  title: yup.string().required("Required"),
  description: yup.string().required("Required"),
  price: yup.number().typeError("Must be a number").required("Required"),
  category: yup.string().required("Required"),
  bedrooms: yup.number(),
  bathrooms: yup.number(),
  area: yup.number().required("Required"),
  images: yup.array().min(1, "At least one image is required"),
  amenities: yup.array().min(1, "Add at least one amenity"),
  featured: yup.boolean(),
  status: yup.string().oneOf(["available", "sold", "rented"]),
  location: yup.object().shape({
    coordinates: yup.array().of(yup.number()).length(2),
    type: yup.string().oneOf(["Point"]),
  }),
  address: yup.object().shape({
    city: yup.string().required("Required"),
    state: yup.string().required("Required"),
    country: yup.string().required("Required"),
    postalCode: yup.string().required("Required"),
  }),
  owner: yup.object().shape({
    name: yup.string().required("Required"),
    phone: yup.string().required("Required"),
    email: yup.string().required("Required"),
    address: yup.string(),
  }),
});



const PropertyForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [amenityInput, setAmenityInput] = useState("");

  const {error,loading} = useSelector((state:RootState)=>state.property)


  const handleSubmit = async (values: any, { resetForm }: any) => {
    const formData = new FormData();
    for (const key in values) {
      if (key === "images") {
        values.images.forEach((file: File) => formData.append("images", file));
      } else if (key === "amenities") {
        values.amenities.forEach((item: string) =>
          formData.append("amenities", item)
        );
      } else if (typeof values[key] === "object") {
        formData.append(key, JSON.stringify(values[key]));
      } else {
        formData.append(key, values[key]);
      }
    }

    try {
      const res = await dispatch(createProperty(formData)).unwrap();
      toast.success(res.message || "Property created successfully");
      resetForm();
    } catch (err: any) {
      toast.error(err?.[0] || "Property Creation Failed");
    }
  };


  return (
    <div className="p-10 max-w-4xl mx-auto bg-white shadow-lg rounded-lg">
      <Formik
        initialValues={initialValues}
        enableReinitialize={true} 
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          setFieldValue,
        }) => {
          console.log("Current Formik Values: ", values)

          return (
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-5">

            {/* Basic Inputs */}
            {[
              { name: "title", placeholder: "Property Title" },
              { name: "description", placeholder: "Description" },
              { name: "price", placeholder: "Price", type: "number" },
              { name: "category", placeholder: "Category" },
              { name: "bedrooms", placeholder: "Bedrooms", type: "number" },
              { name: "bathrooms", placeholder: "Bathrooms", type: "number" },
              { name: "area", placeholder: "Area (sq ft)", type: "number" },
            ].map((field) => (
              <div key={field.name}>
                <input
                  type={field.type || "text"}
                  name={field.name}
                  placeholder={field.placeholder}
                  value={(values as any)[field.name]}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="w-full px-4 py-2 border rounded"
                />
                {(errors as any)[field.name] && (touched as any)[field.name] && (
                  <div className="text-red-500 text-sm">{(errors as any)[field.name]}</div>
                )}
              </div>
            ))}

            {/* Address */}
      
                <input
                  name={'city'}
                  placeholder={'City'}
                  value={values.address.city}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="w-full px-4 py-2 border rounded"
                />
                {errors.address?.city && touched.address?.city && (
                  <div className="text-red-500 text-sm">{errors.address.city}</div>
                )}
      
                <input
                  name={'country'}
                  placeholder={'country'}
                  value={values.address.country}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="w-full px-4 py-2 border rounded"
                />
                {errors.address?.country && touched.address?.country && (
                  <div className="text-red-500 text-sm">{errors.address.country}</div>
                )}
      
                <input
                  name={'state'}
                  placeholder={'state'}
                  value={values.address.state}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="w-full px-4 py-2 border rounded"
                />
                {errors.address?.state && touched.address?.state && (
                  <div className="text-red-500 text-sm">{errors.address.state}</div>
                )}
      
                <input
                  name={'postalCode'}
                  placeholder={'postalCode'}
                  value={values.address.postalCode}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="w-full px-4 py-2 border rounded"
                />
                {errors.address?.postalCode && touched.address?.postalCode && (
                  <div className="text-red-500 text-sm">{errors.address.postalCode}</div>
                )}

            {/* Owner Info */}
            {["name", "phone", "email", "address"].map((key) => (
              <div key={key}>
                <input
                  name={`owner.${key}`}
                  placeholder={`Owner ${key}`}
                  value={values.owner[key as keyof Owner]}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="w-full px-4 py-2 border rounded"
                />
                {errors.owner?.[key as keyof Owner] && touched.owner?.[key as keyof Owner] && (
                  <div className="text-red-500 text-sm">{errors.owner[key as keyof Owner]}</div>
                )}
              </div>
            ))}

            {/* Amenities */}
            <div className="col-span-full">
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  placeholder="Add Amenity"
                  value={amenityInput}
                  onChange={(e) => setAmenityInput(e.target.value)}
                  className="flex-grow px-3 py-2 border rounded"
                />
                <button
                  type="button"
                  onClick={() => {
                    if (amenityInput.trim()) {
                      setFieldValue("amenities", [...values.amenities, amenityInput.trim()]);
                      setAmenityInput("");
                    }
                  }}
                  className="px-4 py-2 bg-blue-500 text-white rounded"
                >
                  Add
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {values.amenities.map((item, idx) => (
                  <span key={idx} className="bg-gray-200 px-3 py-1 rounded-full text-sm">
                    {item}
                  </span>
                ))}
              </div>
              {errors.amenities && touched.amenities && (
                <div className="text-red-500 text-sm mt-1">{errors.amenities}</div>
              )}
            </div>

            {/* Dropzone */}
            <div className="col-span-full">
              <Dropzone
                onDrop={(acceptedFiles) =>
                  setFieldValue("images", [...values.images, ...acceptedFiles])
                }
              >
                {({ getRootProps, getInputProps }) => (
                  <div
                    {...getRootProps()}
                    className="border-dashed border-2 border-gray-400 p-6 text-center rounded-lg cursor-pointer"
                  >
                    <input {...getInputProps()} />
                    <p className="text-gray-500">Drag and drop images here, or click to select</p>
                    {values.images.length > 0 && (
                      <p className="mt-2 text-sm text-green-600">
                        {values.images.length} image(s) selected
                      </p>
                    )}
                  </div>
                )}
              </Dropzone>
              {errors.images && touched.images && (
                <div className="text-red-500 text-sm mt-1">{errors.images}</div>
              )}
            </div>

            {/* Status and Featured */}
            <div>
              <select
                name="status"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.status}
                className="w-full px-4 py-2 border rounded"
              >
                <option value="">Select Status</option>
                <option value="available">Available</option>
                <option value="rented">Rented</option>
                <option value="sold">Sold</option>
              </select>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                name="featured"
                checked={values.featured}
                onChange={(e) => setFieldValue("featured", e.target.checked)}
              />
              <label>Featured Property</label>
            </div>

            {/* Location Picker */}
            <div className="col-span-full">
              <LocationPicker
               setFieldValue={setFieldValue}
              />
              {errors.location?.coordinates && (
                <div className="text-red-500 text-sm">
                  {errors.location.coordinates as string}
                </div>
              )}
            </div>

            {/* Submit Button */}
            <div className="col-span-full mt-6">
              <button
                type="submit"
                className="w-full bg-green-600 text-white py-3 rounded hover:bg-green-700"
              >
                Create Property
              </button>
            </div>
          </form>
          )
       
        }}
      </Formik>
    </div>
  );
};

export default PropertyForm;


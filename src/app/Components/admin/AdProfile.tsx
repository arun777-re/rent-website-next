"use client";

import { DataProps } from "@/redux/slices/adminSlice";
import { RootState } from "@/redux/store";
import React from "react";
import { useSelector } from "react-redux";

const AdProfile = () => {
  const data = useSelector((state: RootState) => state.admin.admin);
  const admin = data.data ?? ({} as DataProps);

  return (
    <section className="w-full max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6 mt-10">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Admin Profile</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700">
        <div>
          <p className="text-sm text-gray-500">Full Name</p>
          <h4 className="text-lg font-medium">{admin?.name}</h4>
        </div>

        <div>
          <p className="text-sm text-gray-500">Email</p>
          <h4 className="text-lg font-medium">{admin.email}</h4>
        </div>

        <div>
          <p className="text-sm text-gray-500">Phone Number</p>
          <h4 className="text-lg font-medium">{admin.phone}</h4>
        </div>

        <div>
          <p className="text-sm text-gray-500">Agency Name</p>
          <h4 className="text-lg font-medium">{admin.agencyName}</h4>
        </div>

        <div>
          <p className="text-sm text-gray-500">Agency Address</p>
          <h4 className="text-lg font-medium">{admin.agencyAddress}</h4>
        </div>

        <div>
          <p className="text-sm text-gray-500">License Number</p>
          <h4 className="text-lg font-medium">{admin.licenseNumber}</h4>
        </div>

        <div>
          <p className="text-sm text-gray-500">Main Admin</p>
          <h4 className="text-lg font-medium">
            {admin.isMainAdmin ? "Yes" : "No"}
          </h4>
        </div>

        <div>
          <p className="text-sm text-gray-500">Account Created</p>
          <h4 className="text-lg font-medium">
            {new Date(admin.createdAt).toLocaleDateString()}
          </h4>
        </div>
      </div>
    </section>
  );
};

export default AdProfile;

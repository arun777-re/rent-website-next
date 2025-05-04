'use client'
import AdminPropertyCard from '@/app/_component/AdminPropertyCard';
import { PropertyItem } from '@/redux/slices/propertSlice';
import React from 'react';

interface Properties {
  properties?: PropertyItem[]; 
  ownerName?:string;
}

const ViewProperty: React.FC<Properties> = ({ properties,ownerName }) => {
  return (
    <section className="w-full min-h-screen relative space-y-4">
      <h4 className="text-xl font-semibold">Property By Owner&nbsp;{ownerName}</h4>

      <div className="flex flex-wrap gap-4 sticky overflow-y-scroll h-auto">
        {properties && properties.length > 0 ? (
          properties.map((item) => (
            <AdminPropertyCard {...item} key={item._id} />  
          ))
        ) : (
          <p className="text-gray-600">No properties found.</p>
        )}
      </div>
    </section>
  );
};

export default ViewProperty;

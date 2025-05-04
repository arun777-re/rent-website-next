import React from "react";
import { FavoriteItem } from "@/redux/slices/cardSlice"; // adjust the import path as needed

interface AdminFavoriteCardProps {
  item: FavoriteItem;
}

const AdminFavoriteCard: React.FC<AdminFavoriteCardProps> = ({ item }) => {
  const {
    propertyId,
    userId,
    createdAt
  } = item;

  return (
    <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-md border border-gray-100">
      <h2 className="text-xl font-semibold text-gray-800 mb-2">{propertyId.slug}</h2>
      
      <p className="text-gray-700 mb-1">
        <strong>Price:</strong> ${propertyId.price.toLocaleString()}
      </p>

      <p className="text-gray-700 mb-1">
        <strong>Location:</strong> {propertyId.address.city}, {propertyId.address.state}, {propertyId.address.country}
      </p>

      <div className="mt-4 border-t pt-3">
        <h3 className="font-semibold text-gray-800 mb-1">Favorited By:</h3>
        <p className="text-gray-700"><strong>Name:</strong> {userId.firstName} {userId.lastName}</p>
        <p className="text-gray-700"><strong>Email:</strong> {userId.email}</p>
        <p className="text-gray-700"><strong>Phone:</strong> {userId.phone}</p>
      </div>

      <div className="mt-4 text-sm text-gray-500">
        <p>Favorited on: {new Date(createdAt).toLocaleDateString()}</p>
      </div>
    </div>
  );
};

export default AdminFavoriteCard;

"use client";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import { useEffect, useState } from "react";
import axios from "axios";
import L from "leaflet";
import "leaflet/dist/leaflet.css";


const markerIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const LocationPicker = ({ setFieldValue }: { setFieldValue: (field: string, value: any) => void }) => {
  const [position, setPosition] = useState<[number, number]>([28.6139, 77.209]); // default: Delhi

  const LocationMarker = () => {
    useMapEvents({
      click(e:any) {
        const lat = e.latlng.lat;
        const lng = e.latlng.lng;

        setPosition([lat, lng]);

        setFieldValue("latitude", lat);
        setFieldValue("longitude", lng);

        // Reverse Geocoding using Nominatim
        axios
          .get("https://nominatim.openstreetmap.org/reverse", {
            params: {
              format: "jsonv2",
              lat,
              lon: lng,
            },
          })
          .then((res) => {
            const addressData = res.data.address;
        const address = {
          city: addressData.city || addressData.town || addressData.village,
          country: addressData.country,
          state: addressData.state,
          postalCode: addressData.postcode,
        };

        // Update Formik fields
        setFieldValue('location.coordinates', [lat, lng]);
        setFieldValue('address', address);
          })
          .catch((err) => {
            console.error("Error during reverse geocoding", err);
          });
      },
    });

    return <Marker position={position} icon={markerIcon} />;
  };

  return (
    <div className="w-full h-[400px] rounded overflow-hidden">

    <MapContainer
      center={position}
      zoom={13}
      scrollWheelZoom={true}
      style={{ height: "400px", width: "100%", zIndex: 10 }}
    >
      <TileLayer
        attribution='© <a href="https://osm.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <LocationMarker />
    </MapContainer>
    </div>

  );
};

export default LocationPicker;

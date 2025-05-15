'use client'
import React from 'react';
import 'leaflet/dist/leaflet.css';
import dynamic from 'next/dynamic';
import L from 'leaflet'

const MapContainer = dynamic(() => import('react-leaflet').then(mod => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import('react-leaflet').then(mod => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import('react-leaflet').then(mod => mod.Marker), { ssr: false });
const Popup = dynamic(() => import('react-leaflet').then(mod => mod.Popup), { ssr: false });

interface locationProps {
  latitude?:number;
  longitude?:number;
  height?:string
}


const MapComponent:React.FC<locationProps> = ({
  latitude,
  longitude,
  height
}) => {
    const markerIcon = new L.Icon({
        iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
        iconSize: [25, 41],
        iconAnchor: [12, 41],
      });
  return (
    <section className="contact-us-map" style={{ width: '100%'
      ,height:height ? height :'60vh'
    }}>
      <MapContainer style={{ height: '100%', width: '100%' }} center={[latitude ?? 28.877383, longitude ?? 76.913158]} zoom={16}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[latitude? latitude : 28.877383,longitude ? longitude : 76.913158]} icon={markerIcon}>
          <Popup>
            Office Location
          </Popup>
        </Marker>
      </MapContainer>
    </section>
  );
}

export default MapComponent;

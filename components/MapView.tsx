'use client';

import React from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import L from 'leaflet';

interface MapViewProps {
  lat: number;
  lng: number;
  accentColor: string;
}

function makeMarkerIcon(accentColor: string) {
  return L.divIcon({
    className: '',
    html: `
      <div style="
        width: 28px; height: 34px;
        display: flex; align-items: center; justify-content: center;
        filter: drop-shadow(0 2px 4px rgba(0,0,0,0.25));
      ">
        <svg width="28" height="34" viewBox="0 0 28 34" xmlns="http://www.w3.org/2000/svg">
          <path d="M14 2 C 6 2 2 8 2 14 C 2 22 14 32 14 32 C 14 32 26 22 26 14 C 26 8 22 2 14 2 z" fill="${accentColor}" />
          <circle cx="14" cy="13" r="4" fill="#fff" />
        </svg>
      </div>
    `,
    iconSize: [28, 34],
    iconAnchor: [14, 34],
  });
}

export default function MapView({ lat, lng, accentColor }: MapViewProps) {
  const icon = makeMarkerIcon(accentColor);

  return (
    <MapContainer
      center={[lat, lng]}
      zoom={16}
      scrollWheelZoom={false}
      style={{ width: '100%', height: '100%' }}
      zoomControl={false}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      />
      <Marker position={[lat, lng]} icon={icon} />
    </MapContainer>
  );
}

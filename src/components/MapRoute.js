import React, { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine";

export default function MapRoute({ userCoords, destCoords }) {
  const mapRef = useRef(null);

  useEffect(() => {
    if (!userCoords || !destCoords) return;

    // create map if not exists
    if (!mapRef.current) {
      mapRef.current = L.map("map-route", { zoomControl: true }).setView(userCoords, 7);
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(mapRef.current);
    } else {
      mapRef.current.setView(userCoords, 7);
    }

    // remove existing routing controls if any
    if (mapRef.current._routingControl) {
      mapRef.current.removeControl(mapRef.current._routingControl);
    }

    const control = L.Routing.control({
      waypoints: [
        L.latLng(userCoords[0], userCoords[1]),
        L.latLng(destCoords[0], destCoords[1])
      ],
      show: true,
      routeWhileDragging: false,
      lineOptions: { styles: [{ color: "#0073e6", weight: 5 }] },
    }).addTo(mapRef.current);

    mapRef.current._routingControl = control;

    return () => {
      if (mapRef.current && mapRef.current._routingControl) {
        mapRef.current.removeControl(mapRef.current._routingControl);
        mapRef.current._routingControl = null;
      }
    };
  }, [userCoords, destCoords]);

  return <div id="map-route" style={{ height: "360px", width: "100%" }} />;
}

import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";

interface DataPoint {
  latitude: number;
  longitude: number;
}

const Map: React.FC = () => {
  const [data, setData] = useState<DataPoint[]>([]);

  useEffect(() => {
    // Fetch your JSON data here and update the state
    fetch("../../data/stops_lat_and_long.json")
      .then((response) => response.json())
      .then((jsonData: DataPoint[]) => {
        console.log(jsonData)
        setData(jsonData);
      }) 
      .catch((error) => {
        console.error("Error fetching JSON data:", error);
      });
  }, []);

  return (
    <div id="map" style={{ height: "100%", width: "100%" }}>
      <MapContainer
        center={[40.7128, -74.006]}
        zoom={13}
        style={{ height: "100vh", width: "100vw" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright%22%3EOpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Plot the points on the map */}
        {data.map((point, index) => (
          <Marker
            key={index}
            position={[point.latitude, point.longitude]}
            // Add additional marker options or popup information if needed
          />
        ))}
      </MapContainer>
    </div>
  );
};




export default Map;
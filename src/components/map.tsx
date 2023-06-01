import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Polyline, Marker } from "react-leaflet";
import outputData from './output.json'

interface DataPoint {
  latitude: number;
  longitude: number;
}



const Map: React.FC = () => {
  const [data, setData] = useState<DataPoint[]>([]);
  
  const blackOptions = {color: 'black'}
  
  const multiPolyline = outputData.map(item => 
    item.coordinates.map(coord => [coord.latitude, coord.longitude]))
    console.log(multiPolyline)

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
        <Polyline pathOptions={blackOptions} positions={multiPolyline}/>
      </MapContainer>
    </div>
  );
};




export default Map;



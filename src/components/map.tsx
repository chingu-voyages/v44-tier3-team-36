import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Polyline, Marker } from "react-leaflet";
import stationsData from "./stations_and_coordinates.json";
import outputData from "./output.json";
import SideBar from "./sidebar";
import NavBar from "./navbar";

interface DataPoint {
  stopName: string;
  lines: string[];
  latitude: number;
  longitude: number;
}

interface Shape {
  shape_id: string;
  coordinates: {
    latitude: number;
    longitude: number;
  }[];
}

const Map: React.FC = () => {
  const [data, setData] = useState<DataPoint[]>([]);
  const [selectedLine, setSelectedLine] = useState<string | null>(null);

  const blackOptions = { color: "black" };
  // const specificShapeId = "1";

  useEffect(() => {
    // Fetch your JSON data here and update the state
    fetch("../../data/stations_and_coordinates.json")
      .then((response) => response.json())
      .then((jsonData: DataPoint[]) => {
        console.log(jsonData);
        setData(jsonData);
      })
      .catch((error) => {
        console.error("Error fetching JSON data:", error);
      });
  }, []);

  return (
    <div>
      <NavBar />
      <div className="flex">
        <SideBar
          stationsData={stationsData}
          selectedLine={selectedLine}
          setSelectedLine={setSelectedLine}
        />
        <div id="map" className="flex-grow">
          <MapContainer
            center={[40.7128, -74.006]}
            zoom={13}
            style={{ height: "100vh" }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright%22%3EOpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {/* Plot the points on the map */}
            {/* Selected line is the line clicked on the sidebar, so if its the same as any of the points.lines it'll render */}
            {data.map((point, index) => {
              if (selectedLine && point.lines.includes(selectedLine)) {
                return (
                  <Marker
                    key={index}
                    position={[point.latitude, point.longitude]}
                  />
                );
              }
              return null;
            })}

            {/* Create separate polylines for each shape_id */}
            {/* Same as above it'll show the line of the selectedline if its equal to its shape_id */}

            {outputData.map((shape: Shape) => {
              if (shape.shape_id === selectedLine) {
                return (
                  <Polyline
                    key={shape.shape_id}
                    pathOptions={blackOptions}
                    positions={shape.coordinates.map((coord) => [
                      coord.latitude,
                      coord.longitude,
                    ])}
                  />
                );
              }
              return null; // Will not render any other lines after
            })}
          </MapContainer>
        </div>
      </div>
    </div>
  );
};

export default Map;
import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Polyline, Marker } from "react-leaflet";
import stopsData from "@assets/data/stops.json";
import shapeData from "@assets/data/shapes.json";
import SideBar from "$lib/SideBar/SideBar.tsx";
interface DataPoint {
  stopId: string;
  stopName: string;
  latitude: number;
  longitude: number;
}

interface Shape {
  lon: number;
  lat: number;
}

const Map: React.FC = () => {
  const [data, setData] = useState<DataPoint[]>([]);
  const [selectedLine, setSelectedLine] = useState<string | null>(null);

  const blackOptions = { color: "black" };
  // const specificShapeId = "1";

  useEffect(() => {
    setData(stopsData);
  }, []);

  return (
    <div className="container_ flex h-full w-full overflow-hidden">
      {/* <!-- We disable the overflow to hide any weird things from happening to the document (such as the sidebar causing the page to lift up like crazy shit)--> */}

      <div
        id="sidebar"
        className="sidebar inline h-full max-w-sm overflow-y-auto"
      >
        <SideBar
          stopsData={stopsData}
          selectedLine={selectedLine}
          setSelectedLine={setSelectedLine}
        />
        {/* <!-- Instead, we allow scrolling here to take place in the child instead of the parent  --> */}
      </div>
      <main id="_Map" className="h-full w-full bg-green-300">
        <MapContainer
          center={[40.7128, -74.006]}
          zoom={13}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            attribution={`&copy;<a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a>,
              &copy;<a href="https://carto.com/attributions" target="_blank">CARTO</a>`}
            url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
          />

          {/* Plot the points on the map */}
          {/* Selected line is the line clicked on the sidebar, so if its the same as any of the points.lines it'll render */}
          {Object.keys(stopsData).map((point) => {
            // console.log(stopsData[point], index);
            if (selectedLine && point == selectedLine) {
              return stopsData[point].map((coord, index) => {
                // console.log(coord.latitude, coord.longitude);
                return (
                  <Marker
                    key={index}
                    position={[
                      parseFloat(coord.latitude) || 0,
                      parseFloat(coord.longitude) || 0,
                    ]}
                  />
                );
              });
            }
            return null;
          })}
          {/* Create separate polylines for each shape_id */}
          {/* Same as above it'll show the line of the selectedline if its equal to its shape_id */}
          {Object.keys(shapeData).map((shape: Shape) => {
            // console.log(shapeData[shape]);
            if (shape === selectedLine) {
              return (
                <Polyline
                  key={shape}
                  pathOptions={blackOptions}
                  positions={shapeData[shape].map((coord) => [
                    coord.lat,
                    coord.lon,
                  ])}
                />
              );
            }
            return null; // Will not render any other lines after
          })}
        </MapContainer>
      </main>
    </div>
  );
};

export default Map;

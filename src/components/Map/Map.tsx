import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Polyline, Marker } from "react-leaflet";
import stationsData from "$lib/stations_and_coordinates.json";
import outputData from "$lib/output.json";
import SideBar from "$lib/SideBar/SideBar.tsx";
import * as d3 from "d3";
// let Route: any[] = [];
// // Streetmap logic
// // initialize the map on the "map" div with a given center and zoom
// async function fetchMap() {
//   const data = await d3
//     .csv(
//       'https://gist.githubusercontent.com/AlexDev404/716394419cee4119f710bbd1c19a7158/raw/shapes.csv'
//     )
//     .then((data) => {
//       const grouped_data = d3.group(data, (d) => d.shape_id);

//       let longestArray = null;
//       let maxLength = 0;

//       for (const [key, value] of grouped_data) {
//         if (value.length > maxLength) {
//           longestArray = value;
//           maxLength = value.length;
//         }
//       }

//       // console.log('Longest Array:', longestArray);
//       longestArray?.forEach((row) => {
//         const Lat = row.shape_pt_lat;
//         const Lon = row.shape_pt_lon;
//         // console.log('shape_pt_lat:', Lat);
//         // console.log('shape_pt_lon:', Lon);
//         Route.push([Lat, Lon]);
//       });
//     });
// }
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
    <div className="container_ flex h-full w-full overflow-hidden">
      {/* <!-- We disable the overflow to hide any weird things from happening to the document (such as the sidebar causing the page to lift up like crazy shit)--> */}

      <div
        id="sidebar"
        className="sidebar inline h-full max-w-sm overflow-y-auto"
      >
        <SideBar
          stationsData={stationsData}
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
      </main>
    </div>
  );
};

export default Map;

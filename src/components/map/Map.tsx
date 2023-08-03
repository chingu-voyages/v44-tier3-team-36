import { MapContainer, TileLayer, Marker, Tooltip } from "react-leaflet";
import Pathway from "./Pathway";
import stopsData from "../data/stations.json";
import L from "leaflet";
import "./Map.css";
import GetIconForTrain from "./GetIconForTrain";
import { useState, useEffect } from "react";

function Map({ selectedLine }: { selectedLine: string }) {
  const position = [40.7128, -74.006];
  const [trainLocations, setTrainLocations] = useState({});

  const URL = `http://localhost:5000/api/v1/trains`;
  //selectedLine gets passed to Pathway

  //link to get coordinates of train location, the backend is hosted here
  //this link will be used to render markers of where the train is along the trains pathway
  //https://gatekeeper.up.railway.app/MTATRACKER/api/v1/trains

  // const url = "http://localhost:8080/api/v1/trains";

  useEffect(() => {
    const fetchTrainLocations = () => {
      fetch(URL)
        .then((response) => response.json())
        // .then((data) => setTrainLocations(data.positions))
        .then((data) => setTrainLocations(data.positions))
        .catch((error) => {
          console.error("Error:", error);
        });
    };
    //updates every 15 seconds

    fetchTrainLocations();

    const timer = setInterval(fetchTrainLocations, 30000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex-grow">
      <MapContainer
        center={position}
        zoom={13}
        style={{ height: "100vh" }}
        zoomControl={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {selectedLine && (
          <div>
            {Object.entries(stopsData[selectedLine].stops).map(
              ([stopName, stopData]) => (
                <Marker
                  key={stopName}
                  position={stopData.coordinates}
                  icon={whiteCircleIcon}
                >
                  <Tooltip className="custom-tooltip" permanent>
                    {stopData.stopName}
                  </Tooltip>
                </Marker>
              )
            )}
            <GetIconForTrain
              trainLocations={trainLocations}
              selectedLine={selectedLine}
            />
            <Pathway selectedLine={selectedLine} />
          </div>
        )}
      </MapContainer>
    </div>
  );
}

const whiteCircleIcon = L.divIcon({
  className: "white-circle-icon",
  iconSize: [9, 9],
});

export default Map;

import { MapContainer, TileLayer, Marker, Tooltip } from "react-leaflet";
import Pathway from "./Pathway";
import stopsData from "../data/stations.json";
import L from "leaflet";
import "./Map.css";
import { useState, useEffect } from "react";
import BIcon from "./train_icons/B.png"

function Map({ selectedLine }) {
  const position = [40.7128, -74.006];
  const [trainLocations, setTrainLocations] = useState({});

  //selectedLine gets passed to Pathway

  //link to get coordinates of train location, the backend is hosted here
  //this link will be used to render markers of where the train is along the trains pathway
  //https://gatekeeper.up.railway.app/MTATRACKER/api/v1/trains

  useEffect(() => {
    const fetchTrainLocations = () => {
      fetch("https://gatekeeper.up.railway.app/MTATRACKER/api/v1/trains")
        .then((response) => response.json())
        .then((data) => setTrainLocations(data.positions))
        .catch((error) => {
          console.error("Error:", error);
        });
    };
    //updates every 15 seconds
    fetchTrainLocations();

    const timer = setInterval(fetchTrainLocations, 15000);

    return () => clearInterval(timer);
  }, []);

  const getIconForTrain = (trainLetter) => {

    const trainIcon = L.icon({
      iconUrl: BIcon,
      iconSize: [30, 30],
    });

    return trainIcon;
  };

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
          <>
            {Object.entries(stopsData[selectedLine].stops).map(
              ([stopName, stopData], index) => (
                <Marker
                  key={index}
                  position={stopData.coordinates}
                  icon={whiteCircleIcon}
                >
                  <Tooltip className="custom-tooltip" permanent>
                    {stopData.stopName}
                  </Tooltip>
                </Marker>
              )
            )}

            {Object.entries(trainLocations).map(([trainLetter, trainData]) => {
              const northBound =
                trainData.north && trainData.north.length > 0
                  ? trainData.north[0]
                  : null;
              const southBound =
                trainData.south && trainData.south.length > 0
                  ? trainData.south[0]
                  : null;

              if (trainLetter === selectedLine) {
                return (
                  <>
                    {northBound && (
                      <Marker
                        key={`${trainLetter}_north`}
                        position={[northBound.latitude, northBound.longitude]}
                        icon={getIconForTrain(trainLetter)}
                      >
                        <Tooltip className="custom-tooltip" permanent>
                          {`north-bound-${trainLetter}`}
                        </Tooltip>
                      </Marker>
                    )}

                    {southBound && (
                      <Marker
                        key={`${trainLetter}_south`}
                        position={[southBound.latitude, southBound.longitude]}
                        icon={getIconForTrain(trainLetter)}
                      >
                        <Tooltip className="custom-tooltip" permanent>
                          {`south-bound-${trainLetter}`}
                        </Tooltip>
                      </Marker>
                    )}
                  </>
                );
              }
              return null;
            })}

            <Pathway selectedLine={selectedLine} />
          </>
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

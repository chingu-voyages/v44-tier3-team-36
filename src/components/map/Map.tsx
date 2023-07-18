import { MapContainer, TileLayer, Marker, Tooltip } from "react-leaflet";
import Pathway from "./Pathway";
import stopsData from "../data/stations.json";
import "./Map.css";

function Map({ selectedLine }) {
  const position = [40.7128, -74.006];
  //selectedLine gets passed to Pathway
  
  //link to get coordinates of train location, the backend is hosted here
  //this link will be used to render markers of where the train is along the trains pathway
  //https://gatekeeper.up.railway.app/MTATRACKER/api/v1/trains

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

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import stopsData from "../data/stations.json"

function Map({ selectedLine }) {
  const position: [number, number] = [40.7128, -74.006];

  return (
    <div className="flex-grow">
      <MapContainer
        center={position}
        zoom={13}
        style={{ height: "100vh" }}
        zoomControl = {false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Coordinates of stations by the line selected from sidebar */}
        {selectedLine && (
          Object.entries(stopsData[selectedLine].stops).map(
            ([stopName, stopData], index) => (
              <Marker
                key={index}
                position={stopData.coordinates}
              >
                <Popup>{stopName}</Popup>
              </Marker>
            )
          )
        )}
      </MapContainer>
    </div>
  );
}

export default Map;

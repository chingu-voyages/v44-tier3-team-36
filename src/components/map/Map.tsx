import { MapContainer, TileLayer, Marker} from "react-leaflet";
import stopsData from "../data/stations.json"

 
const position: [number, number] = [40.7128, -74.006];
const stopCoordinates: [number, number] = [latitude, longitude]

function Map() {
  return (
    <div className="flex-grow">
      <MapContainer
        center={position}
        zoom={13}
        style={{ height: "100vh" }}
        zoomControl = {false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright%22%3EOpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker stopCoordinates={stopCoordinates} />
      </MapContainer>
    </div>
  );
}

export default Map;

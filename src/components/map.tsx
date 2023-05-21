import { MapContainer, TileLayer} from "react-leaflet";

const Map = () => {
    
  return (
    <div id="map" style={{ height: "100%" , width: "100%"}}>
      <MapContainer
        center={[40.7128, -74.006]}
        zoom={13}
        style={{ height: "100vh", width: "100vh" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </MapContainer>
    </div>
  );
};

export default Map;

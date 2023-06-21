import Sidebar from "../sidebar/Sidebar";
import Map from "../map/Map";


function RenderMap() {
  return (
    <div>
      <div className="flex">
        <Sidebar />
      </div>
      <div>
        <Map />
      </div>
    </div>
  );
}

export default RenderMap;

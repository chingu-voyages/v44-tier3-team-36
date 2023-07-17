import { useState } from "react";
import Sidebar from "../sidebar/Sidebar";
import Map from "../map/Map";

//component to connect the map and the sidebar
function RenderMap() {
  //this state is to pass the selected line from the sidebar to the map.
  //this is to get the pathway of the selected train to render on the map
  const [selectedLine, setSelectedLine] = useState(null);

  //passed to the sidebar, so when a user selects a line, the state is updated from null to that line
  //this then gets passed to the map
  const handleSelectLine = (line) => {
    setSelectedLine(line);
  };
  
  return (
    <div>
      <div className="flex">
        <Sidebar onSelectLine={handleSelectLine} />
      </div>
      <div>
        <Map selectedLine={selectedLine} />
      </div>
    </div>
  );
}

export default RenderMap;

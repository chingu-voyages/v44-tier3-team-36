import { useState } from "react";
import Sidebar from "../sidebar/Sidebar";
import Map from "../map/Map";

function RenderMap() {
  const [selectedLine, setSelectedLine] = useState(null);

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

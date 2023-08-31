import { useState } from "react";
import Sidebar from "../sidebar/Sidebar";
import Map from "../map/Map";

//component to connect the map and the sidebar
function RenderMap() {
  //this state is to pass the selected line from the sidebar to the map.
  //this is to get the pathway of the selected train to render on the map, so when a user clicks the 1 train, the "1" will pass
  //into Map then Pathway.tsx. At Pathway tsx it will match to the object that shares "1" and render the coordinates of that train
  //onto the map
  const [selectedLine, setSelectedLine] = useState<string | null>(null);

  //passed to the sidebar, so when a user selects a line, the state is updated from null to that line
  //this changes the selectedLine state to the value clicked, which you see below at <Map selectedLine={selectedLine} />

  const handleSelectLine = (line: string) => {
    setSelectedLine(line);
  };

  return (
    <div>
      <div className="flex">
        <Sidebar
          onSelectLine={handleSelectLine}
        />
      </div>
      <div>
        <Map selectedLine={selectedLine || ""} />
      </div>
    </div>
  );
}

export default RenderMap;

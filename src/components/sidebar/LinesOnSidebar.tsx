import { useState } from "react";
import stopsData from "./stations/stations.json";

interface stopsData {
  [line: string]: {
    stops: string[];
  };
}

function LinesOnSidebar() {
  const [selectedLine, setSelectedLine] = useState<string | null>(null);

  const handleLineClick = (line: string) => {
    setSelectedLine(line);
  };

  return (
    <div>
      {selectedLine ? (
        <div className="space-y-2">
          <h2 className="text-lg font-bold">{selectedLine}</h2>
          <ul>
            {stopsData[selectedLine].stops.map((stop: string, index: number) => (
              <li key={index}>{stop}</li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="space-y-2">
          <div className="flex flex-col space-y-1">
            {Object.keys(stopsData).map((line) => (
              <button key={line} onClick={() => handleLineClick(line)}>
                {line}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default LinesOnSidebar;

import { useState } from "react";
import stopsData from "../data/stations.json";

function LinesOnSidebar({ onSelectLine }) {
  const [selectedLine, setSelectedLine] = useState(null);

  const handleLineClick = (line) => {
    setSelectedLine(line);
    onSelectLine(line);
  };

  const handleBackToLines = () => {
    setSelectedLine(null);
    onSelectLine(null);
  };

  return (
    <div>
      {selectedLine ? (
        <div className="space-y-2">
          <h2 className="text-lg font-bold text-center">{selectedLine}</h2>
          <button
            onClick={handleBackToLines}
            className="bg-white border rounded-lg px-4 py-2 text-black"
          >
            Return to Lines
          </button>
          <ul>
            {Object.entries(stopsData[selectedLine].stops).map(
              ([stopName, stopData], index) => (
                <li key={index} className="stop-item">
                  {stopName}
                  <p>North: </p>
                  <p>South:</p>
                  {/* {console.log(stopData)} */}
                </li>
              )
            ) }
          </ul>
        </div>
      ) : (
        <div className="space-y-2">
          <p className="text-lg">Lines</p>
          <div className="flex flex-col space-y-1">
            {Object.keys(stopsData).map((line) => (
              <button
                key={line}
                onClick={() => handleLineClick(line)}
                className="border rounded-lg px-4 py-2 text-white"
              >
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

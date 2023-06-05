import React from "react";

interface Station {
  stopName: string;
  lines: string[];
}

interface SideBarProps {
  stationsData: Station[];
  selectedLine: string | null;
  setSelectedLine: (line: string | null) => void;
}

const SideBar: React.FC<SideBarProps> = ({ stationsData, selectedLine, setSelectedLine }) => {
  const handleLineClick = (line: string) => {
    setSelectedLine(line);
  };

  // Line appears once
  const uniqueLines = [
    ...new Set(stationsData.flatMap((station) => station.lines)),
  ];

  return (
    <div className="sidebar">
      <h2>Lines</h2>
      <ul>
        {uniqueLines.map((line) => (
          <li
            key={line}
            className={selectedLine === line ? "selected" : ""}
            onClick={() => handleLineClick(line)}
          >
            {line}
          </li>
        ))}
      </ul>

      {selectedLine && (
        <div className="stops-list">
          <h3>Stops for Line {selectedLine}</h3>
          <ul>
            {stationsData
              .filter((station) => station.lines.includes(selectedLine))
              .map((station) => (
                <li key={station.stopName}>
                  {station.stopName}
                </li>
              ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SideBar;


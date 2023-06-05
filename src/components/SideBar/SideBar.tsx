import React, {useRef} from "react";
import Card from "$lib/Card/Card.tsx";

interface Station {
  stopName: string;
  lines: string[];
}

interface SideBarProps {
  stationsData: Station[];
  selectedLine: string | null;
  setSelectedLine: (line: string | null) => void;
}

const SideBar: React.FC<SideBarProps> = ({
  stationsData,
  selectedLine,
  setSelectedLine,
}) => {
  const handleLineClick = (line: string) => {
    setSelectedLine(line);
  };

  // Line appears once
  const uniqueLines = [
    ...new Set(stationsData.flatMap((station) => station.lines)),
  ];
  const thisRef = useRef(null);
  
  return (
    <div className="sidebar">
      {uniqueLines.map((line) => (
        <div
          key={line}
          ref={thisRef}
          id={line}
          // onClick={() => {
          //   handleLineClick(thisRef);
          // }}
        >
          <Card
            // @ts-ignore
            title={"Line " + line}
            direction="Uptown"
            arrival_time="??: ??: ??"
            nextup_time="??: ??: ??"
            stops={
              thisRef.current?.id && (
                <div className="stops-list">
                  {stationsData
                    .filter((station) => station.lines.includes(thisRef.current.id))
                    .map((station) => (
                      <div
                        key={station.stopName}
                        className="rounded-lg title-element border border-card px-4 py-2 my-4 w-full flex justify-center items-center "
                      >
                        <div className="title text-lg font-base text-black w-full flex-1">
                          {station.stopName}
                        </div>

                        <div className="title font-base flex text-black text-sm w-fit justify-end">
                          <div className="e1 mr-1">ETA:</div>
                          <div className="font-extralight">{"??: ??: ??"}</div>
                        </div>
                      </div>
                    ))}
                </div>
              )
            }
          />
        </div>
      ))}
    </div>
  );
};

export default SideBar;

import React from "react";
import Card from "$lib/Card/Card";

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
  return (
    <div className="sidebar">
      <div
        onClick={(e) => {
          //   console.log(e);
          console.log(stationsData, selectedLine);
        }}
      >
        <Card
          // @ts-ignore
          title={"Line " + "?"}
          direction="Uptown"
          arrival_time="??: ??: ??"
          nextup_time="??: ??: ??"
          stops={
            <div className="rounded-lg title-element border border-card px-4 py-2 my-4 w-full flex justify-center items-center ">
              <div className="title text-lg font-base text-black w-full flex-1">
                STATION_STOPNAME
              </div>

              <div className="title font-base flex text-black text-sm w-fit justify-end">
                <div className="e1 mr-1">ETA:</div>
                <div className="font-extralight">{"??: ??: ??"}</div>
              </div>
            </div>
          }
        />
      </div>
    </div>
  );
};
export default SideBar;

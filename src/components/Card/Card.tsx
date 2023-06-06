import React from "react";

const Card: React.FC = (props) => {
  return (
    <div className="card flatnav bg-red block">
      <div className="top-header-container flex flex-wrap justify-center items-center mx-4 my-4">
        <div className="block">
          <div className="rounded-lg title-element border border-card block px-4 pr-12 py-2 my-4 w-full">
            <div className="title text-2xl font-base text-black w-full">
              {props.title}
            </div>
            <div className="title uppercase text-lg font-light text-black w-full">
              {props.direction}
            </div>
          </div>
          <img
            className="preview-image w-full"
            src="/milan-railway-station_0.jpg"
            alt="Subway Station Preview for <STATION_NAME>"
          />
        </div>
      </div>
      <div className="bottom-footer-container flex flex-wrap justify-center items-center mx-4 my-4">
        {props.stops || "TRACK_STOP_ELEMENT"}
        <div className="title-rounded uppercase flex justify-center track-bg items-center text-lg text-white font-base hover:opacity-90 cursor-pointer w-full rounded-lg title-element border border-card track-bg px-4 pr-12 py-2 my-4">
          Track This Line
        </div>
      </div>
    </div>
  );
};
export default Card;

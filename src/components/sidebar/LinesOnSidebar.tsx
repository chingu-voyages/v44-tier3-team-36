import { useState, useEffect } from "react";
import stopsData from "../data/stations.json";

function LinesOnSidebar({ onSelectLine }) {
  const [selectedLine, setSelectedLine] = useState(null);
  const [arrivalTimes, setArrivalTimes] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleLineClick = (line) => {
    setSelectedLine(line);
    onSelectLine(line);
    setArrivalTimes({});
    setIsLoading(true);
  };

  const handleBackToLines = () => {
    setSelectedLine(null);
    onSelectLine(null);
    setArrivalTimes({});
  };

  const getArrivalTime = (stopId, direction) => {
    //data to check selected line, the stopid, and the direction is availabale

    if (
      arrivalTimes[selectedLine] &&
      arrivalTimes[selectedLine][stopId] &&
      arrivalTimes[selectedLine][stopId][direction]
    ) {
      const arrivals = arrivalTimes[selectedLine][stopId][direction];
      //if the north or south is there

      if (arrivals.length > 0) {
        const validArrivals = arrivals.filter(
          (arrival) => arrival.time >= -100
        );

        //filters the array of arrival times when the time is greater or equal to -100 seconds
        //sort smallest to biggest, take first 2 or 3
        if (validArrivals.length > 0) {
          const earliestArrivalTime = Math.min(
            ...validArrivals.map((arrival) => arrival.time)
          );
          //if time negative train arrivaed at station

          if (earliestArrivalTime < 0) {
            return "Train has arrived";
          } else if (earliestArrivalTime === 0) {
            return "0 minutes";
          } else {
            const timeInSeconds = earliestArrivalTime;
            const timeInMinutes = Math.floor(timeInSeconds / 60);
            return `${timeInMinutes} minutes`;
          }
        }
      }
    }
    return "Train has yet to arrive";
  };

  //fetch to get backend for arrival time
  //make it so that there is a time where it refreshes
  //when arrivaltimes not as dependency time doesn't show?

  useEffect(() => {
    const fetchArrivalTimes = () => {
      if (selectedLine) {
        setIsLoading(true);
        const url = "http://localhost:8080/api/v1/times";

        fetch(url)
          .then((response) => {
            if (!response.ok) {
              throw new Error(
                `Error: ${response.status} ${response.statusText}`
              );
            }
            return response.json();
          })
          .then((data) => {
            setArrivalTimes(data.arrivalTimes);
          })
          .catch((error) => {
            console.error("Error:", error);
          })
          .finally(() => {
            setIsLoading(false);
          });
      }
    };

    fetchArrivalTimes();

    const timer = setInterval(fetchArrivalTimes, 10000);

    return () => clearInterval(timer);
  }, [selectedLine]);

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
          {isLoading ? (
            <p>Loading...</p>
          ) : (
            <ul>
              {Object.entries(stopsData[selectedLine].stops).map(
                ([stopId, stopData], index) => (
                  <li key={index} className="stop-item">
                    {stopData.stopName}
                    <p>North: {getArrivalTime(stopId, "north")}</p>
                    <p>South: {getArrivalTime(stopId, "south")}</p>
                  </li>
                )
              )}
            </ul>
          )}
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

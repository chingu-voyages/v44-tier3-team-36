import { useState, useEffect } from "react";
import stopsData from "../data/stations.json";

function LinesOnSidebar({ onSelectLine }) {
  //stores current selected line
  const [selectedLine, setSelectedLine] = useState(null);
  //stores the arrival times of the selected train
  const [arrivalTimes, setArrivalTimes] = useState({});
  //boolean to load the page for the times to update
  const [isLoading, setIsLoading] = useState(false);

  const handleLineClick = (line) => {
    setSelectedLine(line);
    onSelectLine(line);
    setArrivalTimes({});
    setIsLoading(true);
  };

  //when return to line is pressed, resets the selectedLine, onSelectLine, and setArrivalTimes
  const handleBackToLines = () => {
    setSelectedLine(null);
    onSelectLine(null);
    setArrivalTimes({});
  };

  const getArrivalTime = (stopId, direction) => {
    //data to check selected line, the stopid, and the direction exists
    //for example it looks to see if it exists like this
    // selectedLine: {
    // stopId: {
    //   north: [arrival],
    //   south: [arrival]
    if (
      arrivalTimes[selectedLine] &&
      arrivalTimes[selectedLine][stopId] &&
      arrivalTimes[selectedLine][stopId][direction]
    ) {
      const arrivals = arrivalTimes[selectedLine][stopId][direction];

      //checks to see if there is any available arrival times in the north and south
      //if so it then filters arrivals and checks if the time is greater than or equal to -100 seconds.
      //When the time is negative it either means the train has arrived or left the station, I am using -100 seconds as a threshold for the
      //train arriving and anything over we can assume the trian has already left. The new times get assigned to a array called validArrivals
      if (arrivals.length > 0) {
        const validArrivals = arrivals.filter(
          (arrival) => arrival.time >= -100
        );

        //the backend sorts the time from the farthest to the closeste. To get the earlist train arriving, this sorts it from closest to farthest.
        //this then gets assigned to a array called earliestArrivalTime
        if (validArrivals.length > 0) {
          const earliestArrivalTime = Math.min(
            ...validArrivals.map((arrival) => arrival.time)
          );

          //if the time is negative or equal to zero the train has arrived at station
          //if not it takes the time of the closest arrival, divides it by 60 to get the time in minutes
          if (earliestArrivalTime <= 0) {
            return "Train has arrived";
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

  //Tasks
  //make it so that there is a time where it refreshes
  //when arrivaltimes not as dependency time doesn't show?

  useEffect(() => {
    //call back function, takes selected line as an argument, will change when the selectedLine state changes
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
          //updates the setArrivalTimes state with the time of train arrivals
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
    // timer set to 10 seconds to call the fetchArrivalTimes 
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

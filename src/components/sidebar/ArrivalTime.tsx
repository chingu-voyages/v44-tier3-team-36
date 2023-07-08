import {useEffect} from "react";

function ArrivalTime() {
  useEffect(() => {
    const url = "http://localhost:8080/api/v1/times";

    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        return response.json();
      })
      .then((data) => {
        const arrivalTimes = data.arrivalTimes;

        for (const line in arrivalTimes) {
          if (arrivalTimes.hasOwnProperty(line)) {
            const stations = arrivalTimes[line];

            for (const station in stations) {
              if (stations.hasOwnProperty(station)) {
                const directions = stations[station];

                for (const direction in directions) {
                  if (directions.hasOwnProperty(direction)) {
                    const arrivals = directions[direction];

                    for (const arrival of arrivals) {
                      const time = arrival.time;
                      const isDelayed = arrival.isDelayed;
                      const isAssigned = arrival.isAssigned;

                      console.log(`Train Line: ${line}`);
                      console.log(`Station: ${station}`);
                      console.log(`Direction: ${direction}`);
                      console.log(`Arrival Time: ${time}`);
                      console.log(`Is Delayed: ${isDelayed}`);
                      console.log(`Is Assigned: ${isAssigned}`);
                      console.log("---");
                    }
                  }
                }
              }
            }
          }
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  
  return <div>ArrivalTime</div>;
}

export default ArrivalTime;

import { useState, useEffect } from "react";
import stopsData from "../data/stations.json";
import { Link } from "react-router-dom";
import { useUserContext } from "../../UserContext";
import { lineColors } from "./LineColors";
import "./sidebar.css";

function LinesOnSidebar({ onSelectLine }) {
  const { user, logout, token, userId, setUserData } = useUserContext();
  //stores current selected line
  const [selectedLine, setSelectedLine] = useState(null);
  //stores the arrival times of the selected train
  const [arrivalTimes, setArrivalTimes] = useState({});
  //boolean to switch from subscribe to unsubscribe
  const [isSubscribed, setIsSubscribed] = useState(false);
  //dropdown
  const [expandedStop, setExpandedStop] = useState(null);

  const toggleExpandedStop = (stopId) => {
    setExpandedStop(expandedStop === stopId ? null : stopId);
  };

  const handleLineClick = (line: string) => {
    setSelectedLine(line);
    onSelectLine(line);
    setArrivalTimes({});

    const storedSubscriptions = localStorage.getItem("subscriptions");
    if (storedSubscriptions) {
      const userSubscriptions = JSON.parse(storedSubscriptions);
      if (userSubscriptions.includes(line)) {
        setIsSubscribed(true);
      } else {
        setIsSubscribed(false);
      }
    }
  };

  //when return to line is pressed, resets the selectedLine, onSelectLine, and setArrivalTimes
  const handleBackToLines = () => {
    setSelectedLine(null);
    onSelectLine(null);
    setArrivalTimes({});
  };

  const getArrivalTime = (stopId: string, direction: "north" | "south") => {
    //data to check selected line, the stopid, and the direction exists
    //for example it looks to see if it exists like this
    // selectedLine: {
    // stopId: {
    //   north: [arrival],
    //   south: [arrival]
    if (
      selectedLine &&
      arrivalTimes[selectedLine] &&
      arrivalTimes[selectedLine][stopId] &&
      arrivalTimes[selectedLine][stopId][direction]
    ) {
      const arrivals = arrivalTimes[selectedLine][stopId][direction];

      //checks to see if there is any available arrival times in the north and south
      //if so it then filters arrivals and checks if the time is greater than or equal to -100 seconds.
      //When the time is negative it either means the train has arrived or left the station, I am using -100 seconds as a threshold for the
      //train arriving and anything over we can assume the trian has already left. The new times get assigned to a array called validArrivals
      // Check if there are arrivals for this stop and direction
      if (arrivals.length > 0) {
        const validArrivals = arrivals
          .filter((arrival) => arrival.time >= 0 && arrival.time < 900)
          .map((arrival) => ({
            time: arrival.time,
            formattedTime: `${Math.floor(arrival.time / 60)} minutes`,
          }));

        validArrivals.sort((a, b) => a.time - b.time);

        if (validArrivals.length === 0) {
          return "Train has yet to arrive";
        } else if (validArrivals.length === 1) {
          if (validArrivals[0].time === 0) {
            return "Train has arrived";
          }
          return validArrivals[0].formattedTime;
        } else {
          // Display first two valid arrivals as bullet points, earliest first
          const firstTwoBulletPoints = validArrivals
            .slice(0, 2)
            .map((arrival) => `• ${arrival.formattedTime}`)
            .join("\n");
          return firstTwoBulletPoints;
        }
      }
    }
    return "No trains close at the moment";
  };

  //fetch to get backend for arrival time

  //Tasks
  //make it so that there is a time where it refreshes
  //when arrivaltimes not as dependency time doesn't show?

  const URL = `http://localhost:5000/api/v1/data/times`;

  useEffect(() => {
    //call back function, takes selected line as an argument, will change when the selectedLine state changes
    const fetchArrivalTimes = () => {
      if (selectedLine) {
        // const url = "http://localhost:8080/api/v1/times";

        fetch(URL)
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
            console.log("Arrival Times Data:", data);
            setArrivalTimes(data.arrivalTimes);
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      }
    };

    fetchArrivalTimes();
    // timer set to 10 seconds to call the fetchArrivalTimes
    const timer = setInterval(fetchArrivalTimes, 30000);

    return () => clearInterval(timer);
  }, [selectedLine]);

  const handleSubscriptionToggle = () => {
    if (selectedLine) {
      const storedSubscriptions = localStorage.getItem("subscriptions");
      const userSubscriptions = storedSubscriptions
        ? JSON.parse(storedSubscriptions)
        : [];

      const requestData = {
        userId: userId,
        routeId: selectedLine,
      };

      const config = {
        method: isSubscribed ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(requestData),
      };

      const subscriptionEndpoint = isSubscribed
        ? `http://localhost:5000/api/v1/subscription/unsubscribe`
        : `http://localhost:5000/api/v1/subscription/subscribe`;

      fetch(subscriptionEndpoint, config)
        .then((response) => {
          if (!response.ok) {
            console.log(userId);
            throw new Error(`Error: ${response.status} ${response.statusText}`);
          }
          return response.json();
        })
        .then((data) => {
          console.log(data.message);
          console.log(userId);

          if (isSubscribed) {
            const updatedSubscriptions = userSubscriptions.filter(
              (sub) => sub !== selectedLine
            );
            localStorage.setItem(
              "subscriptions",
              JSON.stringify(updatedSubscriptions)
            );
          } else {
            userSubscriptions.push(selectedLine);
            localStorage.setItem(
              "subscriptions",
              JSON.stringify(userSubscriptions)
            );
          }

          setIsSubscribed(!isSubscribed);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  };

  return (
    <div>
      <div className="text-center mb-4 space-y-2">
        {user ? (
          <>
            <p className="text-white">Welcome, {user}</p>
            <button
              onClick={logout}
              className="border w-full rounded-lg px-4 py-2 text-white bg-red-500 hover:bg-red-600 font-bold"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <button className="w-full border rounded-lg px-4 py-2 text-white bg-blue-500 hover:bg-blue-600 font-bold">
              <Link to="/login">Login</Link>
            </button>
            <p className="mt-2 text-white">Don't have an account?</p>
            <Link to="/sign-up">Sign up</Link>
          </>
        )}
      </div>
      {selectedLine ? (
        <div className="h-4/5 flex flex-col justify-between overflow-y-auto">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div
                className="w-12 h-12 rounded-full text-lg font-bold text-white flex items-center justify-center mb-2"
                style={{
                  backgroundColor: lineColors[selectedLine],
                }}
              >
                {selectedLine}
              </div>
              {user && (
                <button
                  onClick={handleSubscriptionToggle}
                  className={`border rounded-lg px-4 py-2 text-white ${
                    isSubscribed ? "bg-red-500" : "bg-green-500"
                  } hover:bg-red-600 hover:bg-green-600 font-bold mx-auto`}
                >
                  {isSubscribed ? "Unsubscribe" : "Subscribe"}
                </button>
              )}
            </div>
            <button
              onClick={handleBackToLines}
              className="bg-white border rounded-lg px-4 py-2 text-black mx-auto"
            >
              Return to Lines
            </button>
            <div className="h-96 overflow-y-auto scrollbar-container">
              <ul className="text-white">
                {Object.entries(stopsData[selectedLine].stops).map(
                  ([stopId, stopData], index) => (
                    <li
                      key={index}
                      className="stop-item cursor-pointer border-b pb-4 mb-4"
                      onClick={() => toggleExpandedStop(stopId)}
                    >
                      <div
                        className={`mb-2 font-bold ${
                          expandedStop === stopId ? "border-b border-white" : ""
                        }`}
                      >
                        {stopData.stopName}
                      </div>

                      {expandedStop === stopId && (
                        <>
                          <div className="pt-2 pb-2">
                            <p className="font-bold">North</p>
                            <p>{getArrivalTime(stopId, "north")}</p>
                          </div>
                          <div className="border-dashed border-t pt-2">
                            <p className="font-bold">South</p>
                            <p>{getArrivalTime(stopId, "south")}</p>
                          </div>
                        </>
                      )}
                    </li>
                  )
                )}
              </ul>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-2">
          <p className="text-2xl font-bold text-white py-2">Lines</p>
          <div className="flex flex-wrap justify-start">
            {Object.keys(stopsData)
              .sort((lineA, lineB) => {
                const colorA = lineColors[lineA] || "";
                const colorB = lineColors[lineB] || "";
                return colorA.localeCompare(colorB);
              })
              .map((line) => (
                <button
                  key={line}
                  onClick={() => handleLineClick(line)}
                  className="w-12 h-12 rounded-full text-lg font-bold text-white flex items-center justify-center mb-2 mr-2 border"
                  style={{
                    backgroundColor: lineColors[line],
                  }}
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

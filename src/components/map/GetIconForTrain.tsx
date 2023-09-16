import { Marker, Tooltip } from "react-leaflet";
import { IconData } from "./AllIcons";
import L from "leaflet";
import "./GetIconForTrain.css";

function GetIconForTrain({ trainLocations, selectedLine }) {
  const radToDeg = (rad) => (rad * 180) / Math.PI;

  const getIconForSouthTrain = (bearing) => {
    const iconData = IconData[selectedLine] || null;

    const trainIcon = iconData
      ? `<img src="${iconData.data}" class="train-icon" style="width: 30px; height: 30px;" />`
      : "";

    const arrowCharacter = "➤";
    const oneIcon = L.divIcon({
      html: `<div class="combined-container">
                <div class="train-icon-container">
                ${trainIcon}
                </div>
                <div class="arrow-icon" style="transform: rotate(${radToDeg(
                  bearing
                )}deg)">${arrowCharacter}</div>
            </div>`,
      iconSize: [30, 30],
      className: "combined-icon",
    });

    return oneIcon;
  };

  const getIconForNorthTrain = (bearing) => {
    const iconData = IconData[selectedLine] || null;

    const trainIcon = iconData
      ? `<img src="${iconData.data}" class="train-icon" style="width: 30px; height: 30px;" />`
      : "";

    const arrowCharacter = "➤";
    const oneIcon = L.divIcon({
      html: `<div class="combined-container">
      <div class="arrow-icon-north" style="transform: rotate(${-radToDeg(
        bearing
      )}deg)">${arrowCharacter}</div>
                <div class="train-icon-container">
                ${trainIcon}
                </div>
            </div>`,
      iconSize: [30, 30],
      className: "combined-icon",
    });

    return oneIcon;
  };

  return (
    <div>
      {Object.entries(trainLocations).map(([trainLetter, trainData]) => {
        const northBoundTrains = trainData.north || [];
        const southBoundTrains = trainData.south || [];

        if (trainLetter === selectedLine) {
          return (
            <div key={`train_${trainLetter}`}>
              {/* {northBoundTrains.map((northTrain, index) => (
                <div key={`north_${trainLetter}_${index}`}>
                  <Marker
                    key={`north_${trainLetter}_${index}`}
                    position={[northTrain.latitude, northTrain.longitude]}
                    icon={getIconForNorthTrain(northTrain.bearing)}
                  >
                    <Tooltip>
                      {[northTrain.latitude, northTrain.longitude]}
                    </Tooltip>
                  </Marker>
                </div>
              ))} */}
              {southBoundTrains.map((southTrain, index) => (
                <div key={`south_${trainLetter}_${index}`}>
                  <Marker
                    key={`south_${trainLetter}_${index}`}
                    position={[southTrain.latitude, southTrain.longitude]}
                    icon={getIconForSouthTrain(southTrain.bearing)}
                  >
                    <Tooltip>{[southTrain.latitude, southTrain.longitude]}</Tooltip>
                  </Marker>
                </div>
              ))}
            </div>
          );
        }
        return null;
      })}
    </div>
  );
}

export default GetIconForTrain;

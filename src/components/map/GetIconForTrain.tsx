import { Marker } from "react-leaflet";
import { IconData } from "./AllIcons";
import L from "leaflet";
import arrow from "./arrow.png";
import "./GetIconForTrain.css"

function GetIconForTrain({ trainLocations, selectedLine }) {
//   const combinedMarker = () => {};

  const getIconForTrain = () => {
    const iconData = IconData[selectedLine] || null;

    const iconHtml = `
    <div class="train-icon">
        <img src="${arrow}" class="arrow-icon">
        <img src="${iconData.data}" class="train-icon-img">
    </div>
  `;

    const trainIcon = L.divIcon({
      html: iconHtml,
      iconSize: [20, 10],
    });

    return trainIcon;
  };

  return (
    <div>
      {Object.entries(trainLocations).map(([trainLetter, trainData]) => {
        const northBoundTrains = trainData.north || [];
        const southBoundTrains = trainData.south || [];

        if (trainLetter === selectedLine) {
          return (
            <div key={`train_${trainLetter}`}>
              {northBoundTrains.map((northTrain, index) => (
                <Marker
                  key={`north_${trainLetter}_${index}`}
                  position={[northTrain.latitude, northTrain.longitude]}
                  icon={getIconForTrain()}
                >
                </Marker>
              ))}

              {southBoundTrains.map((southTrain, index) => (
                <Marker
                  key={`south_${trainLetter}_${index}`}
                  position={[southTrain.latitude, southTrain.longitude]}
                  icon={getIconForTrain()}
                >
                </Marker>
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

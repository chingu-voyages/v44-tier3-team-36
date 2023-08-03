import { Marker } from "react-leaflet";
import { IconData } from "./AllIcons";
import L from "leaflet";
import arrowImage from "./arrow.png";
import "./GetIconForTrain.css";

function GetIconForTrain({ trainLocations, selectedLine }) {
  const arrowIcon = (offset) => {
    const arrow = arrowImage;
    const arrowIcon = L.icon({
      iconUrl: arrow,
      iconSize: [30, 30],
    });

    return { icon: arrowIcon, offset: offset };
  };

  const getIconForTrain = () => {
    const iconData = IconData[selectedLine] || null;
    const trainIcon = L.icon({
      iconUrl: iconData.data,
      iconSize: [30, 30],
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
                <div key={`north_${trainLetter}_${index}`}>
                  <Marker
                    position={[northTrain.latitude - arrowIcon(-0.0002).offset, northTrain.longitude]}
                    icon={arrowIcon(-0.0002).icon}
                  />
                  <Marker
                    key={`north_${trainLetter}_${index}`}
                    position={[northTrain.latitude, northTrain.longitude]}
                    icon={getIconForTrain()}
                  />
                </div>
              ))}

              {southBoundTrains.map((southTrain, index) => (
                <div key={`south_${trainLetter}_${index}`}>
                  <Marker
                    position={[southTrain.latitude - arrowIcon(-0.0002).offset, southTrain.longitude]}
                    icon={arrowIcon(-0.0002).icon}
                  />
                  <Marker
                    key={`south_${trainLetter}_${index}`}
                    position={[southTrain.latitude, southTrain.longitude]}
                    icon={getIconForTrain()}
                  />
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

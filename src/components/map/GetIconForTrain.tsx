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
              {northBoundTrains.map((northTrain, index) => (
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
              ))}
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

// !!!! its really hard to see the arrows you have to zoom in, its hard to see because its inside the circle, the styling is done in the function, not the css, it also uses the arrow png

// import { Marker } from "react-leaflet";
// import { IconData } from "./AllIcons";
// import L from "leaflet";
// import arrowImage from "./arrow.png";
// import "./GetIconForTrain.css";

// function GetIconForTrain({ trainLocations, selectedLine }) {
//   const arrowIcon = (bearing) => {
//     const arrow = arrowImage;
//     const arrowIcon = L.divIcon({
//       html: `<img src="${arrow}" style="transform: rotate(${
//         (bearing * 180) / Math.PI
//       }deg);  height: 20px; width: 15px" />`,
//       iconSize: [30, 30],
//       iconAnchor: [15, 15],
//       popupAnchor: [0, -15],
//       className: "arrow-icon",
//     });

//     return arrowIcon;
//   };

//   const southArrowIcon = (bearing) => {
//     const arrow = arrowImage;
//     const arrowIcon = L.divIcon({
//       html: `<img src="${arrow}" style="transform: rotate(${
//         (bearing * 180) / Math.PI
//       }deg);  height: 20px; width: 15px" />`,
//       iconSize: [30, 30],
//       iconAnchor: [15, 15],
//       popupAnchor: [0, -15],
//       className: "arrow-icon",
//     });

//     return arrowIcon;
//   };

//   const getIconForTrain = () => {
//     const iconData = IconData[selectedLine] || null;
//     const trainIcon = L.icon({
//       iconUrl: iconData.data,
//       iconSize: [30, 30],
//       className: "train-icon",
//     });

//     return trainIcon;
//   };

//   return (
//     <div>
//       {Object.entries(trainLocations).map(([trainLetter, trainData]) => {
//         const northBoundTrains = trainData.north || [];
//         const southBoundTrains = trainData.south || [];

//         if (trainLetter === selectedLine) {
//           return (
//             <div key={`train_${trainLetter}`}>
//               {northBoundTrains.map((northTrain, index) => (
//                 <div key={`north_${trainLetter}_${index}`}>
//                   <Marker
//                     position={[northTrain.latitude, northTrain.longitude]}
//                     icon={arrowIcon(northTrain.bearing)}
//                     zIndexOffset={1000}
//                   />
//                   <Marker
//                     key={`north_${trainLetter}_${index}`}
//                     position={[northTrain.latitude, northTrain.longitude]}
//                     icon={getIconForTrain()}
//                   />
//                 </div>
//               ))}

//               {southBoundTrains.map((southTrain, index) => (
//                 <div key={`south_${trainLetter}_${index}`}>
//                   <Marker
//                     position={[southTrain.latitude, southTrain.longitude]}
//                     icon={southArrowIcon(southTrain.bearing)}
//                     zIndexOffset={1000}
//                   />
//                   <Marker
//                     key={`south_${trainLetter}_${index}`}
//                     position={[southTrain.latitude, southTrain.longitude]}
//                     icon={getIconForTrain()}
//                   />
//                 </div>
//               ))}
//             </div>
//           );
//         }
//         return null;
//       })}
//     </div>
//   );
// }

// export default GetIconForTrain;



//!! using the arrow png here as well, this was where we had difficulties b/c a white box would appear via html. the offset was recommended by chatgpt so the arrow wouldn't be on top of the train icon
// import { Marker } from "react-leaflet";
// import { IconData } from "./AllIcons";
// import L from "leaflet";
// import arrowImage from "./arrow.png";
// import "./GetIconForTrain.css";

// function GetIconForTrain({ trainLocations, selectedLine }) {
//   const arrowIcon = (offset, bearing) => {
//     const arrow = arrowImage;
//     const arrowIcon = L.divIcon({
//       iconUrl: arrow,
//       html: `<img src="${arrow}" style="transform: rotate(${
//         (bearing * 180) / Math.PI
//       }deg);  height: 20px; width: 15px" />`,
//       iconSize: [30, 30],
//     });

//     return { icon: arrowIcon, offset: offset };
//   };

//   const getIconForTrain = () => {
//     const iconData = IconData[selectedLine] || null;
//     const trainIcon = L.icon({
//       iconUrl: iconData.data,
//       iconSize: [30, 30],
//     });

//     return trainIcon;
//   };

//   return (
//     <div>
//       {Object.entries(trainLocations).map(([trainLetter, trainData]) => {
//         const northBoundTrains = trainData.north || [];
//         const southBoundTrains = trainData.south || [];

//         if (trainLetter === selectedLine) {
//           return (
//             <div key={`train_${trainLetter}`}>
//               {northBoundTrains.map((northTrain, index) => (
//                 <div key={`north_${trainLetter}_${index}`}>
//                   <Marker
//                     position={[
//                       northTrain.latitude - arrowIcon(-0.0002).offset,
//                       northTrain.longitude,
//                     ]}
//                     icon={arrowIcon(-0.0002).icon}
//                   />
//                   <Marker
//                     key={`north_${trainLetter}_${index}`}
//                     position={[northTrain.latitude, northTrain.longitude]}
//                     icon={getIconForTrain()}
//                   />
//                 </div>
//               ))}

//               {southBoundTrains.map((southTrain, index) => (
//                 <div key={`south_${trainLetter}_${index}`}>
//                   <Marker
//                     position={[
//                       southTrain.latitude - arrowIcon(-0.0002).offset,
//                       southTrain.longitude,
//                     ]}
//                     icon={arrowIcon(-0.0002).icon}
//                   />
//                   <Marker
//                     key={`south_${trainLetter}_${index}`}
//                     position={[southTrain.latitude, southTrain.longitude]}
//                     icon={getIconForTrain()}
//                   />
//                 </div>
//               ))}
//             </div>
//           );
//         }
//         return null;
//       })}
//     </div>
//   );
// }

// export default GetIconForTrain;

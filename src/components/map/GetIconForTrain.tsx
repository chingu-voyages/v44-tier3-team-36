import { Marker } from "react-leaflet";
import { IconData } from "./AllIcons";
import L from "leaflet";
import arrowImage from "./arrow.png";
import "./GetIconForTrain.css";

function GetIconForTrain({ trainLocations, selectedLine }) {
  const arrowIcon = (bearing) => {
    const arrow = arrowImage;
    const arrowIcon = L.divIcon({
      html: `<img src="${arrow}" style="transform: rotate(${
        (bearing * 180) / Math.PI
      }deg);  height: 20px; width: 15px" />`,
      iconSize: [30, 30],
      iconAnchor: [15, 15],
      popupAnchor: [0, -15],
      className: "arrow-icon", 
    });

    return arrowIcon;
  };

  const getIconForTrain = () => {
    const iconData = IconData[selectedLine] || null;
    const trainIcon = L.icon({
      iconUrl: iconData.data,
      iconSize: [30, 30],
      className: "train-icon", 
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
                    position={[northTrain.latitude, northTrain.longitude]}
                    icon={arrowIcon(northTrain.bearing)}
                    zIndexOffset={1000} // Set a higher zIndex for the arrow icon
                  />
                  {/* <Marker
                    key={`north_${trainLetter}_${index}`}
                    position={[northTrain.latitude, northTrain.longitude]}
                    icon={getIconForTrain()}
                  /> */}
                </div>
              ))}

              {southBoundTrains.map((southTrain, index) => (
                <div key={`south_${trainLetter}_${index}`}>
                  <Marker
                    position={[southTrain.latitude, southTrain.longitude]}
                    icon={arrowIcon(southTrain.bearing)}
                    zIndexOffset={1000} 
                  />
                  {/* <Marker
                    key={`south_${trainLetter}_${index}`}
                    position={[southTrain.latitude, southTrain.longitude]}
                    icon={getIconForTrain()}
                  /> */}
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


// import { Marker } from "react-leaflet";
// import { IconData } from "./AllIcons";
// import L from "leaflet";
// import arrowImage from "./arrow.png";
// import "./GetIconForTrain.css";

// function GetIconForTrain({ trainLocations, selectedLine }) {
//   const combinedIcon = (iconData, bearing) => {
//     const arrow = arrowImage;
//     const iconHtml = `
//       <div style="position: relative; width: 30px; height: 30px; background: transparent;">
//         <img src="${iconData.data}" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border-radius: 50%;" />
//         <img src="${arrow}" style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%) rotate(${(bearing * 180) / Math.PI}deg); height: 20px; width: 15px;" />
//       </div>
//     `;

//     const icon = L.divIcon({
//       html: iconHtml,
//       iconSize: [30, 30],
//       iconAnchor: [15, 15],
//       popupAnchor: [0, -15],
//     });

//     return icon;
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
//                     icon={combinedIcon(IconData[selectedLine], northTrain.bearing)}
//                     zIndexOffset={1000} // Set a higher zIndex for the icon
//                   />
//                 </div>
//               ))}

//               {southBoundTrains.map((southTrain, index) => (
//                 <div key={`south_${trainLetter}_${index}`}>
//                   <Marker
//                     position={[southTrain.latitude, southTrain.longitude]}
//                     icon={combinedIcon(IconData[selectedLine], southTrain.bearing)}
//                     zIndexOffset={1000}
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

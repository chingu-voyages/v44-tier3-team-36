import { Polyline } from "react-leaflet";
import pathway_1 from "../data/pathway/json/1.json";
import pathway_2 from "../data/pathway/json/2.json";
import pathway_3 from "../data/pathway/json/3.json";
import pathway_4 from "../data/pathway/json/4.json";
import pathway_5 from "../data/pathway/json/5.json";
import pathway_6 from "../data/pathway/json/6.json";
import pathway_7 from "../data/pathway/json/7.json";
import pathway_A from "../data/pathway/json/A.json";
import pathway_B from "../data/pathway/json/B.json";
import pathway_C from "../data/pathway/json/C.json";
import pathway_D from "../data/pathway/json/D.json";
import pathway_E from "../data/pathway/json/E.json";
import pathway_F from "../data/pathway/json/F.json";
import pathway_G from "../data/pathway/json/G.json";
import pathway_H from "../data/pathway/json/H.json";
import pathway_J from "../data/pathway/json/J.json";
import pathway_L from "../data/pathway/json/L.json";
import pathway_M from "../data/pathway/json/M.json";
import pathway_N from "../data/pathway/json/N.json";
import pathway_Q from "../data/pathway/json/Q.json";
import pathway_R from "../data/pathway/json/R.json";
import pathway_SI from "../data/pathway/json/SI.json"
import pathway_W from "../data/pathway/json/W.json"

//Z train shares the same pathway as J, Z is express and runs during a certain time
const pathwayDataMap = {
  "1": { data: pathway_1, color: "red" },
  "2": { data: pathway_2, color: "red" },
  "3": { data: pathway_3, color: "red" },
  "4": { data: pathway_4, color: "green" },
  "5": { data: pathway_5, color: "green" },
  "6": { data: pathway_6, color: "green" },
  "7": { data: pathway_7, color: "violet" },
  "A": { data: pathway_A, color: "blue" },
  "B": { data: pathway_B, color: "orange" },
  "C": { data: pathway_C, color: "blue" },
  "D": { data: pathway_D, color: "orange" },
  "E": { data: pathway_E, color: "blue" },
  "F": { data: pathway_F, color: "orange" },
  "G": { data: pathway_G, color: "lime" },
  "H": { data: pathway_H, color: "blue" },
  "J": { data: pathway_J, color: "brown" },
  "L": { data: pathway_L, color: "gray" },
  "M": { data: pathway_M, color: "orange" },
  "N": { data: pathway_N, color: "yellow" },
  "Q": { data: pathway_Q, color: "yellow" },
  "R": { data: pathway_R, color: "yellow" },
  "SI": { data: pathway_SI, color: "blue" },
  "W": { data: pathway_W, color: "yellow"},
  "Z": { data: pathway_J, color: "brown" }
};


function Pathway({ selectedLine }) {
  //so the pathway is extracted based on the selectedLine, so if someone selects 1 from the sidebar, it goes into the pathwayDataMap and uses this "1": { data: pathway_1, color: "red" }
  //the pathway_1 is the json data of the pathway of the 1 train. In the return the data is mapped through to get the latitude and longitude of the 1 trains pathway.
  const pathwayData = pathwayDataMap[selectedLine] || null;
  const lineColor = pathwayData ? pathwayData.color : "";

  return (
    <div>
      {pathwayData && (
        <Polyline
          positions={pathwayData.data.map((point) => [
            point.latitude,
            point.longitude,
          ])}
          color={lineColor}
          weight={5}
          opacity={1}
        />
      )}
    </div>
  );
}

export default Pathway
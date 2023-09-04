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
import pathway_J from "../data/pathway/json/J.json";
import pathway_L from "../data/pathway/json/L.json";
import pathway_M from "../data/pathway/json/M.json";
import pathway_N from "../data/pathway/json/N.json";
import pathway_Q from "../data/pathway/json/Q.json";
import pathway_R from "../data/pathway/json/R.json";
import pathway_SI from "../data/pathway/json/SI.json";
import pathway_W from "../data/pathway/json/W.json";

export interface IDataMap {
  data: { latitude: number; longitude: number }[];
  color: string;
}

export interface IPathWayDataMap {
  [key: string]: IDataMap;
}
//Z train shares the same pathway as J, Z is express and runs during a certain time
export const pathwayDataMap: IPathWayDataMap = {
  "1": { data: pathway_1, color: "#EE352E" },
  "2": { data: pathway_2, color: "#EE352E" },
  "3": { data: pathway_3, color: "#EE352E" },
  "4": { data: pathway_4, color: "#00933C" },
  "5": { data: pathway_5, color: "#00933C" },
  "6": { data: pathway_6, color: "#00933C" },
  "7": { data: pathway_7, color: "#B933AD" },
  A: { data: pathway_A, color: "#0039A6" },
  B: { data: pathway_B, color: "#FF6319" },
  C: { data: pathway_C, color: "#0039A6" },
  D: { data: pathway_D, color: "#FF6319" },
  E: { data: pathway_E, color: "#0039A6" },
  F: { data: pathway_F, color: "#FF6319" },
  G: { data: pathway_G, color: "#6CBE45" },
  J: { data: pathway_J, color: "#996633" },
  L: { data: pathway_L, color: "#A7A9AC" },
  M: { data: pathway_M, color: "#FF6319" },
  N: { data: pathway_N, color: "#FCCC0A" },
  Q: { data: pathway_Q, color: "#FCCC0A" },
  R: { data: pathway_R, color: "#FCCC0A" },
  SI: { data: pathway_SI, color: "blue" },
  W: { data: pathway_W, color: "#FCCC0A" },
  Z: { data: pathway_J, color: "brown" },
};

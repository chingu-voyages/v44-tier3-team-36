import { Polyline } from "react-leaflet";
import { pathwayDataMap } from './AllPathWays';
import { IDataMap } from './AllPathWays';

function Pathway(props: { selectedLine: string }): React.ReactNode {
  const { selectedLine } = props;
  //so the pathway is extracted based on the selectedLine, so if someone selects 1 from the sidebar, it goes into the pathwayDataMap and uses this "1": { data: pathway_1, color: "red" }
  //the pathway_1 is the json data of the pathway of the 1 train. In the return the data is mapped through to get the latitude and longitude of the 1 trains pathway.
  const pathwayData: IDataMap = pathwayDataMap[selectedLine] || null;
  const lineColor = pathwayData ? pathwayData.color : "";
  const positions: [number, number][] = pathwayData.data.map((point: { latitude: number, longitude: number }) => [
    point.latitude,
    point.longitude,
  ])

  return (
    <Polyline
      positions={positions}
      color={lineColor}
      weight={5}
      opacity={1}
    />
  );
}

export default Pathway
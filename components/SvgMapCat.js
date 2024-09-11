import * as React from "react";
import Svg, { Path, G, Rect, Polygon } from "react-native-svg";
import mapDataComarques from "../constants/MapaPathsComarques.json";

const MapCat = ({ pathColors, onPathPress }) => {

  return (
    <Svg
    width="400" height="400" viewBox="-30 -30 800 800" xmlns="http://www.w3.org/2000/svg"
     
    >
{Object.keys(mapDataComarques).map((region) => (
  mapDataComarques[region].d ? (
    <Path
      key={region}
      d={mapDataComarques[region].d}
      fill={pathColors[region] || "white"} // Color based on state
      stroke="black" // Outline color for the path
      strokeWidth="1" // Outline width for the path
      onPress={() => onPathPress(region)}
    />
  ) : (
    <Polygon
      key={region}
      points={mapDataComarques[region].points}
      fill={pathColors[region] || "white"} // Color based on state
      stroke="black" // Outline color for the path
      strokeWidth="1" // Outline width for the path
      onPress={() => onPathPress(region)}
    />
  )
))}
            

    </Svg>
  );
};

export default MapCat;

import * as React from "react";
import { Dimensions } from "react-native";
import Svg, { Path, G, Rect } from "react-native-svg";
import mapData from "./../constants/MapaPaths.json";

const SvgAppleLogo = ({ pathColors, onPathPress }) => {

  return (
    <Svg
    width="400" height="400" viewBox="-500 -950 2500 1500" xmlns="http://www.w3.org/2000/svg"
     
    >
{Object.keys(mapData).map((region) => (
  <Path
    key={region}
    d={mapData[region].d}
    fill={pathColors[region]} // Color based on state
    stroke="black" // Outline color for the path
    strokeWidth="2" // Outline width for the path
    onPress={() => onPathPress(region)}
  />
))}
            

    </Svg>
  );
};

export default SvgAppleLogo;

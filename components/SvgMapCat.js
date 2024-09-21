import * as React from "react";
import { Dimensions } from "react-native";
import Svg, { Path, Polygon } from "react-native-svg";  // Importing SVG components
import mapDataComarques from "../constants/MapaPathsComarques.json"; // Your map data

const MapCat = ({ pathColors, onPathPress, minX, minY, width, height }) => {
  console.log('MapCat', minX, minY, width, height);
  return (

      <Svg
        width="100%" height="100%" viewBox={`${minX.current} ${minY.current} ${width} ${height}`} xmlns="http://www.w3.org/2000/svg"
      >
        {Object.keys(mapDataComarques).map((region) => (
          mapDataComarques[region].d ? (
            <Path
              key={region}
              d={mapDataComarques[region].d}  // Path data for the region
              fill={pathColors[region] || "white"}  // Fill color for the region
              stroke="black"  // Outline color
              strokeWidth="1" // Outline thickness
              onPress={() => onPathPress(region)}  // Handle the press event
            />
          ) : (
            <Polygon
              key={region}
              points={mapDataComarques[region].points}  // Points for polygon regions
              fill={pathColors[region] || "white"}      // Fill color for the region
              stroke="black"  // Outline color
              strokeWidth="1" // Outline thickness
              onPress={() => onPathPress(region)}  // Handle the press event
            />
          )
        ))}
      </Svg>
  );
};

export default MapCat;

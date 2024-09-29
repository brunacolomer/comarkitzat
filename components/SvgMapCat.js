import React, { useState } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import Svg, { Path, Polygon } from 'react-native-svg';
import mapDataComarques from "../constants/MapaPathsComarques.json";
import { PanGestureHandler, State } from 'react-native-gesture-handler';

// const { width, height } = Dimensions.get('window');

const MapCat = ({ pathColors, onPathPress }) => {
  const [translateX, setTranslateX] = useState(0);
  const [translateY, setTranslateY] = useState(0);
  const width = 800;
  const height = 800;

  const onGestureEvent = (event) => {
    if (!event || !event.nativeEvent) return;
    const { translationX, translationY } = event.nativeEvent;
    setTranslateX(translationX);
    setTranslateY(translationY);
  };

  const onHandlerStateChange = (event) => {
    event.persist(); // Manté l'esdeveniment en memòria

    if (!event || !event.nativeEvent) return;

    if (event.nativeEvent.oldState === State.ACTIVE) { // Gesture ended
      console.log('Gesture ended');
      console.log('translateX:', translateX);
      console.log('translateY:', translateY);
      console.log('New translation:', event.nativeEvent.translationX, event.nativeEvent.translationY);

      // Acumula el desplaçament anterior amb el nou
      setTranslateX((prev) => prev + event.nativeEvent.translationX);
      setTranslateY((prev) => prev + event.nativeEvent.translationY);
    }
  };

  return (
    <PanGestureHandler
      onGestureEvent={onGestureEvent}
      onHandlerStateChange={onHandlerStateChange}
    >
      <View style={styles.container}>
        <Svg
          width='400'
          height='800'
          viewBox={`${-translateX} ${-translateY} ${width} ${height}`}
        >
          {Object.keys(mapDataComarques).map((region) =>
            mapDataComarques[region].d ? (
              <Path
                key={region}
                d={mapDataComarques[region].d}
                fill={pathColors[region] || 'white'}
                stroke="black"
                strokeWidth="1"
                onPress={() => onPathPress(region)}
              />
            ) : (
              <Polygon
                key={region}
                points={mapDataComarques[region].points}
                fill={pathColors[region] || 'white'}
                stroke="black"
                strokeWidth="1"
                onPress={() => onPathPress(region)}
              />
            )
          )}
        </Svg>
      </View>
    </PanGestureHandler>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default MapCat;

import React, { useRef, useState } from 'react';
import { View, PanResponder, Dimensions, GestureResponderEvent, PanResponderGestureState } from 'react-native';
import Svg, { Circle } from 'react-native-svg';

const PlayRoom = () => {
  const [scale, setScale] = useState(1);
  const pinchStartDistance = useRef(0).current;

  const { width, height } = Dimensions.get('window');

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: (e: GestureResponderEvent, gestureState: PanResponderGestureState) => {
        if (gestureState.numberActiveTouches === 2) {
          const [touch1, touch2] = e.nativeEvent.touches;
          if (touch1 && touch2) {
            pinchStartDistance.current = Math.sqrt(
              Math.pow(touch2.pageX - touch1.pageX, 2) + Math.pow(touch2.pageY - touch1.pageY, 2)
            );
            console.log('Pinch started, initial distance:', pinchStartDistance.current);
          }
        }
      },
      onPanResponderMove: (e: GestureResponderEvent, gestureState: PanResponderGestureState) => {
        if (gestureState.numberActiveTouches === 2) {
          const [touch1, touch2] = e.nativeEvent.touches;
          if (touch1 && touch2) {
            const newDistance = Math.sqrt(
              Math.pow(touch2.pageX - touch1.pageX, 2) + Math.pow(touch2.pageY - touch1.pageY, 2)
            );

            // Avoid division by zero and check for valid distance
            if (pinchStartDistance.current > 0) {
              const newScale = newDistance / pinchStartDistance.current;
              console.log('Pinch detected, new scale:', newScale);

              if (!isNaN(newScale) && newScale > 0) {
                setScale(newScale);
              }
            }
          }
        }
      },
      onPanResponderRelease: () => {
        console.log('Gesture ended');
      },
    })
  ).current;

  return (
    <View
      {...panResponder.panHandlers}
      style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' }}
    >
      <Svg
        width={width} height={height} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"
        style={{ transform: [{ scale }] }}  // Apply the scale transformation
      >
        <Circle cx="50" cy="50" r="40" fill="pink" />
      </Svg>
    </View>
  );
};

export default PlayRoom;

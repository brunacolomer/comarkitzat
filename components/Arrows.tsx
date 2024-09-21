import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const ArrowControls = ({ onArrowPress }) => {
  return (
    <View style={styles.container}>
      {/* Fletxa amunt */}
      <TouchableOpacity style={styles.arrowButton} onPress={() => onArrowPress('up')}>
        <Text style={styles.arrow}>↑</Text>
      </TouchableOpacity>
      
      <View style={styles.row}>
        {/* Fletxa esquerra */}
        <TouchableOpacity style={styles.arrowButton} onPress={() => onArrowPress('left')}>
          <Text style={styles.arrow}>←</Text>
        </TouchableOpacity>

        {/* Fletxa dreta */}
        <TouchableOpacity style={styles.arrowButton} onPress={() => onArrowPress('right')}>
          <Text style={styles.arrow}>→</Text>
        </TouchableOpacity>
      </View>
      
      {/* Fletxa avall */}
      <TouchableOpacity style={styles.arrowButton} onPress={() => onArrowPress('down')}>
        <Text style={styles.arrow}>↓</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
  },
  arrowButton: {
    padding: 20,
  },
  arrow: {
    fontSize: 40,
  },
});

export default ArrowControls;

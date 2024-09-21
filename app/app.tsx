import React, {useState, useRef} from 'react';
import { View, Modal, Pressable, StyleSheet, Text, TextInput, TouchableWithoutFeedback, Dimensions } from 'react-native';
import MapCat from '../components/SvgMapCat';
import { usePathColors, useFriends, useModal } from '../hooks/useCustomHooks';
import Colors from '../constants/Colors';
import Texts from '../constants/Texts';
import PlayRoom from '../components/SvgPlayRoom';
import ArrowControls from '../components/Arrows';
import { PanResponder } from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler';
import { GestureHandlerRootView } from 'react-native-gesture-handler';


export default function App() {
  const [viewBox, setViewBox] = useState({ minX: 0, minY: 0, width: 500, height: 500 });
  const pan = useRef({ x: 0, y: 0 }).current;
  const [alert, setAlert] = React.useState(false);
  const [friends, setFriends] = useFriends();
  const [width, setWidth] = React.useState(800);
  const [height, setHeight] = React.useState(800);
  const minX = useRef(-30);
  const minY = useRef(-30);

  const handlePan = (event) => {
    const { translationX, translationY } = event.nativeEvent;

    // Actualitzar el referent
    minX.current -= translationX / 20;
    minY.current -= translationY / 20;
  };



  const pathColors = usePathColors(friends);
  const {
    modalVisible,
    setModalVisible,
    modalText,
    setModalText,
    selectedPathName,
    setSelectedPathName,
    text,
    onChangeText,
    textInputRef,
    dismissModal,
  } = useModal();

  const handlePathPress = (pathName) => {
    setModalText(Texts[pathName]);
    onChangeText(friends[pathName]);
    setSelectedPathName(pathName);
    setModalVisible(true);
  };

  const removeFriendship = () => {
    setModalVisible(!modalVisible);
    setFriends(prevFriends => ({
      ...prevFriends,
      [selectedPathName]: '',
    }));
  };

  const addFriendship = () => {
    if(text === '') {
      setAlert(true);
      return;
    }
    setModalVisible(!modalVisible);

    setFriends(prevFriends => ({
      ...prevFriends,
      [selectedPathName]: text,
    }));
  };

  const addEditText = !(selectedPathName in friends) || friends[selectedPathName] === ''
    ? Texts.addFriendShipText
    : Texts.editFriendShipText;


  const handleSVGMove = (direction:string) => {
    console.log('Direction:', direction);
  
    switch (direction) {
      case 'up':
        setMinY(minY + 10);
        break;
      case 'down':
        setMinY(minY - 10);
        break;
      case 'left':
        setMinX(minX + 10);
        break;
      case 'right':
        setMinX(minX - 10);
        break;
      default:
        break;
    }
    };
    

  return (
    <PanGestureHandler onGestureEvent={handlePan}>
    <View style={styles.container}>
      <Modal
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(!modalVisible)}
      >
        <TouchableWithoutFeedback onPress={dismissModal}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>{modalText}</Text>
              <TextInput
                ref={textInputRef}
                style={styles.input}
                onChangeText={onChangeText}
                value={text}
                placeholder="Jaume Mellat"
              />
              <View style={styles.buttonContainer}>
                {selectedPathName in friends && friends[selectedPathName] !== '' && (
                  <Pressable style={[styles.button, styles.buttonDelete]} onPress={removeFriendship}>
                    <Text style={styles.textStyle}>{Texts.removeFriendShipText}</Text>
                  </Pressable>
                )}
                <Pressable style={[styles.button, styles.buttonClose]} onPress={addFriendship}>
                  <Text style={styles.textStyle}>{addEditText}</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
      <MapCat onPathPress={handlePathPress} pathColors={pathColors} minY={minY} minX={minX} height={height} width={width}/>
      <View style={styles.arrowContainer}>
        <ArrowControls onArrowPress={handleSVGMove}/>
      </View>
    </View>
    </PanGestureHandler>
  );
}

const styles = StyleSheet.create({
  arrowContainer: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    margin: 5,
  },
  buttonDelete: {
    backgroundColor: '#f00',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 0.5,
    padding: 10,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
    borderBottomLeftRadius: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
  },
});

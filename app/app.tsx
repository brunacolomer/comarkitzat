import React, {useState, useRef, useCallback, thrott} from 'react';
import { View, Modal, Pressable, StyleSheet, Text, TextInput, TouchableWithoutFeedback, Dimensions } from 'react-native';
import MapCat from '../components/SvgMapCat';
import { usePathColors, useFriends, useModal } from '../hooks/useCustomHooks';
import Colors from '../constants/Colors';
import Texts from '../constants/Texts';



export default function App() {
  const [viewBox, setViewBox] = useState({ minX: 0, minY: 0, width: 500, height: 500 });
  const pan = useRef({ x: 0, y: 0 }).current;
  const [_, forceUpdate] = React.useState(false);
  const [alert, setAlert] = React.useState(false);
  const [friends, setFriends] = useFriends();
  const [width, setWidth] = React.useState(800);
  const [height, setHeight] = React.useState(800);
  const minX = useRef(-30);
  const minY = useRef(-30);




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
    

  return (
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
      <MapCat onPathPress={handlePathPress} pathColors={pathColors}/>
    </View>
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

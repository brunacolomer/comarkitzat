import { Text, View, TouchableWithoutFeedback, TouchableOpacity, Alert, Modal, Pressable, StyleSheet, TextInput } from "react-native";
import SvgAppleLogo from "../components/Apple";
import React, { useMemo, useState } from "react";
import Colors from "../constants/Colors"
import Texts from "../constants/Texts"

export default function Index() {
  const [text, onChangeText] = useState('Jaume Mellat');
  const [modalVisible, setModalVisible] = useState(false);
  const [modalText, setModalText] = useState('');
  const generateInitialPathColors = () => {
    const initialPathColors: { [key: string]: string } = {};
    Object.keys(Colors).forEach((key) => {
      if (Colors[key]?.unfriend) {
        initialPathColors[key] = Colors[key].unfriend;
      }
    });
    return initialPathColors;
  };

  const generateInitialFriendsNames = () => {
    const initialFriendsNames: { [key: string]: string } = {};
    Object.keys(Texts).forEach((key) => {
      if (Texts[key]) {
        initialFriendsNames[key] = "";
      }
    });
    return initialFriendsNames;
  };

  const [pathColors, setPathColors] = useState(generateInitialPathColors);

  const [friends, setFriends] = useState(generateInitialFriendsNames);

  const [selectedPathName, setSelectedPathName] = useState('');

  console.log('colors', Colors);
  const handlePathPress = (pathName: string) => {
    setModalText(Texts[pathName]);
    onChangeText(friends[pathName] || 'Jaume Mellat');
    setSelectedPathName(pathName);
    setModalVisible(true);
    console.log(`Presed ${pathName}`);
  }

  const removeFriendship = () => {
    const pathName = selectedPathName;
    setModalVisible(!modalVisible);
    setFriends(prevFriends => ({
      ...prevFriends,
      [pathName]: '',
    }));
    setPathColors(prevColors => ({
      ...prevColors,
      ...{
        [pathName]: Colors[pathName].unfriend,
      },
    }));
  }

  const addFriendship = () => {
    const pathName = selectedPathName;
    setModalVisible(!modalVisible);
    setFriends(prevFriends => ({
      ...prevFriends,
      [pathName]: text,
    }));
    setPathColors(prevColors => ({
      ...prevColors,
      ...{
        [pathName]: Colors[pathName].friend,
      },
    }));
  }
  const addEditText = useMemo(() => {
    console.log('addEditText');
    console.log(friends[selectedPathName]);
    return friends[selectedPathName] === '' ? Texts.addFriendShipText : Texts.editFriendShipText;
  }, [friends, selectedPathName]);


  console.log('rendering');
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
      }}
    > 
    <Modal
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>{modalText}</Text>
            <TextInput
        onChangeText={onChangeText}
        value={text}
      />
      <View style={{flexDirection: 'row'}}>
            
            {friends[selectedPathName] !== '' && (
                <Pressable
                  style={[styles.button, styles.buttonDelete]}
                  onPress={removeFriendship}>
                  <Text style={styles.textStyle}>{Texts.removeFriendShipText}</Text>
                </Pressable>
              )}
              <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={addFriendship}>
              <Text style={styles.textStyle}>{addEditText}</Text>
            </Pressable>
            </View>
            <View/>
          </View>
        </View>
      </Modal>
        <SvgAppleLogo onPathPress={handlePathPress} pathColors={pathColors} />        
    </View>
  );
}
const styles = StyleSheet.create({
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
  buttonOpen: {
    backgroundColor: '#F194FF',
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
});

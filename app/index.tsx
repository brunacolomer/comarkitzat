import { Text, View, TouchableWithoutFeedback, TouchableOpacity, Alert, Modal, Pressable, StyleSheet, TextInput } from "react-native";
import  SvgProvinciasDeCatalunya  from "../components/Provincies";
import SvgAppleLogo from "../components/Apple";
import React, { useState } from "react";
import Colors from "../constants/RegionColors.json"

export default function Index() {
  const [text, onChangeText] = useState('Jaume Mellat');
  const [modalVisible, setModalVisible] = useState(false);
  const [modalText, setModalText] = useState('');
  console.log(Colors.barcelona.unfriend)
  const [color, setColor] = useState('blue');
  const [pathColors, setPathColors] = useState({
    tarragona: Colors.tarragona.unfriend,
    lleida: Colors.lleida.unfriend,
    girona: Colors.girona.unfriend,
    barcelona: Colors.barcelona.unfriend,
  });
  const [friendText, setFriendText] = useState('');

  const [friends,setFriends] = useState({
    tarragona: '',
    lleida: '',
    girona: '',
    barcelona: '',
  });

  const [selectedPathName, setSelectedPathName] = useState('');

  const handlePathPress = (pathName: string) => {
    setModalText(pathName);
    onChangeText(friends[pathName] || 'Jaume Mellat');
    setSelectedPathName(pathName);
    setModalVisible(true);
    console.log(`Presed ${pathName}`);
    // Handle path-specific logic here

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
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={addFriendship}>
              <Text style={styles.textStyle}>Afegir amistat</Text>
            </Pressable>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={removeFriendship}>
              <Text style={styles.textStyle}>Afegir enemic</Text>
            </Pressable>
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
    padding: 35,
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
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
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

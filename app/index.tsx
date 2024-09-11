import { Text, View, TouchableWithoutFeedback, TouchableOpacity, Alert, Modal, Pressable, StyleSheet, TextInput } from "react-native";
import MapCat from "../components/SvgMapCat";
import React, { useEffect, useMemo, useState } from "react";
import Colors from "../constants/Colors";
import Texts from "../constants/Texts";
import AsyncStorage from '@react-native-async-storage/async-storage';

const generateInitialPathColors = async (friendList: { [key: string]: string }) => {
  const initialPathColors: { [key: string]: string } = {};
  console.log('friendslist', friendList);

  Object.keys(Colors).forEach((key) => {
    if (Colors[key]?.unfriend) {
      console.log('Colors:', key);
      if (key in friendList && friendList[key] !== '')  {
        initialPathColors[key] = Colors[key].friend;
    } else {
      initialPathColors[key] = Colors[key].unfriend;
    }
  }
  });
  return initialPathColors;
};

const generateInitialFriendsNames = async () => {
  const storedFriendsNames = await AsyncStorage.getItem('mapFriends');
if (storedFriendsNames) {
  const parsedFriendsNames = JSON.parse(storedFriendsNames);
  if (Object.keys(parsedFriendsNames).length > 0) {
    console.log('Stored friends:', parsedFriendsNames);
    return parsedFriendsNames;
  }
}

const initialFriendsNames: { [key: string]: string } = {};

return initialFriendsNames;
  }


export default function Index() {
  const [text, onChangeText] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [modalText, setModalText] = useState('');
  const [pathColors, setPathColors] = useState<{ [key: string]: string }>({});
  const [friends, setFriends] = useState<{ [key: string]: string }>({});
  const [selectedPathName, setSelectedPathName] = useState('');

  useEffect(() => {
    const initializeData = async () => {
      const initialFriends = await generateInitialFriendsNames();
      const initialColors = await generateInitialPathColors(initialFriends);
      setFriends(initialFriends);
      setPathColors(initialColors);
    };

    initializeData();

    return () => {
      console.log('Cleaning up...');
      // Cleanup
      AsyncStorage.setItem('mapFriends', JSON.stringify(friends)).catch((error) => {
        console.error('Failed to save friends to AsyncStorage:', error);
      });

    };
  }, []);

  useEffect(() => {
    console.log('Friends:', friends);
    
    const saveFriendsToStorage = async () => {
      try {
        await AsyncStorage.setItem('mapFriends', JSON.stringify(friends));
        console.log('Friends saved to AsyncStorage successfully.');
        
        const storedFriends = await AsyncStorage.getItem('mapFriends');
        if (storedFriends) {
          console.log('Stored friendsssss:', JSON.parse(storedFriends));
        } else {
          console.log('No friends found in AsyncStorage.');
        }
      } catch (error) {
        console.error('Failed to save friends to AsyncStorage:', error);
      }
    };

  
    saveFriendsToStorage();
  }, [friends]);

  const handlePathPress = (pathName: string) => {
    setModalText(Texts[pathName]);
    onChangeText(friends[pathName]);
    setSelectedPathName(pathName);
    setModalVisible(true);
  };

  const removeFriendship = () => {
    const pathName = selectedPathName;
    setModalVisible(!modalVisible);
    setFriends(prevFriends => ({
      ...prevFriends,
      [pathName]: '',
    }));
    setPathColors(prevColors => ({
      ...prevColors,
      [pathName]: Colors[pathName].unfriend,
    }));
  };

  const addFriendship = () => {
    const pathName = selectedPathName;
    setModalVisible(!modalVisible);
    setFriends(prevFriends => ({
      ...prevFriends,
      [pathName]: text,
    }));
    setPathColors(prevColors => ({
      ...prevColors,
      [pathName]: Colors[pathName].friend,
    }));
  };

  const addEditText = useMemo(() => {
    return !(selectedPathName in friends) || friends[selectedPathName] === '' 
      ? Texts.addFriendShipText 
      : Texts.editFriendShipText;
  }, [friends, selectedPathName]);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' }}>
      <Modal
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>{modalText}</Text>
            <TextInput style ={styles.input} onChangeText={onChangeText} value={text} placeholder="Jaume Mellat" />
            <View style={{ flexDirection: 'row' }}>
              {selectedPathName in friends && friends[selectedPathName ] !== '' && (
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
          </View>
        </View>
      </Modal>
      <MapCat onPathPress={handlePathPress} pathColors={pathColors} />
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
});

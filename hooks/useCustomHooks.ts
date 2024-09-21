import { useState, useEffect, useRef } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Colors from '../constants/Colors';
import Texts from '../constants/Texts';

const usePathColors = (friends) => {
  const [pathColors, setPathColors] = useState({});

  useEffect(() => {
    const generateInitialPathColors = async () => {
      const initialPathColors = {};
      Object.keys(Colors).forEach((key) => {
        if (Colors[key]?.unfriend) {
          if (key in friends && friends[key] !== '') {
            initialPathColors[key] = Colors[key].friend;
          } else {
            initialPathColors[key] = Colors[key].unfriend;
          }
        }
      });
      setPathColors(initialPathColors);
    };

    generateInitialPathColors();
  }, [friends]);

  return pathColors;
};

const useFriends = () => {
  const [friends, setFriends] = useState({});

  useEffect(() => {
    const initializeFriends = async () => {
      const storedFriendsNames = await AsyncStorage.getItem('mapFriends');
      const initialFriends = storedFriendsNames ? JSON.parse(storedFriendsNames) : {};
      setFriends(initialFriends);
    };

    initializeFriends();
  }, []);

  useEffect(() => {
    AsyncStorage.setItem('mapFriends', JSON.stringify(friends)).catch((error) => {
      console.error('Failed to save friends to AsyncStorage:', error);
    });
  }, [friends]);

  return [friends, setFriends];
};

const useModal = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalText, setModalText] = useState('');
  const [selectedPathName, setSelectedPathName] = useState('');
  const [text, onChangeText] = useState('');
  const textInputRef = useRef(null);

  const dismissModal = () => {
    if (textInputRef.current?.isFocused()) {
      textInputRef.current?.blur();
    } else {
      setModalVisible(!modalVisible);
    }
  };

  return {
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
  };
};

export { usePathColors, useFriends, useModal };

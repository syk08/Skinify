import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

const CameraIcon = ({ onPress }) => {

  const pickImage = async () => {
    // Ask the user for the permission to access the media library
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("You've refused to allow this app to access your photos!");
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    //console.log(result);
    if (!result.canceled) {
      onPress(result.assets[0].uri);
    }
  };

  return (
    <TouchableOpacity onPress={pickImage} style={styles.cameraContainer}>
      <Ionicons name="image" size={30} color="#ffff" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cameraContainer: {
    marginBottom : 40,
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#337cbd',
    borderRadius: 50,
    padding:  10,
  },
});

export default CameraIcon;




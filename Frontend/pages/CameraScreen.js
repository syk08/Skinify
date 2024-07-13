import React, { useState, useEffect,useRef } from 'react';
import { StyleSheet, View, Image, ImageBackground,TouchableOpacity } from 'react-native';
import { Card, List, Text } from '@ui-kitten/components';
import CameraIcon from './components/Camera';
import {uri} from './components/info';



export default function CameraScreen({navigation}) {
    const [image, setImage] = useState(null);
  

  useEffect(() => {
    if (image != null) {
        
      const formData = new FormData();
      formData.append('image', {
        uri: image,
        name: 'image.jpg',
        type: 'image/jpeg',
      });
      
       
      fetch(`http://${uri}:8000/classify`, {
        
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
        .then((response) => response.json())
        .then((data) => {
         // console.log("In");
          // console.log(data);
          navigation.navigate('Details', { disease: data });
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [image,navigation]);

  const handleCameraPress = () => {
    console.log('Camera button pressed');
    // Add logic to capture image
  };

  const handleGalleryPress = () => {
    console.log('Gallery button pressed');
    // Add logic to open gallery
  };


  return (    
     <View style={styles.container}>
    {/* Camera Preview Placeholder */}
    <View style={styles.cameraPreview} />

    {/* Camera Button */}
    <TouchableOpacity style={styles.cameraButton} onPress={handleCameraPress}>
      <View style={styles.cameraBody}>
        <View style={styles.cameraLens} />
        <View style={styles.cameraFlash} />
      </View>
    </TouchableOpacity>

   
  

    {/* Capture Button */}
    <TouchableOpacity style={styles.captureButton}>
      <View style={styles.captureInnerButton} />
    </TouchableOpacity>
    <CameraIcon onPress={setImage}/>
  </View>
    
   
   
   
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraPreview: {
    flex: 1,
    width: '100%',
    backgroundColor: '#333', // Placeholder color for camera preview
  },
  cameraButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: '#FFF',
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraBody: {
    width: 60,
    height: 60,
    backgroundColor: '#000',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraLens: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFF',
    marginBottom: 5,
  },
  cameraFlash: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FFF',
    position: 'absolute',
    bottom: 5,
    right: 5,
  },
  galleryButton: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    padding: 10,
    borderRadius: 20,
  },
  captureInnerButton: {
    backgroundColor: '#FF6347',
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  captureButton: {
    position: 'absolute',
    bottom: 20,
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
});

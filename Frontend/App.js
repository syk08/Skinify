import React, {useEffect, useState, useRef} from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ListCustomItemShowcase } from './pages/Home';
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as eva from '@eva-design/eva';
import { ApplicationProvider } from '@ui-kitten/components'; 
import CameraIcon from './pages/components/Camera';
import History from './pages/History';
import * as ImagePicker from 'expo-image-picker';
import { createStackNavigator } from '@react-navigation/stack';
import DiseaseDetails from './pages/DiseaseDetails';
import WelcomeScreen from './pages/WelcomeScreen';
import LoginScreen from './pages/LoginScreen';
import CameraScreen from './pages/CameraScreen';
import {uri} from './pages/components/info';

//const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function HomeScreen({ navigation }) {
  return (
    <View >
      <ListCustomItemShowcase navigation={navigation} />
    </View>
  );
}

function HomeContainer({ navigation, route }) {
  return (
    <Stack.Navigator>
    <Stack.Screen name='Home' component={HomeScreen} initialParams={route.params}/>
    <Stack.Screen name='Detail' component={DiseaseDetails}/>
  </Stack.Navigator>
  )
}

export default function App() {
  const [image, setImage] = useState(null);
  const navigationRef = useRef(null);

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
          navigationRef.current.navigate('Detail', { disease: data });
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [image,setImage]);
  return (
    <ApplicationProvider {...eva} theme={eva.light}>
      <NavigationContainer ref={navigationRef}>
        {/* Render WelcomeScreen initially */}
        <Stack.Navigator initialRouteName="Welcome">
          <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: true, headerTitle: '', }} />
          <Stack.Screen name="Detail" component={HomeScreen} options={{ headerShown: true, headerTitle: 'Disease Details',}} />
          <Stack.Screen name="Details" component={DiseaseDetails} options={{ headerShown: true, headerTitle: 'Detected Disease',}} />
          
          <Stack.Screen name="Camera" component={CameraScreen} options={{ headerShown: true, headerTitle: '',headerTransparent: true}} />
          <Stack.Screen name="record" component={History} options={{ headerShown: true, headerTitle: 'Detection History',}} />
        </Stack.Navigator>
        
      </NavigationContainer>
    </ApplicationProvider>
  );

}

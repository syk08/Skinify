import Logo from '../pages/components/Logo'
import React, { useState, useEffect,useRef } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView,ImageBackground,TouchableOpacity} from 'react-native';
import { initializeApp } from '@firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from '@firebase/auth';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import CameraIcon from './components/Camera';

const firebaseConfig = {
  apiKey: "AIzaSyD4k7XjI3BJ5LassPzhM26fBmpiJ6gLXGk",
  authDomain: "madfinal-38636.firebaseapp.com",
  projectId: "madfinal-38636",
  storageBucket: "madfinal-38636.appspot.com",
  messagingSenderId: "950782087179",
  appId: "1:950782087179:web:d5006b1eb000b65b93f70e"
};

const app = initializeApp(firebaseConfig);

const AuthScreen = ({ email, setEmail, password, setPassword, isLogin, setIsLogin, handleAuthentication }) => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.authContainer}>
        <Logo />
        <Text style={styles.title}>{isLogin ? 'Sign In' : 'Sign Up'}</Text>

        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="Email"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          placeholder="Password"
          secureTextEntry
        />
        <View style={styles.buttonContainer}>
          <Button title={isLogin ? 'Sign In' : 'Sign Up'} onPress={handleAuthentication} color="#3498db" />
        </View>

        <View style={styles.bottomContainer}>
          <Text style={styles.toggleText} onPress={() => setIsLogin(!isLogin)}>
            {isLogin ? 'Need an account? Sign Up' : 'Already have an account? Sign In'}
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};
export default function LoginScreen({ navigation }) {

  
const AuthenticatedScreen = ({ user, handleAuthentication}) => {
  return (
    <View style={styles.auth2Container}>
      <Text style={styles.title2}>Welcome, {user.email}</Text>
      

      {/* ListView */}
      <View style={styles.listView}>
      <TouchableOpacity onPress={() => navigation.navigate('Detail')}>
  <Text style={styles.listItem}>Disease Information</Text>
</TouchableOpacity>
<TouchableOpacity onPress={() => navigation.navigate('record')}>
        <Text style={styles.listItem}>Detection History</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Camera') }>
        <Text style={styles.listItem}>Detect Disease</Text>
        </TouchableOpacity>
        <Text style={styles.listItem}>Consult with AI physician</Text>
      </View>

      <Button title="Logout" onPress={handleAuthentication} color='#540354' style={styles.button} />
    </View>
  );
};


  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null); // Track user authentication state
  const [isLogin, setIsLogin] = useState(true);

  const auth = getAuth(app);
  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, [auth]);


  const handleAuthentication = async () => {
    try {
      if (user) {
        // If user is already authenticated, log out
        console.log('User logged out successfully!');
        await signOut(auth);
      } else {
        // Sign in or sign up
        if (isLogin) {
          // Sign in
          await signInWithEmailAndPassword(auth, email, password);
          console.log('User signed in successfully!');
          console.log(auth.currentUser.uid);
        } else {
          // Sign up
          await createUserWithEmailAndPassword(auth, email, password);
          console.log('User created successfully!');
        }
      }
    } catch (error) {
      console.error('Authentication error:', error.message);
    }
  };

  return (
    <ImageBackground
      source={require('../assets/bg_2.png')}
      resizeMode="repeat"
      style={styles.background}//resizeMode="repeat"
      
    >
    <ScrollView contentContainerStyle={styles.container}>
      {user ? (
        // Show user's email if user is authenticated
        <AuthenticatedScreen user={user} handleAuthentication={handleAuthentication} />
      ) : (
        // Show sign-in or sign-up form if user is not authenticated
        <AuthScreen
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          isLogin={isLogin}
          setIsLogin={setIsLogin}
          handleAuthentication={handleAuthentication}
        />
      )}
    </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width:'100%',
    backgroundColor: '#fff', // Ensures the background image covers the entire screen
  },
  
  
  
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    //backgroundColor: '#fff',
  },
  authContainer: {
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  buttonContainer: {
    width: '100%',
    marginBottom: 20,
  },
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  toggleText: {
    color: Colors.primary,
  },
 
  title2: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'left', 
  },
 
  listView: {
    alignItems: 'center',
    marginBottom: 90,
    marginTop: 50,
  },
  listItem: {
    width: 300,
    backgroundColor: '#f0e6f0',
    borderRadius: 8,
    padding: 16,
    fontWeight:'bold',
    color:'#5c065c',
    marginBottom: 16,
    marginTop:16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  auth2Container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    marginTop: 'auto', 
    color: '#aaa',
    width: '100%', 
  },
});

import { Color } from 'paper/dist/paper-core';
import React from 'react'
import { ImageBackground, StyleSheet, KeyboardAvoidingView, View} from 'react-native'


//import { theme } from './theme'

export default function picture({ children }) {
  return (
    <ImageBackground
      source={require('../../assets/bg_dot.png')}
      resizeMode="repeat"
      style={styles.background}
    >
      <View style={styles.container}>
        {children}

      </View>
      {/* <KeyboardAvoidingView style={styles.container} behavior="padding">
      </KeyboardAvoidingView> */}
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    backgroundColor: '#FFFFFF',
  },
  container: {
    flex: 1,
    padding: 20,
    width: '100%',
    maxWidth: 340,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
})

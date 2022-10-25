import React, { useEffect, useState } from 'react'
//import {Navig} from '@react-navigation/native'
import { View, Text, StyleSheet, Dimensions, SafeAreaView } from 'react-native'
import * as Font from 'expo-font';
//redux config
//configuring redux store
import ReduxThunk from "redux-thunk"
import { combineReducers, createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux"
import { userAuthReducer } from "./store/reducer/appStorage"

//importing component
import Screen from "./config";





export default function App() {
  const [isLoading, setIsLoading] = useState(true)

  //redux store setup
  const rootReducer = combineReducers({
    userAuth: userAuthReducer,
  })
  //creating store
  const store = createStore(rootReducer, applyMiddleware(ReduxThunk))

  let loadFonts = async () => {

    await Font.loadAsync({
      'ABeeZee': require('./assets/fonts/ABeeZee-Regular.ttf'),
      'Poppins': require('./assets/fonts/Poppins-Medium.ttf'),
    })
  }


  useEffect(() => {
    let isSuscribe = true
    loadFonts().then(() => {
      if (isSuscribe) {
        setIsLoading(false)
      }
    }).catch((err) => {
      if (isSuscribe) {
        //set error
      }
    })
    return () => {
      isSuscribe = false
    }
  }, [loadFonts])



  if (isLoading) {

    return (<SafeAreaView style={styles.screen}>
      <View style={styles.container}>
        <Text style={styles.logo}>coincapp</Text>
      </View>
    </SafeAreaView>)
  }
  return (
    <Provider store={store}>

      <Screen />

    </Provider >

  );
}


let styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#1652f0",
    zIndex: 10
  },
  container: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  logo: {
    color: '#fff',
    fontSize: 35,

  }


})
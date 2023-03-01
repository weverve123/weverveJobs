
import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import AppStack from './navigation/AppStack';
import AuthStack from './navigation/AuthStack';
import SplashScreen from 'react-native-splash-screen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DrawerNavigator from './navigation/DrawerNavigator';
import auth from '@react-native-firebase/auth';
// import DrawerNavigator from './navigation/AuthStack';

const root =createNativeStackNavigator();

export default function App() {
 
  const [isUserLogin,setIsUserLogin]=useState(false)
     
   useEffect(()=>{
    SplashScreen.hide();
   },[])
   
   auth().onAuthStateChanged(user =>{
    if(user !== null){
      setIsUserLogin(true);
    }
   
  })
   
   const RootNavigator =()=>{
    
     return(
      <root.Navigator initialRouteName={!isUserLogin ? "Auth":"Drawer"} screenOptions={{
        headerShown: false
      }}>
      
        <root.Screen name='Auth' component={AuthStack}/>
        <root.Screen name='Drawer' component={DrawerNavigator}/>
     </root.Navigator>   
     )   
   }

  return (
    <NavigationContainer>
       <RootNavigator/>
    </NavigationContainer>
  )
}
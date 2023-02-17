
import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import AppStack from './navigation/AppStack';
import AuthStack from './navigation/AuthStack';
import SplashScreen from 'react-native-splash-screen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DrawerNavigator from './navigation/DrawerNavigator';
// import DrawerNavigator from './navigation/AuthStack';

const root =createNativeStackNavigator();

export default function App() {
 
   useEffect(()=>{
    SplashScreen.hide();
   },[])
   
   const RootNavigator =()=>{
     return(
      <root.Navigator  screenOptions={{
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
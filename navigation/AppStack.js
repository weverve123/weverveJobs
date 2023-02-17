import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../src/components/Home';
import ForgotPassword from '../src/components/ForgotPassword';
import Contact from '../src/components/Contact';
import UserDetails from '../src/components/UserDetails';
import EditProfile from '../src/components/EditProfile';
// import logout from '../src/components/logout';

const Stack = createNativeStackNavigator();

export default function AppStack() {
  return (
    <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} 
         options={{headerShown:false}}
        />
        <Stack.Screen name="Contact" component={Contact}/>
        <Stack.Screen name="UserDetails" component={UserDetails}/> 
        <Stack.Screen name="EditProfile" component={EditProfile}/>  
      </Stack.Navigator>
  )
}
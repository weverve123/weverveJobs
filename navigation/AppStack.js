import { View, Text } from 'react-native'
import React from 'react'
import SignUp from '../src/components/SignUp'
import Login from '../src/components/Login'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../src/components/Home';
import ForgotPassword from '../src/components/ForgotPassword';
// import logout from '../src/components/logout';

const Stack = createNativeStackNavigator();

export default function AppStack() {
  return (
    <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
      
      </Stack.Navigator>
  )
}
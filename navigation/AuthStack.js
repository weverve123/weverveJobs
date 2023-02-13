import { View, Text } from 'react-native'
import React from 'react'
import Login from '../src/components/Login';
import SignUp from '../src/components/SignUp';
import Logout from '../src/components/Logout';
import ForgotPassword from '../src/components/ForgotPassword';
// import AuthStack from './AuthStack';
import CustomDrower from '../src/components/CustomDrower';
// import Home from '../src/components/Home';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../src/components/Home';
import AppStack from './AppStack';


const Auth =createNativeStackNavigator();

export default function AuthStack() {
  return (

    <Auth.Navigator>
        <Auth.Screen name="SignUp" component={SignUp}/>
        <Auth.Screen name="Login" component={Login} />
        <Auth.Screen name="Home" component={Home} />
        <Auth.Screen name="ForgotPassword" component={ForgotPassword} /> 
    </Auth.Navigator>
  )
}

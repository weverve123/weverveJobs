import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../src/components/Home';
import ForgotPassword from '../src/components/ForgotPassword';
import Contact from '../src/components/Contact';
import UserDetails from '../src/components/UserDetails';
import EditProfile from '../src/components/EditProfile';
import UserDocument from '../src/components/UserDocument';
// import logout from '../src/components/logout';
import Authenticate from '@react-native-firebase/auth'


const Stack = createNativeStackNavigator();

export default function AppStack() {
  return (
    <Stack.Navigator>
      
        <Stack.Screen name="Home" component={Home} 
         options={{headerShown:false}}
        />
        <Stack.Screen name="Contact" component={Contact}/>
        <Stack.Screen name="UserDetails" component={UserDetails}
         options={{
          title:"User Details",
          headerStyle: {
            backgroundColor: '#89b1d9'
          },

         }}
        /> 
        <Stack.Screen name="EditProfile" component={EditProfile}
          options={{
            title:"Edit Profile",
            headerStyle: {
              backgroundColor: '#89b1d9'
            },
  
           }}
        /> 
        <Stack.Screen name="UserDocument" component={UserDocument}/>   
      </Stack.Navigator>
  )
}
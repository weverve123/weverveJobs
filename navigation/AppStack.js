import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../src/components/Home';
import ForgotPassword from '../src/components/ForgotPassword';
import Contact from '../src/components/AboutUs';
import UserDetails from '../src/components/UserDetails';
import EditProfile from '../src/components/EditProfile';
import UserDocument from '../src/components/UserDocument';
// import logout from '../src/components/logout';
import Authenticate from '@react-native-firebase/auth'
import AboutUs from '../src/components/AboutUs';


const Stack = createNativeStackNavigator();

export default function AppStack() {
  return (
    <Stack.Navigator>
      
        <Stack.Screen name="Home" component={Home} 
         options={{headerShown:false}}
        />
        <Stack.Screen name="About" component={AboutUs}/>
        <Stack.Screen name="UserDetails" component={UserDetails}
         options={{
          title:"User Details",
          headerStyle: {
            backgroundColor: '#8ecae6'
          },

         }}
        /> 
        <Stack.Screen name="EditProfile" component={EditProfile}
          options={{
            title:"Edit Profile",
            headerStyle: {
              backgroundColor: '#8ecae6'
            },
  
           }}
        /> 
        <Stack.Screen name="UserDocument" component={UserDocument}/>   
      </Stack.Navigator>
  )
}
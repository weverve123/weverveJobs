import { View, Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AntDesign from "react-native-vector-icons/AntDesign"
import Home from '../src/components/Home';
import Logout from '../src/components/Logout';
import Login from '../src/components/Login';
import Entypo from "react-native-vector-icons/Entypo";
import AppStack from './AppStack';
import UserProfile from '../src/components/UserProfile';

const Tab = createBottomTabNavigator();
export default function TabStack({}) {
  return (
    <Tab.Navigator
    screenOptions={{headerShown:false,
      tabBarStyle: { position: 'absolute',backgroundColor:"#2c3e50",height:53,margin:5,padding:2},
      tabBarActiveTintColor:"red",
    }}
   
    >
        <Tab.Screen name='Home' component={AppStack} 
          options={{
            tabBarLabel: 'Home',
            headerShown:false,
          
            tabBarIcon: () => (
               <View>
                <AntDesign name="home" color={"white"} size={30} />
                </View>
            ) }}          
        />
      
      <Tab.Screen name='UserProfile' component={UserProfile} 
          options={{  
            tabBarLabel: 'UserProfile',
            headerShown:false,
            tabBarIcon: () => (
                <Entypo name="user" color={"white"} size={30} />
            ) }}          
        />
      
      <Tab.Screen name='Logout' component={Logout} 
          options={{  
            tabBarLabel: 'Logout',
            headerShown:false,
            tabBarIcon: () => (
                <Entypo name="log-out" color={"white"} size={30} />
            ) }}          
        />
      
    </Tab.Navigator>
  )
}
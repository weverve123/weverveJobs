import { View, Text } from 'react-native'
import React from 'react'
import CustomDrower from '../src/components/CustomDrower';
import { createDrawerNavigator } from '@react-navigation/drawer';
import AppStack from './AppStack';
import TabStack from './TabStack';
import Logout from '../src/components/Logout';


const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator  drawerContent={props =><CustomDrower {...props}/>}
      screenOptions={{
        headerShown:false,
        drawerActiveBackgroundColor:'#aa18ea',
        drawerActiveTintColor:'#fff',
        drawerInactiveTintColor:'#333'
      }}
     >
      {/* <Drawer.Navigator> */}
         
         <Drawer.Screen name='Home' component={TabStack}/> 
         <Drawer.Screen name='Logout' component={Logout}/>  
     </Drawer.Navigator>
  )
}
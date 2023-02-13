import { View, Text } from 'react-native'
import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';


const Drawer = createDrawerNavigator();
export default function DrawerNavigator() {
  return (
    <Drawer.Navigator  drawerContent={props =><CustomDrower {...props}/>}
      screenOptions={{
        // headerShown:false,
        drawerActiveBackgroundColor:'#aa18ea',
        drawerActiveTintColor:'#fff',
        drawerInactiveTintColor:'#333'
      }}
     >
         <Drawer.Screen name="AppStack" component={AppStack}/>
         
     </Drawer.Navigator>
  )
}
import { View, Text } from 'react-native'
import React from 'react'
import CustomDrower from '../src/components/CustomDrower';
import { createDrawerNavigator } from '@react-navigation/drawer';
import AppStack from './AppStack';
import TabStack from './TabStack';
// import Logout from '../src/components/Logout';
import Contact from '../src/components/Contact';
import Entypo from "react-native-vector-icons/Entypo";
import AntDesign from "react-native-vector-icons/AntDesign";

const Drawer = createDrawerNavigator();

export default function DrawerNavigator({navigation}) {

  return (
    <Drawer.Navigator  drawerContent={props =><CustomDrower {...props}/>}
      screenOptions={{
        headerShown:false,
        drawerActiveBackgroundColor:'#99FFFF',
        drawerActiveTintColor:'black',
        drawerInactiveTintColor:'#333'
      }}
     >
      {/* <Drawer.Navigator> */}
         
         <Drawer.Screen name='Home' component={TabStack}
          options={{
            drawerIcon: () => (
              <View>
                 <Entypo name="home" size={25} color="#11a7bd" />
               </View>   
            ),
           
          }}
         />
         <Drawer.Screen name='Contact' component={Contact}
            options={{
              drawerIcon: () => (
                <View>
                   <AntDesign name="contacts" size={25} color="#11a7bd" />
                 </View>   
              ),
            }}   
         /> 

         {/* <Drawer.Screen name='Logout' component={Logout}   
            options={{
              drawerIcon: () => (
                <View>
                   <Entypo name="log-out" size={25} color="#11a7bd" onPress={() =>handleLogout()} />
                 </View>   
              ),
            }}
         />   */}
     </Drawer.Navigator>
  )
}
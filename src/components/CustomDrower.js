import { View, Text } from 'react-native'
import React from 'react'
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer'

export default function CustomDrower(props) {
  return (
    <View style={{flex:1}}>
      <DrawerContentScrollView {...props}
      contentContainerStyle={{backgroundColor:'#1eb186'}}
      >
    <View style={{flex:1,padding:10,}}>
      <DrawerItemList {...props}/>
     </View> 
     
     </DrawerContentScrollView>
   
   </View>
  )
}
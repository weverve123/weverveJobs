import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import auth from '@react-native-firebase/auth';
import Login from './Login';
export default function Logout() {

    useEffect(()=>{
       handleLogout();
    })

    const handleLogout=async()=>{
        try{ 
            auth() .signOut().then(() => navigation.navigate(Login));
            alert("LogOut succssesfully done");
        }

        catch(err)
        {
           console.log(err)
        }
    }

  return (
    <View>
      <Text>logout</Text>
    </View>
  )
}
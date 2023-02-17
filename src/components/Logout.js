import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import auth from '@react-native-firebase/auth';
import Login from './Login';
import AuthStack from '../../navigation/AuthStack';
export default function Logout({navigation}) {

    useEffect(()=>{
       handleLogout();
    })

    const handleLogout=async()=>{
        try{ 
            auth() .signOut().then(() => navigation.navigate("SignUp"));
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
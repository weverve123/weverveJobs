import { View, Text,StyleSheet,TextInput,TouchableOpacity, Alert} from 'react-native'
import React, { useState} from 'react'
// import {sendPasswordResetEmail} from '@react-native-firebase/auth';
import auth from '@react-native-firebase/auth';
// import auth from '@react-native-firebase/auth';

export default function ForgotPassword({navigation}) {
    const[email,setEmail]=useState(""); 
   
    console.log(email);
    const handleForgotPassword=async()=>{
        
        try{
            if(email.length >0 )
            {  
              const resetPassword=await auth().sendPasswordResetEmail(email);
              alert("Please check your mail")
              setEmail('') 
           }
    
           else{
            alert("Please Enter the Input fileds");
           }
    
          }
           catch(err)
           {
              console.log(err);
              alert("Error")
           }       
  }

  return ( 
    <View>
      <View style={{top:70}}> 
      <View style={{alignItems:"center",alignItems:"center"}}>
      <TextInput placeholder='Email' 
            value={email}
            onChangeText={(text)=>setEmail(text)}
           style={styles.input}
           />
        <View style={{top:20}}>
            <TouchableOpacity
            onPress={()=>handleForgotPassword()}
            >
                <View style={{height:50,width:200,backgroundColor:"red",
                justifyContent:"center",alignItems:"center",}}>
                    <Text style={{fontSize:18,fontWeight:"bold",color:"white"}}>ForgotPassword</Text>
                </View>
            </TouchableOpacity>
        </View>
      </View>
    </View> 
    </View>
  )
}

const styles = StyleSheet.create({
    input:{
        width:320,
        backgroundColor:"#D3D3D3",
        height:40,
    
    }
});

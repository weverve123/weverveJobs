import { View, Text,StyleSheet,TouchableOpacity, Alert,ImageBackground} from 'react-native'
import React, { useState} from 'react'
// import {sendPasswordResetEmail} from '@react-native-firebase/auth';
import auth from '@react-native-firebase/auth';
// import auth from '@react-native-firebase/auth';
import LinearGradient from 'react-native-linear-gradient';
import {TextInput} from 'react-native-paper';

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
    // <LinearGradient  colors={['#2c3e50',"#2c3e50"]} style={styles.main}>

    <ImageBackground source={require('../images/background.png')}
    resizeMode="cover"  style={{flex:1}}>
  

      <View style={{top:70}}> 
      <View style={{alignItems:"center",alignItems:"center"}}>
      <TextInput
           label="Email"
           mode="outlined" 
           placeholder='Email' 
            value={email}
            onChangeText={(text)=>setEmail(text)}
           style={styles.input}
           />
        <View style={{top:20}}>
            <TouchableOpacity
            onPress={()=>handleForgotPassword()}
            >
                <View style={{height:50,width:200,backgroundColor:"skyblue",
                justifyContent:"center",alignItems:"center",borderRadius:20}}>
                    <Text style={{fontSize:18,fontWeight:"bold",color:"black",}}>Forgot Password</Text>
                </View>
            </TouchableOpacity>
        </View>
      </View>
    </View> 
     {/* </LinearGradient> */}
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
    input:{
        width:320,
        backgroundColor:"#D3D3D3",
        height:50,
    
    },
    main:{
      flex:1
    }
});

import { View, Text,StyleSheet,TextInput,TouchableOpacity, Alert} from 'react-native'
import React, { useState } from 'react'
import SignUp from './SignUp';
import auth from '@react-native-firebase/auth';
import Home from './Home';
import ForgotPassword from './ForgotPassword';
import LinearGradient from 'react-native-linear-gradient';
// import AuthStack from '../../navigation/AuthStack';
export default function Login({navigation}) {

    const [name,setName]=useState("")
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
 
    const handleLogin=async()=>{
       try{
        if(email.length >0 && password.length >0 )
        {
          const isUserLogin =await auth().signInWithEmailAndPassword(
            // isUserLogin.user.uid,
            email,
            password
          ) 
          setEmail('');
          setPassword('');
          navigation.navigate("Drawer")
       }

       else{
        alert("Please Enter the Input fileds");
       }

      }
       catch(err)
       {
          console.log(err);
          alert("Please SignUp new user")
       }
    }
  return (
    // <View style={styles.main}>
        <LinearGradient  colors={['#2c3e50',"#2c3e50"]} style={styles.main}>
       <View>
        <Text style={styles.heading}>Login</Text>
       </View>
       <View>

         <TextInput placeholder='Email' 
            value={email}
            onChangeText={(text)=>setEmail(text)}
           style={styles.input}/>

         <TextInput placeholder='Password'
          secureTextEntry={true}
          value={password}
          onChangeText={(text)=>setPassword(text)}
         style={[styles.input,{top:20}]}/>

       </View>
       <TouchableOpacity 
         onPress={()=>handleLogin()}
       >
         <View style={{marginTop:40,height:40,width:200,justifyContent:"center",alignItems:"center",backgroundColor:'purple',borderRadius:10}}>
            <Text style={{color:"white",fontSize:20}}>Login</Text>
         </View>
       
       </TouchableOpacity>

       <TouchableOpacity
         onPress={()=>navigation.navigate(ForgotPassword)}
       >
         <View style={{marginTop:20}}>
            <Text style={{fontSize:17,color:"#FFCCCB",fontWeight:'bold'}}>ForgotPassword</Text>
         </View>
       </TouchableOpacity>

       <TouchableOpacity
       onPress={()=>navigation.navigate(SignUp)}
       >
         <View style={{marginTop:20}}>
            <Text style={{fontSize:17,fontWeight:'bold',color:"white"}}>If You Woant to Add New User ?</Text>
         </View>
       </TouchableOpacity>
       </LinearGradient>
    // </View>
  
  )
}

const styles = StyleSheet.create({
    main:{
        flex:1,
        justifyContent:"center",
        alignItems:"center",
        // backgroundColor:"#ececec"
    },
    input:{
        width:320,
        backgroundColor:"#D3D3D3",
        height:40
    },
    heading:{
        fontSize:30,
        fontWeight:'bold',
        color:"white",
        bottom:30
    }
});
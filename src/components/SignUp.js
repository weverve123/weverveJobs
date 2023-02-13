import { View, Text,StyleSheet,TextInput,TouchableOpacity, } from 'react-native'
import React, { useState } from 'react'
// import SignIn from './SignIn'
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
 import Login from './Login';
export default function SignUp({navigation}) {

    const [name,setName]=useState("")
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")

    const hadleSignUp= async()=>{
      try{
        if(email.length >0 && password.length >0 && name.length >0)

        {
        const isUsercreated= await auth().createUserWithEmailAndPassword(
          email,
          password
          );  
        setEmail('');
        setPassword('');
        setName('')

        const userData ={
          id:isUsercreated.user.uid,
          name:name,
          email:email
        }

         await firestore().collection("users").doc(isUsercreated.user.id).
         set(userData);

      }
      else{
        alert("Please Enter the Input fileds")
      }
    }
      catch(err)
      {
         console.log(err)
        
      }
      
    }
  return (
    <View style={styles.main}>
       <View>
        <Text style={styles.heading}>SignUp</Text>
       </View>
       <View>

       <TextInput placeholder='Name' 
          style={[styles.input,{bottom:20}]}
           value={name}
           onChangeText={(text)=>setName(text)}
          />

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
         onPress={()=>hadleSignUp()}
       >
         <View style={{marginTop:40,height:40,width:200,justifyContent:"center",alignItems:"center",backgroundColor:'red',borderRadius:10}}>
            <Text style={{color:"white",fontSize:20,fontWeight:"bold"}}>SignUp</Text>
         </View>
       
       </TouchableOpacity>

       <TouchableOpacity
        onPress={()=>navigation.navigate(Login)}
        // onPress={()=>navigation.navigate(SignUp)}  
       >
         <View style={{marginTop:20}}>
            <Text style={{fontSize:20,color:"black"}}>Login</Text>
         </View>
       </TouchableOpacity>
    </View>
  
  )
}

const styles = StyleSheet.create({
    main:{
        flex:1,
        justifyContent:"center",
        alignItems:"center"
    },
    input:{
        width:320,
        backgroundColor:"#D3D3D3",
        height:40
    },
    heading:{
        fontSize:30,
        fontWeight:'bold',
        color:"black",
        bottom:30
    }
});
import { View, Text,StyleSheet,TouchableOpacity,StatusBar, Image,ImageBackground} from 'react-native'
import React, { useState } from 'react'
import {TextInput} from 'react-native-paper';
// import SignIn from './SignIn'
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import Login from './Login';
import LinearGradient from 'react-native-linear-gradient';
// import logo_weverve from './images/logo_weverve';
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
    // <View style={styles.main}>
    // <LinearGradient  colors={['#E6E6FA',"#E6E6FA"]} style={styles.main}>
    <ImageBackground source={require('../images/background.png')}
    resizeMode="cover" style={styles.main}>

       <StatusBar translucent backgroundColor='transparent'  barStyle="dark-content" />


      <View style={{bottom:20}}>
         <Image source={require('../images/logo_weverve.png')} style={{height:100,width:100}}/>
        </View> 

       <View>
        <Text style={styles.heading}>SignUp</Text>
       </View>
       <View>
       
       <View style={{}}>
       <TextInput 
           label="Name"
           mode="outlined"
           placeholder='Name' 
           style={[styles.input,{bottom:10}]}
           value={name}
           onChangeText={(text)=>setName(text)}
          />
       </View>

         <TextInput 
          label="Email"
          mode="outlined"
          placeholder='Email' 
            value={email}
            onChangeText={(text)=>setEmail(text)}
           style={styles.input}/>

         <TextInput 
          label="Password"
          mode="outlined"
          placeholder='Password'
          secureTextEntry={true}
          value={password}
          onChangeText={(text)=>setPassword(text)}
         style={[styles.input,{top:10}]}/>

       </View>
       <TouchableOpacity 
         onPress={()=>hadleSignUp()}
       >
         <View style={{marginTop:40,height:50,width:300,justifyContent:"center",alignItems:"center",backgroundColor:'#7CB9E8',borderRadius:10}}>
            <Text style={{color:"black",fontSize:20,fontWeight:"bold"}}>SignUp</Text>
         </View>
       
       </TouchableOpacity>

       <TouchableOpacity
        onPress={()=>navigation.navigate(Login)}
        // onPress={()=>navigation.navigate(SignUp)}  
       >
         <View style={{marginTop:20}}>
            <Text style={{fontSize:20,color:"black",fontWeight:"bold"}}>Login</Text>
         </View>
       </TouchableOpacity>
    {/* </View> */}
    {/* </LinearGradient> */}
    </ImageBackground>
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
        borderRadius:30,
        backgroundColor:"#F3F2ED",
        borderColor:"black",
        height:45,
    },
    heading:{
        fontSize:30,
        fontWeight:'bold',
        color:"black",
        bottom:30
    }
});
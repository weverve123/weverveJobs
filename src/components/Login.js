import { View, Text,StyleSheet,TouchableOpacity, Alert,StatusBar,Image,ImageBackground} from 'react-native'
import React, { useState } from 'react'
import SignUp from './SignUp';
import auth from '@react-native-firebase/auth';
import Home from './Home';
import ForgotPassword from './ForgotPassword';
import LinearGradient from 'react-native-linear-gradient';
import {TextInput} from 'react-native-paper';
import AwesomeAlert from 'react-native-awesome-alerts';
// import AuthStack from '../../navigation/AuthStack';

export default function Login({navigation}) {
 
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")

    const [showAlert, setShowAlert] = useState(false);
    const [alertTitle, setAlertTitle] = useState('');
    const [alertMessage, setAlertMessage] = useState('');
    const [alertButtons, setAlertButtons] = useState([]);
 
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
        setAlertTitle('Error');
        setAlertMessage('Please enter the input fields');
        setShowAlert(true);
       }

      }
       catch(err)
       {
          // console.log(err);
          // alert(err)
          setAlertTitle('Error');
          setAlertMessage('Invalid Email OR Password.');
          setShowAlert(true);
       }
     
    }
  return (
    // <View style={styles.main}>
        // <LinearGradient  colors={['#F8F9F5',"#F8F9F5"]} style={styles.main}>
       
        <ImageBackground source={require('../images/background.png')}
        resizeMode="cover" style={styles.main}>

          <StatusBar translucent backgroundColor='transparent' />
          
        <View style={{bottom:20}}>
         <Image source={require('../images/logo_weverve.png')} style={{height:100,width:100}} />
        </View> 

       <View>
        <Text style={styles.heading}>Login</Text>
       </View>
       <View>

         <TextInput 
           label="Email"
           mode="outlined" 
           placeholder='Email' 
            value={email}
            onChangeText={(text)=>setEmail(text)}
           style={styles.input}/>

         <TextInput placeholder='Password'
          label="Password"
          mode="outlined" 
          secureTextEntry={true}
          value={password}
          onChangeText={(text)=>setPassword(text)}
         style={[styles.input,{top:10}]}/>

       </View>
       <TouchableOpacity 
         onPress={()=>handleLogin()}
       >
         <View style={{marginTop:40,height:50,width:300,justifyContent:"center",alignItems:"center",backgroundColor:'#7CB9E8',borderRadius:10}}>
            <Text style={{color:"black",fontSize:20,fontFamily:'Helvetica-Narrow Bold'}}>Login</Text>
         </View>
       
       </TouchableOpacity>

       <TouchableOpacity
         onPress={()=>navigation.navigate(ForgotPassword)}
       >
         <View style={{marginTop:20}}>
            <Text style={{fontSize:18,color:"white",fontFamily:'Helvetica-Narrow Bold'}}>ForgotPassword</Text>
         </View>
       </TouchableOpacity>

       <TouchableOpacity
       onPress={()=>navigation.navigate(SignUp)}
       >
         <View style={{marginTop:20}}>
            <Text style={{fontSize:17,color:"black"}}>Dont have an account? SignUp</Text>
         </View>
       </TouchableOpacity>

       <AwesomeAlert
      show={showAlert}
      title={alertTitle}
      animatedValue={0.7}
      message={alertMessage}
      closeOnTouchOutside={true}
      closeOnHardwareBackPress={false}
      showCancelButton={false}
      showConfirmButton={true}
      confirmText="OK"
      confirmButtonColor="red"
      onCancelPressed={() => setShowAlert(false)}
      onConfirmPressed={() => setShowAlert(false)}
      onDismiss={() => setShowAlert(false)}
      buttons={alertButtons}
      titleStyle={{color:"black",fontSize:20, fontFamily:'Helvetica-Narrow Bold'}}
      messageStyle={{color:"black",fontSize:15,fontFamily:'WorkSans-Regular',}}
      contentContainerStyle={{height:220,with:380,justifyContent:"center",backgroundColor:'#f5f5f5',borderRadius:10}}
      confirmButtonStyle={{height:40,width:80,justifyContent:"center",alignItems:"center"}}
      confirmButtonTextStyle={{fontSize:20,fontFamily:'Helvetica-Narrow Bold',color:"white"}}
    />

      </ImageBackground>

      //  </LinearGradient>
    // </View>
  
  ) 
}

const styles = StyleSheet.create({
    main:{
        flex:1,
         height:'100%',
         width:'100%',
        justifyContent:"center",
        alignItems:"center",
        // backgroundColor:"#ececec"
    },
    input:{
        width:320,
        backgroundColor:"#F3F2ED",
        height:45,
        
    },
    heading:{
        fontSize:25,
        // fontWeight:'bold',
        color:"black",
        bottom:30,
        fontFamily:'Helvetica-Narrow Bold'
    }
});
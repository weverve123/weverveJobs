import { View, Text,StyleSheet,TouchableOpacity,StatusBar, Image,ImageBackground,Alert } from 'react-native'
import React, { useState } from 'react'
import {TextInput} from 'react-native-paper';
// import SignIn from './SignIn'
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import Login from './Login';
import LinearGradient from 'react-native-linear-gradient';
import AwesomeAlert from 'react-native-awesome-alerts';
// import logo_weverve from './images/logo_weverve';
export default function SignUp({navigation}) {

    
    const [conformpassword,setconformpassword]=useState("")
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")

    const [showAlert, setShowAlert] = useState(false);
    const [alertTitle, setAlertTitle] = useState('');
    const [alertMessage, setAlertMessage] = useState('');
    const [alertButtons, setAlertButtons] = useState([]);
    
    const hadleSignUp = async () => {
      try {
        if (email.length > 0 && password.length > 0 && conformpassword.length > 0) {
          if (password !== conformpassword) {
            setAlertTitle('Error')
            setAlertMessage('Password and Confirm Password must be match.');
            setAlertButtons([{ text: 'OK', onPress: () => setShowAlert(false) }]);
            setShowAlert(true);
            return;
          }
    
          const isUserCreated = await auth().createUserWithEmailAndPassword(
            email,
            password
          );
    
          setEmail('');
          setPassword('');
          setconformpassword('');
         
          setAlertTitle('Welcome To WeVerve')
          setAlertMessage('Congratulations Your account has been successfully created.');
          setAlertButtons([{ text: 'OK', onPress: () => setShowAlert(false) }]);
          setShowAlert(true);
              
      
          const userData = {
            id: isUserCreated.user.uid,
            email: email,
          };
    
          await firestore()
            .collection('users')
            .doc(isUserCreated.user.id)
            .set(userData);

           

        } else {
          setAlertTitle('Please Enter the Input Fields');
          setAlertButtons([{ text: 'OK', onPress: () => setShowAlert(false) }]);
          setShowAlert(true);
        }
      } catch (err) {
        if (err.code === 'auth/email-already-in-use') {
          setAlertTitle('User already signed up');
          setAlertMessage('Please login instead.');
          setAlertButtons([{ text: 'OK', onPress: () => setShowAlert(false) }]);
          setShowAlert(true);
        } else {
          console.log(err);
          setAlertTitle('Error');
          setAlertMessage(err.message);
          setAlertButtons([{ text: 'OK', onPress: () => setShowAlert(false) }]);
          setShowAlert(true);
        }
      }
    };
    
    
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

      
       <TextInput 
           label="Conformpassword"
           mode="outlined"
           placeholder='Conformpassword' 
           style={[styles.input,{marginTop:20}]}
           value={conformpassword}
           onChangeText={(text)=>setconformpassword(text)}
          />
       

       </View>
       <TouchableOpacity 
         onPress={()=>hadleSignUp()}
       >
         <View style={{marginTop:40,height:50,width:300,justifyContent:"center",alignItems:"center",backgroundColor:'#7CB9E8',borderRadius:10}}>
            <Text style={{color:"black",fontSize:20,fontFamily:'Helvetica-Narrow Bold'}}>SignUp</Text>
         </View>
       
       </TouchableOpacity>

       <TouchableOpacity
        onPress={()=>navigation.navigate(Login)}
        // onPress={()=>navigation.navigate(SignUp)}  
       >
         <View style={{marginTop:20}}>
            <Text style={{fontSize:20,color:"black",fontFamily:'Helvetica-Narrow Bold'}}>Login</Text>
         </View>
       </TouchableOpacity>
    {/* </View> */}
    {/* </LinearGradient> */}
     
    <View>
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
      titleStyle={{color:"black",fontSize:15, fontFamily:'Helvetica-Narrow Bold'}}
      messageStyle={{color:"black",fontSize:15,fontFamily:'WorkSans-Regular',textAlign:"justify"}}
      contentContainerStyle={{height:220,with:380,justifyContent:"center",backgroundColor:'#f5f5f5',borderRadius:10}}
      confirmButtonStyle={{height:40,width:80,justifyContent:"center",alignItems:"center"}}
      confirmButtonTextStyle={{fontSize:20,fontFamily:'Helvetica-Narrow Bold',color:"white"}}
    />
  </View>
       
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
        fontSize:25,
        // fontWeight:'bold',
        color:"black",
        bottom:30,
        fontFamily:'Helvetica-Narrow Bold',
    }
});
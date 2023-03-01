import { View, Text,StyleSheet, TouchableOpacity,Image} from 'react-native'
import React,{useEffect, useState} from 'react'
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer'
import DocumentPicker from 'react-native-document-picker';
import storage from '@react-native-firebase/storage';
import Auth, { firebase } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import Entypo from "react-native-vector-icons/Entypo"
import Login from './Login';
import AuthStack from '../../navigation/AuthStack';
import { useNavigation } from '@react-navigation/native';


export default function CustomDrower(props) {
  const [docData,setDocData]=useState(''); 
  const [currentUid,setCurrentUid]=useState();
  const [imageUrl, setImageUrl] = useState();

  useEffect(()=>{
     getUser();
    //  console.log(imageUrl); 
  },[])


  useEffect(()=>{
    UplodeImage();
  },[docData])
  

  useEffect(() => {
    const storage = firebase.storage();
    const storageRef = storage.ref();
    const imageRef = storageRef.child(`/profile/userImage/${currentUid}`);
    imageRef.getDownloadURL().then((url) => {
      setImageUrl(url);
      console.log(url);
    });
  }, [currentUid]);

  
  const getUser=()=>{
    const userData= Auth().currentUser.uid
    setCurrentUid(userData); 
    // console.log(userData);
    // 
  }

  const PicDocument= async()=>{
    try {
       const responce= await DocumentPicker.pickSingle({
            type:[DocumentPicker.types.images],
            copyTo:"cachesDirectory"

        })
        console.log(responce);
        setDocData(responce);
       

    } catch (error) {
        
        console.log(error)
    }
}

async function UplodeImage() {
  // Get the selected document
  const { uri, name,fileCopyUri} = docData;

  const reference = storage().ref(`/profile/userImage/${currentUid}`);

  // Upload the document to Firebase Storage
  try {
    const task = reference.putFile(fileCopyUri);
    // Monitor the upload progress
    task.on('state_changed', (snapshot) => {
      console.log(`Uploaded: ${snapshot.bytesTransferred}/${snapshot.totalBytes}`);
    });
    // Wait for the upload to complete
    await task;
    console.log('Document uploaded to Firebase Storage');
    alert("Document uploaded to Firebase Storage");
  } catch (err) {
    console.log(err);
  }
}
   
const navigation = useNavigation();

const handleLogout=async()=>{
  try{ 
     await Auth().signOut().then(() => navigation.replace("Auth"));
      alert("LogOut succssesfully done");
  }

  catch(err)
  {
     console.log(err)
  }
}
   
  return (
    <View style={{flex:1,backgroundColor:"#EBF6F7"}}>
      
      <TouchableOpacity
        onPress={()=>PicDocument()}
      >
       <Image style={styles.avtar} source={{uri: imageUrl}}/>

       </TouchableOpacity>

      <DrawerContentScrollView {...props}
      // contentContainerStyle={{backgroundColor:'#E6E6FA'}}
      >
    <View style={{padding:10,}}>
      <DrawerItemList {...props}/>
     </View> 
     
     </DrawerContentScrollView>

    <TouchableOpacity onPress={()=>handleLogout()}>
    <View style={{bottom:30,flexDirection:'row',justifyContent:"flex-start"}}>
    <View style={{left:30}}> 
      <Entypo name="log-out" size={25} color="#11a7bd" />
      </View>

      <View>
      <Text style={{fontWeight:'bold',color:"black",fontSize:15,left:50}}>Logout</Text>
      </View>
      
    </View>
    </TouchableOpacity>
   </View>
  )
}

const styles = StyleSheet.create({
    mainAvtar:{
      justifyContent:"center",
      alignItems:"center"
    },
    avtar:{
      height:120,
      width:120,
      borderRadius:60,
      left:70,
      marginTop:30,
      borderWidth:2,
      borderColor:"black"
    }
})
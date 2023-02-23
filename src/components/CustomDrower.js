import { View, Text,StyleSheet, TouchableOpacity,Image} from 'react-native'
import React,{useEffect, useState} from 'react'
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer'
import DocumentPicker from 'react-native-document-picker';
import storage from '@react-native-firebase/storage';
import Auth, { firebase } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import Entypo from "react-native-vector-icons/Entypo"


export default function CustomDrower(props) {
  const [docData,setDocData]=useState(''); 
  const [currentUid,setCurrentUid]=useState();
  const [imageUrl, setImageUrl] = useState();

  useEffect(()=>{
     getUser();
    //  console.log(imageUrl); 
  },[])
  
  // useEffect(() => {
  //   const storage = firebase.storage();
  //   const storageRef = storage.ref();
  //   const imageRef = storageRef.child(`/profile/userImage/${currentUid}`);
  //   imageRef.getDownloadURL().then((url) => {
  //     setImageUrl(url);
  //     console.log(url);
  //   });
  // }, []);

   useEffect( async()=>{
    const url = await storage()
    .ref(`/profile/userImage/${currentUid}`)
    .getDownloadURL()
    console.log("url",url)
    // setImageUrl(url);
   },[])

  
  const getUser=()=>{
    const userData= Auth().currentUser.uid
    setCurrentUid(userData); 
    // console.log(userData);
    UplodeImage();
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
   
  return (
    <View style={{flex:1,backgroundColor:"#eab6fa"}}>
      
      <View style={styles.mainAvtar}>
      {/* <Image  source={{uri:docData.uri}} style={styles.avtar} /> */}
      <View style={{}}>
      {/* <Entypo name="edit" color={"red"} size={20} style={{top:120,left:100}}
       onPress={() =>PicDocument()}/> */}

       {/* <Image source={{uri:docData.uri}} style={{height:120,width:120,borderRadius:60}} /> */}
       <Image style={{height:120,width:120}} source={{uri: imageUrl}}/>
      </View>
      </View>
      <DrawerContentScrollView {...props}
      contentContainerStyle={{backgroundColor:'#f9b6fa'}}
      >
    <View style={{padding:10,}}>
      <DrawerItemList {...props}/>
     </View> 
     
     </DrawerContentScrollView>
   
   </View>
  )
}

const styles = StyleSheet.create({
    mainAvtar:{
      justifyContent:"center",
      alignItems:"center"
    },
    avtar:{
      height:120,width:120,
      borderRadius:60,
      marginTop:20,
      borderWidth:2,
      justifyContent:"center",
      marginBottom:30
    }
})
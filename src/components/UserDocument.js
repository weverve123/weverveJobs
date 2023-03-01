import { View, Text, TouchableOpacity,StyleSheet} from 'react-native'
import React,{useEffect, useState} from 'react'
import DocumentPicker from 'react-native-document-picker';
import storage from '@react-native-firebase/storage';
import Auth, { firebase } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
// import firebase from 'firebase/app';

export default function UserDocument() {

const [docData,setDocData]=useState(''); 
const [currentUid,setCureentUid]=useState();
const [docUrl,setDocUrl]=useState();
const [docName,setDocName]=useState();

useEffect(()=>{
//  PicDocument();
   getUser();

},[currentUid]);

 
useEffect(() => {
  const storage = firebase.storage();
  const storageRef = storage.ref();
  const imageRef = storageRef.child(`/profile/resume/${currentUid}`);
  imageRef.getDownloadURL().then((url) => {
    setDocUrl(url);
    console.log(" This is doc name",url);
  });
}, [currentUid]);
 

const getUser=()=>{
  const userData= firebase.auth().currentUser.uid
  setCureentUid(userData);  
//  console.log(userData);
}  


    const PicDocument= async()=>{
        try {
           const responce= await DocumentPicker.pickSingle({
                type:[DocumentPicker.types.pdf],
                copyTo:"cachesDirectory"

            })
            console.log(responce);
            setDocData(responce);

        } catch (error) {
            
            console.log(error)
        }
    }
  
    // const UplodeResume=async()=>{
    //    try {
    //     const responace= await storage().ref("/profile/1.pdf").putFile(docData.uri);
    //     console.log(responace);

    //    } catch (error) {
    //      console.log("error",error);
    //    }
    // }
     

    // const UplodeResume = async () => {
    //     try {
    //       const storageRef = storage().ref(`documents/${docData.name}`);
    //       console.log(storageRef)
    //       await storageRef.put(decodeURI(docData.uri));
    //       console.log('File uploaded successfully');
    //     } catch (error) {
    //       console.error(error);
    //     }
    //   };

    async function UplodeResume() {
        // Get the selected document
        const { uri, name,fileCopyUri} = docData;
      
        setDocName=name;
        // Create a reference to the location where the document will be saved
        // const reference = storage().ref(`/profile/${name}`);
        const reference = storage().ref(`/profile/resume/${name}`);

        // Upload the document to Firebase Storage
        try {
          const task = reference.putFile(fileCopyUri);
          // Monitor the upload progress
          task.on('state_changed', (snapshot) => {
            console.log(`Uploaded: ${snapshot.bytesTransferred} / ${snapshot.totalBytes}`);
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

    <View style={{flex:1,justifyContent:"center",alignItems:"center",}}>
       
       {
         docData ?(
            <View>
            <Text style={{fontSize:14,fontWeight:"bold",color:"black"}}>{docData.name}</Text>
           

            <TouchableOpacity onPress={()=>UplodeResume()}>
         <View style={styles.selectBtn}> 
            <Text style={{fontSize:20,fontWeight:"bold",color:"white"}}>Uplode Resume</Text>
         </View>
       </TouchableOpacity>
            </View>
         ):(
            <Text style={{fontSize:14,fontWeight:"bold",color:"black"}}>No Resume Selected </Text>
         )
       }
       <TouchableOpacity onPress={()=>PicDocument()} style={{top:50}}>
         <View style={styles.selectBtn}> 
            <Text style={{fontSize:20,fontWeight:"bold",color:"white"}}>Select Resume</Text>
         </View>
       </TouchableOpacity>
    </View>
  )
}

const styles= StyleSheet.create({
   selectBtn:{
    top:50,
   height:50,
   width:200,backgroundColor:"red",
   justifyContent:"center",
   alignItems:"center"
   }
})
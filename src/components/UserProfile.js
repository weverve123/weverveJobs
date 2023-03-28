import { View, Text,FlatList, TouchableOpacity,StyleSheet,
PermissionsAndroid} from 'react-native'
import React,{useState,useEffect} from 'react'
import auth, { firebase } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import EditProfile from './EditProfile';
import LinearGradient from 'react-native-linear-gradient';
import Feather from "react-native-vector-icons/Feather";
import AntDesign from "react-native-vector-icons/AntDesign"
import FontAwesome from "react-native-vector-icons/FontAwesome"
import Fontisto from "react-native-vector-icons/Fontisto"
import FontAwesome5 from "react-native-vector-icons/FontAwesome5"
import storage from '@react-native-firebase/storage';
import RNFetchBlob from 'rn-fetch-blob';
import XLSX from 'xlsx';
import SMTPMailer from 'react-native-smtp-mailer';

export default function UserProfile({navigation}) {

  const [currentUid,setCurrentUid]=useState();
  const [list,setList]=useState();
  const [docUrl,setDocUrl]=useState();
  const [ExcelData,setExcelData]=useState();
  

  useEffect(()=>{
    getDatabase();
     getUser();
    //  generateExcelData(); 
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
   setCurrentUid(userData);  
   console.log(userData);
}  

const getDatabase= async () =>{
  try {
    const ref =firestore().collection(currentUid)
    return ref.onSnapshot(qurerySnapshot =>{
      const list=[]
      console.log(qurerySnapshot,"qurerySnapshot")
      qurerySnapshot.forEach((doc)=>{
        const {fname,lname,mobno,address,college,qualification,experance,
          email,currentCTC,noticePeriod,selectedTeam,selectedTeams}=doc.data()
        
        const newselectedTeam=JSON.stringify(selectedTeam.item);

        // const newselectedTeams=JSON.stringify(selectedTeams);
         
        let skills = selectedTeams.map(function(item) {
          return ` ${item ['item']} ,`
        });
         
        list.push({
          id:doc.id,
          fname,
          lname,
          mobno,
          address,
          college,
          qualification,
          experance,
          skills,
          email,
          currentCTC,
          noticePeriod,
          newselectedTeam
        })
        setList(list)
      }     
      )
     
    }) 
     
  } catch (error) {
    console.log(error);
  }
}



const handlePdfDownload=async()=>{
  try {
    console.log('calling permisstion')
    if(PermissionsAndroid.RESULTS.GRANTED === 'granted')
    {
      downloadPdf()
    }
    else{
       await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title:'Storage Permission Required',
          message:'App needs access to your storage to download PDF',
          buttonNeutral:'Ask Me Later',
          buttonNegative:'cancel',
          buttonPositive:'OK'
        }
      )
      
      if(PermissionsAndroid.RESULTS.GRANTED === 'granted')
      {
        console.log('Storage Permisstion Granted.')
        downloadPdf()
      }
      else{
        alert("Storage Permission Not Granted")
      }

    }
    
  } catch (error) {
    console.log(error)
  }


}

const downloadPdf=()=>{
    let date= new Date()
    let pdf_url=docUrl
    // let ext =getExtention(pdf_url)
    
    const {config,fs}= RNFetchBlob
    let FileDir=fs.dirs.DownloadDir;
    let options ={
      fileCache:true,
      addAndroidDownloads:{

        useDownloadManager:true,
        notification:true,
        path:FileDir + "/AllResume" + Math.floor(date.getTime() + date.getSeconds()/2) + '.pdf',
        description:'File Download'
      }
    }
    config(options)
    .fetch('GET',pdf_url)
    .then(res =>{
      console.log('res ->',JSON.stringify(res))
      alert('Image Downloaded SuccessFully')
    })
}
 
//////////////////////////// Sending Email ////////////////
  // const hanleEmail =()=>{
  
  //   SMTPMailer.sendMail({
  //     mailhost: 'smtp.gmail.com',
  //     port: '465',
  //     ssl: true,
  //     username: 'umeshbhagwat9921@gmail.com',
  //     password: 'wfbghucdarxazkcv',
  //     from: 'umeshbhagwat9921@gmail.com',
  //     recipients: 'umeshbhagwatkopargaon@gmail.com',
  //     subject: 'Test Email',
  //     htmlBody: '<h1>This is an User data</h1><p>This is a test email.</p>',
  //     attachmentPaths:'ExcelData'
  //   })
  //     .then((response) => {
  //       console.log(response);
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });

  // }

 ////////////////////////////////////////////////////////////// 


  return (
    <LinearGradient  colors={['#E6E6FA',"#E6E6FA"]} style={styles.main}>    
      <FlatList
           data={list}
           renderItem={({item})=>
           <View>
              <LinearGradient  colors={['white', 'white',]} style={styles.mainCard}>
              <View style={styles.innerCard}>
                <View style={{height:30,width:300,bottom:20}}>
                  <Text style={{fontSize:30,color:"black",fontFamily:'Helvetica-Narrow Bold'}}>  Welcome
                  <Text> {item.fname}</Text>
                  </Text>
                </View>
             
             <View style={{justifyContent:"space-between",paddingHorizontal:6,width:310}}>
                <View>
                  
                <Text style={styles.data}>
                  {/* <Text style={styles.tag}>First Name  : </Text> */}
                  {item.fname}{item.lname}
                  </Text>
                  </View>
                
                <View style={{justifyContent:"flex-start",flexDirection:"row",paddingTop:10}}>  
                  <View>
                    <Feather name="phone" size={25} color={"green"}/> 
                  </View>
                    <Text style={styles.userDataText}> 
                  {item.mobno}</Text>
                 </View> 

                 <View style={{flexDirection:"row",justifyContent:"flex-start",paddingTop:10}}>  
                  <View style={{}}>
                    <Fontisto name="email" size={25} color={"green"}/> 
                  </View>
                  <View>
                    <Text style={{fontSize:20,fontFamily:'WorkSans-Regular',color:'black',left:15}}> 
                   {item.email}</Text>
                  </View>
                 </View> 
                 

                <View style={{justifyContent:"flex-start",flexDirection:"row",paddingTop:10}}>
                   <View>
                     <FontAwesome5 name="home" size={25} color={"green"}/> 
                   </View>
                    <View>
                         <Text style={styles.userDataText}>{item.address}</Text>
                   </View>
                 </View>

              <View style={{justifyContent:"flex-start",flexDirection:"row",padding:2}}>
                  <View>
                     <FontAwesome name="university" size={25} color={"green"}/> 
                  </View>
                 <View style={{paddingRight:5}}>
                    <Text style={styles.userDataText}>{item.college}</Text>
                  </View>
              </View>

              <View style={{justifyContent:"flex-start",flexDirection:"row",paddingTop:10}}>
                 <View >
                 <FontAwesome name="graduation-cap" size={25} color={"green"}/> 
                 </View>
                <View>
                <Text style={styles.userDataText}> {item.qualification}</Text>
                </View> 
              </View>

               
              <View style={{flexDirection:"row",padding:5}}>
                <View>
                  <Text style={styles.dataHeading}>Year of passing :</Text> 
                </View>
              <View>
               <Text style={styles.userDataText}>
                  {item.newselectedTeam}
                </Text>
               </View> 
              </View> 


               <View style={{flexDirection:"row",padding:5}}>
                <View>
                  <Text style={styles.dataHeading}>Year of Experience : </Text>
                </View>
                   <View>
                      <Text style={styles.userDataText}>{item.experance}</Text>
                   </View>
                </View>

                <View style={{flexDirection:"row",padding:5}}>
                <View>
                  <Text style={styles.dataHeading}>Current CTC : </Text>
                </View>
                   <View>
                      <Text style={styles.userDataText}> {item.currentCTC} LPA</Text>
                   </View>
                </View>

                <View style={{flexDirection:"row",padding:5}}>
                <View>
                  <Text style={styles.dataHeading}>Notice Period: </Text>
                </View>
                   <View>
                      <Text style={styles.userDataText}> {item.noticePeriod} Months </Text>
                   </View>
                </View>
              
        
              <View  style={{flexDirection:"row",padding:5}}>

                <View>
                  <Text  style={styles.dataHeading}>Skills : </Text>
                </View>

                <View>
                   <Text style={styles.userDataText}>{item.skills}</Text>
                </View>
              
              </View>
              
              </View>

              </View>
               
               {docUrl?(
                <View style={{ justifyContent:'center',top:10}}>
                <View style={{}}>
                  <Text style={{fontSize:20,fontFamily:"Poppins-LightItalic",color:"black",fontWeight:"bold"}}>DownLoad Resume</Text>
                </View>
                <TouchableOpacity onPress={()=>handlePdfDownload()} style={{left:80,top:10}}>
                   <AntDesign name="download" size={25} color={"green"} /> 
                </TouchableOpacity>
              </View>
               ):null}
              
              
          <View style={{top:50}}>
            <TouchableOpacity
            onPress={()=>navigation.navigate(EditProfile)}
            >
                <LinearGradient  colors={['#275f96', '#275f96',]} style={styles.btnEdit}>
                 <Text style={{fontSize:22,fontWeight:"bold",color:"white",fontFamily:'WorkSans-Regular'}}>Edit Information</Text>
                 </LinearGradient>
               </TouchableOpacity>

               {/* <TouchableOpacity
            onPress={()=>hanleEmail()} style={{top:10}}
            >
                <LinearGradient  colors={['#275f96', '#275f96',]} style={styles.btnEdit}>
                 <Text style={{fontSize:22,fontWeight:"bold",color:"white",}}>send mail</Text>
                 </LinearGradient>
               </TouchableOpacity> */}


          </View>
          </LinearGradient> 
           </View>        
                    
          }
          keyExtractor={item => item.id}
        />
    </LinearGradient>   

  )
}
const styles = StyleSheet.create({
  mainCard:{
    height:700,width:350,
    // justifyContent:"center",
    alignItems:"center",
    // backgroundColor:"orange",
    margin:20,
    borderRadius:40,
    paddingTop:50,
    marginTop:50,

    elevation: 8,
    shadowColor: 'black',
    shadowOffset: { width: 10, height: 5 },
    shadowOpacity: 10.56,

  },
  tag:{
    fontSize:25,
    fontWeight:"bold",
    color:"black"
  },
  data:{
    fontSize:25,
    // fontFamily:'Poppins-LightItalic',
    fontFamily:'WorkSans-Regular',
    color:"black"
  },
  main:{
    flex:1
  },
  btnEdit:{
    height:50,
    width:200,
    backgroundColor:"#3899ac",
    justifyContent:"center",
    alignItems:"center",
    borderRadius:20,
   
  },
  personalMain:{
    width:320,
    justifyContent:"center",
    alignItems:"center",
    padding:15,
    borderRadius:20,
    marginBottom:20
  },
  userDataText:{
    fontSize:20,
    color:"black",
    left:15,
    // fontFamily:'Futura Light Oblique',
    fontFamily:'WorkSans-Regular',
  },
  dataHeading:{
    fontSize:20,
    color:"black",
    // fontFamily:'Poppins-LightItalic',
    fontFamily:'WorkSans-Regular'
  }
  
})
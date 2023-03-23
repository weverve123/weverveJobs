import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  PermissionsAndroid,Platform
} from 'react-native';
import {TextInput} from 'react-native-paper';
import React, {useEffect, useState} from 'react';
import SelectBox from 'react-native-multi-selectbox';
import {xorBy} from 'lodash';
import firestore from '@react-native-firebase/firestore';
import auth, { firebase } from '@react-native-firebase/auth';
import UserDocument from './UserDocument';
import LinearGradient from 'react-native-linear-gradient';
import DocumentPicker from 'react-native-document-picker';
import storage from '@react-native-firebase/storage';
import Pdf,{PDFGenerator } from 'react-native-pdf';
// import PDFGenerator from 'react-native-pdf';
import { Image } from 'react-native-svg';
import AntDesign from "react-native-vector-icons/AntDesign"
import RNFetchBlob,{RNFS} from 'rn-fetch-blob';
 import { CsvWriter } from 'csv-writer';
import XLSX from 'xlsx';
import reactNativeHTMLToPdf from 'react-native-html-to-pdf'

export default function UserDetails({navigation}) {
  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [mobno, setMobno] = useState('');
  const [address, setAddress] = useState('');
  const [email,setEmail] =useState('')
  const [college, setCollege] = useState('');
  const [qualification,Setqualification]=useState('');
  const [experance,setExpeance]=useState('');
  const [currentCTC,setCurrentCTC]=useState('');
  const [noticePeriod,setNoticePeriod]=useState('')
  
  const [selectedTeam, setSelectedTeam] = useState({});
  const [selectedTeams, setSelectedTeams] = useState([]);
  const [cureentUid,setCureentUid]=useState();
  const [dataAvailable,setDataAvailable]=useState(false);
  
  const [docData,setDocData]=useState(''); 
  const [docUrl,setDocUrl]=useState();
  const [docName,setDocName]=useState();
  const [list,setList]=useState();
  const [ExcelData,setExcelData]=useState();
  const [ExcelUrl,setExcelUrl]=useState();

  useEffect(()=>{
    getUser();
    // handleSubmit();
    getDatabase();
    
  },[cureentUid])

  useEffect(()=>{
    console.log("This Is an UserList",list);

  },[list])

  
  useEffect(() => {
    const storage = firebase.storage();
    const storageRef = storage.ref();
    const imageRef = storageRef.child(`/profile/resume/${cureentUid}`);
    imageRef.getDownloadURL().then((url) => {
      setDocUrl(url);
      console.log(" This is doc name",url);
    });

  }, [cureentUid]); 
  
   
  const getUser=()=>{
    const userData= firebase.auth().currentUser.uid
    const currentUserEmail=firebase.auth().currentUser.email
  //  console.log(userData);
   setCureentUid(userData);
   setEmail(currentUserEmail);
   
}  



const getDatabase= async () =>{
  try {
    const ref =firestore().collection(cureentUid)
    return ref.onSnapshot(qurerySnapshot =>{
      const list=[]
      // console.log("qurerySnapshot",qurerySnapshot[0])
      qurerySnapshot.forEach((doc)=>{
       
        const {fname,lname,mobno,address,college,qualification,experance,
          email,currentCTC,noticePeriod,selectedTeam,selectedTeams}=doc.data()
      
        const newselectedTeam=JSON.stringify(selectedTeam.item);

        // const newselectedTeams=JSON.stringify(selectedTeams);
         
        let skills = selectedTeams.map(function(item) {
          return ` ${item ['item']} ,`
        });
      
        if(fname.length >0)
        {
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
          console.log("database is avilable..")
         
          setDataAvailable(true);
        }
      }     
      )
       setList(list)
       
    }) 
     
  } catch (error) {
    console.log(error);
  }
}  


const PicDocument= async()=>{
  try {
     const responce= await DocumentPicker.pickSingle({
          type:[DocumentPicker.types.pdf],
          copyTo:"cachesDirectory"

      })
      console.log(responce);
      setDocData(responce);
      setDocName(responce.name);
  } catch (error) {
      
      console.log(error)
  }
}

async function UplodeResume() {
  // Get the selected document
  const { uri, name,fileCopyUri} = docData;

  // setDocName=name;
  // Create a reference to the location where the document will be saved
  // const reference = storage().ref(`/profile/${name}`);
  const reference = storage().ref(`/profile/resume/${cureentUid}`);

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

  const handleSubmit=async()=>{      
    try {   
     if(fname.length && lname.length && mobno.length && mobno.length && address.length &&
       college.length && qualification.length && experance.length && email.length
       && currentCTC.length && noticePeriod.length >0)
     {
       const UserData={
         id:cureentUid,
         fname:fname,
         lname:lname,
         mobno:mobno,
         address:address,
         college:college,
         qualification:qualification,
         experance:experance,
         selectedTeam:selectedTeam,
         selectedTeams:selectedTeams,
         email:email,
         currentCTC:currentCTC,
         noticePeriod:noticePeriod
      }   
      setFname('');
      setLname('');
      setAddress('');
      setMobno('');
      setCollege('');
      Setqualification('');
      setExpeance('');
      setSelectedTeam({});
      setSelectedTeams([]);
      
      setCurrentCTC('');
      setNoticePeriod('');  
       
     await firestore().collection(cureentUid).add(UserData).then(ref =>{
       console.log(ref)
     })
   
     }
     else{
       alert ("Please Fill all the input fields ")  
     }
     } 
     catch (error) {
       console.log("error");
    }
 }

  const Year = [
    {
      item: '2016',
      id: 'C',
    },
    {
      item: '2017',
      id: 'B',
    },
    {
      item: '2018',
      id: 'A',
    },
    {
      item: '2019',
      id: 'JUVE',
    },
    {
      item: '2020',
      id: 'RM',
    },
    {
      item: '2021',
      id: 'BR',
    },
    {
      item: '2022',
      id: 'PSG',
    },
  ];

  const Skills = [
    {
      id: '1',
      item: 'java',
    },
    {
      id: '2',
      item: 'HTML',
    },
    {
      id: '3',
      item: 'CSS',
    },
    {
      id: '4',
      item: 'JavaScript',
    },
    {
      id: '5',
      item: 'React Native',
    },
    {
      id: '6',
      item: 'SQL',
    },
  ];

  function onMultiChange() {
    return item => setSelectedTeams(xorBy(selectedTeams, [item], 'id'));
  }

  function onChange() {
    return val => setSelectedTeam(val);
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

   const handlePDF=async()=>{
   
    const options = {
      html: `
        <div>
          ${list.map((val,index) => {
            console.log("this is an data fname", val.fname);
            return `
              <div key=${index}>
                <h2>${val.fname} ${val.lname}</h2>
                
                <table border='1'>
                    <thead>
                      <tr>
                        <th>Title</th>
                        <th>Details</th>
                      
                      </tr>
                    </thead>

                    <tr>
                     <td>Name </td>
                     <td>${val.fname} ${val.lname}</td>
                    </tr>

                    <tr>
                     <td>Mobile Number</td>
                      <td> ${val.mobno}</td>
                    </tr>

                    <tr> 
                       <td>Email</td>
                       <td>${val.email}</td>
                    </tr>

                    <tr>
                       <td>Adress</td>
                      <td>${val.address} </td>
                      </tr>

                    <tr>
                      <td>College Name</td>
                      <td>${val.college}</td>
                    </tr>

                    <tr> 
                     <td>Higher Qualification </td>
                     <td>${val.qualification} </td>
                     </tr>

                     <tr> 
                     <td>Year of Passing </td>
                     <td>${val.newselectedTeam} </td>
                     </tr>

                    <tr> 
                      <td>Current CTC</td>
                       <td>${val.currentCTC} LPA </td>
                    </tr>

                    <tr>
                      <td>Total Experance</td>
                      <td>${val.experance} Years </td>
                     </tr>

                    <tr>
                       <td>Notice Period</td>
                       <td> ${val.noticePeriod} Months </td>
                    </tr>
                  
                    <tr>
                       <td>Notice Period</td>
                       <td> ${val.skills} </td>
                    </tr>

                    <tr>
                       <td>Resume</td>
                       <td> ${docUrl} </td>
                    </tr> 
                
              </table>

              </div>
            `
          }).join('')}
        </div>
      `,
      fileName: "html_to_pdf"
    }
    

    const file =await reactNativeHTMLToPdf.convert(options);
    
    const file_path= file.filePath
    console.log("this is an filedv data...",file_path);
    const reference = storage().ref(`/profile/detailsPDF/${file_path}`);

    ///profile/ExcelData/${fileName}

  // Upload the document to Firebase Storage
  try {
    const task = reference.putFile(file_path);
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
    <LinearGradient  colors={["#E6E6FA","#E6E6FA"]} style={styles.main}>
      <ScrollView
        contentContainerStyle={{flexGrow: 1}}
        showsVerticalScrollIndicator={false}
      >
        <View>
          <View>
            <Text style={styles.detailsHeading}>Personal Details </Text>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
            <View>
              <TextInput
                label="First Name"
                mode="outlined"
                // placeholder='Enter the first name'
                value={fname}
                onChangeText={text => setFname(text)}
                style={styles.textInput}
              />
            </View>
            <View>
              <TextInput
                label="Last Name"
                mode="outlined"
                // placeholder='Enter the last name'
                value={lname}
                onChangeText={text => setLname(text)}
                style={styles.textInput}
              />
            </View>
          </View>

          <View style={styles.mobtext}>
            <TextInput
              label="Mobile Number"
              mode="outlined"
              placeholder="Enter your mobile number"
              keyboardType="number-pad"
              value={mobno}
              onChangeText={text => setMobno(text)}
            />
          </View>

          <View style={styles.mobtext}>
            <TextInput
              label="Email"
              mode="outlined"
              placeholder="Enter Your Email"
              value={email}
              onChangeText={text => setEmail(text)}
            />
          </View>

          <View style={styles.mobtext}>
            <TextInput
              label="Address"
              mode="outlined"
              placeholder="Enter Your address"
              value={address}
              onChangeText={text => setAddress(text)}
            />
          </View>

          <View style={{top: 30, marginBottom: 10}}>
            <Text style={styles.detailsHeading}>Educational Details</Text>
          </View>

          <View style={styles.mobtext}>
            <TextInput
              label="College Name"
              mode="outlined"
              placeholder="Enter Your college name"
              value={college}
              onChangeText={text => setCollege(text)}
            />
          </View>

          <View style={styles.mobtext}>
            <TextInput
              label="Higher Qualification"
              mode="outlined"
              placeholder="Enter the Higher Qualification"
              value={qualification}
              onChangeText={text => Setqualification(text)}
            />
          </View>
        </View>

        <View style={{top: 30, width: 300, left: 30}}>
          <Text style={styles.passingYearText}>Select Year of Passing</Text>
          <SelectBox
            label="Select single"
            options={Year}
            value={selectedTeam}
            onChange={onChange()}
            hideInputFilter={false}
          />
        </View>

        <View style={{top: 40, marginBottom: 10}}>
          <Text style={styles.detailsHeading}> Experience Details</Text>
        </View>

        <View style={{top: 30, left: 20}}>
          <TextInput
            label="Year of Experience"
            mode="outlined"
            placeholder="Enter the  year of Experience"
            value={experance}
            keyboardType="number-pad"
            onChangeText={text => setExpeance(text)}
            style={{top: 10, width: 300}}
          />
        </View>

        <View style={{top: 35, left: 20,}}>
          <TextInput
            label="Current CTC"
            mode="outlined"
            keyboardType="number-pad"
            placeholder="Enter Your Current CTC in LPA"
            value={currentCTC}
            onChangeText={text => setCurrentCTC(text)}
            style={{top: 10, width: 300}}
          />
        </View>

        <View style={{top: 40, left: 20}}>
          <TextInput
            label="Notice period"
            mode="outlined"
            keyboardType="number-pad"
            placeholder="Enter thes Notice Period In Month"
            value={noticePeriod}
            onChangeText={text => setNoticePeriod(text)}
            style={{top: 10, width: 300}}
          />
        </View>


        <View style={{top: 50, width: 300, left: 30, marginBottom: 80,}}>
          <Text style={styles.passingYearText}>Select Your Skill Set</Text>
          <SelectBox
            label="Select multiple"
            options={Skills}
            selectedValues={selectedTeams}
            onMultiSelect={onMultiChange()}
            onTapClose={onMultiChange()}
            // inputPlaceholder={}
           
            isMulti
          />
        </View>

        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 30,
          }}
        >
        <View  style={{flex:1,alignItems:"center",flexDirection:"row"}}>
            <View >
              <Pdf trustAllCerts={false} style={{height:50,width:300,}} source={{uri:docUrl}}/>
            </View>
            <TouchableOpacity onPress={()=>handlePdfDownload()}>
            <AntDesign name="download" size={25} color={"black"}/> 
            </TouchableOpacity>
        </View>

      <View>    
    {
         docData ?( 
            <View>
            <Text style={{fontSize:14,fontWeight:"bold",color:"black"}}>{docData.name}</Text>
           

            <TouchableOpacity onPress={()=>UplodeResume()}>
         <View style={styles.uploadeBtn}> 
            <Text style={{fontSize:20,fontWeight:"bold",color:"white"}}>Uplode Resume</Text>
         </View>
       </TouchableOpacity>
            </View>
         ):(
            <Text style={{fontSize:14,fontWeight:"bold",color:"black",marginBottom:10}}>No Resume Selected </Text>
         )
       }
       <TouchableOpacity onPress={()=>PicDocument()} style={{top:20}}>
         <View style={styles.selectBtn}> 
            <Text style={{fontSize:20,fontWeight:"bold",color:"white"}}>Select Resume</Text>
         </View>
       </TouchableOpacity>
    </View>


           
          <TouchableOpacity
           onPress={()=>handleSubmit()}
           style={{top:40,}}
           disabled={dataAvailable}
          >
            {/* <View style={styles.submitbtn}> */}
            <LinearGradient  colors={["#133454","#133454"]} style={styles.uplodebtn}>
              <Text style={{fontSize: 20, fontWeight: 'bold', color: 'white'}}>
                Submit Details
              </Text>
              </LinearGradient>
            {/* </View> */}
          </TouchableOpacity>

          {/* <TouchableOpacity
           onPress={()=>handlePDF(list)}
           style={{marginTop:45,}}
           
          >
          
            <LinearGradient  colors={["#133454","#133454"]} style={styles.uplodebtn}>
              <Text style={{fontSize: 20, fontWeight: 'bold', color: 'white'}}>
               uploadpdf
              </Text>
              </LinearGradient>
           
          </TouchableOpacity> */}

        </View>
      </ScrollView>
   </LinearGradient>
  );
}
const styles = StyleSheet.create({
  textInput: {
    width: 150,
    justifyContent: 'space-between',
    top: 10,
  },
  mobtext: {
    top: 20,
    width: 320,
    left: 20,
    paddingTop: 10,
  },
  detailsHeading: {
    top: 5,
    left: 25,
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  passingYearText: {
    fontSize: 20,
    paddingBottom: 10,
    color: 'black',
    fontWeight: 'bold',
  },
  submitbtn: {
    height: 50,
    width: 200,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  uplodebtn:{
    height: 50,
    width: 200,
    bottom:10,
    backgroundColor: 'purple',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  main:{
    flex:1,
    paddingBottom:90
  },
  selectBtn:{
   height:50,
   width:200,backgroundColor:"#133454",
   justifyContent:"center",
   alignItems:"center",
   marginBottom:30,
   borderRadius:10
   },
   uploadeBtn:{ 
    height:50,
    width:200,backgroundColor:"#133454",
    justifyContent:"center",
    alignItems:"center",
    borderRadius:10

   }
});

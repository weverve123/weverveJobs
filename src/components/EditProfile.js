import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    SafeAreaView,
    TouchableOpacity,
  } from 'react-native';
  import {TextInput} from 'react-native-paper';
  import React, {useEffect, useState} from 'react';
  import SelectBox from 'react-native-multi-selectbox';
  import {xorBy} from 'lodash';
  import { clockRunning, log } from 'react-native-reanimated';
  import LinearGradient from 'react-native-linear-gradient';
  import firestore from '@react-native-firebase/firestore';
  import auth, { firebase } from '@react-native-firebase/auth';

  export default function EditProfile({navigation}) {
    const [fname, setFname] = useState('');
    const [lname, setLname] = useState('');
    const [mobno, setMobno] = useState('');
    const [address, setAddress] = useState('');
    const [college, setCollege] = useState('');
    const [qualification,Setqualification]=useState('');
    const [experance,setExpeance]=useState('')
    
    const [selectedTeam, setSelectedTeam] = useState({});
    const [selectedTeams, setSelectedTeams] = useState([]);
    const [cureentUid,setCureentUid]=useState()
    const [docData,SetDocData]=useState();
    

    useEffect(()=>{
      getUser();
      getDatabase();
    },[cureentUid])
  
  
    const getUser=()=>{
      const userData= firebase.auth().currentUser.uid
    //  console.log(userData);
     setCureentUid(userData);
  }  
   
  
  const getDatabase= async () =>{
    try {
      const ref =firestore().collection(cureentUid)
      return ref.onSnapshot(qurerySnapshot =>{
        const list=[]
        // console.log("qurerySnapshot",qurerySnapshot[0])
        qurerySnapshot.forEach((doc)=>{
         
          const {fname,lname,mobno,address,college,qualification,experance,selectedTeam,selectedTeams}=doc.data()
        
          // console.log(doc.id); 
         
          SetDocData(doc.id);
          setFname(fname);
          setLname(lname);
          setMobno(mobno);
          setAddress(address);
          setCollege(college);
          setExpeance(experance);
          Setqualification(qualification);
          setSelectedTeam(selectedTeam);
          setSelectedTeams(selectedTeams);
        }     
        )
       
      }) 
       
    } catch (error) {
      console.log(error);
    }
  }


    const handleUpdate=async()=>{      
      try {   
       if(fname.length >0 )
       {
         const UserData={
          //  id:cureentUid,
           fname:fname,
           lname:lname,
           mobno:mobno,
           address:address,
           college:college,
           qualification:qualification,
           experance:experance,
           selectedTeam:selectedTeam,
           selectedTeams:selectedTeams
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
         
        console.log("userData",UserData);

        // const res = await cityRef.set({
        //   capital: true
        // }, { merge: true });

       await firestore().collection('cureentUid').doc(docData).update(UserData).then(() =>{
         console.log('Data Is Updated..')
       })

        // var FirbaseData= firestore().collection('cureentUid').doc(docData);
        //   await FirbaseData.update(UserData).then(()=>{
        //   console.log('Data is Updated..')
        //  })

       }
       else{
         alert ("Plese enter the task  // id:doc.cureentUid,")  
       }
       } 
       catch (error) {
         console.log("error",error);
      }
   }
   

    const Year = [
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
  
    return (
      // <View style={{flex: 1}}>
      <LinearGradient  colors={["#89b1d9","#89b1d9"]} style={styles.main}>
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
                label="Adress"
                mode="outlined"
                placeholder="Enter Your adress"
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
            <Text style={styles.detailsHeading}>Experience Details</Text>
          </View>
  
          <View style={{top: 30, left: 20}}>
            <TextInput
              label="Year of Experience"
              mode="outlined"
              placeholder="Enter the  year of Experience"
              value={experance}
              onChangeText={text => setExpeance(text)}
              style={{top: 10, width: 300}}
            />
          </View>
  
          <View style={{top: 50, width: 300, left: 30, marginBottom: 80}}>
            <Text style={styles.passingYearText}>Select Your Skill Set</Text>
            <SelectBox
              label="Select multiple"
              options={Skills}
              selectedValues={selectedTeams}
              onMultiSelect={onMultiChange()}
              onTapClose={onMultiChange()}
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
            <TouchableOpacity
             onPress={()=>handleUpdate()}
            >
                <LinearGradient  colors={["#133454","#133454"]} style={styles.submitbtn}>
                <Text style={{fontSize: 20, fontWeight: 'bold', color: 'white'}}>
                  Update Details
                </Text>
                </LinearGradient>
            </TouchableOpacity>
          </View>
        </ScrollView>
      {/* </View> */}
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
    main:{
      paddingBottom:50
    }

  });
  
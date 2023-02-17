import { View, Text,FlatList, TouchableOpacity,StyleSheet} from 'react-native'
import React,{useState,useEffect} from 'react'
import auth, { firebase } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { white } from 'react-native-paper/lib/typescript/styles/themes/v2/colors';
import EditProfile from './EditProfile';
import LinearGradient from 'react-native-linear-gradient';

export default function UserProfile({navigation}) {

  const [currentUid,setCurrentUid]=useState();
  const [list,setList]=useState();

  useEffect(()=>{

    getDatabase();
     getUser();

  },[currentUid]);

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
        const {fname,lname,mobno,address,college,qualification,experance,}=doc.data()
        list.push({
          id:doc.id,
          fname,
          lname,
          mobno,
          address,
          college,
          qualification,
          experance,
          // selectedTeam,
          // selectedTeams
        })
        setList(list)
      }     
      )
     
    }) 
     
  } catch (error) {
    console.log(error);
  }
}
  return (
   <View style={styles.main}>
      
      <FlatList
           data={list}
           renderItem={({item})=>
           <View>
              <LinearGradient  colors={['#72FFB6', '#10D164',]} style={styles.mainCard}>
              <View style={styles.innerCard}>
                <View style={{height:50,width:300,bottom:20}}>
                  <Text style={{fontSize:30,fontWeight:"bold",color:"black"}}>  Welcome
                  <Text> {item.fname}</Text>
                  </Text>
                </View>
                <Text style={styles.data}>
                  <Text style={styles.tag}>First Name : </Text>
                  {item.fname}
                  </Text>

                <Text style={styles.data}>
                  <Text style={styles.tag}>Last Name : </Text>
                  {item.lname}</Text>

                <Text style={styles.data}>
                  <Text style={styles.tag}>Contact No : </Text>
                  {item.mobno}</Text>

                <Text style={styles.data}>
                <Text style={styles.tag}>Address: </Text>
                  {item.address}</Text>

                <Text style={styles.data}>
                <Text style={styles.tag}>College Name: </Text>
                  {item.college}</Text>

                <Text style={styles.data}>
                <Text style={styles.tag}>Qualification: </Text>
                  {item.qualification}</Text>

                <Text style={styles.data}>
                <Text style={styles.tag}>Experance: </Text>
                  {item.experance}
                  </Text>
                {/* <Text>{item.selectedTeam}</Text>
                <Text>{item.selectedTeams}</Text> */}
              </View>
            
          <View style={{top:200}}>
            <TouchableOpacity
            onPress={()=>navigation.navigate(EditProfile)}
            >
               <View style={{height:50,width:200,backgroundColor:"#3899ac",
               justifyContent:"center",alignItems:"center",borderRadius:20}}>
                 <Text style={{fontSize:22,fontWeight:"bold",color:"white",}}>Edit Information</Text>
               </View>
               </TouchableOpacity>
          </View>
          </LinearGradient> 
           </View>        
                    
          }
          keyExtractor={item => item.id}
        />
       
   </View>

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

    elevation: 8,
    shadowColor: 'blue',
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 0.56,

  },
  tag:{
    fontSize:25,
    fontWeight:"bold",
    color:"black"
  },
  data:{
    fontSize:25,
    fontWeight:"bold",
    color:"black"
  }
  
})
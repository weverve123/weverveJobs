import { View, Text,FlatList, TouchableOpacity,StyleSheet} from 'react-native'
import React,{useState,useEffect} from 'react'
import auth, { firebase } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import EditProfile from './EditProfile';
import LinearGradient from 'react-native-linear-gradient';
import Feather from "react-native-vector-icons/Feather";
import AntDesign from "react-native-vector-icons/AntDesign"
import FontAwesome from "react-native-vector-icons/FontAwesome"


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
        const {fname,lname,mobno,address,college,qualification,experance,selectedTeam,selectedTeams}=doc.data()
        
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
  return (
    <LinearGradient  colors={['#E6E6FA',"#E6E6FA"]} style={styles.main}>    
      <FlatList
           data={list}
           renderItem={({item})=>
           <View>
              <LinearGradient  colors={['white', 'white',]} style={styles.mainCard}>
              <View style={styles.innerCard}>
                <View style={{height:50,width:300,bottom:20}}>
                  <Text style={{fontSize:30,fontWeight:"bold",color:"black"}}>  Welcome
                  <Text> {item.fname}</Text>
                  </Text>
                </View>
             
             <View style={{justifyContent:"space-between"}}>
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
                    <Text style={{fontSize:20,color:"black",left:20}}> 
                  {item.mobno}</Text>
                 </View> 
                 

                <View style={{justifyContent:"flex-start",flexDirection:"row",paddingTop:10}}>
                   <View>
                     <AntDesign name="home" size={25} color={"green"}/> 
                   </View>
                    <View>
                         <Text style={{fontSize:20,color:"black",left:20}}>{item.address}</Text>
                   </View>
                 </View>

              <View style={{justifyContent:"flex-start",flexDirection:"row",paddingTop:10}}>
                  <View>
                     <FontAwesome name="university" size={25} color={"green"}/> 
                  </View>
                 <View>
                    <Text style={{fontSize:20,color:"black",left:10}}>{item.college}</Text>
                  </View>
              </View>

              <View style={{justifyContent:"flex-start",flexDirection:"row",paddingTop:10}}>
                 <View >
                 <FontAwesome name="graduation-cap" size={25} color={"green"}/> 
                 </View>
                <View>
                <Text style={{fontSize:20,color:"black",left:10}}> {item.qualification}</Text>
                </View> 
              </View>

               
              <View style={{flexDirection:"row",padding:5}}>
                <View>
                  <Text style={{fontSize:20,color:"black"}}>Year of passing :</Text> 
                </View>
              <View>
               <Text style={{fontSize:20,color:"black",left:10}}>
                  {item.newselectedTeam}
                </Text>
               </View> 
              </View> 


               <View style={{flexDirection:"row",padding:5}}>
                <View>
                  <Text style={{fontSize:20,color:"black"}}>Year of Experance : </Text>
                </View>
                   <View>
                      <Text style={{fontSize:20,color:"black"}}> {item.experance}</Text>
                   </View>
                </View>
              
        
              <View  style={{flexDirection:"row",padding:5}}>

                <View>
                  <Text  style={{fontSize:20,color:"black"}}>Skills : </Text>
                </View>

                <View>
                   <Text style={{fontSize:20,color:"black"}}>{item.skills}</Text>
                </View>
              
              </View>
              
              </View>

              </View>
            
          <View style={{top:80}}>
            <TouchableOpacity
            onPress={()=>navigation.navigate(EditProfile)}
            >
                <LinearGradient  colors={['#275f96', '#275f96',]} style={styles.btnEdit}>
                 <Text style={{fontSize:22,fontWeight:"bold",color:"white",}}>Edit Information</Text>
                 </LinearGradient>
               </TouchableOpacity>
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
    height:650,width:350,
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
    // fontWeight:"bold",
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
    borderRadius:20
  },
  personalMain:{
    width:320,
    justifyContent:"center",
    alignItems:"center",
    padding:15,
    borderRadius:20,
    marginBottom:20
  }
  
})
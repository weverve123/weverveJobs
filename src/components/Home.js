import { View, Text ,StyleSheet, FlatList, TouchableOpacity, ScrollView,StatusBar} from 'react-native'
import React, { useEffect, useState } from 'react'
import auth, { firebase } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import jobs from './Jobs';
import UserDetails from './UserDetails';
// import { color } from 'react-native-reanimated';
import LinearGradient from 'react-native-linear-gradient';
import EvilIcons from "react-native-vector-icons/EvilIcons"
import Ionicons from "react-native-vector-icons/Ionicons"

export default function Home({navigation}) {

  const [name,setName]=useState();
  const [list,setList]=useState('');

  useEffect(()=>{
    getUser();  
     getDatabase();
     console.log(list);
  },[])


 const getUser=async()=>{
  const userData= await firebase.auth().currentUser.email

  const username=userData.slice(0,5).toUpperCase()
  // console.log(userData);
 setName(username);
}  
 
  const handleApply=()=>{
     navigation.navigate("UserDetails")
  }

 
  const getDatabase= async () =>{
    try {
      const ref =firestore().collection('jobDetails')
     // console.log(ref)
      return ref.onSnapshot(qurerySnapshot =>{
        const list=[]
        console.log(qurerySnapshot,"qurerySnapshot")
        qurerySnapshot.forEach((doc)=>{
          const {Jd,Jobrole,Location,JobType,Skills}=doc.data()
          list.push({
            id:doc.id,
            Jd,
            Jobrole,
            Location,
            JobType,
            Skills
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
    // <View style={styles.main}>
    <LinearGradient  colors={['#E6E6FA',"#E6E6FA"]} style={styles.main}>
        <StatusBar translucent backgroundColor='transparent'  barStyle="dark-content" />

       {/* <View style={{top:10,marginBottom:20}}>
         <Text style={styles.heading}>Welcome to WeVerve {name}</Text> 
       </View> */}


       <ScrollView showsVerticalScrollIndicator={false}>
       <View style={{top:20,}}>
 
       <FlatList
         data={list}
         renderItem={({item})=>(
          // <LinearGradient colors={["#89b1d9", '#89b1d9',]}style={styles.cards}>
          <LinearGradient colors={["white", 'white',]}style={{marginBottom:20,borderRadius:10,justifyContent:"flex-start"}}>
         {/* <View style={styles.cards}> */}
         <View style={{justifyContent:"center",padding:10}}>
          <Text style={styles.jobrole}>{item.Jobrole}</Text>
          </View>

         <View style={{flexDirection:"row",top:10,marginBottom:10,}}>
         <View>
          <EvilIcons name="location" size={30} color={"red"}/> 
          </View> 
          {/* <Text style={{right:60, fontSize:16,color:"black"}}>{item.Location}</Text>  */}
          <View>
             <Text style={styles.location}>{item.Location}</Text>
          </View>

          </View> 

          <View style={{flexDirection:"row",top:10,marginBottom:10,left:4}}>

             <View>
               <Ionicons name='ios-briefcase-outline'size={20} color={"red"}/>
             </View>
             <View style={{left:7}}>
               <Text style={styles.location}>{item.JobType}</Text>
             </View>

          </View>

          <View style={{justifyContent:"flex-start"}}>
          <Text style={styles.skills}>Skills- {item.Skills} </Text>
           
          </View>

         <View style={{justifyContent:"center",alignItems:"center",padding:20,}}>
          <Text style={styles.jdText}>{item.Jd}</Text>
        </View>
         
         <View style={{justifyContent:"center",alignItems:"center"}}>
          <TouchableOpacity style={{marginBottom:20}}
          onPress={()=>handleApply()}
          >
             {/* <View style={styles.btn}> */}
             <LinearGradient colors={['#2193b0', '#2193b0',]} style={styles.btn}>
              <Text style={styles.btntext}>More Details</Text>

              </LinearGradient>
             {/* </View> */}
          </TouchableOpacity>
          </View>
         {/* </View>  */}
         </LinearGradient>
       )
      } 
       keyExtractor={item =>item.id}
       />        
     </View>
     </ScrollView>
       <View> 
       </View>
    {/* </View>  */}
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  main:{
     flex:1,
    // justifyContent:"center",
     alignItems:"center",
     paddingBottom:10,
     paddingTop:40,
    padding:20
    
  },
  heading:{
    fontSize:25,
    marginTop:30,
    fontWeight:"bold",
    color:"black"
  },
  cards:{
    // height:350,
    width:340,
    marginBottom:30,
    // alignSelf:"flex-start",
    alignItems:"center",
    justifyContent:"center"
     
    // elevation: 8,
    // shadowColor: 'blue',
    // shadowOffset: { width: 5, height: 5 },
    // shadowOpacity: 10.56,

  },
  btn:{
    top:10,
    bottom:10,
    height:50,
    justifyContent:"center",
    alignItems:"center",
    alignItems:"center",
    backgroundColor:"red",
    width:180, 
    borderRadius:20
  },
  btntext:{
    fontSize:20,
    // fontWeight:"bold",
    color:"white",
    fontFamily:'Helvetica-Narrow Bold',
  },
   
  jobrole:{
    fontSize:20,
    // padding:10,
    // fontWeight:"bold",
    fontFamily:'Helvetica-Narrow Bold',
    color:"black",
    
  },
  location:{
    fontSize:16,
    color:"black",
    //  fontFamily:'Futura Light Oblique'
    //  fontFamily:'Helvetica-Narrow Bold',
    fontFamily:'Poppins-Regular',
  },
  skills:{
    fontSize:16,
    color:"black",
    top:10,left:10,
     fontFamily:'Poppins-Regular',
    // fontFamily:'Futura Light Oblique'
  },
  jdText:{
    // fontFamily:'Futura Light Oblique',
    fontFamily:'WorkSans-Regular',
    color:"black",
    fontSize:16,
    textAlign:"justify"
  }
})
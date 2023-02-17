import { View, Text ,StyleSheet, FlatList, TouchableOpacity, ScrollView} from 'react-native'
import React, { useEffect, useState } from 'react'
import auth, { firebase } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import jobs from './Jobs';
import UserDetails from './UserDetails';
// import { color } from 'react-native-reanimated';
import LinearGradient from 'react-native-linear-gradient';

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
          const {Jd,Jobrole}=doc.data()
          list.push({
            id:doc.id,
            Jd,
            Jobrole
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
       <View style={{top:10,marginBottom:20}}>
         <Text style={styles.heading}>Welcome to WeVerve {name}</Text>
        
       </View>
       <ScrollView showsVerticalScrollIndicator={false}>
       <View style={{top:20,}}>
 
       <FlatList
         data={list}
         renderItem={({item})=>(
          <LinearGradient colors={['#ec6f66', '#f3a183',]}style={styles.cards}>
         <View style={styles.cards}>
          <Text style={styles.jobrole}>{item.Jobrole}</Text>
          <Text style={styles.jd}>{item.Jd}</Text>

          <TouchableOpacity style={{bottom:5}}
          onPress={()=>handleApply()}
          >
             {/* <View style={styles.btn}> */}
             <LinearGradient colors={['#2193b0', '#6dd5ed',]} style={styles.btn}>
              <Text style={styles.btntext}>Apply Now</Text>

              </LinearGradient>
             {/* </View> */}
          </TouchableOpacity>
         </View> 
         </LinearGradient>
       )
      } 
       keyExtractor={item =>item.id}
       />        
     </View>
     </ScrollView>
       <View> 
       </View>
    </View> 
  )
}

const styles = StyleSheet.create({
  main:{
     flex:1,
    // justifyContent:"center",
     alignItems:"center"
  },
  heading:{
    fontSize:25,
    top:10,
    fontWeight:"bold",
    color:"black"
  },
  cards:{
    height:220,
    width:350,
    marginBottom:30,
    // backgroundColor:"#66CDAA",
    alignItems:"center",
    borderRadius:20,


  },
  btn:{
    top:10,
    bottom:20,
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
    fontWeight:"bold",
    color:"white"
  },
   
  jobrole:{
    fontSize:30,
    fontWeight:"bold",
    fontFamily:'NotoSans',
    color:"white"
  },
  jd:{
    fontSize:15,
    fontWeight:"bold",
    padding:5,
    color:"black"
  }

})
import { View, Text ,StyleSheet,Image, TouchableOpacity} from 'react-native'
import React from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import Swiper from 'react-native-swiper'
import FontAwesome5 from "react-native-vector-icons/FontAwesome5"
import FontAwesome from "react-native-vector-icons/FontAwesome"
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import Entypo from "react-native-vector-icons/Entypo"
export default function AboutUs() {
  return (
    <ScrollView style={styles.main}>
    <View >
       <View style={{padding:20}}>
        <Image source={require('../images/logo_weverve.png')} style={{height:100,width:100}}/>
        <Text style={{bottom:20, left:15,fontSize:17, fontFamily:'Helvetica-Narrow Bold',color:"black"}}>WeVerve</Text>
       </View>
    </View>
     <Swiper 
       autoplay={true}
     style={{height:400, backgroundColor:"#f5f5f5"}}>
     <Image source={require('../images/MobDev.png')} style={{height:300,width:400}} resizeMode='stretch'/>
     <Image source={require('../images/shopiya.png')} style={{height:400,width:400}} resizeMode='cover'/>
     <Image source={require('../images/ecommerce.png')} style={{height:400,width:400}} resizeMode='contain'/>
     <Image source={require('../images/consulting.png')} style={{height:300,width:400}} resizeMode='stretch'/>
     </Swiper>

      <View style={{paddingTop:10,justifyContent:'center',alignItems:"center"}}>
           <Text style={styles.headingContent}>WHAT WE DO</Text>
           <Text style={styles.TextContent}>
            We design and build customer experiences for ambitious high-growth brands.
     We avoid buzzwords – we spend our energy instead focused on creating best-in-class user experiences that translate into the things that matter.
    `The two best friends of execution are simplicity and transparency`. – C. McChesney  
    </Text>
      </View>

    <Swiper style={{height:300,backgroundColor:'#f8f8ff'}}>
     <View style={styles.card}>
      <View style={{top:10,left:15 ,}}>
           <Text style={styles.headingContent}>CONSULTING</Text>
         </View>
         <View style={styles.iconsStyle}>
           <FontAwesome5 name="headset" size={50} color={"#8ecae6"} style={{left:10}}/> 
        </View>

      <View style={{flexDirection:'row',justifyContent:"center",alignItems:'center',paddingHorizontal:20}}>
          
         <View>
            <Text style={styles.TextContent}>For years we have been providing our clients with E-commerce Business and Technology consulting service, Process Optimization, Infrastructure Engineering, Basic Marketing, SEO, Strategy Planning and Agile Project Management.</Text>
         </View>

      </View>
   </View>
   
   <View style={styles.card}>
      <View style={{top:10,left:15 ,}}>
           <Text style={styles.headingContent}>DEVELOPMENT</Text>
         </View>
         <View style={styles.iconsStyle}>
           <MaterialIcons name="developer-mode" size={50} color={"#8ecae6"} style={{left:10}}/> 
        </View>

      <View style={{flexDirection:'row',justifyContent:"center",alignItems:'center',paddingHorizontal:20}}>
      
         <View>
            <Text style={styles.TextContent}>Our team deals with existing platforms such as Magento, Shopify, WooCom, and custom web platforms. Whether you are looking for a dedicated team of engineers for your project or an agency to deliver a complete solution we do as per your comfort.</Text>
         </View>

      </View>
   </View>



   <View style={styles.card}>
      <View style={{top:10,left:15 ,}}>
           <Text style={styles.headingContent}>SUPPORT</Text>
         </View>

         <View style={styles.iconsStyle}>
           <MaterialCommunityIcons name="arrow-decision" size={50} color={"#8ecae6"} style={{left:10}}/> 
        </View>
      <View style={{flexDirection:'row',justifyContent:"center",alignItems:'center',paddingHorizontal:20}}>
         
         <View>
            <Text style={styles.TextContent}>We love to build a long term partnership to support the growth of your business. We'll monitor analytics to website performance 24/7/365. We can set-up an excellent Support Team at better cost savings so that you can serve your own customers better.</Text>
         </View>

      </View>
   </View>

   <View style={styles.card}>
      <View style={{top:10,left:15 ,}}>
           <Text style={styles.headingContent}>B2B/B2C CUSTOMIZATION</Text>
         </View>
         <View style={styles.iconsStyle}>
           <FontAwesome name="gears" size={50} color={"#8ecae6"} style={{left:10,top:10}}/> 
        </View>

      <View style={{flexDirection:'row',justifyContent:"center",alignItems:'center',paddingHorizontal:20}}>
         
        
         <View>
            <Text style={styles.TextContent}>We leverage our expertise and partnerships with powerful platforms such as Magento, Shopify, Salesforce, Klaviyo, Yotpo, Woo-Commerce and more. We are not just coders; we are solution engineers with powerful eCommerce capabilities to produce amazing results.</Text>
         </View>

      </View>
   </View>

   <View style={styles.card}>
      <View style={{top:10,left:15 ,}}>
           <Text style={styles.headingContent}>SEAMLESS INTERGRATIONS</Text>
         </View>
         <View style={styles.iconsStyle}>
           <Entypo name="tools" size={50} color={"#8ecae6"} style={{left:10,top:10}}/> 
        </View>

      <View style={{flexDirection:'row',justifyContent:"center",alignItems:'center',paddingHorizontal:20}}>
         
        
         <View>
            <Text style={styles.TextContent}>We do integration and Customization of CRM/ERP/3PLM platforms such as Salesforce, Microsoft Dynamics, SAP; Payment gateways (Paypal, Stripe, Authorize.net and more); SMS and Email marketing tools like Klaviyo, Twilio, Mailchimp etc.</Text>
         </View>

      </View>
   </View>
   </Swiper>

   <View style={{height:150,backgroundColor:"#bfbab4"}}>
      <View style={{height:80,width:320}}>
        <Text style={{backgroundColor:"#bfbab4",padding:20,fontSize:16,color:"white"}}>HAVE AN IDEA? WE’RE HERE TO HELP YOU MANAGE YOUR WORK .</Text>
      </View>
      <View style={{justifyContent:'center',alignItems:'center'}}>
        <TouchableOpacity>
            <View style={{height:40,width:100,borderWidth:2,borderColor:"white",padding:2,alignItems:'center',justifyContent:'center'}}>
              <Text style={{color:'white'}}>CONTACT US</Text>
            </View>
        </TouchableOpacity>
      </View>

   </View>
   <View style={{backgroundColor:"#808080",flexDirection:"row",paddingBottom:30}}>
      <View style={{backgroundColor:"#808080",height:80,padding:30}}>
         <Text style={styles.footerContent}>info@weverve.com</Text>
         <Text style={styles.footerContent}>+1 914 215 5131</Text>
         <Text style={styles.footerContent}>+49 174 2125087</Text>
      </View>
   <View>
       <View style={{flexDirection:"row",top:40,justifyContent:"space-around"}}>
        <TouchableOpacity>
          <View style={{left:20}} >
             <Entypo name="linkedin" size={30} color={"white"} /> 
          </View>
        </TouchableOpacity> 

         <View style={{left:30}}>
           <Entypo name="facebook" size={30} color={"white"} /> 
         </View> 
          
          <View style={{left:40}}>
            <Entypo name="twitter" size={30} color={"white"} /> 
          </View>
          
          <View style={{left:50}}>
            <Entypo name="instagram" size={30} color={"white"}/> 
          </View>
       </View>

       <View></View>
    </View>
   </View>
    </ScrollView> 
  )
}

const styles = StyleSheet.create({
   main:{
    flex:1,
   },
   iconsStyle:{
    justifyContent:"center",
    alignItems:"center"
   },
  card:{
    backgroundColor:'#f8f9f5',
    
  },
  footerContent:{
    fontSize:15,
    color:"white"
  },
  headingContent:{
    fontSize:20,color:'black',
    // fontWeight:"bold",
    fontFamily:'Helvetica-Narrow Bold'
  },
  TextContent:{
     justifyContent:'center',
     alignContent:'center',
    padding:25,
    fontSize:17,color:'black',
   //  fontFamily:'Futura Light Oblique',
   fontFamily:'WorkSans-Regular',
    textAlign:"justify"
  }

})
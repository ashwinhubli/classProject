import React from 'react';
import { Text, View ,TouchableOpacity,StyleSheet} from 'react-native';
import * as Permissions from 'expo-permissions';
import {BarCodeScanner} from 'expo-barcode-scanner'

export default class TransactionScreen extends React.Component {
  constructor(){
    super();
    this.state={
      hasCameraPermissions: null,
      scan: false,
      scanData: '',
      buttonState: 'normal'
    }
  }
   getCameraPermissions=async()=>{
     const {status}=await Permissions.askAsync(Permissions.CAMERA);
     this.setState({
       hasCameraPermissions: status === 'granted'
     })
   }
   handleBarCodeScanned=async({type,data})=>{
    this.setState({
      scan: true,
      scanData:data,
      buttonState: 'normal'
    })
   }  
    render() {
      const hasCameraPermissions=this.state.hasCameraPermissions;
      const scan = this.state.scan;
      const buttonState = this.state.buttonState

      if(buttonState==="clicked" && hasCameraPermissions){
         return (
           <BarCodeScanner 
            onBarCodeScanned={scanned? undefined:this.handleBarCodeScanned}
            style={StyleSheet.absoluteFillObject}
           />
         )      
      }      
      else if(buttonState==='normal'){
        return(
          <View style={styles.container}>
            <Text style={styles.displayText}>{hasCameraPermissions===true?this.state.scanData:"request camera permission"}</Text>
            <TouchableOpacity style={styles.scanButton} onPress={this.getCameraPermissions}>
             <Text style={styles.buttonText}>Scan QR Code</Text>
           </TouchableOpacity>
          </View>
        )
      }
      
    
    }
  
  }
  const styles=StyleSheet.create({
     container:{
       flex:1,
       justifyContent:'center',
       alignItems: 'center'
     },
  displayText:{
        fontSize: 15,
      }, 
     scanButton:{
       backgroundColor: '#2196f3',
       padding: 10,
       margin: 10
     }
    
  })
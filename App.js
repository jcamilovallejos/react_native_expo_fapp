import React, {useState} from 'react';
import { Text, View, StyleSheet, Image, Button, Alert, TouchableOpacity } from 'react-native';
import RubyImage from './assets/images/diamonds.jpg'
import * as ImagePicker from 'expo-image-picker'
import * as Sharing from 'expo-sharing'

const App = () => {


  const [selectedImage, setSelectedImage] = useState(null)



  let openImagePickerAsync = async () => {
    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync()
    if(permissionResult.granted === false){
      alert("Permissions to access camera is required")
      return
    }

    const pickerResult = await ImagePicker.launchImageLibraryAsync()

    if (pickerResult.cancelled === true) {
      return
    }

    setSelectedImage({localUri: pickerResult.uri})

  }


  const openSharedDialog = async () =>{
    if(!(await Sharing.isAvailableAsync())){
      alert("Sharing, is not available on your plataform")
      return
    }


    await Sharing.shareAsync(selectedImage.localUri)

  }


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pick an image!</Text>
      
      <TouchableOpacity onPress={openImagePickerAsync}>
        <Image source={{uri: selectedImage !== null ? selectedImage.localUri : 'https://i.picsum.photos/id/978/640/480.jpg?hmac=wgrJv-EPmgYcdXdloGiGZrG8pAvNq2fyq2aCiCAaAno'}}
                style={styles.image}
          />
      </TouchableOpacity>
      

      <Image source={RubyImage}
             style={styles.image}
      />
      <Button 
        color = "red" 
        title = "Press me"
        onPress={() => Alert.alert("Hello!!!")}
      />

      {
        selectedImage ? (
        <TouchableOpacity onPress={openSharedDialog}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Shared this image</Text>
        </TouchableOpacity>) : ''
      }


    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: "#292929"},
  title: {fontSize:30, color: "white"},
  image: {height:200, width:200, borderRadius: 100},
  button: {backgroundColor: "blue", padding:7, marginTop:10},
  buttonText: {
    color: "#fff"
  }
  
})

export default App;


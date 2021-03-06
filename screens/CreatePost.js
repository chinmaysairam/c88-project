import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
  Image,
  ScrollView,
  TextInput,
  Dimensions,
  Button,
  Alert
} from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import DropDownPicker from "react-native-dropdown-picker";

import AppLoading from "expo-app-loading";
import * as Font from "expo-font";
let customFonts = {
  "Bubblegum-Sans": require("../assets/fonts/BubblegumSans-Regular.ttf")
};

export default class CreatePost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fontsLoaded: false,
      previewImage: "image_2",
      dropdownHeight: 40,
      light_theme:true
    };
  }

  async _loadFontsAsync() {
    await Font.loadAsync(customFonts);
    this.setState({ fontsLoaded: true });
  }

  fetchUser=()=>{
    let theme;
    firebase.database().ref("/users/"+firebase.auth().currentUser.uid)
    .on("value",(snapshot)=>{
theme=snapshot.val().current_theme
this.setState({light_theme:theme==="light"})
    })
  }

  async addPost(){
if(this.state.caption){
  let PostData={
    previewImage:this.state.previewImage,
    caption:this.state.caption,
    author:firebase.auth().currentUser.displayName,
    created_on: new Date(),
    author_uid:firebase.auth().currentUser.uid,
    profile_image:this.state.profile_image,
    likes:0
  }
  await firebase.database().ref("/posts/"+Math.random().toString(36).slice(2)).set(PostData)
this.props.navigation.navigate("Feed")
}
else{
  Alert.alert("enter all the field values")
}

}
  

  

  componentDidMount() {
    this._loadFontsAsync();
    this.fetchUser();
  }
  render() {
    if (!this.state.fontsLoaded) {
      return <AppLoading />;
    } else {
      let preview_images = {
        image_1: require("../assets/butterfly.jpeg"),
        image_2: require("../assets/lake.jpeg"),
        image_3: require("../assets/peacock.jpeg"),
        image_4: require("../assets/splash.jpeg"),
        image_5: require("../assets/waterfall.jpeg")
      };
      return (
        <View style={this.light_theme?styles.containerLight:styles.container}>
          <SafeAreaView style={styles.droidSafeArea} />
          <View style={styles.appTitle}>
            <View style={styles.appIcon}>
              <Image
                source={require("../assets/logo.png")}
                style={styles.iconImage}
              ></Image>
            </View>
            <View style={styles.appTitleTextContainer}>
              <Text style={this.light_theme?styles.appTitleTextLight:styles.appTitleText}>New Story</Text>
            </View>
          </View>
          <View style={styles.fieldsContainer}>
            <ScrollView>
              <Image
                source={preview_images[this.state.previewImage]}
                style={styles.previewImage}
              ></Image>
              <View style={{ height: RFValue(this.state.dropdownHeight) }}>
                <DropDownPicker
                  items={[
                    { label: "Image 1", value: "image_1" },
                    { label: "Image 2", value: "image_2" },
                    { label: "Image 3", value: "image_3" },
                    { label: "Image 4", value: "image_4" },
                    { label: "Image 5", value: "image_5" }
                  ]}
                  defaultValue={this.state.previewImage}
                  containerStyle={{
                    height: 40,
                    borderRadius: 20,
                    marginBottom: 10
                  }}
                  onOpen={() => {
                    this.setState({ dropdownHeight: 170 });
                  }}
                  onClose={() => {
                    this.setState({ dropdownHeight: 40 });
                  }}
                  style={{ backgroundColor: "transparent" }}
                  itemStyle={{
                    justifyContent: "flex-start"
                  }}
                  dropDownStyle={{ backgroundColor: "" }}
                  labelStyle={{
                    color: "white",
                    fontFamily: "Bubblegum-Sans"
                  }}
                  arrowStyle={{
                    color: "white",
                    fontFamily: "Bubblegum-Sans"
                  }}
                  onChangeItem={item =>
                    this.setState({
                      previewImage: item.value
                    })
                  }
                />
              </View>
              <TextInput style={this.light_theme?styles.inputFontLight:styles.inputFont}
              placeholder={"Title"}
              placeholderTextColor="white"
              onChangeText={(title)=>{this.setState({title})}}/>
               <TextInput style={[styles.inputFont,styles.inputFontExtra,styles.inputTextBig]}
              placeholder={"Description"}
              placeholderTextColor="white"
              onChangeText={(description)=>{this.setState({description})}}
              multiline={true}
              numberOfLines={4}/>
               <View style={styles.submitButton}> 
<Button onPress={()=>{this.addPost()}}
title="submit" color="#841584"/>
              </View>
            </ScrollView>
          </View>
          <View style={{ flex: 0.08 }} />
        </View>
      );
    }
  }


}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#15193c"
  },
  containerLight: {
    flex: 1,
    backgroundColor: "white"
  },
  droidSafeArea: {
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : RFValue(35)
  },
  appTitle: {
    flex: 0.07,
    flexDirection: "row"
  },
  appIcon: {
    flex: 0.3,
    justifyContent: "center",
    alignItems: "center"
  },
  iconImage: {
    width: "100%",
    height: "100%",
    resizeMode: "contain"
  },
  appTitleTextContainer: {
    flex: 0.7,
    justifyContent: "center"
  },
  appTitleText: {
    color: "white",
    fontSize: RFValue(28),
    fontFamily: "Bubblegum-Sans"
  },
  appTitleTextLight: {
    color: "black",
    fontSize: RFValue(28),
    fontFamily: "Bubblegum-Sans"
  },
  fieldsContainer: {
    flex: 0.85
  },
  previewImage: {
    width: "93%",
    height: RFValue(250),
    alignSelf: "center",
    borderRadius: RFValue(10),
    marginVertical: RFValue(10),
    resizeMode: "contain"
  },
  inputFont: { height: RFValue(40), borderColor: "white", borderWidth: RFValue(1), borderRadius: RFValue(10), paddingLeft: RFValue(10), color: "white", fontFamily: "Bubblegum-Sans" }, inputFontExtra: { marginTop: RFValue(15) }, inputTextBig: { textAlignVertical: "top", padding: RFValue(5) },

inputFontLight: { height: RFValue(40), borderColor: "black", borderWidth: RFValue(1), borderRadius: RFValue(10), paddingLeft: RFValue(10), color: "black", fontFamily: "Bubblegum-Sans" }, inputFontExtra: { marginTop: RFValue(15) }, inputTextBig: { textAlignVertical: "top", padding: RFValue(5) },
submitButton: { marginTop: RFValue(20), alignItems: "center", justifyContent: "center" }
});



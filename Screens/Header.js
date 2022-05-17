import React from "react";
import { Image } from "native-base";
import { SafeAreaView } from "react-native";
import { StyleSheet } from "react-native-web";
const Header = () => {
  return (
    <SafeAreaView style={styles.header}>
      <Image
        //source={require("../assets/icon.png")}
        resizeMode="contain"
        style={{ height: 50 }}
      />
    </SafeAreaView>
  );
};

//Create is function which recieve an object with style
const styles = StyleSheet.create({
  header: {
    width: "100%",
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "center",
    padding: 20,
  },
});

export default Header;

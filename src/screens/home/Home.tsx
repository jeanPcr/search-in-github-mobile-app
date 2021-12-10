import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import CustomSearchBar from "../../components/customSearchBar/CustomSearchBar";

const Home = () => {
  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require("../../../assets/logo.png")} />
      <Text style={styles.title}>Github</Text>
      <Text style={styles.slogan}>It's so easy to find a profile!</Text>
      <CustomSearchBar />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F7F7",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10,
  },
  logo: {
    width: 180,
    height: 180,
  },
  title: {
    fontSize: 70,
    fontWeight: "700",
  },
  slogan: {
    fontSize: 20,
  },
});

import React from "react";
import {
  Image,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from "react-native";
import CustomSearchBar from "../../components/customSearchBar/CustomSearchBar";

const NotFoundScreen = ({ navigation, route }: any) => {
  const { username } = route.params;
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={require("../../../assets/not_found.jpg")}
      />
      <Text style={styles.title}>404 {"\n"} Not Found</Text>
      <Text style={styles.slogan}>"{username}" does not exists in Github.</Text>

      <TouchableHighlight
        style={styles.buttonContainer}
        onPress={() => navigation.navigate("Home")}
      >
        <Text style={styles.buttonText}>Try again</Text>
      </TouchableHighlight>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  image: {
    width: 150,
    height: 150,
  },
  title: {
    color: "#000",
    fontSize: 40,
    fontWeight: "700",
    textAlign: "center",
  },
  slogan: {
    color: "#000",
    fontSize: 20,
    textAlign: "center",
  },
  buttonContainer: {
    backgroundColor: "#4AA96C",
    paddingVertical: 10,
    paddingHorizontal: 50,
    borderRadius: 30,
    bottom: -30,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#FFF",
    fontSize: 20,
    fontWeight: "bold",
    alignSelf: "center",
  },
});

export default NotFoundScreen;

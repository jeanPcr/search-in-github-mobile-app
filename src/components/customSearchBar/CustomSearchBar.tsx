import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Searchbar } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

const CustomSearchBar = () => {
  const [search, setSearch] = useState("");
  const navigation = useNavigation();

  const handleText = (text: string) => {
    setSearch(text);
  };

  const handleSearch = () => {
    if (search !== "") {
      navigation.navigate("Profile", { username: search });
      setSearch("");
    }
  };

  return (
    <View style={styles.container}>
      <Searchbar
        style={styles.inputContainer}
        inputStyle={styles.input}
        placeholder="Type a user login here..."
        onChangeText={handleText}
        onIconPress={handleSearch}
        value={search}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "center",
    width: "90%",
    borderWidth: 0,
    marginVertical: 10,
  },
  input: {
    borderWidth: 0,
  },
  inputContainer: {
    borderWidth: 0,
    backgroundColor: "#C9E4C5",
    borderRadius: 50,
  },
});

export default CustomSearchBar;

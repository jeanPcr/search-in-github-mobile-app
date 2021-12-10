import React from "react";
import { View } from "react-native";
import { ActivityIndicator } from "react-native-paper";

const Loader = () => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <ActivityIndicator size="large" color="#4AA96C" />
    </View>
  );
};

export default Loader;

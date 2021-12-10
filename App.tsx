import React from "react";
import { StyleSheet, View } from "react-native";
import Home from "./src/screens/home/Home";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Profile from "./src/screens/profile/Profile";
import NotFoundScreen from "./src/screens/notFoundScreen/NotFoundScreen";

export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    <View style={styles.container}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            options={{ headerShown: false }}
            name="Home"
            component={Home}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="NotFound"
            component={NotFoundScreen}
          />
          <Stack.Screen
            name="Profile"
            options={{
              headerTitleAlign: "center",
              headerTitle: "Github Profile",
            }}
            component={Profile}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F7F7",
  },
});

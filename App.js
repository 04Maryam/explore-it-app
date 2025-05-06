import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import CameraScreen from "./screens/CameraScreen";
import LocationScreen from "./screens/LocationScreen";
import ContactsScreen from "./screens/ContactsScreen";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
// import AntDesign from "@expo/vector-icons/AntDesign";

const Tab = createBottomTabNavigator();


export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === "Camera") {
              iconName = focused ? "camera" : "camera-outline";
            } else if (route.name === "Location") {
              iconName = focused ? "location" : "location-outline";
            } else if (route.name === "Contacts") {
              iconName = focused ? "contacts" : "contacts-outline";
              return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: "tomato",
          tabBarInactiveTintColor: "gray",
        })}
      >
        <Tab.Screen name="Camera" component={CameraScreen} />
        <Tab.Screen name="Location" component={LocationScreen} />
        <Tab.Screen name="Contacts" component={ContactsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center",
//   },
// });

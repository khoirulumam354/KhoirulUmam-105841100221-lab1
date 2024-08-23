import React from "react";
import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import Profil from "./pages/Profil";
import ForgotPage from "./pages/ForgotPage";
import kalkulatorzakat from "./pages/KalkulatorZakat";
import RiwayatZakat from "./pages/Riwayat";
import { AntDesign } from "@expo/vector-icons";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: { backgroundColor: "#FFFFF3" },
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
          tabBarLabel: ({ focused }) => (
            <Text style={{ color: focused ? "#A07178" : "gray" }}>Home</Text>
          ),
          tabBarIcon: ({ size, focused }) => (
            <AntDesign name="home" color={focused ? "#A07178" : "gray"} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="kalkulator"
        component={kalkulatorzakat}
        options={{
          headerShown: false,
          tabBarLabel: ({ focused }) => (
            <Text style={{ color: focused ? "#A07178" : "gray" }}>Kalkulator</Text>
          ),
          tabBarIcon: ({ size, focused }) => (
            <AntDesign name="calculator" color={focused ? "#A07178" : "gray"} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Riwayat"
        component={RiwayatZakat}
        options={{
          headerShown: false,
          tabBarLabel: ({ focused }) => (
            <Text style={{ color: focused ? "#A07178" : "gray" }}>Riwayat</Text>
          ),
          tabBarIcon: ({ size, focused }) => (
            <AntDesign name="carryout" color={focused ? "#A07178" : "gray"} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profil}
        options={{
          headerStyle: { backgroundColor: "#2b6cb0" },
          headerTintColor: "white", 
          tabBarLabel: ({ focused }) => (
            <Text style={{ color: focused ? "#A07178" : "gray" }}>Profile</Text>
          ),
          tabBarIcon: ({ size, focused }) => (
            <AntDesign name="user" color={focused ? "#A07178" : "gray"} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="SignUp" component={SignUpPage} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={LoginPage} options={{ headerShown: false }} />
        <Stack.Screen name="Forgot" component={ForgotPage} options={{ headerShown: false }} />
        <Stack.Screen name="Main" component={MainTabs} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

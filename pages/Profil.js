import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFonts } from 'expo-font';
import { LinearGradient } from 'expo-linear-gradient';
import { AntDesign } from "@expo/vector-icons";

const Profil = () => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    visitHistory: [],
  });

  const [fontsLoaded] = useFonts({
    "Metro-Bold": require("../assets/fonts/Metropolis-Bold.otf"),
    "Metro-Thin": require("../assets/fonts/Metropolis-Thin.otf"),
    "Metro-Medium": require("../assets/fonts/Metropolis-Medium.otf"),
    "Metro-Semibold": require("../assets/fonts/Metropolis-SemiBold.otf"),
    "Metro-Black": require("../assets/fonts/Metropolis-Black.otf"),
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await AsyncStorage.getItem('user');
        if (userData) {
          const parsedData = JSON.parse(userData);
          setUser({
            name: parsedData.name || 'N/A',
            email: parsedData.email || 'N/A',
            visitHistory: parsedData.visitHistory || [],
          });
        }
      } catch (error) {
        console.error('Error fetching user data: ', error);
      }
    };

    fetchUserData();
  }, []);

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Font tidak ditemukan!</Text>
      </View>
    );
  }

  const menuItems = [
    { label: 'User Information', icon: 'user', value: `${user.name}, ${user.email}` },
    { label: 'Visit History', icon: 'calendar', value: `${user.visitHistory.length} visits` },
    { label: 'Zakat Contributions', icon: 'wallet', value: 'View your contributions' },
    { label: 'Donation History', icon: 'profile', value: 'View past donations' },
    { label: 'Support', icon: 'questioncircleo', value: 'Get help or support' },
    { label: 'Settings', icon: 'setting', value: 'Manage your account' },
  ];

  return (
    <LinearGradient colors={['#2b6cb0', '#FBA834']} style={styles.scrollViewContent}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {menuItems.map((item, index) => (
          <TouchableOpacity key={index} style={styles.menuItem}>
            <View style={styles.menuItemContent}>
              <AntDesign name={item.icon} style={styles.menuIcon} />
              <View style={styles.menuTextContainer}>
                <Text style={styles.menuLabel}>{item.label}</Text>
                <Text style={styles.menuValue}>{item.value}</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
  },
  menuItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#fff',
    backgroundColor: 'transparent',
  },
  menuItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuIcon: {
    fontSize: 24,
    marginRight: 15,
    color: '#fff',
  },
  menuTextContainer: {
    flex: 1,
  },
  menuLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    fontFamily: "Metro-Bold",
  },
  menuValue: {
    fontSize: 14,
    color: '#ddd',
    marginTop: 5,
    fontFamily: "Metro-Thin",
  },
});

export default Profil;

import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import { AntDesign } from '@expo/vector-icons';
import { useFonts } from 'expo-font';

const RiwayatZakat = () => {
  const [zakatHistory, setZakatHistory] = useState([]);
  const [nextZakatRecommendation, setNextZakatRecommendation] = useState('');

  const [fontsLoaded] = useFonts({
    "Metro-Bold": require("../assets/fonts/Metropolis-Bold.otf"),
    "Metro-Thin": require("../assets/fonts/Metropolis-Thin.otf"),
    "Metro-Medium": require("../assets/fonts/Metropolis-Medium.otf"),
    "Metro-Semibold": require("../assets/fonts/Metropolis-SemiBold.otf"),
    "Metro-Black": require("../assets/fonts/Metropolis-Black.otf"),
  });

  useEffect(() => {
    const fetchZakatData = async () => {
      try {
        const zakatData = await AsyncStorage.getItem('zakatHistory');
        if (zakatData) {
          setZakatHistory(JSON.parse(zakatData));
        }

        const recommendationData = await AsyncStorage.getItem('nextZakatRecommendation');
        if (recommendationData) {
          setNextZakatRecommendation(recommendationData);
        }
      } catch (error) {
        console.error('Error fetching zakat data: ', error);
      }
    };

    fetchZakatData();
  }, []);

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Font tidak ditemukan!</Text>
      </View>
    );
  }

  return (
    <LinearGradient colors={['#2b6cb0', '#FBA834']} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Riwayat Zakat</Text>
        </View>
        {zakatHistory.length > 0 ? (
          zakatHistory.map((item, index) => (
            <View key={index} style={styles.zakatItem}>
              <View style={styles.zakatIconContainer}>
                <AntDesign name="wallet" style={styles.zakatIcon} />
              </View>
              <View style={styles.zakatTextContainer}>
                <Text style={styles.zakatTitle}>Zakat #{index + 1}</Text>
                <Text style={styles.zakatDate}>{item.date}</Text>
                <Text style={styles.zakatAmount}>Rp {item.amount.toLocaleString()}</Text>
              </View>
            </View>
          ))
        ) : (
          <Text style={styles.noZakatText}>Belum ada riwayat zakat.</Text>
        )}
        <View style={styles.recommendationContainer}>
          <Text style={styles.recommendationTitle}>Rekomendasi Zakat Berikutnya</Text>
          <Text style={styles.recommendationText}>{nextZakatRecommendation || 'Belum ada rekomendasi.'}</Text>
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollViewContent: {
    marginTop: 40,
    padding: 20,
  },
  header: {
    marginBottom: 20,
  },
  headerText: {
    fontSize: 24,
    fontFamily: 'Metro-Bold',
    color: '#fff',
    textAlign: 'center',
  },
  zakatItem: {
    flexDirection: 'row',
    padding: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 10,
    marginBottom: 15,
  },
  zakatIconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  zakatIcon: {
    fontSize: 30,
    color: '#fff',
  },
  zakatTextContainer: {
    flex: 1,
  },
  zakatTitle: {
    fontSize: 18,
    fontFamily: 'Metro-Semibold',
    color: '#fff',
  },
  zakatDate: {
    fontSize: 14,
    fontFamily: 'Metro-Thin',
    color: '#ddd',
    marginTop: 5,
  },
  zakatAmount: {
    fontSize: 16,
    fontFamily: 'Metro-Bold',
    color: '#fff',
    marginTop: 5,
  },
  noZakatText: {
    fontSize: 16,
    fontFamily: 'Metro-Thin',
    color: '#fff',
    textAlign: 'center',
    marginTop: 20,
  },
  recommendationContainer: {
    marginTop: 30,
    padding: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 10,
  },
  recommendationTitle: {
    fontSize: 20,
    fontFamily: 'Metro-Bold',
    color: '#fff',
    marginBottom: 10,
    textAlign: 'center',
  },
  recommendationText: {
    fontSize: 16,
    fontFamily: 'Metro-Thin',
    color: '#fff',
    textAlign: 'center',
  },
});

export default RiwayatZakat;

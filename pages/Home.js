import React, { useRef, useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, FlatList, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFonts } from 'expo-font';

const { width: viewportWidth } = Dimensions.get('window');

const Home = () => {
  const [username, setUsername] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef(null);

  const carouselImages = [
    require('../assets/gambar/1.jpg'),
    require('../assets/gambar/2.jpg'),
    require('../assets/gambar/3.jpg'),
    require('../assets/gambar/4.jpg'),
    require('../assets/gambar/5.jpg'),
    require('../assets/gambar/6.jpg'),
  ];

  const [fontsLoaded] = useFonts({
    "Metro-Bold": require("../assets/fonts/Metropolis-Bold.otf"),
    "Metro-Thin": require("../assets/fonts/Metropolis-Thin.otf"),
    "Metro-Medium": require("../assets/fonts/Metropolis-Medium.otf"),
    "Metro-Semibold": require("../assets/fonts/Metropolis-SemiBold.otf"),
    "Metro-Black": require("../assets/fonts/Metropolis-Black.otf"),
  });

  useEffect(() => {
    const fetchUsername = async () => {
      try {
        const userData = await AsyncStorage.getItem('user');
        if (userData) {
          const { name } = JSON.parse(userData);
          setUsername(name);
        }
      } catch (error) {
        console.error('Error fetching username:', error);
      }
    };

    fetchUsername();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (carouselRef.current) {
        const nextIndex = (currentIndex + 1) % carouselImages.length;
        carouselRef.current.scrollToIndex({ index: nextIndex, animated: true });
        setCurrentIndex(nextIndex);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  const renderCarouselImage = ({ item }) => (
    <Image
      source={item}
      style={styles.carouselImage}
      resizeMode="cover"
    />
  );

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Font tidak ditemukan!</Text>
      </View>
    );
  }

  return (
    <LinearGradient
      colors={['#2b6cb0', '#FBA834']}
      style={styles.container}
    >
      <View style={styles.header}>
        <Image
          source={require('../assets/logo.png')}
          style={styles.logo}
          resizeMode="cover"
        />
        <View style={styles.borderBottom} />
      </View>

      <View style={styles.carouselContainer}>
        <FlatList
          ref={carouselRef}
          data={carouselImages}
          renderItem={renderCarouselImage}
          keyExtractor={(item, index) => index.toString()}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={(event) => {
            const contentOffsetX = event.nativeEvent.contentOffset.x;
            const newIndex = Math.floor(contentOffsetX / viewportWidth);
            if (newIndex !== currentIndex) {
              setCurrentIndex(newIndex);
            }
          }}
        />
      </View>

      <View style={styles.content}>
        <Text style={styles.welcomeText}>Selamat Datang, {username}</Text>
        <Text style={styles.descriptionText}>
          ZakatEase adalah platform yang memudahkan Anda dalam mengelola zakat dan sedekah. 
          Melalui aplikasi ini, Anda dapat berdonasi dengan mudah dan memastikan 
          kontribusi Anda tepat sasaran.
        </Text>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    alignItems: 'center',
    marginTop: 40,
  },
  logo: {
    width: 300,
    height: 100,
  },
  borderBottom: {
    width: '100%',
    height: 2,
    backgroundColor: '#fff',
    marginTop: 5,
  },
  carouselContainer: {
    marginTop: 40,
    width: '100%',
    marginBottom: 8,
  },
  content: {
    marginTop: 40,
    flex: 1,
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 28,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 10,
    fontFamily: "Metro-Bold", 
  },
  descriptionText: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'justify',
    marginHorizontal: 10,
    marginBottom: 10,
    fontFamily: "Metro-Thin", 
  },
  carouselImage: {
    width: viewportWidth,
    height: 150,
  },
});

export default Home;

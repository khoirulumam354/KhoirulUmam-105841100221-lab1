import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const formatNumber = (value) => {
  return value.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

const unformatNumber = (value) => {
  return value.replace(/,/g, '');
};

const isValidInput = (value) => {
  const numericValue = parseFloat(unformatNumber(value));
  return !isNaN(numericValue) && numericValue > 0 && numericValue <= 1000000000000; // Example limit: 1 trillion IDR
};

const KalkulatorZakat = () => {
  const [harta, setHarta] = useState('');
  const [penghasilan, setPenghasilan] = useState('');
  const [aset, setAset] = useState('');
  const [zakatHarta, setZakatHarta] = useState(0);
  const [zakatPenghasilan, setZakatPenghasilan] = useState(0);
  const [zakatAset, setZakatAset] = useState(0);

  const handleCalculateZakat = () => {
    if (!isValidInput(harta) || !isValidInput(penghasilan) || !isValidInput(aset)) {
      Alert.alert('Input Tidak Valid', 'Pastikan nilai yang Anda masukkan adalah angka positif dan tidak lebih dari 1 triliun IDR.');
      return;
    }

    const hartaZakat = parseFloat(unformatNumber(harta)) * 0.025;
    const penghasilanZakat = parseFloat(unformatNumber(penghasilan)) * 0.025;
    const asetZakat = parseFloat(unformatNumber(aset)) * 0.025;

    setZakatHarta(hartaZakat);
    setZakatPenghasilan(penghasilanZakat);
    setZakatAset(asetZakat);
  };

  return (
    <LinearGradient
      colors={['#2b6cb0', '#FBA834']}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Text style={styles.title}>Kalkulator Zakat</Text>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Harta (dalam IDR):</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            placeholder="Masukkan total harta"
            value={harta}
            onChangeText={(value) => setHarta(formatNumber(unformatNumber(value)))}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Penghasilan (dalam IDR):</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            placeholder="Masukkan total penghasilan"
            value={penghasilan}
            onChangeText={(value) => setPenghasilan(formatNumber(unformatNumber(value)))}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Aset Lainnya (dalam IDR):</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            placeholder="Masukkan total aset"
            value={aset}
            onChangeText={(value) => setAset(formatNumber(unformatNumber(value)))}
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={handleCalculateZakat}>
          <Text style={styles.buttonText}>Hitung Zakat</Text>
        </TouchableOpacity>

        <View style={styles.resultContainer}>
          <Text style={styles.resultText}>Zakat dari Harta: IDR {formatNumber(zakatHarta.toFixed(2))}</Text>
          <Text style={styles.resultText}>Zakat dari Penghasilan: IDR {formatNumber(zakatPenghasilan.toFixed(2))}</Text>
          <Text style={styles.resultText}>Zakat dari Aset Lainnya: IDR {formatNumber(zakatAset.toFixed(2))}</Text>
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    marginTop: 40,
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 20,
    fontFamily: 'Metro-Bold',
  },
  inputGroup: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 5,
    fontFamily: 'Metro-Medium',
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#fff',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    fontSize: 18,
    color: '#2b6cb0',
    fontFamily: 'Metro-Bold',
  },
  resultContainer: {
    marginTop: 30,
  },
  resultText: {
    fontSize: 18,
    color: '#fff',
    fontFamily: 'Metro-Semibold',
    marginBottom: 10,
  },
});

export default KalkulatorZakat;

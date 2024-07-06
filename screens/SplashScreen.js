// screens/SplashScreen.js
import React, { useEffect } from 'react';
import { View, Image, StyleSheet,Text } from 'react-native';

export default function SplashScreen({ navigation }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Login');
    }, 2000); // Durasi splash screen (ms)

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image source={require('../assets/gudang.png')} style={styles.image} />
      <Text style={styles.title}>Aplikasi Gudang Material</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#333',
  },
  image: {
    width: 200, // Sesuaikan ukuran gambar
    height: 200,
    resizeMode: 'contain',
  },
});

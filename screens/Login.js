import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';

const Login = ({ navigation }) => {
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await fetch(`https://cloudside.id/sindy/API/api.php?aksi=login&password=${password}`);
      const result = await response.json();
      console.log(result.data);
      if (response.status === 200 && result.data && result.data.length > 0 && result.data[0].password === password) {
        // Jika autentikasi sukses, pindah ke halaman home
        navigation.replace('Home');
      } else {
        // Jika autentikasi gagal, tampilkan pesan kesalahan
        Alert.alert('Login Gagal', 'PIN salah. Silakan coba lagi.');
      }
    } catch (error) {
      // Tangani kesalahan jaringan atau lainnya
      Alert.alert('Error', 'Terjadi kesalahan. Silakan coba lagi.');
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require('../assets/gudang.png')} style={styles.logo} />
      <Text style={styles.title}>Aplikasi Gudang Material</Text>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="PIN"
          keyboardType="numeric"
          secureTextEntry
          style={styles.input}
          value={password}
          onChangeText={setPassword}
        />
      </View>
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 20,
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#333',
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    paddingHorizontal: 15,
    textAlign: 'center',
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  loginButton: {
    width: '100%',
    height: 50,
    backgroundColor: '#007bff',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Login;

import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, useEffect } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function EditItemScreen({ route }) {
  const { item, origin } = route.params;
  const [id, setId] = useState(item.id);
  const [nama, setNama] = useState(item.nama);
  const [jenis, setJenis] = useState(item.jenis);
  const [stok, setStok] = useState(item.stok.toString());
  const [satuan, setSatuan] = useState(item.satuan);

  const navigation = useNavigation();

  function getCurrentDate() {
    const today = new Date();
    const year = today.getFullYear();
    let month = today.getMonth() + 1;
    let day = today.getDate();

    // Pad month and day with leading zeros if needed
    if (month < 10) {
      month = `0${month}`;
    }
    if (day < 10) {
      day = `0${day}`;
    }

    // Return the formatted date string
    return `${year}-${month}-${day}`;
  }

  const [lastUpdate, setLastUpdate] = useState(getCurrentDate());

  const handleSave = () => {
    // Construct URL for API call
    const apiUrl = `https://server1.bayarsekolah.my.id/API/api.php?` +
                   `aksi=${origin}&id_barang=${id}` +
                   `&nama_barang=${encodeURIComponent(nama)}` +
                   `&jenis_barang=${encodeURIComponent(jenis)}` +
                   `&stok_barang=${stok}&satuan=${encodeURIComponent(satuan)}` +
                   `&last_update=${lastUpdate}`;

    // Perform GET request using fetch
    fetch(apiUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      Alert.alert('Successful', 'Barang Berhasil Ditambah');
      setTimeout(() => {
        navigation.navigate('Home');
      }, 5000);
    })
    .catch(error => {
      console.error('Error updating item:', error);
      Alert.alert('Failed', 'Barang Gagal Ditambah');
      // Handle error here
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Edit Item</Text>
      <TextInput
        style={styles.input}
        placeholder="Nama"
        value={nama}
        onChangeText={setNama}
      />
      <TextInput
        style={styles.input}
        placeholder="Jenis"
        value={jenis}
        onChangeText={setJenis}
      />
      <TextInput
        style={styles.input}
        placeholder="Stok"
        value={stok}
        onChangeText={setStok}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Satuan"
        value={satuan}
        onChangeText={setSatuan}
      />
      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#fff',
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  button: {
    backgroundColor: '#1e90ff',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});


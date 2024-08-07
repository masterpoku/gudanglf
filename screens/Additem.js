import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet ,Alert} from 'react-native';

export default function AddItem({ navigation }) {
  const [nama, setNama] = useState('');
  const [jenis, setJenis] = useState('');
  const [stok, setStok] = useState('0');
  const [satuan, setSatuan] = useState('');
  const [disabled, setDisabled] = useState(true);
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
    const apiUrl = `https://cloudside.id/sindy/API/api.php?aksi=tambah_data_stok&nama_barang=${encodeURIComponent(nama)}&jenis_barang=${encodeURIComponent(jenis)}&stok_barang=${stok}&satuan=${encodeURIComponent(satuan)}&last_update=${lastUpdate}`;
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
      }, 1000);
    })
    .catch(error => {
      console.error('Error updating item:', error);
      Alert.alert('Failed', 'Barang Gagal Ditambah');
      // Handle error here
    });
};

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Tambah Barang</Text>
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
        editable={!disabled}
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


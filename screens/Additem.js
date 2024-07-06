import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

export default function AddItem({ navigation }) {
  const [nama, setNama] = useState('');
  const [jenis, setJenis] = useState('');
  const [stok, setStok] = useState('');
  const [satuan, setSatuan] = useState('');
  const [lastUpdate, setLastUpdate] = useState(new Date().toLocaleString());

  const handleSave = () => {
    console.log('Saving item:', { nama, jenis, stok, satuan, lastUpdate });
    // Save logic here
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Add New Item</Text>
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

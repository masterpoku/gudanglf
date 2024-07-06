import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

export default function EditItemScreen({ route, navigation }) {
  const { item } = route.params;
  const [nama, setNama] = useState(item.nama);
  const [jenis, setJenis] = useState(item.jenis);
  const [stok, setStok] = useState(item.stok);
  const [satuan, setSatuan] = useState(item.satuan);
  const [lastUpdate, setLastUpdate] = useState(new Date().toLocaleString());

  console.log(stok)
  const handleSave = () => {
    console.log('Updating item:', { nama, jenis, stok, satuan, lastUpdate });
    // Update logic here
    navigation.goBack();
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

import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

export default function OutItem({ navigation }) {
  const data = [
    { id: '1', nama: 'Item 1', jenis: 'Type A', stok: '10', satuan: 'pcs', lastUpdate: '30/6/2024 13.09.42' },
    { id: '2', nama: 'Item 2', jenis: 'Type B', stok: '20', satuan: 'kg', lastUpdate: '30/6/2024 14.09.42' },
    { id: '3', nama: 'Item 3', jenis: 'Type B', stok: '20', satuan: 'kg', lastUpdate: '30/6/2024 14.09.42' },
    { id: '4', nama: 'Item 4', jenis: 'Type B', stok: '20', satuan: 'kg', lastUpdate: '30/6/2024 14.09.42' },
  ];

  const [selectedItem, setSelectedItem] = useState(null);
  const [stok, setStok] = useState('');
  const [lastUpdate, setLastUpdate] = useState(new Date().toLocaleString());

  const handleSave = () => {
    if (selectedItem) {
      console.log('Saving item:', { ...selectedItem, stok, lastUpdate });
      // Save logic here
      navigation.goBack();
    } else {
      console.log('No item selected');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Barang Keluar</Text>
      <Picker
        selectedValue={selectedItem ? selectedItem.id : ''}
        onValueChange={(itemId) => {
          const selected = data.find(item => item.id === itemId);
          setSelectedItem(selected);
        }}
        style={styles.picker}
      >
        <Picker.Item label="Pilih Barang" value="" />
        {data.map((item) => (
          <Picker.Item key={item.id} label={item.nama} value={item.id} />
        ))}
      </Picker>
      <TextInput
        style={styles.input}
        placeholder="Stok"
        value={stok}
        onChangeText={setStok}
        keyboardType="numeric"
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
  picker: {
    backgroundColor: '#fff',
    marginBottom: 15,
    borderRadius: 5,
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

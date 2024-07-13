import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet,Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';

export default function OutItem({ route, navigation }) {
  const { origin } = route.params;

  const [data, setData] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [stok, setStok] = useState('');
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
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('https://server1.bayarsekolah.my.id/API/api.php?aksi=baca_data_stok');
      const jsonData = await response.json();
      setData(jsonData);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSave = async () => {
    if (selectedItem) {
      try {
        const response = await fetch(`https://server1.bayarsekolah.my.id/API/api.php?aksi=${origin}add&id_barang=${selectedItem.id_barang}&nama_barang=${selectedItem.nama_barang}&jenis_barang=${selectedItem.jenis_barang}&stok_barang=${stok}&satuan=${selectedItem.satuan}&last_update=${lastUpdate}`);
       console.log(response);
       Alert.alert(
        'Sukses',
        'Menambah Data',
        [
          { text: 'OK', onPress: () => navigation.goBack() },
        ],
        { cancelable: false },
      );
        } catch (error) {
        console.error(error);
      }
    } else {
      console.log('No item selected');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>{origin}</Text>
      <Picker
        selectedValue={selectedItem ? selectedItem.id_barang : ''}
        onValueChange={(itemId) => {
          const selected = data.find(item => item.id_barang === itemId);
          setSelectedItem(selected);
        }}
        style={styles.picker}
      >
        <Picker.Item label="Pilih Barang" value="" />
        {data.map((item) => (
          <Picker.Item key={item.id_barang} label={item.nama_barang} value={item.id_barang} />
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


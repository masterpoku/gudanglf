import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { Camera } from 'expo-camera';
import { Ionicons } from '@expo/vector-icons';
export default function OutItem({ route, navigation }) {
  const { origin } = route.params;

  const [data, setData] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [stok, setStok] = useState('');
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [scannedBarcode, setScannedBarcode] = useState('');
  const [scannedData, setScannedData] = useState(null); // New state for scanned data
  const [scanned, setScanned] = useState(false);
  const [cameraVisible, setCameraVisible] = useState(false); // New state for camera visibility

  function getCurrentDate() {
    const today = new Date();
    const year = today.getFullYear();
    let month = today.getMonth() + 1;
    let day = today.getDate();

    if (month < 10) {
      month = `0${month}`;
    }
    if (day < 10) {
      day = `0${day}`;
    }

    return `${year}-${month}-${day}`;
  }

  const [lastUpdate, setLastUpdate] = useState(getCurrentDate());

  useEffect(() => {
    fetchData();
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(status === 'granted');
    })();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('https://cloudside.id/sindy/API/api.php?aksi=baca_data_stok');
      const jsonData = await response.json();
      console.log('Fetched data:', jsonData); // Log the fetched data
      
      if (Array.isArray(jsonData)) {
        setData(jsonData);
      } else {
        console.error('Data is not an array:', jsonData);
        setData([]); // Set to empty array if data is not an array
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setData([]); // Set to empty array on error
    }
  };

  const handleSave = async () => {
    if (selectedItem) {
      try {
        const response = await fetch(`https://cloudside.id/sindy/API/api.php?aksi=${origin}add&id_barang=${selectedItem.id_barang}&nama_barang=${selectedItem.nama_barang}&jenis_barang=${selectedItem.jenis_barang}&stok_barang=${stok}&satuan=${selectedItem.satuan}&last_update=${lastUpdate}`);
        const responseJson = await response.json(); // Parse the response to JSON
        console.log('Save response:', responseJson); // Log the response
        Alert.alert(
          'Sukses',
          'Menambah Data',
          [
            { text: 'OK', onPress: () => navigation.goBack() },
          ],
          { cancelable: false },
        );
      } catch (error) {
        console.error('Error saving data:', error);
      }
    } else {
      console.log('No item selected');
    }
  };

  const handleBarCodeScanned = ({ data: barcodeData }) => {
    console.log('Scanned barcode data:', barcodeData); // Log the scanned barcode data
    setScannedBarcode(barcodeData);
    setScannedData(barcodeData); // Save the scanned data

    try {
      // Find the item in the data array using the scanned ID
      const selected = data.find(item => item.id_barang === barcodeData); // Find the item by ID
      console.log('Selected item from barcode scan:', selected); // Log the selected item

      if (selected) {
        setSelectedItem(selected);
        setStok(selected.stok_barang); // Assuming QR code gives updated stock value
      } else {
        console.error('Item not found in data array:', barcodeData);
      }
    } catch (error) {
      console.error('Error processing scanned data:', error);
    }
    setScanned(true); // Exit camera mode
    setCameraVisible(false); // Hide the camera view
  };

  const toggleCamera = () => {
    setCameraVisible(!cameraVisible); // Toggle camera visibility
    setScanned(false); // Reset scanned state
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>{origin}</Text>

      {cameraVisible && (
        <View style={styles.cameraContainer}>
          {hasCameraPermission === null ? (
            <Text>Requesting for camera permission</Text>
          ) : hasCameraPermission === false ? (
            <Text style={{ color: 'red' }}>Camera permission is not granted</Text>
          ) : (
            !scanned && (
              <BarCodeScanner
                onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                style={StyleSheet.absoluteFillObject}
              />
            )
          )}
        </View>
      )}

      <Picker
        selectedValue={selectedItem ? selectedItem.id_barang : ''}
        onValueChange={(itemId) => {
          const selected = data.find(item => item.id_barang === itemId);
          console.log('Selected item from picker:', selected); // Log the selected item from picker
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

      <TouchableOpacity style={styles.fabOpen} onPress={toggleCamera}>
      <Ionicons name="qr-code-outline" size={24} color="white" />
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
  cameraContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
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
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  fabOpen: {
    position: 'absolute',
    bottom: 30,
    right: 20,
    backgroundColor: '#1e90ff',
    padding: 15,
    borderRadius: 50,
    elevation: 5,
    alignItems: 'center',
  },
  fabText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

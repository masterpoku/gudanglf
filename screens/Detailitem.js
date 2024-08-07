import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, Alert, Image, ScrollView } from 'react-native';
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';

export default function DetailItem({ route, navigation }) {
  const { item, origin } = route.params || {};
  const [modalVisible, setModalVisible] = useState(false);
  const [qrImageUri, setQrImageUri] = useState(null);

  if (!item) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>No item data available.</Text>
      </View>
    );
  }

  const handleEdit = () => {
    console.log('Edit item:', item);
    navigation.navigate('EditItem', { item, origin });
  };

  const handleDelete = () => {
    setModalVisible(true);
  };

  const handleQr = async () => {
    const imageUrl = `https://cloudside.id/sindy/API/qr.php?id=${item.id_unique}&origin=${item.nama}`; // URL gambar QR code
    const fileUri = `${FileSystem.documentDirectory}${item.id_unique}.png`;

    const callback = downloadProgress => {
      const progress = downloadProgress.totalBytesWritten / downloadProgress.totalBytesExpectedToWrite;
      console.log(`Download Progress: ${Math.round(progress * 100)}%`);
    };

    const downloadResumable = FileSystem.createDownloadResumable(
      imageUrl,
      fileUri,
      {},
      callback
    );

    try {
      const { uri } = await downloadResumable.downloadAsync();
      console.log('Finished downloading to', uri);
      setQrImageUri(uri); // Simpan URI gambar
      await saveToGallery(uri); // Simpan ke galeri
      Alert.alert('QR code saved', 'QR code has been saved to your gallery.');
    } catch (e) {
      console.error('QR code download error:', e);
      Alert.alert('QR code download failed', 'Failed to download the QR code. Please try again later.');
    }
  };

  const saveToGallery = async (uri) => {
    try {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status === 'granted') {
        await MediaLibrary.createAssetAsync(uri);
        console.log('Image saved to gallery');
      } else {
        Alert.alert('Permission required', 'Please grant access to the media library to save the image.');
      }
    } catch (e) {
      console.error('Error saving to gallery:', e);
      Alert.alert('Save to gallery failed', 'Failed to save the image to the gallery.');
    }
  };

  const confirmDelete = async () => {
    try {
      const response = await fetch(`https://cloudside.id/sindy/API/api.php?aksi=${origin}delete&id_barang=${item.id_unique}`);
      console.log(item);
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
    setModalVisible(false);
    Alert.alert(
      'Sukses',
      'Data berhasil dihapus',
      [
        { text: 'OK', onPress: () => navigation.goBack() },
      ],
      { cancelable: false },
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Modal
        transparent={true}
        visible={modalVisible}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Are you sure you want to delete this item?</Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.modalButton} onPress={() => setModalVisible(false)}>
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalButton} onPress={confirmDelete}>
                <Text style={styles.buttonText}>Yes</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <View style={styles.card}>
        <View style={styles.header}>
          <Text style={styles.headerText}>{item.nama}</Text>
        </View>
        <View style={styles.detailSection}>
          <Text style={styles.label}>Jenis:</Text>
          <Text style={styles.text}>{item.jenis}</Text>
          <Text style={styles.label}>Stok:</Text>
          <Text style={styles.text}>{item.stok}</Text>
          <Text style={styles.label}>Satuan:</Text>
          <Text style={styles.text}>{item.satuan}</Text>
          <Text style={styles.label}>Last Update:</Text>
          <Text style={styles.text}>{item.lastUpdate}</Text>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={[styles.button, styles.editButton]} onPress={handleEdit}>
            <Text style={styles.buttonText}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.qrButton]} onPress={handleQr}>
            <Text style={styles.buttonText}>QRcode</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.deleteButton]} onPress={handleDelete}>
            <Text style={styles.buttonText}>Delete</Text>
          </TouchableOpacity>
        </View>
        {qrImageUri && (
          <View style={styles.imageContainer}>
            <Image source={{ uri: qrImageUri }} style={styles.qrImage} />
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 10,
    backgroundColor: '#f5f5f5',
    paddingTop: 50,
  },
  errorText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  header: {
    backgroundColor: '#1e90ff',
    padding: 15,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    marginBottom: 10,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  detailSection: {
    padding: 15,
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  text: {
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingBottom: 15,
  },
  button: {
    padding: 10,
    borderRadius: 5,
    width: '30%',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  editButton: {
    backgroundColor: 'blue',
  },
  deleteButton: {
    backgroundColor: 'red',
  },
  qrButton: {
    backgroundColor: 'black',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  modalButton: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#1e90ff',
    marginHorizontal: 10,
  },
  imageContainer: {
    alignItems: 'center',
    marginTop: 50,
    marginBottom: 30
  },
  qrImage: {
    width: 250,
    height: 250,
  },
});

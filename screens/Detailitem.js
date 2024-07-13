import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal,Alert } from 'react-native';
export default function DetailItem({ route, navigation }) {
  const { item, origin } = route.params || {};
  const [modalVisible, setModalVisible] = useState(false);

  if (!item) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>No item data available.</Text>
      </View>
    );
  }

  const handleEdit = () => {
    console.log('Edit item:', item);
    navigation.navigate('EditItem', { item,origin });
  };

  const handleDelete = () => {
    setModalVisible(true);
  };

  const confirmDelete = async () => {
    try {
      const response = await fetch(`https://c0e5-36-74-172-137.ngrok-free.app/gudang/API/api.php?aksi=${origin}delete&id_barang=${item.id_unique}`);
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
    <View style={styles.container}>
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
          <TouchableOpacity style={[styles.button, styles.deleteButton]} onPress={handleDelete}>
            <Text style={styles.buttonText}>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    width: '40%',
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
});

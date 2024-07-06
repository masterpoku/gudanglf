import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function BarangMasuk() {
  const navigation = useNavigation();
  const [fabOpen, setFabOpen] = useState(false);
  const animation = useState(new Animated.Value(0))[0];

  const items = [
    { id: '1', nama: 'Item 1', jenis: 'Type A', stok: '100', satuan: 'pcs', lastUpdate: '2024-06-30' },
    { id: '2', nama: 'Item 2', jenis: 'Type B', stok: '200', satuan: 'kg', lastUpdate: '2024-06-30' },
  ];

  const handleDetail = (item) => {
    navigation.navigate('DetailItem', { item, origin: 'BarangMasuk' });

  };

  const toggleFab = () => {
    setFabOpen(!fabOpen);
    Animated.spring(animation, {
      toValue: fabOpen ? 0 : 1,
      useNativeDriver: true,
    }).start();
  };

  const renderItem = ({ item }) => (
    <View style={styles.row}>
      <Text style={styles.cell}>{item.id}</Text>
      <Text style={styles.cell}>{item.nama}</Text>
      <Text style={styles.cell}>{item.jenis}</Text>
      <Text style={styles.cell}>{item.stok}</Text>
      <Text style={styles.cell}>{item.satuan}</Text>
      <TouchableOpacity style={styles.detailButton} onPress={() => handleDetail(item)}>
        <Text style={styles.detailButtonText}>Detail</Text>
      </TouchableOpacity>
    </View>
  );

  const fabStyle = {
    transform: [
      {
        scale: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [1, 1.2],
        }),
      },
    ],
  };

  return (
    <View style={styles.container}>
      <View style={styles.tableHeader}>
        <Text style={styles.headerCell}>No</Text>
        <Text style={styles.headerCell}>Nama</Text>
        <Text style={styles.headerCell}>Jenis</Text>
        <Text style={styles.headerCell}>Stok</Text>
        <Text style={styles.headerCell}>Satuan</Text>
        <Text style={styles.headerCell}>Aksi</Text>
      </View>
      <FlatList data={items} renderItem={renderItem} keyExtractor={(item) => item.id} style={styles.list} />
      
      {fabOpen && (
        <View style={styles.fabMenu}>
          <TouchableOpacity style={styles.fabOption} onPress={() => navigation.navigate('AddItem')}>
            <Ionicons name="add-circle-outline" size={24} color="white" />
            <Text style={styles.fabOptionText}>Tambah</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.fabOption} onPress={() => navigation.navigate('ExportItem', { origin: 'Barang Masuk' })}>
            <Ionicons name="create-outline" size={24} color="white" />
            <Text style={styles.fabOptionText}>Export</Text>
          </TouchableOpacity>
        </View>
      )}

      <TouchableOpacity style={[styles.fab, fabStyle]} onPress={toggleFab}>
        <Ionicons name={fabOpen ? "close" : "add"} size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#ffffff',
  },
  list: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  cell: {
    flex: 1,
    textAlign: 'center',
  },
  detailButton: {
    padding: 5,
    backgroundColor: '#1e90ff',
    borderRadius: 5,
  },
  detailButtonText: {
    color: 'white',
  },
  fab: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    backgroundColor: '#007bff',
    borderRadius: 50,
    padding: 15,
    elevation: 5,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#ddd',
    padding: 10,
  },
  headerCell: {
    flex: 1,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  fabMenu: {
    position: 'absolute',
    bottom: 100,
    right: 30,
  },
  fabOption: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    backgroundColor: '#007bff',
    borderRadius: 5,
    padding: 10,
  },
  fabOptionText: {
    color: 'white',
    marginLeft: 5,
  },
});

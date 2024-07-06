import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';

const data = [
  { id: '1', nama: 'Item 1', jenis: 'Type A', stok: '10', satuan: 'pcs', lastUpdate: '30/6/2024 13.09.42' },
  { id: '2', nama: 'Item 2', jenis: 'Type B', stok: '20', satuan: 'kg', lastUpdate: '30/6/2024 14.09.42' },
  // Tambahkan data lainnya di sini
];

export default function Home({ navigation }) {
  const handleDetail = (item) => {
    // Navigasi ke halaman detail dengan membawa parameter item
    navigation.navigate('DetailItem', { item, origin: 'Home' });

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

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Stok Barang</Text>
      <View style={styles.tableHeader}>
        <Text style={styles.headerCell}>No</Text>
        <Text style={styles.headerCell}>Nama</Text>
        <Text style={styles.headerCell}>Jenis</Text>
        <Text style={styles.headerCell}>Stok</Text>
        <Text style={styles.headerCell}>Satuan</Text>
        <Text style={styles.headerCell}>Aksi</Text>
      </View>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#FFFFFF',
    paddingTop:1
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
  row: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  cell: {
    flex: 1,
    textAlign: 'center',
  },
  detailButton: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1e90ff',
    padding: 5,
    borderRadius: 5,
  },
  detailButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  text: {
    fontSize: 24,
    textAlign: 'center',
    marginVertical: 20,
    fontWeight: 'bold',
  },
});

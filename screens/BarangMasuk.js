import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

export default function BarangMasuk() {
  const navigation = useNavigation();
  const [fabOpen, setFabOpen] = useState(false);
  const animation = new Animated.Value(0); // Removed unnecessary array wrapper
  const [items, setItems] = useState([]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  useEffect(() => {
    if (isMounted) {
      const fetchDataInterval = setInterval(() => {
        fetchData();
      }, 3000); // Ambil data setiap 5 detik
    
      // Membersihkan interval saat komponen tidak lagi digunakan
      return () => clearInterval(fetchDataInterval);
    }
  }, [isMounted]);

  const fetchData = async () => {
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth() + 1; // getMonth() returns 0-11
    const startDate = `${currentYear}-${String(currentMonth).padStart(2, '0')}-01`;
    const endDate = `${currentYear}-${String(currentMonth).padStart(2, '0')}-31`;

    try {
      const response = await axios.get(`https://server1.bayarsekolah.my.id/API/api.php?aksi=BarangMasukexport&tanggal_awal=${startDate}&tanggal_akhir=${endDate}`);
      const formattedData = response.data.map(item => ({
        id_unique: item.id || 'No Data',
        id: item.id_barang || 'No Data',
        nama: item.nama_barang || 'No Data',
        jenis: item.jenis_barang || 'No Data',
        stok: item.stok_barang || 'No Data',
        satuan: item.satuan || 'No Data',
        lastUpdate: item.last_update || 'No Data',
      }));
      setItems(formattedData);
    } catch (error) {
      console.error('Error fetching data: ', error);
    }
  };

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

  const renderItem = ({ item, index }) => (
    <View style={styles.row}>
      <Text style={styles.cell}>{index + 1}</Text>
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
      <FlatList data={items} renderItem={renderItem} keyExtractor={(item) => item.id_unique.toString()} style={styles.list} />

      {fabOpen && (
        <View style={styles.fabMenu}>
          <TouchableOpacity style={styles.fabOption} onPress={() =>  navigation.navigate('OutItem', { origin: 'BarangMasuk' })}>
            <Ionicons name="add-circle-outline" size={24} color="white" />
            <Text style={styles.fabOptionText}>Tambah</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.fabOption} onPress={() => navigation.navigate('ExportItem', { origin: 'BarangMasuk' })}>
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

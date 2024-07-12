import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

export default function BarangKeluar() {
  const navigation = useNavigation();
  const [fabOpen, setFabOpen] = useState(false);
  const animation = useState(new Animated.Value(0))[0];
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
      const response = await axios.get(`https://c7b1-36-71-167-197.ngrok-free.app/gudang/API/api.php?aksi=tampilkan_barang_keluar_dengan_periode&tanggal_awal=${startDate}&tanggal_akhir=${endDate}`);
      console.log(response);
      const formattedData = response.data.map(item => ({
        id_unique: item.id,
        id: item.id_barang,
        nama: item.nama_barang,
        jenis: item.jenis_barang,
        stok: item.stok_barang,
        satuan: item.satuan,
        lastUpdate: item.last_update,
      }));
      setItems(formattedData);
    } catch (error) {
      console.error('Error fetching data: ', error);
    }
   
  };

  const handleDetail = (item) => {
    navigation.navigate('DetailItem', { item, origin: 'BarangKeluar' });
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
      { items.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyStateText}>Data Tidak Ada</Text>
        </View>
      ) : (
        <FlatList data={items} renderItem={renderItem} keyExtractor={(item) => item.id} style={styles.list} />
      )}

      {fabOpen && (
        <View style={styles.fabMenu}>
          <TouchableOpacity style={styles.fabOption} onPress={() => navigation.navigate('OutItem',{ origin: 'BarangKeluar' })}>
            <Ionicons name="add-circle-outline" size={24} color="white" />
            <Text style={styles.fabOptionText}>Tambah</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.fabOption} onPress={() => navigation.navigate('ExportItem', { origin: 'Export Barang Keluar' })}>
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
  noDataText: {
    fontSize: 18,
    textAlign: 'center',
    paddingTop: 20,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyStateText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#666',
  },
});


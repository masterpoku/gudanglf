import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, FlatList } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { FontAwesome } from '@expo/vector-icons';
import dayjs from 'dayjs';

export default function ExportItem({ route, navigation }) {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [currentPicker, setCurrentPicker] = useState('start');
  const [data, setData] = useState([]);
  const [origin, setOrigin] = useState('');

  useEffect(() => {
    if (route.params?.origin) {
      setOrigin(route.params.origin);
    }
  }, [route.params?.origin]);

  const showDatePicker = (picker) => {
    setCurrentPicker(picker);
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (selectedDate) => {
    if (currentPicker === 'start') {
      setStartDate(selectedDate);
    } else {
      setEndDate(selectedDate);
    }
    hideDatePicker();
  };

  const handleExport = () => {
    // Contoh data, sesuaikan dengan data sebenarnya
    console.log('Exporting data from', dayjs(startDate).format('YYYY-MM-DD'), 'to', dayjs(endDate).format('YYYY-MM-DD'));
    const exampleData = [
      { id: '1', nama: 'Item A', jenis: 'Type 1', stok: 100, satuan: 'pcs', lastUpdate: dayjs().format('YYYY-MM-DD') },
      { id: '2', nama: 'Item B', jenis: 'Type 2', stok: 200, satuan: 'pcs', lastUpdate: dayjs().format('YYYY-MM-DD') },
    ];
    setData(exampleData);
  };

  const download = () => {
    // Contoh data, sesuaikan dengan data sebenarnya
    console.log('Download data from', dayjs(startDate).format('YYYY-MM-DD'), 'to', dayjs(endDate).format('YYYY-MM-DD'));

  };

  const renderItem = ({ item }) => (
    <View style={styles.tableRow}>
      <Text style={styles.tableCell}>{item.nama}</Text>
      <Text style={styles.tableCell}>{item.jenis}</Text>
      <Text style={styles.tableCell}>{item.stok}</Text>
      <Text style={styles.tableCell}>{item.satuan}</Text>
      <Text style={styles.tableCell}>{item.lastUpdate}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.originText}>{origin}</Text>
    
      <View style={styles.card}>
        <TouchableOpacity onPress={() => showDatePicker('start')} style={styles.dateButton}>
          <Text>{startDate ? dayjs(startDate).format('YYYY-MM-DD') : 'Select Start Date'}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => showDatePicker('end')} style={styles.dateButton}>
          <Text>{endDate ? dayjs(endDate).format('YYYY-MM-DD') : 'Select End Date'}</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.exportButton} onPress={handleExport}>
        <Text style={styles.buttonText}>Tampilkan</Text>
      </TouchableOpacity>

      {data.length > 0 && (
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <Text style={styles.tableHeader}>Nama</Text>
            <Text style={styles.tableHeader}>Jenis</Text>
            <Text style={styles.tableHeader}>Stok</Text>
            <Text style={styles.tableHeader}>Satuan</Text>
            <Text style={styles.tableHeader}>Last Update</Text>
          </View>
          <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
          />
        </View>
      )}

      <TouchableOpacity style={styles.floatingButton} onPress={download}>
        <FontAwesome name="download" size={24} color="white" />
      </TouchableOpacity>

      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  originText: {
    fontSize: 25,
    marginBottom: 10,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  card: {
    width: '100%',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 3,
    marginBottom: 20,
  },
  dateButton: {
    marginVertical: 10,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    alignItems: 'center',
  },
  exportButton: {
    padding: 15,
    backgroundColor: '#1e90ff',
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  table: {
    marginTop: 20,
    borderRadius: 10,
    backgroundColor: '#fff',
    padding: 10,
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  tableHeader: {
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
  },
  tableCell: {
    flex: 1,
    textAlign: 'center',
  },
  floatingButton: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    backgroundColor: '#1e90ff',
    borderRadius: 50,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
});

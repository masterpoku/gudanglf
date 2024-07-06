import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons'; // Pastikan import Ionicons dari lokasi yang benar
import SplashScreen from './screens/SplashScreen';
import Login from './screens/Login';
import Home from './screens/Home';
import BarangMasuk from './screens/BarangMasuk';
import BarangKeluar from './screens/BarangKeluar';
import DetailItem from './screens/Detailitem';
import AddItem from './screens/Additem';
import EditItemScreen from './screens/Edititem';
import OutItem from './screens/Outitem';
import ExportItem from './screens/Exportitem';


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Component for Bottom Tab Navigator
const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerStyle: {
          backgroundColor: '#1e90ff', // Warna header hijau
          
        },
        headerTintColor: '#fff',
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'HomeScreen') {
            iconName = 'home';
          } else if (route.name === 'BarangMasuk') {
            iconName = 'arrow-down-circle';
          } else if (route.name === 'BarangKeluar') {
            iconName = 'arrow-up-circle';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#1e90ff',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="HomeScreen" component={Home}  options={{ headerTitle: 'Halaman Utama', headerShown: true, headerTintColor: '#fff', headerStyle: { backgroundColor: '#1e90ff' } }}/>
      <Tab.Screen name="BarangMasuk" component={BarangMasuk}  options={{ headerTitle: 'Barang Masuk', headerShown: true, headerTintColor: '#fff', headerStyle: { backgroundColor: '#1e90ff' } }}/>
      <Tab.Screen name="BarangKeluar" component={BarangKeluar}  options={{ headerTitle: 'Barang Keluar', headerShown: true, headerTintColor: '#fff', headerStyle: { backgroundColor: '#1e90ff' } }}/>
    </Tab.Navigator>
  );
};

// Main App Component
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen
          name="Splash"
          component={SplashScreen}
          options={{ headerShown: false }} // Sembunyikan header di halaman Splash
        />
        <Stack.Screen name="Login" component={Login}
          options={{ headerShown: false }} />
        <Stack.Screen
          name="Home"
          component={BottomTabNavigator}
          options={{ headerShown: false }} // Sembunyikan header di halaman Home
        />
        <Stack.Screen
          name="DetailItem"
          component={DetailItem}
          options={{ headerTitle: 'Detail Barang', headerShown: true, headerTintColor: '#fff', headerStyle: { backgroundColor: '#1e90ff' } }}
        />
        <Stack.Screen
          name="AddItem"
          component={AddItem}
          options={{ headerTitle: 'Tambah Item', headerShown: true, headerTintColor: '#fff', headerStyle: { backgroundColor: '#1e90ff' } }}
        />
         <Stack.Screen
          name="EditItem"
          component={EditItemScreen}
          options={{ headerTitle: 'Ubah Barang', headerShown: true, headerTintColor: '#fff', headerStyle: { backgroundColor: '#1e90ff' } }}
        />
        <Stack.Screen
          name="OutItem"
          component={OutItem}
          options={{ headerTitle: 'Barang Keluar', headerShown: true, headerTintColor: '#fff', headerStyle: { backgroundColor: '#1e90ff' } }}
        />
        <Stack.Screen
          name="ExportItem"
          component={ExportItem}
          options={{ headerTitle: 'Export', headerShown: true, headerTintColor: '#fff', headerStyle: { backgroundColor: '#1e90ff' } }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

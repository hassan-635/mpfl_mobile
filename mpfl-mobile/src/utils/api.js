import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API = axios.create({
  baseURL: 'https://mpfl-backend.onrender.com/api/v1',
});

// Request interceptor taake har call mein token khud ba khud chala jaye
API.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`; //
  }
  return config;
});

export default API;
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView, Platform } from 'react-native';
import axios from 'axios';
import { ChevronLeft } from 'lucide-react-native';

const SignupScreen = ({ navigation }) => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });

  const handleSignup = async () => {
    try {
      // Backend Endpoint: /api/v1/auth/register
      const res = await axios.post('https://mpfl-backend.onrender.com/api/v1/auth/register', formData);
      if (res.status === 200) {
        Alert.alert("Success", "Account created successfully!");
        navigation.navigate('Login');
      }
    } catch (error) {
      Alert.alert("Error", error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity 
        style={styles.backButton} 
        onPress={() => navigation.navigate('Landing')} // Seedha Landing par le jayega
      >
        <ChevronLeft size={28} color="#1E293B" />
      </TouchableOpacity>
      <Text style={styles.title}>Create Account</Text>
      <Text style={styles.subtitle}>Join MPFL Freelance Community</Text>

      <View style={styles.form}>
        <TextInput 
          style={styles.input} placeholder="Full Name" 
          onChangeText={(val) => setFormData({...formData, name: val})} 
        />
        <TextInput 
          style={styles.input} placeholder="Email" keyboardType="email-address" 
          autoCapitalize="none" onChangeText={(val) => setFormData({...formData, email: val})} 
        />
        <TextInput 
          style={styles.input} placeholder="Password" secureTextEntry 
          onChangeText={(val) => setFormData({...formData, password: val})} 
        />

        <TouchableOpacity style={styles.button} onPress={handleSignup}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.link}>Already have an account? Login</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flexGrow: 1, backgroundColor: '#F8FAFC', padding: 30, justifyContent: 'center' },
  title: { fontSize: 32, fontWeight: '900', color: '#1E293B' },
  subtitle: { fontSize: 16, color: '#64748B', marginBottom: 40 },
  input: { backgroundColor: '#FFFFFF', padding: 18, borderRadius: 15, marginBottom: 15, borderWidth: 1, borderColor: '#E2E8F0', color: '#1E293B' },
  button: { backgroundColor: '#2563EB', padding: 18, borderRadius: 15, alignItems: 'center', marginTop: 10 },
  buttonText: { color: '#FFF', fontSize: 18, fontWeight: 'bold' },
  link: { color: '#64748B', textAlign: 'center', marginTop: 20 },
  backButton: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 50 : 20, // Mobile status bar ke hisab se adjustment
    left: 20,
    zIndex: 10,
    padding: 10,
    backgroundColor: '#F1F5F9', // Light gray background
    borderRadius: 12,
  }
});

export default SignupScreen;
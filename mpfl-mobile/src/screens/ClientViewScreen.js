import React, { useState } from 'react';
import { 
  View, Text, TextInput, TouchableOpacity, StyleSheet, 
  Alert, KeyboardAvoidingView, Platform, SafeAreaView 
} from 'react-native';
import { ShieldCheck, ArrowRight, ChevronLeft } from 'lucide-react-native';

const ClientViewScreen = ({ navigation }) => {
  const [token, setToken] = useState('');

  const handleAccessProject = () => {
    if (!token.trim()) {
      return Alert.alert("Input Required", "Please enter the shareable token sent by your freelancer.");
    }
    
    // Yahan hum token ke sath Project Detail page par navigate karenge
    // Hum aik alag screen 'ClientProjectDetail' banayenge jahan sirf viewer mode ho
    navigation.navigate('ClientProjectDetail', { shareableToken: token });
  };

  return (
    <SafeAreaView style={styles.container}>
      
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
        style={styles.content}
      >
        <TouchableOpacity style={styles.backButton} 
        onPress={() => navigation.navigate('Landing')}
        >
            <ChevronLeft size={28} color="#1E293B" />
          </TouchableOpacity>
        <View style={styles.header}>
          <View style={styles.iconCircle}>
            <ShieldCheck size={40} color="#2563EB" />
          </View>
          <Text style={styles.title}>Client Access</Text>
          <Text style={styles.subtitle}>Enter the token provided to you to view project proofs and files.</Text>
        </View>

        <View style={styles.inputSection}>
          <TextInput
            style={styles.input}
            placeholder="Paste Token Here (e.g. 8f2a1b...)"
            placeholderTextColor="#94A3B8"
            value={token}
            onChangeText={setToken}
            autoCapitalize="none"
            autoCorrect={false}
          />
          
          <TouchableOpacity style={styles.btn} onPress={handleAccessProject}>
            <Text style={styles.btnText}>View Project</Text>
            <ArrowRight size={20} color="#FFF" />
          </TouchableOpacity>
        </View>
    </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  
  container: { flex: 1, backgroundColor: '#FFF' },
  content: { flex: 1, padding: 30, justifyContent: 'center' },
  header: { alignItems: 'center', marginBottom: 40 },
  iconCircle: { width: 80, height: 80, borderRadius: 40, backgroundColor: '#EFF6FF', justifyContent: 'center', alignItems: 'center', marginBottom: 20 },
  title: { fontSize: 28, fontWeight: '900', color: '#1E293B' },
  subtitle: { fontSize: 14, color: '#64748B', textAlign: 'center', marginTop: 10, lineHeight: 22 },
  inputSection: { width: '100%' },
  input: { 
    backgroundColor: '#F8FAFC', 
    borderWidth: 1, 
    borderColor: '#E2E8F0', 
    borderRadius: 16, 
    padding: 18, 
    fontSize: 16, 
    color: '#1E293B',
    marginBottom: 20,
    textAlign: 'center',
    fontWeight: 'bold'
  },
  btn: { 
    backgroundColor: '#2563EB', 
    height: 60, 
    borderRadius: 16, 
    flexDirection: 'row', 
    justifyContent: 'center', 
    alignItems: 'center', 
    gap: 10,
    elevation: 4
  },
  btnText: { color: '#FFF', fontSize: 18, fontWeight: 'bold' },
  backText: { color: '#94A3B8', fontSize: 14, fontWeight: '600' },
  backButton: { position: 'absolute', top: Platform.OS === 'ios' ? 50 : 40,
  left: 20, zIndex: 10, padding: 10, backgroundColor: '#F1F5F9', borderRadius: 12 }
});

export default ClientViewScreen;
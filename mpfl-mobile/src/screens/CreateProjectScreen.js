import React, { useState } from 'react';
import { 
  View, Text, StyleSheet, TextInput, TouchableOpacity, 
  ActivityIndicator, Alert, KeyboardAvoidingView, Platform, ScrollView 
} from 'react-native';
import { PlusCircle, FileText, AlignLeft } from 'lucide-react-native';
import API from '../utils/api';

const CreateProjectScreen = ({ navigation }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  const handleCreateProject = async () => {
    if (!title.trim() || !description.trim()) {
      return Alert.alert("Wait", "Please enter both title and description.");
    }

    setLoading(true);
    try {
      // Backend ko data bhej rahay hain
      const res = await API.post('/projects', {
        title: title,
        description: description,
      });

      if (res.status === 201 || res.status === 200) {
        Alert.alert("Success", "Project created successfully!");
        setTitle('');
        setDescription('');
        // Project banne ke baad Dashboard par wapas
        navigation.navigate('Main', { screen: 'Dashboard' }); 
      }
    } catch (err) {
      console.error(err);
      Alert.alert("Error", "Could not create project. Check your backend.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <PlusCircle size={40} color="#2563EB" />
          <Text style={styles.headerTitle}>New Project</Text>
          <Text style={styles.subTitle}>Enter details to start a new workspace</Text>
        </View>

        <View style={styles.form}>
          {/* Project Title Input */}
          <View style={styles.inputGroup}>
            <View style={styles.labelRow}>
              <FileText size={18} color="#64748B" />
              <Text style={styles.label}>Project Title</Text>
            </View>
            <TextInput
              style={styles.input}
              placeholder="e.g. Logo Design for Client X"
              value={title}
              onChangeText={setTitle}
            />
          </View>

          {/* Project Description Input */}
          <View style={styles.inputGroup}>
            <View style={styles.labelRow}>
              <AlignLeft size={18} color="#64748B" />
              <Text style={styles.label}>Description</Text>
            </View>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Tell something about the project..."
              value={description}
              onChangeText={setDescription}
              multiline={true}
              numberOfLines={4}
            />
          </View>

          {/* Create Button */}
          <TouchableOpacity 
            style={[styles.createBtn, loading && { opacity: 0.7 }]} 
            onPress={handleCreateProject}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#FFF" />
            ) : (
              <Text style={styles.createBtnText}>Create Project</Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  scrollContainer: { padding: 25 },
  header: { alignItems: 'center', marginBottom: 30, marginTop: 20 },
  headerTitle: { fontSize: 24, fontWeight: '900', color: '#1E293B', marginTop: 10 },
  subTitle: { fontSize: 14, color: '#64748B', textAlign: 'center', marginTop: 5 },
  
  form: { marginTop: 10 },
  inputGroup: { marginBottom: 20 },
  labelRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 8 },
  label: { fontSize: 15, fontWeight: '700', color: '#334155' },
  input: { 
    backgroundColor: '#FFF', 
    borderWidth: 1, 
    borderColor: '#E2E8F0', 
    borderRadius: 15, 
    padding: 15, 
    fontSize: 16, 
    color: '#1E293B' 
  },
  textArea: { height: 120, textAlignVertical: 'top' },
  
  createBtn: { 
    backgroundColor: '#2563EB', 
    height: 60, 
    borderRadius: 18, 
    justifyContent: 'center', 
    alignItems: 'center', 
    marginTop: 10,
    elevation: 4,
    shadowColor: '#2563EB',
    shadowOpacity: 0.3,
    shadowRadius: 10
  },
  createBtnText: { color: '#FFF', fontSize: 18, fontWeight: 'bold' }
});

export default CreateProjectScreen;
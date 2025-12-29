import React, { useEffect, useState } from 'react';
import { 
  View, Text, StyleSheet, ScrollView, TouchableOpacity, 
  ActivityIndicator, Alert, Linking, SafeAreaView, TextInput 
} from 'react-native';
import { ChevronLeft, FileText, Download, CheckCircle, XCircle } from 'lucide-react-native';
import API from '../utils/api';

const ClientProjectDetailScreen = ({ route, navigation }) => {
  const { shareableToken } = route.params;
  const [project, setProject] = useState(null);
  const [proofs, setProofs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [comment, setComment] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchProjectByToken();
  }, []);

  const fetchProjectByToken = async () => {
    try {
      // Backend route: /shared/:token
      const res = await API.get(`/client/shared/${shareableToken}`);
      setProject(res.data.project);
      setProofs(res.data.proofs);
    } catch (err) {
      Alert.alert("Error", "Invalid link or project not found.");
      navigation.goBack();
    } finally {
      setLoading(false);
    }
  };

  const downloadFile = (url) => {
    if (!url) return Alert.alert("Error", "No link available");
    Linking.openURL(url);
  };

  const handleFeedback = async (selectedDecision) => {
    if (!comment.trim()) {
      return Alert.alert("Required", "Please enter a comment.");
    }

    setSubmitting(true);
    try {
      // BACKEND FIX: Aapka backend router.put use kar raha hai
      const response = await API.put(`/client/bulk-feedback/${project._id}`, {
        clientFeedback: {
          name: "Client",
          comment: comment,
          decision: selectedDecision === 'Accept' ? 'Accepted' : 'Rejected'
        }
      });

      if (response.status === 200) {
        Alert.alert("Success", "Feedback submitted!");
        fetchProjectByToken(); // Refresh status
        setComment('');
      }
    } catch (err) {
      console.log("Error Detail:", err.response?.data);
      Alert.alert("Error", "Could not submit feedback. Make sure server is running.");
    } finally {
      setSubmitting(false);
    }
  };

  // Syntax Fix: function ke andar return statements
  if (loading) {
    return (
      <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
        <ActivityIndicator size="large" color="#2563EB" />
      </View>
    );
  }

  const isCompleted = project?.status === 'completed';

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <ChevronLeft size={24} color="#1E293B" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Review Project</Text>
        <View style={{width: 40}} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.mainCard}>
          <Text style={styles.title}>{project?.title}</Text>
          <Text style={styles.desc}>{project?.description}</Text>
        </View>

        <Text style={styles.sectionHeading}>Files to Review</Text>
        {proofs?.map((file, index) => (
          <View key={index} style={styles.fileCard}>
            <FileText size={20} color="#2563EB" />
            <Text style={{flex: 1, marginLeft: 10}} numberOfLines={1}>{file.fileName || `File ${index+1}`}</Text>
            <TouchableOpacity onPress={() => downloadFile(file.fileUrl)}>
              <Download size={20} color="#64748B" />
            </TouchableOpacity>
          </View>
        ))}

        <View style={styles.feedbackContainer}>
          <Text style={styles.sectionHeading}>Your Feedback</Text>
          
          {isCompleted ? (
            <View style={styles.completedBox}>
              <CheckCircle size={40} color="#16A34A" />
              <Text style={styles.completedText}>This project is Completed.</Text>
            </View>
          ) : (
            <View style={styles.inputCard}>
              <TextInput
                style={styles.textInput}
                placeholder="Request changes or accept..."
                multiline
                value={comment}
                onChangeText={setComment}
              />
              <View style={styles.actionRow}>
                <TouchableOpacity 
                  style={[styles.actionBtn, styles.rejectBtn]} 
                  onPress={() => handleFeedback('Reject')} 
                  disabled={submitting}
                >
                  <XCircle size={20} color="#EF4444" />
                  <Text style={styles.rejectText}>Reject</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                  style={[styles.actionBtn, styles.acceptBtn]} 
                  onPress={() => handleFeedback('Accept')} 
                  disabled={submitting}
                >
                  <CheckCircle size={20} color="#FFF" />
                  <Text style={styles.acceptText}>Accept All</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 15, backgroundColor: '#FFF' },
  headerTitle: { fontSize: 18, fontWeight: '800', color: '#1E293B' },
  backBtn: { padding: 8, backgroundColor: '#F1F5F9', borderRadius: 10 },
  scrollContent: { padding: 20 },
  mainCard: { backgroundColor: '#FFF', padding: 20, borderRadius: 20, marginBottom: 20 },
  title: { fontSize: 22, fontWeight: '900', color: '#1E293B' },
  desc: { color: '#64748B', marginTop: 8, lineHeight: 20 },
  sectionHeading: { fontSize: 16, fontWeight: '800', color: '#1E293B', marginBottom: 12 },
  fileCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFF', padding: 15, borderRadius: 15, marginBottom: 10 },
  feedbackContainer: { marginTop: 20 },
  inputCard: { backgroundColor: '#FFF', padding: 15, borderRadius: 20, elevation: 2 },
  textInput: { backgroundColor: '#F8FAFC', borderRadius: 12, padding: 15, textAlignVertical: 'top', height: 100, marginBottom: 15, color: '#1E293B' },
  actionRow: { flexDirection: 'row', gap: 10 },
  actionBtn: { flex: 1, height: 55, borderRadius: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8 },
  acceptBtn: { backgroundColor: '#2563EB' },
  rejectBtn: { backgroundColor: '#FEF2F2', borderWidth: 1, borderColor: '#FEE2E2' },
  acceptText: { color: '#FFF', fontWeight: 'bold' },
  rejectText: { color: '#EF4444', fontWeight: 'bold' },
  completedBox: { backgroundColor: '#F0FDF4', padding: 30, borderRadius: 20, alignItems: 'center', borderWidth: 1, borderColor: '#BBF7D0' },
  completedText: { color: '#16A34A', fontWeight: '700', textAlign: 'center', marginTop: 10 }
});

export default ClientProjectDetailScreen;
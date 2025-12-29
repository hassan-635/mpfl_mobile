import React, { useEffect, useState } from 'react';
import { 
  View, Text, StyleSheet, ActivityIndicator, TouchableOpacity, 
  Alert, ScrollView, Share, Platform, SafeAreaView 
} from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import * as Clipboard from 'expo-clipboard';
import { 
  Share2, Copy, FileText, Upload, Plus, X, 
  ChevronLeft, CheckCircle2, MessageSquare, ExternalLink, XCircle 
} from 'lucide-react-native';
import API from '../utils/api';

const ProjectDetailScreen = ({ route, navigation }) => {
  const { projectId } = route.params;
  const [project, setProject] = useState(null);
  const [proofs, setProofs] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);

  useEffect(() => {
    fetchProjectData();
  }, [projectId]);

  const fetchProjectData = async () => {
    setLoading(true);
    try {
      const res = await API.get(`/projects/${projectId}`);
      setProject(res.data);
      
      try {
        // FIX: Route path ko /proofs/project/ kiya hai jaisa aapke backend mein hai
        const proofRes = await API.get(`/proofs/project/${projectId}`);
        const data = Array.isArray(proofRes.data) ? proofRes.data : proofRes.data.proofs;
        setProofs(data || []);
      } catch (proofErr) {
        console.log("Proof fetch error:", proofErr);
        setProofs([]);
      }
    } catch (err) {
      Alert.alert("Error", "Could not load project info.");
    } finally {
      setLoading(false);
    }
  };

  // --- FEEDBACK DATA EXTRACTION ---
  // Hum wo proof dhoond rahe hain jis mein decision 'Pending' na ho
  const feedbackObject = proofs.find(p => 
    p.clientFeedback && 
    p.clientFeedback.decision && 
    p.clientFeedback.decision !== 'Pending'
  );
  
  const clientComment = feedbackObject?.clientFeedback?.comment;
  const clientDecision = feedbackObject?.clientFeedback?.decision;
  const clientName = feedbackObject?.clientFeedback?.name;

  const isCompleted = project?.status === 'completed';
  const isRejected = clientDecision === 'Reject' || clientDecision === 'Rejected';
  const token = project?.shareableToken;

  // --- HANDLERS ---
  const handleShareToken = async () => {
    try {
      if (!token) return Alert.alert("Wait", "Token not generated yet.");
      await Share.share({ message: `Project Token: ${token}` });
    } catch (error) { Alert.alert("Error", error.message); }
  };

  const handleCopyToken = async () => {
    if (!token) return;
    await Clipboard.setStringAsync(token);
    Alert.alert("Copied!", "Token copied to clipboard.");
  };

  const pickFiles = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({ type: "*/*", multiple: true });
      if (!result.canceled) setSelectedFiles([...selectedFiles, ...result.assets]);
    } catch (err) { Alert.alert("Error", "Could not pick files."); }
  };

  const handleUpload = async () => {
    if (selectedFiles.length === 0) return Alert.alert("Wait", "Select files first.");
    setUploading(true);
    const formData = new FormData();
    formData.append('projectId', projectId);
    selectedFiles.forEach((file) => {
      formData.append('files', { uri: file.uri, type: file.mimeType || 'application/octet-stream', name: file.name });
    });

    try {
      await API.post('/proofs', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
      Alert.alert("Success", "Files uploaded!");
      setSelectedFiles([]);
      fetchProjectData(); 
    } catch (err) { Alert.alert("Upload Failed", "File error."); }
    finally { setUploading(false); }
  };

  if (loading) return <View style={styles.loader}><ActivityIndicator size="large" color="#2563EB" /></View>;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F8FAFC' }}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <ChevronLeft size={24} color="#1E293B" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Project Details</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        
        {/* PROJECT INFO CARD */}
        <View style={styles.card}>
          <View style={styles.row}>
            <Text style={styles.title}>{project?.title}</Text>
            <View style={[styles.statusBadge, { backgroundColor: isCompleted ? '#DCFCE7' : '#DBEAFE' }]}>
              <Text style={[styles.statusText, { color: isCompleted ? '#16A34A' : '#2563EB' }]}>
                {project?.status?.toUpperCase()}
              </Text>
            </View>
          </View>
          <Text style={styles.description}>{project?.description}</Text>
        </View>

        {/* FEEDBACK SECTION - Shows if Rejected OR Accepted OR Completed */}
        {(clientDecision && clientDecision !== 'Pending') && (
          <View style={styles.card}>
            <View style={styles.sectionHeader}>
              <MessageSquare size={20} color={isRejected ? "#EF4444" : "#16A34A"} />
              <Text style={styles.sectionTitle}>Client Feedback</Text>
            </View>

            <View style={[
              styles.feedbackBox, 
              isRejected ? styles.rejectedBox : styles.acceptedBox
            ]}>
              <View style={styles.commentBubble}>
                <Text style={styles.commentText}>
                  {clientComment ? clientComment : "No text comment provided by client."}
                </Text>
              </View>
              
              <View style={styles.decisionRow}>
                {isRejected ? (
                  <XCircle size={18} color="#EF4444" />
                ) : (
                  <CheckCircle2 size={18} color="#16A34A" />
                )}
                <Text style={[styles.decisionText, { color: isRejected ? "#EF4444" : "#16A34A" }]}>
                  {clientName || 'Client'} marked as: {clientDecision}
                </Text>
              </View>
            </View>
          </View>
        )}

        {/* SHARE & UPLOAD (ONLY IF NOT COMPLETED) */}
        {!isCompleted && (
          <>
            <View style={styles.card}>
              <View style={styles.sectionHeader}><Share2 size={20} color="#1E293B" /><Text style={styles.sectionTitle}>Share with Client</Text></View>
              <View style={styles.tokenBox}><Text style={styles.tokenValue}>{token}</Text></View>
              <View style={styles.actionRow}>
                <TouchableOpacity style={styles.btnSecondary} onPress={handleCopyToken}><Text style={styles.btnTextSecondary}>Copy</Text></TouchableOpacity>
                <TouchableOpacity style={styles.btnPrimary} onPress={handleShareToken}><Text style={styles.btnTextPrimary}>Send</Text></TouchableOpacity>
              </View>
            </View>

            <View style={styles.card}>
              <View style={styles.sectionHeader}><Upload size={20} color="#1E293B" /><Text style={styles.sectionTitle}>Upload Proofs</Text></View>
              <TouchableOpacity style={styles.dropZone} onPress={pickFiles}><Plus size={30} color="#CBD5E1" /></TouchableOpacity>
              {selectedFiles.map((f, i) => (
                <View key={i} style={styles.fileRow}>
                  <Text style={{flex:1}}>{f.name}</Text>
                  <TouchableOpacity onPress={() => setSelectedFiles(selectedFiles.filter((_, idx) => idx !== i))}><X size={18} color="#EF4444" /></TouchableOpacity>
                </View>
              ))}
              {selectedFiles.length > 0 && (
                <TouchableOpacity style={styles.mainUploadBtn} onPress={handleUpload} disabled={uploading}>
                  {uploading ? <ActivityIndicator color="#FFF" /> : <Text style={styles.mainUploadBtnText}>Upload Files</Text>}
                </TouchableOpacity>
              )}
            </View>
          </>
        )}

        {/* DELIVERABLES LIST */}
        <View style={[styles.card, { marginBottom: 60 }]}>
          <Text style={styles.sectionTitle}>Uploaded Deliverables ({proofs.length})</Text>
          {proofs.map((proof, index) => (
            <View key={index} style={styles.renderFileRow}>
              <FileText size={20} color="#2563EB" />
              <View style={{flex: 1, marginLeft: 10}}>
                <Text style={styles.renderFileName} numberOfLines={1}>{proof.fileName || `File ${index+1}`}</Text>
                <Text style={styles.fileDate}>{new Date(proof.createdAt).toLocaleDateString()}</Text>
              </View>
              <ExternalLink size={18} color="#94A3B8" />
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 15 },
  loader: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 20, backgroundColor: '#FFF', borderBottomWidth: 1, borderColor: '#F1F5F9' },
  backBtn: { padding: 8, backgroundColor: '#F1F5F9', borderRadius: 10 },
  headerTitle: { fontSize: 18, fontWeight: '800', color: '#1E293B' },
  card: { backgroundColor: '#FFF', borderRadius: 20, padding: 20, marginBottom: 15, elevation: 1 },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  title: { fontSize: 20, fontWeight: '900', color: '#1E293B', flex: 1 },
  statusBadge: { paddingHorizontal: 10, paddingVertical: 5, borderRadius: 8 },
  statusText: { fontSize: 10, fontWeight: 'bold' },
  description: { color: '#64748B', lineHeight: 20 },
  sectionHeader: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 15 },
  sectionTitle: { fontSize: 16, fontWeight: '800', color: '#1E293B' },
  
  feedbackBox: { padding: 15, borderRadius: 15, borderWidth: 1 },
  acceptedBox: { backgroundColor: '#F0FDF4', borderColor: '#DCFCE7' },
  rejectedBox: { backgroundColor: '#FEF2F2', borderColor: '#FCA5A5' },
  commentBubble: { backgroundColor: '#FFF', padding: 12, borderRadius: 10, marginBottom: 10 },
  commentText: { color: '#1E293B', fontSize: 15, lineHeight: 22 },
  decisionRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  decisionText: { fontWeight: 'bold', fontSize: 14 },

  tokenBox: { backgroundColor: '#F8FAFC', padding: 15, borderRadius: 12, alignItems: 'center', marginBottom: 10, borderWidth: 1, borderColor: '#E2E8F0' },
  tokenValue: { fontSize: 18, fontWeight: 'bold', color: '#2563EB', letterSpacing: 1.5 },
  actionRow: { flexDirection: 'row', gap: 10 },
  btnPrimary: { flex: 1, backgroundColor: '#2563EB', height: 45, borderRadius: 12, justifyContent: 'center', alignItems: 'center' },
  btnSecondary: { flex: 1, backgroundColor: '#F1F5F9', height: 45, borderRadius: 12, justifyContent: 'center', alignItems: 'center' },
  btnTextPrimary: { color: '#FFF', fontWeight: 'bold' },
  btnTextSecondary: { color: '#475569', fontWeight: 'bold' },
  dropZone: { height: 80, borderStyle: 'dashed', borderWidth: 2, borderColor: '#CBD5E1', borderRadius: 15, justifyContent: 'center', alignItems: 'center', marginBottom: 10 },
  fileRow: { flexDirection: 'row', padding: 10, backgroundColor: '#F1F5F9', borderRadius: 10, marginBottom: 5 },
  mainUploadBtn: { backgroundColor: '#1E293B', height: 50, borderRadius: 12, justifyContent: 'center', alignItems: 'center' },
  mainUploadBtnText: { color: '#FFF', fontWeight: 'bold' },
  renderFileRow: { flexDirection: 'row', alignItems: 'center', padding: 12, backgroundColor: '#F8FAFC', borderRadius: 12, marginBottom: 8, borderWidth: 1, borderColor: '#E2E8F0' },
  renderFileName: { fontWeight: '700', color: '#1E293B' },
  fileDate: { fontSize: 11, color: '#94A3B8' },
});

export default ProjectDetailScreen;
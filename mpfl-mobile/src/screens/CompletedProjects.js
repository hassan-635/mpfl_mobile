import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, SafeAreaView } from 'react-native';
import { CheckCircle2, LayoutDashboard } from 'lucide-react-native';
import API from '../utils/api';
import { ProjectCard } from '../components/ProjectCard';

const CompletedProjectsScreen = ({ navigation }) => {
  const [completedProjects, setCompletedProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCompleted = async () => {
      try {
        const res = await API.get('/projects');
        // Sirf completed projects filter karein
        const filtered = res.data.filter(p => p.status === 'completed');
        setCompletedProjects(filtered);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchCompleted();
  }, []);

  if (loading) return <ActivityIndicator size="large" color="#16A34A" style={{flex:1}} />;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <CheckCircle2 size={30} color="#16A34A" />
        <Text style={styles.headerTitle}>Completed Work</Text>
        <Text style={styles.subTitle}>Your successful deliveries</Text>
      </View>

      <FlatList
        data={completedProjects}
        keyExtractor={(item) => item._id}
        contentContainerStyle={{ padding: 20, paddingBottom: 100 }}
        ListEmptyComponent={
          <View style={styles.empty}>
            <LayoutDashboard size={50} color="#CBD5E1" />
            <Text style={{color: '#94A3B8', marginTop: 10}}>No completed projects yet.</Text>
          </View>
        }
        renderItem={({ item }) => (
          <ProjectCard 
            title={item.title} 
            status={item.status} 
            onPress={() => navigation.navigate('ProjectDetail', { projectId: item._id })}
          />
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  header: { padding: 25, backgroundColor: '#FFF', alignItems: 'center', borderBottomWidth: 1, borderColor: '#F1F5F9' },
  headerTitle: { fontSize: 22, fontWeight: '900', color: '#1E293B', marginTop: 10 },
  subTitle: { fontSize: 13, color: '#64748B' },
  empty: { marginTop: 100, alignItems: 'center' }
});

export default CompletedProjectsScreen;
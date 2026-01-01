import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, SafeAreaView, RefreshControl } from 'react-native';
import API from '../utils/api';
import { ProjectCard } from '../components/ProjectCard';
import { LayoutDashboard, CheckCircle2, Clock, LogOut, History } from 'lucide-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TouchableOpacity } from 'react-native';
import { Plus } from 'lucide-react-native';

const DashboardScreen = ({ navigation }) => {
  const [projects, setProjects] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchDashboardData = async () => {
    try {
      const [projRes, statsRes] = await Promise.allSettled([
        API.get('/projects'),
        API.get('/projects/stats/all')
      ]);

      if (projRes.status === 'fulfilled') setProjects(projRes.value.data);
      if (statsRes.status === 'fulfilled') setStats(statsRes.value.data);
      
    } catch (err) {
      console.error("Dashboard Fetch Error:", err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  if (loading) return (
    <View style={styles.loader}>
      <ActivityIndicator size="large" color="#2563EB" />
    </View>
  );

  const handleLogout = async () => {
  await AsyncStorage.removeItem('userToken');
  await AsyncStorage.removeItem('userName');
  navigation.reset({
    index: 0,
    routes: [{ name: 'Login' }], // 'Login' aapki login screen ka naam hona chahiye navigation mein
  });
};

  // LOGIC: Filter projects to show only those NOT completed in the main list
  const activeProjects = projects.filter(item => item.status !== 'completed');

  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView style={styles.container}>
        {/* Stats Header */}
        <View style={styles.header}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <View>
              <Text style={styles.welcome}>Freelancer</Text>
              <Text style={styles.subTitle}>Manage your workflow</Text>
            </View>
            <TouchableOpacity onPress={handleLogout} style={styles.logoutBtn}>
              <LogOut size={22} color="#EF4444" />
            </TouchableOpacity>
          </View>

          <View style={styles.statsRow}>
            <View style={styles.statBox}>
              <Clock color="#64748B" size={20} style={{ marginBottom: 5 }} />
              <Text style={styles.statNum}>{stats?.totalProjects || 0}</Text>
              <Text style={styles.statLabel}>Total Projects</Text>
            </View>
            
            {/* Completed Stat - Ab ye clickable ban sakta hai history dekhne ke liye */}
            <TouchableOpacity 
              style={[styles.statBox, { backgroundColor: '#F0FDF4' }]}
              onPress={() => navigation.navigate('Completed')} // Agar aapne completed screen banayi hai
            >
              <CheckCircle2 color="#16A34A" size={20} style={{ marginBottom: 5 }} />
              <Text style={[styles.statNum, { color: '#16A34A' }]}>{stats?.completedProjects || 0}</Text>
              <Text style={[styles.statLabel, { color: '#16A34A' }]}>Completed</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Projects List */}
        <FlatList
          data={activeProjects} // SIRF ACTIVE PROJECTS
          keyExtractor={(item) => item._id}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={() => { setRefreshing(true); fetchDashboardData(); }} />
          }
          contentContainerStyle={{ 
            padding: 20,
            paddingBottom: 120 
          }}
          ListHeaderComponent={
            <View style={styles.listHeader}>
                <Text style={styles.sectionTitle}>Active Deliverables</Text>
                {/* Optional: Ek chota button completed projects dekhne ke liye */}
                <TouchableOpacity 
                  style={styles.historyBtn}
                  onPress={() => navigation.navigate('Completed')}
                >
                  <History size={16} color="#64748B" />
                  <Text style={styles.historyText}>History</Text>
                </TouchableOpacity>
            </View>
          }
          ListEmptyComponent={
              <View style={{ marginTop: 50, alignItems: 'center' }}>
                  <LayoutDashboard size={48} color="#CBD5E1" />
                  <Text style={{ color: '#94A3B8', marginTop: 10 }}>No active projects found</Text>
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

      <TouchableOpacity 
          style={styles.fab} 
          onPress={() => navigation.navigate('Create')} 
        >
          <Plus size={30} color="#FFF" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  loader: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  header: { 
    padding: 25, 
    paddingTop: 40,
    backgroundColor: '#FFF', 
    borderBottomLeftRadius: 35, 
    borderBottomRightRadius: 35, 
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 10
  },
  welcome: { fontSize: 26, fontWeight: '900', color: '#1E293B' },
  subTitle: { fontSize: 14, color: '#64748B', marginTop: 2 },
  statsRow: { flexDirection: 'row', marginTop: 25, gap: 15 },
  statBox: { 
    flex: 1, 
    backgroundColor: '#F1F5F9', 
    padding: 18, 
    borderRadius: 24, 
    alignItems: 'flex-start' 
  },
  logoutBtn: {
    padding: 10,
    backgroundColor: '#FEF2F2',
    borderRadius: 12,
  },
  listHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 10
  },
  sectionTitle: { fontSize: 19, fontWeight: '800', color: '#1E293B' },
  historyBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10
  },
  historyText: { fontSize: 12, fontWeight: '700', color: '#64748B' },
  fab: {
    position: 'absolute',
    bottom: 30, 
    right: 25,
    backgroundColor: '#2563EB',
    width: 65,
    height: 65,
    borderRadius: 32.5,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#2563EB', 
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
  },
  statNum: { fontSize: 22, fontWeight: '800', color: '#1E293B' },
  statLabel: { fontSize: 11, fontWeight: '600', color: '#64748B', marginTop: 2 },
});

export default DashboardScreen;
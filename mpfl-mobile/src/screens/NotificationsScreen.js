import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import API from '../utils/api';

const NotificationsScreen = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {

    const fetchUpdates = async () => {
      try {
        const res = await API.get('/projects');
        const updates = res.data.map(p => ({
          id: p._id,
          title: `Update on ${p.title}`,
          desc: `Current Status: ${p.status}`,
          time: new Date(p.updatedAt).toLocaleDateString()
        }));
        setNotifications(updates);
      } catch (e) { console.log(e); }
    };
    fetchUpdates();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Notifications</Text>
      <FlatList
        data={notifications}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <View style={styles.card}>
            <View style={styles.dot} />
            <View>
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text style={styles.cardDesc}>{item.desc}</Text>
              <Text style={styles.time}>{item.time}</Text>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC', padding: 20 },
  title: { fontSize: 28, fontWeight: '900', marginTop: 40, marginBottom: 20, color: '#1E293B' },
  card: { backgroundColor: '#FFF', padding: 20, borderRadius: 20, marginBottom: 12, flexDirection: 'row', alignItems: 'center', gap: 15 },
  dot: { width: 10, height: 10, borderRadius: 5, backgroundColor: '#2563EB' },
  cardTitle: { fontSize: 16, fontWeight: '700', color: '#1E293B' },
  cardDesc: { color: '#64748B', fontSize: 13, marginTop: 2 },
  time: { fontSize: 10, color: '#94A3B8', marginTop: 5 }
});

export default NotificationsScreen;
import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';

export const ProjectCard = ({ title, status, onPress }) => (
  <TouchableOpacity style={styles.card} onPress={onPress}>
    <View style={styles.info}>
      <Text style={styles.title}>{title}</Text>
      <View style={[styles.badge, { backgroundColor: status === 'completed' ? '#DCFCE7' : '#FEF9C3' }]}>
        <Text style={[styles.badgeText, { color: status === 'completed' ? '#166534' : '#854D0E' }]}>
          {status.toUpperCase()}
        </Text>
      </View>
    </View>
    <Text style={styles.arrow}>→</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  card: { backgroundColor: '#FFF', padding: 20, borderRadius: 20, marginBottom: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderVertical: 1, borderColor: '#F1F5F9' },
  title: { fontSize: 16, fontWeight: '700', color: '#1E293B' },
  badge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8, marginTop: 5, alignSelf: 'flex-start' },
  badgeText: { fontSize: 10, fontWeight: '900' },
  arrow: { fontSize: 20, color: '#CBD5E1' }
});
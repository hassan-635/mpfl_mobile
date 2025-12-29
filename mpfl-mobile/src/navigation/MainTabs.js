import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Platform, StyleSheet } from 'react-native';
import { LayoutDashboard, PlusCircle, Bell, User, CheckCircle2 } from 'lucide-react-native';

import DashboardScreen from '../screens/DashboardScreen';
import NotificationsScreen from '../screens/NotificationsScreen';
import CompletedProjectsScreen from '../screens/CompletedProjects';

const Tab = createBottomTabNavigator();

export default function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false, // Label khatam
        tabBarActiveTintColor: '#2563EB',
        tabBarInactiveTintColor: '#94A3B8',
        tabBarStyle: {
          backgroundColor: '#ffffff',
          borderTopWidth: 0,
          height: 70,
          paddingBottom: Platform.OS === 'ios' ? 25 : 10, // Margin fix
          paddingTop: 10,
          elevation: 20,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -4 },
          shadowOpacity: 0.1,
          shadowRadius: 10,
        },
      })}
    >
      <Tab.Screen 
        name="Home" 
        component={DashboardScreen} 
        options={{
          tabBarIcon: ({ color }) => <LayoutDashboard size={24} color={color} />,
        }}
      />
      <Tab.Screen 
        name="Alerts" 
        component={NotificationsScreen} 
        options={{
          tabBarIcon: ({ color }) => <Bell size={24} color={color} />,
        }}
      />
      <Tab.Screen 
  name="Completed" 
  component={CompletedProjectsScreen} 
  options={{
    tabBarLabel: 'Completed',
    tabBarIcon: ({ color }) => <CheckCircle2 color={color} size={22} />,
  }}
/>
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  centerButton: {
    backgroundColor: '#2563EB',
    width: 55,
    height: 55,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    top: -15, // Is se middle button thora oopar uth jaye ga (Premium look)
    elevation: 5,
    shadowColor: '#2563EB',
    shadowOpacity: 0.3,
    shadowRadius: 8,
  }
});
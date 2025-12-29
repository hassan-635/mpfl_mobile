import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LandingScreen from './src/screens/LandingScreen';
import LoginScreen from './src/screens/LoginScreen';
import SignupScreen from './src/screens/SignupScreen';
import MainTabs from './src/navigation/MainTabs'; // Jo icons wala code oopar diya tha
import ClientViewScreen from './src/screens/ClientViewScreen';
import ProjectDetailScreen from './src/screens/ProjectDetailScreen'; // 1. Import karein
import CreateProjectScreen from './src/screens/CreateProjectScreen'; 
import ClientProjectDetailScreen from './src/screens/ClientProjectDetailScreen';
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Landing" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Landing" component={LandingScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="Main" component={MainTabs} />
        <Stack.Screen name="ClientView" component={ClientViewScreen} />
        <Stack.Screen 
          name="ProjectDetail" 
          component={ProjectDetailScreen} 
          options={{ 
            headerShown: true, 
            title: 'Project Details',
            headerBackTitle: 'Back' 
          }} 
        />
        <Stack.Screen 
          name="Create" 
          component={CreateProjectScreen} 
          options={{ 
            headerShown: true, 
            title: 'Start New Project',
            headerTintColor: '#2563EB', // Blue header text
          }} 
        />
        <Stack.Screen 
          name="ClientProjectDetail" 
          component={ClientProjectDetailScreen} 
          options={{ headerShown: false }} // Custom header use kiya hai isliye false
/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
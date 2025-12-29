import React from 'react';
import { 
  View, Text, StyleSheet, Image, TouchableOpacity, 
  SafeAreaView, Dimensions, StatusBar 
} from 'react-native';
import { Briefcase, ShieldCheck, ArrowRight } from 'lucide-react-native';

const { width } = Dimensions.get('window');

const LandingScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {/* Upper Decorative Circle */}
      <View style={styles.circle} />

      <View style={styles.content}>
        {/* Logo/Icon Section */}
        <View style={styles.logoContainer}>
          <View style={styles.iconBox}>
            <Briefcase size={50} color="#2563EB" strokeWidth={2.5} />
          </View>
          <Text style={styles.brandName}>Freelance<Text style={{color: '#2563EB'}}>Sync</Text></Text>
          <Text style={styles.tagline}>Smart Proof Delivery & Workflow</Text>
        </View>

        {/* Illustration or Image Placeholder */}
        <View style={styles.heroSection}>
           <Text style={styles.welcomeText}>Welcome to your professional workspace.</Text>
        </View>

        {/* Action Buttons */}
        <View style={styles.buttonContainer}>
          
          {/* Freelancer Login Button */}
          <TouchableOpacity 
            style={styles.loginBtn} 
            onPress={() => navigation.navigate('Login')}
          >
            <Text style={styles.loginBtnText}>Freelancer Login</Text>
            <ArrowRight size={20} color="#FFF" />
          </TouchableOpacity>

          {/* Client Access Button */}
          <TouchableOpacity 
            style={styles.clientBtn} 
            onPress={() => navigation.navigate('ClientView')}
          >
            <ShieldCheck size={22} color="#475569" />
            <Text style={styles.clientBtnText}>I am a Client (Access Project)</Text>
          </TouchableOpacity>

        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Secure • Professional • Fast</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  circle: {
    position: 'absolute',
    top: -100,
    right: -100,
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: '#EFF6FF',
    zIndex: 0,
  },
  content: {
    flex: 1,
    paddingHorizontal: 30,
    justifyContent: 'space-between',
    paddingVertical: 50,
    zIndex: 1,
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 40,
  },
  iconBox: {
    width: 100,
    height: 100,
    backgroundColor: '#F0F7FF',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    // Soft Shadow
    shadowColor: "#2563EB",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 5,
  },
  brandName: {
    fontSize: 32,
    fontWeight: '900',
    color: '#1E293B',
    letterSpacing: -1,
  },
  tagline: {
    fontSize: 14,
    color: '#64748B',
    marginTop: 5,
    fontWeight: '500',
  },
  heroSection: {
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  welcomeText: {
    fontSize: 18,
    color: '#334155',
    textAlign: 'center',
    lineHeight: 26,
    fontWeight: '600',
  },
  buttonContainer: {
    gap: 15,
  },
  loginBtn: {
    backgroundColor: '#2563EB',
    height: 65,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    elevation: 8,
    shadowColor: "#2563EB",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 4 },
  },
  loginBtnText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  clientBtn: {
    backgroundColor: '#F1F5F9',
    height: 65,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  clientBtnText: {
    color: '#475569',
    fontSize: 16,
    fontWeight: '700',
  },
  footer: {
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
    color: '#CBD5E1',
    fontWeight: '800',
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
});

export default LandingScreen;
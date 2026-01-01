import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Platform,
} from "react-native";
import axios from "axios";
import { ChevronLeft } from "lucide-react-native";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      // Backend Endpoint: /api/v1/auth/login
      const res = await axios.post(
        "https://mpfl-backend.onrender.com/api/v1/auth/login",
        { email, password }
      );
      if (res.data.token) {
        // Token logic yahan handle hogi
        Alert.alert("Welcome", `Hello ${res.data.name}`);
        navigation.navigate("Main");
      }
    } catch (error) {
      Alert.alert(
        "Login Failed",
        error.response?.data?.message || "Invalid credentials"
      );
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.navigate("Landing")}
      >
        <ChevronLeft size={28} color="#1E293B" />
      </TouchableOpacity>
      <Text style={styles.title}>Welcome Back</Text>
      <Text style={styles.subtitle}>Login to your freelancer portal</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#64748B"
        autoCapitalize="none"
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#64748B"
        secureTextEntry
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
        <Text style={styles.link}>New here? Create Account</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
    padding: 30,
    justifyContent: "center",
  },
  title: { fontSize: 32, fontWeight: "900", color: "#1E293B" },
  subtitle: { fontSize: 16, color: "#64748B", marginBottom: 40 },
  input: {
    backgroundColor: "#FFFFFF",
    padding: 18,
    borderRadius: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    color: "#1E293B",
  },
  button: {
    backgroundColor: "#2563EB",
    padding: 18,
    borderRadius: 15,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: { color: "#FFF", fontSize: 18, fontWeight: "bold" },
  link: { color: "#64748B", textAlign: "center", marginTop: 20 },
  backButton: {
    position: "absolute",
    top: Platform.OS === "ios" ? 50 : 40, // Mobile status bar ke hisab se adjustment
    left: 20,
    zIndex: 10,
    padding: 10,
    backgroundColor: "#F1F5F9", // Light gray background
    borderRadius: 12,
  },
});

export default LoginScreen;

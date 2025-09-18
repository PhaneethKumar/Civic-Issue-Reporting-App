import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { LogoComponent } from '../components/auth/LogoComponent';

export default function AuthSelectionScreen() {
  const router = useRouter();

  const handleAdminLogin = () => {
    router.push('/admin-login');
  };

  const handleCitizenLogin = () => {
    router.push('/citizen-login');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Logo */}
        <View style={styles.logoContainer}>
          <LogoComponent size={120} showCircle={true} />
        </View>

        {/* Title */}
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Choose Login Type</Text>
          <Text style={styles.subtitle}>Select your access level to continue.</Text>
        </View>

        {/* Login Options */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.citizenButton} onPress={handleCitizenLogin}>
            <Text style={styles.citizenButtonText}>Citizen Login</Text>
            <Text style={styles.buttonSubtext}>Report issues and track progress</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.adminButton} onPress={handleAdminLogin}>
            <Text style={styles.adminButtonText}>Admin Login</Text>
            <Text style={styles.buttonSubtext}>Administrative access</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    flex: 1,
    paddingHorizontal: 32,
    justifyContent: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 60,
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: 80,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2C2C2C',
    marginBottom: 12,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
  },
  buttonContainer: {
    gap: 20,
  },
  citizenButton: {
    backgroundColor: '#1E88E5',
    paddingVertical: 20,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: 'center',
  },
  citizenButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  adminButton: {
    backgroundColor: '#2C5F5F',
    paddingVertical: 20,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: 'center',
  },
  adminButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  buttonSubtext: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 14,
    textAlign: 'center',
  },
});
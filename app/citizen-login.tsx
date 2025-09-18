import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { LogoComponent } from '../components/auth/LogoComponent';
import { AuthInput, OTPInput, PrimaryButton, GoogleButton } from '../components/auth/AuthComponents';
import { useAuth } from '../contexts/AuthContext';

export default function CitizenLoginScreen() {
  const [phoneEmail, setPhoneEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { login } = useAuth();

  const handleContinue = async () => {
    if (!phoneEmail.trim() || otp.length < 6) {
      Alert.alert('Error', 'Please enter valid email/phone and 6-digit OTP');
      return;
    }

    setIsLoading(true);
    try {
      const success = await login(phoneEmail.trim(), otp.trim(), 'citizen');
      if (success) {
        router.replace('/(tabs)');
      } else {
        Alert.alert(
          'Login Failed', 
          'Invalid credentials. Use:\nEmail: citizen@email.com\nOTP: 654321',
          [{ text: 'OK' }]
        );
      }
    } catch (error) {
      Alert.alert('Error', 'Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = () => {
    // Handle Google sign in
    console.log('Google sign in');
    router.replace('/(tabs)');
  };

  const handleContinueAsGuest = async () => {
    // Handle guest access - login as a guest citizen
    console.log('Continue as guest');
    setIsLoading(true);
    try {
      // Use a special guest login
      const success = await login('guest@local.com', '000000', 'citizen');
      if (success) {
        router.replace('/(tabs)');
      } else {
        // Fallback - just navigate without auth for guest
        router.replace('/(tabs)');
      }
    } catch (error) {
      // Fallback - just navigate without auth for guest
      router.replace('/(tabs)');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingView}
      >
        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Logo */}
          <View style={styles.logoContainer}>
            <LogoComponent size={100} showCircle={true} />
          </View>

          {/* Title */}
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Welcome to CityConnect</Text>
            <Text style={styles.subtitle}>Report civic issues and help improve your city.</Text>
          </View>

          {/* Form */}
          <View style={styles.formContainer}>
            {/* Phone/Email Input with Label */}
            <View style={styles.inputSection}>
              <Text style={styles.inputLabel}>Phone number or email</Text>
              <AuthInput
                placeholder="Enter your phone or email"
                value={phoneEmail}
                onChangeText={setPhoneEmail}
                icon="email"
              />
            </View>

            {/* OTP Input with Label */}
            <View style={styles.inputSection}>
              <Text style={styles.inputLabel}>One-Time Password (OTP)</Text>
              <OTPInput
                value={otp}
                onChangeText={setOtp}
                showDashes={true}
              />
            </View>

            {/* Continue Button */}
            <PrimaryButton
              title={isLoading ? "Signing in..." : "Continue"}
              onPress={handleContinue}
              disabled={!phoneEmail || otp.length < 6 || isLoading}
            />

            {/* Divider */}
            <View style={styles.dividerContainer}>
              <View style={styles.divider} />
              <Text style={styles.dividerText}>Or</Text>
              <View style={styles.divider} />
            </View>

            {/* Google Sign In */}
            <GoogleButton
              title="Continue with Google"
              onPress={handleGoogleSignIn}
            />

            {/* Continue as Guest */}
            <TouchableOpacity 
              style={styles.guestButton} 
              onPress={handleContinueAsGuest}
            >
              <Text style={styles.guestButtonText}>Continue as Guest</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 32,
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 40,
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: 50,
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
    lineHeight: 22,
  },
  formContainer: {
    flex: 1,
  },
  inputSection: {
    marginBottom: 24,
  },
  inputLabel: {
    fontSize: 16,
    color: '#333333',
    fontWeight: '500',
    marginBottom: 8,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 32,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: '#E0E0E0',
  },
  dividerText: {
    marginHorizontal: 16,
    fontSize: 14,
    color: '#666666',
  },
  guestButton: {
    alignItems: 'center',
    paddingVertical: 16,
    marginTop: 24,
    marginBottom: 40,
  },
  guestButtonText: {
    fontSize: 16,
    color: '#2C2C2C',
    fontWeight: '600',
  },
});
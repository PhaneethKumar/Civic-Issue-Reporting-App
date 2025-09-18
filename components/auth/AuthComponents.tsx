import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Svg, { Path } from 'react-native-svg';

// Input Field Component
interface AuthInputProps {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  icon?: 'email' | 'key';
  secureTextEntry?: boolean;
}

export const AuthInput: React.FC<AuthInputProps> = ({
  placeholder,
  value,
  onChangeText,
  icon,
  secureTextEntry = false,
}) => {
  const renderIcon = () => {
    if (icon === 'email') {
      return (
        <Svg width={20} height={20} viewBox="0 0 24 24" style={styles.inputIcon}>
          <Path
            d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"
            fill="#999"
          />
        </Svg>
      );
    }
    if (icon === 'key') {
      return (
        <Svg width={20} height={20} viewBox="0 0 24 24" style={styles.inputIcon}>
          <Path
            d="M12.65 10C11.83 7.67 9.61 6 7 6c-3.31 0-6 2.69-6 6s2.69 6 6 6c2.61 0 4.83-1.67 5.65-4H17v4h4v-4h2v-4H12.65zM7 14c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"
            fill="#999"
          />
        </Svg>
      );
    }
    return null;
  };

  return (
    <View style={styles.inputContainer}>
      {renderIcon()}
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        placeholderTextColor="#999"
      />
    </View>
  );
};

// OTP Input Component
interface OTPInputProps {
  value: string;
  onChangeText: (text: string) => void;
  showDashes?: boolean;
}

export const OTPInput: React.FC<OTPInputProps> = ({
  value,
  onChangeText,
  showDashes = false,
}) => {
  if (showDashes) {
    return (
      <View style={styles.otpContainer}>
        <TouchableOpacity style={styles.otpDashContainer} activeOpacity={1}>
          {[...Array(6)].map((_, index) => (
            <View key={index} style={styles.otpDash}>
              <Text style={styles.otpDashText}>
                {value[index] || '–'}
              </Text>
            </View>
          ))}
          <TextInput
            style={styles.hiddenOTPInput}
            value={value}
            onChangeText={onChangeText}
            keyboardType="numeric"
            maxLength={6}
            autoFocus={false}
          />
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.inputContainer}>
      <Svg width={20} height={20} viewBox="0 0 24 24" style={styles.inputIcon}>
        <Path
          d="M12.65 10C11.83 7.67 9.61 6 7 6c-3.31 0-6 2.69-6 6s2.69 6 6 6c2.61 0 4.83-1.67 5.65-4H17v4h4v-4h2v-4H12.65zM7 14c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"
          fill="#999"
        />
      </Svg>
      <TextInput
        style={styles.input}
        placeholder="OTP"
        value={value}
        onChangeText={onChangeText}
        keyboardType="numeric"
        maxLength={6}
        placeholderTextColor="#999"
      />
    </View>
  );
};

// Primary Button Component
interface PrimaryButtonProps {
  title: string;
  onPress: () => void;
  disabled?: boolean;
}

export const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  title,
  onPress,
  disabled = false,
}) => {
  return (
    <TouchableOpacity
      style={[styles.primaryButton, disabled && styles.primaryButtonDisabled]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={styles.primaryButtonText}>{title}</Text>
    </TouchableOpacity>
  );
};

// Google Sign In Button Component
interface GoogleButtonProps {
  title: string;
  onPress: () => void;
}

export const GoogleButton: React.FC<GoogleButtonProps> = ({ title, onPress }) => {
  return (
    <TouchableOpacity style={styles.googleButton} onPress={onPress}>
      <View style={styles.googleIconContainer}>
        <Svg width={18} height={18} viewBox="0 0 24 24">
          <Path
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            fill="#4285F4"
          />
          <Path
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            fill="#34A853"
          />
          <Path
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            fill="#FBBC05"
          />
          <Path
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            fill="#EA4335"
          />
        </Svg>
      </View>
      <Text style={styles.googleButtonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: '#FAFAFA',
    marginBottom: 16,
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  otpContainer: {
    marginBottom: 16,
  },
  otpDashContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    paddingVertical: 16,
    backgroundColor: '#FAFAFA',
  },
  otpDash: {
    marginHorizontal: 8,
  },
  otpDashText: {
    fontSize: 24,
    color: '#333',
    fontWeight: '300',
  },
  hiddenOTPInput: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0,
    fontSize: 16,
    textAlign: 'center',
  },
  primaryButton: {
    backgroundColor: '#1E88E5',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 24,
  },
  primaryButtonDisabled: {
    backgroundColor: '#B0BEC5',
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#FFFFFF',
  },
  googleIconContainer: {
    marginRight: 12,
  },
  googleButtonText: {
    color: '#333',
    fontSize: 16,
    fontWeight: '500',
  },
});
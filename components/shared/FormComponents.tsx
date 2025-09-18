import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Svg, { Path } from 'react-native-svg';

// Form Input Component
interface FormInputProps {
  label: string;
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  multiline?: boolean;
  numberOfLines?: number;
  style?: any;
}

export const FormInput: React.FC<FormInputProps> = ({
  label,
  placeholder,
  value,
  onChangeText,
  multiline = false,
  numberOfLines = 1,
  style,
}) => {
  return (
    <View style={[styles.inputContainer, style]}>
      <Text style={styles.inputLabel}>{label}</Text>
      <TextInput
        style={[
          styles.textInput,
          multiline && { height: numberOfLines * 24 + 32, textAlignVertical: 'top' }
        ]}
        placeholder={placeholder}
        placeholderTextColor="#999"
        value={value}
        onChangeText={onChangeText}
        multiline={multiline}
        numberOfLines={numberOfLines}
      />
    </View>
  );
};

// Dropdown Component
interface DropdownProps {
  label: string;
  placeholder: string;
  value: string;
  onPress: () => void;
  style?: any;
}

export const Dropdown: React.FC<DropdownProps> = ({
  label,
  placeholder,
  value,
  onPress,
  style,
}) => {
  return (
    <View style={[styles.inputContainer, style]}>
      <Text style={styles.inputLabel}>{label}</Text>
      <TouchableOpacity style={styles.dropdownContainer} onPress={onPress}>
        <Text style={[styles.dropdownText, !value && styles.placeholderText]}>
          {value || placeholder}
        </Text>
        <Svg width={16} height={16} viewBox="0 0 24 24" style={styles.dropdownIcon}>
          <Path d="M7 10l5 5 5-5z" fill="#999" />
        </Svg>
      </TouchableOpacity>
    </View>
  );
};

// Section Title Component
interface SectionTitleProps {
  title: string;
  style?: any;
}

export const SectionTitle: React.FC<SectionTitleProps> = ({ title, style }) => {
  return <Text style={[styles.sectionTitle, style]}>{title}</Text>;
};

// Location Button Component
interface LocationButtonProps {
  onPress: () => void;
  style?: any;
}

export const LocationButton: React.FC<LocationButtonProps> = ({ onPress, style }) => {
  return (
    <TouchableOpacity style={[styles.locationButton, style]} onPress={onPress}>
      <Svg width={20} height={20} viewBox="0 0 24 24" style={styles.locationIcon}>
        <Path 
          d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" 
          fill="#007AFF" 
        />
      </Svg>
      <Text style={styles.locationButtonText}>Use Current Location</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#2C2C2C',
    marginBottom: 8,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: '#2C2C2C',
    backgroundColor: '#FFFFFF',
    minHeight: 48,
  },
  dropdownContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: '#FFFFFF',
    minHeight: 48,
  },
  dropdownText: {
    fontSize: 16,
    color: '#2C2C2C',
    flex: 1,
  },
  placeholderText: {
    color: '#999',
  },
  dropdownIcon: {
    marginLeft: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#2C2C2C',
    marginBottom: 12,
    marginTop: 8,
  },
  locationButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    marginTop: 8,
  },
  locationIcon: {
    marginRight: 8,
  },
  locationButtonText: {
    fontSize: 16,
    color: '#007AFF',
    fontWeight: '500',
  },
});
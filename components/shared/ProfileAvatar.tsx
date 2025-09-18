import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import Svg, { Circle, Path, Defs, LinearGradient, Stop } from 'react-native-svg';

export interface ProfileAvatarProps {
  size?: number;
  backgroundColor?: string;
}

// Simple illustrated avatar placeholder
const IllustratedAvatar = ({ size = 120 }: { size?: number }) => (
  <Svg width={size} height={size} viewBox="0 0 120 120">
    <Defs>
      <LinearGradient id="skinGradient" x1="0%" y1="0%" x2="0%" y2="100%">
        <Stop offset="0%" stopColor="#F5C6A0" stopOpacity="1" />
        <Stop offset="100%" stopColor="#E8B496" stopOpacity="1" />
      </LinearGradient>
      <LinearGradient id="hairGradient" x1="0%" y1="0%" x2="0%" y2="100%">
        <Stop offset="0%" stopColor="#4A3C28" stopOpacity="1" />
        <Stop offset="100%" stopColor="#2D1B12" stopOpacity="1" />
      </LinearGradient>
    </Defs>
    
    {/* Background circle */}
    <Circle cx="60" cy="60" r="60" fill="#F5D5B8" />
    
    {/* Hair */}
    <Path 
      d="M20 45 C20 25, 40 15, 60 15 C80 15, 100 25, 100 45 C100 35, 105 50, 100 60 L95 55 C90 45, 85 40, 80 42 C75 35, 70 32, 60 32 C50 32, 45 35, 40 42 C35 40, 30 45, 25 55 L20 60 C15 50, 20 35, 20 45 Z" 
      fill="url(#hairGradient)" 
    />
    
    {/* Face */}
    <Circle cx="60" cy="55" r="25" fill="url(#skinGradient)" />
    
    {/* Eyes */}
    <Circle cx="52" cy="50" r="2" fill="#2C1810" />
    <Circle cx="68" cy="50" r="2" fill="#2C1810" />
    
    {/* Eyebrows */}
    <Path d="M48 46 Q52 44, 56 46" stroke="#3D2817" strokeWidth="1.5" fill="none" />
    <Path d="M64 46 Q68 44, 72 46" stroke="#3D2817" strokeWidth="1.5" fill="none" />
    
    {/* Nose */}
    <Path d="M58 54 L60 58 L62 54" stroke="#D4A574" strokeWidth="1" fill="none" />
    
    {/* Lips */}
    <Path d="M55 62 Q60 65, 65 62" stroke="#C4797A" strokeWidth="1.5" fill="none" />
    
    {/* Neck/Shoulders */}
    <Path 
      d="M45 75 Q60 85, 75 75 L75 120 L45 120 Z" 
      fill="url(#skinGradient)" 
    />
    
    {/* White top */}
    <Path 
      d="M48 78 Q60 88, 72 78 L72 120 L48 120 Z" 
      fill="#FFFFFF" 
    />
    
    {/* Hair sides */}
    <Path 
      d="M25 55 Q20 65, 25 75 C30 80, 35 78, 40 75 L35 65 Z" 
      fill="url(#hairGradient)" 
    />
    <Path 
      d="M95 55 Q100 65, 95 75 C90 80, 85 78, 80 75 L85 65 Z" 
      fill="url(#hairGradient)" 
    />
  </Svg>
);

export const ProfileAvatar: React.FC<ProfileAvatarProps> = ({ 
  size = 120, 
  backgroundColor = '#F5D5B8' 
}) => {
  return (
    <View style={[styles.container, { width: size, height: size, backgroundColor }]}>
      <IllustratedAvatar size={size} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 999,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
});

export default ProfileAvatar;
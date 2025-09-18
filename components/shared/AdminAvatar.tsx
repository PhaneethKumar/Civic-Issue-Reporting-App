import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Circle, Path, Defs, LinearGradient, Stop } from 'react-native-svg';

export interface AdminAvatarProps {
  size?: number;
  backgroundColor?: string;
}

// Male illustrated avatar for admin
const AdminIllustratedAvatar = ({ size = 120 }: { size?: number }) => (
  <Svg width={size} height={size} viewBox="0 0 120 120">
    <Defs>
      <LinearGradient id="skinGradient" x1="0%" y1="0%" x2="0%" y2="100%">
        <Stop offset="0%" stopColor="#F5C6A0" stopOpacity="1" />
        <Stop offset="100%" stopColor="#E8B496" stopOpacity="1" />
      </LinearGradient>
      <LinearGradient id="hairGradient" x1="0%" y1="0%" x2="0%" y2="100%">
        <Stop offset="0%" stopColor="#3D2817" stopOpacity="1" />
        <Stop offset="100%" stopColor="#2C1810" stopOpacity="1" />
      </LinearGradient>
      <LinearGradient id="beardGradient" x1="0%" y1="0%" x2="0%" y2="100%">
        <Stop offset="0%" stopColor="#4A3C28" stopOpacity="1" />
        <Stop offset="100%" stopColor="#3D2817" stopOpacity="1" />
      </LinearGradient>
    </Defs>
    
    {/* Background circle */}
    <Circle cx="60" cy="60" r="60" fill="#F5D5B8" />
    
    {/* Hair */}
    <Path 
      d="M25 40 C25 25, 35 15, 60 15 C85 15, 95 25, 95 40 C95 45, 90 50, 85 52 C80 48, 75 45, 70 44 C65 42, 55 42, 50 44 C45 45, 40 48, 35 52 C30 50, 25 45, 25 40 Z" 
      fill="url(#hairGradient)" 
    />
    
    {/* Curly hair texture */}
    <Circle cx="45" cy="30" r="4" fill="url(#hairGradient)" opacity="0.7" />
    <Circle cx="55" cy="25" r="3" fill="url(#hairGradient)" opacity="0.7" />
    <Circle cx="65" cy="25" r="3" fill="url(#hairGradient)" opacity="0.7" />
    <Circle cx="75" cy="30" r="4" fill="url(#hairGradient)" opacity="0.7" />
    
    {/* Face */}
    <Circle cx="60" cy="55" r="22" fill="url(#skinGradient)" />
    
    {/* Eyes */}
    <Circle cx="52" cy="50" r="2.5" fill="#2C1810" />
    <Circle cx="68" cy="50" r="2.5" fill="#2C1810" />
    
    {/* Eyebrows */}
    <Path d="M47 46 Q52 43, 57 46" stroke="#3D2817" strokeWidth="2" fill="none" />
    <Path d="M63 46 Q68 43, 73 46" stroke="#3D2817" strokeWidth="2" fill="none" />
    
    {/* Nose */}
    <Path d="M58 54 L60 59 L62 54" stroke="#D4A574" strokeWidth="1.5" fill="none" />
    
    {/* Mustache */}
    <Path 
      d="M52 61 C55 59, 58 59, 60 60 C62 59, 65 59, 68 61 C66 62, 64 62, 62 61.5 C60 62, 58 62, 56 61.5 C54 62, 52 62, 52 61 Z" 
      fill="url(#beardGradient)" 
    />
    
    {/* Mouth */}
    <Path d="M55 64 Q60 66, 65 64" stroke="#C4797A" strokeWidth="1.5" fill="none" />
    
    {/* Beard */}
    <Path 
      d="M45 65 C45 70, 48 75, 52 78 C55 80, 58 81, 60 81 C62 81, 65 80, 68 78 C72 75, 75 70, 75 65 C73 66, 70 67, 67 67 C64 67, 60 66, 60 66 C60 66, 56 67, 53 67 C50 67, 47 66, 45 65 Z" 
      fill="url(#beardGradient)" 
    />
    
    {/* Neck/Shoulders */}
    <Path 
      d="M45 75 Q60 85, 75 75 L75 120 L45 120 Z" 
      fill="url(#skinGradient)" 
    />
    
    {/* Beige shirt */}
    <Path 
      d="M48 78 Q60 88, 72 78 L72 120 L48 120 Z" 
      fill="#F0E6D2" 
    />
    
    {/* Shirt collar */}
    <Path 
      d="M52 78 L60 85 L68 78 L68 82 L60 88 L52 82 Z" 
      fill="#E8DCC0" 
    />
  </Svg>
);

export const AdminAvatar: React.FC<AdminAvatarProps> = ({ 
  size = 120, 
  backgroundColor = '#F5D5B8' 
}) => {
  return (
    <View style={[styles.container, { width: size, height: size, backgroundColor }]}>
      <AdminIllustratedAvatar size={size} />
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

export default AdminAvatar;
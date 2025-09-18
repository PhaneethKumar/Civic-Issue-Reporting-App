import React from 'react';
import { View } from 'react-native';
import Svg, { Rect, Circle, Ellipse, Path } from 'react-native-svg';

interface CitySkylineIllustrationProps {
  width?: number;
  height?: number;
}

export const CitySkylineIllustration: React.FC<CitySkylineIllustrationProps> = ({ 
  width = 300, 
  height = 200 
}) => {
  return (
    <View style={{ alignItems: 'center' }}>
      <Svg width={width} height={height} viewBox="0 0 300 200">
        {/* Sky background */}
        <Rect width="300" height="200" fill="#A8D5D5" />
        
        {/* Clouds */}
        <Ellipse cx="50" cy="30" rx="15" ry="8" fill="white" opacity="0.8" />
        <Ellipse cx="200" cy="25" rx="20" ry="10" fill="white" opacity="0.8" />
        <Ellipse cx="280" cy="35" rx="12" ry="6" fill="white" opacity="0.8" />
        
        {/* Buildings */}
        <Rect x="20" y="120" width="40" height="80" fill="#2C5F5F" />
        <Rect x="70" y="100" width="35" height="100" fill="#4A7A7A" />
        <Rect x="110" y="80" width="45" height="120" fill="#2C5F5F" />
        <Rect x="160" y="90" width="50" height="110" fill="#4A7A7A" />
        <Rect x="220" y="110" width="40" height="90" fill="#2C5F5F" />
        <Rect x="265" y="130" width="30" height="70" fill="#4A7A7A" />
        
        {/* Building windows */}
        <Rect x="25" y="130" width="6" height="8" fill="#87B8B8" />
        <Rect x="35" y="130" width="6" height="8" fill="#87B8B8" />
        <Rect x="48" y="130" width="6" height="8" fill="#87B8B8" />
        <Rect x="75" y="110" width="6" height="8" fill="#87B8B8" />
        <Rect x="85" y="110" width="6" height="8" fill="#87B8B8" />
        <Rect x="95" y="110" width="6" height="8" fill="#87B8B8" />
        
        {/* Trees at bottom */}
        <Circle cx="40" cy="180" r="12" fill="#4A7B4A" />
        <Rect x="38" y="180" width="4" height="20" fill="#8B4513" />
        <Circle cx="120" cy="185" r="10" fill="#4A7B4A" />
        <Rect x="118" y="185" width="4" height="15" fill="#8B4513" />
        <Circle cx="200" cy="180" r="12" fill="#4A7B4A" />
        <Rect x="198" y="180" width="4" height="20" fill="#8B4513" />
        <Circle cx="260" cy="185" r="10" fill="#4A7B4A" />
        <Rect x="258" y="185" width="4" height="15" fill="#8B4513" />
        
        {/* Ground/street */}
        <Rect x="0" y="190" width="300" height="10" fill="#5A8A8A" />
      </Svg>
    </View>
  );
};
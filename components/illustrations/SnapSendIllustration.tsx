import React from 'react';
import { View } from 'react-native';
import Svg, { Rect, Circle, Ellipse, Path, Line } from 'react-native-svg';

interface SnapSendIllustrationProps {
  width?: number;
  height?: number;
}

export const SnapSendIllustration: React.FC<SnapSendIllustrationProps> = ({ 
  width = 300, 
  height = 200 
}) => {
  return (
    <View style={{ alignItems: 'center' }}>
      <Svg width={width} height={height} viewBox="0 0 300 200">
        {/* Background */}
        <Rect width="300" height="200" fill="#F5F5F5" />
        
        {/* Hand holding phone */}
        <Ellipse cx="150" cy="160" rx="80" ry="30" fill="#F4C2A1" />
        
        {/* Phone */}
        <Rect x="120" y="80" width="60" height="100" rx="10" fill="#2C2C2C" />
        <Rect x="125" y="85" width="50" height="80" rx="5" fill="#87B8B8" />
        
        {/* Phone camera viewfinder */}
        <Rect x="130" y="90" width="40" height="30" fill="#A8D5D5" />
        
        {/* Broken streetlight illustration on phone screen */}
        <Line x1="135" y1="95" x2="165" y2="115" stroke="#333" strokeWidth="2" />
        <Circle cx="150" cy="95" r="3" fill="#FFD700" />
        <Rect x="148" y="98" width="4" height="15" fill="#666" />
        
        {/* Camera flash effect */}
        <Circle cx="150" cy="100" r="25" fill="white" opacity="0.3" />
        <Circle cx="150" cy="100" r="15" fill="white" opacity="0.2" />
        
        {/* Camera button */}
        <Circle cx="150" cy="170" r="6" fill="#E0E0E0" />
        
        {/* Location pin above phone */}
        <Path d="M150 50 L155 40 L150 35 L145 40 Z" fill="#FF4444" />
        <Circle cx="150" cy="40" r="5" fill="#FF4444" />
        <Circle cx="150" cy="40" r="2" fill="white" />
        
        {/* Dotted line from pin to phone */}
        <Line x1="150" y1="45" x2="150" y2="75" stroke="#666" strokeWidth="1" strokeDasharray="3,3" />
        
        {/* WiFi/signal indicators */}
        <Path d="M130 45 L135 40 L125 40 Z" fill="#4CAF50" />
        <Path d="M170 45 L175 40 L165 40 Z" fill="#4CAF50" />
      </Svg>
    </View>
  );
};
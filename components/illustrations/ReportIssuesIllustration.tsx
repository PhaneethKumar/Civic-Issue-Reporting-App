import React from 'react';
import { View } from 'react-native';
import Svg, { Rect, Circle, Ellipse, Path, Line } from 'react-native-svg';

interface ReportIssuesIllustrationProps {
  width?: number;
  height?: number;
}

export const ReportIssuesIllustration: React.FC<ReportIssuesIllustrationProps> = ({ 
  width = 300, 
  height = 200 
}) => {
  return (
    <View style={{ alignItems: 'center' }}>
      <Svg width={width} height={height} viewBox="0 0 300 200">
        {/* Background with circular frame */}
        <Rect width="300" height="200" fill="#7AB8A3" />
        <Circle cx="150" cy="100" r="90" fill="#F5F5DC" />
        
        {/* Hand holding phone */}
        <Ellipse cx="180" cy="130" rx="40" ry="20" fill="#F4C2A1" />
        
        {/* Phone */}
        <Rect x="160" y="90" width="40" height="65" rx="8" fill="#2C2C2C" />
        <Rect x="163" y="93" width="34" height="52" rx="4" fill="#87B8B8" />
        
        {/* Phone screen showing map/location */}
        <Rect x="165" y="95" width="30" height="20" fill="#A8D5D5" />
        <Circle cx="180" cy="105" r="3" fill="#FF4444" />
        <Line x1="175" y1="100" x2="185" y2="110" stroke="#666" strokeWidth="1" />
        
        {/* Streetlight in the scene */}
        <Rect x="100" y="80" width="4" height="60" fill="#666" />
        <Circle cx="102" cy="75" r="6" fill="#FFD700" />
        <Line x1="96" y1="82" x2="108" y2="82" stroke="#666" strokeWidth="2" />
        
        {/* Broken/cracked effect on streetlight */}
        <Path d="M98 78 L106 85" stroke="#FF4444" strokeWidth="2" />
        <Path d="M106 78 L98 85" stroke="#FF4444" strokeWidth="2" />
        
        {/* Pothole */}
        <Ellipse cx="130" cy="145" rx="15" ry="8" fill="#444" />
        <Ellipse cx="130" cy="145" rx="12" ry="6" fill="#222" />
        
        {/* Graffiti mark */}
        <Path d="M220 120 Q225 115 230 120 Q235 125 230 130 Q225 135 220 130 Q215 125 220 120" fill="#FF6B6B" />
        
        {/* Decorative plants/leaves around the circle */}
        <Path d="M60 80 Q65 70 70 80 Q75 90 70 100 Q65 110 60 100 Q55 90 60 80" fill="#4A7B4A" />
        <Path d="M240 120 Q245 110 250 120 Q255 130 250 140 Q245 150 240 140 Q235 130 240 120" fill="#4A7B4A" />
        <Path d="M80 160 Q85 150 90 160 Q95 170 90 180 Q85 190 80 180 Q75 170 80 160" fill="#4A7B4A" />
        
        {/* Location pin indicator */}
        <Circle cx="180" cy="105" r="8" fill="rgba(255, 68, 68, 0.3)" />
      </Svg>
    </View>
  );
};
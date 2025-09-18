import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';

interface CustomMarkerProps {
  type: 'pothole' | 'graffiti' | 'streetlight' | 'parking' | 'noise' | 'default';
  isSelected?: boolean;
}

export const CustomMarker: React.FC<CustomMarkerProps> = ({ type, isSelected = false }) => {
  const getMarkerColor = (markerType: string) => {
    switch (markerType) {
      case 'pothole':
        return '#FF9500'; // Orange
      case 'graffiti':
        return '#FF3B30'; // Red
      case 'streetlight':
        return '#FFCC00'; // Yellow
      case 'parking':
        return '#007AFF'; // Blue
      case 'noise':
        return '#AF52DE'; // Purple
      default:
        return '#34C759'; // Green
    }
  };

  const getIcon = (markerType: string) => {
    switch (markerType) {
      case 'pothole':
        return (
          <Path
            d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
            fill="#FFFFFF"
            scale={0.6}
          />
        );
      case 'graffiti':
        return (
          <Path
            d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
            fill="#FFFFFF"
            scale={0.5}
          />
        );
      case 'streetlight':
        return (
          <Path
            d="M9 21c0 .5.4 1 1 1h4c.6 0 1-.5 1-1v-1H9v1zm3-19C8.1 2 5 5.1 5 9c0 2.4 1.2 4.5 3 5.7V17c0 .5.4 1 1 1h6c.6 0 1-.5 1-1v-2.3c1.8-1.2 3-3.3 3-5.7 0-3.9-3.1-7-7-7z"
            fill="#FFFFFF"
            scale={0.5}
          />
        );
      case 'parking':
        return (
          <Path
            d="M13 3H6v18h4v-6h3c3.31 0 6-2.69 6-6s-2.69-6-6-6zm-1 8h-2V7h2c1.1 0 2 .9 2 2s-.9 2-2 2z"
            fill="#FFFFFF"
            scale={0.6}
          />
        );
      case 'noise':
        return (
          <Path
            d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"
            fill="#FFFFFF"
            scale={0.5}
          />
        );
      default:
        return (
          <Circle
            cx="12"
            cy="12"
            r="4"
            fill="#FFFFFF"
          />
        );
    }
  };

  const markerColor = getMarkerColor(type);
  const size = isSelected ? 44 : 36;

  return (
    <View style={[styles.markerContainer, { width: size, height: size }]}>
      <View
        style={[
          styles.marker,
          {
            backgroundColor: markerColor,
            width: size,
            height: size,
            borderRadius: size / 2,
          },
          isSelected && styles.selectedMarker,
        ]}
      >
        <Svg width={24} height={24} viewBox="0 0 24 24">
          {getIcon(type)}
        </Svg>
      </View>
      {/* Drop shadow */}
      <View style={[styles.shadow, { width: size * 0.8, height: size * 0.3 }]} />
    </View>
  );
};

interface MapMarkerProps {
  coordinate: {
    latitude: number;
    longitude: number;
  };
  type: 'pothole' | 'graffiti' | 'streetlight' | 'parking' | 'noise' | 'default';
  isSelected?: boolean;
  onPress?: () => void;
}

export const MapMarker: React.FC<MapMarkerProps> = ({
  coordinate,
  type,
  isSelected = false,
  onPress,
}) => {
  return (
    <CustomMarker type={type} isSelected={isSelected} />
  );
};

const styles = StyleSheet.create({
  markerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  marker: {
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    borderWidth: 3,
    borderColor: '#FFFFFF',
  },
  selectedMarker: {
    elevation: 8,
    shadowOpacity: 0.35,
    shadowRadius: 6,
    transform: [{ scale: 1.1 }],
  },
  shadow: {
    position: 'absolute',
    bottom: -2,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    borderRadius: 100,
    zIndex: -1,
  },
});
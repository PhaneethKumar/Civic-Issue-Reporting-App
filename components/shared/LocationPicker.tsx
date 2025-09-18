import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Svg, { Path } from 'react-native-svg';

// Location Interface
export interface LocationData {
  latitude: number;
  longitude: number;
  address?: string;
}

// Map Component Props
interface LocationPickerProps {
  location: LocationData | null;
  onLocationSelect: (location: LocationData) => void;
  onUseCurrentLocation: () => void;
  height?: number;
}

export const LocationPicker: React.FC<LocationPickerProps> = ({
  location,
  onLocationSelect,
  onUseCurrentLocation,
  height = 200,
}) => {
  const defaultRegion = {
    latitude: 37.7749, // San Francisco default
    longitude: -122.4194,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  };

  const currentRegion = location
    ? {
        latitude: location.latitude,
        longitude: location.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      }
    : defaultRegion;

  const handleMapPress = (event: any) => {
    const { coordinate } = event.nativeEvent;
    onLocationSelect({
      latitude: coordinate.latitude,
      longitude: coordinate.longitude,
    });
  };

  const handleUseCurrentLocation = () => {
    Alert.alert(
      'Location Access',
      'This app would like to access your location to auto-fill the report location.',
      [
        { text: 'Allow', onPress: onUseCurrentLocation },
        { text: 'Cancel', style: 'cancel' },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <View style={[styles.mapContainer, { height }]}>
        <MapView
          style={styles.map}
          initialRegion={defaultRegion}
          region={currentRegion}
          onPress={handleMapPress}
          showsUserLocation={true}
          showsMyLocationButton={false}
        >
          {location && (
            <Marker
              coordinate={{
                latitude: location.latitude,
                longitude: location.longitude,
              }}
              title="Report Location"
              description="Issue will be reported at this location"
            />
          )}
        </MapView>
        
        {/* Location Pin Overlay */}
        <View style={styles.centerPin}>
          <Svg width={32} height={32} viewBox="0 0 24 24">
            <Path 
              d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" 
              fill="#FF3B30" 
            />
          </Svg>
        </View>
      </View>

      {/* Use Current Location Button */}
      <TouchableOpacity style={styles.locationButton} onPress={handleUseCurrentLocation}>
        <Svg width={20} height={20} viewBox="0 0 24 24" style={styles.locationIcon}>
          <Path 
            d="M12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm8.94 3A8.994 8.994 0 0013 3.06V1h-2v2.06A8.994 8.994 0 003.06 11H1v2h2.06A8.994 8.994 0 0011 20.94V23h2v-2.06A8.994 8.994 0 0020.94 13H23v-2h-2.06zM12 19c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7z" 
            fill="#007AFF" 
          />
        </Svg>
        <Text style={styles.locationButtonText}>Use Current Location</Text>
      </TouchableOpacity>

      {/* Location Info */}
      {location && (
        <View style={styles.locationInfo}>
          <Text style={styles.locationText}>
            Selected: {location.address || `${location.latitude.toFixed(6)}, ${location.longitude.toFixed(6)}`}
          </Text>
        </View>
      )}
    </View>
  );
};

// Simple Map Preview Component
export const MapPreview: React.FC<{location: LocationData}> = ({ location }) => (
  <View style={styles.mapPreviewContainer}>
    <MapView
      style={styles.mapPreview}
      region={{
        latitude: location.latitude,
        longitude: location.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      }}
      scrollEnabled={false}
      zoomEnabled={false}
      rotateEnabled={false}
      pitchEnabled={false}
    >
      <Marker
        coordinate={{
          latitude: location.latitude,
          longitude: location.longitude,
        }}
        title="Report Location"
      />
    </MapView>
  </View>
);

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  mapContainer: {
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    position: 'relative',
  },
  map: {
    flex: 1,
  },
  centerPin: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginLeft: -16,
    marginTop: -32,
    zIndex: 1,
  },
  locationButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    marginTop: 12,
  },
  locationIcon: {
    marginRight: 8,
  },
  locationButtonText: {
    fontSize: 16,
    color: '#007AFF',
    fontWeight: '500',
  },
  locationInfo: {
    marginTop: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#F8F9FA',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  locationText: {
    fontSize: 14,
    color: '#666',
  },
  mapPreviewContainer: {
    height: 150,
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  mapPreview: {
    flex: 1,
  },
});
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as MediaLibrary from 'expo-media-library';
import Svg, { Path } from 'react-native-svg';
import LocationService, { LocationData } from '../../services/LocationService';

// Enhanced Photo Item Interface with automatic location
export interface PhotoItemWithLocation {
  id: string;
  uri: string;
  type?: string;
  location?: LocationData;
  hasAutoLocation?: boolean;
  timestamp?: number;
}

// Enhanced Photo Picker Component Props
interface AutoLocationPhotoPickerProps {
  photos: PhotoItemWithLocation[];
  onAddPhoto: (photo: PhotoItemWithLocation) => void;
  onRemovePhoto: (photoId: string) => void;
  maxPhotos?: number;
  autoLocationEnabled?: boolean;
}

export const AutoLocationPhotoPicker: React.FC<AutoLocationPhotoPickerProps> = ({
  photos,
  onAddPhoto,
  onRemovePhoto,
  maxPhotos = 3,
  autoLocationEnabled = true,
}) => {
  const [isCapturingPhoto, setIsCapturingPhoto] = useState(false);
  const [locationService] = useState(() => LocationService.getInstance());

  useEffect(() => {
    // Start watching location when component mounts (if auto location is enabled)
    if (autoLocationEnabled) {
      locationService.startWatchingLocation();
    }

    // Cleanup on unmount
    return () => {
      if (autoLocationEnabled) {
        locationService.stopWatchingLocation();
      }
    };
  }, [autoLocationEnabled, locationService]);

  const showAddButton = photos.length < maxPhotos;

  const handleAddPhoto = () => {
    Alert.alert(
      'Add Photo with Location',
      'Choose how you want to add a photo. Location will be automatically tagged if enabled.',
      [
        { text: 'Camera', onPress: () => takePhotoWithCamera() },
        { text: 'Gallery', onPress: () => selectPhotoFromGallery() },
        { text: 'Cancel', style: 'cancel' },
      ]
    );
  };

  const takePhotoWithCamera = async () => {
    try {
      setIsCapturingPhoto(true);

      // Request camera permissions
      const { status: cameraStatus } = await ImagePicker.requestCameraPermissionsAsync();
      if (cameraStatus !== 'granted') {
        Alert.alert('Permission Denied', 'Camera access is required to take photos.');
        return;
      }

      // Get current location if auto location is enabled
      let currentLocation: LocationData | null = null;
      if (autoLocationEnabled) {
        currentLocation = await locationService.getLocationForPhoto();
      }

      // Take photo
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
        exif: true, // Include EXIF data
      });

      if (!result.canceled && result.assets[0]) {
        const asset = result.assets[0];
        
        // Try to extract location from EXIF data if auto location failed
        let photoLocation = currentLocation;
        if (!photoLocation && asset.exif) {
          photoLocation = extractLocationFromExif(asset.exif);
        }

        const newPhoto: PhotoItemWithLocation = {
          id: Date.now().toString(),
          uri: asset.uri,
          type: 'camera',
          location: photoLocation,
          hasAutoLocation: !!photoLocation,
          timestamp: Date.now(),
        };

        onAddPhoto(newPhoto);

        // Show location confirmation if location was captured
        if (photoLocation) {
          const locationText = LocationService.formatLocationForDisplay(photoLocation);
          Alert.alert(
            'Photo Captured with Location',
            `📍 Location: ${locationText}`,
            [{ text: 'OK' }]
          );
        }
      }
    } catch (error) {
      console.error('Error taking photo:', error);
      Alert.alert('Error', 'Failed to take photo. Please try again.');
    } finally {
      setIsCapturingPhoto(false);
    }
  };

  const selectPhotoFromGallery = async () => {
    try {
      setIsCapturingPhoto(true);

      // Request gallery permissions
      const { status: galleryStatus } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (galleryStatus !== 'granted') {
        Alert.alert('Permission Denied', 'Gallery access is required to select photos.');
        return;
      }

      // Get current location if auto location is enabled
      let currentLocation: LocationData | null = null;
      if (autoLocationEnabled) {
        currentLocation = await locationService.getLocationForPhoto();
      }

      // Select photo
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
        exif: true, // Include EXIF data
      });

      if (!result.canceled && result.assets[0]) {
        const asset = result.assets[0];
        
        // Try to extract location from EXIF data first, then fallback to current location
        let photoLocation = extractLocationFromExif(asset.exif);
        
        if (!photoLocation && autoLocationEnabled) {
          photoLocation = currentLocation;
        }

        const newPhoto: PhotoItemWithLocation = {
          id: Date.now().toString(),
          uri: asset.uri,
          type: 'gallery',
          location: photoLocation,
          hasAutoLocation: !!photoLocation,
          timestamp: Date.now(),
        };

        onAddPhoto(newPhoto);

        // Show location confirmation
        if (photoLocation) {
          const locationText = LocationService.formatLocationForDisplay(photoLocation);
          const source = asset.exif && hasExifLocation(asset.exif) ? 'photo metadata' : 'current location';
          Alert.alert(
            'Photo Selected with Location',
            `📍 Location: ${locationText}\n(from ${source})`,
            [{ text: 'OK' }]
          );
        } else if (autoLocationEnabled) {
          Alert.alert(
            'No Location Data',
            'This photo doesn\'t contain location information and current location is unavailable.',
            [{ text: 'OK' }]
          );
        }
      }
    } catch (error) {
      console.error('Error selecting photo:', error);
      Alert.alert('Error', 'Failed to select photo. Please try again.');
    } finally {
      setIsCapturingPhoto(false);
    }
  };

  // Extract location from EXIF data
  const extractLocationFromExif = (exif: any): LocationData | null => {
    if (!exif || !hasExifLocation(exif)) {
      return null;
    }

    try {
      return {
        latitude: exif.GPSLatitude,
        longitude: exif.GPSLongitude,
        timestamp: Date.now(),
      };
    } catch (error) {
      console.warn('Error extracting location from EXIF:', error);
      return null;
    }
  };

  // Check if EXIF data contains location information
  const hasExifLocation = (exif: any): boolean => {
    return exif && 
           typeof exif.GPSLatitude === 'number' && 
           typeof exif.GPSLongitude === 'number' &&
           !isNaN(exif.GPSLatitude) && 
           !isNaN(exif.GPSLongitude);
  };

  const renderPhotoItem = (photo: PhotoItemWithLocation, index: number) => (
    <View key={photo.id} style={styles.photoContainer}>
      <Image source={{ uri: photo.uri }} style={styles.photoImage} />
      
      {/* Location indicator */}
      {photo.hasAutoLocation && (
        <View style={styles.locationIndicator}>
          <Svg width={16} height={16} viewBox="0 0 24 24">
            <Path 
              d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"
              fill="#4CAF50" 
            />
          </Svg>
        </View>
      )}
      
      {/* Remove button */}
      <TouchableOpacity
        style={styles.removeButton}
        onPress={() => onRemovePhoto(photo.id)}
      >
        <Svg width={16} height={16} viewBox="0 0 24 24">
          <Path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" fill="#FFF" />
        </Svg>
      </TouchableOpacity>
    </View>
  );

  const renderAddButton = () => (
    <TouchableOpacity 
      style={[styles.addPhotoButton, isCapturingPhoto && styles.addPhotoButtonDisabled]} 
      onPress={handleAddPhoto}
      disabled={isCapturingPhoto}
    >
      {isCapturingPhoto ? (
        <ActivityIndicator size="small" color="#999" />
      ) : (
        <>
          <Svg width={32} height={32} viewBox="0 0 24 24" style={styles.addIcon}>
            <Path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z" fill="#999" />
          </Svg>
          <Text style={styles.addPhotoText}>Add Photo</Text>
          {autoLocationEnabled && (
            <Text style={styles.locationEnabledText}>📍 Auto Location</Text>
          )}
        </>
      )}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.photosGrid}>
        {photos.map((photo, index) => renderPhotoItem(photo, index))}
        {showAddButton && renderAddButton()}
      </View>
      
      {/* Location status */}
      {autoLocationEnabled && (
        <View style={styles.locationStatus}>
          <Svg width={16} height={16} viewBox="0 0 24 24" style={styles.locationStatusIcon}>
            <Path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" fill="#4CAF50" />
          </Svg>
          <Text style={styles.locationStatusText}>
            Automatic location tagging is enabled
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  photosGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  photoContainer: {
    position: 'relative',
    width: 100,
    height: 100,
    borderRadius: 12,
    overflow: 'hidden',
  },
  photoImage: {
    width: '100%',
    height: '100%',
    borderRadius: 12,
  },
  locationIndicator: {
    position: 'absolute',
    bottom: 4,
    left: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 10,
    padding: 2,
  },
  removeButton: {
    position: 'absolute',
    top: 4,
    right: 4,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addPhotoButton: {
    width: 100,
    height: 100,
    borderWidth: 2,
    borderColor: '#E0E0E0',
    borderStyle: 'dashed',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
  },
  addPhotoButtonDisabled: {
    opacity: 0.6,
  },
  addIcon: {
    marginBottom: 4,
  },
  addPhotoText: {
    fontSize: 12,
    color: '#999',
    textAlign: 'center',
    marginBottom: 2,
  },
  locationEnabledText: {
    fontSize: 10,
    color: '#4CAF50',
    textAlign: 'center',
    fontWeight: '500',
  },
  locationStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    paddingHorizontal: 8,
    paddingVertical: 6,
    backgroundColor: '#F0F8F0',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E0F0E0',
  },
  locationStatusIcon: {
    marginRight: 6,
  },
  locationStatusText: {
    fontSize: 12,
    color: '#4CAF50',
    flex: 1,
  },
});

export default AutoLocationPhotoPicker;
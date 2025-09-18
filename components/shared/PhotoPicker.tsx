import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Alert } from 'react-native';
import Svg, { Path } from 'react-native-svg';

// Photo Item Interface
export interface PhotoItem {
  id: string;
  uri: string;
  type?: string;
  location?: {
    latitude: number;
    longitude: number;
    address?: string;
    timestamp?: number;
  };
  hasAutoLocation?: boolean;
}

// Photo Picker Component Props
interface PhotoPickerProps {
  photos: PhotoItem[];
  onAddPhoto: () => void;
  onRemovePhoto: (photoId: string) => void;
  maxPhotos?: number;
}

export const PhotoPicker: React.FC<PhotoPickerProps> = ({
  photos,
  onAddPhoto,
  onRemovePhoto,
  maxPhotos = 3,
}) => {
  const showAddButton = photos.length < maxPhotos;

  const handleAddPhoto = () => {
    Alert.alert(
      'Add Photo',
      'Choose how you want to add a photo',
      [
        { text: 'Camera', onPress: () => onAddPhoto() },
        { text: 'Gallery', onPress: () => onAddPhoto() },
        { text: 'Cancel', style: 'cancel' },
      ]
    );
  };

  const renderPhotoItem = (photo: PhotoItem, index: number) => (
    <View key={photo.id} style={styles.photoContainer}>
      <Image source={{ uri: photo.uri }} style={styles.photoImage} />
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
    <TouchableOpacity style={styles.addPhotoButton} onPress={handleAddPhoto}>
      <Svg width={32} height={32} viewBox="0 0 24 24" style={styles.addIcon}>
        <Path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z" fill="#999" />
      </Svg>
      <Text style={styles.addPhotoText}>Add Photo</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.photosGrid}>
        {photos.map((photo, index) => renderPhotoItem(photo, index))}
        {showAddButton && renderAddButton()}
      </View>
    </View>
  );
};

// Camera Placeholder Component (for when no actual photos are added)
export const CameraPlaceholder: React.FC<{ onPress: () => void }> = ({ onPress }) => (
  <TouchableOpacity style={styles.cameraPlaceholder} onPress={onPress}>
    <Svg width={48} height={48} viewBox="0 0 24 24">
      <Path 
        d="M12 15.5c1.38 0 2.5-1.12 2.5-2.5s-1.12-2.5-2.5-2.5-2.5 1.12-2.5 2.5 1.12 2.5 2.5 2.5zM9 2L7.17 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2h-3.17L15 2H9zm3 15c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z" 
        fill="#B0B0B0" 
      />
    </Svg>
  </TouchableOpacity>
);

// Gallery Placeholder Component
export const GalleryPlaceholder: React.FC<{ onPress: () => void }> = ({ onPress }) => (
  <TouchableOpacity style={styles.galleryPlaceholder} onPress={onPress}>
    <Svg width={48} height={48} viewBox="0 0 24 24">
      <Path 
        d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" 
        fill="#FFF" 
      />
    </Svg>
    <Text style={styles.placeholderText}>Manual for Dashboard Elements</Text>
  </TouchableOpacity>
);

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
  addIcon: {
    marginBottom: 4,
  },
  addPhotoText: {
    fontSize: 12,
    color: '#999',
    textAlign: 'center',
  },
  cameraPlaceholder: {
    width: 100,
    height: 100,
    backgroundColor: '#A8D5A8',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  galleryPlaceholder: {
    width: 100,
    height: 100,
    backgroundColor: '#4A6741',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  placeholderText: {
    fontSize: 10,
    color: '#FFF',
    textAlign: 'center',
    marginTop: 4,
    fontWeight: '500',
  },
});
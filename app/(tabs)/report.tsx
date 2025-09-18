import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  Platform,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Path } from 'react-native-svg';
import { FormInput, Dropdown, SectionTitle } from '../../components/shared/FormComponents';
import { PhotoPicker, PhotoItem, CameraPlaceholder, GalleryPlaceholder } from '../../components/shared/PhotoPicker';
import { LocationPicker, LocationData, MapPreview } from '../../components/shared/LocationPicker';

// Category options
const categories = [
  'Roads & Streets',
  'Public Lighting',
  'Water & Drainage',
  'Parks & Recreation',
  'Public Safety',
  'Waste Management',
  'Public Transportation',
  'Other',
];

interface ReportForm {
  title: string;
  category: string;
  description: string;
  photos: PhotoItem[];
  location: LocationData | null;
  anonymous: boolean;
}

export default function ReportScreen() {
  const [form, setForm] = useState<ReportForm>({
    title: '',
    category: '',
    description: '',
    photos: [],
    location: null,
    anonymous: false,
  });

  const [showLocationPicker, setShowLocationPicker] = useState(false);
  const [showCategoryModal, setShowCategoryModal] = useState(false);

  // Form handlers
  const handleTitleChange = (title: string) => {
    setForm(prev => ({ ...prev, title }));
  };

  const handleCategorySelect = () => {
    Alert.alert(
      'Select Category',
      'Choose the category that best describes your issue',
      categories.map(category => ({
        text: category,
        onPress: () => setForm(prev => ({ ...prev, category })),
      })).concat([{ text: 'Cancel', style: 'cancel' }])
    );
  };

  const handleDescriptionChange = (description: string) => {
    setForm(prev => ({ ...prev, description }));
  };

  const handleAddPhoto = () => {
    // Simulate adding a photo (in real app, would use image picker)
    const newPhoto: PhotoItem = {
      id: Date.now().toString(),
      uri: `https://picsum.photos/300/300?random=${Date.now()}`,
    };
    setForm(prev => ({
      ...prev,
      photos: [...prev.photos, newPhoto],
    }));
  };

  const handleRemovePhoto = (photoId: string) => {
    setForm(prev => ({
      ...prev,
      photos: prev.photos.filter(photo => photo.id !== photoId),
    }));
  };

  const handleLocationSelect = (location: LocationData) => {
    setForm(prev => ({ ...prev, location }));
  };

  const handleUseCurrentLocation = () => {
    // Simulate getting current location (San Francisco)
    const currentLocation: LocationData = {
      latitude: 37.7749,
      longitude: -122.4194,
      address: 'San Francisco, CA',
    };
    setForm(prev => ({ ...prev, location: currentLocation }));
  };

  const handleAnonymousToggle = (anonymous: boolean) => {
    setForm(prev => ({ ...prev, anonymous }));
  };

  const handleSaveDraft = () => {
    Alert.alert('Draft Saved', 'Your report has been saved as a draft.');
  };

  const handleSubmitReport = () => {
    if (!form.title.trim()) {
      Alert.alert('Error', 'Please enter a title for your report.');
      return;
    }
    if (!form.category) {
      Alert.alert('Error', 'Please select a category for your report.');
      return;
    }
    if (!form.description.trim()) {
      Alert.alert('Error', 'Please enter a description for your report.');
      return;
    }

    Alert.alert(
      'Report Submitted',
      'Thank you! Your report has been submitted successfully.',
      [{ text: 'OK', onPress: () => {
        // Reset form
        setForm({
          title: '',
          category: '',
          description: '',
          photos: [],
          location: null,
          anonymous: false,
        });
      }}]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <Svg width={24} height={24} viewBox="0 0 24 24">
            <Path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.42-1.41L7.83 13H20v-2z" fill="#2C2C2C" />
          </Svg>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Report an Issue</Text>
        <TouchableOpacity style={styles.saveDraftButton} onPress={handleSaveDraft}>
          <Text style={styles.saveDraftText}>Save Draft</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.form}>
          {/* Title Input */}
          <FormInput
            label="Title"
            placeholder="e.g. Pothole on Main Street"
            value={form.title}
            onChangeText={handleTitleChange}
          />

          {/* Category Dropdown */}
          <Dropdown
            label="Category"
            placeholder="Select a category"
            value={form.category}
            onPress={handleCategorySelect}
          />

          {/* Description Input */}
          <FormInput
            label="Description"
            placeholder="Tell us more about the issue..."
            value={form.description}
            onChangeText={handleDescriptionChange}
            multiline={true}
            numberOfLines={6}
          />

          {/* Add Photos Section */}
          <SectionTitle title="Add Photos" />
          <View style={styles.photosSection}>
            <View style={styles.photosRow}>
              <CameraPlaceholder onPress={handleAddPhoto} />
              <GalleryPlaceholder onPress={handleAddPhoto} />
              <PhotoPicker
                photos={form.photos}
                onAddPhoto={handleAddPhoto}
                onRemovePhoto={handleRemovePhoto}
                maxPhotos={1}
              />
            </View>
          </View>

          {/* Location Section */}
          <SectionTitle title="Location" />
          {form.location ? (
            <View>
              <MapPreview location={form.location} />
              <TouchableOpacity style={styles.locationButton} onPress={handleUseCurrentLocation}>
                <Svg width={20} height={20} viewBox="0 0 24 24" style={styles.locationIcon}>
                  <Path 
                    d="M12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm8.94 3A8.994 8.994 0 0013 3.06V1h-2v2.06A8.994 8.994 0 003.06 11H1v2h2.06A8.994 8.994 0 0011 20.94V23h2v-2.06A8.994 8.994 0 0020.94 13H23v-2h-2.06zM12 19c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7z" 
                    fill="#007AFF" 
                  />
                </Svg>
                <Text style={styles.locationButtonText}>Use Current Location</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <LocationPicker
              location={form.location}
              onLocationSelect={handleLocationSelect}
              onUseCurrentLocation={handleUseCurrentLocation}
              height={180}
            />
          )}

          {/* Anonymous Reporting Toggle */}
          <View style={styles.anonymousSection}>
            <Text style={styles.anonymousLabel}>Report Anonymously</Text>
            <Switch
              value={form.anonymous}
              onValueChange={handleAnonymousToggle}
              trackColor={{ false: '#E0E0E0', true: '#007AFF' }}
              thumbColor={form.anonymous ? '#FFFFFF' : '#FFFFFF'}
            />
          </View>
        </View>
      </ScrollView>

      {/* Submit Button */}
      <View style={styles.submitSection}>
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmitReport}>
          <Text style={styles.submitButtonText}>Submit Report</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  backButton: {
    padding: 8,
    marginLeft: -8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#2C2C2C',
    flex: 1,
    textAlign: 'center',
    marginHorizontal: 16,
  },
  saveDraftButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  saveDraftText: {
    fontSize: 16,
    color: '#999',
    fontWeight: '500',
  },
  scrollView: {
    flex: 1,
  },
  form: {
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 20,
  },
  photosSection: {
    marginBottom: 20,
  },
  photosRow: {
    flexDirection: 'row',
    gap: 12,
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
  anonymousSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    marginTop: 20,
  },
  anonymousLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#2C2C2C',
  },
  submitSection: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    paddingBottom: Platform.OS === 'ios' ? 94 : 74,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  submitButton: {
    backgroundColor: '#007AFF',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
    shadowColor: '#007AFF',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  submitButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});

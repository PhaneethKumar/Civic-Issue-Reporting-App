import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Path } from 'react-native-svg';
import { UpdateItem } from '@/components/shared/UpdateItem';
import { UpdateItem as UpdateItemType } from '@/types/updates';

// Back arrow icon
const BackIcon = ({ color = "#2C2C2C" }: { color?: string }) => (
  <Svg width={24} height={24} viewBox="0 0 24 24">
    <Path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" fill={color} />
  </Svg>
);

// Sample data matching the design
const sampleUpdates: UpdateItemType[] = [
  {
    id: '1',
    title: 'Your issue was resolved',
    description: 'The pothole at 123 Main St has been filled. Thanks for your report!',
    timestamp: new Date(Date.now() - 5 * 60 * 1000).toISOString(), // 5 minutes ago
    type: 'resolved',
    iconColor: '#FFFFFF',
    iconBackground: '#7CC7FF', // Bright blue as in the image
    location: '123 Main St'
  },
  {
    id: '2',
    title: 'New comment on your report',
    description: '"We\'ve dispatched a team to look at the broken streetlight. ETA: 2 hours."',
    timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(), // 1 hour ago
    type: 'comment',
    iconColor: '#FFFFFF',
    iconBackground: '#81E6D9', // Bright teal green as in the image
  },
  {
    id: '3',
    title: 'Status changed to \'In Progress\'',
    description: 'Your report about graffiti at the park is now being addressed.',
    timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days ago
    type: 'status_change',
    iconColor: '#FFFFFF',
    iconBackground: '#FFD93D', // Bright yellow as in the image
  },
  {
    id: '4',
    title: 'Your issue was resolved',
    description: 'The fallen tree branch on Elm Street has been cleared.',
    timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days ago
    type: 'resolved',
    iconColor: '#FFFFFF',
    iconBackground: '#7CC7FF', // Bright blue as in the image
    location: 'Elm Street'
  },
  {
    id: '5',
    title: 'New Report Submitted',
    description: 'Thanks for submitting your report about the overflowing trash can.',
    timestamp: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(), // 6 days ago
    type: 'report_submitted',
    iconColor: '#FFFFFF',
    iconBackground: '#D4B5FF', // Bright purple as in the image
  },
];

export default function UpdatesScreen() {
  const handleUpdatePress = (update: UpdateItemType) => {
    // Handle update item press - could navigate to details
    console.log('Update pressed:', update);
  };

  const handleBackPress = () => {
    // Handle back navigation
    console.log('Back pressed');
  };

  const renderUpdateItem = ({ item }: { item: UpdateItemType }) => (
    <UpdateItem update={item} onPress={handleUpdatePress} />
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={handleBackPress}
          activeOpacity={0.7}
        >
          <BackIcon />
        </TouchableOpacity>
        <Text style={styles.title}>Updates</Text>
        <View style={styles.placeholder} />
      </View>
      
      {/* Updates List */}
      <FlatList
        data={sampleUpdates}
        renderItem={renderUpdateItem}
        keyExtractor={(item) => item.id}
        style={styles.list}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2C2C2C',
    textAlign: 'center',
  },
  placeholder: {
    width: 40,
    height: 40,
  },
  list: {
    flex: 1,
  },
  listContent: {
    paddingBottom: 100, // Account for bottom tab bar
  },
});

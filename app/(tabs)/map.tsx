import React, { useState, useRef } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Platform,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import MapView, { Marker, Region } from 'react-native-maps';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Path } from 'react-native-svg';

// Import our custom components
import { MapHeader } from '../../components/map/MapHeader';
import { MapFilters } from '../../components/map/MapFilters';
import { IssueCardOverlay } from '../../components/map/IssueCardOverlay';
import { CustomMarker } from '../../components/map/MapMarkers';

const { width: screenWidth } = Dimensions.get('window');

// Sample data for map issues
const mapIssues = [
  {
    id: '1',
    title: 'Pothole on Elm Street',
    reportedBy: 'Alex',
    status: 'In Progress' as const,
    upvotes: 12,
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=300&fit=crop',
    type: 'pothole' as const,
    coordinate: {
      latitude: 37.7849,
      longitude: -122.4094,
    },
  },
  {
    id: '2',
    title: 'Streetlight Outage',
    reportedBy: 'Maria',
    status: 'Reported' as const,
    upvotes: 8,
    image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=300&h=300&fit=crop',
    type: 'streetlight' as const,
    coordinate: {
      latitude: 37.7849,
      longitude: -122.4194,
    },
  },
  {
    id: '3',
    title: 'Graffiti on Building',
    reportedBy: 'John',
    status: 'Resolved' as const,
    upvotes: 5,
    image: 'https://images.unsplash.com/photo-1541516160071-4bb0c5af65ba?w=300&h=300&fit=crop',
    type: 'graffiti' as const,
    coordinate: {
      latitude: 37.7949,
      longitude: -122.4094,
    },
  },
];

export default function MapScreen() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [isCardVisible, setIsCardVisible] = useState(false);
  const mapRef = useRef<MapView>(null);

  // San Francisco coordinates
  const [region] = useState<Region>({
    latitude: 37.7849,
    longitude: -122.4094,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });

  const handleMarkerPress = (issue: any) => {
    setSelectedIssue(issue);
    setIsCardVisible(true);
  };

  const handleCloseCard = () => {
    setIsCardVisible(false);
    setSelectedIssue(null);
  };

  const handleViewDetails = () => {
    console.log('View details for:', selectedIssue?.title);
    // Navigate to detail screen
  };

  const handleUpvote = () => {
    console.log('Upvote issue:', selectedIssue?.title);
    // Handle upvote logic
  };

  const handleMenuPress = () => {
    console.log('Menu pressed');
  };

  const handleNotificationPress = () => {
    console.log('Notification pressed');
  };

  const filteredIssues = activeFilter === 'all' 
    ? mapIssues 
    : mapIssues.filter(issue => issue.type === activeFilter);

  return (
    <View style={styles.container}>
      {/* Header */}
      <MapHeader 
        onMenuPress={handleMenuPress}
        onNotificationPress={handleNotificationPress}
      />
      
      {/* Category Filters */}
      <MapFilters 
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
      />
      
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Svg width={20} height={20} viewBox="0 0 24 24" style={styles.searchIcon}>
          <Path 
            d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" 
            fill="#999"
          />
        </Svg>
        <TextInput
          style={styles.searchInput}
          placeholder="Search for issues..."
          value={searchText}
          onChangeText={setSearchText}
          placeholderTextColor="#999"
        />
      </View>

      {/* Map */}
      <MapView
        ref={mapRef}
        style={styles.map}
        initialRegion={region}
        showsUserLocation={true}
        showsMyLocationButton={false}
        onPress={handleCloseCard}
      >
        {filteredIssues.map((issue) => (
          <Marker
            key={issue.id}
            coordinate={issue.coordinate}
            onPress={() => handleMarkerPress(issue)}
          >
            <CustomMarker 
              type={issue.type} 
              isSelected={selectedIssue?.id === issue.id}
            />
          </Marker>
        ))}
      </MapView>

      {/* Zoom Controls */}
      <View style={styles.zoomControls}>
        <TouchableOpacity 
          style={styles.zoomButton}
          onPress={() => {
            mapRef.current?.animateCamera({
              zoom: region.latitudeDelta * 0.5,
            });
          }}
        >
          <Svg width={24} height={24} viewBox="0 0 24 24">
            <Path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" fill="#333" />
          </Svg>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.zoomButton}
          onPress={() => {
            mapRef.current?.animateCamera({
              zoom: region.latitudeDelta * 2,
            });
          }}
        >
          <Svg width={24} height={24} viewBox="0 0 24 24">
            <Path d="M19 13H5v-2h14v2z" fill="#333" />
          </Svg>
        </TouchableOpacity>
      </View>

      {/* Issue Card Overlay */}
      <IssueCardOverlay
        issue={selectedIssue}
        isVisible={isCardVisible}
        onClose={handleCloseCard}
        onViewDetails={handleViewDetails}
        onUpvote={handleUpvote}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  map: {
    flex: 1,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 25,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginHorizontal: 16,
    marginVertical: 12,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    zIndex: 999,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    paddingVertical: 0,
  },
  zoomControls: {
    position: 'absolute',
    right: 16,
    bottom: 120,
    zIndex: 999,
  },
  zoomButton: {
    backgroundColor: '#FFFFFF',
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 4,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
});

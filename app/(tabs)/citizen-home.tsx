import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  FlatList,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Header, SearchBar, FilterChip } from '../../components/shared/FilterComponents';
import { CitizenIssueCard } from '../../components/shared/IssueComponents';

// Sample data for citizen issues
const citizenIssues = [
  {
    id: '1',
    title: 'Pothole on Elm Street',
    description: 'Large pothole causing traffic hazard.',
    status: 'Reported',
    distance: '2 km away',
    likes: 12,
    image: { uri: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=300&fit=crop' }, // Pothole image
  },
  {
    id: '2',
    title: 'Streetlight Outage',
    description: 'Streetlight malfunction at Oak and Pine.',
    status: 'In Progress',
    distance: '5 km away',
    likes: 8,
    image: { uri: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=300&h=300&fit=crop' }, // Streetlight image
  },
  {
    id: '3',
    title: 'Graffiti on Building',
    description: 'Vandalism on Main Street storefront.',
    status: 'Resolved',
    distance: '1 km away',
    likes: 5,
    image: { uri: 'https://images.unsplash.com/photo-1541516160071-4bb0c5af65ba?w=300&h=300&fit=crop' }, // Building/graffiti image
  },
];

const filterOptions = [
  { title: 'Category', hasDropdown: true },
  { title: 'Distance:', hasDropdown: true },
  { title: 'Status: All', hasDropdown: true },
];

export default function CitizenHomeScreen() {
  const [searchText, setSearchText] = useState('');
  const [issues] = useState(citizenIssues);
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  const handleLike = (id: string) => {
    console.log('Like issue:', id);
  };

  const handleShare = (id: string) => {
    console.log('Share issue:', id);
  };

  const handleAddPress = () => {
    console.log('Add new issue');
  };

  const handleFilterPress = (filter: string) => {
    console.log('Filter pressed:', filter);
  };

  const renderIssueCard = ({ item }: { item: typeof citizenIssues[0] }) => (
    <CitizenIssueCard
      title={item.title}
      description={item.description}
      status={item.status}
      distance={item.distance}
      likes={item.likes}
      image={item.image}
      onLike={() => handleLike(item.id)}
      onShare={() => handleShare(item.id)}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <Header
        title="Civic Issues"
        showAddButton={true}
        onAddPress={handleAddPress}
      />

      {/* Search Bar */}
      <SearchBar
        value={searchText}
        onChangeText={setSearchText}
        placeholder="Search issues"
      />

      {/* Filter Chips */}
      <View style={styles.filterContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterScrollContent}
        >
          {filterOptions.map((filter, index) => (
            <FilterChip
              key={index}
              title={filter.title}
              isActive={activeFilters.includes(filter.title)}
              hasDropdown={filter.hasDropdown}
              onPress={() => handleFilterPress(filter.title)}
            />
          ))}
        </ScrollView>
      </View>

      {/* Issues List */}
      <FlatList
        data={issues}
        renderItem={renderIssueCard}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
    paddingBottom: Platform.OS === 'ios' ? 78 : 58, // Account for tab bar
  },
  filterContainer: {
    paddingVertical: 8,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  filterScrollContent: {
    paddingHorizontal: 16,
  },
  listContent: {
    padding: 16,
    paddingBottom: 16, // Reduced padding since tab bar positioning is fixed
  },
});
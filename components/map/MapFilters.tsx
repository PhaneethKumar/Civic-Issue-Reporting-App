import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

interface FilterChipProps {
  title: string;
  isActive: boolean;
  onPress: () => void;
}

const FilterChip: React.FC<FilterChipProps> = ({ title, isActive, onPress }) => {
  return (
    <TouchableOpacity
      style={[styles.chip, isActive && styles.activeChip]}
      onPress={onPress}
    >
      <Text style={[styles.chipText, isActive && styles.activeChipText]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

interface MapFiltersProps {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}

export const MapFilters: React.FC<MapFiltersProps> = ({
  activeFilter,
  onFilterChange,
}) => {
  const filters = [
    { id: 'all', title: 'All' },
    { id: 'potholes', title: 'Potholes' },
    { id: 'graffiti', title: 'Graffiti' },
    { id: 'streetlight', title: 'Streetlight' },
    { id: 'parking', title: 'Parking' },
    { id: 'noise', title: 'Noise' },
  ];

  return (
    <View style={styles.container}>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        {filters.map((filter) => (
          <FilterChip
            key={filter.id}
            title={filter.title}
            isActive={activeFilter === filter.id}
            onPress={() => onFilterChange(filter.id)}
          />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    zIndex: 999,
  },
  scrollContainer: {
    paddingHorizontal: 16,
  },
  chip: {
    backgroundColor: '#F5F5F5',
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 12,
    marginRight: 12,
    minWidth: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeChip: {
    backgroundColor: '#007AFF', // iOS blue color like in the image
  },
  chipText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666',
  },
  activeChipText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
});
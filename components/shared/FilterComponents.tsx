import React from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import Svg, { Path } from 'react-native-svg';

// Filter Tab Component (for Admin)
interface FilterTabProps {
  title: string;
  isActive: boolean;
  onPress: () => void;
}

export const FilterTab: React.FC<FilterTabProps> = ({ title, isActive, onPress }) => {
  return (
    <TouchableOpacity
      style={[styles.filterTab, isActive && styles.activeFilterTab]}
      onPress={onPress}
    >
      <Text style={[styles.filterTabText, isActive && styles.activeFilterTabText]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

// Search Bar Component (for Citizen)
interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({ 
  value, 
  onChangeText, 
  placeholder = "Search issues" 
}) => {
  return (
    <View style={styles.searchContainer}>
      <Svg width={20} height={20} viewBox="0 0 24 24" style={styles.searchIcon}>
        <Path 
          d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" 
          fill="#999"
        />
      </Svg>
      <TextInput
        style={styles.searchInput}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        placeholderTextColor="#999"
      />
    </View>
  );
};

// Filter Chip Component (for Citizen)
interface FilterChipProps {
  title: string;
  isActive?: boolean;
  onPress: () => void;
  hasDropdown?: boolean;
}

export const FilterChip: React.FC<FilterChipProps> = ({ 
  title, 
  isActive = false, 
  onPress,
  hasDropdown = false 
}) => {
  return (
    <TouchableOpacity
      style={[styles.filterChip, isActive && styles.activeFilterChip]}
      onPress={onPress}
    >
      <Text style={[styles.filterChipText, isActive && styles.activeFilterChipText]}>
        {title}
      </Text>
      {hasDropdown && (
        <Svg width={12} height={12} viewBox="0 0 24 24" style={styles.dropdownIcon}>
          <Path d="M7 10l5 5 5-5z" fill={isActive ? "#1976D2" : "#999"} />
        </Svg>
      )}
    </TouchableOpacity>
  );
};

// Header with Title and Action
interface HeaderProps {
  title: string;
  showNotification?: boolean;
  showAddButton?: boolean;
  onNotificationPress?: () => void;
  onAddPress?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ 
  title, 
  showNotification = false, 
  showAddButton = false,
  onNotificationPress,
  onAddPress 
}) => {
  return (
    <View style={styles.header}>
      <Text style={styles.headerTitle}>{title}</Text>
      <View style={styles.headerActions}>
        {showNotification && (
          <TouchableOpacity style={styles.headerButton} onPress={onNotificationPress}>
            <Svg width={24} height={24} viewBox="0 0 24 24">
              <Path 
                d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z" 
                fill="#333"
              />
            </Svg>
          </TouchableOpacity>
        )}
        {showAddButton && (
          <TouchableOpacity style={styles.headerButton} onPress={onAddPress}>
            <Svg width={24} height={24} viewBox="0 0 24 24">
              <Path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" fill="#333" />
            </Svg>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  // Filter Tab Styles (Admin)
  filterTab: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
    marginRight: 8,
    backgroundColor: '#F5F5F5',
  },
  activeFilterTab: {
    backgroundColor: '#1976D2',
  },
  filterTabText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666',
  },
  activeFilterTabText: {
    color: '#FFFFFF',
  },

  // Search Bar Styles (Citizen)
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 28,
    paddingHorizontal: 20,
    paddingVertical: 14,
    marginHorizontal: 16,
    marginTop: 8,
    marginBottom: 16,
    minHeight: 56,
    maxHeight: 56,
  },
  searchIcon: {
    marginRight: 16,
    opacity: 0.6,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    paddingVertical: 0,
    paddingHorizontal: 0,
    includeFontPadding: false,
    textAlignVertical: 'center',
    height: 22,
  },

  // Filter Chip Styles (Citizen)
  filterChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
    marginRight: 8,
  },
  activeFilterChip: {
    backgroundColor: '#1976D2',
  },
  filterChipText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666',
    marginRight: 4,
  },
  activeFilterChipText: {
    color: '#FFFFFF',
  },
  dropdownIcon: {
    marginLeft: 4,
  },

  // Header Styles
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
    minHeight: 56,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#2C2C2C',
    flex: 1,
    marginRight: 16,
  },
  headerActions: {
    flexDirection: 'row',
  },
  headerButton: {
    padding: 8,
    marginLeft: 8,
    borderRadius: 8,
    minWidth: 40,
    minHeight: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
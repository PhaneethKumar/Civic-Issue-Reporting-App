import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  FlatList,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Header, FilterTab } from '../../components/shared/FilterComponents';
import { AdminIssueCard } from '../../components/shared/IssueComponents';

// Sample data for admin issues
const adminIssues = [
  {
    id: '1',
    title: 'Pothole on Elm Street',
    category: 'Roads & Streets',
    status: 'In Progress',
    priority: 'Medium' as const,
    assignedTime: 'Assigned 2 days ago',
    isWarning: false,
  },
  {
    id: '2',
    title: 'Streetlight Outage',
    category: 'Public Lighting',
    status: 'Due in 2 days',
    priority: 'High' as const,
    assignedTime: '',
    isWarning: true,
  },
];

const filterTabs = ['All', 'In Progress', 'Due Soon', 'Overdue'];

export default function AdminHomeScreen() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [issues] = useState(adminIssues);

  const handleUpdateStatus = (id: string) => {
    console.log('Update status for issue:', id);
  };

  const handleComment = (id: string) => {
    console.log('Comment on issue:', id);
  };

  const handleProof = (id: string) => {
    console.log('Add proof for issue:', id);
  };

  const handleNotificationPress = () => {
    console.log('Notifications pressed');
  };

  const renderIssueCard = ({ item }: { item: typeof adminIssues[0] }) => (
    <AdminIssueCard
      title={item.title}
      category={item.category}
      status={item.status}
      priority={item.priority}
      assignedTime={item.assignedTime}
      isWarning={item.isWarning}
      onUpdateStatus={() => handleUpdateStatus(item.id)}
      onComment={() => handleComment(item.id)}
      onProof={() => handleProof(item.id)}
    />
  );

  const renderFilterTab = (tab: string, index: number) => (
    <FilterTab
      key={index}
      title={tab}
      isActive={activeFilter === tab}
      onPress={() => setActiveFilter(tab)}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <Header
        title="Admin Home"
        showNotification={true}
        onNotificationPress={handleNotificationPress}
      />

      {/* Filter Tabs */}
      <View style={styles.filterContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterScrollContent}
        >
          {filterTabs.map(renderFilterTab)}
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

      {/* Loading placeholder for more items (matching the gray boxes in the image) */}
      <View style={styles.loadingContainer}>
        <View style={styles.loadingItem1} />
        <View style={styles.loadingItem2} />
        <View style={styles.loadingItem3} />
        <View style={styles.loadingRow}>
          <View style={styles.loadingItem4} />
          <View style={styles.loadingItem5} />
          <View style={styles.loadingItem6} />
        </View>
      </View>
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
  },
  filterScrollContent: {
    paddingHorizontal: 16,
  },
  listContent: {
    padding: 16,
    paddingBottom: 16, // Reduced padding since tab bar positioning is fixed
  },
  loadingContainer: {
    paddingHorizontal: 16,
    paddingBottom: 12,
  },
  loadingItem1: {
    height: 60,
    backgroundColor: '#E0E0E0',
    borderRadius: 8,
    marginBottom: 12,
  },
  loadingItem2: {
    height: 40,
    backgroundColor: '#E0E0E0',
    borderRadius: 8,
    marginBottom: 12,
    width: '70%',
  },
  loadingItem3: {
    height: 30,
    backgroundColor: '#E0E0E0',
    borderRadius: 8,
    marginBottom: 20,
    width: '50%',
  },
  loadingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  loadingItem4: {
    height: 40,
    backgroundColor: '#E0E0E0',
    borderRadius: 8,
    width: '30%',
  },
  loadingItem5: {
    height: 40,
    backgroundColor: '#E0E0E0',
    borderRadius: 8,
    width: '30%',
  },
  loadingItem6: {
    height: 40,
    backgroundColor: '#E0E0E0',
    borderRadius: 8,
    width: '30%',
  },
});
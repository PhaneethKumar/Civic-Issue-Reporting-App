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

// Sample data for assigned issues
const assignedIssues = [
  {
    id: '1',
    title: 'Water Pipe Leak',
    category: 'Water & Drainage',
    status: 'In Progress',
    priority: 'High' as const,
    assignedTime: 'Assigned 1 day ago',
    isWarning: false,
  },
  {
    id: '2',
    title: 'Tree Branch Blocking Road',
    category: 'Roads & Streets',
    status: 'New',
    priority: 'Medium' as const,
    assignedTime: 'Assigned 3 hours ago',
    isWarning: false,
  },
];

const filterTabs = ['All', 'New', 'In Progress', 'Completed'];

export default function AssignedScreen() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [issues] = useState(assignedIssues);

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

  const renderIssueCard = ({ item }: { item: typeof assignedIssues[0] }) => (
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
        title="Assigned Issues"
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
    paddingBottom: 16,
  },
});
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Path } from 'react-native-svg';
import { AdminAvatar } from '@/components/shared/AdminAvatar';
import { ProfileMenuItem } from '@/components/shared/ProfileMenuItem';
import { useAuth } from '@/contexts/AuthContext';

// Back arrow icon
const BackIcon = ({ color = "#2C2C2C" }: { color?: string }) => (
  <Svg width={24} height={24} viewBox="0 0 24 24">
    <Path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" fill={color} />
  </Svg>
);

export const AdminProfile: React.FC = () => {
  const { user, logout } = useAuth();

  const handleBackPress = () => {
    // Handle back navigation
    console.log('Back pressed');
  };

  const handleManageUsers = () => {
    console.log('Navigate to Manage Users');
  };

  const handleSystemSettings = () => {
    console.log('Navigate to System Settings');
  };

  const handleReportsAnalytics = () => {
    console.log('Navigate to Reports & Analytics');
  };

  const handleLanguage = () => {
    console.log('Open Language settings');
  };

  const handlePrivacySettings = () => {
    console.log('Open Privacy Settings');
  };

  const handleLogout = () => {
    console.log('Logout pressed');
    logout();
  };

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
        <Text style={styles.headerTitle}>Profile</Text>
        <View style={styles.placeholder} />
      </View>
      
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* User Info Section */}
        <View style={styles.userInfoSection}>
          <AdminAvatar size={120} />
          <Text style={styles.userName}>Ethan Carter</Text>
          <Text style={styles.userRole}>Administrator</Text>
          <Text style={styles.userEmail}>ethan.carter@email.com</Text>
        </View>

        {/* Account Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>ACCOUNT</Text>
          
          <ProfileMenuItem
            title="Manage Users"
            icon="manage_users"
            onPress={handleManageUsers}
          />
          
          <ProfileMenuItem
            title="System Settings"
            icon="system_settings"
            onPress={handleSystemSettings}
          />
          
          <ProfileMenuItem
            title="Reports & Analytics"
            icon="reports_analytics"
            onPress={handleReportsAnalytics}
          />
        </View>

        {/* Preferences Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>PREFERENCES</Text>
          
          <ProfileMenuItem
            title="Language"
            icon="language"
            onPress={handleLanguage}
            rightText="English"
          />
          
          <ProfileMenuItem
            title="Privacy Settings"
            icon="privacy"
            onPress={handlePrivacySettings}
          />
        </View>

        {/* Logout Section */}
        <View style={styles.logoutSection}>
          <ProfileMenuItem
            title="Logout"
            icon="logout"
            onPress={handleLogout}
            showArrow={false}
            isDanger={true}
          />
        </View>
        
        {/* Bottom spacing for tab bar */}
        <View style={styles.bottomSpacing} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
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
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2C2C2C',
    textAlign: 'center',
  },
  placeholder: {
    width: 40,
    height: 40,
  },
  scrollView: {
    flex: 1,
  },
  userInfoSection: {
    alignItems: 'center',
    paddingVertical: 40,
    backgroundColor: '#FFFFFF',
    marginBottom: 20,
  },
  userName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#2C2C2C',
    marginTop: 16,
    marginBottom: 4,
  },
  userRole: {
    fontSize: 16,
    color: '#999999',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 16,
    color: '#999999',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#999999',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#F8F9FA',
    letterSpacing: 0.5,
  },
  logoutSection: {
    marginTop: 20,
    marginBottom: 20,
  },
  bottomSpacing: {
    height: 100,
  },
});

export default AdminProfile;
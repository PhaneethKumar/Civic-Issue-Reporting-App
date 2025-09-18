import React, { useEffect } from 'react';
import { useRouter } from 'expo-router';
import { useAuth } from '../../contexts/AuthContext';

// Import the actual home screen components
import CitizenHomeScreen from './citizen-home';
import AdminHomeScreen from './admin-home';

export default function HomeScreen() {
  const { user, userType } = useAuth();

  // Route to the correct home screen based on user type
  if (userType === 'admin') {
    return <AdminHomeScreen />;
  } else {
    return <CitizenHomeScreen />;
  }
}

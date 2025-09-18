import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type UserType = 'admin' | 'citizen' | null;

export interface AuthUser {
  id: string;
  email: string;
  userType: UserType;
  name: string;
}

interface AuthContextType {
  user: AuthUser | null;
  userType: UserType;
  login: (email: string, otp: string, userType: UserType) => Promise<boolean>;
  logout: () => Promise<void>;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Test credentials
const TEST_CREDENTIALS = {
  admin: {
    email: 'admin@city.gov',
    otp: '123456',
    userData: {
      id: 'admin_001',
      email: 'admin@city.gov',
      userType: 'admin' as UserType,
      name: 'City Administrator'
    }
  },
  citizen: {
    email: 'citizen@email.com',
    otp: '654321',
    userData: {
      id: 'citizen_001', 
      email: 'citizen@email.com',
      userType: 'citizen' as UserType,
      name: 'John Citizen'
    }
  }
};

// Guest credentials (for guest access)
const GUEST_CREDENTIALS = {
  email: 'guest@local.com',
  otp: '000000',
  userData: {
    id: 'guest_001',
    email: 'guest@local.com',
    userType: 'citizen' as UserType,
    name: 'Guest User'
  }
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load user data on app start
  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      const userData = await AsyncStorage.getItem('user_data');
      if (userData) {
        setUser(JSON.parse(userData));
      }
    } catch (error) {
      console.error('Error loading user data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, otp: string, userType: UserType): Promise<boolean> => {
    try {
      // Check for guest credentials first
      if (email.toLowerCase() === GUEST_CREDENTIALS.email.toLowerCase() && otp === GUEST_CREDENTIALS.otp) {
        await AsyncStorage.setItem('user_data', JSON.stringify(GUEST_CREDENTIALS.userData));
        setUser(GUEST_CREDENTIALS.userData);
        console.log('✅ Guest login successful:', GUEST_CREDENTIALS.userData);
        return true;
      }

      // Check test credentials
      const credentials = TEST_CREDENTIALS[userType as keyof typeof TEST_CREDENTIALS];
      
      if (!credentials) {
        console.log('Invalid user type');
        return false;
      }

      // Validate credentials (case insensitive email, exact OTP)
      const emailMatch = email.toLowerCase() === credentials.email.toLowerCase();
      const otpMatch = otp === credentials.otp;

      if (emailMatch && otpMatch) {
        // Save user data
        await AsyncStorage.setItem('user_data', JSON.stringify(credentials.userData));
        setUser(credentials.userData);
        console.log(`✅ ${userType} login successful:`, credentials.userData);
        return true;
      } else {
        console.log('❌ Invalid credentials');
        console.log('Expected:', { email: credentials.email, otp: credentials.otp });
        console.log('Received:', { email, otp });
        return false;
      }
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem('user_data');
      setUser(null);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const userType = user?.userType || null;

  return (
    <AuthContext.Provider value={{
      user,
      userType,
      login,
      logout,
      isLoading
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
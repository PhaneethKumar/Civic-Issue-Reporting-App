import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions,
  Animated,
} from 'react-native';
import Svg, { Path } from 'react-native-svg';

const { width: screenWidth } = Dimensions.get('window');

interface Issue {
  id: string;
  title: string;
  reportedBy: string;
  status: 'In Progress' | 'Reported' | 'Resolved';
  upvotes: number;
  image: string;
  location?: string;
}

interface IssueCardOverlayProps {
  issue: Issue | null;
  isVisible: boolean;
  onClose: () => void;
  onViewDetails: () => void;
  onUpvote: () => void;
}

export const IssueCardOverlay: React.FC<IssueCardOverlayProps> = ({
  issue,
  isVisible,
  onClose,
  onViewDetails,
  onUpvote,
}) => {
  if (!issue || !isVisible) return null;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'In Progress':
        return '#FF9500'; // Orange
      case 'Reported':
        return '#666';
      case 'Resolved':
        return '#34C759'; // Green
      default:
        return '#666';
    }
  };

  const getStatusBackground = (status: string) => {
    switch (status) {
      case 'In Progress':
        return '#FFF3E0';
      case 'Reported':
        return '#F5F5F5';
      case 'Resolved':
        return '#E8F5E8';
      default:
        return '#F5F5F5';
    }
  };

  return (
    <View style={styles.overlay}>
      <View style={styles.card}>
        {/* Handle bar */}
        <View style={styles.handleBar} />
        
        {/* Card content */}
        <View style={styles.cardContent}>
          <View style={styles.mainInfo}>
            <View style={styles.textInfo}>
              <Text style={styles.title}>{issue.title}</Text>
              <Text style={styles.reportedBy}>Reported by {issue.reportedBy}</Text>
              
              <View style={styles.statusContainer}>
                <View 
                  style={[
                    styles.statusBadge, 
                    { backgroundColor: getStatusBackground(issue.status) }
                  ]}
                >
                  <Text 
                    style={[
                      styles.statusText, 
                      { color: getStatusColor(issue.status) }
                    ]}
                  >
                    {issue.status}
                  </Text>
                </View>
                
                <TouchableOpacity style={styles.upvoteButton} onPress={onUpvote}>
                  <Svg width={16} height={16} viewBox="0 0 24 24">
                    <Path 
                      d="M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-1.91l-.01-.01L23 10z" 
                      fill="#FF3B30"
                    />
                  </Svg>
                  <Text style={styles.upvoteText}>{issue.upvotes} Upvotes</Text>
                </TouchableOpacity>
              </View>
            </View>
            
            {/* Issue Image */}
            <Image source={{ uri: issue.image }} style={styles.issueImage} />
          </View>
          
          {/* View Details Button */}
          <TouchableOpacity style={styles.viewDetailsButton} onPress={onViewDetails}>
            <Text style={styles.viewDetailsText}>View Details</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: 34, // Account for home indicator
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
  },
  handleBar: {
    width: 40,
    height: 4,
    backgroundColor: '#E0E0E0',
    borderRadius: 2,
    alignSelf: 'center',
    marginTop: 12,
    marginBottom: 20,
  },
  cardContent: {
    paddingHorizontal: 20,
  },
  mainInfo: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  textInfo: {
    flex: 1,
    marginRight: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  reportedBy: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  upvoteButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  upvoteText: {
    fontSize: 14,
    color: '#333',
    marginLeft: 6,
    fontWeight: '500',
  },
  issueImage: {
    width: 80,
    height: 80,
    borderRadius: 12,
    backgroundColor: '#F5F5F5',
  },
  viewDetailsButton: {
    backgroundColor: '#007AFF',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewDetailsText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
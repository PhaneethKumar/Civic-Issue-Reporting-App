import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import Svg, { Path } from 'react-native-svg';

// Priority Badge Component
interface PriorityBadgeProps {
  priority: 'High' | 'Medium' | 'Low';
}

export const PriorityBadge: React.FC<PriorityBadgeProps> = ({ priority }) => {
  const getBackgroundColor = () => {
    switch (priority) {
      case 'High':
        return '#FFEBEE';
      case 'Medium':
        return '#FFF3E0';
      case 'Low':
        return '#E8F5E8';
      default:
        return '#F5F5F5';
    }
  };

  const getTextColor = () => {
    switch (priority) {
      case 'High':
        return '#FF5722';
      case 'Medium':
        return '#FF9800';
      case 'Low':
        return '#4CAF50';
      default:
        return '#666';
    }
  };

  return (
    <View style={[styles.priorityBadge, { backgroundColor: getBackgroundColor() }]}>
      <Text style={[styles.priorityText, { color: getTextColor() }]}>{priority}</Text>
    </View>
  );
};

// Status Badge Component
interface StatusBadgeProps {
  status: 'Reported' | 'In Progress' | 'Resolved' | 'New' | 'Due in 2 days';
  isWarning?: boolean;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, isWarning = false }) => {
  const getBackgroundColor = () => {
    if (isWarning) return '#FFEBEE';
    switch (status) {
      case 'In Progress':
        return '#E3F2FD';
      case 'Resolved':
        return '#E8F5E8';
      case 'New':
        return '#F5F5F5';
      case 'Reported':
        return '#F5F5F5';
      default:
        return '#F5F5F5';
    }
  };

  const getTextColor = () => {
    if (isWarning) return '#F44336';
    switch (status) {
      case 'In Progress':
        return '#1976D2';
      case 'Resolved':
        return '#4CAF50';
      default:
        return '#666';
    }
  };

  const getIcon = () => {
    if (isWarning) {
      return (
        <Svg width={12} height={12} viewBox="0 0 24 24" style={styles.statusIcon}>
          <Path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z" fill="#F44336" />
        </Svg>
      );
    }
    if (status === 'In Progress') {
      return (
        <Svg width={12} height={12} viewBox="0 0 24 24" style={styles.statusIcon}>
          <Path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" fill="#1976D2" />
        </Svg>
      );
    }
    return null;
  };

  return (
    <View style={[styles.statusBadge, { backgroundColor: getBackgroundColor() }]}>
      {getIcon()}
      <Text style={[styles.statusText, { color: getTextColor() }]}>{status}</Text>
    </View>
  );
};

// Admin Issue Card Component
interface AdminIssueCardProps {
  title: string;
  category: string;
  status: string;
  priority: 'High' | 'Medium' | 'Low';
  assignedTime: string;
  isWarning?: boolean;
  onUpdateStatus: () => void;
  onComment: () => void;
  onProof: () => void;
}

export const AdminIssueCard: React.FC<AdminIssueCardProps> = ({
  title,
  category,
  status,
  priority,
  assignedTime,
  isWarning = false,
  onUpdateStatus,
  onComment,
  onProof,
}) => {
  return (
    <View style={styles.adminCard}>
      <View style={styles.adminCardHeader}>
        <View style={styles.adminCardTitle}>
          <Text style={styles.issueTitle}>{title}</Text>
          <Text style={styles.issueCategory}>{category}</Text>
        </View>
        <PriorityBadge priority={priority} />
      </View>

      <View style={styles.adminCardStatus}>
        <StatusBadge status={status as any} isWarning={isWarning} />
        <Text style={styles.assignedTime}>{assignedTime}</Text>
      </View>

      <View style={styles.adminCardActions}>
        <TouchableOpacity style={styles.actionButton} onPress={onUpdateStatus}>
          <Svg width={16} height={16} viewBox="0 0 24 24" style={styles.actionIcon}>
            <Path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" fill="#666" />
          </Svg>
          <Text style={styles.actionText}>Update Status</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton} onPress={onComment}>
          <Svg width={16} height={16} viewBox="0 0 24 24" style={styles.actionIcon}>
            <Path d="M21.99 4c0-1.1-.89-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14l4 4-.01-18zM18 14H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z" fill="#666" />
          </Svg>
          <Text style={styles.actionText}>Comment</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton} onPress={onProof}>
          <Svg width={16} height={16} viewBox="0 0 24 24" style={styles.actionIcon}>
            <Path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" fill="#666" />
          </Svg>
          <Text style={styles.actionText}>Proof</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// Citizen Issue Card Component
interface CitizenIssueCardProps {
  title: string;
  description: string;
  status: string;
  distance: string;
  likes: number;
  image: any;
  onLike: () => void;
  onShare: () => void;
}

export const CitizenIssueCard: React.FC<CitizenIssueCardProps> = ({
  title,
  description,
  status,
  distance,
  likes,
  image,
  onLike,
  onShare,
}) => {
  return (
    <View style={styles.citizenCard}>
      <View style={styles.citizenCardContent}>
        <Image source={image} style={styles.issueImage} />
        <View style={styles.citizenCardInfo}>
          <View style={styles.citizenCardHeader}>
            <StatusBadge status={status as any} />
            <Text style={styles.distanceText}>{distance}</Text>
          </View>
          <Text style={styles.issueTitle}>{title}</Text>
          <Text style={styles.issueDescription}>{description}</Text>
        </View>
      </View>

      <View style={styles.citizenCardActions}>
        <TouchableOpacity style={styles.likeButton} onPress={onLike}>
          <Svg width={16} height={16} viewBox="0 0 24 24" style={styles.likeIcon}>
            <Path d="M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-1.91l-.01-.01L23 10z" fill="#666" />
          </Svg>
          <Text style={styles.likeText}>{likes}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.shareButton} onPress={onShare}>
          <Svg width={16} height={16} viewBox="0 0 24 24" style={styles.shareIcon}>
            <Path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.50-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92-1.31-2.92-2.92-2.92z" fill="#666" />
          </Svg>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  // Priority Badge Styles
  priorityBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  priorityText: {
    fontSize: 12,
    fontWeight: '600',
  },

  // Status Badge Styles
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusIcon: {
    marginRight: 4,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '500',
  },

  // Admin Card Styles
  adminCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  adminCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  adminCardTitle: {
    flex: 1,
    marginRight: 12,
  },
  issueTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2C2C2C',
    marginBottom: 4,
  },
  issueCategory: {
    fontSize: 14,
    color: '#666',
  },
  adminCardStatus: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  assignedTime: {
    fontSize: 12,
    color: '#999',
  },
  adminCardActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    marginHorizontal: 4,
  },
  actionIcon: {
    marginRight: 6,
  },
  actionText: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
  },

  // Citizen Card Styles
  citizenCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  citizenCardContent: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  issueImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 12,
  },
  citizenCardInfo: {
    flex: 1,
  },
  citizenCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  distanceText: {
    fontSize: 12,
    color: '#999',
  },
  issueDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  citizenCardActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  likeButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  likeIcon: {
    marginRight: 6,
  },
  likeText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  shareButton: {
    padding: 8,
  },
  shareIcon: {},
});
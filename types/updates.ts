export interface UpdateItem {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  type: 'resolved' | 'comment' | 'status_change' | 'report_submitted' | 'in_progress';
  status?: 'resolved' | 'in_progress' | 'pending';
  iconColor: string;
  iconBackground: string;
  location?: string;
}

export interface UpdatesScreenProps {
  updates?: UpdateItem[];
}

export interface UpdateItemProps {
  update: UpdateItem;
  onPress?: (update: UpdateItem) => void;
}
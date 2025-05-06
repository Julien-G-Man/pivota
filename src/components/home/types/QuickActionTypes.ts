
import { LucideIcon } from 'lucide-react';

export interface ActionItem {
  name: string;
  icon: LucideIcon;
  color: string;
  special?: boolean;
  onClick?: () => void;
  component?: React.ReactNode;
}

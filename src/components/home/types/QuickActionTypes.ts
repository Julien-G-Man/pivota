
import { LucideIcon } from 'lucide-react';

export interface ActionItem {
  name: string;
  icon: LucideIcon;
  color: string;
  onClick?: () => void;
  component?: React.ReactNode;
}

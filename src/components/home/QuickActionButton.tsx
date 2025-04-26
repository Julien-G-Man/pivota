
import React from 'react';
import { ActionItem } from './types/QuickActionTypes';

interface QuickActionButtonProps {
  action: ActionItem;
}

export const QuickActionButton = ({ action }: QuickActionButtonProps) => {
  if (action.component) {
    return <>{action.component}</>;
  }

  return (
    <button
      onClick={action.onClick}
      className={`flex flex-col items-center p-3 rounded-lg ${action.color} hover:bg-primary/10 transition-colors`}
    >
      <action.icon size={24} className="mb-2" />
      <span className="text-xs">{action.name}</span>
    </button>
  );
};

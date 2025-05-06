
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
      className="flex flex-col items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 hover:bg-primary/15 transition-all"
    >
      <div className="flex items-center justify-center h-10 w-10 rounded-full bg-primary/20 mb-1">
        <action.icon size={20} className="text-primary" />
      </div>
      <span className="text-xs text-center">{action.name}</span>
    </button>
  );
};

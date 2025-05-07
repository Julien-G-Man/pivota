
import React from 'react';
import { ActionItem } from './types/QuickActionTypes';
import { cn } from '@/lib/utils';

interface QuickActionButtonProps {
  action: ActionItem;
  special?: boolean;
}

export const QuickActionButton = ({ action, special = false }: QuickActionButtonProps) => {
  if (action.component) {
    return <>{action.component}</>;
  }

  return (
    <button
      onClick={action.onClick}
      className="flex flex-col items-center justify-center w-full"
    >
      <div className={cn(
        "flex items-center justify-center h-12 w-12 rounded-xl bg-primary/10 mb-1",
        special && "relative"
      )}>
        <action.icon size={20} className="text-primary" />
        {special && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1 rounded-full">
            Up to 5%
          </span>
        )}
      </div>
      <span className="text-xs text-center">{action.name}</span>
    </button>
  );
};

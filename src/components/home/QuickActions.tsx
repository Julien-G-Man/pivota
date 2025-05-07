
import { useToast } from '@/hooks/use-toast';
import { QuickActionButton } from './QuickActionButton';
import { createQuickActions } from './QuickActionsConfig';

export default function QuickActions() {
  const { toast } = useToast();
  const actions = createQuickActions(toast);
  
  return (
    <div className="mt-4 bg-background rounded-xl p-4 shadow-sm">
      <div className="grid grid-cols-3 gap-4 mb-4">
        {actions.slice(0, 3).map((action) => (
          <div key={action.name} className="flex items-center justify-center">
            <QuickActionButton action={action} />
          </div>
        ))}
      </div>
      
      <div className="grid grid-cols-3 gap-4 mb-4">
        {actions.slice(3, 6).map((action) => (
          <div key={action.name} className="flex items-center justify-center">
            <QuickActionButton action={action} special={action.special} />
          </div>
        ))}
      </div>
      
      <div className="grid grid-cols-5 gap-4">
        {actions.slice(6).map((action) => (
          <div key={action.name} className="flex items-center justify-center">
            <QuickActionButton action={action} />
          </div>
        ))}
      </div>
    </div>
  );
}

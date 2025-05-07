
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
      
      <div className="grid grid-cols-4 gap-4 mb-4">
        {/* Invest, Withdraw, Deposit, and History on the same line */}
        {actions.slice(3, 7).map((action) => (
          <div key={action.name} className="flex items-center justify-center">
            <QuickActionButton action={action} special={action.special} />
          </div>
        ))}
      </div>
      
      <div className="grid grid-cols-4 gap-4 mb-4">
        {/* Airtime, Internet, TV, and Utilities on the same line */}
        {actions.slice(7, 11).map((action) => (
          <div key={action.name} className="flex items-center justify-center">
            <QuickActionButton action={action} special={action.special} />
          </div>
        ))}
      </div>

      {/* Optional: Display the AI Advisor button if present */}
      {actions.length > 11 && (
        <div className="grid grid-cols-1 gap-4">
          <div className="flex items-center justify-center">
            <QuickActionButton action={actions[11]} />
          </div>
        </div>
      )}
    </div>
  );
}

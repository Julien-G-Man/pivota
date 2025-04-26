
import { useToast } from '@/hooks/use-toast';
import { QuickActionButton } from './QuickActionButton';
import { createQuickActions } from './QuickActionsConfig';

export default function QuickActions() {
  const { toast } = useToast();
  const actions = createQuickActions(toast);
  
  return (
    <div className="mt-8">
      <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
      <div className="grid grid-cols-3 gap-4">
        {actions.map((action) => (
          <div key={action.name} className="flex items-center justify-center">
            <QuickActionButton action={action} />
          </div>
        ))}
      </div>
    </div>
  );
}

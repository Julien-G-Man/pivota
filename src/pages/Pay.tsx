
import { useState } from 'react';
import { Search } from 'lucide-react';
import BottomNavigation from '@/components/layout/BottomNavigation';
import PivotaHeader from '@/components/common/PivotaHeader';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Pay = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const paymentCategories = [
    { 
      name: 'People',
      items: [
        { id: '1', name: 'John Doe', imageUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John' },
        { id: '2', name: 'Sarah Smith', imageUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah' },
        { id: '3', name: 'Mike Johnson', imageUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mike' },
        { id: '4', name: 'Anna Brown', imageUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Anna' },
        { id: '5', name: 'Robert Lee', imageUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Robert' },
      ]
    },
    {
      name: 'Bills',
      items: [
        { id: '6', name: 'Electricity', imageUrl: '/placeholder.svg' },
        { id: '7', name: 'Water', imageUrl: '/placeholder.svg' },
        { id: '8', name: 'Internet', imageUrl: '/placeholder.svg' },
        { id: '9', name: 'Cable TV', imageUrl: '/placeholder.svg' },
      ]
    },
    {
      name: 'Mobile',
      items: [
        { id: '10', name: 'Airtime', imageUrl: '/placeholder.svg' },
        { id: '11', name: 'Data Bundle', imageUrl: '/placeholder.svg' },
        { id: '12', name: 'International Calls', imageUrl: '/placeholder.svg' },
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="container max-w-md mx-auto p-4">
        <PivotaHeader title="Pay" showIcons={false} />
        
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
          <Input 
            placeholder="Search names, accounts or services" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4 py-6 rounded-xl"
          />
        </div>
        
        <Tabs defaultValue="people" className="w-full">
          <TabsList className="grid grid-cols-3 mb-6">
            <TabsTrigger value="people">People</TabsTrigger>
            <TabsTrigger value="bills">Bills</TabsTrigger>
            <TabsTrigger value="mobile">Mobile</TabsTrigger>
          </TabsList>
          
          {paymentCategories.map((category) => (
            <TabsContent key={category.name.toLowerCase()} value={category.name.toLowerCase()} className="mt-0">
              <div className="grid grid-cols-4 gap-4">
                {category.items.map((item) => (
                  <button key={item.id} className="flex flex-col items-center">
                    <div className="w-16 h-16 rounded-full mb-2 overflow-hidden">
                      <img 
                        src={item.imageUrl} 
                        alt={item.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <span className="text-xs text-center">{item.name}</span>
                  </button>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
      
      <BottomNavigation />
    </div>
  );
};

export default Pay;

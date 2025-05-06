
import { useState } from 'react';
import { ArrowUpRight, ArrowDownRight, TrendingUp, Calendar, PieChart, CreditCard } from 'lucide-react';
import BottomNavigation from '@/components/layout/BottomNavigation';
import PivotaHeader from '@/components/common/PivotaHeader';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart as RechartsChart,
  Pie,
  Cell,
  Legend,
} from 'recharts';

const barChartData = [
  { name: 'Jan', income: 45000, expense: 30000 },
  { name: 'Feb', income: 52000, expense: 35000 },
  { name: 'Mar', income: 48000, expense: 42000 },
  { name: 'Apr', income: 61000, expense: 40000 },
  { name: 'May', income: 55000, expense: 35000 },
  { name: 'Jun', income: 67000, expense: 45000 },
];

const pieChartData = [
  { name: 'Food', value: 35000 },
  { name: 'Transport', value: 25000 },
  { name: 'Shopping', value: 15000 },
  { name: 'Utilities', value: 10000 },
  { name: 'Others', value: 15000 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

const Finance = () => {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="container max-w-md mx-auto p-4">
        <PivotaHeader title="Finance" />
        
        <div className="grid grid-cols-2 gap-4 mb-6">
          <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white">
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-white/80 text-sm">Income</p>
                  <h3 className="text-xl font-bold">350,000 F</h3>
                </div>
                <div className="p-2 bg-white/20 rounded-full">
                  <ArrowUpRight size={18} />
                </div>
              </div>
              <div className="flex items-center">
                <TrendingUp size={16} className="mr-1" />
                <span className="text-xs">+15% vs last month</span>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-red-500 to-red-600 text-white">
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-white/80 text-sm">Expenses</p>
                  <h3 className="text-xl font-bold">150,000 F</h3>
                </div>
                <div className="p-2 bg-white/20 rounded-full">
                  <ArrowDownRight size={18} />
                </div>
              </div>
              <div className="flex items-center">
                <TrendingUp size={16} className="mr-1" />
                <span className="text-xs">+5% vs last month</span>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full mb-6">
          <TabsList className="grid grid-cols-2">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="spending">Spending</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="mt-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-semibold">Income vs Expenses</h3>
                  <Button variant="outline" size="sm" className="flex items-center gap-1">
                    <Calendar size={14} />
                    <span>2025</span>
                  </Button>
                </div>
                
                <ResponsiveContainer width="100%" height={220}>
                  <BarChart
                    data={barChartData}
                    margin={{ top: 0, right: 0, left: -25, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="name" fontSize={12} />
                    <YAxis fontSize={12} />
                    <Tooltip />
                    <Bar dataKey="income" fill="#1d4ed8" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="expense" fill="#ef4444" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="spending" className="mt-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-semibold">Spending Categories</h3>
                  <Button variant="outline" size="sm" className="flex items-center gap-1">
                    <PieChart size={14} />
                    <span>Monthly</span>
                  </Button>
                </div>
                
                <ResponsiveContainer width="100%" height={220}>
                  <RechartsChart>
                    <Pie
                      data={pieChartData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {pieChartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Legend layout="vertical" align="right" verticalAlign="middle" />
                    <Tooltip />
                  </RechartsChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold">Financial Goals</h3>
              <Button variant="ghost" size="sm">See All</Button>
            </div>
            
            <div className="space-y-4">
              <div className="bg-muted/50 p-3 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center gap-2">
                    <div className="bg-blue-100 p-2 rounded-full">
                      <CreditCard size={16} className="text-blue-600" />
                    </div>
                    <span className="font-medium">New Car</span>
                  </div>
                  <span className="text-sm">75%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: '75%' }}></div>
                </div>
                <div className="flex justify-between text-sm mt-2">
                  <span className="text-muted-foreground">Saved: 3,750,000 F</span>
                  <span className="text-muted-foreground">Goal: 5,000,000 F</span>
                </div>
              </div>
              
              <div className="bg-muted/50 p-3 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center gap-2">
                    <div className="bg-purple-100 p-2 rounded-full">
                      <CreditCard size={16} className="text-purple-600" />
                    </div>
                    <span className="font-medium">Vacation</span>
                  </div>
                  <span className="text-sm">45%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-purple-600 h-2 rounded-full" style={{ width: '45%' }}></div>
                </div>
                <div className="flex justify-between text-sm mt-2">
                  <span className="text-muted-foreground">Saved: 900,000 F</span>
                  <span className="text-muted-foreground">Goal: 2,000,000 F</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <BottomNavigation />
    </div>
  );
};

export default Finance;


import { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, PieChart, Pie, Cell } from 'recharts';
import { useIsMobile } from '@/hooks/use-mobile';
import FadeIn from '../animations/FadeIn';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Mock data
const chartData = [
  { name: 'Jan', income: 2800, expenses: 2100 },
  { name: 'Feb', income: 3000, expenses: 2210 },
  { name: 'Mar', income: 2850, expenses: 2300 },
  { name: 'Apr', income: 3200, expenses: 2400 },
  { name: 'May', income: 3100, expenses: 2250 },
  { name: 'Jun', income: 3500, expenses: 2150 },
];

// Income categories data
const incomeData = [
  { name: 'Salary', value: 3200, color: '#34D399' },
  { name: 'Freelance', value: 650, color: '#60A5FA' },
  { name: 'Investments', value: 450, color: '#A78BFA' },
  { name: 'Other', value: 200, color: '#F472B6' },
];

// Expense categories data
const expenseData = [
  { name: 'Housing', value: 1200, color: '#F87171' },
  { name: 'Food', value: 450, color: '#FBBF24' },
  { name: 'Transport', value: 300, color: '#38BDF8' },
  { name: 'Shopping', value: 380, color: '#A3E635' },
  { name: 'Entertainment', value: 220, color: '#E879F9' },
  { name: 'Other', value: 250, color: '#94A3B8' },
];

const IncomeExpenseChart = () => {
  const isMobile = useIsMobile();
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="bg-white rounded-xl shadow-soft border border-border/30 p-6 min-h-[320px] flex items-center justify-center">
        <div className="text-muted-foreground">Loading chart...</div>
      </div>
    );
  }

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 rounded-lg shadow-medium border border-border/50">
          <p className="font-medium text-sm mb-1">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className={`text-sm ${entry.name === 'Income' ? 'text-green-600' : 'text-red-600'}`}>
              {entry.name}: ${entry.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const PieChartTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 rounded-lg shadow-medium border border-border/50">
          <p className="font-medium text-sm">{payload[0].name}</p>
          <p className="text-sm">${payload[0].value} ({((payload[0].value / 
            (activeTab === 'income' 
              ? incomeData.reduce((a, b) => a + b.value, 0) 
              : expenseData.reduce((a, b) => a + b.value, 0)
            )) * 100).toFixed(1)}%)</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white rounded-xl shadow-soft border border-border/30 overflow-hidden">
      <div className="p-6">
        <FadeIn direction="up">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="font-medium text-lg">Income vs Expenses</h3>
              <p className="text-muted-foreground text-sm">Track your financial flow</p>
            </div>
          </div>
        </FadeIn>
        
        <FadeIn direction="up" delay={100}>
          <Tabs defaultValue="overview" onValueChange={setActiveTab}>
            <TabsList className="mb-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="income">Income</TabsTrigger>
              <TabsTrigger value="expenses">Expenses</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="mt-0">
              <div className="mt-2" style={{ height: isMobile ? 240 : 320 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={chartData}
                    margin={{ top: 5, right: 10, left: isMobile ? 0 : 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                    <XAxis 
                      dataKey="name" 
                      tick={{ fontSize: 12 }}
                      tickLine={false}
                      axisLine={{ stroke: '#e5e7eb' }}
                    />
                    <YAxis 
                      tick={{ fontSize: 12 }}
                      tickFormatter={(value) => `$${value}`}
                      tickLine={false}
                      axisLine={{ stroke: '#e5e7eb' }}
                      width={isMobile ? 35 : 50}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend 
                      iconType="circle" 
                      wrapperStyle={{ paddingTop: 15 }}
                    />
                    <Bar 
                      dataKey="income" 
                      name="Income" 
                      fill="#34D399" 
                      radius={[4, 4, 0, 0]} 
                      barSize={isMobile ? 12 : 24}
                    />
                    <Bar 
                      dataKey="expenses" 
                      name="Expenses" 
                      fill="#F87171" 
                      radius={[4, 4, 0, 0]} 
                      barSize={isMobile ? 12 : 24}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </TabsContent>
            
            <TabsContent value="income" className="mt-0">
              <div className="mt-2" style={{ height: isMobile ? 240 : 320 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={incomeData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={isMobile ? 80 : 100}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {incomeData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip content={<PieChartTooltip />} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex flex-wrap justify-center mt-2 gap-2">
                {incomeData.map((entry, index) => (
                  <div key={index} className="flex items-center space-x-1">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }}></div>
                    <span className="text-xs text-muted-foreground">{entry.name}</span>
                  </div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="expenses" className="mt-0">
              <div className="mt-2" style={{ height: isMobile ? 240 : 320 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={expenseData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={isMobile ? 80 : 100}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {expenseData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip content={<PieChartTooltip />} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex flex-wrap justify-center mt-2 gap-2">
                {expenseData.map((entry, index) => (
                  <div key={index} className="flex items-center space-x-1">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }}></div>
                    <span className="text-xs text-muted-foreground">{entry.name}</span>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </FadeIn>
      </div>
    </div>
  );
};

export default IncomeExpenseChart;

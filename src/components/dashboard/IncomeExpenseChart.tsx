
import { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { useIsMobile } from '@/hooks/use-mobile';
import FadeIn from '../animations/FadeIn';

// Mock data
const chartData = [
  { name: 'Jan', income: 2800, expenses: 2100 },
  { name: 'Feb', income: 3000, expenses: 2210 },
  { name: 'Mar', income: 2850, expenses: 2300 },
  { name: 'Apr', income: 3200, expenses: 2400 },
  { name: 'May', income: 3100, expenses: 2250 },
  { name: 'Jun', income: 3500, expenses: 2150 },
];

const IncomeExpenseChart = () => {
  const isMobile = useIsMobile();
  const [mounted, setMounted] = useState(false);

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
          <p className="text-sm text-green-600">Income: ${payload[0].value}</p>
          <p className="text-sm text-red-600">Expenses: ${payload[1].value}</p>
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
              <p className="text-muted-foreground text-sm">Monthly breakdown</p>
            </div>
          </div>
        </FadeIn>
        
        <FadeIn direction="up" delay={100}>
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
        </FadeIn>
      </div>
    </div>
  );
};

export default IncomeExpenseChart;

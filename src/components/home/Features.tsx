
import { ArrowRight, BarChart2, Clock, DollarSign, LineChart, PieChart, Target, Wallet } from 'lucide-react';
import { Link } from 'react-router-dom';
import FadeIn from '../animations/FadeIn';

const features = [
  {
    icon: DollarSign,
    color: 'bg-primary/10 text-primary',
    title: 'Track Income & Expenses',
    description: 'Record your income from various sources and categorize your expenses to understand where your money goes.'
  },
  {
    icon: PieChart,
    color: 'bg-green-500/10 text-green-500',
    title: 'Smart Budgeting',
    description: 'Set monthly budgets for different categories and get notified when you\'re approaching your limits.'
  },
  {
    icon: LineChart,
    color: 'bg-indigo-500/10 text-indigo-500',
    title: 'Financial Reports',
    description: 'Visualize your financial progress with detailed charts and graphs that track your spending habits over time.'
  },
  {
    icon: Target,
    color: 'bg-accent/10 text-accent',
    title: 'Goal Setting',
    description: 'Define and track your financial goals, whether it\'s saving for a vacation or paying off debt.'
  },
  {
    icon: Clock,
    color: 'bg-amber-500/10 text-amber-500',
    title: 'Recurring Transactions',
    description: 'Set up automatic tracking for recurring expenses like subscriptions and bills.'
  },
  {
    icon: Wallet,
    color: 'bg-purple-500/10 text-purple-500',
    title: 'Multi-wallet Support',
    description: 'Manage multiple accounts and get a consolidated view of your overall financial health.'
  }
];

const Features = () => {
  return (
    <div id="features" className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Everything you need to master your finances</h2>
          </FadeIn>
          <FadeIn delay={100}>
            <p className="text-lg text-muted-foreground">
              Our intuitive tools help you track, budget, and visualize your financial journey with precision and ease.
            </p>
          </FadeIn>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FadeIn key={index} delay={index * 100} className="h-full">
              <div className="bg-white shadow-soft rounded-xl p-6 flex flex-col h-full border border-border/40 hover:shadow-medium transition-shadow">
                <div className={`${feature.color} p-3 rounded-lg w-fit mb-4`}>
                  <feature.icon className="h-6 w-6" />
                </div>
                
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground mb-6 flex-grow">{feature.description}</p>
                
                <Link 
                  to="/dashboard" 
                  className="group flex items-center text-sm font-medium text-primary hover:text-primary/90 transition-colors"
                >
                  Learn more
                  <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            </FadeIn>
          ))}
        </div>

        <div className="mt-16 text-center">
          <FadeIn delay={600}>
            <Link
              to="/dashboard"
              className="inline-flex items-center justify-center px-6 py-3 font-medium text-white bg-primary hover:bg-primary/90 rounded-full transition-colors shadow-soft"
            >
              Get started for free
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </FadeIn>
        </div>
      </div>
    </div>
  );
};

export default Features;

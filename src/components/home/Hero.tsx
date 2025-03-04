
import { ArrowRight, BarChart2, DollarSign, PieChart } from 'lucide-react';
import { Link } from 'react-router-dom';
import FadeIn from '../animations/FadeIn';

const Hero = () => {
  return (
    <div className="relative pt-20 pb-16 md:pt-28 md:pb-24 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-[40rem] h-[40rem] rounded-full bg-primary/5 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-[30rem] h-[30rem] rounded-full bg-accent/5 blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Left content */}
          <div className="flex-1 max-w-2xl">
            <FadeIn direction="up" delay={100}>
              <div className="inline-block rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary mb-6">
                Take control of your finances
              </div>
            </FadeIn>
            
            <FadeIn direction="up" delay={200}>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-6">
                Manage your finances with <span className="text-gradient">clarity</span> and <span className="text-gradient">ease</span>
              </h1>
            </FadeIn>
            
            <FadeIn direction="up" delay={300}>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                Track expenses, set budgets, and visualize your financial journey — all in one elegantly designed application that puts you in control.
              </p>
            </FadeIn>
            
            <FadeIn direction="up" delay={400}>
              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <Link 
                  to="/dashboard" 
                  className="inline-flex items-center justify-center px-6 py-3 font-medium text-white bg-primary hover:bg-primary/90 rounded-full transition-colors shadow-soft"
                >
                  Get started
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                <Link 
                  to="/#features" 
                  className="inline-flex items-center justify-center px-6 py-3 font-medium text-foreground bg-secondary hover:bg-secondary/80 rounded-full transition-colors"
                >
                  Learn more
                </Link>
              </div>
            </FadeIn>
            
            <FadeIn direction="up" delay={500}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex items-start space-x-3">
                  <div className="bg-background p-2 rounded-full shadow-soft">
                    <BarChart2 className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Track Expenses</h3>
                    <p className="text-sm text-muted-foreground">Monitor your spending patterns effortlessly</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="bg-background p-2 rounded-full shadow-soft">
                    <PieChart className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Smart Budgeting</h3>
                    <p className="text-sm text-muted-foreground">Create and manage custom budgets</p>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
          
          {/* Right content - Mockup */}
          <div className="flex-1 w-full max-w-lg">
            <FadeIn delay={600} direction="left">
              <div className="relative">
                <div className="absolute inset-0 scale-[0.8] -translate-y-4 bg-primary/10 rounded-3xl blur-2xl"></div>
                <div className="relative bg-white rounded-2xl overflow-hidden shadow-medium border border-border/40">
                  <div className="bg-secondary/50 border-b border-border/40 p-4 flex items-center justify-between">
                    <div className="flex space-x-2">
                      <div className="w-3 h-3 rounded-full bg-red-400"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                      <div className="w-3 h-3 rounded-full bg-green-400"></div>
                    </div>
                    <div className="text-xs font-medium text-muted-foreground">Finance Dashboard</div>
                    <div className="w-12"></div>
                  </div>
                  <div className="p-6">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <div className="bg-secondary/50 h-8 w-1/3 rounded-md"></div>
                        <div className="bg-secondary/70 h-24 w-full rounded-lg"></div>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="bg-primary/10 h-20 rounded-lg"></div>
                        <div className="bg-accent/10 h-20 rounded-lg"></div>
                      </div>
                      <div className="space-y-2">
                        <div className="bg-secondary/50 h-6 w-1/4 rounded-md"></div>
                        <div className="space-y-2">
                          {[1, 2, 3].map((i) => (
                            <div key={i} className="bg-secondary/30 h-12 w-full rounded-md flex items-center px-3">
                              <div className="bg-secondary/70 h-6 w-6 rounded-full mr-3"></div>
                              <div className="bg-secondary/70 h-4 w-1/3 rounded-sm"></div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;

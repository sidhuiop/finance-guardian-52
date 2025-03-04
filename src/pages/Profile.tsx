
import { useState } from 'react';
import { Helmet } from 'react-helmet';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { User, Mail, LogOut } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import FadeIn from '@/components/animations/FadeIn';

const Profile = () => {
  const { user, logout } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const handleLogout = () => {
    logout();
    toast({
      title: "Logged out",
      description: "You have been successfully logged out."
    });
    navigate('/');
  };

  return (
    <>
      <Helmet>
        <title>Profile | FinanceFlow</title>
        <meta name="description" content="View and manage your FinanceFlow profile settings." />
      </Helmet>
      
      <div className="min-h-screen flex flex-col">
        <Navbar />
        
        <main className="flex-grow pt-20 pb-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-8">
            <h1 className="text-3xl font-bold mb-8">Your Profile</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-1">
                <FadeIn>
                  <div className="bg-white rounded-xl shadow-soft border border-border/30 p-6">
                    <div className="flex flex-col items-center">
                      <div className="bg-primary/10 rounded-full p-8 mb-4">
                        <User className="h-12 w-12 text-primary" />
                      </div>
                      <h2 className="text-xl font-semibold">{user?.name}</h2>
                      <p className="text-muted-foreground mb-6">{user?.email}</p>
                      
                      <button 
                        onClick={handleLogout}
                        className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-red-200 text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                      >
                        <LogOut className="h-4 w-4" />
                        Sign Out
                      </button>
                    </div>
                  </div>
                </FadeIn>
              </div>
              
              <div className="md:col-span-2">
                <FadeIn delay={100}>
                  <div className="bg-white rounded-xl shadow-soft border border-border/30 p-6 mb-6">
                    <h2 className="text-xl font-semibold mb-4">Account Information</h2>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm text-muted-foreground">Name</label>
                        <div className="flex items-center mt-1 p-3 bg-secondary/50 rounded-lg">
                          <User className="h-4 w-4 text-muted-foreground mr-2" />
                          <span>{user?.name}</span>
                        </div>
                      </div>
                      
                      <div>
                        <label className="text-sm text-muted-foreground">Email</label>
                        <div className="flex items-center mt-1 p-3 bg-secondary/50 rounded-lg">
                          <Mail className="h-4 w-4 text-muted-foreground mr-2" />
                          <span>{user?.email}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </FadeIn>
                
                <FadeIn delay={200}>
                  <div className="bg-white rounded-xl shadow-soft border border-border/30 p-6">
                    <h2 className="text-xl font-semibold mb-4">Account Settings</h2>
                    <p className="text-muted-foreground mb-4">Account settings will be available in a future update.</p>
                    
                    <div className="flex items-center p-4 bg-blue-50 text-blue-800 rounded-lg">
                      <p className="text-sm">
                        This is a demo account. In a real application, you would be able to update your profile details, change password, and manage notification preferences.
                      </p>
                    </div>
                  </div>
                </FadeIn>
              </div>
            </div>
          </div>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default Profile;

import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { getSubscriptions, createSubscription, updateSubscription as apiUpdateSubscription, deleteSubscription as apiDeleteSubscription } from '../lib/api';
import { useAuth } from './AuthContext';

export interface Subscription {
  id: string;
  name: string;
  price: number;
  frequency: 'monthly' | 'yearly' | 'weekly';
  category: string;
  paymentMethod: string;
  startDate: string;
  nextRenewal: string;
  status: 'active' | 'cancelled' | 'expired';
  description?: string;
}

interface SubscriptionContextType {
  subscriptions: Subscription[];
  addSubscription: (subscription: Omit<Subscription, 'id'>) => void;
  updateSubscription: (id: string, subscription: Partial<Subscription>) => void;
  deleteSubscription: (id: string) => void;
  getTotalMonthlyCost: () => number;
  getTotalYearlyCost: () => number;
}

const SubscriptionContext = createContext<SubscriptionContextType | undefined>(undefined);

export const useSubscriptions = () => {
  const context = useContext(SubscriptionContext);
  if (context === undefined) {
    throw new Error('useSubscriptions must be used within a SubscriptionProvider');
  }
  return context;
};

interface SubscriptionProviderProps {
  children: ReactNode;
}

export const SubscriptionProvider = ({ children }: SubscriptionProviderProps) => {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      getSubscriptions().then(response => {
        setSubscriptions(response.data.data);
      });
    }
  }, [user]);

  const addSubscription = async (subscription: Omit<Subscription, 'id'>) => {
    const response = await createSubscription(subscription);
    setSubscriptions(prev => [...prev, response.data.data.subscription]);
  };

  const updateSubscription = async (id: string, updatedSubscription: Partial<Subscription>) => {
    const response = await apiUpdateSubscription(id, updatedSubscription);
    setSubscriptions(prev =>
      prev.map(sub => sub.id === id ? response.data.data : sub)
    );
  };

  const deleteSubscription = async (id: string) => {
    await apiDeleteSubscription(id);
    setSubscriptions(prev => prev.filter(sub => sub.id !== id));
  };

  const getTotalMonthlyCost = () => {
    return subscriptions
      .filter(sub => sub.status === 'active')
      .reduce((total, sub) => {
        if (sub.frequency === 'monthly') return total + sub.price;
        if (sub.frequency === 'yearly') return total + sub.price / 12;
        if (sub.frequency === 'weekly') return total + sub.price * 4.33;
        return total;
      }, 0);
  };

  const getTotalYearlyCost = () => {
    return getTotalMonthlyCost() * 12;
  };

  const value = {
    subscriptions,
    addSubscription,
    updateSubscription,
    deleteSubscription,
    getTotalMonthlyCost,
    getTotalYearlyCost
  };

  return (
    <SubscriptionContext.Provider value={value}>
      {children}
    </SubscriptionContext.Provider>
  );
};
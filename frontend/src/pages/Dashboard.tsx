import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Plus, 
  DollarSign, 
  TrendingUp, 
  Calendar, 
  Edit3, 
  Trash2,
  AlertCircle,
  CheckCircle
} from 'lucide-react';
import { useSubscriptions } from '@/contexts/SubscriptionContext';
import { useToast } from '@/hooks/use-toast';
import Layout from '@/components/Layout';

const Dashboard = () => {
  const { subscriptions, deleteSubscription, getTotalMonthlyCost, getTotalYearlyCost } = useSubscriptions();
  const { toast } = useToast();

  const handleDelete = (id: string, name: string) => {
    deleteSubscription(id);
    toast({
      title: "Subscription deleted",
      description: `${name} has been removed from your subscriptions`,
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-success text-success-foreground';
      case 'cancelled': return 'bg-destructive text-destructive-foreground';
      case 'expired': return 'bg-muted text-muted-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getFrequencyText = (frequency: string) => {
    switch (frequency) {
      case 'monthly': return 'Monthly';
      case 'yearly': return 'Yearly';
      case 'weekly': return 'Weekly';
      default: return frequency;
    }
  };

  const getDaysUntilRenewal = (renewalDate: string) => {
    const today = new Date();
    const renewal = new Date(renewalDate);
    const diffTime = renewal.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getUpcomingRenewals = () => {
    return subscriptions
      .filter(sub => sub.status === 'active')
      .map(sub => ({
        ...sub,
        daysUntil: getDaysUntilRenewal(sub.nextRenewal)
      }))
      .filter(sub => sub.daysUntil <= 7 && sub.daysUntil >= 0)
      .sort((a, b) => a.daysUntil - b.daysUntil);
  };

  const upcomingRenewals = getUpcomingRenewals();
  const totalMonthly = getTotalMonthlyCost();
  const totalYearly = getTotalYearlyCost();

  return (
    <Layout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
            <p className="text-muted-foreground">Overview of your subscription spending</p>
          </div>
          <Link to="/subscriptions/new">
            <Button variant="gradient" className="hover-glow">
              <Plus className="w-4 h-4 mr-2" />
              Add Subscription
            </Button>
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="hover-lift">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Monthly Spending</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold gradient-primary bg-clip-text text-transparent">
                ${totalMonthly.toFixed(2)}
              </div>
              <p className="text-xs text-muted-foreground">
                Active subscriptions only
              </p>
            </CardContent>
          </Card>

          <Card className="hover-lift">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Yearly Projection</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">
                ${totalYearly.toFixed(2)}
              </div>
              <p className="text-xs text-muted-foreground">
                Based on current subscriptions
              </p>
            </CardContent>
          </Card>

          <Card className="hover-lift">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Subscriptions</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">
                {subscriptions.filter(sub => sub.status === 'active').length}
              </div>
              <p className="text-xs text-muted-foreground">
                Total: {subscriptions.length} subscriptions
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Upcoming Renewals Alert */}
        {upcomingRenewals.length > 0 && (
          <Card className="border-warning bg-warning/5">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <AlertCircle className="w-5 h-5 text-warning" />
                <span>Upcoming Renewals</span>
              </CardTitle>
              <CardDescription>
                You have {upcomingRenewals.length} subscription{upcomingRenewals.length > 1 ? 's' : ''} renewing in the next 7 days
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {upcomingRenewals.map((sub) => (
                  <div key={sub.id} className="flex items-center justify-between p-3 bg-background rounded-lg">
                    <div>
                      <p className="font-medium">{sub.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {sub.daysUntil === 0 ? 'Renews today' : 
                         sub.daysUntil === 1 ? 'Renews tomorrow' :
                         `Renews in ${sub.daysUntil} days`}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">${sub.price}</p>
                      <p className="text-sm text-muted-foreground">{getFrequencyText(sub.frequency)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Subscriptions List */}
        <Card>
          <CardHeader>
            <CardTitle>Your Subscriptions</CardTitle>
            <CardDescription>
              Manage all your recurring subscriptions in one place
            </CardDescription>
          </CardHeader>
          <CardContent>
            {subscriptions.length === 0 ? (
              <div className="text-center py-8">
                <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No subscriptions yet</h3>
                <p className="text-muted-foreground mb-4">
                  Start by adding your first subscription to track your spending
                </p>
                <Link to="/subscriptions/new">
                  <Button variant="gradient">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Your First Subscription
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {subscriptions.map((subscription) => (
                  <div key={subscription.id} className="flex items-center justify-between p-4 border rounded-lg hover:shadow-soft transition-smooth">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="font-semibold text-lg">{subscription.name}</h3>
                        <Badge className={getStatusColor(subscription.status)}>
                          {subscription.status}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-muted-foreground">
                        <div>
                          <span className="font-medium">Price:</span> ${subscription.price}
                        </div>
                        <div>
                          <span className="font-medium">Frequency:</span> {getFrequencyText(subscription.frequency)}
                        </div>
                        <div>
                          <span className="font-medium">Category:</span> {subscription.category}
                        </div>
                        <div>
                          <span className="font-medium">Next Renewal:</span> {new Date(subscription.nextRenewal).toLocaleDateString()}
                        </div>
                      </div>
                      {subscription.description && (
                        <p className="text-sm text-muted-foreground mt-2">{subscription.description}</p>
                      )}
                    </div>
                    <div className="flex items-center space-x-2 ml-4">
                      <Link to={`/subscriptions/${subscription.id}/edit`}>
                        <Button variant="ghost" size="sm">
                          <Edit3 className="w-4 h-4" />
                        </Button>
                      </Link>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => handleDelete(subscription.id, subscription.name)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Dashboard;
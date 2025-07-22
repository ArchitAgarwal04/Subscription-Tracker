import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft } from 'lucide-react';
import { useSubscriptions } from '@/contexts/SubscriptionContext';
import { useToast } from '@/hooks/use-toast';
import Layout from '@/components/Layout';

const AddSubscription = () => {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    frequency: '',
    category: '',
    paymentMethod: '',
    startDate: '',
    description: ''
  });
  const [loading, setLoading] = useState(false);
  const { addSubscription, updateSubscription, subscriptions } = useSubscriptions();
  const { toast } = useToast();
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = Boolean(id);
  const subscription = subscriptions.find(sub => sub.id === id);

  useEffect(() => {
    if (isEdit && subscription) {
      setFormData({
        name: subscription.name,
        price: subscription.price.toString(),
        frequency: subscription.frequency,
        category: subscription.category,
        paymentMethod: subscription.paymentMethod,
        startDate: subscription.startDate,
        description: subscription.description || ''
      });
    }
  }, [isEdit, subscription]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const calculateNextRenewal = (startDate: string, frequency: string) => {
    const start = new Date(startDate);
    const next = new Date(start);
    
    switch (frequency) {
      case 'weekly':
        next.setDate(start.getDate() + 7);
        break;
      case 'monthly':
        next.setMonth(start.getMonth() + 1);
        break;
      case 'yearly':
        next.setFullYear(start.getFullYear() + 1);
        break;
    }
    
    return next.toISOString().split('T')[0];
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.price || !formData.frequency || !formData.category || !formData.startDate) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    if (isNaN(Number(formData.price)) || Number(formData.price) <= 0) {
      toast({
        title: "Error",
        description: "Please enter a valid price",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const nextRenewal = calculateNextRenewal(formData.startDate, formData.frequency);
      
      const subscriptionData = {
        name: formData.name,
        price: Number(formData.price),
        frequency: formData.frequency as 'monthly' | 'yearly' | 'weekly',
        category: formData.category,
        paymentMethod: formData.paymentMethod || 'Not specified',
        startDate: formData.startDate,
        nextRenewal,
        status: 'active' as const,
        description: formData.description
      };

      if (isEdit && id) {
        updateSubscription(id, subscriptionData);
        toast({
          title: "Subscription updated!",
          description: `${formData.name} has been updated successfully`,
        });
      } else {
        addSubscription(subscriptionData);
        toast({
          title: "Subscription added!",
          description: `${formData.name} has been added to your subscriptions`,
        });
      }
      
      navigate('/dashboard');
    } catch (error) {
      toast({
        title: "Error",
        description: `Failed to ${isEdit ? 'update' : 'add'} subscription. Please try again.`,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const categories = [
    'Entertainment',
    'Software',
    'Music',
    'Productivity',
    'Cloud Storage',
    'News & Media',
    'Gaming',
    'Health & Fitness',
    'Education',
    'Business',
    'Other'
  ];

  const paymentMethods = [
    'Credit Card',
    'Debit Card',
    'PayPal',
    'Bank Transfer',
    'Apple Pay',
    'Google Pay',
    'Other'
  ];

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center space-x-4">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => navigate('/dashboard')}
            className="flex items-center space-x-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Dashboard</span>
          </Button>
        </div>

        <Card className="max-w-2xl mx-auto shadow-large">
          <CardHeader>
            <CardTitle className="text-2xl">
              {isEdit ? 'Edit Subscription' : 'Add New Subscription'}
            </CardTitle>
            <CardDescription>
              {isEdit 
                ? 'Update your subscription details and renewal preferences'
                : 'Track a new recurring subscription and get renewal reminders'
              }
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Basic Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Service Name *</Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="e.g., Netflix, Spotify"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="price">Price *</Label>
                  <Input
                    id="price"
                    name="price"
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    value={formData.price}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="frequency">Billing Frequency *</Label>
                  <Select value={formData.frequency} onValueChange={(value) => handleSelectChange('frequency', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select frequency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                      <SelectItem value="yearly">Yearly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="category">Category *</Label>
                  <Select value={formData.category} onValueChange={(value) => handleSelectChange('category', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>{category}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="startDate">Start Date *</Label>
                  <Input
                    id="startDate"
                    name="startDate"
                    type="date"
                    value={formData.startDate}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="paymentMethod">Payment Method</Label>
                  <Select value={formData.paymentMethod} onValueChange={(value) => handleSelectChange('paymentMethod', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select payment method" />
                    </SelectTrigger>
                    <SelectContent>
                      {paymentMethods.map((method) => (
                        <SelectItem key={method} value={method}>{method}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description (Optional)</Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Add any notes about this subscription"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={3}
                />
              </div>

              <div className="flex gap-4 pt-4">
                <Button 
                  type="button" 
                  variant="outline" 
                  className="flex-1"
                  onClick={() => navigate('/dashboard')}
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  variant="gradient" 
                  className="flex-1" 
                  disabled={loading}
                >
                  {loading 
                    ? (isEdit ? 'Updating...' : 'Adding...') 
                    : (isEdit ? 'Update Subscription' : 'Add Subscription')}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default AddSubscription;
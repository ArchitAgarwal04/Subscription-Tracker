import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  CreditCard, 
  Bell, 
  BarChart3, 
  Shield, 
  ArrowRight, 
  CheckCircle, 
  Sparkles,
  DollarSign,
  Calendar,
  Zap
} from 'lucide-react';

const Landing = () => {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Subtle background patterns */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(0,0,0,0.01),transparent_50%)] pointer-events-none"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(0,0,0,0.01),transparent_50%)] pointer-events-none"></div>
      
      {/* Hero Section */}
      <div className="relative">
        {/* Navigation */}
        <nav className="mx-auto max-w-7xl px-6 lg:px-8 py-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 gradient-primary rounded-xl flex items-center justify-center shadow-medium">
                <CreditCard className="w-5 h-5 text-white" />
              </div>
              <span className="text-2xl font-serif font-semibold text-foreground">SubTracker</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/signin">
                <Button variant="ghost" className="font-medium">Sign In</Button>
              </Link>
              <Link to="/signup">
                <Button className="font-medium shadow-medium hover:shadow-large">
                  Get Started
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </nav>

        {/* Hero Content */}
        <div className="mx-auto max-w-7xl px-6 lg:px-8 pb-20 pt-12">
          <div className="text-center max-w-4xl mx-auto">
            <div className="flex justify-center mb-8">
              <div className="flex items-center space-x-2 bg-secondary rounded-full px-6 py-3 shadow-soft animate-fade-in">
                <Sparkles className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-secondary-foreground">
                  Never miss a subscription renewal again
                </span>
              </div>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-serif font-bold text-foreground mb-8 animate-slide-up">
              Subscription
              <br />
              <span className="text-gradient">Management</span>
              <br />
              Made Simple
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed animate-fade-in font-light">
              Track all your recurring subscriptions, get intelligent reminders before renewals, 
              and take complete control of your monthly spending with our elegant dashboard.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-scale-in">
              <Link to="/signup">
                <Button size="lg" className="text-lg px-8 py-4 h-auto font-semibold shadow-large hover:shadow-xl hover-float">
                  Start Free Trial
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link to="/signin">
                <Button variant="outline" size="lg" className="text-lg px-8 py-4 h-auto font-medium border-2 hover:bg-muted/50">
                  View Demo
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-16 border-t border-border/50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="animate-fade-in">
              <div className="text-4xl font-bold text-foreground mb-2">10,000+</div>
              <div className="text-muted-foreground font-medium">Active Users</div>
            </div>
            <div className="animate-fade-in">
              <div className="text-4xl font-bold text-foreground mb-2">$2.5M+</div>
              <div className="text-muted-foreground font-medium">Savings Tracked</div>
            </div>
            <div className="animate-fade-in">
              <div className="text-4xl font-bold text-foreground mb-2">99.9%</div>
              <div className="text-muted-foreground font-medium">Uptime</div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-muted/30">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-6">
              Everything you need to manage subscriptions
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-light">
              Powerful features designed to give you complete control over your recurring payments
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="hover-float border-0 shadow-medium bg-card/50 backdrop-blur-sm">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-medium">
                  <CreditCard className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-card-foreground">Smart Tracking</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Automatically organize and categorize all your recurring subscriptions in one beautiful dashboard
                </p>
              </CardContent>
            </Card>

            <Card className="hover-float border-0 shadow-medium bg-card/50 backdrop-blur-sm">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-accent rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-medium">
                  <Bell className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-card-foreground">Intelligent Alerts</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Receive personalized email reminders at 7, 5, 2, and 1 days before each renewal
                </p>
              </CardContent>
            </Card>

            <Card className="hover-float border-0 shadow-medium bg-card/50 backdrop-blur-sm">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-success rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-medium">
                  <BarChart3 className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-card-foreground">Spending Insights</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Visualize your spending patterns with beautiful charts and detailed analytics
                </p>
              </CardContent>
            </Card>

            <Card className="hover-float border-0 shadow-medium bg-card/50 backdrop-blur-sm">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-warning rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-medium">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-card-foreground">Bank-Grade Security</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Your data is encrypted and protected with enterprise-level security measures
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Dashboard Preview */}
      <div className="py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-8">
                Take control of your financial future
              </h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <CheckCircle className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Never forget a renewal</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Automated email reminders ensure you're always prepared for upcoming charges
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <DollarSign className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Save money effortlessly</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Identify unused subscriptions and cancel before the next billing cycle
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Calendar className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Budget with confidence</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Track your total monthly and yearly subscription costs with precise accuracy
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Zap className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Stay perfectly organized</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Categorize and manage all subscriptions from one centralized dashboard
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="order-1 lg:order-2">
              <Card className="shadow-xl border-0 bg-gradient-card overflow-hidden">
                <CardContent className="p-8">
                  <div className="space-y-6">
                    <div className="flex justify-between items-center p-6 bg-muted/50 rounded-xl border">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-destructive rounded-xl flex items-center justify-center">
                          <span className="text-white font-bold text-lg">N</span>
                        </div>
                        <div>
                          <p className="font-semibold text-lg">Netflix Premium</p>
                          <p className="text-sm text-muted-foreground">Renews in 3 days</p>
                        </div>
                      </div>
                      <span className="text-xl font-bold">$15.99</span>
                    </div>
                    
                    <div className="flex justify-between items-center p-6 bg-muted/50 rounded-xl border">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-success rounded-xl flex items-center justify-center">
                          <span className="text-white font-bold text-lg">S</span>
                        </div>
                        <div>
                          <p className="font-semibold text-lg">Spotify Premium</p>
                          <p className="text-sm text-muted-foreground">Renews in 12 days</p>
                        </div>
                      </div>
                      <span className="text-xl font-bold">$9.99</span>
                    </div>
                    
                    <div className="flex justify-between items-center p-6 bg-muted/50 rounded-xl border">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 gradient-primary rounded-xl flex items-center justify-center">
                          <span className="text-white font-bold text-lg">A</span>
                        </div>
                        <div>
                          <p className="font-semibold text-lg">Adobe Creative Cloud</p>
                          <p className="text-sm text-muted-foreground">Renews in 25 days</p>
                        </div>
                      </div>
                      <span className="text-xl font-bold">$52.99</span>
                    </div>
                    
                    <div className="pt-6 border-t border-border/50">
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-semibold">Monthly Total</span>
                        <span className="text-3xl font-bold text-gradient font-serif">
                          $78.97
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 bg-foreground text-background relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_70%)] pointer-events-none"></div>
        <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center relative">
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">
            Ready to take control?
          </h2>
          <p className="text-xl mb-12 opacity-90 font-light max-w-2xl mx-auto">
            Join thousands of users who never miss a subscription renewal and save money every month
          </p>
          <Link to="/signup">
            <Button 
              size="lg" 
              variant="secondary" 
              className="text-lg px-8 py-4 h-auto font-semibold shadow-xl hover:shadow-2xl hover-float"
            >
              Start Free Today
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-12 border-t border-border/50 bg-muted/20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 gradient-primary rounded-lg flex items-center justify-center">
                <CreditCard className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-serif font-semibold text-foreground">SubTracker</span>
            </div>
            <p className="text-muted-foreground">
              © 2024 SubTracker. Never miss a subscription again.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
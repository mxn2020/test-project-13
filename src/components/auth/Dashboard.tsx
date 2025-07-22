import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSession, signOut } from '../../lib/auth-client';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '../ui/avatar';
import { Separator } from '../ui/separator';
import { LogOut, User, Mail, Calendar, Shield, Home, Heart, Activity, Stethoscope, Clock, FileText, Video, Bell } from 'lucide-react';
import { Container } from '../../lib/dev-container';

export const Dashboard: React.FC = () => {
  const { data: session, isPending } = useSession();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut();
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const getUserInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  if (isPending) {
    return (
      <Container componentId="dashboard-loading">
        <div className="min-h-screen flex items-center justify-center bg-medical-light/20">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-medical-primary mx-auto mb-4"></div>
            <p className="text-medical-muted">Loading your health dashboard...</p>
          </div>
        </div>
      </Container>
    );
  }

  if (!session) {
    return (
      <Container componentId="dashboard-unauthorized">
        <div className="min-h-screen flex items-center justify-center bg-medical-light/20">
          <Card className="w-full max-w-md">
            <CardContent className="pt-6">
              <div className="text-center">
                <Shield className="h-12 w-12 text-medical-primary mx-auto mb-4" />
                <h2 className="text-xl font-semibold mb-2 text-medical-dark">Access Denied</h2>
                <p className="text-medical-muted mb-4">
                  Please log in to access your health dashboard.
                </p>
                <Button onClick={() => navigate('/login')} className="w-full bg-medical-primary hover:bg-medical-primary/90">
                  Go to Login
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </Container>
    );
  }

  const user = session.user;

  return (
    <Container componentId="dashboard-page">
      <div className="min-h-screen bg-medical-light/10">
        <Container componentId="dashboard-header">
          <div className="bg-white shadow-sm border-b border-medical-light">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center h-16">
                <div className="flex items-center">
                  <Heart className="h-6 w-6 text-medical-primary mr-2" />
                  <h1 className="text-xl font-semibold text-medical-dark">
                    Health Dashboard
                  </h1>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    onClick={() => navigate('/')}
                    className="flex items-center gap-2 text-medical-dark hover:text-medical-primary"
                  >
                    <Home className="h-4 w-4" />
                    Back to Home
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={handleLogout}
                    className="flex items-center gap-2 text-medical-dark hover:text-medical-primary"
                  >
                    <LogOut className="h-4 w-4" />
                    Logout
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Container>

        <Container componentId="dashboard-content">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              
              {/* Patient Profile Card */}
              <Container componentId="patient-profile-card">
                <Card className="lg:col-span-1">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-medical-dark">
                      <User className="h-5 w-5" />
                      Patient Profile
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center space-x-4">
                      <Avatar className="h-16 w-16">
                        <AvatarImage src={user.image || undefined} alt={user.name || 'Patient'} />
                        <AvatarFallback className="text-lg bg-medical-primary text-white">
                          {getUserInitials(user.name || 'P')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold text-lg text-medical-dark">{user.name}</h3>
                        <p className="text-sm text-medical-muted">
                          {user.email}
                        </p>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4 text-medical-muted" />
                          <span className="text-sm text-medical-dark">Email Status</span>
                        </div>
                        <Badge variant={user.emailVerified ? "default" : "secondary"} className={user.emailVerified ? "bg-medical-success" : ""}>
                          {user.emailVerified ? "Verified" : "Unverified"}
                        </Badge>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-medical-muted" />
                          <span className="text-sm text-medical-dark">Patient since</span>
                        </div>
                        <span className="text-sm text-medical-muted">
                          {new Date(user.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Container>

              {/* Main Dashboard Content */}
              <Container componentId="dashboard-main-content">
                <div className="lg:col-span-3 space-y-6">
                  
                  {/* Welcome Card */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-medical-dark">Welcome back, {user.name?.split(' ')[0] || 'Patient'}!</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-medical-muted mb-4">
                        Your health journey continues here. Access your medical records, schedule appointments, 
                        and connect with your healthcare team.
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <Card className="border-medical-light">
                          <CardContent className="pt-6">
                            <div className="text-center">
                              <div className="text-2xl font-bold text-medical-primary">
                                {Math.floor((Date.now() - new Date(user.createdAt).getTime()) / (1000 * 60 * 60 * 24))}
                              </div>
                              <p className="text-sm text-medical-muted">Days as patient</p>
                            </div>
                          </CardContent>
                        </Card>
                        <Card className="border-medical-light">
                          <CardContent className="pt-6">
                            <div className="text-center">
                              <div className="text-2xl font-bold text-medical-success">
                                Healthy
                              </div>
                              <p className="text-sm text-medical-muted">Current status</p>
                            </div>
                          </CardContent>
                        </Card>
                        <Card className="border-medical-light">
                          <CardContent className="pt-6">
                            <div className="text-center">
                              <div className="text-2xl font-bold text-medical-accent">
                                0
                              </div>
                              <p className="text-sm text-medical-muted">Pending tasks</p>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Quick Actions */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-medical-dark">Quick Actions</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <Button className="h-20 flex flex-col items-center justify-center bg-medical-primary hover:bg-medical-primary/90 text-white">
                          <Calendar className="h-6 w-6 mb-2" />
                          <span className="text-sm">Book Appointment</span>
                        </Button>
                        <Button className="h-20 flex flex-col items-center justify-center bg-medical-secondary hover:bg-medical-secondary/90 text-white">
                          <Video className="h-6 w-6 mb-2" />
                          <span className="text-sm">Telemedicine</span>
                        </Button>
                        <Button className="h-20 flex flex-col items-center justify-center bg-medical-accent hover:bg-medical-accent/90 text-white">
                          <FileText className="h-6 w-6 mb-2" />
                          <span className="text-sm">Medical Records</span>
                        </Button>
                        <Button className="h-20 flex flex-col items-center justify-center bg-medical-success hover:bg-medical-success/90 text-white">
                          <Activity className="h-6 w-6 mb-2" />
                          <span className="text-sm">Health Metrics</span>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Health Overview */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-medical-dark">
                          <Stethoscope className="h-5 w-5" />
                          Upcoming Appointments
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-center py-8">
                          <Calendar className="h-12 w-12 text-medical-muted mx-auto mb-4" />
                          <p className="text-medical-muted">No upcoming appointments</p>
                          <Button className="mt-4 bg-medical-primary hover:bg-medical-primary/90">
                            Schedule Appointment
                          </Button>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-medical-dark">
                          <Bell className="h-5 w-5" />
                          Health Reminders
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between py-2 border-b border-medical-light">
                            <div className="flex items-center gap-3">
                              <div className="w-2 h-2 bg-medical-primary rounded-full"></div>
                              <span className="text-sm text-medical-dark">Annual checkup due</span>
                            </div>
                            <span className="text-sm text-medical-muted">
                              Next month
                            </span>
                          </div>
                          <div className="flex items-center justify-between py-2 border-b border-medical-light">
                            <div className="flex items-center gap-3">
                              <div className="w-2 h-2 bg-medical-success rounded-full"></div>
                              <span className="text-sm text-medical-dark">Vaccination up to date</span>
                            </div>
                            <span className="text-sm text-medical-muted">
                              Current
                            </span>
                          </div>
                          <div className="flex items-center justify-between py-2">
                            <div className="flex items-center gap-3">
                              <div className="w-2 h-2 bg-medical-accent rounded-full"></div>
                              <span className="text-sm text-medical-dark">Health screening recommended</span>
                            </div>
                            <span className="text-sm text-medical-muted">
                              Schedule
                            </span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Recent Activity */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-medical-dark">Recent Activity</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between py-2">
                          <div className="flex items-center gap-3">
                            <div className="w-2 h-2 bg-medical-success rounded-full"></div>
                            <span className="text-sm text-medical-dark">Successfully logged in</span>
                          </div>
                          <span className="text-sm text-medical-muted">
                            {new Date().toLocaleTimeString()}
                          </span>
                        </div>
                        <div className="flex items-center justify-between py-2">
                          <div className="flex items-center gap-3">
                            <div className="w-2 h-2 bg-medical-primary rounded-full"></div>
                            <span className="text-sm text-medical-dark">Health dashboard accessed</span>
                          </div>
                          <span className="text-sm text-medical-muted">
                            {new Date().toLocaleTimeString()}
                          </span>
                        </div>
                        <div className="flex items-center justify-between py-2">
                          <div className="flex items-center gap-3">
                            <div className="w-2 h-2 bg-medical-accent rounded-full"></div>
                            <span className="text-sm text-medical-dark">Profile updated</span>
                          </div>
                          <span className="text-sm text-medical-muted">
                            {new Date(user.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </Container>
            </div>
          </div>
        </Container>
      </div>
    </Container>
  );
};
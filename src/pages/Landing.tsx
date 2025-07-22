// src/pages/Landing.tsx

import React, { useState, useEffect } from 'react';
import { Heart, Stethoscope, Calendar, Users, Star, User, Shield, Activity, BookOpen, Video, Clock, Award } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Container, Button, Card, CardContent, Badge, Header, Nav, Section, Span, H1, H2, P, Div, Footer } from '../lib/dev-container';
import { useAuth } from '../components/auth/AuthProvider';
import type { ComponentRegistryId } from '../registry/componentRegistry';

// Helper functions to ensure type safety for dynamic IDs
const getStatCardId = (index: number): ComponentRegistryId => {
  const ids: ComponentRegistryId[] = ['stat-card-0', 'stat-card-1', 'stat-card-2', 'stat-card-3'];
  return ids[index] || 'noID';
};

const getFeatureCardId = (index: number): ComponentRegistryId => {
  const ids: ComponentRegistryId[] = ['feature-card-0', 'feature-card-1', 'feature-card-2', 'feature-card-3'];
  return ids[index] || 'noID';
};

const getServiceLetterId = (index: number): ComponentRegistryId => {
  const ids: ComponentRegistryId[] = ['service-letter-0', 'service-letter-1', 'service-letter-2', 'service-letter-3', 'service-letter-4', 'service-letter-5'];
  return ids[index] || 'noID';
};

const getServiceBadgeId = (index: number): ComponentRegistryId => {
  const ids: ComponentRegistryId[] = ['service-badge-0', 'service-badge-1', 'service-badge-2', 'service-badge-3', 'service-badge-4', 'service-badge-5'];
  return ids[index] || 'noID';
};

export const Landing: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  const { isAuthenticated, user } = useAuth();

  useEffect(() => {
    setMounted(true);
  }, []);

  const features = [
    {
      icon: <Calendar className="w-8 h-8 text-medical-primary" />,
      title: "Smart Scheduling",
      description: "Book appointments instantly with our AI-powered scheduling system that finds the perfect time for you"
    },
    {
      icon: <Video className="w-8 h-8 text-medical-secondary" />,
      title: "Telemedicine",
      description: "Connect with healthcare providers from anywhere with secure video consultations and remote monitoring"
    },
    {
      icon: <Activity className="w-8 h-8 text-medical-accent" />,
      title: "Health Tracking",
      description: "Monitor your vital signs, medications, and health metrics with comprehensive tracking tools"
    },
    {
      icon: <BookOpen className="w-8 h-8 text-medical-success" />,
      title: "Health Education",
      description: "Access evidence-based health content, preventive care guides, and wellness programs"
    }
  ];

  const stats = [
    { label: "Patients Served", value: "50K+" },
    { label: "Success Rate", value: "98%" },
    { label: "Avg Response", value: "< 2min" },
    { label: "Satisfaction", value: "4.9★" }
  ];

  return (
    <Container componentId="landing-page-root">
      <Div 
        devId="main-wrapper" 
        devName="Main Wrapper" 
        devDescription="Main page wrapper with medical gradient background"
        className="min-h-screen bg-gradient-to-br from-medical-light via-white to-medical-light/30"
      >
      {/* Header */}
      <Header 
        devId="main-header" 
        devName="Main Header" 
        devDescription="Primary medical platform header with navigation"
        className="container mx-auto px-4 py-6"
      >
        <Nav 
          devId="main-nav" 
          devName="Main Navigation" 
          devDescription="Primary navigation bar for medical platform"
          className="flex items-center justify-between"
        >
          <Div 
            devId="logo-section" 
            devName="Logo Section" 
            devDescription="Medical platform logo and brand name"
            className="flex items-center space-x-2"
          >
            <Div devId="noID" className="w-8 h-8 bg-gradient-to-r from-medical-primary to-medical-secondary rounded-lg flex items-center justify-center">
              <Heart className="w-5 h-5 text-white" />
            </Div>
            <Span 
              devId="brand-name" 
              devName="Brand Name" 
              devDescription="Doctor Mike Health Platform brand name"
              className="text-xl font-bold text-medical-dark"
            >
              Doctor Mike Health
            </Span>
          </Div>
          <Div 
            devId="nav-actions" 
            devName="Navigation Actions" 
            devDescription="Navigation buttons and user menu for medical platform"
            className="flex items-center space-x-4"
          >
            <Button 
              devId="health-resources-button" 
              devName="Health Resources Button" 
              devDescription="Link to health resources and education"
              variant="ghost" 
              className="text-medical-dark hover:text-medical-primary transition-colors"
            >
              Health Resources
            </Button>
            {isAuthenticated ? (
              <Div 
                devId="user-section" 
                devName="User Section" 
                devDescription="Authenticated patient welcome area"
                className="flex items-center space-x-4"
              >
                <Span 
                  devId="welcome-message" 
                  devName="Welcome Message" 
                  devDescription="Welcome message for authenticated patient"
                  className="text-medical-dark"
                >
                  Welcome, {user?.name?.split(' ')[0]}!
                </Span>
                <Link to="/dashboard">
                  <Button 
                    devId="nav-dashboard-button"
                    devName="Navigation Dashboard Button"
                    devDescription="Patient dashboard button in navigation header"
                    className="bg-medical-primary hover:bg-medical-primary/90 text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    <User className="w-4 h-4 mr-2" />
                    My Health
                  </Button>
                </Link>
              </Div>
            ) : (
              <Div 
                devId="auth-buttons" 
                devName="Authentication Buttons" 
                devDescription="Login and register buttons for new patients"
                className="flex items-center space-x-2"
              >
                <Link to="/login">
                  <Button 
                    devId="nav-login-button"
                    devName="Navigation Login Button"
                    devDescription="Patient login button in navigation header"
                    variant="ghost" 
                    className="text-medical-dark hover:text-medical-primary transition-colors"
                  >
                    Login
                  </Button>
                </Link>
                <Link to="/register">
                  <Button 
                    devId="nav-register-button"
                    devName="Navigation Register Button"
                    devDescription="Get started button for new patients"
                    className="bg-medical-primary hover:bg-medical-primary/90 text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    Get Started
                  </Button>
                </Link>
              </Div>
            )}
          </Div>
        </Nav>
      </Header>

      {/* Hero Section */}
      <Container componentId="hero-section">
        <Section 
          devId="hero-content" 
          devName="Hero Content" 
          devDescription="Main hero section with medical platform introduction"
          className="container mx-auto px-4 py-20 text-center"
        >
          <Div 
            devId="hero-content-wrapper" 
            devName="Hero Content Wrapper" 
            devDescription="Animated wrapper for hero content"
            className={`transition-all duration-1000 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          >
            <H1 
              devId="hero-title" 
              devName="Hero Title" 
              devDescription="Main hero title for Doctor Mike Health Platform"
              className="text-5xl md:text-7xl font-bold text-medical-dark mb-6"
            >
              Your Health, 
              <Span 
                devId="simplified-highlight" 
                devName="Simplified Highlight" 
                devDescription="Highlighted 'Simplified' text in medical gradient"
                className="bg-gradient-to-r from-medical-primary to-medical-secondary bg-clip-text text-transparent"
              >
                {' '}Simplified
              </Span>
            </H1>
            <P 
              devId="hero-description" 
              devName="Hero Description" 
              devDescription="Hero section description explaining the medical platform benefits"
              className="text-xl text-medical-muted mb-8 max-w-2xl mx-auto"
            >
              Experience modern healthcare with evidence-based medicine, preventive care, 
              and personalized treatment plans. Your health journey starts here.
            </P>
            <Div 
              devId="hero-cta-buttons" 
              devName="Hero CTA Buttons" 
              devDescription="Call-to-action buttons in hero section"
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              {isAuthenticated ? (
                <Link to="/dashboard">
                  <Button 
                    devId="hero-start-journey"
                    devName="Start Health Journey Button"
                    devDescription="Primary call-to-action button for starting health journey"
                    className="bg-gradient-to-r from-medical-primary to-medical-secondary hover:from-medical-primary/90 hover:to-medical-secondary/90 text-white px-8 py-3 rounded-lg font-semibold transition-all transform hover:scale-105"
                  >
                    Go to Dashboard
                  </Button>
                </Link>
              ) : (
                <Link to="/register">
                  <Button 
                    devId="hero-start-journey"
                    devName="Start Health Journey Button"
                    devDescription="Primary call-to-action button for starting health journey"
                    className="bg-gradient-to-r from-medical-primary to-medical-secondary hover:from-medical-primary/90 hover:to-medical-secondary/90 text-white px-8 py-3 rounded-lg font-semibold transition-all transform hover:scale-105"
                  >
                    Start Your Health Journey
                  </Button>
                </Link>
              )}
              <Button 
                devId="hero-learn-more-button"
                devName="Learn More Button"
                devDescription="Secondary button to learn more about the platform"
                variant="outline"
                className="border border-medical-primary text-medical-primary hover:bg-medical-primary hover:text-white px-8 py-3 rounded-lg font-semibold transition-all"
              >
                Learn More
              </Button>
            </Div>
          </Div>
        </Section>
      </Container>

      {/* Stats Section */}
      <Container componentId="stats-section">
        <Section 
          devId="stats-content" 
          devName="Stats Content" 
          devDescription="Statistics section showing medical platform metrics"
          className="container mx-auto px-4 py-12"
        >
          <Div 
            devId="stats-grid" 
            devName="Stats Grid" 
            devDescription="Grid container for medical statistics cards"
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            {stats.map((stat, index) => (
              <Card 
                key={index} 
                devId={getStatCardId(index)}
                devName={`${stat.label} Stat Card`}
                devDescription={`Medical statistical card showing ${stat.label}: ${stat.value}`}
                className="bg-white/80 backdrop-blur-sm rounded-xl p-6 text-center border border-medical-light shadow-lg"
              >
                <CardContent devId="noID" className="p-0">
                  <Div devId="noID" className="text-2xl font-bold text-medical-primary mb-2">{stat.value}</Div>
                  <Div devId="noID" className="text-medical-muted">{stat.label}</Div>
                </CardContent>
              </Card>
            ))}
          </Div>
        </Section>
      </Container>

      {/* Features Section */}
      <Container componentId="features-section">
        <Section devId="noID" className="container mx-auto px-4 py-20">
          <Div devId="noID" className="text-center mb-16">
            <H2 devId="noID" className="text-4xl font-bold text-medical-dark mb-4">Why Choose Our Platform?</H2>
            <P devId="noID" className="text-medical-muted max-w-2xl mx-auto">
              Modern healthcare technology designed to make your health management simple, effective, and accessible
            </P>
          </Div>
          <Div devId="noID" className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card 
                key={index} 
                devId={getFeatureCardId(index)}
                devName={`${feature.title} Feature Card`}
                devDescription={`Feature card highlighting ${feature.title}: ${feature.description}`}
                className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-medical-light hover:border-medical-primary/50 transition-all shadow-lg hover:shadow-xl"
              >
                <CardContent devId="noID" className="p-0">
                  <Div devId="noID" className="mb-4">{feature.icon}</Div>
                  <h3 className="text-xl font-semibold text-medical-dark mb-2">{feature.title}</h3>
                  <P devId="noID" className="text-medical-muted">{feature.description}</P>
                </CardContent>
              </Card>
            ))}
          </Div>
        </Section>
      </Container>

      {/* Services Section */}
      <Container componentId="services-section">
        <Section devId="noID" className="container mx-auto px-4 py-20">
          <Div devId="noID" className="text-center mb-16">
            <H2 devId="noID" className="text-4xl font-bold text-medical-dark mb-4">Comprehensive Healthcare Services</H2>
            <P devId="noID" className="text-medical-muted max-w-2xl mx-auto">
              From preventive care to specialized treatments, we provide evidence-based healthcare solutions
            </P>
          </Div>
          <Div devId="noID" className="grid grid-cols-2 md:grid-cols-6 gap-8">
            {[
              { name: "Primary Care", color: "from-medical-primary to-medical-primary/80" },
              { name: "Cardiology", color: "from-red-500 to-red-600" },
              { name: "Dermatology", color: "from-medical-secondary to-medical-secondary/80" },
              { name: "Mental Health", color: "from-purple-500 to-purple-600" },
              { name: "Pediatrics", color: "from-medical-accent to-medical-accent/80" },
              { name: "Wellness", color: "from-medical-success to-medical-success/80" }
            ].map((service, index) => (
              <Div key={index} devId="noID" className="text-center">
                <Div devId={getServiceLetterId(index)} className={`w-16 h-16 mx-auto mb-3 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center`}>
                  <span className="text-white font-bold text-lg">{service.name[0]}</span>
                </Div>
                <Badge 
                  devId={getServiceBadgeId(index)}
                  devName={`${service.name} Service Badge`}
                  devDescription={`Service badge for ${service.name}`}
                  className="text-medical-dark font-medium bg-transparent border-none"
                >
                  {service.name}
                </Badge>
              </Div>
            ))}
          </Div>
        </Section>
      </Container>

      {/* Trust Section */}
      <Container componentId="trust-section">
        <Section devId="noID" className="container mx-auto px-4 py-20">
          <Div devId="noID" className="bg-gradient-to-r from-medical-primary/10 to-medical-secondary/10 rounded-2xl p-12 text-center border border-medical-primary/20">
            <Div devId="noID" className="flex justify-center mb-6">
              <Shield className="w-16 h-16 text-medical-primary" />
            </Div>
            <H2 devId="noID" className="text-4xl font-bold text-medical-dark mb-4">Trusted Healthcare, Delivered</H2>
            <P devId="noID" className="text-medical-muted mb-8 max-w-2xl mx-auto">
              Board-certified physicians, evidence-based treatments, and HIPAA-compliant security. 
              Your health and privacy are our top priorities.
            </P>
            <Div devId="noID" className="flex flex-wrap justify-center gap-6 mb-8">
              <Div devId="noID" className="flex items-center gap-2">
                <Award className="w-5 h-5 text-medical-success" />
                <span className="text-medical-dark font-medium">Board Certified</span>
              </Div>
              <Div devId="noID" className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-medical-success" />
                <span className="text-medical-dark font-medium">HIPAA Compliant</span>
              </Div>
              <Div devId="noID" className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-medical-success" />
                <span className="text-medical-dark font-medium">24/7 Support</span>
              </Div>
            </Div>
          </Div>
        </Section>
      </Container>

      {/* CTA Section */}
      <Container componentId="cta-section">
        <Section devId="noID" className="container mx-auto px-4 py-20">
          <Div devId="noID" className="bg-gradient-to-r from-medical-primary/20 to-medical-secondary/20 rounded-2xl p-12 text-center border border-medical-primary/30">
            <H2 devId="noID" className="text-4xl font-bold text-medical-dark mb-4">Ready to Take Control of Your Health?</H2>
            <P devId="noID" className="text-medical-muted mb-8 max-w-2xl mx-auto">
              Join thousands of patients who trust us with their healthcare journey. Start with a free consultation today.
            </P>
            <Div devId="noID" className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                devId="cta-book-consultation"
                devName="Book Consultation Button"
                devDescription="Primary CTA button to book a consultation"
                className="bg-gradient-to-r from-medical-primary to-medical-secondary hover:from-medical-primary/90 hover:to-medical-secondary/90 text-white px-8 py-3 rounded-lg font-semibold transition-all transform hover:scale-105"
              >
                <span className="flex items-center gap-2">
                  <Stethoscope className="w-5 h-5" />
                  Book Free Consultation
                </span>
              </Button>
              <Button 
                devId="cta-explore-services"
                devName="Explore Services Button"
                devDescription="Secondary CTA button to explore services"
                variant="outline"
                className="border border-medical-primary text-medical-primary hover:bg-medical-primary hover:text-white px-8 py-3 rounded-lg font-semibold transition-all"
              >
                <span className="flex items-center gap-2">
                  <Heart className="w-5 h-5" />
                  Explore Services
                </span>
              </Button>
            </Div>
          </Div>
        </Section>
      </Container>

      {/* Footer */}
      <Footer 
        devId="main-footer" 
        devName="Main Footer" 
        devDescription="Medical platform footer with links and compliance information"
        className="container mx-auto px-4 py-8 border-t border-medical-light"
      >
        <Div devId="noID" className="flex flex-col md:flex-row justify-between items-center">
          <Div devId="noID" className="text-medical-muted mb-4 md:mb-0">
            © 2024 Doctor Mike Health Platform. Committed to your wellness journey.
          </Div>
          <Div devId="noID" className="flex space-x-6">
            <a href="#" className="text-medical-muted hover:text-medical-primary transition-colors">Privacy Policy</a>
            <a href="#" className="text-medical-muted hover:text-medical-primary transition-colors">Terms of Service</a>
            <a href="#" className="text-medical-muted hover:text-medical-primary transition-colors">Contact</a>
          </Div>
        </Div>
      </Footer>
      </Div>
    </Container>
  );
};
import { useNavigate } from '@tanstack/react-router';
import { Sparkles, Users, Calendar, Shield } from 'lucide-react';
import BubbleCard from '../components/BubbleCard';
import PlaygroundDecor from '../components/PlaygroundDecor';

export default function ClubhouseHomePage() {
  const navigate = useNavigate();

  const features = [
    {
      icon: Users,
      title: 'Safe & Nurturing',
      description: 'A warm, family-like environment where every child feels at home',
    },
    {
      icon: Shield,
      title: 'Parent Portal',
      description: 'Stay connected with real-time updates and our nanny cam',
    },
    {
      icon: Calendar,
      title: 'Flexible Scheduling',
      description: 'Book tours and interviews at times that work for you',
    },
  ];

  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-secondary/30 via-accent/20 to-primary/10">
        <div className="absolute top-10 left-10 animate-float">
          <PlaygroundDecor type="child-heart" size="md" />
        </div>
        <div className="absolute bottom-20 right-20 animate-float" style={{ animationDelay: '1s' }}>
          <PlaygroundDecor type="butterflies" size="lg" />
        </div>
        <div className="absolute top-1/2 right-10 animate-wiggle" style={{ animationDelay: '0.5s' }}>
          <PlaygroundDecor type="child-heart" size="sm" />
        </div>

        <div className="container py-20 md:py-32 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center space-x-2 bg-accent/50 px-4 py-2 rounded-full">
                <Sparkles className="w-5 h-5 text-accent-foreground" />
                <span className="text-sm font-medium text-accent-foreground">Welcome to the Clubhouse!</span>
              </div>
              
              <h1 className="text-5xl md:text-6xl font-display font-bold text-foreground leading-tight">
                Where Little Hearts Feel at Home
              </h1>
              
              <p className="text-xl text-muted-foreground leading-relaxed">
                A loving, playful space where your child can learn, grow, and thrive under the care of Auntie Maia.
              </p>

              <button
                onClick={() => navigate({ to: '/tours' })}
                className="group relative inline-flex items-center justify-center px-12 py-6 text-2xl font-bold text-primary-foreground bg-gradient-to-r from-primary to-primary/80 rounded-full shadow-2xl hover:shadow-primary/50 hover:scale-105 transition-all duration-300"
              >
                <span className="relative z-10">Join the Club</span>
                <Sparkles className="ml-3 w-6 h-6 group-hover:rotate-12 transition-transform" />
              </button>
            </div>

            <div className="relative">
              <div className="rounded-3xl overflow-hidden shadow-2xl border-8 border-primary/20">
                <img
                  src="/assets/generated/cool-kidz-club-hero.dim_1600x900.jpg"
                  alt="Auntie Maia's Cool Kidz Club"
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-display font-bold text-foreground mb-4">
            Why Families Love Us
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            More than childcare—it's a community where your child belongs
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <BubbleCard key={index} className="text-center hover:scale-105 transition-transform">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg">
                  <Icon className="w-8 h-8 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-display font-bold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground">
                  {feature.description}
                </p>
              </BubbleCard>
            );
          })}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container py-20">
        <BubbleCard size="lg" className="text-center bg-gradient-to-br from-primary/10 via-accent/10 to-secondary/20 relative overflow-hidden">
          <div className="absolute top-4 left-4">
            <PlaygroundDecor type="child-heart" size="sm" />
          </div>
          <div className="absolute bottom-4 right-4">
            <PlaygroundDecor type="butterflies" size="sm" />
          </div>
          
          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            <h2 className="text-4xl font-display font-bold text-foreground">
              Ready to Visit?
            </h2>
            <p className="text-xl text-muted-foreground">
              Schedule a tour and meet Auntie Maia. See why parents trust us with their most precious treasures.
            </p>
            <button
              onClick={() => navigate({ to: '/tours' })}
              className="inline-flex items-center justify-center px-10 py-4 text-lg font-bold text-primary-foreground bg-primary rounded-full shadow-xl hover:shadow-primary/50 hover:scale-105 transition-all"
            >
              Book Your Tour
              <Calendar className="ml-2 w-5 h-5" />
            </button>
          </div>
        </BubbleCard>
      </section>
    </div>
  );
}

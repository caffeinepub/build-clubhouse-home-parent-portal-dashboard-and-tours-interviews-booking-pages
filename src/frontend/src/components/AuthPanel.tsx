import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useQueryClient } from '@tanstack/react-query';
import BubbleCard from './BubbleCard';
import PlaygroundDecor from './PlaygroundDecor';
import { LogIn, Shield, Loader2 } from 'lucide-react';

export default function AuthPanel() {
  const { login, loginStatus } = useInternetIdentity();
  const queryClient = useQueryClient();

  const handleLogin = async () => {
    try {
      await login();
    } catch (error: any) {
      console.error('Login error:', error);
      if (error.message === 'User is already authenticated') {
        queryClient.clear();
        setTimeout(() => login(), 300);
      }
    }
  };

  const isLoggingIn = loginStatus === 'logging-in';

  return (
    <div className="container py-20 relative">
      <div className="absolute top-10 left-10 animate-float">
        <PlaygroundDecor type="stars" size="md" />
      </div>
      <div className="absolute bottom-10 right-10 animate-wiggle">
        <PlaygroundDecor type="butterflies" size="lg" />
      </div>

      <div className="max-w-2xl mx-auto relative z-10">
        <BubbleCard size="lg" className="text-center space-y-8 bg-gradient-to-br from-primary/5 via-accent/5 to-secondary/10">
          <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-xl">
            <Shield className="w-10 h-10 text-primary-foreground" />
          </div>

          <div className="space-y-4">
            <h1 className="text-4xl font-display font-bold text-foreground">
              Welcome to the VIP Lounge
            </h1>
            <p className="text-xl text-muted-foreground">
              Sign in to access your secure parent portal and stay connected with your little one
            </p>
          </div>

          <div className="space-y-4">
            <button
              onClick={handleLogin}
              disabled={isLoggingIn}
              className="inline-flex items-center justify-center px-10 py-4 text-lg font-bold text-primary-foreground bg-primary rounded-full shadow-xl hover:shadow-primary/50 hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {isLoggingIn ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Signing In...
                </>
              ) : (
                <>
                  <LogIn className="w-5 h-5 mr-2" />
                  Sign In
                </>
              )}
            </button>

            <p className="text-sm text-muted-foreground">
              Secure authentication powered by Internet Identity
            </p>
          </div>
        </BubbleCard>
      </div>
    </div>
  );
}

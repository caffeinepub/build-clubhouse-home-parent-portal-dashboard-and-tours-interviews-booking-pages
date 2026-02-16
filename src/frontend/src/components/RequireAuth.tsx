import { ReactNode } from 'react';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import AuthPanel from './AuthPanel';
import { Loader2 } from 'lucide-react';

interface RequireAuthProps {
  children: ReactNode;
}

export default function RequireAuth({ children }: RequireAuthProps) {
  const { identity, isInitializing } = useInternetIdentity();

  if (isInitializing) {
    return (
      <div className="container py-20 flex items-center justify-center">
        <Loader2 className="w-12 h-12 animate-spin text-primary" />
      </div>
    );
  }

  if (!identity) {
    return <AuthPanel />;
  }

  return <>{children}</>;
}

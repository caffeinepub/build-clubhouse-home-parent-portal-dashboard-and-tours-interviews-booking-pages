import RequireAuth from '../components/RequireAuth';
import NannyCamFrame from '../components/NannyCamFrame';
import StatusWidgets from '../components/StatusWidgets';
import BubbleCard from '../components/BubbleCard';
import { useParentPortalStatus } from '../hooks/useParentPortalStatus';
import { Loader2 } from 'lucide-react';

function ParentPortalContent() {
  const { data: status, isLoading } = useParentPortalStatus();

  if (isLoading) {
    return (
      <div className="container py-20 flex items-center justify-center">
        <Loader2 className="w-12 h-12 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="container py-12 space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground">
          Welcome to Your VIP Lounge
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Stay connected with your little one throughout the day
        </p>
      </div>

      {/* Status Widgets */}
      <StatusWidgets status={status} />

      {/* Nanny Cam Section */}
      <BubbleCard size="lg" className="space-y-4">
        <h2 className="text-2xl font-display font-bold text-foreground text-center">
          Live from the Clubhouse
        </h2>
        <NannyCamFrame mediaUrl={status?.nannyCamUrl} />
      </BubbleCard>
    </div>
  );
}

export default function ParentPortalPage() {
  return (
    <RequireAuth>
      <ParentPortalContent />
    </RequireAuth>
  );
}

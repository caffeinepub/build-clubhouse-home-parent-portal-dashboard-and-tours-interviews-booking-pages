import { Video, VideoOff } from 'lucide-react';

interface NannyCamFrameProps {
  mediaUrl?: string;
}

export default function NannyCamFrame({ mediaUrl }: NannyCamFrameProps) {
  return (
    <div className="relative">
      {/* Fun Frame Border */}
      <div className="absolute inset-0 -m-4 rounded-3xl overflow-hidden opacity-30 pointer-events-none">
        <img
          src="/assets/generated/nanny-cam-fun-frame.dim_1200x800.png"
          alt=""
          className="w-full h-full object-cover"
        />
      </div>

      {/* Media Area */}
      <div className="relative aspect-video rounded-2xl overflow-hidden bg-muted border-4 border-primary/20 shadow-xl">
        {mediaUrl ? (
          <iframe
            src={mediaUrl}
            className="w-full h-full"
            allow="camera; microphone"
            title="Nanny Cam Feed"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center space-y-4 p-8 text-center">
            <div className="w-20 h-20 rounded-full bg-muted-foreground/10 flex items-center justify-center">
              <VideoOff className="w-10 h-10 text-muted-foreground" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-display font-bold text-foreground">
                Camera Feed Coming Soon
              </h3>
              <p className="text-muted-foreground max-w-md">
                We're setting up your secure video feed. You'll be able to check in on your little one anytime!
              </p>
            </div>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Video className="w-4 h-4" />
              <span>Secure • Private • Real-time</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

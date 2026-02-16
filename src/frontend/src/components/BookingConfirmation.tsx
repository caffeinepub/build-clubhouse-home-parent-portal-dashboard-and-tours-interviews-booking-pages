import BubbleCard from './BubbleCard';
import PlaygroundDecor from './PlaygroundDecor';
import { CheckCircle, Calendar, X } from 'lucide-react';

interface BookingConfirmationProps {
  date: Date;
  details: string;
  bookingId: bigint | null;
  onClose: () => void;
}

export default function BookingConfirmation({ date, details, bookingId, onClose }: BookingConfirmationProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
      <BubbleCard size="lg" className="max-w-lg w-full relative animate-in fade-in zoom-in duration-300">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-secondary transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="absolute -top-6 -right-6 animate-bounce">
          <PlaygroundDecor type="stars" size="md" />
        </div>

        <div className="text-center space-y-6 pt-4">
          <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-xl">
            <CheckCircle className="w-10 h-10 text-primary-foreground" />
          </div>

          <div className="space-y-2">
            <h2 className="text-3xl font-display font-bold text-foreground">
              We Can't Wait to Meet You!
            </h2>
            <p className="text-muted-foreground">
              Your tour request has been submitted successfully
            </p>
          </div>

          <div className="bubble-sm text-left space-y-3">
            <div className="flex items-start space-x-3">
              <Calendar className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-foreground">
                  {date.toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
                <p className="text-sm text-muted-foreground">
                  {date.toLocaleTimeString('en-US', {
                    hour: 'numeric',
                    minute: '2-digit',
                  })}
                </p>
              </div>
            </div>
            {details && (
              <div className="pt-3 border-t border-border">
                <p className="text-sm text-muted-foreground">{details}</p>
              </div>
            )}
            {bookingId !== null && (
              <div className="pt-3 border-t border-border">
                <p className="text-xs text-muted-foreground">
                  Booking ID: {bookingId.toString()}
                </p>
              </div>
            )}
          </div>

          <div className="space-y-2">
            <p className="text-sm text-foreground">
              We'll confirm your tour time within 24 hours
            </p>
            <button
              onClick={onClose}
              className="w-full py-3 px-6 text-base font-bold text-primary-foreground bg-primary rounded-full shadow-lg hover:shadow-primary/50 hover:scale-105 transition-all"
            >
              Got It!
            </button>
          </div>
        </div>
      </BubbleCard>
    </div>
  );
}

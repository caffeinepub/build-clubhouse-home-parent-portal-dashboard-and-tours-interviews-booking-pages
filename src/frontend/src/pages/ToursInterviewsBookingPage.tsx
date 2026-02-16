import { useState } from 'react';
import BubbleCard from '../components/BubbleCard';
import PlaygroundDecor from '../components/PlaygroundDecor';
import BookingCalendar from '../components/BookingCalendar';
import MeetAuntieMaiaPanel from '../components/MeetAuntieMaiaPanel';
import BookingConfirmation from '../components/BookingConfirmation';
import { useCreateBooking, useListBookings } from '../hooks/useBookingRequests';
import { Loader2, Calendar, AlertCircle } from 'lucide-react';

export default function ToursInterviewsBookingPage() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [details, setDetails] = useState('');
  const [notes, setNotes] = useState('');
  const [parentName, setParentName] = useState('');
  const [parentEmail, setParentEmail] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Snapshot of submitted values for confirmation modal
  const [submittedDate, setSubmittedDate] = useState<Date | undefined>(undefined);
  const [submittedDetails, setSubmittedDetails] = useState('');
  const [submittedNotes, setSubmittedNotes] = useState('');
  const [submittedContact, setSubmittedContact] = useState({ name: '', email: '' });
  const [submittedBookingId, setSubmittedBookingId] = useState<bigint | null>(null);

  const createBooking = useCreateBooking();
  const { data: bookings, isLoading: bookingsLoading } = useListBookings();

  const isFormValid = selectedDate && parentName.trim() && parentEmail.trim();

  const handleSubmit = async () => {
    if (!selectedDate || !parentName.trim() || !parentEmail.trim()) return;

    setError(null);

    try {
      const requestedTime = BigInt(selectedDate.getTime()) * BigInt(1_000_000);
      const bookingId = await createBooking.mutateAsync({
        requestedTime,
        details: details || 'Tour and interview request',
        notes: notes || '',
        contact: {
          name: parentName.trim(),
          email: parentEmail.trim(),
        },
      });

      // Snapshot submitted values before clearing
      setSubmittedDate(selectedDate);
      setSubmittedDetails(details || 'Tour and interview request');
      setSubmittedNotes(notes || '');
      setSubmittedContact({ name: parentName.trim(), email: parentEmail.trim() });
      setSubmittedBookingId(bookingId);

      // Clear form
      setSelectedDate(undefined);
      setDetails('');
      setNotes('');
      setParentName('');
      setParentEmail('');

      // Show confirmation
      setShowConfirmation(true);
    } catch (error: any) {
      console.error('Failed to create booking:', error);
      if (error.message?.includes('Unauthorized')) {
        setError('You must be signed in to book a tour. Please log in and try again.');
      } else {
        setError('Unable to submit your booking request. Please try again or contact us directly.');
      }
    }
  };

  return (
    <div className="relative">
      <div className="absolute top-20 left-10 animate-float sticker-decor">
        <PlaygroundDecor type="child-heart" size="md" />
      </div>
      <div className="absolute top-40 right-20 animate-wiggle sticker-decor" style={{ animationDelay: '0.5s' }}>
        <PlaygroundDecor type="butterflies" size="lg" />
      </div>
      <div className="absolute bottom-40 left-20 animate-float sticker-decor" style={{ animationDelay: '1s' }}>
        <PlaygroundDecor type="butterflies" size="sm" />
      </div>
      <div className="absolute bottom-20 right-10 animate-wiggle sticker-decor" style={{ animationDelay: '1.5s' }}>
        <PlaygroundDecor type="child-heart" size="sm" />
      </div>

      <div className="container py-12 relative z-10">
        <div className="text-center space-y-4 mb-12">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground">
            Let's Meet!
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Schedule a tour and get to know Auntie Maia. No pressure, just excitement!
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Meet Auntie Maia Panel */}
          <MeetAuntieMaiaPanel />

          {/* Booking Calendar */}
          <BubbleCard size="lg" className="relative">
            <div className="absolute -top-4 -right-4 sticker-decor">
              <PlaygroundDecor type="child-heart" size="sm" />
            </div>
            <div className="absolute -bottom-4 -left-4 sticker-decor">
              <PlaygroundDecor type="butterflies" size="sm" />
            </div>

            <h2 className="text-2xl font-display font-bold text-foreground mb-6 flex items-center">
              <Calendar className="w-6 h-6 mr-2 text-primary" />
              Pick Your Date
            </h2>

            <BookingCalendar
              selectedDate={selectedDate}
              onSelectDate={setSelectedDate}
            />

            <div className="mt-6 space-y-4">
              {/* Error Message */}
              {error && (
                <div className="bubble-sm bg-destructive/10 border-2 border-destructive/20 flex items-start space-x-3">
                  <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-destructive">{error}</p>
                </div>
              )}

              {/* Parent Name */}
              <div>
                <label htmlFor="parentName" className="block text-sm font-medium text-foreground mb-2">
                  Your Name <span className="text-destructive">*</span>
                </label>
                <input
                  id="parentName"
                  type="text"
                  value={parentName}
                  onChange={(e) => {
                    setParentName(e.target.value);
                    setError(null);
                  }}
                  placeholder="Jane Smith"
                  className="w-full px-4 py-3 rounded-2xl border-2 border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  required
                />
              </div>

              {/* Parent Email */}
              <div>
                <label htmlFor="parentEmail" className="block text-sm font-medium text-foreground mb-2">
                  Your Email <span className="text-destructive">*</span>
                </label>
                <input
                  id="parentEmail"
                  type="email"
                  value={parentEmail}
                  onChange={(e) => {
                    setParentEmail(e.target.value);
                    setError(null);
                  }}
                  placeholder="jane@example.com"
                  className="w-full px-4 py-3 rounded-2xl border-2 border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  required
                />
              </div>

              {/* Details */}
              <div>
                <label htmlFor="details" className="block text-sm font-medium text-foreground mb-2">
                  What brings you to Cool Kidz Club?
                </label>
                <textarea
                  id="details"
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                  placeholder="Tell us a bit about your family..."
                  className="w-full px-4 py-3 rounded-2xl border-2 border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                  rows={3}
                />
              </div>

              {/* Notes */}
              <div>
                <label htmlFor="notes" className="block text-sm font-medium text-foreground mb-2">
                  Any special requests or questions?
                </label>
                <textarea
                  id="notes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Dietary restrictions, accessibility needs, etc."
                  className="w-full px-4 py-3 rounded-2xl border-2 border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                  rows={2}
                />
              </div>

              <button
                onClick={handleSubmit}
                disabled={!isFormValid || createBooking.isPending}
                className="w-full py-4 px-6 text-lg font-bold text-primary-foreground bg-primary rounded-full shadow-lg hover:shadow-primary/50 hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center"
              >
                {createBooking.isPending ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Booking...
                  </>
                ) : (
                  'Request This Time'
                )}
              </button>
            </div>
          </BubbleCard>
        </div>

        {/* Confirmation Modal */}
        {showConfirmation && submittedDate && (
          <BookingConfirmation
            date={submittedDate}
            details={submittedDetails}
            notes={submittedNotes}
            contact={submittedContact}
            bookingId={submittedBookingId}
            onClose={() => setShowConfirmation(false)}
          />
        )}

        {/* Your Requests */}
        {bookings && bookings.length > 0 && (
          <BubbleCard size="lg" className="mt-12">
            <h2 className="text-2xl font-display font-bold text-foreground mb-6">
              Your Tour Requests
            </h2>
            <div className="space-y-4">
              {bookings.map((booking) => {
                const date = new Date(Number(booking.requestedTime) / 1_000_000);
                const statusColors = {
                  pending: 'bg-accent text-accent-foreground',
                  confirmed: 'bg-primary text-primary-foreground',
                  cancelled: 'bg-muted text-muted-foreground',
                  completed: 'bg-secondary text-secondary-foreground',
                };
                return (
                  <div key={booking.id.toString()} className="bubble-sm space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
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
                      <span className={`px-4 py-2 rounded-full text-sm font-medium ${statusColors[booking.status]}`}>
                        {booking.status}
                      </span>
                    </div>
                    {booking.contact && (booking.contact.name || booking.contact.email) && (
                      <div className="pt-2 border-t border-border">
                        <p className="text-sm text-foreground">
                          <span className="font-medium">Contact:</span> {booking.contact.name}
                          {booking.contact.email && ` (${booking.contact.email})`}
                        </p>
                      </div>
                    )}
                    {booking.details && (
                      <div className={`${booking.contact && (booking.contact.name || booking.contact.email) ? '' : 'pt-2 border-t border-border'}`}>
                        <p className="text-sm text-muted-foreground">{booking.details}</p>
                      </div>
                    )}
                    {booking.notes && (
                      <div>
                        <p className="text-sm text-muted-foreground italic">{booking.notes}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </BubbleCard>
        )}

        {/* Empty State */}
        {bookings && bookings.length === 0 && !bookingsLoading && (
          <BubbleCard size="lg" className="mt-12 text-center py-8">
            <Calendar className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-xl font-display font-bold text-foreground mb-2">
              No Tour Requests Yet
            </h3>
            <p className="text-muted-foreground">
              Pick a date above to schedule your first visit!
            </p>
          </BubbleCard>
        )}

        {bookingsLoading && (
          <div className="flex justify-center py-8">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        )}
      </div>
    </div>
  );
}

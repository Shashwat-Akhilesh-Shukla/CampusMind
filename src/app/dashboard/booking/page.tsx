import { BookingClient } from './booking-client';

export default function BookingPage() {
  return (
    <div className="p-4 md:p-6 lg:p-8">
      <header className="mb-8">
        <h1 className="font-headline text-3xl font-bold">Book a Session</h1>
        <p className="text-muted-foreground">
          Schedule a confidential appointment with a professional counselor. All bookings are anonymous.
        </p>
      </header>
      <BookingClient />
    </div>
  );
}

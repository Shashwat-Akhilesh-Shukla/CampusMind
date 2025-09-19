'use client';

import * as React from 'react';
import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from '@/components/ui/dialog';

const availableTimes = [
  '09:00 AM', '10:00 AM', '11:00 AM', '02:00 PM', '03:00 PM', '04:00 PM'
];

export function BookingClient() {
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  const [selectedTime, setSelectedTime] = React.useState<string | null>(null);
  const [isConfirming, setIsConfirming] = React.useState(false);
  const { toast } = useToast();

  const handleBooking = () => {
    if (!date || !selectedTime) return;
    toast({
      title: 'Session Booked!',
      description: `Your anonymous session is confirmed for ${format(date, 'PPP')} at ${selectedTime}.`,
    });
    setIsConfirming(false);
    setSelectedTime(null);
  };

  return (
    <>
      <div className="grid gap-8 md:grid-cols-3">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Select a Date</CardTitle>
              <CardDescription>Choose a day for your appointment.</CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border"
                disabled={(day) => day < new Date() || day > new Date(new Date().setDate(new Date().getDate() + 30))}
              />
            </CardContent>
          </Card>
        </div>
        <div className="md:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Available Times</CardTitle>
              <CardDescription>
                {date ? format(date, 'EEEE, LLLL d') : 'Select a date'}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {date ? (
                <div className="grid grid-cols-2 gap-2">
                  {availableTimes.map((time) => (
                    <Button
                      key={time}
                      variant={selectedTime === time ? 'default' : 'outline'}
                      onClick={() => setSelectedTime(time)}
                    >
                      {time}
                    </Button>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">Please select a date to see available times.</p>
              )}
              <Button
                className="w-full mt-4"
                disabled={!date || !selectedTime}
                onClick={() => setIsConfirming(true)}
              >
                Book Appointment
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
      <Dialog open={isConfirming} onOpenChange={setIsConfirming}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Your Booking</DialogTitle>
            <DialogDescription>
              Are you sure you want to book an anonymous session for:
            </DialogDescription>
          </DialogHeader>
          <div className="my-4 rounded-lg border bg-muted p-4 text-center">
            <p className="font-bold text-lg">{date ? format(date, 'PPP') : ''}</p>
            <p className="text-muted-foreground">at</p>
            <p className="font-bold text-lg">{selectedTime}</p>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button onClick={handleBooking}>Confirm</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

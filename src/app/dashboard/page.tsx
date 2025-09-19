
import Link from 'next/link';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, HeartHandshake, MessageCircle, Calendar, Users } from 'lucide-react';

const features = [
  {
    icon: HeartHandshake,
    title: 'Mental Health Screening',
    description: 'Take a quick, confidential survey (PHQ-9 & GAD-7) to check in with your mental well-being.',
    link: '/dashboard/screening',
    cta: 'Start Screening',
  },
  {
    icon: MessageCircle,
    title: 'AI Guardian',
    description: 'Chat with our supportive AI to get coping strategies and mental health tips, anytime you need.',
    link: '/dashboard/chatbot',
    cta: 'Start Chatting',
  },
  {
    icon: Calendar,
    title: 'Counselor Booking',
    description: 'Anonymously book a one-on-one session with a professional counselor through a simple calendar interface.',
    link: '/dashboard/booking',
    cta: 'Book a Session',
  },
  {
    icon: Users,
    title: 'Peer Support Groups',
    description: 'Connect with fellow students in moderated groups to share experiences and find community.',
    link: '/dashboard/support-groups',
    cta: 'Find a Group',
  },
];

export default function DashboardPage() {
  return (
    <div className="flex flex-1 flex-col p-4 md:p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="font-headline text-3xl font-bold">Welcome to CampusMind</h1>
        <p className="text-muted-foreground">
          Your confidential space for mental wellness. What would you like to do today?
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {features.map((feature) => {
          const Icon = feature.icon;
          return (
            <Card key={feature.title} className="flex flex-col">
              <CardHeader>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="font-headline">{feature.title}</CardTitle>
                <CardDescription>{feature.description}</CardDescription>
              </CardHeader>
              <CardFooter className="mt-auto">
                <Button asChild variant="ghost" className="-ml-4">
                  <Link href={feature.link}>
                    {feature.cta}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

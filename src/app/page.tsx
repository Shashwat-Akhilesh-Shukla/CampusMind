import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { AppWindow } from 'lucide-react';

export default function WelcomePage() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <header className="flex h-16 items-center px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <AppWindow className="h-6 w-6 text-primary" />
          <span className="text-lg font-headline">CampusMind</span>
        </Link>
      </header>
      <main className="flex flex-1 items-center justify-center">
        <div className="relative isolate px-6 pt-14 lg:px-8">
          <div
            className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
            aria-hidden="true"
          >
            <div
              className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-primary/50 to-accent/50 opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
              style={{
                clipPath:
                  'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
              }}
            />
          </div>
          <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
            <div className="text-center">
              <h1 className="font-headline text-4xl font-bold tracking-tight text-foreground sm:text-6xl">
                A safe space for your thoughts
              </h1>
              <p className="mt-6 text-lg leading-8 text-muted-foreground">
                CampusMind offers anonymous, confidential support for your mental well-being. Take a self-assessment, chat with our AI guardian, or connect with peers.
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <Button asChild size="lg">
                  <Link href="/dashboard">Enter Anonymously</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

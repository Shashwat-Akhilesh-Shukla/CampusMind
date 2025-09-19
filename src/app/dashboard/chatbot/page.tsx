import { ChatClient } from './chat-client';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';

export default function ChatbotPage() {
  return (
    <div className="flex h-full flex-col p-4 md:p-6 lg:p-8">
      <header className="mb-8">
        <h1 className="font-headline text-3xl font-bold">AI Guardian</h1>
        <p className="text-muted-foreground">
          Your personal AI companion for mental wellness support.
        </p>
      </header>
      <div className="flex-1 flex flex-col">
          <ChatClient />
      </div>
    </div>
  );
}

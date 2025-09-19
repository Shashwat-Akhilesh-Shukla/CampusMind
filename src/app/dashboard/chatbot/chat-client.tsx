'use client';

import React, { useState, useRef, useEffect } from 'react';
import { CornerDownLeft, Loader2, Mic } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { handleChatSubmit, handleChatSummary } from './actions';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

interface Message {
  id: number;
  role: 'user' | 'assistant';
  content: string;
}

export function ChatClient() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [summary, setSummary] = useState<{ summary: string; actionableSteps: string } | null>(null);
  const [isSummaryLoading, setIsSummaryLoading] = useState(false);
  
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({ top: scrollAreaRef.current.scrollHeight, behavior: 'smooth' });
    }
  }, [messages]);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { id: Date.now(), role: 'user', content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const result = await handleChatSubmit(input);
      const assistantMessage: Message = { id: Date.now() + 1, role: 'assistant', content: result.chatbotResponse };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Chatbot error:', error);
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem communicating with the AI. Please try again.",
      });
      setMessages((prev) => prev.slice(0, -1)); // Remove user message on error
    } finally {
      setIsLoading(false);
    }
  };

  const getSummary = async () => {
    if (messages.length === 0 || isSummaryLoading) return;
    setIsSummaryLoading(true);
    const conversationHistory = messages.map(m => `${m.role}: ${m.content}`).join('\n');
    try {
      const result = await handleChatSummary(conversationHistory);
      setSummary(result);
    } catch (error) {
      console.error('Summary error:', error);
      toast({
        variant: "destructive",
        title: "Could not generate summary.",
        description: "There was a problem generating the summary. Please try again.",
      });
    } finally {
      setIsSummaryLoading(false);
    }
  };

  return (
    <>
      <Card className="flex-1 flex flex-col h-full">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Conversation</CardTitle>
          <Button onClick={getSummary} disabled={messages.length === 0 || isSummaryLoading} variant="outline" size="sm">
            {isSummaryLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Summarize
          </Button>
        </CardHeader>
        <CardContent className="flex-1 overflow-hidden p-0">
          <ScrollArea className="h-full" ref={scrollAreaRef}>
            <div className="p-6 space-y-4">
              {messages.length === 0 ? (
                 <div className="flex items-center justify-center h-full text-muted-foreground">
                    <p>Start a conversation. How are you feeling today?</p>
                 </div>
              ) : (
                messages.map((message) => (
                  <div
                    key={message.id}
                    className={cn(
                      'flex gap-3 text-sm',
                      message.role === 'user' ? 'justify-end' : 'justify-start'
                    )}
                  >
                    {message.role === 'assistant' && (
                      <Avatar className="h-8 w-8">
                        <AvatarFallback>AI</AvatarFallback>
                      </Avatar>
                    )}
                    <div
                      className={cn(
                        'max-w-md rounded-lg p-3',
                        message.role === 'user'
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted'
                      )}
                    >
                      <p className="whitespace-pre-wrap">{message.content}</p>
                    </div>
                     {message.role === 'user' && (
                      <Avatar className="h-8 w-8">
                        <AvatarFallback>U</AvatarFallback>
                      </Avatar>
                    )}
                  </div>
                ))
              )}
               {isLoading && (
                <div className="flex gap-3 text-sm justify-start">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>AI</AvatarFallback>
                    </Avatar>
                    <div className="max-w-md rounded-lg p-3 bg-muted flex items-center">
                        <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
                    </div>
                </div>
              )}
            </div>
          </ScrollArea>
        </CardContent>
        <CardFooter className="p-4 border-t">
          <form onSubmit={handleSubmit} className="flex w-full items-center space-x-2">
            <Input
              id="message"
              placeholder="Type your message..."
              className="flex-1"
              autoComplete="off"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={isLoading}
            />
            <Button type="submit" size="icon" disabled={isLoading || !input.trim()}>
              <CornerDownLeft className="h-4 w-4" />
              <span className="sr-only">Send</span>
            </Button>
          </form>
        </CardFooter>
      </Card>
      <Dialog open={!!summary} onOpenChange={(open) => !open && setSummary(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Conversation Summary</DialogTitle>
          </DialogHeader>
          {summary && (
            <div className="space-y-4 text-sm max-h-[60vh] overflow-y-auto pr-4">
              <div>
                <h3 className="font-semibold mb-2">Key Points</h3>
                <p className="text-muted-foreground whitespace-pre-wrap">{summary.summary}</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Actionable Steps</h3>
                <p className="text-muted-foreground whitespace-pre-wrap">{summary.actionableSteps}</p>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button onClick={() => setSummary(null)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

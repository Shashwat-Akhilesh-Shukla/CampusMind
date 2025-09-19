'use client';

import * as React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { CardContent, CardFooter } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import type { Question, Option } from '@/lib/screening-questions';
import { cn } from '@/lib/utils';
import { HeartPulse } from 'lucide-react';

interface ScreeningFormProps {
  questions: Question[];
  options: Option[];
  formId: string;
  getInterpretation: (score: number) => { level: string; recommendation: string };
  maxScore: number;
}

export function ScreeningForm({
  questions,
  options,
  formId,
  getInterpretation,
  maxScore,
}: ScreeningFormProps) {
  const [result, setResult] = React.useState<{ score: number; interpretation: { level: string; recommendation: string } } | null>(null);

  const formSchema = z.object(
    questions.reduce((acc, question) => {
      acc[question.id] = z.string().nonempty({ message: 'Please select an option.' });
      return acc;
    }, {} as Record<string, z.ZodString>)
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    const score = Object.values(data).reduce((acc, value) => acc + parseInt(value, 10), 0);
    const interpretation = getInterpretation(score);
    setResult({ score, interpretation });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  const handleRetake = () => {
    form.reset();
    setResult(null);
  };

  if (result) {
    const progressValue = (result.score / maxScore) * 100;
    
    let progressColorClass = 'bg-green-500';
    if (result.interpretation.level.includes('Mild')) progressColorClass = 'bg-yellow-400';
    if (result.interpretation.level.includes('Moderate')) progressColorClass = 'bg-orange-500';
    if (result.interpretation.level.includes('Severe')) progressColorClass = 'bg-red-600';

    return (
      <CardContent>
        <Alert>
          <HeartPulse className="h-4 w-4" />
          <AlertTitle className="font-headline text-xl">Your Result</AlertTitle>
          <AlertDescription className="space-y-4 mt-2">
            <p>Your score is <strong>{result.score}</strong> out of <strong>{maxScore}</strong>.</p>
            <div className="space-y-1">
              <p className="font-semibold">{result.interpretation.level}</p>
              <Progress value={progressValue} indicatorClassName={cn(progressColorClass)} />
            </div>
            <p>{result.interpretation.recommendation}</p>
            <p className="text-xs text-muted-foreground">
              Disclaimer: This is not a diagnosis. This tool is for informational purposes only. Please consult with a healthcare professional for an accurate diagnosis.
            </p>
          </AlertDescription>
        </Alert>
        <div className="flex justify-end mt-6">
          <Button onClick={handleRetake}>Retake Test</Button>
        </div>
      </CardContent>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <CardContent className="space-y-8">
          {questions.map((question, index) => (
            <FormField
              key={question.id}
              control={form.control}
              name={question.id}
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>{index + 1}. {question.text}</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-8"
                    >
                      {options.map((option) => (
                        <FormItem key={option.value} className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value={String(option.value)} />
                          </FormControl>
                          <FormLabel className="font-normal">{option.text}</FormLabel>
                        </FormItem>
                      ))}
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
        </CardContent>
        <CardFooter>
          <Button type="submit">See Results</Button>
        </CardFooter>
      </form>
    </Form>
  );
}

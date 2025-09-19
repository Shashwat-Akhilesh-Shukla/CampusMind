'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  phq9Questions,
  gad7Questions,
  screeningOptions,
  getPhq9Interpretation,
  getGad7Interpretation,
} from '@/lib/screening-questions';
import { ScreeningForm } from './screening-form';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export default function ScreeningPage() {
  return (
    <div className="p-4 md:p-6 lg:p-8">
      <header className="mb-8">
        <h1 className="font-headline text-3xl font-bold">Mental Health Screening</h1>
        <p className="text-muted-foreground">
          Over the last 2 weeks, how often have you been bothered by any of the following problems?
        </p>
      </header>
      <Tabs defaultValue="phq9" className="w-full max-w-4xl mx-auto">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="phq9">PHQ-9 (Depression)</TabsTrigger>
          <TabsTrigger value="gad7">GAD-7 (Anxiety)</TabsTrigger>
        </TabsList>
        <TabsContent value="phq9">
          <Card>
            <CardHeader>
              <CardTitle>Patient Health Questionnaire (PHQ-9)</CardTitle>
              <CardDescription>
                This is a multipurpose instrument for screening, diagnosing, monitoring and measuring the severity of depression.
              </CardDescription>
            </CardHeader>
            <ScreeningForm
              questions={phq9Questions}
              options={screeningOptions}
              formId="phq9-form"
              getInterpretation={getPhq9Interpretation}
              maxScore={27}
            />
          </Card>
        </TabsContent>
        <TabsContent value="gad7">
          <Card>
             <CardHeader>
              <CardTitle>Generalized Anxiety Disorder (GAD-7)</CardTitle>
              <CardDescription>
                This is a tool for screening for and measuring the severity of generalized anxiety disorder.
              </CardDescription>
            </CardHeader>
            <ScreeningForm
              questions={gad7Questions}
              options={screeningOptions}
              formId="gad7-form"
              getInterpretation={getGad7Interpretation}
              maxScore={21}
            />
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

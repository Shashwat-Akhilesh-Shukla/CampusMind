'use server';
/**
 * @fileOverview Summarizes key points from the AI chatbot conversation and provides actionable steps.
 *
 * - summarizeConversation - A function that summarizes the conversation and provides actionable steps.
 * - SummarizeConversationInput - The input type for the summarizeConversation function.
 * - SummarizeConversationOutput - The return type for the summarizeConversation function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'zod';

const SummarizeConversationInputSchema = z.object({
  conversationHistory: z
    .string()
    .describe('The complete conversation history between the student and the chatbot.'),
});
export type SummarizeConversationInput = z.infer<typeof SummarizeConversationInputSchema>;

const SummarizeConversationOutputSchema = z.object({
  summary: z
    .string()
    .describe('A concise summary of the key points discussed during the conversation.'),
  actionableSteps: z
    .string()
    .describe('A list of actionable steps the student can take based on the conversation.'),
});
export type SummarizeConversationOutput = z.infer<typeof SummarizeConversationOutputSchema>;

export async function summarizeConversation(
  input: SummarizeConversationInput
): Promise<SummarizeConversationOutput> {
  return summarizeConversationFlow(input);
}

const prompt = ai.definePrompt({
  prompt: `You are an AI assistant tasked with summarizing conversations and providing actionable steps.

  Summarize the key points discussed in the following conversation and provide a list of actionable steps the student can take.

  Conversation History:
  {{conversationHistory}}

  Summary:
  Actionable Steps:`,
  input: {schema: SummarizeConversationInputSchema},
  output: {schema: SummarizeConversationOutputSchema},
});

const summarizeConversationFlow = ai.defineFlow(
  {
    name: 'summarizeConversationFlow',
    inputSchema: SummarizeConversationInputSchema,
    outputSchema: SummarizeConversationOutputSchema,
  },
  async (input: SummarizeConversationInput) => {
    const {output} = await prompt.generate(input);
    return output;
  }
);

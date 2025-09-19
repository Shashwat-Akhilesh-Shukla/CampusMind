// The AI guardian chatbot flow provides personalized mental health support and coping strategies to students.
// It takes user input and returns relevant advice and tips.

'use server';

import {ai} from '@/ai/genkit';
import {z} from 'zod';

const ChatbotInputSchema = z.object({
  userInput: z.string().describe('The user input to the chatbot.'),
});
export type ChatbotInput = z.infer<typeof ChatbotInputSchema>;

const ChatbotOutputSchema = z.object({
  chatbotResponse: z.string().describe('The chatbot response to the user.'),
});
export type ChatbotOutput = z.infer<typeof ChatbotOutputSchema>;

export async function aiGuardianChatbotSupport(input: ChatbotInput): Promise<ChatbotOutput> {
  return aiGuardianChatbotFlow(input);
}

const chatbotPrompt = ai.definePrompt({
  name: 'chatbotPrompt',
  input: {schema: ChatbotInputSchema},
  output: {schema: ChatbotOutputSchema},
  prompt: `You are a mental health support chatbot designed to provide students with personalized support, coping strategies, and helpful tips.

  Respond to the following user input with empathy and understanding. Offer practical advice and resources when appropriate.

  User Input: {{{userInput}}}

  Chatbot Response:`,
});

const aiGuardianChatbotFlow = ai.defineFlow(
  {
    name: 'aiGuardianChatbotFlow',
    inputSchema: ChatbotInputSchema,
    outputSchema: ChatbotOutputSchema,
  },
  async input => {
    const {output} = await chatbotPrompt(input);
    return output!;
  }
);
